# VISUAL-EFFECTS-CLAUDE.md — Visual Effects, Mobile WebGL & Ethical UX for Joust Fork

> **Purpose.** This project memory instructs Claude Code on visual effects implementation, mobile WebGL rendering in webviews, ethical prediction market UX, and the centralized config architecture that ties everything together. Drop this alongside the existing `CLAUDE.md`. Treat both as authoritative.

---

## 0) Architecture Overview — What Already Exists

### Current Stack (DO NOT CHANGE these)
- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind v4** + **shadcn/ui** (Radix primitives) + **class-variance-authority**
- **wagmi v2** + **viem** + **RainbowKit** (Abstract chain, switching to World Chain)
- **Prisma** + Neon DB, **Inngest** for background jobs
- **Sentry**, **Vercel Analytics/Speed Insights**
- Fonts: Jacquard 24 (serif/display), JejuGothic (sans, local), Fira Code (mono)
- **Zustand** for state (add if not present — centralized config store)

### Current Visual Effects (build on top of these)
- `src/components/splash-background.tsx` — SVG feTurbulence noise overlays (2 layers), gradient overlays, castle SVG. **Replace castle with OGL hero scene.**
- `src/components/background.tsx` — Same noise filters without castle. Inner pages. **Keep as-is.**
- Dark theme (`class="dark"`) with HSL color system in `globals.css`
- Route groups: `(castleBg)` for home/discover/leaderboard, `(normalBg)` for everything else

### Performance Budget
- **Initial JS target:** ≤100KB for animation layer
- **OGL** (~14KB gzipped) for WebGL. **NEVER Three.js** (170KB) in initial bundle.
- **Motion/LazyMotion** (4.6KB initial) for React animations
- **LCP:** ≤2.5s, **INP:** ≤200ms, **CLS:** ≤0.1
- All WebGL behind `dynamic(() => import(...), { ssr: false })`

### Target Runtime: Mobile Webviews
- **iOS:** WKWebView (WebGL via ANGLE → Metal translation)
- **Android:** Chromium WebView (GPU runs in-process, no crash isolation)
- **World App** wraps these webviews as Mini App host
- No browser back button — app controls all navigation
- `requestAnimationFrame` pauses when webview is backgrounded

---

## 1) Ethical UX — This Is a Forecasting Platform, Not a Casino

### ⚠️ THIS SECTION IS NON-NEGOTIABLE. Every UI decision must pass these filters.

This app is a **prediction market / information marketplace**. World's hackathon prizes explicitly disqualify gambling. The UX must signal knowledge and analysis, never excitement and risk. Apply these rules to every component, animation, and interaction.

### Language Rules — Enforced Everywhere in UI Copy
| ❌ NEVER use | ✅ ALWAYS use |
|--------------|---------------|
| Bet / Wager | Forecast / Position |
| Gamble | Predict / Assess |
| Cash out | Close position / Realize |
| Odds | Probability / Likelihood |
| Game / Play | Question / Market |
| Bankroll | Balance / Portfolio |
| Lucky / Hot streak | Well-calibrated / Accurate |
| Losing streak | Calibration opportunity |
| All in | Maximum position |
| Win / Lose | Correct / Incorrect resolution |

### Animation Ethics — What Is Prohibited
- **NO celebratory animations on trades or resolutions.** No confetti, no particle bursts, no screen flash. Use a calm checkmark or subtle status change only.
- **NO positive animation framing when user's net position is negative.** "Losses disguised as wins" are the strongest predictor of problem gambling behavior.
- **NO countdown timers creating urgency** ("Market closing in 10 minutes!").
- **NO red/green flashing** for probability movements. Use muted, slow color shifts.
- **NO "near miss" displays** showing how close a prediction was.
- **NO push notifications targeting post-loss moments.**
- **NO anchoring deposit suggestions high** — default to the minimum.
- **NO premium currency that obscures real value.**

### What MUST Ship as Default Features
- **Session timer** — non-intrusive clock icon in header, always visible
- **Net position indicator** — shows session profit/loss transparently
- **Deposit limit setting** — prompted on first deposit. Decreases take effect immediately; increases require 24-hour cooling period
- **Self-exclusion** — accessible from profile in ≤3 taps. Options: 24h, 7d, 30d, permanent
- **Calibration review** — after 3+ consecutive incorrect resolutions: "Your recent predictions show a pattern — want to review your calibration before your next forecast?"
- **Withdrawal as easy as deposit** — same number of steps, same friction

### Color Psychology for Trust
| Element | Recommended | Avoid |
|---------|-------------|-------|
| Primary brand | Navy blue, deep blue | Red, gold, neon |
| Positive states | Muted sage/teal | Bright neon green on dark |
| Negative states | Warm amber, muted orange | Alarming red |
| Background | Light mode as default option | Dark-only (Robinhood effect) |
| Charts | Blue/gray, subtle gradients | Red/green flashing |
| Probability bars | Single-hue fill, muted | Multi-color excitement |

### Chart Design — Information, Not Excitement
- **Single-hue area charts** with muted blue gradient fill at 10% opacity
- **Fixed 0-100% Y-axis** (probability always has known bounds — never auto-scale)
- **No gridlines on mobile** — single dotted horizontal reference at 50%
- **Touch-hold crosshair** for value inspection, horizontal pan for time
- Use `--chart-probability: oklch(0.55 0.08 240)` not vivid red/green

