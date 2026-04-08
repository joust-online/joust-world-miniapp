"use client";
import { useState, useEffect } from "react";
import { getDeviceTier, type DeviceTier } from "@/lib/device-capability";

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("low");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");
    setTier(getDeviceTier(gl ?? undefined));
  }, []);

  return tier;
}
