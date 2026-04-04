# Joust World Mini App — Comprehensive Code Review

**Date:** 2026-04-04  
**Scope:** Full codebase (53 TS/TSX files, 4 Solidity contracts, Prisma schema)  
**Priority:** Security → Correctness → Demo Readiness

---

## Critical — Security Vulnerabilities

### C1. `record-tx` has no authorization check — anyone can manipulate pool state

**File:** `src/app/api/pool/[id]/record-tx/route.ts:43-56`  
**Impact:** Any authenticated user can call this endpoint with a valid tx hash and change any pool's state (deploy, settle, refund, close). The route checks `requireSession()` but never verifies the caller is the pool creator or arbiter.

**Example attack:** User A creates a pool. User B (any authenticated user) submits a `settle` action with a valid tx hash from an unrelated transaction and a `winningJoustType` of their choice, changing the pool's DB state to SETTLED and marking their own joust as the winner.

**Suggested fix:** After fetching the pool, verify that `session.userId === pool.creatorId` (for deploy) or `session.address === pool.arbiterAddress` (for arbiter actions like accept, close, settle, refund).

---

### C2. `record-tx` does not verify the tx actually targets the correct contract or pool

**File:** `src/app/api/pool/[id]/record-tx/route.ts:59-62`  
**Impact:** The endpoint only checks that the tx hash exists and succeeded on-chain. It does NOT verify that the transaction was sent to `JOUST_ARENA_ADDRESS` or that it operated on the correct `contractId`. An attacker could submit any successful tx hash to manipulate pool state.

**Suggested fix:** Parse the transaction receipt logs — decode the event (e.g., `PoolSettled`, `PoolClosed`) and verify it matches the expected contract address and pool `contractId`.

---

### C3. Middleware sets `Access-Control-Allow-Origin: *` on all API routes

**File:** `src/middleware.ts:7`  
**Impact:** Any website can make cross-origin requests to your API routes. Combined with the iron-session cookie (which has `sameSite: "lax"`), this means:

- GET requests from any origin will include the session cookie and succeed
- POST requests from a browser form submit would also include the cookie

For a World Mini App that only runs inside World App, the CORS header should be restricted.

**Suggested fix:** Set `Access-Control-Allow-Origin` to your specific app domain(s) or the World App origin, not `*`. At minimum, for POST/PATCH endpoints, verify the `Origin` header matches expected values.

---

### C4. Push notification endpoint has no authentication

**File:** `src/lib/notifications.ts:10-35`  
**Impact:** The `sendPushNotification` function calls the World Developer API without an API key or bearer token. The `NEXT_PUBLIC_APP_ID` is a public value. If the World Developer API requires auth (and it likely does), notifications will silently fail. If it doesn't require auth, anyone could send push notifications to any wallet address using your app ID.

**Suggested fix:** Check World Developer docs for required authentication. Add an API key/bearer token to the request headers. The secret should be in a server-only env var (not `NEXT_PUBLIC_*`).

---

### C5. Profile picture stored as data URL directly in database — XSS vector

**File:** `src/app/api/profile/route.ts:8-9`, `src/app/profile/page.tsx:129`  
**Impact:** The `pfp` field accepts up to 200KB of arbitrary string data and is rendered directly via `<img src={user.pfp}>`. While data URLs in `<img>` tags are generally safe, the validation is minimal — there's no check that it's actually an image data URL vs. a `javascript:` URL or SVG with embedded scripts. Also, 200KB data URLs stored in the DB for every user is a scalability concern.

**Suggested fix:** Validate that the pfp starts with `data:image/` and contains only expected characters. Better yet, upload to Vercel Blob or a similar service and store the URL.

---

### C6. Joust creation doesn't verify the tx hash on-chain

**File:** `src/app/api/joust/route.ts:70-78`  
**Impact:** Unlike `record-tx`, the joust endpoint doesn't verify the provided `txHash` on-chain at all. A user could submit a joust with a fabricated or reused tx hash, creating a DB record that doesn't correspond to real on-chain stakes. The DB `totalAmountJousted` would diverge from on-chain reality.

**Suggested fix:** Verify the tx receipt like `record-tx` does — check it exists, succeeded, and ideally that it emitted a `NewJoust` event for the correct pool and amount.

---

## Warning — Logic Bugs & Race Conditions

### W1. Pool state check uses `"PENDING"` but the actual state is `"PENDING_ARBITER"`

**File:** `src/app/pool/[id]/page.tsx:290`  
**Impact:** The arbiter "Accept" button condition checks `pool.state === "PENDING"` but the DB enum is `PENDING_ARBITER`. The accept button will never appear for the arbiter.

**Suggested fix:** Change to `pool.state === "PENDING_ARBITER"`.

---

### W2. `JOUST_LIMITS_BY_COLLATERAL` uses mixed-case key but lookup is `.toLowerCase()`

