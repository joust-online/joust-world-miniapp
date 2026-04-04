# Joust World Mini App — Implementation Plan

## Context

We're porting the Joust prediction market protocol from Abstract Chain (ZKSync) to World Chain, and building a World Mini App to run inside World App. This is for ETHGlobal Cannes 2026 hackathon targeting three World prizes:

- **Best World ID 4.0 ($8K)** — World ID as a real constraint (CORE)
- **Best MiniKit 2.0 ($4K)** — Mini App with MiniKit SDK commands (CORE)
- **Best Agent Kit ($8K)** — AI arbiters in AgentBook (NICE-TO-HAVE)

**Key insight:** A single project can qualify for ALL three. We maximize by deeply integrating World ID as a constraint, using many MiniKit commands, and optionally adding AgentKit AI arbiters.

---

## Phase 0: Smart Contract Port to World Chain (~2 hours)

### What changes

The Solidity code in `JoustArena.sol` is **pure standard EVM** — zero ZKSync-specific code. The ZKSync dependency is entirely in toolchain config (`foundry.toml` lines 18-19, `Makefile` `--zksync` flags). This is the easiest possible port.

### Steps

1. **Copy contracts into this repo** under `contracts/`
   - Copy `src/` directory (JoustArena.sol, Errors.sol, storage/JoustArenaStorage.sol, JoustProxyFactory.sol)
   - Copy `script/DeployJoustArena.s.sol`
   - Copy `test/JoustArena.t.sol` (for verification)

2. **New `contracts/foundry.toml`** — based on `/Users/moss/Documents/joust-contracts/foundry.toml`
   - Remove `[profile.default.zksync]` block (lines 18-19)
   - Change `[rpc_endpoints]`: `world-chain = "${WORLD_CHAIN_RPC}"`
   - Change `[etherscan]`: `worldchain = { chain = "480", url = "https://worldchain-mainnet.explorer.alchemy.com/api", key = "${ETHERSCAN_API_KEY}" }`
   - Keep all dependencies identical (forge-std, solmate, openzeppelin, solady)

3. **New `contracts/Makefile`** — based on `/Users/moss/Documents/joust-contracts/Makefile`
   - Remove ALL `--zksync` flags
   - Change chain IDs: 480 for mainnet
   - Change RPC URLs to World Chain

4. **Modify deploy script** — `script/DeployJoustArena.s.sol`
   - Change supported collateral addresses:
     - ETH: `address(0)` (unchanged)
     - USDC on World Chain: `0x79A02482A880bCE3F13e09Da970dC34db4CD24d1`
   - Chain ID checks: `block.chainid == 480`

5. **Build & test**

   ```bash
   cd contracts && forge soldeer update && forge build && forge test -vv
   ```

6. **Deploy to World Chain mainnet** (chain 480) — testnet is NOT supported for mini app testing per World docs

   ```bash
   forge script script/DeployJoustArena.s.sol --rpc-url $WORLD_CHAIN_RPC --chain 480 --broadcast
   ```

