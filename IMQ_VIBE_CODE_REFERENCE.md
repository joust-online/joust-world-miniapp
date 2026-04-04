# IMQ_VIBE_CODE_REFERENCE.md — Vibe Code Registry for Claude Code

> **Purpose.** This file defines shorthand codes that trigger specific visual effect implementations. When a prompt contains an IMQ code, Claude Code implements the exact pattern described here — no guessing, no improvising. The user only needs to provide their custom SVG frames; everything else is standardized.

---

## 🗂️ Quick Reference — What Each Code Does (Human-Readable)

This section is for YOU (the designer/developer), not for Claude Code. It explains in plain language what each code does, when you'd use it, and how they relate to each other. **When you add a new code, always add a matching entry here first.**

| Code | One-liner | When to use it | Adds file weight? |
|------|-----------|----------------|-------------------|
| `imq_svg_animation_v1` | Flipbook-style SVG animation. Cycles through SVG frames like a GIF using pure CSS. | Any animated icon, tab bar icon, loading indicator, scroll decoration. This is the animation wrapper — it doesn't add texture, it just makes frames animate. | No (~1KB wrapper) |
| `imq_svg_grain_01_normal` | Illustrator's regular grain (I:41 C:71) baked as hundreds of tiny SVG rectangles inside each frame. | When you need each frame to weigh ~15KB AND you want the exact stipple-dot look from Illustrator. Different dot pattern per frame = grain "shimmers" during animation. | **Yes** (~14KB per frame) |
| `imq_svg_grain_01_optimized` | Same Illustrator grain settings but as a procedural SVG filter instead of baked dots. | When your frames already hit 15KB from artwork, or you just want the grain look without caring about file size. Looks slightly smoother than Illustrator's version. | No (~400 bytes) |
| `imq_svg_grain_01_vertical_normal` | Illustrator's **vertical** grain (I:41 C:70) baked as tall narrow SVG rectangles. Creates vertical streak texture. | Same as `_normal` but when you want directional vertical line texture instead of random dots. Film-strip / CRT scanline feel. | **Yes** (~14KB per frame) |
| `imq_svg_grain_01_vertical_optimized` | Illustrator's **vertical** grain as a procedural SVG filter with stretched noise. | Same as `_optimized` but with vertical directionality. The feTurbulence uses asymmetric frequency to create vertical streaks. | No (~400 bytes) |
| `imq_svg_glow_01_edges_normal` | Illustrator's **Glowing Edges** (W:6 B:3 S:9) using Laplacian edge detection + Gaussian glow. High-quality neon-outline effect. | When you want precise, luminous edge outlines on your artwork — neon sign feel, Monogatari-style accent lines. Uses `feConvolveMatrix` so desktop/high-end mobile only. | No (~800 bytes) |
| `imq_svg_glow_01_edges_optimized` | Same Glowing Edges look but using lighter `feMorphology` edge detection instead of convolution. | When you want the glow effect on all devices including low-end mobile. Slightly thicker/softer edges than `_normal` but safe for WKWebView and Android WebView. | No (~500 bytes) |

### How the codes layer together
```
imq_svg_animation_v1          ← The animation wrapper (REQUIRED for animation)
  └── frame-1.tsx
  │     └── your artwork paths
  │     └── imq_svg_grain_01_*    ← Pick ONE grain variant (OPTIONAL texture layer)
  └── frame-2.tsx
  │     └── your artwork paths
  │     └── imq_svg_grain_01_*    ← Same grain type, DIFFERENT seed
  └── frame-3.tsx
        └── your artwork paths
        └── imq_svg_grain_01_*    ← Same grain type, DIFFERENT seed
```

You can also apply grain to a **specific group within a frame** (e.g., only the background, not the foreground character). See the "SVG Layer Groups & Illustrator Export Guide" section below for how to set that up in Illustrator.

### Decision flowchart
```
Do you need animation?
  YES → use imq_svg_animation_v1 as the wrapper
  NO  → just use the frame component directly (static icon)

Do you want grain texture?
  YES → pick one:
    Need 15KB file size? → _normal or _vertical_normal
    Don't care about size? → _optimized or _vertical_optimized
    Want random dots? → grain_01 (regular)
    Want vertical streaks? → grain_01_vertical
  NO  → skip grain, just use plain frames

Do you want glowing edges?
  YES → pick one:
    Desktop / high-end mobile only? → glow_01_edges_normal (sharper edges, heavier filter)
    Must work on all devices? → glow_01_edges_optimized (softer edges, lighter filter)
  NO  → skip glow

Can you combine grain + glow?
  YES — apply grain FIRST (it's the base texture), then glow ON TOP.
  The glow filter detects edges from the grain-textured artwork,
  so the grain dots themselves get subtle edge glow. Looks great.
```

---

## How It Works

1. User says: "Add `imq_svg_animation_v1` to the leaderboard tab icon"
2. Claude Code reads this file, finds the `imq_svg_animation_v1` spec
3. Claude Code implements exactly that pattern, asking only for the SVG frames if not provided
4. User swaps in their own SVG artwork later — the animation structure stays identical


---

## imq_svg_animation_v1

**Frame-by-frame SVG animation using CSS `steps()` — 0KB JavaScript**

### What It Does
Cycles through a stack of SVG frames using `visibility` toggling with CSS `steps(1)` timing. Each frame is shown for an equal slice of the total duration. Like a flipbook. Fully GPU-composited, works in every webview.

### Default Parameters
| Parameter | Default | Description |
|-----------|---------|-------------|
| Frame count | **4** | Minimum frames per animation |
| Duration | **800ms** | Total cycle time |
| Loop | **true** | Repeats infinitely |
| Trigger | **"auto"** | Options: `auto`, `hover`, `click`, `inview` |
| Size | **24×24** | Icon size. Use `size-6` (Tailwind) |
| Easing | **`steps(1)`** | Discrete frame jumps, no interpolation |

### File Naming Convention
```
src/components/icons/{icon-name}/
├── frame-1.tsx    # First frame (also static fallback)
├── frame-2.tsx
├── frame-3.tsx
├── frame-4.tsx
└── index.tsx      # Animated wrapper (generated by Claude Code)
```

### Frame Template — What Each SVG Frame Looks Like
Every frame must follow this exact structure:
```tsx
// src/components/icons/sword/frame-1.tsx
export function SwordFrame1({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Frame 1 paths — user provides these */}
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path d="M13 19l6-6" />
      <path d="M16 16l4 4" />
    </svg>
  );
}
```

**Rules for frames:**
- Same `viewBox` on every frame (always `"0 0 24 24"` for icons)
- `stroke="currentColor"` — inherits parent color
- `fill="none"` for outlined style, `fill="currentColor"` for filled
- No inline styles, no embedded CSS, no `<style>` tags inside the SVG
- Export as named function, not default export

### Generated Wrapper — What Claude Code Creates
```tsx
// src/components/icons/sword/index.tsx
// AUTO-GENERATED by imq_svg_animation_v1 — do not manually edit animation logic
"use client";

import { SwordFrame1 } from "./frame-1";
import { SwordFrame2 } from "./frame-2";
import { SwordFrame3 } from "./frame-3";
import { SwordFrame4 } from "./frame-4";

const FRAMES = [SwordFrame1, SwordFrame2, SwordFrame3, SwordFrame4];
const DURATION = 800; // ms
const FRAME_COUNT = FRAMES.length;
const ANIM_ID = "imq-sword"; // unique per icon

interface SwordAnimatedProps {
  className?: string;
  loop?: boolean;
  trigger?: "auto" | "hover" | "click" | "inview";
  paused?: boolean;
}

export function SwordAnimated({
  className = "size-6",
  loop = true,
  trigger = "auto",
  paused = false,
}: SwordAnimatedProps) {
  const wrapperClass =
    trigger === "hover" ? "group" :
    trigger === "click" ? "group" : "";

  const playStateClass =
    trigger === "hover" ? "[&_.imq-frame]:[animation-play-state:paused] [&:hover_.imq-frame]:[animation-play-state:running]" :
    trigger === "click" ? "[&_.imq-frame]:[animation-play-state:paused] [&:active_.imq-frame]:[animation-play-state:running]" :
    "";

  return (
    <div className={`relative ${className} ${wrapperClass} ${playStateClass}`} role="img">
      <style>{`
        @keyframes ${ANIM_ID} {
          ${Array.from({ length: FRAME_COUNT }, (_, i) => {
            const start = (i / FRAME_COUNT) * 100;
            const end = ((i + 1) / FRAME_COUNT) * 100;
            return `${start}%, ${end - 0.01}% { visibility: visible; }`;
          }).join("\n          ")}
        }
        @media (prefers-reduced-motion: reduce) {
          .${ANIM_ID}-frame { animation: none !important; visibility: hidden !important; }
          .${ANIM_ID}-frame:first-child { visibility: visible !important; }
        }
      `}</style>

      {FRAMES.map((Frame, i) => (
        <div
          key={i}
          className={`absolute inset-0 imq-frame ${ANIM_ID}-frame`}
          style={{
            visibility: "hidden",
            animation: paused
              ? "none"
              : `${ANIM_ID} ${DURATION}ms steps(1) ${loop ? "infinite" : "forwards"}`,
            animationDelay: `${(i * DURATION) / FRAME_COUNT}ms`,
          }}
        >
          <Frame className="size-full" />
        </div>
      ))}
    </div>
  );
}

// Static export for non-animated usage (menus, disabled states, etc.)
export { SwordFrame1 as SwordStatic } from "./frame-1";
```