---

## 2) Three-Tier Progressive Enhancement

### Tier 1: CSS-Only Effects (0KB JS, always loads)
Foundation for ALL users, ALL devices. Hardware-accelerated via `transform`, `opacity`, `filter`, `clip-path`.

**Noise/grain overlays** — Already in `background.tsx` and `splash-background.tsx` via SVG feTurbulence. Keep as-is.

**Glitch text:**
```css
.glitch-text {
  position: relative;
}
.glitch-text::before,
.glitch-text::after {
  content: attr(data-glitch);
  position: absolute;
  inset: 0;
}
.glitch-text::before {
  color: hsl(var(--accent));
  animation: glitch-1 0.3s infinite;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
}
.glitch-text::after {
  color: hsl(var(--ring));
  animation: glitch-2 0.3s infinite;
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
}
@keyframes glitch-1 {
  0% { transform: translate(0); }
  20% { transform: translate(-3px, 2px); }
  40% { transform: translate(3px, -1px); }
  60% { transform: translate(-2px, 1px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}
```

**Gradient text** — `background-clip: text` with brand colors.

**Animated borders** — CSS `@property` for animatable gradients on card borders.

**Scroll-driven animations** — `animation-timeline: view()` behind `@supports` with Motion as fallback.

**Skeleton screens** — CSS `animate-pulse` shimmer at 1.5s cycle. Match exact card structure:
```tsx
function MarketCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex justify-between">
        <div className="h-5 w-16 rounded-md bg-muted animate-pulse" />
        <div className="h-5 w-20 rounded-md bg-muted animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-muted animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
      </div>
      <div className="h-8 w-full rounded-full bg-muted animate-pulse" />
      <div className="flex gap-2">
        <div className="h-11 flex-1 rounded-lg bg-muted animate-pulse" />
        <div className="h-11 flex-1 rounded-lg bg-muted animate-pulse" />
      </div>
    </div>
  );
}
```

### Tier 2: Lightweight JS (loads on interaction)
**Motion (Framer Motion v12+)** — Use `LazyMotion` + `m` components:
```tsx
// src/lib/motion.ts
import { LazyMotion } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () => import("motion/dom-animation").then(res => res.default);
export { LazyMotion, m, loadFeatures };
```

**Animation priority levels** — never mix CSS transitions and Motion on the same property:

| Level | Type | System | Duration | Disableable? |
|-------|------|--------|----------|-------------|
| 1 | Critical UI feedback (hover, active) | CSS transitions | 150ms | No |
| 2 | Structural transitions (enter/exit) | Motion AnimatePresence | 250ms | Reduced motion only |
| 3 | Data decoration (scroll reveals) | Motion variants | 400ms | Yes (config flag) |
| 4 | Ambient WebGL (hero shader) | requestAnimationFrame | Continuous | Yes (quality tier) |

**Stagger pattern for lists:**
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring", visualDuration: 0.3, bounce: 0.15 },
  },
};
```

**SVG animated icons** — CSS `stroke-dasharray` draw-in. 0KB JS:
```tsx
export function SwordIcon({ animate = true, delay = 0, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <style>{`
        @keyframes draw-in {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .draw-path {
          stroke-dasharray: 100;
          stroke-dashoffset: ${animate ? 100 : 0};
          animation: ${animate ? `draw-in 0.8s ease-out ${delay}s forwards` : "none"};
        }
      `}</style>
      <path className="draw-path" d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path className="draw-path" d="M13 19l6-6" />
      <path className="draw-path" d="M16 16l4 4" />
    </svg>
  );
}
```

### Tier 3: WebGL (capable devices only, only when visible)
**OGL** (~14KB gzipped). Load via `dynamic()` with `ssr: false`. Full implementation in Section 4.

---

## 3) File Structure

```
src/
├── components/
│   ├── effects/                        # All visual effects
│   │   ├── hero-scene.tsx              # OGL hero (client, lazy-loaded)
│   │   ├── hero-fallback.tsx           # CSS-only fallback for low-end / reduced motion
│   │   ├── glitch-text.tsx             # CSS glitch text component
│   │   ├── gradient-text.tsx           # CSS gradient text component
│   │   └── animated-border.tsx         # CSS animated border card wrapper
│   ├── ui/
│   │   ├── animated-icon.tsx           # SVG animated icon wrapper
│   │   ├── market-card.tsx             # Market card with ethical design
│   │   ├── market-card-skeleton.tsx    # Content-matched skeleton
│   │   ├── probability-bar.tsx         # Single-hue probability fill
│   │   ├── session-timer.tsx           # Non-intrusive session clock
│   │   ├── calibration-badge.tsx       # Forecaster accuracy badge
│   │   └── ... (existing shadcn components)
│   ├── dev/
│   │   └── dev-panel.tsx               # Development control panel (dev only)
│   ├── splash-background.tsx           # MODIFY — replace castle with OGL hero
│   └── background.tsx                  # KEEP — inner page noise background
├── lib/
│   ├── app-config.ts                   # Zustand config store (single source of truth)
│   ├── device-capability.ts            # GPU tier detection
│   ├── adaptive-quality.ts             # Frame-rate monitoring + DPR stepping
│   ├── motion.ts                       # LazyMotion setup
│   └── shaders/                        # GLSL shader strings
│       ├── noise-distortion.glsl
│       ├── liquid-wave.glsl
│       └── common.glsl                 # Shared noise functions, precision header
└── hooks/
    ├── use-app-config.ts               # Config store hook with CSS sync
    ├── use-device-tier.ts              # Device capability hook
    ├── use-intersection-load.ts        # IntersectionObserver lazy load
    └── use-webgl-lifecycle.ts          # Visibility, context loss, cleanup
