"use client";
import { useEffect, useRef } from "react";

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
