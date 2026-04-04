# Security & Correctness Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all critical security vulnerabilities (C1-C6), correctness bugs (W1-W8), and add type safety infrastructure for the Joust World Mini App hackathon project.

**Architecture:** The core change is moving ALL on-chain verification server-side into the `record-tx` endpoint, eliminating client-side viem usage. API routes get proper authorization, tx log verification, and typed responses. SuperJSON replaces the BigInt prototype hack for serialization.

**Tech Stack:** Next.js 15 App Router, Prisma + PostgreSQL, viem (server-only), iron-session, MiniKit, SuperJSON, Zod, React Query

---

## File Map

### New Files

- `src/lib/tx-verify.ts` — Server-side tx receipt verification + event log decoding
- `src/lib/api-client.ts` — SuperJSON-based API client for client-side fetches
- `src/lib/api-response.ts` — SuperJSON response helpers for API routes
- `src/lib/api-types.ts` — Shared TypeScript types for API request/response shapes
- `src/lib/api-schema.ts` — Zod schemas for all API endpoints
- `src/lib/token-utils.ts` — `parseTokenAmount()` and `formatTokenAmount()` helpers
- `src/lib/r2.ts` — S3/R2 client setup
- `src/lib/image-urls.ts` — `getPfpUrl()` helper
- `src/app/api/upload-token/route.ts` — Presigned URL generation for R2 uploads

### Modified Files

- `src/app/api/pool/[id]/record-tx/route.ts` — Authorization + tx verification (C1+C2)
- `src/middleware.ts` — CORS lockdown (C3)
- `src/lib/notifications.ts` — API key auth for push notifications (C4)
- `src/app/api/profile/route.ts` — Accept filepath instead of data URL (C5)
- `src/app/profile/page.tsx` — Upload to R2 instead of storing data URL (C5)
- `src/app/api/joust/route.ts` — Tx verification + joustType validation (C6, W6, W7)
- `src/app/pool/[id]/page.tsx` — Fix state checks, lifecycle bar, settle logic (W1, W8)
- `src/app/create/page.tsx` — Remove client-side viem, simplify flow (C1+C2)
- `src/lib/world-id.ts` — Fix address casing (W2)
- `src/lib/viem-server.ts` — Use WORLD_CHAIN_RPC env var (I7)
- `src/lib/utils.ts` — Replace formatAmount with formatTokenAmount (I8)
- `src/hooks/use-eth-price.ts` — React Query caching (I4)
- `src/hooks/use-pool.ts` — Typed with apiClient (I1)
- `src/hooks/use-joust.ts` — Typed with apiClient (I1)
- `src/hooks/use-profile.ts` — Typed with apiClient (I1)
- `src/components/eruda.tsx` — Use NEXT_PUBLIC_ENABLE_ERUDA flag (I9)
- `src/components/providers.tsx` — Fix QueryClient instantiation (I2)
- `src/app/layout.tsx` — Remove BigInt.prototype.toJSON hack (I3)
- `prisma/schema.prisma` — HonorScore.score to Int, add deployTxHash (W3, W5)
- `.env.example` — Add new env vars

---

## Task 1: Server-Side Tx Verification Utility

**Files:**

- Create: `src/lib/tx-verify.ts`

This utility is used by both `record-tx` (Task 2) and joust creation (Task 5). Build it first.

- [ ] **Step 1: Create `src/lib/tx-verify.ts`**

```typescript
import { decodeEventLog, type Abi, type Log } from "viem";
import { publicClient } from "./viem-server";
import { joustArenaAbi } from "./abi";
import { JOUST_ARENA_ADDRESS } from "./contracts";

/**
 * Fetch a tx receipt and verify it succeeded and targets our contract.
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
        eventName: event.eventName,
        args: event.args as Record<string, unknown>,
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
```

- [ ] **Step 2: Update `src/lib/viem-server.ts` to use WORLD_CHAIN_RPC**

```typescript
import { createPublicClient, http } from "viem";
import { worldchain } from "viem/chains";

export const publicClient = createPublicClient({
  chain: worldchain,
  transport: http(process.env.WORLD_CHAIN_RPC),
});
```

