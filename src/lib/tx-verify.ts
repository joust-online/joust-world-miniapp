import { decodeEventLog, type Abi, type Log } from "viem";
import { publicClient } from "./viem-server";
import { joustArenaAbi } from "./abi";
import { JOUST_ARENA_ADDRESS } from "./contracts";

/**
 * Fetch a tx receipt and verify it succeeded.
 * Returns the receipt or throws.
 */
export async function getVerifiedReceipt(txHash: `0x${string}`) {
  const receipt = await publicClient.getTransactionReceipt({ hash: txHash });

  if (!receipt || receipt.status !== "success") {
    throw new TxVerificationError("Transaction not found or failed");
  }

  return receipt;
}

/**
 * Decode all JoustArena events from a tx receipt's logs.
 * Filters to only logs emitted by JOUST_ARENA_ADDRESS.
 */
export function decodeContractLogs(logs: Log[]) {
  const decoded: { eventName: string; args: Record<string, unknown> }[] = [];

  for (const log of logs) {
    if (log.address.toLowerCase() !== JOUST_ARENA_ADDRESS.toLowerCase()) continue;
    try {
      const event = decodeEventLog({
        abi: joustArenaAbi as Abi,
        data: log.data,
        topics: log.topics,
      });
      decoded.push({
        eventName: event.eventName as unknown as string,
        args: (event.args ?? {}) as Record<string, unknown>,
      });
    } catch {
      // Not a known event from our ABI, skip
    }
  }

  return decoded;
}

/**
 * Find a specific event in decoded logs by name.
 * Throws if not found.
 */
export function requireEvent(
  decodedLogs: ReturnType<typeof decodeContractLogs>,
  ...eventNames: string[]
) {
  const event = decodedLogs.find((e) => eventNames.includes(e.eventName));
  if (!event) {
    throw new TxVerificationError(
      `Expected event ${eventNames.join(" or ")} not found in transaction logs`,
    );
  }
  return event;
}

export class TxVerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TxVerificationError";
  }
}