### Variations — How to Customize

**Change frame count:** Add more frame files, update the `FRAMES` array. Minimum 4, no maximum.

**Change duration:** Edit the `DURATION` constant. Guidelines:
- Tab icon tap feedback: `400-600ms`, `loop: false`
- Idle ambient loop: `800-1200ms`, `loop: true`
- Loading indicator: `600-800ms`, `loop: true`
- Scroll decoration: use `ScrollFrameAnimation` from VISUAL-EFFECTS-CLAUDE.md Section 14

**Change trigger:**
- `"auto"` — plays immediately on mount
- `"hover"` — paused by default, plays on parent hover
- `"click"` — paused by default, plays on parent active/press
- `"inview"` — requires wrapping in an IntersectionObserver (Claude Code adds this automatically)

**InView trigger implementation:**
```tsx
"use client";
import { useIntersectionLoad } from "@/hooks/use-intersection-load";

export function SwordInView(props: Omit<SwordAnimatedProps, "trigger">) {
  const { ref, isVisible } = useIntersectionLoad();
  return (
    <div ref={ref}>
      <SwordAnimated {...props} trigger="auto" paused={!isVisible} />
    </div>
  );
}
```

### Quick-Start: Adding a New Animated Icon

When the user says "add `imq_svg_animation_v1` for a [trophy] icon":

1. Create `src/components/icons/trophy/`
2. Create 4 frame files: `frame-1.tsx` through `frame-4.tsx`
   - If user provides SVG paths → use them
   - If user provides SVG files → convert to components
   - If no artwork provided → create placeholder frames with a comment `{/* TODO: Replace with actual artwork */}` using simple geometric shapes
3. Create `index.tsx` using the wrapper template above
4. Replace `Sword` with `Trophy` in all names, update `ANIM_ID` to `"imq-trophy"`
5. Export from a barrel file or use directly

### Placeholder Frames (When No Artwork Provided)
Claude Code generates these geometric placeholders so the animation structure works immediately. The user replaces the SVG paths later.

```tsx
// Placeholder frame-1.tsx — circle
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
  <circle cx="12" cy="12" r="8" />
</svg>

// Placeholder frame-2.tsx — circle with dot
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
  <circle cx="12" cy="12" r="8" />
  <circle cx="12" cy="12" r="2" fill="currentColor" />
</svg>

// Placeholder frame-3.tsx — circle with lines
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
  <circle cx="12" cy="12" r="8" />
  <line x1="12" y1="4" x2="12" y2="8" />
  <line x1="12" y1="16" x2="12" y2="20" />
</svg>

// Placeholder frame-4.tsx — circle pulsed
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
  <circle cx="12" cy="12" r="10" />
</svg>
```


---

## imq_svg_grain_01_normal

**Baked SVG grain texture — Illustrator Grain (Intensity 41, Contrast 71) — reaches ~15KB per frame**

### What It Does
Adds a dense field of inline SVG `<rect>` elements to each animation frame, simulating Adobe Illustrator's `Effect > Texture > Grain` at **intensity 41** and **contrast 71**. The grain is baked directly into each frame's SVG markup as vector elements — not as a procedural filter — so it contributes real file weight toward the **~15KB per frame** target. Each frame receives a **unique grain pattern** (different seed), creating subtle texture shimmer during frame-by-frame playback that mimics real film stock gate weave.

A lightweight `feComponentTransfer` filter sits on top of the baked elements to apply the contrast curve. The filter itself is ~300 bytes — the file weight comes from the grain rects.

### Why Baked Rects Instead of `feTurbulence`
An SVG `<filter>` with `feTurbulence` is procedural — it generates noise at render time and adds only ~400 bytes to the file. It cannot reach the 15KB target. Baked rects are the Illustrator-accurate approach: discrete stochastic dots with a hard tonal distribution, not the smooth organic noise that `feTurbulence` produces.

### Default Parameters
| Parameter | Default | Illustrator Mapping | Description |
|-----------|---------|---------------------|-------------|
| Intensity | **0.41** | Grain Intensity 41/100 | Coverage density — ~41% of grid cells get a grain element |
| Contrast | **0.71** | Grain Contrast 71/100 | Opacity spread — higher = more elements at tonal extremes |
| Slope | **1.71** | `1 + (contrast / 100)` | `feComponentTransfer` linear slope for contrast boost |
| Intercept | **-0.355** | `-(slope - 1) / 2` | `feComponentTransfer` linear intercept to center tonal shift |
| Grid cell size | **2** | — | Size of each grain rect in viewBox units |
| Target file size | **~15KB** | — | Adjust element count to hit this |
| Element count | **800–1200** | — | Grain rects per frame (tune to reach 15KB) |
| Seed | **unique per frame** | — | Different pattern each frame for shimmer effect |

### Illustrator-to-SVG Mapping Formulas
```
Density         = intensity / 100                        → 0.41
Slope           = 1 + (contrast / 100)                   → 1.71
Intercept       = -(slope - 1) / 2                       → -0.355
Opacity range   = [0.03, 0.03 + (contrast / 100) * 0.45] → [0.03, 0.35]
Opacity bias    = skew toward darker end (contrast > 50 = more extreme values)
```

### Grain Generator Utility
Claude Code creates this utility at `src/lib/generate-grain.ts`. It is called at **build time or manually** to produce the grain SVG markup string that gets pasted into each frame component.

```typescript
// src/lib/generate-grain.ts
// Grain generator for imq_svg_grain_01_normal & imq_svg_grain_01_vertical_normal
// Replicates Illustrator Effect > Texture > Grain

interface GrainConfig {
  seed: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
  cellSize?: number;        // default 2
  density?: number;         // default 0.41 (intensity 41/100)
  contrast?: number;        // default 0.71 (contrast 71/100)
  targetElements?: number;  // default ~1000, tune for file size
}

function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function contrastBiasedOpacity(rand: number, contrast: number): number {
  const minOpacity = 0.03;
  const maxOpacity = 0.03 + contrast * 0.45;
  const exponent = 1 - contrast * 0.6;
  const biased = Math.pow(rand, exponent);
  return minOpacity + biased * (maxOpacity - minOpacity);
}

export function generateGrainElements(config: GrainConfig): string {
  const {
    seed, viewBoxWidth, viewBoxHeight,
    cellSize = 2, density = 0.41, contrast = 0.71, targetElements,
  } = config;

  const rand = mulberry32(seed);
  const cols = Math.floor(viewBoxWidth / cellSize);
  const rows = Math.floor(viewBoxHeight / cellSize);
  const totalCells = cols * rows;

  const indices: number[] = [];
  for (let i = 0; i < totalCells; i++) {
    if (rand() < density) indices.push(i);
  }
  const selected = targetElements ? indices.slice(0, targetElements) : indices;

  const slope = 1 + contrast;
  const intercept = -(slope - 1) / 2;

  const rects = selected.map((idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = col * cellSize;
    const y = row * cellSize;
    const opacity = contrastBiasedOpacity(rand(), contrast);
    const sizeJitter = cellSize + (rand() - 0.5);
    const size = Math.max(0.5, Math.min(cellSize + 1, sizeJitter));
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${size.toFixed(1)}" height="${size.toFixed(1)}" opacity="${opacity.toFixed(3)}"/>`;
  });

  return `<defs>
  <filter id="grain-contrast-${seed}">
    <feComponentTransfer>
      <feFuncR type="linear" slope="${slope.toFixed(2)}" intercept="${intercept.toFixed(3)}"/>
      <feFuncG type="linear" slope="${slope.toFixed(2)}" intercept="${intercept.toFixed(3)}"/>
      <feFuncB type="linear" slope="${slope.toFixed(2)}" intercept="${intercept.toFixed(3)}"/>
    </feComponentTransfer>
  </filter>
</defs>
<g fill="currentColor" filter="url(#grain-contrast-${seed})" pointer-events="none" aria-hidden="true">
${rects.join("\n")}
</g>`;
}