- [ ] **Step 3: Verify typecheck passes**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/tx-verify.ts src/lib/viem-server.ts
git commit -m "Add server-side tx verification utility + use WORLD_CHAIN_RPC"
```

---

## Task 2: Authorization & Tx Verification in record-tx (C1+C2)

**Files:**

- Modify: `src/app/api/pool/[id]/record-tx/route.ts`

- [ ] **Step 1: Rewrite record-tx route with authorization + log verification**

Read the current file, then replace the POST handler. Key changes:

1. Authorization check per action
2. Verify tx receipt via `getVerifiedReceipt`
3. Decode logs via `decodeContractLogs` + `requireEvent`
4. Extract `contractId` from logs for deploy (not from request body)
5. Verify event poolId matches pool.contractId for non-deploy actions

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { notifyUser } from "@/lib/notifications";
import {
  getVerifiedReceipt,
  decodeContractLogs,
  requireEvent,
  TxVerificationError,
} from "@/lib/tx-verify";

/** Notify all unique jousters in a pool. */
async function notifyAllJousters(
  poolId: string,
  type: string,
  title: string,
  body: string,
): Promise<void> {
  const jousts = await prisma.joust.findMany({
    where: { poolId },
    include: { user: { select: { id: true, address: true } } },
  });
  const notifiedUserIds = new Set<number>();
  for (const j of jousts) {
    if (notifiedUserIds.has(j.user.id)) continue;
    notifiedUserIds.add(j.user.id);
    await notifyUser(
      prisma,
      j.user.id,
      type,
      title,
      body,
      poolId,
      j.user.address,
      `/pool/${poolId}`,
    );
  }
}

const recordTxSchema = z.object({
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  action: z.enum(["deploy", "accept-arbiter", "close", "settle", "refund"]),
  winningJoustType: z.number().optional(),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireSession();
    const { id } = await params;
    const body = await req.json();
    const parsed = recordTxSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { txHash, action, winningJoustType } = parsed.data;

    const pool = await prisma.pool.findUnique({ where: { id } });
    if (!pool) {
      return NextResponse.json({ error: "Pool not found" }, { status: 404 });
    }

    // ── Authorization ──
    if (action === "deploy") {
      if (session.userId !== pool.creatorId) {
        return NextResponse.json(
          { error: "Only pool creator can record deployment" },
          { status: 403 },
        );
      }
    } else {
      if (session.address.toLowerCase() !== pool.arbiterAddress.toLowerCase()) {
        return NextResponse.json(
          { error: "Only arbiter can perform this action" },
          { status: 403 },
        );
      }
    }

    // ── Verify tx on-chain ──
    const receipt = await getVerifiedReceipt(txHash as `0x${string}`);
    const decodedLogs = decodeContractLogs(receipt.logs);

    let updatedPool;
    switch (action) {
      case "deploy": {
        const event = requireEvent(decodedLogs, "PoolCreated", "PoolCreationPending");
        const contractId = BigInt(event.args.id as bigint);

        updatedPool = await prisma.pool.update({
          where: { id },
          data: {
            contractId,
            deployedAt: new Date(),
            contractEndTime: Math.floor(pool.endTime.getTime() / 1000),
          },
        });
        break;
      }

      case "accept-arbiter": {
        requireEvent(decodedLogs, "PoolCreated");
        // Verify the event's pool id matches
        const event = decodedLogs.find(
          (e) => e.eventName === "PoolCreated" && BigInt(e.args.id as bigint) === pool.contractId,
        );
        if (!event) {
          return NextResponse.json(
            { error: "Transaction does not match this pool" },
            { status: 400 },
          );
        }

        const arbiterUser = await prisma.user.findUnique({
          where: { address: pool.arbiterAddress },
        });
        updatedPool = await prisma.pool.update({
          where: { id },
          data: {
            arbiterAccepted: true,
            state: "ACTIVE",
            ...(arbiterUser ? { arbiterId: arbiterUser.id } : {}),
          },
        });

        const creator = await prisma.user.findUnique({ where: { id: pool.creatorId } });
        if (creator) {
          await notifyUser(
            prisma,
            creator.id,
            "ARBITER_ACCEPTED",
            "Arbiter Accepted",
            `The arbiter has accepted your pool "${pool.title}".`,
            id,
            creator.address,
            `/pool/${id}`,
          );
        }
        break;
      }

      case "close": {
        const event = decodedLogs.find(
          (e) => e.eventName === "PoolClosed" && BigInt(e.args.id as bigint) === pool.contractId,
        );
        if (!event) {
          return NextResponse.json(
            { error: "Transaction does not match this pool" },
            { status: 400 },
          );
        }

        updatedPool = await prisma.pool.update({
          where: { id },
          data: { state: "CLOSED", closedAt: new Date() },
        });
        break;
      }

      case "settle": {
        if (winningJoustType === undefined) {
          return NextResponse.json(
            { error: "winningJoustType required for settle" },
            { status: 400 },
          );
        }

        const event = decodedLogs.find(
          (e) => e.eventName === "PoolSettled" && BigInt(e.args.id as bigint) === pool.contractId,
        );
        if (!event) {
          return NextResponse.json(
            { error: "Transaction does not match this pool" },
            { status: 400 },
          );
        }

        updatedPool = await prisma.pool.update({
          where: { id },
          data: { state: "SETTLED", winningJoustType, settledAt: new Date() },
        });
        await prisma.joust.updateMany({
          where: { poolId: id, joustType: winningJoustType },
          data: { isWinner: true },
        });
        await notifyAllJousters(
          id,
          "POOL_SETTLED",
          "Pool Settled",
          `The pool "${pool.title}" has been settled.`,
        );
        break;
      }

      case "refund": {
        const event = decodedLogs.find(
          (e) => e.eventName === "PoolRefunded" && BigInt(e.args.id as bigint) === pool.contractId,
        );
        if (!event) {
          return NextResponse.json(
            { error: "Transaction does not match this pool" },
            { status: 400 },
          );
        }

        updatedPool = await prisma.pool.update({
          where: { id },
          data: { state: "REFUNDED", refundedAt: new Date() },
        });
        await notifyAllJousters(
          id,
          "POOL_REFUNDED",
          "Pool Refunded",
          `The pool "${pool.title}" has been refunded.`,
        );
        break;
      }
    }

    return NextResponse.json({ pool: updatedPool });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof TxVerificationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Record tx error:", error);
    return NextResponse.json({ error: "Failed to record transaction" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Verify typecheck passes**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/api/pool/[id]/record-tx/route.ts
git commit -m "Add authorization + on-chain tx verification to record-tx (C1+C2)"
```

---

## Task 3: Remove Client-Side Viem from Create Page

**Files:**

