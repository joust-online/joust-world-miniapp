# Joust World Mini App — Post-Review Implementation Spec

**Date:** 2026-04-04
**Goal:** Fix all critical/warning findings from the comprehensive review, add type safety infrastructure, and polish for hackathon demo readiness.

---

## Phase 1: Security Hardening

### C1 + C2: Authorization & Tx Verification in `record-tx` (+ eliminate client-side viem)

**File:** `src/app/api/pool/[id]/record-tx/route.ts`

**Key architectural change:** ALL receipt parsing and log decoding moves server-side. The client never provides `contractId` or other data extractable from logs — the server extracts everything it needs from the tx receipt. This eliminates client-side viem entirely and removes a fragile step from the create/settle/refund flows.

**New create pool flow:**

```
Client:  createPool DB → sendTransaction(MiniKit) → poll World API for txHash → POST record-tx { txHash, action: "deploy" }
Server:  fetch receipt → verify tx targets JOUST_ARENA_ADDRESS → decode PoolCreated event → extract contractId → update DB
```

**Changes:**

1. After fetching the pool, verify authorization:
   - `deploy`: `session.userId === pool.creatorId`
   - `accept-arbiter`, `close`, `settle`, `refund`: `session.address.toLowerCase() === pool.arbiterAddress.toLowerCase()`
2. Parse the tx receipt logs and verify:
   - The tx targets `JOUST_ARENA_ADDRESS`
   - The emitted event matches the claimed action (e.g., `PoolSettled` for settle, `PoolClosed` for close)
   - The event's `poolId` matches the pool's `contractId`
3. For `deploy` action: extract `contractId` from `PoolCreated`/`PoolCreationPending` event logs (remove `contractId` from request body)
4. Remove `contractId` from `recordTxSchema` (no longer client-provided)
5. Remove client-side viem from `src/app/create/page.tsx` (no more `createPublicClient`, `decodeEventLog`, `getTransactionReceipt` on client)
6. Import the ABI and use viem's `decodeEventLog` to parse receipt logs server-side

**New dependency:** Import `joustArenaAbi` and `JOUST_ARENA_ADDRESS` in the route.

### C3: CORS Lockdown

**Files:** `src/middleware.ts`, `next.config.ts` (or `next.config.mjs`)

**Changes:**

1. Remove the blanket `Access-Control-Allow-Origin: *` from middleware
2. Add proper CORS headers via `next.config` headers config:
   - Allow origin: the app's Vercel domain + localhost + ngrok pattern
   - Or, keep middleware but dynamically check the `Origin` header against an allowlist
3. For API routes specifically, validate `Origin` on POST/PATCH requests
4. Keep the middleware matcher on `/api/:path*`

**Decision:** Use middleware with dynamic origin checking (simpler than next.config for multiple dynamic origins like ngrok). Store allowed origins in env var `ALLOWED_ORIGINS` (comma-separated).

### C4: Push Notification Auth

**Action:** Check World Developer API docs for required authentication on the send-notification endpoint.

**Changes:**

1. If API key required: add `WORLD_API_KEY` env var, pass as Bearer token in notification requests
2. Rename `NEXT_PUBLIC_APP_ID` → keep it as `NEXT_PUBLIC_APP_ID` since it IS needed client-side (MiniKit uses it). But the notification endpoint should use a server-only `WORLD_APP_ID` (same value, but not exposed to client bundle)
3. Review all env var usage:
   - `NEXT_PUBLIC_APP_ID` — keep (MiniKit client needs it)
   - `WORLD_RP_ID` — already server-only, good
   - `WORLD_SIGNING_KEY` — already server-only, good
   - Add `WORLD_API_KEY` if needed for notifications

### C5: R2 Image Upload for Profile Pictures

**New files:**

- `src/app/api/upload-token/route.ts` — presigned URL generation (adapted from main project, simplified: no rate limiting, no Sentry)
- `src/lib/r2.ts` — S3 client setup + helper functions
- `src/lib/image-urls.ts` — `getPfpUrl()` helper

**Modified files:**

- `src/app/api/profile/route.ts` — accept filename string instead of data URL for `pfp`
- `src/app/profile/page.tsx` — replace inline resize+data URL with upload-to-R2 flow
- `prisma/schema.prisma` — `pfp` field stays `String?` but now stores filepath, not data URL (max length reduced)

