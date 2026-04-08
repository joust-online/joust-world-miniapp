"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ScrollWide1 } from "./scroll-wide-1";
import { ScrollWide2 } from "./scroll-wide-2";
import { ScrollWide3 } from "./scroll-wide-3";
import { ScrollWide4 } from "./scroll-wide-4";

// Mirrors the verification-wall ScrollAnimation lifecycle but uses the wide
// frame variants. Intro: scroll4 → scroll2 → scroll1, idles on scroll1.
// Exit:  scroll1 → scroll3 → scroll4, ends on scroll4.
//
// All four frame components are mounted once and stacked absolutely; we toggle
// which one is visible via opacity. This keeps each frame's expensive grain
// generation memoized for the lifetime of the component instead of being
// recomputed on every frame swap.

const FRAME_TIMINGS = [75, 75, 150];

type Phase = "intro" | "idle" | "exit" | "done";

// Stable indices into the [ScrollWide1, ScrollWide2, ScrollWide3, ScrollWide4] array
const INTRO_INDICES = [3, 1, 0]; // scroll4 → scroll2 → scroll1
const EXIT_INDICES = [0, 2, 3]; // scroll1 → scroll3 → scroll4

const FRAMES = [ScrollWide1, ScrollWide2, ScrollWide3, ScrollWide4] as const;

interface ScrollWideAnimationProps {
  className?: string;
  style?: React.CSSProperties;
  triggerExit?: boolean;
  onExitComplete?: () => void;
  /** Stagger the intro by N ms (used to cascade cards on a list page). */
  delay?: number;
  /** SVG preserveAspectRatio — defaults to "none" so the bbox matches the parent box exactly. */
  preserveAspectRatio?: string;
}

export function ScrollWideAnimation({
  className = "",
  style,
  triggerExit = false,
  onExitComplete,
  delay = 0,
  preserveAspectRatio = "none",
}: ScrollWideAnimationProps) {
  // While waiting on the intro delay, render frame 4 (closed) so the scroll
  // doesn't flash open before the delay elapses.
  const [phase, setPhase] = useState<Phase>(delay > 0 ? "done" : "intro");
  const [frameIndex, setFrameIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onExitCompleteRef = useRef(onExitComplete);
  onExitCompleteRef.current = onExitComplete;

  const runSequence = useCallback((currentPhase: "intro" | "exit") => {
    let frame = 0;
    setFrameIndex(0);

    const advance = () => {
      if (frame < 2) {
        timerRef.current = setTimeout(() => {
          frame++;
          setFrameIndex(frame);
          advance();
        }, FRAME_TIMINGS[frame]);
      } else {
        timerRef.current = setTimeout(() => {
          if (currentPhase === "intro") {
            setPhase("idle");
          } else {
            setPhase("done");
            onExitCompleteRef.current?.();
          }
        }, FRAME_TIMINGS[2]);
      }
    };

    advance();
  }, []);

  // Start intro on mount (after optional delay)
  useEffect(() => {
    if (delay > 0) {
      const t = setTimeout(() => {
        setPhase("intro");
        runSequence("intro");
      }, delay);
      return () => {
        clearTimeout(t);
        clearTimeout(timerRef.current);
      };
    }
    runSequence("intro");
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Trigger exit when triggerExit flips
  useEffect(() => {
    if (triggerExit && phase === "idle") {
      setPhase("exit");
      setFrameIndex(0);
      runSequence("exit");
    }
    return () => clearTimeout(timerRef.current);
  }, [triggerExit, phase, runSequence]);

  // Resolve which of the 4 mounted frames should be visible right now.
  let activeIdx: number;
  if (phase === "idle") {
    activeIdx = 0; // ScrollWide1
  } else if (phase === "done") {
    activeIdx = 3; // ScrollWide4
  } else if (phase === "exit") {
    activeIdx = EXIT_INDICES[frameIndex];
  } else {
    activeIdx = INTRO_INDICES[frameIndex];
  }

  // Internal style is merged so user-provided values win on conflict.
  const mergedStyle: React.CSSProperties = { ...style };

  return (
    <div
      className={className}
      style={mergedStyle}
      role="presentation"
      aria-hidden="true"
    >
      <div className="relative h-full w-full">
        {FRAMES.map((Frame, i) => (
          <div
            key={i}
            className="absolute inset-0 h-full w-full"
            style={{ opacity: i === activeIdx ? 1 : 0 }}
          >
            <Frame className="h-full w-full" preserveAspectRatio={preserveAspectRatio} />
          </div>
        ))}
      </div>
    </div>
  );
}