- Modify: `src/app/create/page.tsx`

The create page currently creates a viem `publicClient` on the client to parse receipts and extract `contractId`. Now `record-tx` does this server-side.

- [ ] **Step 1: Simplify create page flow**

Remove these imports from the top of the file:

- `createPublicClient`, `http`, `decodeEventLog` from "viem"
- `worldchain` from "viem/chains"

Replace the `handleSubmit` function. The new flow is:

1. Create DB pool record
2. Send chain tx via MiniKit
3. Poll World API for txHash
4. Call record-tx with just `{ txHash, action: "deploy" }` — server extracts contractId

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  const token = COLLATERAL_TOKENS[collateral];
  const minAmountBigInt = BigInt(Math.floor(parseFloat(minAmount) * 10 ** token.decimals));
  const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

  try {
    // Step 1: Create pool record in DB
    const result = await createPool.mutateAsync({
      title,
      description: description || undefined,
      arbiterAddress: session?.user?.address,
      arbiterFee: parseInt(arbiterFee),
      collateral: token.address,
      minJoustAmount: minAmountBigInt.toString(),
      endTime: new Date(endDate).toISOString(),
      options,
    });

    const dbPoolId = result.pool.id;
    setPoolId(dbPoolId);
    setStep("deploying");

    // Step 2: Deploy to chain via MiniKit
    const txResult = await createPoolOnChain({
      arbiter: session?.user?.address,
      arbiterFee: parseInt(arbiterFee),
      collateral: token.address,
      minJoustAmount: minAmountBigInt,
      supportedJoustTypes: options.length,
      endTime: endTimestamp,
    });

    const userOpHash = txResult.userOpHash;
    setStep("recording");

    // Step 3: Poll for user operation to be mined
    let txHash: string | undefined;
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      const statusRes = await fetch(
        `https://developer.world.org/api/v2/minikit/userop/${userOpHash}`,
      );
      if (statusRes.ok) {
        const status = await statusRes.json();
        if (status.status === "success" && status.transaction_hash) {
          txHash = status.transaction_hash;
          break;
        }
      }
    }

    if (!txHash) {
      throw new Error("Transaction not confirmed after 60s");
    }

    // Step 4: Record tx — server extracts contractId from logs
    const recordRes = await fetch(`/api/pool/${dbPoolId}/record-tx`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ txHash, action: "deploy" }),
    });

    if (!recordRes.ok) {
      const err = await recordRes.json();
      throw new Error(err.error ?? "Failed to record deployment");
    }

    setStep("done");
    sendHaptic("success");
    router.push(`/pool/${dbPoolId}`);
  } catch (err) {
    console.error("Failed to create pool:", err);
    setError(err instanceof Error ? err.message : "Something went wrong");
    sendHaptic("error");
    if (poolId && step !== "form") {
      setStep("form");
    }
  }
};
```

Also remove the unused `WorldIdGate` import if still present, and remove the `viem` and `worldchain` imports.

- [ ] **Step 2: Verify typecheck passes**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Verify lint passes (no new errors)**

Run: `pnpm lint`
Expected: 0 errors (warnings are OK)

- [ ] **Step 4: Commit**

```bash
git add src/app/create/page.tsx
git commit -m "Remove client-side viem from create page — server extracts contractId"
```

---

## Task 4: CORS Lockdown (C3)

**Files:**

- Modify: `src/middleware.ts`
- Modify: `.env.example`

- [ ] **Step 1: Rewrite middleware with dynamic origin checking**

```typescript
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Allow ngrok subdomains for dev
  if (ALLOWED_ORIGINS.some((ao) => ao.includes("ngrok") && origin.endsWith(".ngrok-free.app")))
    return true;
  return false;
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin");
  const response = NextResponse.next();

  if (isAllowedOrigin(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin!);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  // Handle preflight
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
```

- [ ] **Step 2: Add ALLOWED_ORIGINS to .env.example**

Add this line to `.env.example`:

```
# CORS
ALLOWED_ORIGINS="http://localhost:3000,https://your-app.vercel.app,https://*.ngrok-free.app"
```

- [ ] **Step 3: Verify typecheck passes**

Run: `pnpm typecheck`

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts .env.example
git commit -m "CORS lockdown — restrict API access to allowed origins (C3)"
```

---

## Task 5: Joust Tx Verification + Validation (C6, W6, W7)

**Files:**

- Modify: `src/app/api/joust/route.ts`

- [ ] **Step 1: Rewrite joust POST handler with tx verification and joustType validation**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { getDeviceJoustLimit } from "@/lib/world-id";
import { notifyUser } from "@/lib/notifications";
import { getVerifiedReceipt, decodeContractLogs, TxVerificationError } from "@/lib/tx-verify";

const createJoustSchema = z.object({
  poolId: z.string().uuid(),
  joustType: z.number().int().min(1),
  amount: z.string(), // BigInt as string
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const poolId = searchParams.get("poolId");
  const userId = searchParams.get("userId");

  const where: Record<string, unknown> = {};
  if (poolId) where.poolId = poolId;
  if (userId) where.userId = parseInt(userId);

  const jousts = await prisma.joust.findMany({
    where,
    include: {
      user: { select: { id: true, username: true, address: true } },
      pool: { select: { id: true, title: true, collateral: true, state: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ jousts });
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();

    const body = await req.json();
    const parsed = createJoustSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    // Verify pool exists and is active
    const pool = await prisma.pool.findUnique({
      where: { id: data.poolId },
      include: { options: true },
    });
    if (!pool) {
      return NextResponse.json({ error: "Pool not found" }, { status: 404 });
    }
    if (pool.state !== "ACTIVE") {
      return NextResponse.json({ error: "Pool is not active" }, { status: 400 });
    }

    // W6: Validate joustType against pool options
    const validJoustTypes = pool.options.map((o) => o.joustType);
    if (!validJoustTypes.includes(data.joustType)) {
      return NextResponse.json({ error: "Invalid joust type for this pool" }, { status: 400 });
    }

    // C6: Verify the tx on-chain and extract amount from NewJoust event
    const receipt = await getVerifiedReceipt(data.txHash as `0x${string}`);
    const decodedLogs = decodeContractLogs(receipt.logs);

    const joustEvent = decodedLogs.find(
      (e) =>
        e.eventName === "NewJoust" &&
        BigInt(e.args.poolId as bigint) === pool.contractId &&
        (e.args.player as string).toLowerCase() === session.address.toLowerCase(),
    );
    if (!joustEvent) {
      return NextResponse.json(
        { error: "No matching NewJoust event found in transaction" },
        { status: 400 },
      );
    }

    // W7: Use on-chain amount as source of truth
    const verifiedAmount = BigInt(joustEvent.args.amount as bigint);

    // Device-level users have per-collateral limits
    if (session.worldIdLevel !== "orb") {
      const limit = getDeviceJoustLimit(pool.collateral);
      if (limit && verifiedAmount > limit) {
        return NextResponse.json(
          { error: "Device-verified users have limited stakes. Verify with Orb for unlimited." },
          { status: 403 },
        );
      }
    }

    const joust = await prisma.joust.create({
      data: {
        userId: session.userId,
        poolId: data.poolId,
        joustType: data.joustType,
        amount: verifiedAmount,
        txHash: data.txHash,
      },
    });

    await prisma.pool.update({
      where: { id: data.poolId },
      data: { totalAmountJousted: { increment: verifiedAmount } },
    });

    // Notify the pool's arbiter
    if (pool.arbiterId) {
      const arbiterUser = await prisma.user.findUnique({ where: { id: pool.arbiterId } });
      if (arbiterUser) {
        await notifyUser(
          prisma,
          arbiterUser.id,
          "JOUST_CREATED",
          "New Joust Placed",
          `A new joust has been placed in "${pool.title}".`,
          pool.id,
          arbiterUser.address,
          `/pool/${pool.id}`,
        );
      }
    }

    return NextResponse.json({ joust }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof TxVerificationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Create joust error:", error);
    return NextResponse.json({ error: "Failed to create joust" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Verify typecheck passes**

Run: `pnpm typecheck`

- [ ] **Step 3: Commit**

```bash
git add src/app/api/joust/route.ts
git commit -m "Add on-chain tx verification + joustType validation to joust creation (C6, W6, W7)"
```

---

## Task 6: Fix Pool State Enum Usage (W1, W10) + Settle from Active/Expired (W8)

**Files:**

- Modify: `src/app/pool/[id]/page.tsx`

- [ ] **Step 1: Import PoolState and fix all state string comparisons**

At the top of the file, add:

```typescript
import { PoolState } from "@prisma/client";
```

Then replace all pool state string literals. The key fixes:

1. `LIFECYCLE_STAGES` — change `"PENDING"` to `PoolState.PENDING_ARBITER`:

```typescript
const LIFECYCLE_STAGES = [
  PoolState.PENDING_ARBITER,
  PoolState.ACTIVE,
  PoolState.CLOSED,
  PoolState.SETTLED,
] as const;
```

2. `getPoolStatusDisplay` — use enum values:

```typescript
function getPoolStatusDisplay(
  state: string,
  expired: boolean,
  joustCount: number,
): { text: string; color: string } {
  if (state === PoolState.SETTLED) return { text: "SETTLED", color: "text-blue-400" };
  if (state === PoolState.REFUNDED) return { text: "REFUNDED", color: "text-red-400" };
  if (expired && joustCount > 0) return { text: "AWAITING SETTLEMENT", color: "text-yellow-400" };
  if (expired) return { text: "EXPIRED", color: "text-red-400" };
  if (state === PoolState.ACTIVE) return { text: "ACTIVE", color: "text-green-400" };
  if (state === PoolState.CLOSED) return { text: "CLOSED", color: "text-orange-400" };
  return { text: state, color: "" };
}
```

3. `PoolLifecycleBar` — fix refund check:

```typescript
const isRefunded = state === PoolState.REFUNDED;
```

4. Fix `isActive`:

```typescript
const isActive = pool.state === PoolState.ACTIVE && !expired;
```

5. Fix arbiter action conditions:

```typescript
const canAcceptArbiter =
  isArbiter && !pool.arbiterAccepted && pool.state === PoolState.PENDING_ARBITER;
const canClosePool = isArbiter && pool.arbiterAccepted && pool.state === PoolState.ACTIVE;
// W8: Allow settle from CLOSED or ACTIVE+expired
const canSettlePool =
  isArbiter &&
  pool.arbiterAccepted &&
  (pool.state === PoolState.CLOSED || (pool.state === PoolState.ACTIVE && expired));
const canRefundPool =
  isArbiter &&
  pool.arbiterAccepted &&
  (pool.state === PoolState.ACTIVE || pool.state === PoolState.CLOSED);
```

6. Fix settled check for winner display and honor vote:

```typescript
// In options map:
const isWinner = pool.state === PoolState.SETTLED && opt.joustType === pool.winningJoustType;

// Honor vote section:
{pool.state === PoolState.SETTLED && pool.arbiter && (
```

- [ ] **Step 2: Also fix state refs in other files that use pool state strings**

In `src/components/pool-card.tsx`, add import and update:

```typescript
import { PoolState } from "@prisma/client";

// In getDisplayState:
if (state === PoolState.SETTLED) return { text: "Settled", color: "text-blue-400" };
if (state === PoolState.REFUNDED) return { text: "Refunded", color: "text-muted-foreground" };
// ... etc for all state checks
```

In `src/app/page.tsx`, update the joust status check:

```typescript
import { PoolState } from "@prisma/client";
// ...
const isSettled = pool?.state === PoolState.SETTLED;
```

In `src/app/api/pool/route.ts`, update the filter:

```typescript
import { PoolState } from "@prisma/client";
// ...
const terminal = pool.state === PoolState.SETTLED || pool.state === PoolState.REFUNDED;
```

In `src/app/api/honor/route.ts`:

```typescript
import { PoolState } from "@prisma/client";
// ...
if (!pool || pool.state !== PoolState.SETTLED) {
```

- [ ] **Step 3: Verify typecheck passes**

Run: `pnpm typecheck`

- [ ] **Step 4: Commit**

```bash
git add src/app/pool/[id]/page.tsx src/components/pool-card.tsx src/app/page.tsx src/app/api/pool/route.ts src/app/api/honor/route.ts
git commit -m "Use Prisma PoolState enum everywhere + allow settle from active/expired (W1, W8, W10)"
```

---

## Task 7: Address Normalization + Joust Limits Fix (W2)

**Files:**

- Modify: `src/lib/world-id.ts`

- [ ] **Step 1: Normalize JOUST_LIMITS_BY_COLLATERAL keys to lowercase**

```typescript
export const JOUST_LIMITS_BY_COLLATERAL: Record<string, bigint> = {
  "0x0000000000000000000000000000000000000000": BigInt("500000000000000"), // 0.0005 ETH (~$1)
  "0x79a02482a880bce3f13e09da970dc34db4cd24d1": BigInt("1000000"), // 1 USDC
};
```

The second key was previously mixed-case `0x79A...` — now all lowercase to match DB storage.

- [ ] **Step 2: Verify typecheck passes**

Run: `pnpm typecheck`

- [ ] **Step 3: Commit**

```bash
git add src/lib/world-id.ts
git commit -m "Normalize collateral address keys to lowercase — fixes device joust limit bypass (W2)"
```

---

## Task 8: Prisma Schema Changes (W3, W5)

**Files:**

- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Update schema**

Two changes:

1. Change `HonorScore.score` from `Float` to `Int`:

```prisma
model HonorScore {
  arbiterId      Int   @id
  totalUpvotes   Int   @default(0)
  totalDownvotes Int   @default(0)
  score          Int   @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  arbiter User @relation("UserHonorScore", fields: [arbiterId], references: [id])

  @@index([score])
}
```

2. Add `deployTxHash` to Pool for retry tracking:

```prisma
model Pool {
  // ... existing fields ...
  deployTxHash       String?   @db.VarChar(66)
  // ... rest of fields ...
}
```

Add the `deployTxHash` field after `contractEndTime`.

- [ ] **Step 2: Generate migration**

Run: `npx prisma migrate dev --name honor-score-int-and-deploy-tx-hash`

Note: This requires `DATABASE_URL` to be set. If not available, run `npx prisma migrate dev --create-only` to create the migration SQL without applying it.

- [ ] **Step 3: Fix `.toFixed()` calls on honor score display**

In `src/app/leaderboard/page.tsx`, change:

```typescript
// Before:
<span className="text-sm font-semibold text-accent">{item.score.toFixed(1)}</span>
// After:
<span className="text-sm font-semibold text-accent">{item.score}</span>
```

In `src/app/profile/page.tsx`, change:

```typescript
// Before:
Score: {
  user.honorScore.score.toFixed(1);
}
// After:
Score: {
  user.honorScore.score;
}
```

- [ ] **Step 4: Verify typecheck passes**

Run: `pnpm typecheck`

- [ ] **Step 5: Commit**

```bash
git add prisma/schema.prisma prisma/migrations/ src/app/leaderboard/page.tsx src/app/profile/page.tsx
git commit -m "HonorScore.score to Int + add deployTxHash for retry tracking (W3, W5)"
```

---

## Task 9: Token Formatting Helpers (I8) + Fix Raw BigInt Display

**Files:**

- Create: `src/lib/token-utils.ts`
- Modify: `src/lib/utils.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/lib/token-utils.ts`**

```typescript
/**
 * Convert human-readable amount to wei (contract format)
 * Example: 5.5 USDC -> 5500000 (5.5 * 10^6)
 */
export function parseTokenAmount(amount: string | number, decimals: number): bigint {
  const amountStr = typeof amount === "number" ? amount.toString() : amount;
  const [whole, fraction = ""] = amountStr.split(".");
  const paddedFraction = fraction.padEnd(decimals, "0").slice(0, decimals);
  const fullAmountStr = (whole ?? "0") + paddedFraction;
  return BigInt(fullAmountStr);
}

/**
 * Convert wei to human-readable amount
 * Example: 5500000 -> "5.5" (for USDC with 6 decimals)
 */
export function formatTokenAmount(
  amount: bigint,
  decimals: number,
  fixedDecimals?: number,
): string {
  const amountStr = amount.toString();

  let whole: string;
  let fraction: string;

  if (amountStr.length <= decimals) {
    whole = "0";
    fraction = amountStr.padStart(decimals, "0");
  } else {
    whole = amountStr.slice(0, -decimals);
    fraction = amountStr.slice(-decimals);
  }

  // Remove trailing zeros from fraction
  const trimmedFraction = fraction.replace(/0+$/, "");
  const raw = trimmedFraction ? `${whole}.${trimmedFraction}` : whole;

  if (fixedDecimals !== undefined) {
    const parts = raw.split(".");
    const wholePart = parts[0] ?? "0";
    let decimalPart = parts[1] ?? "";

    if (decimalPart.length > fixedDecimals) {
      decimalPart = decimalPart.slice(0, fixedDecimals);
    } else {
      decimalPart = decimalPart.padEnd(fixedDecimals, "0");
    }

    return fixedDecimals > 0 ? `${wholePart}.${decimalPart}` : wholePart;
  }
  return raw || "0";
}
```

- [ ] **Step 2: Update `src/lib/utils.ts` — replace `formatAmount` with re-export**

Replace the existing `formatAmount` function:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

// Re-export for backwards compatibility — prefer importing from token-utils directly
export { formatTokenAmount as formatAmount } from "./token-utils";
```

- [ ] **Step 3: Fix raw BigInt display on home page**

In `src/app/page.tsx`, the joust amount displays as raw BigInt. Fix:

```typescript
import { getCollateralInfo } from "@/lib/contracts";
import { formatTokenAmount } from "@/lib/token-utils";
```

Then in the joust rendering section (around line 109), change:

```typescript
// Before:
<span>{joust.amount} staked</span>
// After:
<span>
  {formatTokenAmount(BigInt(joust.amount?.toString() ?? "0"), getCollateralInfo(pool?.collateral ?? "0x0000000000000000000000000000000000000000").decimals)}{" "}
  {getCollateralInfo(pool?.collateral ?? "0x0000000000000000000000000000000000000000").symbol} staked
</span>
```

- [ ] **Step 4: Verify typecheck passes**

Run: `pnpm typecheck`

- [ ] **Step 5: Commit**

```bash
git add src/lib/token-utils.ts src/lib/utils.ts src/app/page.tsx
git commit -m "Add formatTokenAmount/parseTokenAmount helpers + fix raw BigInt display (I8)"
```

---

## Task 10: ETH Price Caching (I4) + Eruda Flag (I9) + Provider Fix (I2)

**Files:**

- Modify: `src/hooks/use-eth-price.ts`
- Modify: `src/components/eruda.tsx`
- Modify: `src/components/dev-info.tsx`
- Modify: `src/components/providers.tsx`

- [ ] **Step 1: Convert useEthPrice to React Query**

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

export function useEthPrice(): number | null {
  const { data } = useQuery({
    queryKey: ["eth-price"],
    queryFn: async () => {
      const res = await fetch(COINGECKO_URL);
      const data = await res.json();
      return (data.ethereum?.usd as number) ?? null;
    },
    staleTime: 60_000, // Cache for 60 seconds
    refetchInterval: 60_000, // Refetch every 60 seconds
  });

  return data ?? null;
}
```

- [ ] **Step 2: Update Eruda to use NEXT_PUBLIC_ENABLE_ERUDA**

```typescript
"use client";

import Script from "next/script";

export function Eruda() {
  if (process.env.NEXT_PUBLIC_ENABLE_ERUDA !== "true") return null;

  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/eruda"
      strategy="afterInteractive"
      onLoad={() => {
        // @ts-expect-error eruda global
        if (window.eruda) window.eruda.init();
      }}
    />
  );
}
```

- [ ] **Step 3: Update DevInfo similarly**

```typescript
// Change the guard at the top of DevInfo:
if (process.env.NEXT_PUBLIC_ENABLE_ERUDA !== "true") return null;
```

- [ ] **Step 4: Fix QueryClient instantiation in providers**

```typescript
"use client";

import { MiniKitProvider } from "@worldcoin/minikit-js/minikit-provider";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { worldchain } from "wagmi/chains";

const wagmiConfig = createConfig({
  chains: [worldchain],
  transports: {
    [worldchain.id]: http(),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <MiniKitProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </MiniKitProvider>
  );
}
```

- [ ] **Step 5: Add NEXT_PUBLIC_ENABLE_ERUDA to .env.example**

Add:

```
# Debug
NEXT_PUBLIC_ENABLE_ERUDA="true"
```

- [ ] **Step 6: Verify typecheck passes**

Run: `pnpm typecheck`

- [ ] **Step 7: Commit**

```bash
git add src/hooks/use-eth-price.ts src/components/eruda.tsx src/components/dev-info.tsx src/components/providers.tsx .env.example
git commit -m "ETH price caching + Eruda env flag + fix QueryClient instantiation (I2, I4, I9)"
```

---

## Task 11: Notification Auth Check (C4)

**Files:**

- Modify: `src/lib/notifications.ts`
- Modify: `.env.example`

- [ ] **Step 1: Check World Developer API docs for auth requirements**

Use context7 MCP tool to look up the World Developer API notification endpoint auth requirements. The endpoint is `https://developer.worldcoin.org/api/v2/minikit/{app_id}/send-notification`.

- [ ] **Step 2: Update notifications.ts with proper auth**

Based on World Developer docs, the endpoint requires an API key. Update:

```typescript
const APP_ID = process.env.WORLD_APP_ID ?? process.env.NEXT_PUBLIC_APP_ID!;
const API_KEY = process.env.WORLD_API_KEY;

interface SendNotificationParams {
  walletAddresses: string[];
  title: string;
  message: string;
  miniAppPath?: string;
}

export async function sendPushNotification({
  walletAddresses,
  title,
  message,
  miniAppPath,
}: SendNotificationParams) {
  if (!API_KEY) {
    console.warn("WORLD_API_KEY not set — push notifications disabled");
    return false;
  }

  try {
    const response = await fetch(
      `https://developer.worldcoin.org/api/v2/minikit/${APP_ID}/send-notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          wallet_addresses: walletAddresses,
          title,
          message,
          mini_app_path: miniAppPath,
        }),
      },
    );
    return response.ok;
  } catch (error) {
    console.error("Push notification failed:", error);
    return false;
  }
}
```

Also update `notifyUser` to type the prisma parameter:

```typescript
import { PrismaClient } from "@prisma/client";

export async function notifyUser(
  prisma: PrismaClient,
  userId: number,
  type: string,
  title: string,
  body: string,
  poolId?: string,
  walletAddress?: string,
  miniAppPath?: string,
) {
  // ... same implementation
}
```

- [ ] **Step 3: Add WORLD_APP_ID and WORLD_API_KEY to .env.example**

```
# World App (server-only)
WORLD_APP_ID="app_xxxxxxxxxx"
WORLD_API_KEY="your-api-key"
```

- [ ] **Step 4: Verify typecheck passes**

Run: `pnpm typecheck`

- [ ] **Step 5: Commit**

```bash
git add src/lib/notifications.ts .env.example
git commit -m "Add API key auth for push notifications + server-only WORLD_APP_ID (C4)"
```

---

## Task 12: R2 Image Upload (C5)

**Files:**

- Create: `src/lib/r2.ts`
- Create: `src/lib/image-urls.ts`
- Create: `src/app/api/upload-token/route.ts`
- Modify: `src/app/api/profile/route.ts`
- Modify: `src/app/profile/page.tsx`
- Modify: `.env.example`

- [ ] **Step 1: Install S3 SDK**

Run: `pnpm add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner`

- [ ] **Step 2: Create `src/lib/r2.ts`**

```typescript
import { S3Client } from "@aws-sdk/client-s3";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});
```

- [ ] **Step 3: Create `src/lib/image-urls.ts`**

```typescript
const PFPS_BUCKET_URL = process.env.NEXT_PUBLIC_R2_PFPS_BUCKET_URL;

export function getPfpUrl(filePath: string | undefined | null): string | null {
  if (!filePath) return null;
  // If it's already a full URL or data URL (legacy), return as-is
  if (filePath.startsWith("http") || filePath.startsWith("data:")) return filePath;
  return `${PFPS_BUCKET_URL}/${filePath}`;
}
```

- [ ] **Step 4: Create `src/app/api/upload-token/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "@/lib/r2";
import { requireSession } from "@/lib/session";

const uploadTokenSchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
  bucket: z.enum(["pfps"]),
});