**Env vars needed:**

- `CLOUDFLARE_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `NEXT_PUBLIC_R2_PFPS_BUCKET_URL`

**Approach:** Simplified version of main project's upload. No cropper library for now (keep the existing client-side resize, upload the result to R2 instead of storing as data URL). Can add cropper later.

### C6: On-Chain Tx Verification for Joust Creation

**File:** `src/app/api/joust/route.ts`

**Changes:**

1. Import `publicClient` from `viem-server.ts`
2. After validating the request body, fetch the tx receipt
3. Verify receipt status is `success`
4. Decode logs to find `NewJoust` event matching pool's `contractId` and the claimed amount
5. Use the on-chain amount as the source of truth for the DB record

---

## Phase 2: Correctness Fixes

### W1: Use Prisma Generated PoolState Enum

**Files:** All files referencing pool state strings

**Changes:**

1. Import `PoolState` from `@prisma/client` (or `@/generated/prisma` if using custom output)
2. Replace all string literals like `"ACTIVE"`, `"PENDING_ARBITER"`, `"SETTLED"`, `"REFUNDED"` with `PoolState.ACTIVE`, etc.
3. Fix the `LIFECYCLE_STAGES` in pool detail page to use `PoolState.PENDING_ARBITER` (not `"PENDING"`)
4. Fix `canAcceptArbiter` check: `pool.state === PoolState.PENDING_ARBITER`

### W2: Normalize Address Casing

**Decision:** Lowercase everywhere (matches current DB storage pattern).

**Changes:**

1. Fix `JOUST_LIMITS_BY_COLLATERAL` keys to all-lowercase
2. Audit all address comparisons to ensure `.toLowerCase()` is used consistently
3. The DB already stores lowercase — no migration needed

### W3: Lightweight Retry for Orphaned Pools

**Current flow:** DB record first → chain tx → record-tx to link them.
**Rationale:** Keeps this order (avoids confirmed-on-chain-but-no-DB-record scenario).

**Changes:**

1. Add `deployTxHash` field to Pool schema — store the tx hash immediately when the chain tx is submitted (before confirmation)
2. On the create page, if step 2 (chain tx) fails, show a "Retry Deployment" button that re-attempts the chain tx using the existing DB pool record
3. Add a cleanup: pools with no `contractId` older than 1 hour can be soft-deleted or marked as `FAILED`

### W4: Document settlePoolAndPayout Requirement

**Changes:**

1. Add comment in `src/lib/minikit.ts` near settle helpers
2. Add note in `CLAUDE.md` about settlement flow
3. No code change — frontend already uses `settlePoolAndPayout`

### W5: HonorScore.score Int Migration

**File:** `prisma/schema.prisma`

**Changes:**

1. Change `score Float @default(0)` → `score Int @default(0)`
2. Generate migration
3. Update any `.toFixed()` calls on score display

### W6: Validate joustType Against Pool Options

**File:** `src/app/api/joust/route.ts`

**Changes:**

1. After fetching the pool, also fetch its options (or include in the query)
2. Verify `data.joustType` exists in the pool's options
3. Return 400 if invalid

### W7: Reconcile DB Amounts with On-Chain

**Depends on:** C6

**Changes:**

1. After tx verification in joust creation, use the on-chain event's `amount` field as the source of truth
2. Store that verified amount in the DB joust record
3. Increment `totalAmountJousted` with the verified amount

### W8: Allow Settle from Active + Expired State

**File:** `src/app/pool/[id]/page.tsx`

**Changes:**

1. `canSettlePool` logic: allow when arbiter AND pool is (CLOSED OR (ACTIVE && expired))
2. Add clear UI label: when settling an active-but-expired pool, show "This pool has expired. Select the winning outcome to settle."
3. Close is still available as a separate action (stops new jousts before expiry)

---

## Phase 3: Type Safety & Infrastructure

### Superjson Serialization

**New files:**

- `src/lib/api-client.ts` — simplified ApiClient class using superjson (adapted from main project, no Sentry/rate-limit)
- `src/lib/api-request.ts` — `parseRequestBody()` using superjson
- `src/lib/api-response.ts` — `createApiResponse()`, `createErrorResponse()`, `createValidationErrorResponse()` using superjson

**Changes:**

- Remove `BigInt.prototype.toJSON` hack from `layout.tsx`
- All API routes use `createApiResponse()` instead of `NextResponse.json()`
- All client-side fetches use `apiClient.get/post/patch()` instead of raw `fetch()`
- Install `superjson` package

### Zod Schemas & API Types

**New files:**

- `src/lib/api-schema.ts` — Zod schemas for all endpoints (adapted from main project, trimmed to this app's ~8 endpoints)
- `src/lib/api-types.ts` — TypeScript types for API responses, derived from Prisma types

**Schemas needed:**

- `createPoolSchema` (already exists, enhance)
- `createJoustSchema` (already exists, enhance)
- `honorVoteSchema` (already exists)
- `updateProfileSchema` (already exists, enhance)
- `recordTxSchema` (already exists, enhance)
- Response types for all GET endpoints

### Typed Hooks

**Modified files:** All hooks in `src/hooks/`

**Changes:**

- Import response types from `api-types.ts`
- Use `apiClient` instead of raw `fetch()`
- Type all `useQuery` and `useMutation` generics properly
- Remove `any` types from component props by importing shared types

### Server-Side Receipt Parsing (done as part of C1+C2)

Already handled in Phase 1 (C1+C2). The `record-tx` endpoint extracts all data from tx receipts server-side. No client-side viem needed.

**Remaining:** `src/lib/viem-server.ts` uses `process.env.WORLD_CHAIN_RPC` for the transport URL (covered in I7).

**Client-side viem removal:**

- Remove `viem` imports from `src/app/create/page.tsx` (createPublicClient, decodeEventLog, http)
- Remove `worldchain` import from create page
- Simplify create flow: after MiniKit tx confirms, just POST txHash to record-tx

---

## Phase 4: Polish

### I4: ETH Price Caching

- Convert `useEthPrice` to use React Query with `staleTime: 60_000`
- Consider Upstash Redis cache if CoinGecko rate limits become an issue (flag for later)

### I5: Shadcn Components

- **Deferred to parallel worktree** — mechanical refactor of buttons, inputs, dropdowns, notification popover
- Can be done by a separate agent after Phases 1-3 complete

### I7: Use WORLD_CHAIN_RPC

- Update `src/lib/viem-server.ts`: `http(process.env.WORLD_CHAIN_RPC)`

### I8: Port Token Formatting Helpers

- Add `parseTokenAmount()` and `formatTokenAmount()` from main project to `src/lib/utils.ts`
- Replace existing `formatAmount()` with `formatTokenAmount()`
- Fix raw BigInt display on home page

### I9: Eruda Flag

- Add `NEXT_PUBLIC_ENABLE_ERUDA` env var
- Change check from `process.env.NODE_ENV !== "development"` to `process.env.NEXT_PUBLIC_ENABLE_ERUDA !== "true"`

### I10: Prisma Enums for Lifecycle

- Same as W1 — use `PoolState` enum throughout

### S1: Solidity Documentation

- Add comments to `rescuePool` about production safety measures (timelock, multisig, etc.)

### S2: Claim Flow Documentation

- Add TODO comments in contract and frontend about claim UI needed for `settlePool` (non-payout) path

### S3: Missing Claim Event Documentation

- Document the missing `Claim` event in `claimPayout` for partner to add

---

## Implementation Order

1. **Phase 1** (security) — all critical, blocks deployment
2. **Phase 2** (correctness) — blocks demo
3. **Phase 3** (types/infra) — quality, reduces future bugs
4. **Phase 4** (polish) — demo quality, parallel-friendly

Estimated: Phases 1-3 are the core work. Phase 4's shadcn refactor can run in a parallel worktree.

---

## Dependencies & New Packages

- `superjson` — serialization
- `@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner` — R2 upload

## Env Vars to Add

- `ALLOWED_ORIGINS` — comma-separated allowed CORS origins
- `WORLD_API_KEY` — if needed for push notifications (pending docs check)
- `WORLD_CHAIN_RPC` — already in .env.example, just need to use it
- `CLOUDFLARE_ACCOUNT_ID` — R2
- `R2_ACCESS_KEY_ID` — R2
- `R2_SECRET_ACCESS_KEY` — R2
- `NEXT_PUBLIC_R2_PFPS_BUCKET_URL` — R2 public URL
- `NEXT_PUBLIC_ENABLE_ERUDA` — debug console toggle