export function generateIconGrain(seed: number): string {
  return generateGrainElements({
    seed, viewBoxWidth: 24, viewBoxHeight: 24,
    cellSize: 0.5, density: 0.41, contrast: 0.71, targetElements: 950,
  });
}
```

### Frame Component Template
```tsx
// src/components/icons/sword/frame-1.tsx
// Grain applied via imq_svg_grain_01_normal (seed: 1)
export function SwordFrame1({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
         strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* === Artwork paths (user-provided) === */}
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path d="M13 19l6-6" />
      <path d="M16 16l4 4" />

      {/* === Grain overlay (imq_svg_grain_01_normal, seed: 1) === */}
      <defs>
        <filter id="grain-contrast-1">
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.71" intercept="-0.355"/>
            <feFuncG type="linear" slope="1.71" intercept="-0.355"/>
            <feFuncB type="linear" slope="1.71" intercept="-0.355"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <g fill="currentColor" filter="url(#grain-contrast-1)" pointerEvents="none" aria-hidden="true">
        {/* ~950 rects generated by generateIconGrain(1) */}
        <rect x="0.5" y="0.0" width="1.8" height="1.8" opacity="0.187"/>
        {/* ... hundreds more ... */}
      </g>
    </svg>
  );
}
```

### Size Tuning Reference
| `targetElements` | Approx rect markup | Approx .tsx file size |
|-------------------|--------------------|-----------------------|
| 600 | ~9KB | ~10KB |
| 800 | ~12KB | ~13KB |
| **950** | **~14.3KB** | **~15KB ← target** |
| 1100 | ~16.5KB | ~17.5KB |

### Performance Profile
| Metric | Value | Notes |
|--------|-------|-------|
| Tier | **1 (CSS-only)** | 0KB JavaScript |
| Render cost | **One-time paint** | Rasterized on first render, cached |
| Mobile | **Excellent** | No runtime filter cost |
| File size | **~14KB per frame** | Grain IS the file weight |

---

## imq_svg_grain_01_optimized

**Procedural SVG grain filter — Illustrator Grain (Intensity 41, Contrast 71) — ~400 bytes per frame**

### What It Does
Applies an SVG `<filter>` chain using `feTurbulence` + `feComponentTransfer` + `feBlend` to generate grain procedurally at render time. Same Illustrator settings as `_normal`, but as a **procedural filter** instead of baked elements.

### When to Use This Instead of `_normal`
| Scenario | Use `_normal` | Use `_optimized` |
|----------|---------------|------------------|
| Need to hit 15KB per frame | ✅ | ❌ (adds only ~400 bytes) |
| Low-end mobile / WKWebView struggling | ❌ | ✅ (lighter first paint) |
| Frames already at 15KB from artwork | ❌ | ✅ |
| Want grain shimmer between frames | ✅ (unique seed per frame) | ⚠️ (seed attr must vary) |
| Want exact Illustrator grain look | ✅ (stochastic dots) | ⚠️ (smoother organic noise) |

### Default Parameters
| Parameter | Default | Illustrator Mapping | Description |
|-----------|---------|---------------------|-------------|
| baseFrequency | **0.65** | Intensity 41/100 | `feTurbulence` noise frequency |
| numOctaves | **4** | Intensity detail | Noise complexity layers |
| Noise type | **fractalNoise** | Grain type "Regular" | Stochastic noise |
| Contrast slope | **1.71** | `1 + (71/100)` | `feComponentTransfer` linear slope |
| Contrast intercept | **-0.355** | `-(1.71 - 1) / 2` | Intercept |
| Grain opacity | **0.15** | Intensity normalized | Blend strength |
| Blend mode | **overlay** | — | How grain composites |
| Seed | **unique per frame** | — | `feTurbulence seed` attribute |

### Illustrator-to-SVG Filter Mapping
```
baseFrequency   = 0.45 + (intensity / 100) * 0.5    → 0.655 ≈ 0.65
numOctaves      = intensity > 30 ? 4 : 3            → 4
slope           = 1 + (contrast / 100)               → 1.71
intercept       = -(slope - 1) / 2                   → -0.355
grain opacity   = (intensity / 100) * 0.37           → 0.15
```

### Frame Component Template
```tsx
// src/components/icons/sword/frame-1.tsx
// Grain applied via imq_svg_grain_01_optimized (seed: 11)
export function SwordFrame1({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
         strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path d="M13 19l6-6" />
      <path d="M16 16l4 4" />

      <defs>
        <filter id="imq-grain-opt-11" x="0%" y="0%" width="100%" height="100%"
                colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.65"
            numOctaves={4} seed={11} stitchTiles="stitch" result="noise"/>
          <feColorMatrix in="noise" type="saturate" values="0" result="monoNoise"/>
          <feComponentTransfer in="monoNoise" result="contrastNoise">
            <feFuncR type="linear" slope="1.71" intercept="-0.355"/>
            <feFuncG type="linear" slope="1.71" intercept="-0.355"/>
            <feFuncB type="linear" slope="1.71" intercept="-0.355"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <rect x="0" y="0" width="24" height="24"
        filter="url(#imq-grain-opt-11)" opacity={0.15}
        style={{ mixBlendMode: "overlay" }}
        pointerEvents="none" aria-hidden="true"/>
    </svg>
  );
}
```

### Seed Strategy
| Frame | Seed | Rationale |
|-------|------|-----------|
| frame-1 | **11** | Base seed |
| frame-2 | **37** | Prime, far from 11 |
| frame-3 | **73** | Prime, far from both |
| frame-4 | **97** | Prime, if 4 frames |

### ⚠️ Mobile Caution
`feTurbulence` with `numOctaves="4"` can cause **50-100ms paint stall** on low-end Android WebViews (Adreno 3xx/4xx). Drop to `numOctaves="3"` or switch to `_normal` if profiling shows issues.

### Visual Difference from `_normal`
`_normal` = sharp stochastic dots (exact Illustrator match). `_optimized` = smooth Perlin noise (softer, more photographic film grain character).

---

## imq_svg_grain_01_vertical_normal

**Baked SVG vertical grain texture — Illustrator Grain Type: Vertical (Intensity 41, Contrast 70) — reaches ~15KB per frame**

### What It Does
Same concept as `imq_svg_grain_01_normal`, but instead of square dots, the baked elements are **tall, narrow rectangles** that create vertical streak patterns. This replicates Illustrator's `Effect > Texture > Grain` with **Grain Type: Vertical**, **Intensity 41**, and **Contrast 70**.

The result looks like vertical film-strip scanning artifacts, CRT phosphor columns, or rain streaks — a directional texture rather than random noise. Each frame gets a unique seed so the streaks shift subtly during animation, creating a "rolling shutter" shimmer.

### Visual Difference from Regular Grain
| Property | `grain_01_normal` (Regular) | `grain_01_vertical_normal` (Vertical) |
|----------|----------------------------|---------------------------------------|
| Element shape | Square-ish rects (~2×2) | Tall narrow rects (~0.5×4 to ~1×8) |
| Pattern feel | Random stipple dots | Vertical line streaks |
| Aesthetic | Film grain, analog photo | CRT scanlines, rain, film-strip |
| Direction | Omnidirectional | Strongly vertical |
| Illustrator type | "Regular" | "Vertical" |

### Default Parameters
| Parameter | Default | Illustrator Mapping | Description |
|-----------|---------|---------------------|-------------|
| Intensity | **0.41** | Grain Intensity 41/100 | Coverage density |
| Contrast | **0.70** | Grain Contrast 70/100 | Opacity spread |
| Slope | **1.70** | `1 + (70 / 100)` | `feComponentTransfer` linear slope |
| Intercept | **-0.35** | `-(1.70 - 1) / 2` | `feComponentTransfer` linear intercept |
| Rect width | **0.3–1.0** | — | Narrow width, randomized per element |
| Rect height | **3.0–8.0** | — | Tall height, randomized per element |
| Column spacing | **0.5** | — | Horizontal grid cell size |
| Target file size | **~15KB** | — | Adjust element count |
| Element count | **700–1000** | — | Fewer elements needed (each rect is larger) |
| Seed | **unique per frame** | — | Different pattern each frame |

### Illustrator-to-SVG Mapping Formulas
```
Density         = intensity / 100                        → 0.41
Slope           = 1 + (contrast / 100)                   → 1.70
Intercept       = -(slope - 1) / 2                       → -0.35
Opacity range   = [0.03, 0.03 + (contrast / 100) * 0.45] → [0.03, 0.345]
Width range     = [0.3, 1.0]     (narrow — vertical emphasis)
Height range    = [3.0, 8.0]     (tall — vertical emphasis)
Aspect ratio    = height/width ≈ 6:1 to 10:1 (strongly vertical)
```

### Vertical Grain Generator Utility
Claude Code adds this function to `src/lib/generate-grain.ts` alongside the regular grain generator.

```typescript
// Add to src/lib/generate-grain.ts