export async function POST(req: NextRequest) {
  try {
    await requireSession();

    const body = await req.json();
    const parsed = uploadTokenSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { bucket, filename, contentType } = parsed.data;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });

    return NextResponse.json({ uploadUrl });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Upload token error:", error);
    return NextResponse.json({ error: "Failed to generate upload token" }, { status: 500 });
  }
}
```

- [ ] **Step 5: Update profile route to accept filepath**

In `src/app/api/profile/route.ts`, update the schema:

```typescript
const updateProfileSchema = z.object({
  username: z.string().min(1).max(50).optional(),
  pfp: z.string().max(500).optional(), // filepath or URL, not data URL
});
```

- [ ] **Step 6: Update profile page to upload to R2**

In `src/app/profile/page.tsx`, replace the file input `onChange` handler. After resizing the image, upload to R2 instead of sending the data URL to the API:

```typescript
onChange={async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setUploading(true);
  try {
    // Resize image on client
    const dataUrl = await resizeImage(file, 256);

    // Convert data URL to blob for upload
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    // Get presigned upload URL
    const filename = `user_${user.id}_pfp_${Date.now()}.jpg`;
    const tokenRes = await fetch("/api/upload-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename,
        contentType: "image/jpeg",
        bucket: "pfps",
      }),
    });
    if (!tokenRes.ok) throw new Error("Failed to get upload token");
    const { uploadUrl } = await tokenRes.json();

    // Upload directly to R2
    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": "image/jpeg" },
      body: blob,
    });

    // Update profile with filepath
    const profileRes = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pfp: filename }),
    });
    if (profileRes.ok) {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    }
  } catch (err) {
    console.error("Upload failed:", err);
  } finally {
    setUploading(false);
  }
}}
```

Also update the image display to use `getPfpUrl`:

```typescript
import { getPfpUrl } from "@/lib/image-urls";