7. **Extract clean ABI** from `out/JoustArena.sol/JoustArena.json` — this is the base ABI without Unlink extensions (the existing `joust-app/abis/joust-unlink.abi.json` has Unlink-specific functions we don't want)

8. **Whitelist contracts in World Developer Portal** — required for MiniKit.sendTransaction to work. Register the proxy address under Mini App > Permissions.

### Key decision: Keep UUPS proxy

Already working code. Allows mid-hackathon bug fixes. Risk of switching to immutable > risk of keeping proxy.

### Key decision: No on-chain World ID

Verify at API layer, not in contract. Same UX, much simpler, standard pattern. Would require contract modifications + World ID verifier interface to do on-chain.

---

## Phase 1: Scaffold Mini App + Auth (~3 hours)

### Steps

1. **Scaffold with World template**

   ```bash
   npx @worldcoin/create-mini-app@latest
   ```

   This gives us Next.js + MiniKit + SIWE auth pre-configured.

2. **Install additional dependencies**

   ```bash
   pnpm add wagmi viem @tanstack/react-query @prisma/client zod iron-session
   pnpm add @worldcoin/idkit
   pnpm add @worldcoin/mini-apps-ui-kit-react
   pnpm add date-fns
   pnpm add -D prisma tailwindcss @types/node typescript
   ```

3. **Provider stack** — replace RainbowKit pattern from `joust-app/src/contexts/wallet-provider.tsx`

   ```
   MiniKitProvider          (from @worldcoin/minikit-react)
     > QueryClientProvider   (TanStack)
       > WagmiProvider       (reads only, no connectors — World Chain transport)
         > {children}
   ```

   No RainbowKit, no Unlink, no wallet connectors — MiniKit handles wallet.

4. **Wagmi config** — based on `joust-app/src/lib/wagmi-config.ts`
   - Single chain: `worldchain` (chain ID 480)
   - HTTP transport only (for `useReadContract` etc.)
   - No connectors needed

5. **Auth flow via MiniKit walletAuth (SIWE)**
   - `POST /api/auth` — receives SIWE message + signature from `MiniKit.walletAuth()`
   - Verify signature server-side with `verifySiweMessage()` from `@worldcoin/minikit-js/siwe`
   - Create/find user in DB, set iron-session cookie
   - Return session with userId, address, username
   - Pattern from `joust-app/src/lib/auth/actions.ts` but with SIWE signature verification

6. **Contract config** — based on `joust-app/src/lib/constants.ts`
   - `src/lib/contracts.ts` — ABI import, contract address, chain ID 480
   - `src/lib/viem-server.ts` — server-side public client for World Chain reads

7. **Register app in World Developer Portal** (needs setup — not done yet)
   - Go to developer.world.org and create account
   - Create new app → get `app_id` (format: `app_xxxxxxxxxx`)
   - Under World ID settings: get `rp_id` and `signing_key` for World ID 4.0
   - Register actions: `verify-identity`, `create-pool`, `honor-vote`
   - Under Mini App > Permissions: add contract proxy address + USDC token address to allowlist
   - Under Advanced: enable push notifications
   - Set testing URL (use ngrok tunnel to local dev)
   - **This is a manual step we need to do early — blocks testing**

---

## Phase 2: Database Setup (~2 hours, parallel with Phase 1)

### Simplified Prisma schema

Strip the existing schema at `joust-app/prisma/schema.prisma` (836 lines) down to essentials. Remove all Unlink/commitment models, beta invite system, complex event sourcing.

**Keep (simplified):**

```
User            — id, username, address, pfp, worldIdVerified, worldIdLevel, totalPoints
Pool            — id, contractId, title, description, creator, arbiter, fees, collateral, state, times
PoolOption      — id, poolId, joustType, label, orderIndex
Joust           — id, userId, poolId, joustType, amount, isWinner
Notification    — id, userId, type, title, body, poolId, read
HonorVote       — id, voterId, arbiterId, poolId, voteType
HonorScore      — arbiterId, scores, totals
WorldIdVerification — id, userId, action, nullifierHash, verificationLevel
```

**Remove entirely:**

- `Commitment`, `CommitmentRecovery` (Unlink-specific)
- `BetaTesterInvite`, `Admin` (not needed)
- `Event`, `PoolCreatedEvent`, `PoolClosedEvent`, `NewJoustEvent`, `PoolSettledEvent`, `PoolRefundedEvent` (complex event sourcing — overkill for hackathon)
- `FundMovement` (track in-line or skip)
- `PoolStateSnapshot`, `PoolDescriptionHistory`
- `UserPoolSummary`, `UserJoustSummary` (calculate on-read)
- `FailedPayout` (handle in-line)
- `Invite` (replace with MiniKit shareContacts)

**New model:**

```prisma
model WorldIdVerification {
  id                Int      @id @default(autoincrement())
  userId            Int
  user              User     @relation(fields: [userId], references: [id])
  action            String   // "verify-identity", "create-pool", "honor-vote"
  nullifierHash     String   @unique
  verificationLevel String   // "orb" or "device"
  createdAt         DateTime @default(now())
  @@index([userId])
  @@index([action, nullifierHash])
}
```

### Deploy DB

- Fresh Neon Postgres instance (separate from joust-app's existing Neon)
- Create new project at neon.tech, get DATABASE_URL + DATABASE_URL_UNPOOLED
- `npx prisma migrate dev`

---

## Phase 3: World ID Integration (~4 hours) — TARGET: Best World ID 4.0 ($8K)

This is the highest-value prize. World ID must be a **real constraint that the app breaks without**.

### World ID as Tiered Access Control

| Action                | No Verification | Device Verified      | Orb Verified            |
| --------------------- | --------------- | -------------------- | ----------------------- |
| View pools            | Yes             | Yes                  | Yes                     |
| Joust (bet)           | No              | Max 1 USDC per joust | Unlimited               |
| Create pools          | No              | No                   | Yes                     |
| Be an arbiter         | No              | No                   | Yes                     |
| Vote on arbiter honor | No              | No                   | Yes (1 person = 1 vote) |

**Why this wins:** The app literally doesn't work without World ID. You can't create pools, can't be an arbiter, can barely bet. World ID IS the app's access control layer. Orb verification unlocks the full experience. This directly satisfies "products that break without proof of human."

### Actions to register in Developer Portal

1. `verify-identity` — One-time verification (Device or Orb). Signal: wallet address.
2. `create-pool` — Orb-only. Used per pool creation. Signal: hash of pool params.
3. `honor-vote` — Orb-only. One-person-one-vote. Signal: `${poolId}-${arbiterId}`.

### Implementation

**`src/lib/world-id.ts`** — Server-side helpers

- `verifyWorldIdProof(proof, action, signal)` — calls `POST https://developer.world.org/api/v4/verify/{rp_id}`
- `requireWorldId(session, level)` — middleware helper, checks user's verification level
- `generateRpSignature()` — signs requests with `signing_key` (never on client)

**`src/app/api/verify/route.ts`** — Verification endpoint

1. Receive proof from frontend (MiniKit.verify() or IDKit)
2. Verify proof server-side via World API
3. Check nullifier not already used for this action
4. Store `WorldIdVerification` record
5. Update `user.worldIdVerified` and `user.worldIdLevel`

**`src/components/world-id-gate.tsx`** — Client component

- Wraps actions that require verification
- Shows verification prompt with appropriate level
- Calls `MiniKit.verify()` for in-app verification (inside World App)
- Falls back to IDKit widget for external access

**Enforce in API routes:**

- `POST /api/pool` — `requireWorldId(session, 'orb')`
- `POST /api/pool/[id]/accept-arbiter` — `requireWorldId(session, 'orb')`
- `POST /api/joust` — `requireWorldId(session, 'device')` + amount limit check if not orb
- `POST /api/honor` — `requireWorldId(session, 'orb')` + nullifier check for 1-person-1-vote

### Reputation tied to unique humans

The Honor system from the existing app becomes **Sybil-resistant**:

- Only Orb-verified humans can vote on arbiters
- Each human gets exactly ONE vote per pool per arbiter (enforced by World ID nullifier)
- Arbiter reputation is tied to verified humans, not wallets
- Display verification badge on profiles

---

## Phase 4: Core App Features via MiniKit (~6 hours) — TARGET: Best MiniKit 2.0 ($4K)

### Pages (mobile-first, tab navigation)

```
Tab Bar: [Home] [Discover] [Create] [Profile]

/                   — Home: Your active jousts + arbitrations
/discover           — Browse public pools
/create             — Create new pool (Orb-gated)
/profile            — Stats, honor score, verification status
/pool/[id]          — Pool detail + joust placement
```

Design: Use `@worldcoin/mini-apps-ui-kit-react` for native World App feel. Supplement with shadcn/ui components (copy from `joust-app/src/components/ui/`). Dark theme. No desktop layout.

### MiniKit Commands Used

1. **`MiniKit.walletAuth()`** — Sign-in (Phase 1)

2. **`MiniKit.sendTransaction()`** — All contract interactions
   - Create pool: `encodeFunctionData({ abi, functionName: 'createPool', args: [params] })`
   - Place joust: `encodeFunctionData({ abi, functionName: 'createJoust', args: [joust] })`
   - For ERC20 jousts: batch `[approve tx, createJoust tx]` in one sendTransaction call (Permit2)
   - Accept arbiter: `encodeFunctionData({ abi, functionName: 'acceptArbiterDelegation', args: [poolId] })`
   - Settle pool: `encodeFunctionData({ abi, functionName: 'settlePoolAndPayout', args: [poolId, winType] })`
   - Refund pool: `encodeFunctionData({ abi, functionName: 'refundPool', args: [poolId] })`
   - All return `userOpHash` — poll with `useUserOperationReceipt` from `@worldcoin/minikit-react`

3. **`MiniKit.verify()`** — World ID verification (Phase 3)

4. **`MiniKit.shareContacts()`** — Invite friends to a pool

   ```ts
   const { data } = await MiniKit.shareContacts({
     isMultiSelectEnabled: true,
     inviteMessage: `Join "${poolTitle}" on Joust!`,
   });
   // data.contacts → array of { username, walletAddress }
   ```

5. **`MiniKit.share()`** — Share pool results after settlement

   ```ts
   await MiniKit.share({
     title: `Joust: ${poolTitle}`,
     text: `${winningOption} won! I ${won ? "won" : "participated"}.`,
     url: `https://world.org/mini-app?app_id=${APP_ID}&path=/pool/${poolId}`,
   });
   ```

6. **`MiniKit.sendHapticFeedback()`** — Tactile feedback
   - Joust placed: `{ hapticsType: 'impact', style: 'heavy' }`
   - Win notification: `{ hapticsType: 'notification', style: 'success' }`
   - Loss notification: `{ hapticsType: 'notification', style: 'error' }`

7. **Push Notifications** — via World API (not a MiniKit command)
   - `POST https://developer.worldcoin.org/api/v2/minikit/send-notification`
   - Trigger on: arbiter invite, pool settled, new joust in your pool, payout ready
   - Request notification permission via `MiniKit.requestPermission({ permission: 'notifications' })`

