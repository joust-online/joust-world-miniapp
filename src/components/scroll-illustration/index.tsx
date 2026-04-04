"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Scroll1 } from "./scroll-1";
import { Scroll2 } from "./scroll-2";
import { Scroll3 } from "./scroll-3";
import { Scroll4 } from "./scroll-4";

// Intro sequence: scroll4 → scroll2 → scroll1 (plays on mount, then idles on scroll1)
// Exit sequence:  scroll1 → scroll3 → scroll4 (triggered by triggerExit prop)
//
// Total animation: 300ms
// Frame 1→2: 75ms  (first half split between two frames)
// Frame 2→3: 75ms
// Frame 3 holds: 150ms before transitioning to idle/done

// Timing per frame index: [0]=75ms, [1]=75ms, [2]=150ms
const FRAME_TIMINGS = [75, 75, 150];

type Phase = "intro" | "idle" | "exit" | "done";

interface ScrollAnimationProps {
  className?: string;
  triggerExit?: boolean;
  onExitComplete?: () => void;
}

// Intro frames: scroll4 → scroll2 → scroll1
const INTRO_FRAMES = [Scroll4, Scroll2, Scroll1];
// Exit frames: scroll1 → scroll3 → scroll4
const EXIT_FRAMES = [Scroll1, Scroll3, Scroll4];

export function ScrollAnimation({
  className = "",
  triggerExit = false,
  onExitComplete,
}: ScrollAnimationProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [frameIndex, setFrameIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onExitCompleteRef = useRef(onExitComplete);
  onExitCompleteRef.current = onExitComplete;

  // Single effect drives the entire sequence via a chained timeout
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
        // Hold last frame, then transition
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

  // Start intro on mount
  useEffect(() => {
    runSequence("intro");
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start exit when triggerExit flips
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
      ? Scroll1
      : phase === "done"
        ? Scroll4
        : frames[frameIndex];

  return (
    <div
      className={className}
      role="img"
      aria-label="Scroll illustration animation"
    >
      <div style={{ transform: "scaleX(1.5675) scaleY(1.406) rotate(-7.5deg)", transformOrigin: "center center", marginBottom: "20%" }}>
        <Frame className="w-full h-auto" />
      </div>
    </div>
  );
}

export { type ScrollAnimationProps };