```

---

## 4) Mobile WebGL — OGL Hardening for Webviews

### iOS WKWebView Specifics
- WebGL runs through **ANGLE → Metal** translation pipeline. Adds overhead.
- **Dynamic sampler array indexing** (`texture(uSamplers[i], uv)` with non-constant `i`) drops to ~13 FPS on Metal. Use texture atlases or if/else chains.
- **Frequent index buffer updates** trigger readback for validation — create larger, more static buffers.
- Memory pressure system: at 50% of device heap = cache purging; at 65% = JIT code destroyed; at 100% = process killed (silent tab crash). **Stay under 50% of device limit.**
- iOS `overscroll-behavior: none` is NOT supported — use `touch-action: none` on canvas instead.

### Android WebView Specifics
- GPU runs **in-process** with the host app. A WebGL crash can take down World App entirely.
- Chrome/WebView **clamps max texture size to 4096** regardless of what hardware reports.
- Qualcomm Adreno drivers have documented 500ms+ stalls on some draw calls.
- `webglcontextlost` may fire but recovery is unreliable on many devices.

### OGL Mobile Renderer Pattern
```tsx
// src/components/effects/hero-scene.tsx
"use client";
import { useEffect, useRef, useCallback } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useAppConfig } from "@/lib/app-config";

// Precision-safe header for all shaders
const PRECISION_HEADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
`;

const vertex = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragment = PRECISION_HEADER + `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uSpeed;
  uniform float uIntensity;
  
  // Pre-compute UVs in varying to avoid dependent texture reads on mobile
  varying vec2 vUv;
  
  // Keep ALU instructions under 100-200 for low-end mobile GPUs
  void main() {
    vec2 uv = vUv;
    
    // Simple noise displacement (mediump-safe, no overflow)
    mediump float wave = sin(uv.x * 6.2832 + uTime * uSpeed) * 0.5 + 0.5;
    mediump float noise = sin(uv.y * 12.566 + uTime * uSpeed * 0.7) * uIntensity * 0.02;
    uv.x += noise;
    
    // Brand color gradient
    vec3 dark = vec3(0.075, 0.082, 0.09);
    vec3 accent = vec3(0.0, 0.35, 0.35);
    vec3 color = mix(dark, accent, smoothstep(0.2, 0.8, uv.y + wave * 0.1));
    
    // Subtle vignette
    mediump float vig = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5) * 1.8);
    color *= vig;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const rendererRef = useRef<Renderer | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Renderer with mobile-safe defaults ---
    const renderer = new Renderer({
      canvas,
      dpr: Math.min(window.devicePixelRatio, 2), // Cap at 2x
      alpha: true,
      antialias: false,           // MSAA too expensive on mobile
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;

    // --- Context loss handling (OGL has no built-in recovery) ---
    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(rafRef.current);
    };
    const onContextRestored = () => {
      // Must rebuild everything — all GL state is gone
      setupScene();
      startLoop();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    // --- Resize ---
    const resize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      if (program) {
        program.uniforms.uResolution.value = [
          gl.canvas.width,
          gl.canvas.height,
        ];
      }
    };

    // --- Scene setup ---
    let program: Program;
    let mesh: Mesh;

    function setupScene() {
      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [gl.canvas.width, gl.canvas.height] },
          uSpeed: { value: 1.0 },
          uIntensity: { value: 0.8 },
        },
      });
      mesh = new Mesh(gl, { geometry, program });
      resize();
    }

    // --- Animation loop with 30fps throttle & visibility pause ---
    let lastFrame = 0;
    const FRAME_INTERVAL = 1000 / 30; // 30fps for decorative effect

    function tick(t: number) {
      rafRef.current = requestAnimationFrame(tick);

      // Skip frames for 30fps throttle
      if (t - lastFrame < FRAME_INTERVAL) return;
      lastFrame = t;

      // Read config outside React (no re-render)
      const { shader } = useAppConfig.getState();
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uSpeed.value = shader.speed;
      program.uniforms.uIntensity.value = shader.intensity;

      renderer.render({ scene: mesh });
    }

    function startLoop() {
      rafRef.current = requestAnimationFrame(tick);
    }

    // --- Visibility API: pause when hidden ---
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // --- Init ---
    setupScene();
    startLoop();
    window.addEventListener("resize", resize);

    // --- Cleanup: dispose EVERYTHING ---
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      // OGL cleanup
      mesh?.geometry?.remove();
      program?.remove();
      renderer?.gl?.getExtension("WEBGL_lose_context")?.loseContext();
      rendererRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ touchAction: "none" }} // Prevent scroll conflicts in webview
    />
  );
}
```

### Splash Background with Tier Gating
```tsx
// src/components/splash-background.tsx — MODIFIED
"use client";
import dynamic from "next/dynamic";
import { useDeviceTier } from "@/hooks/use-device-tier";

