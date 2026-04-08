"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ScrollWide1 } from "./scroll-wide-1";
import { ScrollWide2 } from "./scroll-wide-2";
import { ScrollWide3 } from "./scroll-wide-3";
import { ScrollWide4 } from "./scroll-wide-4";

// Mirrors the verification-wall ScrollAnimation lifecycle but uses the wide
// frame variants. Intro: scroll4 → scroll2 → scroll1, idles on scroll1.
// Exit:  scroll1 → scroll3 → scroll4, ends on scroll4.

const FRAME_TIMINGS = [75, 75, 150];

type Phase = "intro" | "idle" | "exit" | "done";

const INTRO_FRAMES = [ScrollWide4, ScrollWide2, ScrollWide1];
const EXIT_FRAMES = [ScrollWide1, ScrollWide3, ScrollWide4];

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
  // While waiting on the intro delay, render nothing so the closed scroll
  // doesn't pop in before opening.
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

  const frames = phase === "exit" ? EXIT_FRAMES : INTRO_FRAMES;
  const Frame =
    phase === "idle"
      ? ScrollWide1
      : phase === "done"
        ? ScrollWide4
        : frames[frameIndex];

  return (
    <div
      className={className}
      style={style}
      role="presentation"
      aria-hidden="true"
    >
      <Frame className="w-full h-full" preserveAspectRatio={preserveAspectRatio} />
    </div>
  );
}