interface VerticalGrainConfig {
  seed: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
  columnSpacing?: number;   // default 0.5
  density?: number;         // default 0.41
  contrast?: number;        // default 0.70
  minWidth?: number;        // default 0.3
  maxWidth?: number;        // default 1.0
  minHeight?: number;       // default 3.0
  maxHeight?: number;       // default 8.0
  targetElements?: number;  // default ~850
}

export function generateVerticalGrainElements(config: VerticalGrainConfig): string {
  const {
    seed, viewBoxWidth, viewBoxHeight,
    columnSpacing = 0.5, density = 0.41, contrast = 0.70,
    minWidth = 0.3, maxWidth = 1.0,
    minHeight = 3.0, maxHeight = 8.0,
    targetElements,
  } = config;

  const rand = mulberry32(seed);
  const cols = Math.floor(viewBoxWidth / columnSpacing);
  const rects: string[] = [];
  const slope = 1 + contrast;
  const intercept = -(slope - 1) / 2;
  const maxElements = targetElements ?? Math.round(cols * (viewBoxHeight / 2) * density);
  let count = 0;

  for (let col = 0; col < cols && count < maxElements; col++) {
    const baseX = col * columnSpacing;
    let y = rand() * 2; // Stagger start per column

    while (y < viewBoxHeight && count < maxElements) {
      if (rand() < density) {
        const w = minWidth + rand() * (maxWidth - minWidth);
        const h = minHeight + rand() * (maxHeight - minHeight);
        const x = baseX + (rand() - 0.5) * columnSpacing * 0.3; // Horizontal jitter
        const opacity = contrastBiasedOpacity(rand(), contrast);
        const clampedY = Math.min(y, viewBoxHeight - h);
        const clampedX = Math.max(0, Math.min(x, viewBoxWidth - w));

        rects.push(
          `<rect x="${clampedX.toFixed(2)}" y="${clampedY.toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" opacity="${opacity.toFixed(3)}"/>`
        );
        count++;
      }
      y += minHeight * 0.5 + rand() * minHeight;
    }
  }

  return `<defs>
  <filter id="vgrain-contrast-${seed}">
    <feComponentTransfer>
      <feFuncR type="linear" slope="${slope.toFixed(2)}" intercept="${intercept.toFixed(3)}"/>
      <feFuncG type="linear" slope="${slope.toFixed(2)}" intercept="${intercept.toFixed(3)}"/>
      <feFuncB type="linear" slope="${slope.toFixed(2)}" intercept="${intercept.toFixed(3)}"/>
    </feComponentTransfer>
  </filter>
</defs>
<g fill="currentColor" filter="url(#vgrain-contrast-${seed})" pointer-events="none" aria-hidden="true">
${rects.join("\n")}
</g>`;
}

export function generateIconVerticalGrain(seed: number): string {
  return generateVerticalGrainElements({
    seed, viewBoxWidth: 24, viewBoxHeight: 24,
    columnSpacing: 0.5, density: 0.41, contrast: 0.70, targetElements: 850,
  });
}
```

### Frame Component Template
```tsx
// src/components/icons/sword/frame-1.tsx
// Vertical grain via imq_svg_grain_01_vertical_normal (seed: 1)
export function SwordFrame1({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
         strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path d="M13 19l6-6" />
      <path d="M16 16l4 4" />

      <defs>
        <filter id="vgrain-contrast-1">
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.70" intercept="-0.35"/>
            <feFuncG type="linear" slope="1.70" intercept="-0.35"/>
            <feFuncB type="linear" slope="1.70" intercept="-0.35"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <g fill="currentColor" filter="url(#vgrain-contrast-1)" pointerEvents="none" aria-hidden="true">
        {/* ~850 tall narrow rects generated by generateIconVerticalGrain(1) */}
        <rect x="0.42" y="1.30" width="0.65" height="5.20" opacity="0.192"/>
        <rect x="0.98" y="8.71" width="0.38" height="4.10" opacity="0.057"/>
        {/* ... hundreds more vertical streaks ... */}
      </g>
    </svg>
  );
}
```

### Size Tuning Reference
| `targetElements` | Approx rect markup | Approx .tsx file size |
|-------------------|--------------------|-----------------------|
| 500 | ~9.5KB | ~10.5KB |
| 700 | ~13KB | ~14KB |
| **850** | **~15.5KB** | **~16.5KB ← target** |
| 1000 | ~18KB | ~19KB |

Note: vertical rects have more bytes per element (~18 vs ~15) because of 4 unique decimal values.

### Performance Profile
| Metric | Value |
|--------|-------|
| Tier | **1 (CSS-only)** |
| Render cost | **One-time paint** |
| Mobile | **Excellent** |
| File size | **~14KB per frame** |

---

## imq_svg_grain_01_vertical_optimized

**Procedural SVG vertical grain filter — Illustrator Grain Type: Vertical (Intensity 41, Contrast 70) — ~400 bytes per frame**

### What It Does
Same `feTurbulence` + `feComponentTransfer` filter chain as `imq_svg_grain_01_optimized`, but with **asymmetric `baseFrequency` values** that stretch the noise vertically. High X frequency (tight horizontal spacing) + low Y frequency (elongated vertically) = vertical streak patterns approximating Illustrator's "Vertical" grain type.

### How Vertical Direction Is Achieved in SVG Filters
The `feTurbulence` element accepts two values for `baseFrequency`: `"freqX freqY"`.

```
Regular grain:   baseFrequency="0.65"          → equal X and Y → omnidirectional dots
Vertical grain:  baseFrequency="0.65 0.12"     → high X, low Y → vertical streaks
```

This single parameter change is the key difference from `imq_svg_grain_01_optimized`.

### Default Parameters
| Parameter | Default | Illustrator Mapping | Description |
|-----------|---------|---------------------|-------------|
| baseFrequency X | **0.65** | Intensity (horizontal tightness) | Tight horizontal = narrow columns |
| baseFrequency Y | **0.12** | Vertical stretch factor | Low Y = elongated vertically |
| numOctaves | **4** | Intensity detail | Noise complexity |
| Noise type | **fractalNoise** | Grain type "Vertical" | Fractal noise stretched directionally |
| Contrast slope | **1.70** | `1 + (70/100)` | `feComponentTransfer` slope |
| Contrast intercept | **-0.35** | `-(1.70 - 1) / 2` | Intercept |
| Grain opacity | **0.15** | Intensity normalized | Blend strength |
| Blend mode | **overlay** | — | How grain composites |
| Seed | **unique per frame** | — | For per-frame variation |

### Illustrator-to-SVG Filter Mapping
```
baseFrequency X = 0.45 + (intensity / 100) * 0.5        → 0.655 ≈ 0.65
baseFrequency Y = baseFrequency X * 0.18                 → 0.117 ≈ 0.12
                  (0.18 ratio matches Illustrator vertical grain stretch)