**File:** `src/lib/world-id.ts:19-21`  
**Impact:** The USDC address key in `JOUST_LIMITS_BY_COLLATERAL` starts with uppercase `0x79a...` but `getDeviceJoustLimit` calls `.toLowerCase()` on the input. This works. However, the ETH zero-address key is all lowercase already. The issue is that the joust route at `src/app/api/joust/route.ts:61` calls `getDeviceJoustLimit(pool.collateral)` and `pool.collateral` is stored lowercase in the DB. Since the map key for USDC has mixed case (`0x79A...`), the lookup will **fail** for USDC collateral — the limit won't be found, returning `null`, and the `if (limit && amount > limit)` check will be skipped, effectively removing the device-level limit for USDC.

**Suggested fix:** Normalize the keys in `JOUST_LIMITS_BY_COLLATERAL` to all-lowercase.

---

### W3. Race condition in pool creation — DB record created before on-chain tx

**File:** `src/app/create/page.tsx:44-161`  
**Impact:** The create flow is: (1) create DB pool record, (2) deploy on-chain, (3) record tx. If step 2 fails, a DB record exists with no `contractId`. The pool list already filters these out (`where.contractId = { not: null }`), but the orphaned records accumulate. Also, if the user navigates away during step 2, the pool is stuck in limbo.

**Suggested fix:** Consider creating the DB record only after the on-chain tx confirms (or add a cleanup mechanism for orphaned pools). At minimum, add a retry/cleanup flow.

---

### W4. `settlePool` on-chain only takes fees — does NOT pay out winners

**File:** `contracts/src/JoustArena.sol:254-267`, `src/app/pool/[id]/page.tsx:256-260`  
**Impact:** The frontend calls `settlePoolAndPayout` (which pays winners), but the contract also exposes `settlePool` (which only takes fees and does NOT pay winners). If `settlePool` is called instead (e.g., by interacting directly with the contract), winners would need to call `claimPayout` individually. The frontend has no claim UI. This isn't a bug per se, but it's a risk if settlement happens outside the app.

**Suggested fix:** Add a "Claim Payout" button in the pool detail page for settled pools where `isSettledAndPaid === false`. Or, document that `settlePoolAndPayout` must always be used.

---

### W5. Honor score uses `Float` for `score` but increments with integers

**File:** `prisma/schema.prisma:179`, `src/app/api/honor/route.ts:76-89`  
**Impact:** The `HonorScore.score` is `Float` but is only ever incremented/decremented by 1. This works but Float introduces floating-point precision issues over time. With enough votes, you could get scores like `4.000000000000001`.

**Suggested fix:** Change to `Int` to match the actual usage.

---

### W6. No validation that `joustType` matches pool options in joust creation

**File:** `src/app/api/joust/route.ts:50-57`  
**Impact:** The API validates the pool is active but doesn't check that the submitted `joustType` is valid for this pool's options. The contract validates this, so the on-chain tx would fail, but the DB joust record could still be created if the tx hash verification is also missing (see C6).

**Suggested fix:** Add `joustType` validation against the pool's options before creating the DB record.

---

### W7. `totalAmountJousted` can diverge from on-chain `totalAmount`

**File:** `src/app/api/joust/route.ts:81-84`  
**Impact:** The DB increments `totalAmountJousted` based on what the user claims, without verifying the actual on-chain amount. Combined with C6 (no tx verification), this could be manipulated.

**Suggested fix:** Depends on fixing C6 — once tx verification is in place, this is mitigated.

---

### W8. `canSettlePool` checks for `state === "CLOSED"` but arbiter can settle ACTIVE expired pools

**File:** `src/app/pool/[id]/page.tsx:292`  
**Impact:** The contract's `_settlePool` function doesn't require the pool to be closed — only that the arbiter or owner calls it and it's unsettled. But the frontend only shows the settle button when `state === "CLOSED"`. An arbiter could miss that they need to close before settling in the UI, even though the contract would allow settling an active pool.

**Suggested fix:** Also allow settling when `pool.state === "ACTIVE" && expired`.

---

## Info — Code Quality & Demo Polish

### I1. `any` types used pervasively in components

**Files:** Multiple — `page.tsx:57`, `page.tsx:74`, `pool-card.tsx`, `notification-bell.tsx:10`  
**Impact:** Loss of type safety. React Query responses, pool data, and notification arrays are all `any`.

**Suggested fix:** Define shared types (or export them from hooks) and use them consistently.

---

### I2. `QueryClient` instantiated at module level in providers

**File:** `src/components/providers.tsx:9`  
**Impact:** In Next.js with server rendering, a module-level `QueryClient` is shared across all requests, potentially leaking data between users. For a client-only mini app this is less risky, but it's still a React Query anti-pattern.

**Suggested fix:** Create the `QueryClient` inside the component using `useState` or `useRef`.

---

### I3. `BigInt.prototype.toJSON` monkey-patch in layout.tsx

**File:** `src/app/layout.tsx:2-4`  
**Impact:** This is a global prototype mutation that runs server-side. It works but is fragile — other code that serializes BigInt may behave unexpectedly. It also only works because Next.js happens to load this module before API route serialization.

**Suggested fix:** This is a common hack and acceptable for a hackathon. For production, use a custom JSON serializer or Prisma middleware.

---

