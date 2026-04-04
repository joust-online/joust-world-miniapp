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
      <div className="absolute inset-0 bg-[#0f121c]" />
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