numOctaves      = 4
slope           = 1 + (contrast / 100)                   → 1.70
intercept       = -(slope - 1) / 2                       → -0.35
grain opacity   = (intensity / 100) * 0.37               → 0.15
```

### Frame Component Template
```tsx
// src/components/icons/sword/frame-1.tsx
// Vertical grain via imq_svg_grain_01_vertical_optimized (seed: 11)
export function SwordFrame1({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
         strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path d="M13 19l6-6" />
      <path d="M16 16l4 4" />

      <defs>
        <filter id="imq-vgrain-opt-11" x="0%" y="0%" width="100%" height="100%"
                colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.65 0.12"
            numOctaves={4} seed={11} stitchTiles="stitch" result="noise"/>
          <feColorMatrix in="noise" type="saturate" values="0" result="monoNoise"/>
          <feComponentTransfer in="monoNoise" result="contrastNoise">
            <feFuncR type="linear" slope="1.70" intercept="-0.35"/>
            <feFuncG type="linear" slope="1.70" intercept="-0.35"/>
            <feFuncB type="linear" slope="1.70" intercept="-0.35"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <rect x="0" y="0" width="24" height="24"
        filter="url(#imq-vgrain-opt-11)" opacity={0.15}
        style={{ mixBlendMode: "overlay" }}
        pointerEvents="none" aria-hidden="true"/>
    </svg>
  );
}
```

### Claude Code Workflow
Same as `imq_svg_grain_01_optimized`, but use filter ID prefix `imq-vgrain-opt-` and `baseFrequency="0.65 0.12"` (two values, not one).

### Visual Comparison: All Four Grain Variants
| Variant | Shape | Direction | Look | Size |
|---------|-------|-----------|------|------|
| `grain_01_normal` | Square dots | Random | Illustrator stipple | 15KB |
| `grain_01_optimized` | Smooth noise | Random | Film grain | 400B |
| `grain_01_vertical_normal` | Tall narrow rects | Vertical | CRT / rain | 15KB |
| `grain_01_vertical_optimized` | Stretched noise | Vertical | Soft vertical wash | 400B |

---

## imq_svg_glow_01_edges_normal

**SVG Glowing Edges filter — Illustrator Glowing Edges (Edge Width 6, Edge Brightness 3, Smoothness 9) — ~800 bytes per frame**

### What It Does
Applies a multi-stage SVG filter chain that replicates Adobe Illustrator's `Effect > Stylize > Glowing Edges` with **Edge Width 6**, **Edge Brightness 3**, and **Smoothness 9**. Detects the contour edges of the artwork using a **Laplacian convolution kernel** (`feConvolveMatrix`), boosts their brightness, applies a Gaussian blur for the glow spread, and composites the luminous edges back over the source artwork using `screen` blending.

The result is a neon-outline effect — bright, soft-edged contour lines that glow on top of the artwork. At brightness 3 (low), this is a subtle accent, not an overwhelming neon sign. The smoothness 9 (high) gives the glow a wide, diffused spread.

### Why This Uses `feConvolveMatrix` (and Why It Matters)
Illustrator's Glowing Edges runs a true edge detection pass internally — not a simple dilate/subtract. The `feConvolveMatrix` primitive with a Laplacian kernel produces the most accurate edge map in SVG, matching Illustrator's behavior closely. However, `feConvolveMatrix` is rated **High performance / Limited mobile** in the HappyVeneer effects catalog (#102). This makes `_normal` a **desktop and high-end mobile** effect. For universal mobile support, use `_optimized` instead.

### Default Parameters
| Parameter | Default | Illustrator Setting | SVG Mapping | Description |
|-----------|---------|---------------------|-------------|-------------|
| Edge Width | **6** | Edge Width 6/14 | `feConvolveMatrix` + `feMorphology dilate radius="1.3"` | Thickness of detected edge band |
| Edge Brightness | **3** | Edge Brightness 3/20 | `feComponentTransfer slope="1.30" intercept="0.02"` | Glow luminosity |
| Smoothness | **9** | Smoothness 9/15 | `feGaussianBlur stdDeviation="2.4"` | Glow blur spread |
| Blend mode | **screen** | — | `feBlend mode="screen"` | Additive glow compositing |
| Glow tint | **none (inherits artwork colors)** | — | Edge colors come from source graphic | Glow matches the artwork's own colors |

### Illustrator-to-SVG Mapping Formulas
```
dilateRadius    = (edgeWidth / 14) * 3.0              → (6/14) * 3.0 = 1.29 ≈ 1.3
blurDeviation   = (smoothness / 15) * 4.0             → (9/15) * 4.0 = 2.4
brightnessSlope = 1 + (brightness / 20) * 2.0         → 1 + (3/20) * 2.0 = 1.30
brightnessInt   = (brightness / 20) * 0.15            → (3/20) * 0.15 = 0.0225 ≈ 0.02
```

### The Filter Definition (Full Chain — 7 Stages)

```xml
<!-- Inside each frame's <svg> <defs> -->
<filter id="imq-glow-edges-{frameIndex}" x="-10%" y="-10%" width="120%" height="120%"
        color-interpolation-filters="sRGB">

  <!-- Stage 1: Laplacian edge detection via convolution kernel.
       This is a 3×3 Laplacian that finds all edges regardless of direction.
       The kernel values (-1 around center, 8 at center) detect both
       horizontal and vertical edges simultaneously. -->
  <feConvolveMatrix
    in="SourceGraphic"
    order="3"
    kernelMatrix="
      -1 -1 -1
      -1  8 -1
      -1 -1 -1"
    divisor="1"
    bias="0"
    edgeMode="none"
    preserveAlpha="true"
    result="edges"
  />

  <!-- Stage 2: Slightly dilate edges to reach target Edge Width 6.
       The convolution finds 1px edges; dilation expands them. -->
  <feMorphology
    operator="dilate"
    radius="1.3"
    in="edges"
    result="thickEdges"
  />

  <!-- Stage 3: Boost edge brightness.
       Edge Brightness 3/20 = subtle glow, not blinding. -->
  <feComponentTransfer in="thickEdges" result="brightEdges">
    <feFuncR type="linear" slope="1.30" intercept="0.02"/>
    <feFuncG type="linear" slope="1.30" intercept="0.02"/>
    <feFuncB type="linear" slope="1.30" intercept="0.02"/>
  </feComponentTransfer>

  <!-- Stage 4: Gaussian blur for glow spread (Smoothness 9/15 = wide glow). -->
  <feGaussianBlur
    in="brightEdges"
    stdDeviation="2.4"
    result="glowBlur"
  />

  <!-- Stage 5: Merge sharp edges + blur glow for definition + softness. -->
  <feMerge result="glow">
    <feMergeNode in="glowBlur"/>
    <feMergeNode in="brightEdges"/>
  </feMerge>

  <!-- Stage 6: Screen blend glow over original artwork.
       Screen mode = additive light, glow brightens without darkening. -->
  <feBlend mode="screen" in="glow" in2="SourceGraphic" result="glowOnSource"/>

  <!-- Stage 7: Final composite — use SourceGraphic alpha to clip the glow
       so it doesn't bleed outside the SVG viewBox bounds. -->
  <feComposite operator="in" in="glowOnSource" in2="SourceGraphic"/>
</filter>
```

### Frame Component Template
```tsx
// src/components/icons/sword/frame-1.tsx
// Glowing Edges via imq_svg_glow_01_edges_normal
export function SwordFrame1({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
         strokeLinecap="round" strokeLinejoin="round" className={className}>
      <defs>
        <filter id="imq-glow-edges-1" x="-10%" y="-10%" width="120%" height="120%"
                colorInterpolationFilters="sRGB">
          <feConvolveMatrix in="SourceGraphic" order={3}
            kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1"
            divisor={1} bias={0} edgeMode="none" preserveAlpha="true" result="edges"/>
          <feMorphology operator="dilate" radius="1.3" in="edges" result="thickEdges"/>
          <feComponentTransfer in="thickEdges" result="brightEdges">
            <feFuncR type="linear" slope="1.30" intercept="0.02"/>
            <feFuncG type="linear" slope="1.30" intercept="0.02"/>
            <feFuncB type="linear" slope="1.30" intercept="0.02"/>
          </feComponentTransfer>
          <feGaussianBlur in="brightEdges" stdDeviation="2.4" result="glowBlur"/>
          <feMerge result="glow">
            <feMergeNode in="glowBlur"/>
            <feMergeNode in="brightEdges"/>
          </feMerge>
          <feBlend mode="screen" in="glow" in2="SourceGraphic" result="glowOnSource"/>
          <feComposite operator="in" in="glowOnSource" in2="SourceGraphic"/>
        </filter>
      </defs>

      {/* Apply glow filter to the entire artwork group */}
      <g filter="url(#imq-glow-edges-1)">
        <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
        <path d="M13 19l6-6" />
        <path d="M16 16l4 4" />
      </g>
    </svg>
  );
}
```

### Application Pattern: Glow Wraps Artwork, Not Appended After
Unlike grain codes (which add elements AFTER artwork), the glow filter wraps the artwork it should affect. The `filter="url(#...)"` attribute goes on a `<g>` that contains the artwork paths:

```
Grain pattern:     <svg> → artwork paths → grain <g> on top
Glow pattern:      <svg> → <g filter="glow"> → artwork paths inside </g>
Combined pattern:  <svg> → <g filter="glow"> → artwork paths </g> → grain <g> on top
```

When combining with grain, the glow filter goes on the artwork group, and grain elements sit OUTSIDE that group (on top):

```tsx
<svg viewBox="0 0 24 24" ...>
  <defs>
    <filter id="imq-glow-edges-1">/* ... glow filter chain ... */</filter>
    <filter id="grain-contrast-1">/* ... grain contrast ... */</filter>
  </defs>

  {/* Artwork with glow */}
  <g filter="url(#imq-glow-edges-1)">
    <path d="..." />
    <path d="..." />
  </g>

  {/* Grain overlay on top of everything */}
  <g fill="currentColor" filter="url(#grain-contrast-1)" pointerEvents="none">
    <rect ... /><rect ... />
  </g>
