# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Joust is a prediction market protocol where users stake on outcomes of real-world events, arbitrated by verified humans. It runs as a World Mini App inside World App on World Chain (chain ID 480).

## Stack

- **Frontend**: Next.js 15 (app router, Turbopack), React 19, Tailwind CSS v4, TypeScript
- **Contracts**: Solidity (Foundry/forge), UUPS proxy on World Chain mainnet
- **Auth**: MiniKit walletAuth (SIWE) → iron-session server cookies
- **Chain interaction**: wagmi v2 + viem v2 (client), viem publicClient (server)
- **World ID**: MiniKit.verify() client-side → verifyCloudProof server-side
- **Database**: Prisma + PostgreSQL (Neon), pooled + direct URLs
- **MiniKit commands**: walletAuth, sendTransaction, verify, share, shareContacts, haptics, notifications

## Commands

```bash
npm run dev                   # Next.js dev server (Turbopack)
npm run build                 # Production build
npm run lint                  # ESLint
cd contracts && forge build   # Build Solidity contracts
cd contracts && forge test    # Run contract tests
npx prisma migrate dev        # Run DB migrations
npx prisma generate           # Regenerate Prisma client
```

## Environment Variables

See `.env.example`. Key vars: `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `NEXT_PUBLIC_APP_ID`, `SESSION_SECRET`, `NEXT_PUBLIC_JOUST_ARENA_ADDRESS`, `WORLD_CHAIN_RPC`.

## Contract Addresses (World Chain Mainnet)

- Proxy: `0x30F2fFc61882E0d63F371a7b4143db82b6b4163A`
- Implementation: `0x34EA12c0242E8fB048D3184Dc2D7f569447742f0`
- USDC: `0x79A02482A880bCE3F13e09Da970dC34db4CD24d1`

## Architecture

### Dual-State Model (on-chain + database)

The core architectural pattern: pools and jousts exist in **both** the Solidity contract and the Postgres DB. The flow is:

1. User initiates action in the UI
2. API route creates/validates the DB record
3. Client sends the on-chain transaction via `MiniKit.commandsAsync.sendTransaction`
4. After tx confirmation, client calls `/api/pool/[id]/record-tx` to reconcile DB state with the on-chain result (e.g., storing `contractId`, updating `state`)

This means the DB is the source of truth for metadata (titles, descriptions, options) while the contract is the source of truth for funds and settlement.

### Auth Flow

`VerificationWall` (wraps the entire app in `layout.tsx`) enforces a two-gate entry:

1. **Sign-in**: MiniKit `walletAuth` → SIWE nonce challenge → `/api/auth` verifies signature → iron-session cookie set
2. **World ID verification**: MiniKit `verify` → `/api/verify` calls `verifyCloudProof` → stores nullifier hash in `WorldIdVerification`, updates user's `worldIdLevel`

Session is read server-side via `getSession()` / `requireSession()` from `src/lib/session.ts`.

### Transaction Lifecycle

`src/lib/minikit.ts` has typed helpers for every on-chain action (`createPoolOnChain`, `createJoustOnChain`, `settlePoolOnChain`, etc.). ERC20 jousts use Permit2 for approve+call in a single batch. The `useTransaction` hook manages tx status states: idle → pending → confirming → success/error.

### API Route Pattern

All API routes live under `src/app/api/`. They follow a consistent pattern:

- `requireSession()` for auth
- `requireWorldId(session, level)` for gated actions
- Zod schema validation on POST bodies
- Prisma queries with selective `include` for related data

### Hook Layer

`src/hooks/` wraps all data fetching with React Query. Two categories:

- **DB hooks** (`use-pool.ts`, `use-joust.ts`, `use-profile.ts`): fetch from API routes, cache with query keys like `["pool", id]`
- **Contract hooks** (`use-contract-read.ts`): direct on-chain reads via wagmi's `useReadContract`

Mutations invalidate related query keys on success for automatic UI refresh.

### Provider Stack

`src/components/providers.tsx` nests: MiniKitProvider → WagmiProvider → QueryClientProvider. MiniKit is installed via `useEffect` on mount.

### Pool State Machine

`PoolState` enum: `PENDING_ARBITER` → `ACTIVE` → `CLOSED` → `SETTLED` or `REFUNDED`. State transitions happen through the `record-tx` endpoint after on-chain confirmation.

### Notifications

Dual delivery: DB record (for in-app notification bell) + push notification via World Developer API. Triggered server-side in `record-tx` for events like arbiter acceptance, settlement, refunds.

## World ID Tiered Access

| Action        | No Verification | Device     | Orb       |
| ------------- | --------------- | ---------- | --------- |
| View pools    | Yes             | Yes        | Yes       |
| Joust (bet)   | No              | Max 1 USDC | Unlimited |
| Create pools  | No              | No         | Yes       |
| Be an arbiter | No              | No         | Yes       |
| Honor vote    | No              | No         | Yes       |

Enforcement: `requireWorldId()` in `src/lib/world-id.ts`, joust amount limits in `JOUST_LIMITS`.

## Testing in World App

1. `npm run dev` to start local server
2. `ngrok http 3000` to create tunnel
3. Set ngrok URL as App URL in World Developer Portal
4. Scan QR or open in World App

Dev mode loads [eruda](https://github.com/nicejob/eruda) for in-app console debugging (see `layout.tsx`).

## Path Aliases

`@/*` maps to `./src/*` (configured in `tsconfig.json`). Contracts directory is excluded from TS compilation.
