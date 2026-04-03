"use client";

import { useReadContract } from "wagmi";
import { joustArenaAbi } from "@/lib/abi";
import { JOUST_ARENA_ADDRESS } from "@/lib/contracts";

export function useContractPool(poolId: bigint | undefined) {
  return useReadContract({
    address: JOUST_ARENA_ADDRESS,
    abi: joustArenaAbi,
    functionName: "getPool",
    args: poolId !== undefined ? [poolId] : undefined,
    query: { enabled: poolId !== undefined },
  });
}

export function useContractJousts(poolId: bigint | undefined) {
  return useReadContract({
    address: JOUST_ARENA_ADDRESS,
    abi: joustArenaAbi,
    functionName: "getJousts",
    args: poolId !== undefined ? [poolId] : undefined,
    query: { enabled: poolId !== undefined },
  });
}

export function useContractPoolCounter() {
  return useReadContract({
    address: JOUST_ARENA_ADDRESS,
    abi: joustArenaAbi,
    functionName: "poolCounter",
  });
}

export function useIsCollateralSupported(tokenAddress: `0x${string}` | undefined) {
  return useReadContract({
    address: JOUST_ARENA_ADDRESS,
    abi: joustArenaAbi,
    functionName: "isCollateralSupported",
    args: tokenAddress ? [tokenAddress] : undefined,
    query: { enabled: !!tokenAddress },
  });
}
