# COLOR-PSYCHOLOGY-CLAUDE.md — Color System Rationale & Migration Guide for Joust

> **Purpose.** This file explains the reasoning behind Joust's color palette migration. When implementing color changes, Claude Code should understand *why* each mapping was chosen — the decisions are rooted in color psychology research for ethical prediction market design. This file sits alongside `CLAUDE.md` and `VISUAL-EFFECTS-CLAUDE.md`. Treat all three as authoritative.

---

## 0) Context: Why These Colors Matter

Joust is a **prediction market / forecasting platform**, not a gambling app. World's hackathon explicitly disqualifies gambling. Every color choice must signal **knowledge, analysis, and trust** — never excitement, urgency, or risk-taking.

Research from the Robinhood regulatory case (Massachusetts, 2021) showed that dark themes + neon green + celebratory animations were cited as manipulative design targeting inexperienced investors. The lesson: color palette is the **first** thing that signals whether a platform is a financial tool or a casino, before a single word of copy is read.

### Design Principles Driving This Palette
1. **Blue is the universal trust anchor** — Chase, Citi, Goldman Sachs, Vanguard all use it. Our blues stay untouched.
2. **Green as primary brand = "money/profit" association** — even muted green as a dominant color triggers financial gain associations near numbers. We replaced dominant green with **deep plum/aubergine**, which reads as editorial, refined, and distinctive without financial connotation.
3. **Gain/loss indicators must be muted** — no neon green for gains, no alarming red for losses. We use forest sage and deep burgundy respectively.
4. **Gold/amber only for warmth** — never as a CTA or primary accent (luxury/casino association). Used here for warm highlights and secondary status indicators only.
5. **The medieval/editorial aesthetic** (Jacquard 24 display font, dark backgrounds) is preserved and enhanced by the plum-burgundy family, which has a richer editorial quality than green.

---

## 1) Complete Color Migration Map

### Primary Mappings

| Old Hex | New Hex | Role | Rationale |
|---------|---------|------|-----------|
| `#3f7b3b` | `#4a2d3f` | **Primary brand color** | Green → deep plum/aubergine. Removes "money green" financial gain association. Plum reads as editorial, confident, and distinctive. Pairs naturally with the Jacquard 24 blackletter typeface for a medieval-meets-modern aesthetic. |
| `#0fa54a` | `#4e6251` | **Secondary brand color** | Bright green → muted forest/sage. Retains organic warmth without triggering "profit" readings. Functions as the quiet complement to the plum primary. |
| `#141617` | `#0f121c` | **Base background** | Near-black neutral → deeper navy-black. Adds a subtle blue undertone that reinforces trust (blue = trust psychology) while keeping the dark editorial mood. The slight blue shift moves away from pure "void black" toward sophisticated depth. |
| `#966b29` | `#c39337` | **Warm accent / highlight** | Dark gold → warmer, brighter gold. Used for secondary highlights, badges, and warm UI moments. **Never on primary CTAs or buttons** — gold on dark backgrounds drifts toward casino/luxury territory when used as action colors. Reserve for informational warmth only. |
| `#ffe500` | `#f0e0c8` | **Light neutral / cream** | Bright yellow → warm cream/parchment. Removes high-energy yellow entirely. Cream reads as paper/parchment — reinforces the editorial, knowledge-first positioning. Used for light text on dark backgrounds, card surfaces, and neutral fills. |
| `#488bca` | `#488bca` | **Blue (unchanged)** | Trust blue — kept as-is. This anchors the palette in trustworthy financial territory. Use for primary informational elements, links, and chart probability lines. |
| `#45a8df` | `#45a8df` | **Light blue (unchanged)** | Secondary blue — kept as-is. Use for hover states, secondary buttons, and supporting data visualization. |
| `#a31d21` | `#6b2233` | **Loss / negative state** | Alarming red → deep burgundy. Still communicates "caution" or "incorrect" without triggering fight-or-flight alarm response. Burgundy is dark enough to not dominate the visual field when losses are displayed. |
| *(new)* | `#5e8c61` | **Gain / positive state** | New muted sage green. Only appears in gain/positive contexts (correct prediction, profitable position). Muted enough to not trigger dopamine-linked "money green" association. |

