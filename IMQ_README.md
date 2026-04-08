# IMQ Visual Effects System — Implementation Guide

Everything in this doc was added on branch `imq-02`. This is your reference for using, wiring up, and extending the visual effects layer.

---

## Quick Start — Wiring Into the App

None of the new components are auto-wired into the app yet. Here's how to plug them in.

### 1. Add SplashBackground to your layout

`SplashBackground` replaces the old castle background with a WebGL shader + noise layers. Add it to your root layout or a route group layout:

```tsx
// src/app/layout.tsx (or a route group layout)
import SplashBackground from "@/components/splash-background";

// Inside the <body> tag, before {children}:
<SplashBackground />
{children}
```

It auto-detects device capability — low-end devices get CSS-only layers, medium/high devices get the OGL WebGL shader on top.

### 2. Add the DevPanel for real-time controls

The DevPanel gives you sliders for shader speed, intensity, animation duration, DPR, and feature toggles. It only renders in development.

```tsx
// src/app/layout.tsx (or src/components/providers.tsx)
import { DevPanel } from "@/components/dev/dev-panel";

// Render it anywhere inside the provider tree:
<DevPanel />
```

A gear icon appears at bottom-right. Click it to open the control sheet.

### 3. Hook up CSS config sync (optional)

If you want the Zustand config store to push theme values to CSS custom properties:

```tsx
// Inside a client component that mounts once (e.g. providers.tsx)
import { useCSSConfigSync } from "@/hooks/use-app-config";

function Providers({ children }) {
  useCSSConfigSync(); // Syncs theme colors to CSS vars
  return <>{children}</>;
}
```

---

## File Map

```
src/
├── lib/
│   ├── app-config.ts          # Zustand store — single source of truth for all visual config
│   ├── device-capability.ts   # GPU tier detection (high / medium / low)
│   ├── adaptive-quality.ts    # Runtime frame-rate monitor, auto-adjusts DPR
│   └── motion.ts              # LazyMotion + m components re-export
│
├── hooks/
│   ├── use-app-config.ts      # useCSSConfigSync() + useMotionVariants()
│   ├── use-device-tier.ts     # Returns "high" | "medium" | "low"
│   └── use-webgl-lifecycle.ts # Visibility pause + context loss for any WebGL canvas
│
├── components/
│   ├── splash-background.tsx  # Full-screen background (noise + OGL hero, tier-gated)
│   ├── effects/
│   │   ├── hero-scene.tsx     # OGL WebGL shader (30fps, mobile-safe)
│   │   ├── hero-fallback.tsx  # CSS-only fallback for low-end devices
│   │   ├── glitch-text.tsx    # CSS glitch text effect
│   │   ├── gradient-text.tsx  # CSS gradient text effect
│   │   ├── animated-border.tsx # Animated conic-gradient card border
│   │   └── frame-animation.tsx # Frame-by-frame SVG flipbook (0KB JS)
│   ├── ui/
│   │   ├── animated-icon.tsx  # SVG draw-in SwordIcon
│   │   └── market-card-skeleton.tsx # Skeleton loader matching card layout
│   └── dev/
│       └── dev-panel.tsx      # Dev-only control panel for all config
```

---

## Component Usage

### GlitchText

Pure CSS glitch effect. No JS cost.

```tsx
import { GlitchText } from "@/components/effects/glitch-text";

<GlitchText text="Joust" className="text-3xl font-bold" />
```

The `data-glitch` attribute is set automatically. The CSS keyframes are in `globals.css`. Respects `prefers-reduced-motion`.

### GradientText

Gradient-filled text using `background-clip: text`.

```tsx
import { GradientText } from "@/components/effects/gradient-text";

<GradientText className="text-2xl font-bold">
  Prediction Markets
</GradientText>

// Custom colors:
<GradientText from="#00A519" to="#0095FF">
  Custom gradient
</GradientText>
```

### AnimatedBorder

Wraps any content in a spinning conic-gradient border.

```tsx
import { AnimatedBorder } from "@/components/effects/animated-border";

<AnimatedBorder>
  <div className="p-4">
    <h3>Featured Market</h3>
    <p>Will X happen by Y?</p>
  </div>
</AnimatedBorder>
```

### FrameAnimation

Frame-by-frame SVG flipbook. Pass an array of React nodes (SVG frames). Zero JS animation cost — pure CSS `visibility` toggling.