</svg>
```

### Applying Glow to Specific Groups
Reference Illustrator layer groups by `id` (see SVG Layer Groups section):

> "Apply `imq_svg_glow_01_edges_normal` to the `#character-sword` group only."

Claude Code wraps that specific `<g>` with the filter instead of the root artwork group.

### Filter Region: Why `x="-10%" y="-10%" width="120%" height="120%"`
The glow blur spreads beyond the original artwork bounds. The default SVG filter region (exactly the element bounds) would clip the glow. The 10% padding on all sides gives the blur room to breathe. Increase for more spread, decrease to save GPU work.

### ⚠️ Mobile Caution
`feConvolveMatrix` is rated **High / Limited** in the HappyVeneer effects catalog. On low-end mobile GPUs (Adreno 3xx/4xx, Mali-G5x), this filter can cause **100-300ms paint stalls**. The convolution kernel runs per-pixel with 9 multiplications + 9 additions per pixel.

**If profiling shows issues**, switch to `imq_svg_glow_01_edges_optimized` which uses `feMorphology` instead (Medium / Good mobile).

### Performance Profile
| Metric | Value | Notes |
|--------|-------|-------|
| Tier | **1 (CSS-only)** | 0KB JavaScript |
| Render cost | **High first paint** | feConvolveMatrix is per-pixel convolution |
| Animation cost | **Zero** | Filter cached after first render, visibility toggle doesn't re-filter |
| Mobile | **Limited** | Desktop + high-end mobile only (see caution above) |
| `prefers-reduced-motion` | **Shows frame-1 with glow** | Static fallback includes the glow |
| File size impact | **~800 bytes per frame** | Filter definition only |

---

## imq_svg_glow_01_edges_optimized

**SVG Glowing Edges filter (lightweight) — Illustrator Glowing Edges (Edge Width 6, Edge Brightness 3, Smoothness 9) — ~500 bytes per frame**

### What It Does
Same visual goal as `_normal` — luminous edge outlines that glow on top of artwork — but using a **lighter filter chain** that avoids `feConvolveMatrix`. Edge detection is done via `feMorphology` (dilate + composite subtraction) instead of Laplacian convolution. This trades some edge precision for universal mobile compatibility.

### How It Differs from `_normal`
| Aspect | `_normal` | `_optimized` |
|--------|-----------|--------------|
| Edge detection | Laplacian convolution (`feConvolveMatrix`) | Dilate-subtract (`feMorphology` + `feComposite`) |
| Edge quality | Sharper, thinner, finds all edge types | Slightly thicker, follows shape outlines only |
| Filter stages | 7 | 4 |
| Filter bytes | ~800 | ~500 |
| Mobile | Limited (feConvolveMatrix is heavy) | **Good** (feMorphology is Medium rating) |
| Visual difference | Precise neon hairlines | Softer glow halos |

### Default Parameters
| Parameter | Default | Illustrator Setting | SVG Mapping | Description |
|-----------|---------|---------------------|-------------|-------------|
| Edge Width | **6** | Edge Width 6/14 | `feMorphology dilate radius="1.3"` | Edge band thickness |
| Edge Brightness | **3** | Edge Brightness 3/20 | Implicit via blur opacity | Glow intensity |
| Smoothness | **9** | Smoothness 9/15 | `feGaussianBlur stdDeviation="2.4"` | Glow blur spread |
| Blend mode | **screen** | — | `feBlend mode="screen"` | Additive glow |
| Glow opacity | **0.6** | Normalized from brightness | `opacity` on glow rect or group | Overall effect strength |

### Illustrator-to-SVG Mapping Formulas
```
dilateRadius    = (edgeWidth / 14) * 3.0              → 1.3
blurDeviation   = (smoothness / 15) * 4.0             → 2.4
glowOpacity     = 0.3 + (brightness / 20) * 0.5      → 0.3 + 0.075 = 0.375 ≈ 0.4
                  (boosted slightly to compensate for simpler edge detection)
```

### The Filter Definition (Simplified — 4 Stages)

```xml
<!-- Inside each frame's <svg> <defs> -->
<filter id="imq-glow-edges-opt-{frameIndex}" x="-10%" y="-10%" width="120%" height="120%"
        color-interpolation-filters="sRGB">

  <!-- Stage 1: Dilate the source graphic to expand shapes.
       The difference between dilated and original = edge band. -->
  <feMorphology
    operator="dilate"
    radius="1.3"
    in="SourceGraphic"
    result="dilated"
  />

  <!-- Stage 2: Subtract original from dilated = edges only.
       feComposite "out" keeps only the parts of dilated
       that DON'T overlap with the original shape. -->
  <feComposite
    operator="out"
    in="dilated"
    in2="SourceGraphic"
    result="edges"
  />

  <!-- Stage 3: Blur the edges for the glow effect (Smoothness 9). -->
  <feGaussianBlur
    in="edges"
    stdDeviation="2.4"
    result="glow"
  />

  <!-- Stage 4: Screen blend glowing edges over the original artwork. -->
  <feBlend mode="screen" in="glow" in2="SourceGraphic"/>
</filter>
```

### Frame Component Template
```tsx
// src/components/icons/sword/frame-1.tsx
// Glowing Edges via imq_svg_glow_01_edges_optimized
export function SwordFrame1({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
         strokeLinecap="round" strokeLinejoin="round" className={className}>
      <defs>
        <filter id="imq-glow-edges-opt-1" x="-10%" y="-10%" width="120%" height="120%"
                colorInterpolationFilters="sRGB">
          <feMorphology operator="dilate" radius="1.3"
            in="SourceGraphic" result="dilated"/>
          <feComposite operator="out" in="dilated" in2="SourceGraphic" result="edges"/>
          <feGaussianBlur in="edges" stdDeviation="2.4" result="glow"/>
          <feBlend mode="screen" in="glow" in2="SourceGraphic"/>
        </filter>
      </defs>

      <g filter="url(#imq-glow-edges-opt-1)">
        <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
        <path d="M13 19l6-6" />
        <path d="M16 16l4 4" />
      </g>
    </svg>
  );
}
```

### Application Pattern
Same as `_normal` — glow wraps the artwork, grain sits on top:

```
Glow pattern:      <svg> → <g filter="glow"> → artwork paths </g>
Combined:          <svg> → <g filter="glow"> → artwork </g> → grain <g> on top
```

### Claude Code Workflow — Both Glow Variants

When the user says "apply `imq_svg_glow_01_edges_normal` (or `_optimized`) to frames":

1. **Add the filter definition** inside `<defs>` in each frame's `<svg>`
2. **Wrap the artwork paths** in a `<g filter="url(#...)">` — do NOT add the filter as a sibling element after artwork (unlike grain)
3. **Use unique filter IDs per frame**: `imq-glow-edges-{frameIndex}` for normal, `imq-glow-edges-opt-{frameIndex}` for optimized
4. **If combining with grain**, add grain elements OUTSIDE the glow `<g>`, as the last children of `<svg>`
5. **If the user specifies a group ID** (e.g., `#character-sword`), wrap only that `<g>` with the filter
6. **Do NOT modify `index.tsx`** — glow lives inside the frames