const HeroScene = dynamic(() => import("@/components/effects/hero-scene"), {
  ssr: false,
  loading: () => null, // CSS layers already visible — no flash
});

export default function SplashBackground() {
  const tier = useDeviceTier();

  return (
    <div className="fixed inset-0 -z-10 min-h-screen w-full overflow-hidden">
      {/* SVG noise filters — keep existing */}
      <svg className="pointer-events-none absolute h-0 w-0">
        <defs>
          <filter id="noise1" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence baseFrequency="0.29 0.32" numOctaves="1" result="noise" seed="11" stitchTiles="stitch" />
            <feColorMatrix in="noise" type="saturate" values="0" result="monoNoise" />
            <feComponentTransfer in="monoNoise" result="noise">
              <feFuncA type="discrete" tableValues="0.4" />
            </feComponentTransfer>
            <feColorMatrix in="noise" type="matrix" values="1 1 1 0 0  1 1 1 0 0  1 1 1 0 0  0 0 0 1 0" />
          </filter>
          <filter id="noise2" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence baseFrequency="0.14 0.18" numOctaves="1" result="noise" seed="37" stitchTiles="stitch" />
            <feColorMatrix in="noise" type="saturate" values="0" result="monoNoise" />
            <feComponentTransfer in="monoNoise" result="noise">
              <feFuncA type="discrete" tableValues="0.3" />
            </feComponentTransfer>
            <feColorMatrix in="noise" type="matrix" values="1 1 1 0 0  1 1 1 0 0  1 1 1 0 0  0 0 0 1 0" />
          </filter>
        </defs>
      </svg>

      {/* Instant-paint CSS layers — visible before any JS loads */}
      <div className="absolute inset-0 bg-[#131516]" />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(188.28deg, rgba(41,48,57,0.49) 6.35%, rgba(113,113,113,0.49) 51.06%)"
      }} />

      {/* OGL scene — fades in on top of CSS layers, only on capable devices */}
      {tier !== "low" && <HeroScene />}

      {/* Noise overlays — always render (CSS-only, cheap) */}
      <div className="pointer-events-none absolute inset-0"
        style={{ filter: "url(#noise1)", mixBlendMode: "overlay", opacity: 0.8 }} />
      <div className="pointer-events-none absolute inset-0"
        style={{ filter: "url(#noise2)", mixBlendMode: "multiply", opacity: 0.6 }} />

      {/* Dark scrim */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
```

---

## 5) Centralized Config Store — Single Source of Truth

All visual parameters, animation timings, shader uniforms, feature flags, and quality settings flow from one Zustand store. This drives CSS custom properties, Motion variants, and OGL uniforms simultaneously.

```typescript
// src/lib/app-config.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AppConfig {
  theme: {
    primary: string;
    background: string;
    chartProbability: string;
    chartUp: string;    // Muted sage, NOT neon green
    chartDown: string;  // Warm amber, NOT alarming red
  };
  animation: {
    duration: number;   // ms — base duration for Motion transitions
    stagger: number;    // ms — delay between staggered items
    enabled: boolean;   // false = skip all non-critical animations
  };
  shader: {
    speed: number;      // time multiplier (1.0 = normal)
    intensity: number;  // displacement strength (0-1)
    noiseScale: number; // noise frequency
  };
  quality: {
    tier: "full" | "reduced" | "minimal" | "static";
    dpr: number;        // pixel ratio cap
    targetFps: number;  // 30 for decorative, 60 for interactive
  };
  features: {
    webgl: boolean;
    haptics: boolean;
    animations: boolean;
    particles: boolean;
    sessionTimer: boolean;   // ALWAYS true in production
    calibrationReview: boolean; // ALWAYS true in production
  };
}

const defaults: AppConfig = {
  theme: {
    primary: "oklch(0.55 0.15 250)",
    background: "oklch(0.08 0.02 260)",
    chartProbability: "oklch(0.55 0.08 240)",
    chartUp: "oklch(0.6 0.12 160)",     // Muted teal-green
    chartDown: "oklch(0.6 0.12 25)",    // Warm amber
  },
  animation: { duration: 250, stagger: 50, enabled: true },
  shader: { speed: 1, intensity: 0.8, noiseScale: 2.5 },
  quality: { tier: "full", dpr: 2, targetFps: 30 },
  features: {
    webgl: true, haptics: true, animations: true, particles: true,
    sessionTimer: true, calibrationReview: true,
  },
};

type ConfigStore = AppConfig & {
  update: (path: string, value: unknown) => void;
  reset: () => void;
};

export const useAppConfig = create<ConfigStore>()(
  persist(
    (set) => ({
      ...defaults,
      update: (path, value) =>
        set((state) => {
          const keys = path.split(".");
          const next = structuredClone(state);
          let obj: Record<string, unknown> = next as unknown as Record<string, unknown>;
          for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]] as Record<string, unknown>;
          obj[keys[keys.length - 1]] = value;
          return next;
        }),
      reset: () => set(defaults),
    }),
    { name: "app-config-v1" }
  )
);
```

### CSS Sync Hook — Bridges Config → Tailwind
```typescript
// src/hooks/use-app-config.ts
"use client";
import { useEffect } from "react";
import { useAppConfig } from "@/lib/app-config";