```tsx
import { FrameAnimation } from "@/components/effects/frame-animation";

// Auto-playing loop (default)
<FrameAnimation
  frames={[<Frame1 />, <Frame2 />, <Frame3 />, <Frame4 />]}
  duration={800}
  className="size-8"
/>

// Play on hover
<FrameAnimation
  frames={[<Frame1 />, <Frame2 />, <Frame3 />, <Frame4 />]}
  trigger="hover"
  className="size-6"
/>

// Play once on click
<FrameAnimation
  frames={[<Frame1 />, <Frame2 />, <Frame3 />, <Frame4 />]}
  trigger="click"
  loop={false}
  className="size-6"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `frames` | `ReactNode[]` | required | Array of SVG frame elements (min 4) |
| `duration` | `number` | `800` | Total cycle time in ms |
| `loop` | `boolean` | `true` | Loop infinitely |
| `paused` | `boolean` | `false` | Pause animation |
| `className` | `string` | `"size-6"` | Container sizing |
| `trigger` | `"auto" \| "hover" \| "click" \| "inview"` | `"auto"` | When to play |

For simple static 4-frame sets, you can skip the component entirely and use the CSS class:

```tsx
<div className="frame-anim size-6">
  <SwordFrame1 />
  <SwordFrame2 />
  <SwordFrame3 />
  <SwordFrame4 />
</div>
```

The `.frame-anim` CSS is in `globals.css`.

### SwordIcon (Animated SVG Draw-in)

SVG icon that draws itself in with `stroke-dasharray` animation. 0KB JS.

```tsx
import { SwordIcon } from "@/components/ui/animated-icon";

<SwordIcon className="w-6 h-6" />              // Animated
<SwordIcon animate={false} className="w-6 h-6" /> // Static
<SwordIcon delay={0.3} className="w-6 h-6" />    // Delayed start
```

### MarketCardSkeleton

Drop-in skeleton loader that matches the market card layout. Use while data is loading.

```tsx
import { MarketCardSkeleton } from "@/components/ui/market-card-skeleton";

{isLoading ? <MarketCardSkeleton /> : <MarketCard data={pool} />}
```

---

## Config Store (Zustand)

All visual parameters live in one Zustand store at `src/lib/app-config.ts`. Everything reads from here — the WebGL shader, CSS custom properties, animation timings, feature flags.

### Reading config in components

```tsx
import { useAppConfig } from "@/lib/app-config";

function MyComponent() {
  const animEnabled = useAppConfig((s) => s.features.animations);
  const duration = useAppConfig((s) => s.animation.duration);
  // ...
}
```

### Reading config outside React (e.g. in a rAF loop)

```ts
// No re-renders — reads snapshot directly
const { shader } = useAppConfig.getState();
program.uniforms.uSpeed.value = shader.speed;
```

### Updating config

```ts
const config = useAppConfig();
config.update("shader.speed", 2.0);
config.update("features.webgl", false);
config.reset(); // Back to defaults
```

### Config structure

```
theme:     { primary, background, chartProbability, chartUp, chartDown }
animation: { duration (ms), stagger (ms), enabled (bool) }
shader:    { speed, intensity, noiseScale }
quality:   { tier, dpr, targetFps }
features:  { webgl, haptics, animations, particles, sessionTimer, calibrationReview }
```

Config is persisted to `localStorage` under key `app-config-v1`.

---

## Device Tier Detection

The system auto-detects GPU capability and returns `"high"`, `"medium"`, or `"low"`.

```tsx
import { useDeviceTier } from "@/hooks/use-device-tier";

function MyComponent() {
  const tier = useDeviceTier();

  if (tier === "low") return <CSSOnlyVersion />;
  return <FancyWebGLVersion />;
}
```

Detection uses: `prefers-reduced-motion`, `navigator.hardwareConcurrency`, `navigator.deviceMemory`, and GPU renderer string from `WEBGL_debug_renderer_info`.

---

## WebGL Lifecycle Hook

For any custom WebGL canvas, use this hook to handle visibility pausing and context loss:

```tsx
import { useWebGLLifecycle } from "@/hooks/use-webgl-lifecycle";

function MyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { rafRef, isActiveRef } = useWebGLLifecycle(canvasRef);

  useEffect(() => {
    function tick() {
      if (!isActiveRef.current) return;
      rafRef.current = requestAnimationFrame(tick);
      // ... render
    }
    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} style={{ touchAction: "none" }} />;
}
```

---

## Adaptive Quality

For long-running WebGL scenes, use `AdaptiveQuality` to auto-step DPR based on frame times:

```ts
import { AdaptiveQuality } from "@/lib/adaptive-quality";

const aq = new AdaptiveQuality(30); // Target 30fps

function tick(t: number) {
  const dt = t - lastFrame;
  if (aq.update(dt)) {
    renderer.dpr = aq.currentDPR; // DPR changed, resize
    renderer.setSize(width, height);
  }
  // ... render
}
```

It drops DPR aggressively when frames are slow, raises gradually when there's headroom.

---

## Motion (Framer Motion / LazyMotion)

Use `LazyMotion` + `m` components for React animations with minimal bundle impact:

```tsx
import { LazyMotion, m, loadFeatures } from "@/lib/motion";

function AnimatedList({ items }) {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {items.map(item => (
          <m.div key={item.id} initial={{ y: 20 }} animate={{ y: 0 }}>
            {item.name}
          </m.div>
        ))}
      </m.div>
    </LazyMotion>
  );
}
```

For config-driven variants:

```tsx
import { useMotionVariants } from "@/hooks/use-app-config";

function MyComponent() {
  const { fadeIn, staggerContainer } = useMotionVariants();
  // Use fadeIn.initial, fadeIn.animate, fadeIn.transition
  // Or staggerContainer.hidden / staggerContainer.visible
}
```

---

## CSS Effects (globals.css)

Two CSS animation systems are available globally without any imports:

### Glitch text
Used by the `<GlitchText>` component, but you can also apply manually:

```html
<span class="glitch-text" data-glitch="Your text">Your text</span>
```

### Frame animation (4 frames)
For static 4-frame flipbook animations:

```html
<div class="frame-anim size-6">
  <!-- Exactly 4 children -->
  <svg>...</svg>
  <svg>...</svg>
  <svg>...</svg>
  <svg>...</svg>
</div>
```

Both respect `prefers-reduced-motion: reduce` automatically.

---

## next.config.ts Changes

Two additions were made:

1. **`optimizePackageImports`** — Tree-shakes `motion/react`, `ogl`, and `lucide-react`
2. **Webpack GLSL loader** — You can import `.glsl` files directly as strings:

```ts
import fragmentShader from "@/lib/shaders/my-shader.glsl";
```

Note: The webpack config shows a Turbopack warning since the project uses `--turbopack`. The config still works for production builds. If you want to suppress the warning, the Turbopack equivalent would need a separate `turbo` config key in `next.config.ts`.

---

## SVG Frame Design Rules (for creating new frame animations)

1. All frames must share identical `viewBox` — same dimensions, same coordinate space
2. Minimum 4 frames for any animation. 6-8 for smooth motion. 12+ for character animation
3. Export as inline SVG components, not `.svg` files
4. Use `currentColor` for strokes/fills so frames work with themes
5. Keep paths simple — under 20 anchor points per frame
6. Name frames sequentially: `IconFrame1`, `IconFrame2`, `IconFrame3`, `IconFrame4`
7. Design at 24x24 for icons, 48x48 for decorative, 96x96 for hero elements
8. No embedded raster images in SVG frames — vector only

---

## Ethical UX Reminders

These rules from `VISUAL-EFFECTS-CLAUDE.md` apply to everything you build:

- **NO celebratory animations** on trades or resolutions (no confetti, no particle bursts)
- **NO red/green flashing** for probability movements — use muted, slow color shifts
- **NO countdown timers** creating urgency
- **NO "near miss" displays**
- Use "Forecast" not "Bet", "Position" not "Wager", "Probability" not "Odds"
- Charts: single-hue area fills, fixed 0-100% Y-axis, muted blue palette
- Probability bars: single-hue gradient fill using `--chart-probability`, never red/green

---

## Packages Added

| Package | Size | Purpose |
|---------|------|---------|
| `motion` | ~4.6KB initial | LazyMotion for React animations |
| `ogl` | ~14KB gzipped | WebGL rendering (replaces Three.js) |
| `zustand` | ~1.5KB | Centralized config store |
| `eruda` (dev) | dev only | Mobile console for webview debugging |
