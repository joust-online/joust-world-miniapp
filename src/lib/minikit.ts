import { MiniKit } from "@worldcoin/minikit-js";
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

  const result = await MiniKit.sendTransaction({
    transaction: [
      {
        address: JOUST_ARENA_ADDRESS,
        abi: joustArenaAbi,
        functionName,
        args,
        ...(value ? { value: value.toString() } : {}),
      },
    ],
  });

  if (result.executedWith === "fallback") {
    throw new Error("Transaction not available outside World App");
  }
  return result.data;
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

  const result = await MiniKit.sendTransaction({
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
  });

  if (result.executedWith === "fallback") {
    throw new Error("Transaction not available outside World App");
  }
  return result.data;
}

export async function sharePool(poolId: string, poolTitle: string, won?: boolean, closeAfter?: boolean) {
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  await MiniKit.share({
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
  const result = await MiniKit.shareContacts({
    isMultiSelectEnabled: true,
    inviteMessage: `Join "${poolTitle}" on Joust!`,
  });
  return result.data;
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
  MiniKit.closeMiniApp();
}

export function sendHaptic(type: "success" | "error" | "heavy") {
  if (!MiniKit.isInstalled()) return;
  MiniKit.sendHapticFeedback({
    hapticsType: type === "heavy" ? "impact" : "notification",
    style: type,
  } as any);
}