8. **`MiniKit.closeMiniApp()`** — Close after sharing/completing action

### API Routes (simplified from joust-app's ~30 routes)

| Route                      | Method     | Purpose                                             | World ID         |
| -------------------------- | ---------- | --------------------------------------------------- | ---------------- |
| `/api/auth`                | POST       | SIWE walletAuth login                               | None             |
| `/api/verify`              | POST       | World ID proof verification                         | N/A              |
| `/api/pool`                | GET, POST  | List/create pools                                   | Orb for POST     |
| `/api/pool/[id]`           | GET        | Pool detail                                         | None             |
| `/api/pool/[id]/record-tx` | POST       | Record on-chain action (settle/refund/close/accept) | Varies           |
| `/api/joust`               | GET, POST  | List/create jousts                                  | Device+ for POST |
| `/api/profile`             | GET, PATCH | User profile                                        | None             |
| `/api/honor`               | GET, POST  | Honor votes                                         | Orb for POST     |
| `/api/leaderboard`         | GET        | Rankings                                            | None             |
| `/api/notification`        | GET, PATCH | Notifications                                       | None             |

### Transaction flow pattern

```
Frontend                          MiniKit/World App                 Backend API
   |                                    |                               |
   |-- MiniKit.sendTransaction() ------>|                               |
   |                                    |-- userOpHash ----------------->|
   |<-- { userOpHash } ----------------|                               |
   |                                    |                               |
   |-- poll useUserOperationReceipt --->|                               |
   |<-- { txHash, status } ------------|                               |
   |                                    |                               |
   |-- POST /api/pool/[id]/record-tx --------------------------------->|
   |   { txHash, action, params }       |                               |
   |                                    |                -- verify tx on-chain
   |                                    |                -- update DB
   |<-- { success, pool } -------------------------------------------------|
```