### Filter ID Naming Convention
| Variant | Format | Example |
|---------|--------|---------|
| Normal | `imq-glow-edges-{frameIndex}` | `imq-glow-edges-1`, `imq-glow-edges-2` |
| Optimized | `imq-glow-edges-opt-{frameIndex}` | `imq-glow-edges-opt-1`, `imq-glow-edges-opt-2` |

Note: glow filter IDs use `frameIndex` (1, 2, 3) not PRNG seeds, because the filter is deterministic — same filter on different artwork produces different edges automatically. No seed variation needed.

### Parameter Tweaking Guide
If the default settings don't match the desired look, here's how each parameter affects the result:

| Want this | Change this | In the filter |
|-----------|-------------|---------------|
| Thicker edge lines | Increase dilate radius | `feMorphology radius="2.0"` |
| Thinner edge lines | Decrease dilate radius | `feMorphology radius="0.8"` |
| Brighter glow | Increase slope + intercept | `slope="2.0" intercept="0.1"` (normal only) |
| Dimmer glow | Decrease slope | `slope="1.1" intercept="0.0"` (normal only) |
| Wider glow spread | Increase blur | `feGaussianBlur stdDeviation="3.5"` |
| Tighter glow | Decrease blur | `feGaussianBlur stdDeviation="1.0"` |
| More padding for glow bleed | Increase filter region | `x="-20%" y="-20%" width="140%" height="140%"` |

### Performance Profile
| Metric | Value | Notes |
|--------|-------|-------|
| Tier | **1 (CSS-only)** | 0KB JavaScript |
| Render cost | **Medium first paint** | feMorphology + feGaussianBlur are manageable |
| Animation cost | **Zero** | Filter cached; visibility toggle doesn't re-filter |
| Mobile | **Good** | feMorphology is rated Medium/Good in HappyVeneer catalog |
| `prefers-reduced-motion` | **Shows frame-1 with glow** | Static fallback includes glow |
| File size impact | **~500 bytes per frame** | Filter definition only |

### Visual Comparison: All Effect Types
| Effect | Technique | Look | Mobile | Size |
|--------|-----------|------|--------|------|
| `grain_01_normal` | Baked square rects | Stipple dots | Excellent | 15KB |
| `grain_01_optimized` | feTurbulence filter | Smooth noise | Good | 400B |
| `grain_01_vertical_normal` | Baked tall rects | Vertical streaks | Excellent | 15KB |
| `grain_01_vertical_optimized` | Stretched feTurbulence | Soft vertical wash | Good | 400B |
| **`glow_01_edges_normal`** | **Laplacian + blur** | **Precise neon outlines** | **Limited** | **800B** |
| **`glow_01_edges_optimized`** | **Dilate-subtract + blur** | **Soft glow halos** | **Good** | **500B** |

---

## SVG Layer Groups & Illustrator Export Guide

This section explains how to structure your SVG artwork in Illustrator so that individual parts of the icon can receive different effects (e.g., grain on the background but not the character, or a different filter on the sword vs. the shield).

### Why This Matters
By default, grain codes apply their effect to the **entire frame** — the grain `<g>` or `<rect>` sits on top of everything. But sometimes you want grain on only part of the artwork, or different effects on different layers. SVG `<g>` groups with `id` attributes make this possible.

### Step 1: Structure Your Illustrator File with Named Layers

In Illustrator's **Layers panel** (Window > Layers), organize your artwork into named layers and sub-layers. Each layer name becomes the `id` attribute on the corresponding `<g>` element in the exported SVG.

```
Illustrator Layers Panel:
┌─────────────────────────────┐
│ ▼ Frame-1                   │  ← Top-level layer
│   ▼ foreground              │  ← Sub-layer → <g id="foreground">
│     ● character-body        │  ← Object/group → <g id="character-body">
│     ● character-sword       │  ← Object/group → <g id="character-sword">
│   ▼ midground               │  ← Sub-layer → <g id="midground">
│     ● particles             │  ← Object/group → <g id="particles">
│   ▼ background              │  ← Sub-layer → <g id="background">
│     ● sky                   │  ← Object/group → <g id="sky">
│     ● ground                │  ← Object/group → <g id="ground">
└─────────────────────────────┘
```

### Naming Rules for Illustrator Layers
These names become HTML `id` attributes, so follow these rules:

| Rule | Good | Bad | Why |
|------|------|-----|-----|
| Lowercase + hyphens | `character-body` | `Character Body` | Spaces become underscores, inconsistent |
| No special characters | `sword-glow` | `sword/glow` | Breaks CSS selectors |
| Be specific | `left-eye` | `shape-1` | You need to reference these in code |
| Keep it short | `bg` | `background-texture-layer-main` | IDs should be terse |
| Unique within frame | `eye-left`, `eye-right` | `eye`, `eye` | Duplicate IDs cause bugs |
| Prefix with role | `fx-grain`, `art-body` | `grain`, `body` | Avoids collisions with filter IDs |

### Step 2: Export Settings in Illustrator

**File > Export > Export As... > SVG**

| Setting | Value | Why |
|---------|-------|-----|
| **Styling** | Presentation Attributes | Puts styles as attributes (not `<style>` block). Required for React. |
| **Font** | SVG | Or convert to outlines first. We self-host fonts (GDPR). |
| **Images** | Preserve | Keep embedded rasters (though prefer pure vector). |
| **Object IDs** | **Layer Names** | ⚠️ CRITICAL. Layer names → `id` attributes on `<g>` elements. |
| **Decimal** | 2 | Enough precision for 24×24 icons. |
| **Minify** | No | Keep readable for React conversion. |
| **Responsive** | Yes | Uses `viewBox` not fixed `width`/`height`. |

If using **Export for Screens**: select SVG format, click the gear icon, same settings above. Make sure "Object IDs: Layer Names" is selected.

### Step 3: What the Exported SVG Looks Like

```xml
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <g id="background">
    <g id="sky">
      <rect x="0" y="0" width="24" height="12" fill="#1a1a2e"/>
    </g>
    <g id="ground">
      <rect x="0" y="12" width="24" height="12" fill="#006666"/>
    </g>
  </g>
  <g id="midground">
    <g id="particles">
      <circle cx="5" cy="8" r="0.5" fill="#FF6B6B"/>
    </g>
  </g>
  <g id="foreground">
    <g id="character-body">
      <path d="M12 4 L8 12 L16 12 Z" fill="#FFF8DC"/>
    </g>
    <g id="character-sword">
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" stroke="#20B2AA" fill="none" stroke-width="2"/>
    </g>
  </g>
</svg>
```

### Step 4: Apply Effects to Specific Groups

Apply grain to a **specific group** instead of the whole frame:

```tsx
// Grain ONLY on background, character stays clean
export function WarriorFrame1({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <filter id="vgrain-contrast-1">
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.70" intercept="-0.35"/>
            <feFuncG type="linear" slope="1.70" intercept="-0.35"/>
            <feFuncB type="linear" slope="1.70" intercept="-0.35"/>
          </feComponentTransfer>
        </filter>
      </defs>

      {/* Background WITH grain — filter on this group */}
      <g id="background" filter="url(#vgrain-contrast-1)">
        <g id="sky"><rect x="0" y="0" width="24" height="12" fill="#1a1a2e"/></g>
        <g id="ground"><rect x="0" y="12" width="24" height="12" fill="#006666"/></g>
        {/* Baked grain rects scoped to background only */}
        <g fill="currentColor" pointerEvents="none" aria-hidden="true">
          <rect x="0.42" y="1.30" width="0.65" height="5.20" opacity="0.192"/>
          {/* ... */}
        </g>
      </g>

      {/* Foreground — NO grain */}
      <g id="foreground">
        <g id="character-body"><path d="M12 4 L8 12 L16 12 Z" fill="#FFF8DC"/></g>
        <g id="character-sword"><path d="..." stroke="#20B2AA" fill="none" strokeWidth={2}/></g>
      </g>
    </svg>
  );
}
```

### Telling Claude Code Which Groups Get Effects

Reference groups by their `id`:

> "Apply `imq_svg_grain_01_vertical_normal` only to the `#background` group. Leave `#foreground` clean."

> "Apply `imq_svg_grain_01_optimized` to `#sky` and `imq_svg_grain_01_vertical_optimized` to `#ground`."

Claude Code scopes the grain inside the referenced group.

