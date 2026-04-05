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