---

## Phase 5: AgentKit AI Arbiters (NICE-TO-HAVE, if time permits)

### Concept

An AI agent registered in World's AgentBook becomes an arbiter. It:

- Is linked to a real human via World ID (through AgentBook registration)
- Can automatically settle pools based on external data
- Gets a special "AI Arbiter" badge in the UI
- Has its own honor score

### Implementation sketch

1. `npm install @worldcoin/agentkit`
2. Register agent wallet in AgentBook: `npx @worldcoin/agentkit-cli register <agent-address>`
3. Create a simple agent service that:
   - Monitors pools where it's assigned arbiter
   - On pool expiry, queries external APIs (sports scores, token prices, etc.)
   - Calls `settlePoolAndPayout()` with the winning type
4. In the UI, check if arbiter address is in AgentBook via `createAgentBookVerifier()`
5. Display "AI Arbiter (Human-Backed)" badge

---

## File Structure (Final)

```
joust-world-miniapp/
  contracts/
    src/JoustArena.sol              (copied from joust-contracts, unchanged)
    src/Errors.sol                  (copied, unchanged)
    src/storage/JoustArenaStorage.sol (copied, unchanged)
    src/JoustProxyFactory.sol       (copied, unchanged)
    script/DeployJoustArena.s.sol   (modified for World Chain)
    foundry.toml                    (new — no ZKSync)
    Makefile                        (new — World Chain targets)
  src/
    app/
      layout.tsx                    (providers: MiniKit + Wagmi + QueryClient)
      page.tsx                      (home — active jousts/arbitrations)
      discover/page.tsx             (browse public pools)
      create/page.tsx               (create pool — Orb-gated)
      profile/page.tsx              (user stats + verification)
      pool/[id]/page.tsx            (pool detail + joust)
      api/
        auth/route.ts               (SIWE walletAuth)
        verify/route.ts             (World ID proof verification)
        pool/route.ts               (pool CRUD)
        pool/[id]/route.ts          (single pool)
        pool/[id]/record-tx/route.ts (record on-chain actions)
        joust/route.ts              (joust CRUD)
        profile/route.ts            (user profile)
        honor/route.ts              (honor votes)
        leaderboard/route.ts        (rankings)
        notification/route.ts       (push notifications)
    components/
      providers.tsx                 (MiniKit + Wagmi + Query providers)
      tab-navigation.tsx            (bottom tab bar)
      pool-card.tsx                 (pool list item)
      pool-detail.tsx               (full pool view)
      joust-drawer.tsx              (place joust sheet)
      create-pool-form.tsx          (pool creation form)
      world-id-gate.tsx             (verification prompt wrapper)
      honor-vote.tsx                (honor voting UI)
      profile-card.tsx              (user profile display)
    lib/
      contracts.ts                  (ABI, addresses, chain config)
      minikit.ts                    (MiniKit helper wrappers)
      world-id.ts                   (World ID server-side verification)
      prisma.ts                     (DB client)
      auth.ts                       (iron-session config)
      utils.ts                      (shared utilities)
    hooks/
      use-pool.ts                   (React Query pool hooks)
      use-joust.ts                  (React Query joust hooks)
      use-profile.ts                (React Query profile hooks)
      use-transaction.ts            (MiniKit sendTransaction + poll wrapper)
  prisma/
    schema.prisma                   (simplified schema)
  abis/
    JoustArena.json                 (clean ABI — no Unlink)
```