### Semantic Color Roles

```
BRAND IDENTITY
  Primary:    #4a2d3f  (deep plum — editorial, distinctive)
  Secondary:  #4e6251  (forest sage — organic, calm)

BACKGROUND
  Base:       #0f121c  (navy-black — depth, trust undertone)

WARM ACCENTS
  Gold:       #c39337  (informational warmth — NEVER on CTAs)
  Cream:      #f0e0c8  (parchment — knowledge, editorial)

TRUST ANCHORS (unchanged)
  Blue:       #488bca  (primary trust, data, links)
  Light Blue: #45a8df  (secondary trust, hover, supporting)

GAIN / LOSS INDICATORS
  Gain:       #5e8c61  (muted sage — correct, positive)
  Loss:       #6b2233  (deep burgundy — incorrect, negative)

GAIN / LOSS ACCENTS (use sparingly for subtle reinforcement)
  Gain accent:  #4e6251  (secondary brand doubles as gain accent)
  Loss accent:  #4a2d3f  (primary brand doubles as loss accent)
```

---

## 2) The Gain/Loss System — Critical Design Rules

The gain/loss color system has a deliberate two-tier structure:

### Tier 1: Explicit Indicators
When showing a user's prediction was correct or incorrect, a position is profitable or unprofitable, or a market resolved:
- **Gain/correct:** `#5e8c61` (sage green)
- **Loss/incorrect:** `#6b2233` (deep burgundy)

### Tier 2: Accent/Subtle Reinforcement
For background tints, border accents, subtle status indicators, or chart area fills:
- **Gain accent:** `#4e6251` (the secondary brand color) — this is intentional. The secondary brand color *is* the muted version of the gain color, so positive states feel native to the brand rather than bolted on.
- **Loss accent:** `#4a2d3f` (the primary brand color) — similarly, the primary brand color sits in the same plum/burgundy family as the loss color. This means negative states don't feel alarming or foreign — they blend into the brand identity.

### Why This Matters Psychologically
On gambling platforms, wins are bright green explosions and losses are alarming red warnings. The contrast is extreme, which triggers adrenaline and dopamine cycles. On Joust, the gain and loss colors are **close in saturation and brightness** to the brand colors. The emotional distance between "correct" and "incorrect" is deliberately small — this frames outcomes as **information** (your forecast was right/wrong) rather than **events** (you won!/you lost!).

### Rules for Implementation
- **NEVER** use `#5e8c61` or `#6b2233` for animations, flashing, or pulsing
- **NEVER** show gain color on elements when the user's net position is negative
- **NEVER** pair gain/loss colors with celebratory or alarming animations
- Probability bars use **blue** (`#488bca`), not gain/loss colors
- Charts use a single-hue blue gradient fill, not red/green
- Transitions between gain/loss states should be **slow** (≥500ms fade), never instant

---

## 3) Color Usage by Component

### Market Cards
- **Card background:** `#0f121c` or a slight lighten for elevation
- **Category badge:** `#4a2d3f` background with `#f0e0c8` text
- **Market question text:** `#f0e0c8` (cream on dark)
- **Probability bar fill:** `#488bca` (trust blue) — single hue, NOT gain/loss colors
- **Volume / forecaster count:** `#4e6251` or muted text color
- **YES / NO buttons:** `#488bca` / neutral gray or `#4a2d3f` — not green/red
- **Time remaining:** `#c39337` (warm gold) — informational, not urgent

### Charts & Data Visualization
- **Probability line:** `#488bca` (blue)
- **Area fill:** `#488bca` at 8-12% opacity
- **Y-axis:** Fixed 0–100%, never auto-scaled
- **Reference line at 50%:** Dotted, muted `#4e6251`
- **No gridlines on mobile**
- Position profit/loss shown as **numbers only** in `#5e8c61` / `#6b2233`, no chart coloring

