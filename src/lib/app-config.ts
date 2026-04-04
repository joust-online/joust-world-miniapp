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