---

## Key Technical Decisions

| Decision          | Choice                         | Why                                             |
| ----------------- | ------------------------------ | ----------------------------------------------- |
| Contract changes  | None (Solidity unchanged)      | ZKSync specifics are toolchain-only             |
| Proxy pattern     | Keep UUPS                      | Already works, allows mid-hackathon fixes       |
| On-chain World ID | No — API layer only            | Much simpler, same UX, standard pattern         |
| Wallet connection | MiniKit walletAuth (SIWE)      | No RainbowKit needed inside World App           |
| Transactions      | MiniKit.sendTransaction        | Required for mini apps on World Chain           |
| Contract reads    | wagmi useReadContract          | Standard, works without MiniKit                 |
| Privacy/Unlink    | Remove entirely                | Not needed, adds complexity                     |
| Background jobs   | Remove Inngest                 | Synchronous recording, hackathon simplicity     |
| Event sourcing    | Remove                         | Direct DB updates, no Event/FundMovement tables |
| Collateral        | ETH + USDC only                | Simplest, both native to World Chain            |
| Chain             | World Chain mainnet only (480) | Testnet not supported for mini app testing      |

---

## Reusable Code from Existing App

| What                    | Source                             | Adaptation                                             |
| ----------------------- | ---------------------------------- | ------------------------------------------------------ |
| shadcn/ui components    | `joust-app/src/components/ui/`     | Copy button, card, dialog, drawer, tabs, select, input |
| Zod validation patterns | `joust-app/src/app/api/*/route.ts` | Reuse schema validation approach                       |
| React Query patterns    | `joust-app/src/queries/`           | Simplify, same pattern                                 |
| Pool display logic      | `joust-app/src/components/pool/`   | Adapt for mobile-first                                 |
| Honor system logic      | `joust-app/src/app/api/honor/`     | Add World ID 1-person-1-vote                           |
| Token utilities         | `joust-app/src/lib/token-utils.ts` | Adapt addresses for World Chain                        |
| Auth session pattern    | `joust-app/src/lib/auth/`          | Replace with SIWE verification                         |
| Dark theme / colors     | `joust-app/src/app/globals.css`    | Reuse color scheme                                     |

---

## Verification / Testing Plan

1. **Contracts**: `forge test -vv` in `contracts/` — all existing tests should pass without `--zksync`
2. **Deploy**: Verify proxy address on Worldscan (worldchain-mainnet.explorer.alchemy.com)
3. **Local dev**: `pnpm dev` + ngrok tunnel + scan QR in World App
4. **Auth**: Verify SIWE flow works in World App webview
5. **World ID**: Verify Orb/Device verification flow + nullifier dedup
6. **Transactions**: Create pool, place joust, settle — verify on-chain + DB state
7. **MiniKit commands**: Test shareContacts, share, haptics, notifications
8. **Mobile UX**: Test in World App on iOS + Android — check safe areas, scroll, tab nav
9. **End-to-end**: Full pool lifecycle (create → joust → settle → payout → honor vote)

---

## Execution Order (Prioritized)

1. Deploy contracts to World Chain (Phase 0)
2. Scaffold mini app + auth + DB (Phase 1 + 2 in parallel)
3. World ID integration (Phase 3) — biggest prize differentiator
4. Core pool/joust features via MiniKit (Phase 4)
5. Polish: notifications, sharing, haptics, honor voting
6. AgentKit AI arbiters (Phase 5) — only if time remains
7. Demo prep — record video, prepare pitch