### Navigation & UI Chrome
- **Tab bar background:** `#0f121c`
- **Active tab:** `#488bca` or `#45a8df`
- **Inactive tab:** `#4e6251` at 60% opacity
- **Header/app bar:** `#0f121c` with `#f0e0c8` text
- **Borders/dividers:** `#4a2d3f` at 30% opacity

### Typography
- **Jacquard 24** (display): Used at large sizes for headings, hero text. Pairs with the deep plum `#4a2d3f` identity.
- **JejuGothic** (body sans): Body text in `#f0e0c8` on dark backgrounds
- **Fira Code** (mono): Numerical data, probabilities, amounts. Signals precision. Use `#488bca` for key figures.

### Buttons & CTAs
- **Primary action:** `#488bca` background — trust blue drives all primary actions
- **Secondary action:** `#4a2d3f` background or outlined
- **Destructive/danger:** `#6b2233` — muted, not alarming
- **Disabled:** Any color at 40% opacity
- **NEVER** use `#c39337` (gold) as a button color — casino association

### Status & Feedback
- **Success/correct:** `#5e8c61` (subtle, calm checkmark)
- **Error/incorrect:** `#6b2233` (muted shake or icon change)
- **Warning:** `#c39337` (gold, informational only)
- **Info:** `#488bca` (blue)
- **Loading/skeleton:** `#4a2d3f` at 20% opacity, pulsing at 1.5s

---

## 4) CSS Custom Properties — Implementation Reference

When migrating, update the CSS custom property definitions. The exact property names depend on the existing globals.css structure, but the values should map to:

```css
/* Brand */
--color-primary: #4a2d3f;
--color-secondary: #4e6251;
--color-background: #0f121c;

/* Warm */
--color-gold: #c39337;
--color-cream: #f0e0c8;

/* Trust (unchanged) */
--color-blue: #488bca;
--color-blue-light: #45a8df;

/* Gain/Loss */
--color-gain: #5e8c61;
--color-loss: #6b2233;

/* Gain/Loss accents (same as brand, used for subtle reinforcement) */
--color-gain-accent: #4e6251;
--color-loss-accent: #4a2d3f;

/* Charts — always blue, never gain/loss */
--color-chart-probability: #488bca;
--color-chart-fill: rgba(72, 139, 202, 0.1);
```

### Zustand Config Store Update
The `appConfig.theme` object should reflect:
```typescript
theme: {
  primary: "#4a2d3f",
  secondary: "#4e6251",
  background: "#0f121c",
  gold: "#c39337",
  cream: "#f0e0c8",
  chartProbability: "#488bca",
  chartUp: "#5e8c61",    // Muted sage — gain states only
  chartDown: "#6b2233",  // Deep burgundy — loss states only
}
```

---

## 5) What This Palette Avoids (and Why)

| Avoided Pattern | Why It's Problematic | How This Palette Solves It |
|---|---|---|
| Neon green as primary | "Money green" triggers financial gain dopamine loop | Plum primary has zero financial association |
| Bright red for losses | Fight-or-flight alarm, anxiety, regret amplification | Deep burgundy reads as "information" not "danger" |
| Gold/amber on CTAs | Casino/luxury/VIP association | Gold reserved for informational warmth only; blue on CTAs |
| Pure black backgrounds | "Void" feeling, pairs badly with bright accents | Navy-black has trust-coded blue undertone |
| High-contrast gain vs loss | Extreme contrast = extreme emotional response | Gain and loss colors are close in saturation/brightness |
| Green anywhere near numbers | Brain reads green + number = profit, regardless of context | Numbers use cream or blue; green only for explicit gain states |

---

## Document Version
- **Created:** April 4, 2026
- **For:** Joust prediction market (World App Mini App)
- **Palette version:** v2 (plum migration)
- **Companion files:** `CLAUDE.md`, `VISUAL-EFFECTS-CLAUDE.md`