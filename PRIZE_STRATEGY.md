# Prize Strategy — ETHGlobal Cannes 2026

## Target Prizes

### 1. Best World ID 4.0 — $8,000

**Criteria:** "Products that break without proof of human. Uses World ID 4.0 as a real constraint (eligibility, uniqueness, fairness, reputation, rate limits). Proof validation must occur in a web backend or smart contract."

### 2. Best MiniKit 2.0 — $4,000

**Criteria:** "Mini apps that make World ID and World App work smoothly. Build a Mini App with MiniKit 2.0, integrate MiniKit SDK commands, deploy contracts to World Chain. **Project must NOT be gambling or chance based.** Proof validation required in web backend or smart contract."

---

## Current Integration Status

### World ID 4.0 ✅ (strong but has gaps)

| Feature                      | Status | Notes                                       |
| ---------------------------- | ------ | ------------------------------------------- |
| Managed RP (4.0 feature)     | ✅     | Selected managed mode in Developer Portal   |
| Server-side proof validation | ✅     | `verifyCloudProof` in /api/verify           |
| Orb gate on pool creation    | ✅     | Only Orb-verified humans can create pools   |
| Orb gate on arbitration      | ✅     | Only Orb-verified humans can be arbiters    |
| Orb gate on honor voting     | ✅     | 1-person-1-vote via nullifier dedup         |
| Device gate on jousting      | ✅     | Device-verified can joust up to 1 USDC      |
| Nullifier dedup              | ✅     | WorldIdVerification table tracks nullifiers |
| Tiered access control        | ✅     | None < Device < Orb                         |

### MiniKit 2.0 ✅ (good coverage)

| Command                  | Status | Where Used                                                     |
| ------------------------ | ------ | -------------------------------------------------------------- |
| `walletAuth` (SIWE)      | ✅     | Sign-in flow                                                   |
| `sendTransaction`        | ✅     | Pool creation, jousting, settle, refund, close, accept arbiter |
| `verify`                 | ✅     | World ID verification prompts                                  |
| `share`                  | ✅     | Share pool results                                             |
| `shareContacts`          | ✅     | Invite friends to pools                                        |
| `sendHapticFeedback`     | ✅     | On joust, win, loss, error                                     |
| Push notifications (API) | ✅     | Settle, refund, new joust, arbiter invite                      |
| `requestPermission`      | ❌     | **MISSING** — need to request notification permission          |
| `closeMiniApp`           | ❌     | **MISSING** — should use after share completion                |
| Permit2 (ERC20)          | ✅     | USDC jousting                                                  |

---

## Critical Issues & Required Fixes

### 🚨 ISSUE 1: "Not gambling or chance based" (MiniKit prize disqualifier)

Prediction markets can look like gambling. **We must reframe entirely.**

**Current problematic language in UI:**

- "Joust" could imply combat/gambling
- "Bet", "wager" — must not appear anywhere
- "Place Joust" button — needs rewording

**Required changes:**

- Reframe as: "prediction market", "forecast", "conviction staking", "outcome market"
- Emphasize: arbiter is a HUMAN making a judgment call — not random chance
- The app is about HUMAN JUDGMENT + REPUTATION, not gambling
- Pool outcomes are determined by real-world events verified by a trusted arbiter
- Honor system = reputation layer = skill-based trust
- Change "Place Joust" → "Stake Prediction" or "Submit Forecast"
- Change "joust" language in UI to "prediction" or "position"
- Change pool descriptions to emphasize forecasting, not betting
- Update app description: "Peer-to-peer prediction markets with human arbitration, powered by World ID"

**Contractual reality:** The Solidity uses "joust" but that's internal — UI can use different language.

### 🚨 ISSUE 2: App doesn't feel "broken" without World ID

Judges will test by opening the app without verifying. Right now they can:

- See the home page
- Browse all pools on Discover
- View pool details
- See the leaderboard

This makes World ID feel like an _add-on_, not a _constraint_.

**Required changes:**

1. **Full-screen World ID verification gate on launch** — Before seeing ANY content, unverified users must verify. Show a compelling screen explaining why World ID matters for fair predictions.
2. **Blurred/locked pool cards** for unverified users — If we let them browse, blur the details and overlay "Verify with World ID to see predictions"
3. **Route-level protection** — Make /discover, /create, /profile, /pool/[id] all require at minimum device verification

### 🚨 ISSUE 3: Missing MiniKit commands

- Add `MiniKit.requestPermission({ permission: 'notifications' })` — call after first sign-in
- Add `MiniKit.closeMiniApp()` — call after share completion as a UX polish

---

## Improvements to Strengthen World ID Story

### Rate Limiting via World ID (uniqueness + fairness)

Currently we only use nullifiers for honor voting. Add:

- **Max 5 pools per human per day** — Register a "daily-create-pool" action, track nullifiers with daily rotation
- **Max 20 predictions per human per hour** — Prevents Sybil spam even with device verification
- These make the app fundamentally depend on World ID for rate limiting, not just gating

### Reputation Tied to Unique Humans

Strengthen the honor system narrative:

- Show prominent "Verified Human" badges everywhere
- On pool detail, show "This pool is arbitrated by an Orb-verified human"
- On the leaderboard, ONLY show Orb-verified arbiters
- Add a "Trust Score" that weights honor votes by the voter's own reputation

### Narrative for Judges

The pitch should be: **"Joust is a prediction market that CANNOT work without World ID."**

- Without World ID, anyone could create infinite Sybil accounts to manipulate predictions
- Without Orb verification, arbiter reputation would be meaningless (one bad actor = infinite downvotes)
- Without 1-person-1-vote, the honor system collapses
- Without human verification, there's no difference between this and any other DeFi app
- **World ID IS the trust layer** — remove it and the entire prediction market becomes worthless

---

## Implementation Priority (for remaining hackathon time)

1. **[CRITICAL] Reframe language** — Remove ALL gambling terminology from UI
2. **[CRITICAL] Full-screen World ID gate** — Make app feel broken without verification
3. **[HIGH] Add requestPermission + closeMiniApp** — Complete MiniKit command coverage
4. **[HIGH] Blurred content for unverified users** — Reinforce the "breaks without" narrative
5. **[MEDIUM] Rate limiting via World ID nullifiers** — Strengthen uniqueness story
6. **[MEDIUM] Prominent verification badges** — Visual proof that humans matter
7. **[LOW] Trust score weighting** — Nice-to-have depth on reputation
8. **[LOW] AgentKit integration** — Only if time permits (separate $8K prize)

---

## Key Differentiator vs Other Submissions

Most hackathon projects will bolt on World ID as a login gate. **Our app makes World ID the core access control layer with tiered permissions, Sybil-resistant reputation, and rate limiting.** The prediction market literally cannot function without proof of human — it's not a feature, it's the foundation.