### Quick Checklist Before Export
- [ ] All layers named with lowercase-hyphen convention
- [ ] No duplicate layer names within the same frame
- [ ] Layers in render order (background at bottom, foreground at top)
- [ ] "Object IDs: Layer Names" selected in SVG export settings
- [ ] "Styling: Presentation Attributes" selected
- [ ] Decimal precision set to 2
- [ ] All text converted to outlines
- [ ] Responsive checked
- [ ] No hidden layers accidentally included
- [ ] Same layer structure across all frames of the same icon

---

## Scroll Illustration Animation — Implementation Notes

This section documents the scroll illustration animation on the sign-in screen and the bugs encountered during implementation.

### Architecture
- Components live in `src/components/scroll-illustration/` with files `scroll-1.tsx` through `scroll-4.tsx` and `index.tsx` (animation wrapper).
- Grain generation utility at `src/lib/generate-grain.ts` produces baked `<rect>` elements at build/render time via `useMemo` — no runtime filter cost.
- The animation wrapper uses a single chained `setTimeout` sequence instead of per-frame `useEffect` re-triggers (fewer renders, fewer timer allocations).

### Animation Sequence
- **Intro (on page load, 300ms total):** scroll4 → scroll2 → scroll1, then idles on scroll1.
- **Exit (on sign-in button press, 300ms total):** scroll1 → scroll3 → scroll4, then fires the sign-in callback.
- **Timing:** First two frame transitions at 75ms each (first half), last frame holds for 150ms (second half).
- The `triggerExit` prop (boolean) starts the exit sequence; `onExitComplete` callback fires after the last frame.

### SVG Alignment — All Frames Must Share the Same viewBox
The SVG source files had different `viewBox` dimensions (e.g., `154x74`, `156x183`, `178x213`). When scaled to fill a container, the same path coordinates mapped to different pixel positions, causing visible jumping between frames.

**Fix:** All frames now use an identical `viewBox="0 0 196.75 220.29"` — the full canvas size. Since all path coordinates share the same origin, they align top-left perfectly. Smaller frames simply have empty space in the canvas. The designer should export all frames with a consistent artboard/viewBox.

### Grain Coverage Bug — `targetElements` Truncation
With `cellSize=2` on a `196x220` viewBox, the generator produces ~10,780 candidate cells. Setting `targetElements=950` called `.slice(0, 950)` on the indices array, which selects cells **sequentially from the top-left** — so only the top ~20% of the canvas received grain. The same issue affected vertical grain with `columnSpacing=1` and `targetElements=850`.

**Fix:** Increased `cellSize` from `2` to `5` and `columnSpacing` from `1` to `8`, then removed `targetElements`. With larger cells/spacing, the natural element count at 41% density covers the full canvas (~700 elements) without truncation — and with fewer total elements than before, improving render performance.

### Grain Scoping — clipPath Required When Both Grain Types Coexist
Each SVG has three named areas: `vgrain-area` (vertical grain), `glow-area` (glowing edges), `grain-area` (regular grain). Without `clipPath`, both grain overlays cover the full canvas and the last-rendered grain type (regular) visually masks the vertical grain in the vgrain-area.

**Fix:** Each grain overlay `<g>` uses a `clipPath` referencing its area's path shape. This scopes vertical grain rects to the vgrain-area and regular grain rects to the grain-area. The clip paths use the same path `d` attributes from the source SVGs. The `feComponentTransfer` contrast filters remain in `<defs>` and are referenced via `filter=url(#...)`.

### React Hooks Order — No Hooks After Early Returns
The `VerificationWall` component has three render branches (loading, verify, sign-in) with early returns. Hooks like `useState` and `useCallback` for the scroll animation were initially placed in the sign-in branch **after** the early returns, causing React's "Rendered more hooks than during the previous render" error.

**Fix:** All hooks must be declared at the top of the component, before any conditional returns. The `exitTriggered` state and `doSignIn` callback are now unconditionally initialized alongside the other hooks.

---

## Future Codes (Reserved — Not Yet Implemented)

| Code | Description | Status |
|------|-------------|--------|
| `imq_svg_animation_v1` | Frame-by-frame SVG animation | ✅ Active |
| `imq_svg_grain_01_normal` | Baked SVG grain (Illustrator I:41 C:71), reaches 15KB | ✅ Active |
| `imq_svg_grain_01_optimized` | Procedural SVG grain filter (Illustrator I:41 C:71), ~400 bytes | ✅ Active |
| `imq_svg_grain_01_vertical_normal` | Baked vertical grain (Illustrator Vertical I:41 C:70), reaches 15KB | ✅ Active |
| `imq_svg_grain_01_vertical_optimized` | Procedural vertical grain filter (Illustrator Vertical I:41 C:70), ~400 bytes | ✅ Active |
| `imq_svg_glow_01_edges_normal` | Glowing Edges filter (Illustrator W:6 B:3 S:9), Laplacian edge detection, ~800 bytes | ✅ Active |
| `imq_svg_glow_01_edges_optimized` | Glowing Edges filter (Illustrator W:6 B:3 S:9), feMorphology edge detection, ~500 bytes | ✅ Active |
| `imq_svg_animation_v2` | Frame-by-frame with scroll-linked progression | 🔜 Planned |
| `imq_shader_hero_v1` | OGL noise displacement hero background | 🔜 Planned |
| `imq_glitch_text_v1` | CSS glitch text with chromatic aberration | 🔜 Planned |
| `imq_skeleton_v1` | Content-matched skeleton loading screen | 🔜 Planned |
| `imq_gradient_border_v1` | Animated gradient border on cards | 🔜 Planned |
| `imq_tab_bounce_v1` | Tab bar icon bounce on tap | 🔜 Planned |

When implementing a 🔜 code, Claude Code should refer to VISUAL-EFFECTS-CLAUDE.md for the canonical pattern, then register the code in this file with full spec. **Always add a matching entry to the Quick Reference table at the top of this file.**

---

## Rules for Claude Code

1. **When you see an IMQ code in a prompt, implement EXACTLY the spec in this file.** No creative interpretation.
2. **Always generate placeholder frames** if the user hasn't provided SVG artwork. Use the geometric placeholders above. Add a `{/* TODO: Replace paths */}` comment.
3. **Never skip the `prefers-reduced-motion` media query.** First frame must always show as static fallback.
4. **Always export a static version** alongside the animated one (`IconStatic` from `frame-1`).
5. **Use `visibility: hidden/visible`**, not `opacity: 0/1`, for frame toggling. Both are compositor-only but visibility avoids alpha blending cost on stacked layers.
6. **`ANIM_ID` must be globally unique.** Use format `imq-{icon-name}`.
7. **Base frame count is 4.** User can request more but never fewer.
8. **Grain filter IDs must be globally unique.** Formats: `grain-contrast-{seed}` (regular normal), `imq-grain-opt-{seed}` (regular optimized), `vgrain-contrast-{seed}` (vertical normal), `imq-vgrain-opt-{seed}` (vertical optimized). Never reuse across frames or icons.
9. **Glow filter IDs must be globally unique.** Formats: `imq-glow-edges-{frameIndex}` (normal), `imq-glow-edges-opt-{frameIndex}` (optimized). Use frame index (1, 2, 3), not PRNG seeds — glow is deterministic.
10. **Grain codes are composable with `imq_svg_animation_v1`.** Grain goes INSIDE frame components, never on the animation wrapper.
11. **Glow codes WRAP artwork, grain codes SIT ON TOP.** Glow: `<g filter="glow">artwork</g>`. Grain: `artwork` then `<g>grain rects</g>`. When combining: `<g filter="glow">artwork</g>` then `<g>grain</g>`.
12. **When applying grain to existing frames, do NOT modify artwork paths.** Only add `<defs>` + filter and the grain group/rect after all existing content.
13. **When applying glow to existing frames, WRAP the artwork paths** in a `<g filter="url(#...)">` group. Do not add glow as a sibling element after artwork.
14. **When the user specifies a group ID target** (e.g., "apply grain to `#background` only"), scope the grain elements/filter inside that `<g>` instead of at root `<svg>` level. For glow, wrap that specific `<g>` with the filter attribute.
15. **Preserve Illustrator layer names as `id` attributes** when converting exported SVGs to React components. Do not rename or remove them.
16. **When adding a new IMQ code, always update three places:** (a) the full spec section, (b) the Quick Reference table at the top, (c) the Future Codes status table.