// In the render:
{user.pfp ? (
  <img src={getPfpUrl(user.pfp) ?? undefined} alt="" className="w-full h-full rounded-full object-cover" />
) : (
  "👤"
)}
```

- [ ] **Step 7: Add R2 env vars to .env.example**

```
# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
NEXT_PUBLIC_R2_PFPS_BUCKET_URL="https://your-bucket.r2.dev"
```

- [ ] **Step 8: Verify typecheck passes**

Run: `pnpm typecheck`

- [ ] **Step 9: Commit**

```bash
git add src/lib/r2.ts src/lib/image-urls.ts src/app/api/upload-token/route.ts src/app/api/profile/route.ts src/app/profile/page.tsx .env.example
git commit -m "R2 image upload for profile pictures — remove data URL storage (C5)"
```

---

## Task 13: Remove BigInt.prototype.toJSON Hack + SuperJSON Foundation (I1, I3)

**Files:**

- Create: `src/lib/api-response.ts`
- Create: `src/lib/api-client.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Install superjson**

Run: `pnpm add superjson`

- [ ] **Step 2: Create `src/lib/api-response.ts`**

```typescript
import { NextResponse } from "next/server";
import superjson from "superjson";

/**
 * Create a JSON response with SuperJSON serialization.
 * Handles Date, BigInt, undefined, etc.
 */
export function createApiResponse<T>(data: T, status = 200): NextResponse {
  const serialized = superjson.stringify(data);
  return new NextResponse(serialized, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Create an error response.
 */
export function createErrorResponse(error: string, status = 500): NextResponse {
  return createApiResponse({ error }, status);
}

/**
 * Parse request body with SuperJSON.
 */
export async function parseRequestBody<T = unknown>(request: Request): Promise<T> {
  const text = await request.text();
  try {
    return superjson.parse<T>(text);
  } catch {
    // Fall back to plain JSON for backwards compatibility
    return JSON.parse(text) as T;
  }
}
```

