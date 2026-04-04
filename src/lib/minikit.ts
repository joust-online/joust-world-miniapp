import { MiniKit } from "@worldcoin/minikit-js";
import { encodeFunctionData } from "viem";
import { JOUST_ARENA_ADDRESS } from "./contracts";
import { joustArenaAbi } from "./abi";

const PERMIT2 = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
const PERMIT2_APPROVE_ABI = [
  {
    name: "approve",
    type: "function",
    inputs: [
      { name: "token", type: "address" },
      { name: "spender", type: "address" },
      { name: "amount", type: "uint160" },
      { name: "expiration", type: "uint48" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export async function sendTransaction(
  functionName: string,
  args: unknown[],
  value?: bigint,
) {
  if (!MiniKit.isInstalled()) {
    throw new Error("MiniKit not available. Open this app in World App.");
  }

  const data = encodeFunctionData({
    abi: joustArenaAbi,
    functionName,
    args,
  });

  const result = await MiniKit.sendTransaction({
    chainId: 480,
    transactions: [
      {
        to: JOUST_ARENA_ADDRESS,
        data,
        ...(value ? { value: `0x${value.toString(16)}` } : {}),
      },
    ],
  });

  if (result.executedWith === "fallback") {
    throw new Error("Transaction not available outside World App");
  }
  return result.data;
}

const ERC20_APPROVE_ABI = [
  {
    name: "approve",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

export async function sendERC20Transaction(
  functionName: string,
  args: unknown[],
  tokenAddress: string,
  amount: bigint,
) {
  if (!MiniKit.isInstalled()) {
    throw new Error("MiniKit not available. Open this app in World App.");
  }

  // Step 1: Permit2 approve the token to JoustArena (World App uses Permit2 internally)
  const permit2ApproveData = encodeFunctionData({
    abi: PERMIT2_APPROVE_ABI,
    functionName: "approve",
    args: [tokenAddress as `0x${string}`, JOUST_ARENA_ADDRESS, amount, 0],
  });

  // Step 2: Standard ERC20 approve JoustArena to pull tokens
  const erc20ApproveData = encodeFunctionData({
    abi: ERC20_APPROVE_ABI,
    functionName: "approve",
    args: [JOUST_ARENA_ADDRESS, amount],
  });

  // Step 3: The actual contract call
  const txData = encodeFunctionData({
    abi: joustArenaAbi,
    functionName,
    args,
  });

  const result = await MiniKit.sendTransaction({
    chainId: 480,
    transactions: [
      { to: PERMIT2, data: permit2ApproveData },
      { to: tokenAddress as `0x${string}`, data: erc20ApproveData },
      { to: JOUST_ARENA_ADDRESS, data: txData },
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