export function useCSSConfigSync() {
  const theme = useAppConfig((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--color-primary", theme.primary);
    root.setProperty("--color-chart-probability", theme.chartProbability);
    root.setProperty("--color-chart-up", theme.chartUp);
    root.setProperty("--color-chart-down", theme.chartDown);
  }, [theme]);
}

export function useMotionVariants() {
  const anim = useAppConfig((s) => s.animation);
  return {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: anim.enabled ? anim.duration / 1000 : 0 },
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: anim.stagger / 1000, delayChildren: 0.1 },
      },
    },
  };
}
```

### OGL Reads Config Outside React (no re-renders)
```typescript
// Inside rAF callback — never triggers React reconciliation
const { shader } = useAppConfig.getState();
program.uniforms.uSpeed.value = shader.speed;
program.uniforms.uIntensity.value = shader.intensity;
```

---

## 6) Device Capability & Adaptive Quality

### GPU Tier Detection
```typescript
// src/lib/device-capability.ts
export type DeviceTier = "high" | "medium" | "low";

export function getDeviceTier(gl?: WebGLRenderingContext | WebGL2RenderingContext): DeviceTier {
  if (typeof window === "undefined") return "low";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "low";

  const cores = navigator.hardwareConcurrency ?? 2;
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 2;

  // GPU renderer string detection
  if (gl) {
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      if (/Adreno \(TM\) [6-7]\d\d|Mali-G[7-9]\d|Apple GPU/i.test(renderer)) return "high";
      if (/Adreno \(TM\) [3-5]|Mali-G[5-6]|PowerVR/i.test(renderer)) return "medium";
    }
  }

  if (cores >= 8 && memory >= 8) return "high";
  if (cores >= 4 && memory >= 4) return "medium";
  return "low";
}
```

### Adaptive Frame Rate Stepping
```typescript
// src/lib/adaptive-quality.ts
export class AdaptiveQuality {
  private targetFrameTime: number;
  private frameTimes: number[] = [];
  public currentDPR: number;
  private cooldown = 0;

  constructor(targetFPS = 30) {
    this.targetFrameTime = 1000 / targetFPS;
    this.currentDPR = Math.min(devicePixelRatio, 2);
  }

  update(dt: number): boolean {
    this.frameTimes.push(dt);
    if (this.frameTimes.length > 30) this.frameTimes.shift();
    if (this.cooldown-- > 0 || this.frameTimes.length < 30) return false;

    const avg = this.frameTimes.reduce((a, b) => a + b) / 30;
    let changed = false;

    if (avg > this.targetFrameTime * 1.2 && this.currentDPR > 0.75) {
      this.currentDPR -= 0.25; // Drop aggressively
      this.cooldown = 60;
      changed = true;
    } else if (avg < this.targetFrameTime * 0.8 && this.currentDPR < 2) {
      this.currentDPR += 0.125; // Raise gradually (hysteresis)
      this.cooldown = 90;
      changed = true;
    }
    return changed;
  }
}
```

### WebGL Lifecycle Hook
```typescript
// src/hooks/use-webgl-lifecycle.ts
"use client";
import { useEffect, useRef, useCallback } from "react";