- [ ] **Step 3: Create `src/lib/api-client.ts`**

```typescript
import superjson from "superjson";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const text = await response.text();

    if (!response.ok) {
      let errorData: { error: string };
      try {
        errorData = superjson.parse(text);
      } catch {
        try {
          errorData = JSON.parse(text);
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
      }
      throw new Error(errorData.error);
    }

    try {
      return superjson.parse<T>(text);
    } catch {
      // Fall back to plain JSON for backwards compatibility during migration
      return JSON.parse(text) as T;
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
      const qs = searchParams.toString();
      if (qs) url += (endpoint.includes("?") ? "&" : "?") + qs;
    }
    return this.request<T>(url);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? superjson.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? superjson.stringify(data) : undefined,
    });
  }
}

export const apiClient = new ApiClient();
```

- [ ] **Step 4: Remove BigInt.prototype.toJSON hack from layout.tsx**

In `src/app/layout.tsx`, remove these lines from the top of the file:

```typescript
// Remove this:
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
```

- [ ] **Step 5: Verify typecheck passes**

Run: `pnpm typecheck`

- [ ] **Step 6: Commit**

```bash
git add src/lib/api-response.ts src/lib/api-client.ts src/app/layout.tsx package.json pnpm-lock.yaml
git commit -m "Add SuperJSON api-client + api-response, remove BigInt.prototype.toJSON hack (I1, I3)"
```