### I4. `useEthPrice` fetches on every mount with no caching

**File:** `src/hooks/use-eth-price.ts`  
**Impact:** Every component mount triggers a CoinGecko API call. CoinGecko has rate limits. Multiple components using this hook will hammer the API.

**Suggested fix:** Use React Query with a `staleTime` of 30-60 seconds, or cache at the provider level.

---

### I5. Notification dropdown has no click-outside-to-close behavior

**File:** `src/components/notification-bell.tsx:36-67`  
**Impact:** The dropdown stays open until the bell is clicked again. Users expect clicking outside to close it.

**Suggested fix:** Add a click-outside handler or use a portal/popover component.

---

### I6. Pool detail page creates a new `publicClient` on every render

**File:** `src/app/create/page.tsx:94-97`  
**Impact:** Inside the `handleSubmit` function, a new viem `publicClient` is created. While inside a callback (not on render), there's already a shared `publicClient` in `src/lib/viem-server.ts` that could be reused. However, that file is server-only. For client-side, consider a shared client in the providers.

---

### I7. `viem-server.ts` uses default RPC without explicit URL

**File:** `src/lib/viem-server.ts:5-7`  
**Impact:** `http()` with no URL defaults to the chain's public RPC. For World Chain, this may be rate-limited or unreliable. The `.env.example` mentions `WORLD_CHAIN_RPC` but it's not used here.

**Suggested fix:** Use `http(process.env.WORLD_CHAIN_RPC)` for the server client.

---

### I8. Joust amounts displayed as raw BigInt strings on home page

**File:** `src/app/page.tsx:109`  
**Impact:** `{joust.amount} staked` renders the raw BigInt string (e.g., "500000000000000" instead of "0.0005 ETH"). Looks broken in the UI.

**Suggested fix:** Use `formatAmount(BigInt(joust.amount.toString()), collateral.decimals)` with the pool's collateral info.

---

### I9. `Eruda` loads from CDN on all dev builds, including during demo

**File:** `src/components/eruda.tsx`  
**Impact:** If you demo from a dev build, Eruda's debug console will be visible. The `NODE_ENV` check works if you build for production, but if you're using `npm run dev` through ngrok for testing, the debug overlay shows up.

**Suggested fix:** Consider an explicit `NEXT_PUBLIC_ENABLE_ERUDA` flag instead of relying on `NODE_ENV`.

---

### I10. `PoolState` lifecycle bar is missing `PENDING_ARBITER` stage

**File:** `src/app/pool/[id]/page.tsx:20`  
**Impact:** `LIFECYCLE_STAGES` lists `"PENDING"` but the actual state is `"PENDING_ARBITER"`. The lifecycle bar won't highlight correctly for pending pools.

**Suggested fix:** Change `"PENDING"` to `"PENDING_ARBITER"` in the stages array.

---

## Solidity Contract Notes

### S1. `rescuePool` is a powerful owner-only escape hatch — document clearly

**File:** `contracts/src/JoustArena.sol:415-421`  
**Impact:** The owner can drain funds from any unsettled pool. This is a trust assumption that hackathon judges may flag. The comment says "USE WITH EXTREME CAUTION" which is good.

**Recommendation:** Mention this in your hackathon presentation as a safety feature, not a bug. Consider adding a timelock or multisig requirement for production.

---

### S2. `settlePool` pays fees but doesn't pay winners — potential fund lock

**File:** `contracts/src/JoustArena.sol:254-267`  
**Impact:** If `settlePool` (not `settlePoolAndPayout`) is called, house+arbiter fees are paid but winner payouts aren't. Winners must individually call `claimPayout`. If no UI exists for claiming, funds sit in the contract.

**Recommendation:** This is by design (allows gas-efficient settling for large pools), but the frontend should support the claim flow.

---

### S3. No event emitted on claim

**File:** `contracts/src/JoustArena.sol:299-324`  
**Impact:** `claimPayout` doesn't emit an event, making it harder to index and track claims off-chain.

---

## Summary

| Severity     | Count | Key Themes                                                                                     |
| ------------ | ----- | ---------------------------------------------------------------------------------------------- |
| **Critical** | 6     | Missing authorization on record-tx, no tx verification on jousts, open CORS, notification auth |
| **Warning**  | 8     | State name mismatch, case-sensitive lookup bug, race conditions, missing UI flows              |
| **Info**     | 10    | Type safety, caching, display bugs, dev tooling                                                |
| **Solidity** | 3     | Rescue escape hatch, claim flow gap, missing events                                            |

### Top 5 Priority Fixes (for hackathon readiness)

1. **C1 + C2**: Add authorization and tx verification to `record-tx` — this is the most exploitable vulnerability
2. **W1 + W10**: Fix `"PENDING"` → `"PENDING_ARBITER"` mismatch — the arbiter flow is completely broken in the UI
3. **C6**: Add tx verification to joust creation — without this, DB state can't be trusted
4. **C3**: Restrict CORS — at minimum change `*` to your app domain
5. **I8**: Fix raw BigInt display on home page — visible UI bug that looks bad in a demo
