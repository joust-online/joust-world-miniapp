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