---

## Task 14: Solidity Documentation (S1, S2, S3)

**Files:**

- Modify: `contracts/src/JoustArena.sol`

- [ ] **Step 1: Add production safety comments to rescuePool**

Above the `rescuePool` function, add:

```solidity
    /// @notice USE WITH EXTREME CAUTION, must calculate correctly how many funds need saving or it could affect other pools
    /// @dev HACKATHON NOTE: In production, this function should be:
    ///   1. Protected by a timelock (e.g., 48-hour delay) so users can exit before rescue executes
    ///   2. Gated behind a multisig (e.g., Gnosis Safe) instead of single owner
    ///   3. Emit a RescueInitiated event when queued, giving users time to react
    ///   4. Limited to emergency scenarios with on-chain governance approval
    /// @param poolId the poolId to rescue
    /// @param amount the amount of funds to rescue
```

- [ ] **Step 2: Add claim flow documentation**

Above `claimPayout`, add:

```solidity
    /// @notice Allows a player to claim their payout from a settled pool
    /// @dev This function is used when settlePool() was called instead of settlePoolAndPayout().
    ///   settlePool() only pays house+arbiter fees; players must call claimPayout individually.
    ///   The frontend currently always uses settlePoolAndPayout() for convenience.
    ///   TODO: Build a "Claim Payout" UI for cases where settlePool() was used directly
    ///   (e.g., pools with many jousters where gas cost of settlePoolAndPayout is too high).
    /// @dev MISSING: This function does not emit an event. A Claimed(address indexed player,
    ///   uint256 indexed poolId, uint256 amount) event should be added for off-chain indexing.
```

- [ ] **Step 3: Commit**

```bash
git add contracts/src/JoustArena.sol
git commit -m "Add production safety docs for rescuePool + document claim flow gaps (S1, S2, S3)"
```

---

## Task 15: Verify Everything Builds

- [ ] **Step 1: Run full typecheck**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 2: Run lint**

Run: `pnpm lint`
Expected: 0 errors (warnings OK — `any` types will remain until API types are fully migrated)

- [ ] **Step 3: Run build**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 4: Run format check**

Run: `pnpm format`
Expected: All files formatted

- [ ] **Step 5: Final commit if needed**

```bash
git add -A
git commit -m "Final formatting pass after all fixes"
```
