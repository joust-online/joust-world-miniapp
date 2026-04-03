# Joust World Mini App

World Mini App for the Joust prediction market protocol on World Chain.

## Stack
- **Contracts**: Solidity (Foundry/forge), UUPS proxy, deployed to World Chain mainnet (480)
- **Frontend**: Next.js 15 (app router), React 19, Tailwind CSS v4, TypeScript
- **Auth**: MiniKit walletAuth (SIWE) + iron-session
- **Chain**: wagmi v2 + viem v2, World Chain (chain ID 480)
- **World ID**: MiniKit.verify() + server-side verifyCloudProof
- **Database**: Prisma + PostgreSQL (Neon)
- **MiniKit**: walletAuth, sendTransaction, verify, share, shareContacts, haptics, notifications

## Key Commands
```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
cd contracts && forge build   # Build contracts
cd contracts && forge test    # Run contract tests
npx prisma migrate dev        # Run DB migrations
npx prisma generate           # Generate Prisma client
```

## Contract Addresses (World Chain Mainnet)
- Proxy: `0x30F2fFc61882E0d63F371a7b4143db82b6b4163A`
- Implementation: `0x34EA12c0242E8fB048D3184Dc2D7f569447742f0`
- USDC: `0x79A02482A880bCE3F13e09Da970dC34db4CD24d1`

## Architecture
- `contracts/` — Foundry project, Solidity contracts (unchanged from joust-contracts except deploy script)
- `src/app/` — Next.js pages and API routes
- `src/components/` — React components
- `src/hooks/` — React Query + wagmi hooks
- `src/lib/` — Server-side utilities (auth, prisma, world-id, notifications, ABI)
- `prisma/` — Database schema
- `abis/` — Extracted contract ABI

## World ID Tiered Access
| Action | No Verification | Device | Orb |
|---|---|---|---|
| View pools | Yes | Yes | Yes |
| Joust (bet) | No | Max 1 USDC | Unlimited |
| Create pools | No | No | Yes |
| Be an arbiter | No | No | Yes |
| Honor vote | No | No | Yes |

## Testing in World App
1. `npm run dev` to start local server
2. `ngrok http 3000` to create tunnel
3. Set ngrok URL as App URL in World Developer Portal
4. Scan QR or open in World App
