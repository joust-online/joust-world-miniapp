import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { worldchain } from "viem/chains";
import { joustArenaAbi } from "@/lib/abi";
import { JOUST_ARENA_ADDRESS } from "@/lib/contracts";

const AGENT_PRIVATE_KEY = process.env.AGENT_WALLET_PRIVATE_KEY as `0x${string}` | undefined;

function getAccount() {
  if (!AGENT_PRIVATE_KEY) {
    throw new Error("AGENT_WALLET_PRIVATE_KEY not configured");
  }
  return privateKeyToAccount(AGENT_PRIVATE_KEY);
}

export function getAgentAddress(): string {
  return getAccount().address.toLowerCase();
}

const agentPublicClient = createPublicClient({
  chain: worldchain,
  transport: http(process.env.WORLD_CHAIN_RPC),
});

function getWalletClient() {
  return createWalletClient({
    account: getAccount(),
    chain: worldchain,
    transport: http(process.env.WORLD_CHAIN_RPC),
  });
}

export async function agentAcceptArbiter(contractId: bigint): Promise<string> {
  const client = getWalletClient();
  const hash = await client.writeContract({
    address: JOUST_ARENA_ADDRESS,
    abi: joustArenaAbi,
    functionName: "acceptArbiterDelegation",
    args: [contractId],
  });
  await agentPublicClient.waitForTransactionReceipt({ hash, timeout: 60_000 });
  return hash;
}

export async function agentClosePool(contractId: bigint): Promise<string> {
  const client = getWalletClient();
  const hash = await client.writeContract({
    address: JOUST_ARENA_ADDRESS,
    abi: joustArenaAbi,
    functionName: "closePool",
    args: [contractId],
  });
  await agentPublicClient.waitForTransactionReceipt({ hash, timeout: 60_000 });
  return hash;
}

export async function agentSettlePool(contractId: bigint, winningJoustType: number): Promise<string> {
  const client = getWalletClient();
  const hash = await client.writeContract({
    address: JOUST_ARENA_ADDRESS,
    abi: joustArenaAbi,
    functionName: "settlePoolAndPayout",
    args: [contractId, winningJoustType],
  });
  await agentPublicClient.waitForTransactionReceipt({ hash, timeout: 60_000 });
  return hash;
}

export async function getAgentBalance(): Promise<bigint> {
  return agentPublicClient.getBalance({ address: getAccount().address });
}