export function useWebGLLifecycle(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const rafRef = useRef<number>(0);
  const isActiveRef = useRef(true);

  // Visibility pause
  useEffect(() => {
    const handler = () => {
      isActiveRef.current = !document.hidden;
      if (document.hidden) cancelAnimationFrame(rafRef.current);
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  // Context loss handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(rafRef.current);
      isActiveRef.current = false;
    };
    const onRestored = () => {
      isActiveRef.current = true;
      // Caller must rebuild GL state
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);
    return () => {
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, [canvasRef]);

  return { rafRef, isActiveRef };
}
```

---

## 7) Shader Rules for Mobile GPUs

### Precision
- **Colors, normals, simple UVs:** `mediump` (16-bit half-float, 2x ALU throughput on mobile)
- **Positions, depth, time accumulators:** `highp` always
- Always include precision header with fallback (see hero-scene.tsx above)

### Avoid These on Mobile
- **Dependent texture reads** — compute UVs in vertex shader, pass as varyings
- **Dynamic sampler array indexing** — `texture(uSamplers[i], uv)` tanks Metal to ~13 FPS
- **Deep branching on per-pixel values** — all warp lanes execute both paths
- **More than 100-200 ALU instructions** in fragment shader for low-end devices
- **`discard`** — breaks early-Z on tile-based mobile GPUs

### Memory Limits
- **Textures:** 2048×2048 max for safety (4096 technically supported but risky)
- **Total texture memory:** ≤30MB (leaves headroom under WKWebView 50% pressure threshold)
- Use **ASTC** compressed textures on iOS, **ETC2** on Android
- **Max 1 WebGL context** per page. Dispose on unmount.
- Track memory via `gl.getExtension('GMAN_webgl_memory')` if available

---

## 8) Market Card Design — Information Hierarchy

Mobile touch targets ≥44px (Apple HIG). Tap card body → full-page push. YES/NO buttons are the primary actions.

```
┌─────────────────────────────────┐
│ [Category]           [2d left]  │
│                                 │
│ Will X happen by Y?             │  ← 2-line max, truncate
│                                 │
│ ████████░░░  73% YES            │  ← Single-hue fill, muted
│ [sparkline ~~~~~~~~]            │  ← 40-60px tall, no axes
│                                 │
│ $1.2M vol  ·  1,234 forecasters │  ← "forecasters" not "bettors"
│                                 │
│ [YES $0.73]        [NO $0.27]   │  ← 44px min height
└─────────────────────────────────┘
```

Probability bar: single-hue gradient fill (use `--chart-probability`), NOT red/green. Sparkline: ~5% opacity fill, muted line, no decoration.

---

## 9) Navigation in Webview

No browser back button exists. Implement stack-based SPA routing:

```tsx
// Bottom tab bar: 3-5 items, always visible, fixed position
// Full-page push transitions for detail views
// Bottom sheet/drawer for quick actions (position confirmation, filters)
// Save critical state to localStorage incrementally — webview may be killed without warning
```

Avoid placing interactive elements within 20-30px of screen edges (iOS edge-swipe conflict). Add `overscroll-behavior: none` on body (Android). On canvas: `style={{ touchAction: "none" }}`.

---

## 10) Dev Panel — Real-Time Control During Development

```tsx
// src/components/dev/dev-panel.tsx
"use client";
import { useAppConfig } from "@/lib/app-config";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch"; // Add if not in shadcn setup
import { Button } from "@/components/ui/button";

export function DevPanel() {
  const config = useAppConfig();
  if (process.env.NODE_ENV === "production") return null;

  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-4 right-4 z-50 rounded-full bg-primary text-primary-foreground w-10 h-10 text-sm font-mono">
        ⚙
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] overflow-y-auto space-y-6 pt-8">
        <h3 className="font-semibold text-sm">Shader</h3>
        <label className="text-xs text-muted-foreground">Speed: {config.shader.speed.toFixed(1)}</label>
        <Slider min={0} max={5} step={0.1}
          value={[config.shader.speed]}
          onValueChange={([v]) => config.update("shader.speed", v)} />
        <label className="text-xs text-muted-foreground">Intensity: {config.shader.intensity.toFixed(2)}</label>
        <Slider min={0} max={1} step={0.01}
          value={[config.shader.intensity]}
          onValueChange={([v]) => config.update("shader.intensity", v)} />

        <h3 className="font-semibold text-sm">Animation</h3>
        <label className="text-xs text-muted-foreground">Duration: {config.animation.duration}ms</label>
        <Slider min={50} max={800} step={25}
          value={[config.animation.duration]}
          onValueChange={([v]) => config.update("animation.duration", v)} />

        <h3 className="font-semibold text-sm">Quality</h3>
        <label className="text-xs text-muted-foreground">DPR Cap: {config.quality.dpr.toFixed(2)}</label>
        <Slider min={0.5} max={3} step={0.25}
          value={[config.quality.dpr]}
          onValueChange={([v]) => config.update("quality.dpr", v)} />

        <h3 className="font-semibold text-sm">Features</h3>
        {(Object.entries(config.features) as [string, boolean][]).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-xs font-mono">{key}</span>
            <Switch checked={val}
              onCheckedChange={(v) => config.update(`features.${key}`, v)} />
          </div>
        ))}

        <div className="flex gap-2 pt-4">
          <Button size="sm" variant="outline" onClick={() =>
            navigator.clipboard.writeText(JSON.stringify(useAppConfig.getState(), null, 2))
          }>
            Copy JSON
          </Button>
          <Button size="sm" variant="destructive" onClick={config.reset}>
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

Add Eruda for webview debugging:
```tsx
// In root layout or providers, dev only
useEffect(() => {
  if (process.env.NODE_ENV === "development") {
    import("eruda").then((m) => m.default.init());
  }
}, []);
```

---

## 11) next.config.mjs Additions

```js
// Add to nextConfig.experimental:
experimental: {
  optimizePackageImports: ["motion/react", "ogl", "lucide-react"],
  // existing swcPlugins...
},

// Add webpack config:
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.optimization.splitChunks.cacheGroups = {
      ...config.optimization.splitChunks.cacheGroups,
      webgl: {
        priority: 30,
        name: "webgl",
        test: /[\\/]node_modules[\\/](ogl|three)[\\/]/,
        chunks: "async",
      },
    };
  }
  config.module.rules.push({
    test: /\.glsl$/,
    type: "asset/source",
  });
  return config;
},
```

---

## 12) Packages to Install

```bash
# Animation (Tier 2)
pnpm add motion                    # LazyMotion: 4.6KB initial, 15KB async

# WebGL (Tier 3)
pnpm add ogl                      # 14KB gzipped, tree-shakeable

# Config store
pnpm add zustand                  # 1.5KB, centralized state

# Dev tools (dev only)
pnpm add -D eruda                 # Mobile console for webview debugging
```

**DO NOT install:** three (170KB), lottie-web (60KB), pixi.js (200KB+), curtains.js (122KB), gsap (use Motion in React), @react-three/fiber (pulls all of Three.js).

---

## 13) Performance Rules — NON-NEGOTIABLE

