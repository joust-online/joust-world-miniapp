import { MiniKit, tokenToDecimals, Tokens, VerificationLevel } from "@worldcoin/minikit-js";
import { JOUST_ARENA_ADDRESS, USDC_ADDRESS, ETH_ADDRESS } from "./contracts";
import { joustArenaAbi } from "./abi";

export function isMiniKitAvailable(): boolean {
  return MiniKit.isInstalled();
}

export async function sendTransaction(
  functionName: string,
  args: unknown[],
  value?: bigint,
) {
  if (!MiniKit.isInstalled()) {
    throw new Error("MiniKit not available. Open this app in World App.");
  }

  const txPayload = {
    transaction: [
      {
        address: JOUST_ARENA_ADDRESS,
        abi: joustArenaAbi,
        functionName,
        args,
        ...(value ? { value: value.toString() } : {}),
      },
    ],
  };

  const result = await MiniKit.commandsAsync.sendTransaction(txPayload);
  if (result.finalPayload.status === "error") {
    throw new Error(result.finalPayload.error_code ?? "Transaction failed");
  }
  return result.finalPayload;
}

export async function sendERC20Transaction(
  functionName: string,
  args: unknown[],
  tokenAddress: string,
  amount: bigint,
) {
  if (!MiniKit.isInstalled()) {
    throw new Error("MiniKit not available. Open this app in World App.");
  }

  // For ERC20 jousts, we need to approve + call in one batch via Permit2
  const txPayload = {
    transaction: [
      {
        address: JOUST_ARENA_ADDRESS,
        abi: joustArenaAbi,
        functionName,
        args,
      },
    ],
    permit2: [
      {
        permitted: {
          token: tokenAddress,
          amount: amount.toString(),
        },
        spender: JOUST_ARENA_ADDRESS,
        nonce: Date.now().toString(),
        deadline: Math.floor(Date.now() / 1000 + 30 * 60).toString(),
      },
    ],
  };

  const result = await MiniKit.commandsAsync.sendTransaction(txPayload);
  if (result.finalPayload.status === "error") {
    throw new Error(result.finalPayload.error_code ?? "Transaction failed");
  }
  return result.finalPayload;
}

export async function requestVerification(action: string, signal?: string) {
  if (!MiniKit.isInstalled()) {
    throw new Error("MiniKit not available. Open this app in World App.");
  }

  const result = await MiniKit.commandsAsync.verify({
    action,
    signal,
    verification_level: action === "verify-identity" ? VerificationLevel.Device : VerificationLevel.Orb,
  });

  if (result.finalPayload.status === "error") {
    throw new Error("Verification failed");
  }
  return result.finalPayload;
}

export async function sharePool(poolId: string, poolTitle: string, won?: boolean, closeAfter?: boolean) {
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  await MiniKit.commandsAsync.share({
    title: `Joust: ${poolTitle}`,
    text: won !== undefined
      ? `${won ? "I won!" : "I participated in"} "${poolTitle}" on Joust!`
      : `Check out "${poolTitle}" on Joust!`,
    url: `https://world.org/mini-app?app_id=${appId}&path=/pool/${poolId}`,
  });
  if (closeAfter) {
    closeMiniApp();
  }
}

export async function shareContacts(poolTitle: string) {
  const result = await MiniKit.commandsAsync.shareContacts({
    isMultiSelectEnabled: true,
    inviteMessage: `Join "${poolTitle}" on Joust!`,
  });
  return result.finalPayload;
}

// ── On-chain action helpers ──

export async function createPoolOnChain(params: {
  arbiter: string;
  arbiterFee: number;
  collateral: string;
  minJoustAmount: bigint;
  supportedJoustTypes: number;
  endTime: number;
}) {
  return sendTransaction("createPool", [
    [
      params.arbiter,
      params.arbiterFee,
      params.collateral,
      params.minJoustAmount,
      params.supportedJoustTypes,
      params.endTime,
    ],
  ]);
}

export async function createJoustOnChain(
  params: {
    poolId: bigint;
    amount: bigint;
    player: string;
    joustType: number;
  },
  isETH: boolean,
  tokenAddress?: string,
) {
  if (isETH) {
    return sendTransaction(
      "createJoust",
      [[params.poolId, params.amount, params.player, params.joustType]],
      params.amount,
    );
  } else {
    if (!tokenAddress) throw new Error("tokenAddress required for ERC20 jousts");
    return sendERC20Transaction(
      "createJoust",
      [[params.poolId, params.amount, params.player, params.joustType]],
      tokenAddress,
      params.amount,
    );
  }
}

export async function settlePoolOnChain(poolId: bigint, winningJoustType: number) {
  return sendTransaction("settlePoolAndPayout", [poolId, winningJoustType]);
}

export async function refundPoolOnChain(poolId: bigint) {
  return sendTransaction("refundPool", [poolId]);
}

export async function acceptArbiterOnChain(poolId: bigint) {
  return sendTransaction("acceptArbiterDelegation", [poolId]);
}

export async function closePoolOnChain(poolId: bigint) {
  return sendTransaction("closePool", [poolId]);
}

export function closeMiniApp() {
  if (!MiniKit.isInstalled()) return;
  (MiniKit.commandsAsync as any).closeMiniApp();
}

export function sendHaptic(type: "success" | "error" | "heavy") {
  if (!MiniKit.isInstalled()) return;
  const haptics = {
    success: { hapticsType: "notification" as const, style: "success" as const },
    error: { hapticsType: "notification" as const, style: "error" as const },
    heavy: { hapticsType: "impact" as const, style: "heavy" as const },
  };
  MiniKit.commandsAsync.sendHapticFeedback(haptics[type]);
}