1. **NEVER import OGL/Three.js at top level.** Always `dynamic()` + `ssr: false`.
2. **Cap pixel ratio at 2x** (saves 56% pixels vs 3x devices with minimal quality loss).
3. **Stop rAF when `document.hidden`.** Webview suspends JS execution on iOS anyway.
4. **Set explicit dimensions on all WebGL containers.** Prevents CLS.
5. **Dispose WebGL contexts on unmount.** One context per page max.
6. **Handle `webglcontextlost` and `webglcontextrestored`.** OGL has no built-in recovery.
7. **Throttle decorative WebGL to 30fps.** Frame-skip in rAF callback.
8. **Respect `prefers-reduced-motion`.** Return CSS-only fallback, zero animation. Frame-by-frame shows static first frame.
9. **Keep fragment shaders under 100-200 ALU instructions.** Test on real devices.
10. **Stay under 30MB texture memory.** Prevents WKWebView memory pressure escalation.
11. **Use `mediump` for colors/normals, `highp` for positions/time.** Real perf difference on mobile ALUs.
12. **No dependent texture reads.** Pre-compute UVs in vertex shader, pass as varyings.
13. **canvas { touch-action: none }** — prevent scroll/gesture conflicts with host app.
14. **Test in World App webview via ngrok.** WKWebView and Android WebView differ from desktop browsers.
15. **Frame-by-frame SVG: use `visibility` toggle, not `opacity`.** Both are compositor-only but `visibility` avoids alpha blending cost on stacked frames.

---

## 14) Frame-by-Frame SVG Animation System

### Overview
Frame-by-frame animation uses **CSS `steps()` timing** to cycle through discrete SVG frames — like a flipbook. This is the approach for all animated icons, button feedback, background scroll decorations, and any motion that needs hand-crafted character. **0KB JavaScript. Pure compositor. Works in every webview.**

The system is referenced via IMQ vibe codes (see `IMQ_VIBE_CODE_REFERENCE.md`). When you see `imq_svg_animation_v1` in a prompt, implement this pattern.

### How It Works
Each animation is a stack of SVG frames (minimum 4) layered with `position: absolute`. A CSS `@keyframes` rule with `steps(N)` toggles `opacity` between frames at exact intervals. Only `opacity` is animated — fully GPU-composited, no layout/paint cost.

### Core Component: `FrameAnimation`
```tsx
// src/components/effects/frame-animation.tsx
"use client";
import { type ReactNode, type CSSProperties } from "react";

interface FrameAnimationProps {
  frames: ReactNode[];          // Array of SVG elements (min 4)
  duration?: number;            // Total cycle time in ms (default: 800)
  loop?: boolean;               // Loop infinitely (default: true)
  paused?: boolean;             // Respect reduced motion / config flag
  className?: string;           // Container sizing
  trigger?: "auto" | "hover" | "click" | "inview";  // When to play
}

export function FrameAnimation({
  frames,
  duration = 800,
  loop = true,
  paused = false,
  className = "size-6",
  trigger = "auto",
}: FrameAnimationProps) {
  const frameCount = frames.length;
  const frameDuration = duration / frameCount;

  // Generate unique animation name from frame count + duration
  const animName = `frame-cycle-${frameCount}-${duration}`;

  // Build keyframes: each frame gets an equal slice of the timeline
  // Frame 0 visible at 0%, frame 1 at 25%, frame 2 at 50%, etc. (for 4 frames)
  const keyframeSteps = frames.map((_, i) => {
    const start = (i / frameCount) * 100;
    const end = ((i + 1) / frameCount) * 100;
    return `${start}% { opacity: 1; } ${start + 0.01}% { opacity: 1; } ${end}% { opacity: 0; }`;
  });

  const triggerClass =
    trigger === "hover" ? "group-hover:[animation-play-state:running] [animation-play-state:paused]" :
    trigger === "click" ? "group-active:[animation-play-state:running] [animation-play-state:paused]" :
    "";

  return (
    <div
      className={`relative ${className} ${trigger === "hover" || trigger === "click" ? "group" : ""}`}
      role="img"
    >
      <style>{`
        @keyframes ${animName} {
          ${frames.map((_, i) => {
            const pct = (i / frameCount) * 100;
            return `${pct}%, ${pct + (100 / frameCount) - 0.01}% { visibility: visible; }`;
          }).join("\n          ")}
        }
        @media (prefers-reduced-motion: reduce) {
          .frame-anim-item { animation: none !important; }
        }
      `}</style>

      {frames.map((frame, i) => (
        <div
          key={i}
          className={`absolute inset-0 frame-anim-item ${triggerClass}`}
          style={{
            visibility: i === 0 ? "visible" : "hidden",
            animation: paused ? "none" : `${animName} ${duration}ms steps(1) ${loop ? "infinite" : "forwards"}`,
            animationDelay: `${-duration + (i * frameDuration)}ms`,
          } as CSSProperties}
        >
          {frame}
        </div>
      ))}
    </div>
  );
}
```

### Simpler Pure-CSS Approach (No Component Needed)
For static sets of SVGs where you know the frames at build time, skip the component entirely:

```css
/* 4-frame animation at 200ms per frame = 800ms total */
.frame-anim {
  position: relative;
}
.frame-anim > * {
  position: absolute;
  inset: 0;
  visibility: hidden;
}
.frame-anim > :nth-child(1) { animation: show4 800ms steps(1) infinite; animation-delay: 0ms; }
.frame-anim > :nth-child(2) { animation: show4 800ms steps(1) infinite; animation-delay: -600ms; }
.frame-anim > :nth-child(3) { animation: show4 800ms steps(1) infinite; animation-delay: -400ms; }
.frame-anim > :nth-child(4) { animation: show4 800ms steps(1) infinite; animation-delay: -200ms; }

@keyframes show4 {
  0%, 24.99%  { visibility: visible; }
  25%, 100%   { visibility: hidden; }
}
```

```tsx
// Usage — just drop SVGs in a container
<div className="frame-anim size-6">
  <SwordFrame1 />
  <SwordFrame2 />
  <SwordFrame3 />
  <SwordFrame4 />
</div>
```

### Tab Bar Integration
```tsx
// In your bottom tab bar — frame animation plays on tap
<button onClick={() => navigate("/home")} className="flex flex-col items-center gap-1">
  <FrameAnimation
    frames={[<HomeFrame1 />, <HomeFrame2 />, <HomeFrame3 />, <HomeFrame4 />]}
    duration={600}
    loop={false}
    trigger="click"
    className="size-6"
  />
  <span className="text-xs">Home</span>
</button>
```

### Background Scroll Decoration
For scroll-linked frame animations (e.g., a character walking as you scroll):
```tsx
"use client";
import { useScroll, useTransform } from "motion/react";

export function ScrollFrameAnimation({ frames }: { frames: ReactNode[] }) {
  const { scrollYProgress } = useScroll();
  // Map scroll 0-1 to frame index 0-(N-1)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frames.length - 1], {
    clamp: true,
  });

  return (
    <div className="relative size-12">
      {frames.map((frame, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: useTransform(frameIndex, (v) => Math.abs(v - i) < 0.5 ? 1 : 0),
          }}
        >
          {frame}
        </motion.div>
      ))}
    </div>
  );
}
```

### SVG Frame Design Rules
1. **All frames must share identical `viewBox`** — same dimensions, same coordinate space
2. **Minimum 4 frames** for any animation (base amount). 6-8 frames for smooth motion. 12+ for character animation
3. **Export as inline SVG components**, not `.svg` files — avoids network requests, enables CSS styling
4. **Use `currentColor`** for strokes/fills so frames inherit the parent's text color and work with dark/light themes
5. **Keep paths simple** — under 20 anchor points per frame for mobile rendering
6. **Name frames sequentially**: `IconFrame1`, `IconFrame2`, `IconFrame3`, `IconFrame4`
7. **Design at 24×24** for icons, 48×48 for decorative, 96×96 for hero elements
8. **No embedded raster images** in SVG frames — vector only

### Performance: Why Frame-by-Frame Beats Path Morphing
| Approach | Pipeline | Mobile Cost | Webview Safe? |
|----------|----------|-------------|---------------|
| `visibility` toggle (this system) | Composite only | **Near zero** | ✅ All |
| `opacity` toggle | Composite only | **Near zero** | ✅ All |
| CSS `d: path()` morph | Layout+Paint | Medium | ❌ No Safari/WKWebView |
| JS `d` attribute animation | Layout+Paint | High | ⚠️ Expensive |
| Lottie/dotLottie | Canvas render | Medium | ✅ But 50KB+ |

Frame-by-frame with `visibility`/`opacity` is the **only SVG animation approach that is both 0KB JS and fully GPU-composited** across all webviews.

---

## 15) Quick Reference — Component Map

| Visual Effect | Component | Tier | Size | Ethical? |
|---------------|-----------|------|------|----------|
| Noise/grain overlay | `background.tsx` (existing) | CSS | 0KB | ✅ |
| Glitch text | `effects/glitch-text.tsx` | CSS | 0KB | ✅ |
| Gradient text | `effects/gradient-text.tsx` | CSS | 0KB | ✅ |
| Animated borders | `effects/animated-border.tsx` | CSS | 0KB | ✅ |
| Icon draw-in | `ui/animated-icon.tsx` | CSS+SVG | 0KB | ✅ |
| **Frame-by-frame icon** | **`effects/frame-animation.tsx`** | **CSS+SVG** | **0KB** | ✅ |
| **Tab bar icon anim** | **`effects/frame-animation.tsx`** | **CSS+SVG** | **0KB** | ✅ |
| **Scroll frame anim** | **`effects/frame-animation.tsx` + Motion** | **JS** | **4.6KB** | ✅ |
| Skeleton screens | `ui/market-card-skeleton.tsx` | CSS | 0KB | ✅ |
| Page transitions | Motion `AnimatePresence` | JS | 4.6KB | ✅ |
| Scroll reveals | Motion `whileInView` | JS | 4.6KB | ✅ |
| List stagger | Motion staggerChildren | JS | 4.6KB | ✅ |
| Button press feedback | CSS `:active` scale | CSS | 0KB | ✅ |
| Hero shader | `effects/hero-scene.tsx` (OGL) | WebGL | 14KB async | ✅ |
| Confetti/celebration | — | — | — | ❌ PROHIBITED |
| Red/green flashing | — | — | — | ❌ PROHIBITED |
| Countdown urgency | — | — | — | ❌ PROHIBITED |
| Win/loss animations | — | — | — | ❌ PROHIBITED |

---

## 16) IMQ Vibe Code System

This codebase uses **IMQ vibe codes** as shorthand references for visual effect patterns. When a prompt contains an IMQ code, Claude Code implements the exact pattern defined in `IMQ_VIBE_CODE_REFERENCE.md`. See that file for the full registry.

**Currently registered codes:**
- `imq_svg_animation_v1` — Frame-by-frame SVG animation (Section 14 of this file)

Drop `IMQ_VIBE_CODE_REFERENCE.md` alongside this file in the repo root.
