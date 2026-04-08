"use client";

import { useMemo } from "react";
import {
  generateGrainData,
  generateVerticalGrainData,
} from "@/lib/generate-grain";

// scroll illustration4.svg — viewBox 0 0 196.75 220.29
// Grain seed: 41, Vertical grain seed: 43

export function Scroll4({ className }: { className?: string }) {
  const grain = useMemo(
    () =>
      generateGrainData({
        seed: 41,
        viewBoxWidth: 196.75,
        viewBoxHeight: 220.29,
        cellSize: 5,
        density: 0.41,
        contrast: 0.71,
      }),
    []
  );

  const vgrain = useMemo(
    () =>
      generateVerticalGrainData({
        seed: 43,
        viewBoxWidth: 196.75,
        viewBoxHeight: 220.29,
        columnSpacing: 8,
        density: 0.41,
        contrast: 0.7,
      }),
    []
  );

  return (
    <svg
      viewBox="0 0 196.75 220.29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <filter id="imq-glow-edges-s4" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feConvolveMatrix in="SourceGraphic" order={3} kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" divisor={1} bias={0} edgeMode="none" preserveAlpha="true" result="edges" />
          <feMorphology operator="dilate" radius="1.3" in="edges" result="thickEdges" />
          <feComponentTransfer in="thickEdges" result="brightEdges">
            <feFuncR type="linear" slope="1.30" intercept="0.02" />
            <feFuncG type="linear" slope="1.30" intercept="0.02" />
            <feFuncB type="linear" slope="1.30" intercept="0.02" />
          </feComponentTransfer>
          <feGaussianBlur in="brightEdges" stdDeviation="2.4" result="glowBlur" />
          <feMerge result="glow"><feMergeNode in="glowBlur" /><feMergeNode in="brightEdges" /></feMerge>
          <feBlend mode="screen" in="glow" in2="SourceGraphic" result="glowOnSource" />
          <feComposite operator="in" in="glowOnSource" in2="SourceGraphic" />
        </filter>
        <filter id={grain.filterId}>
          <feComponentTransfer>
            <feFuncR type="linear" slope={grain.slope} intercept={grain.intercept} />
            <feFuncG type="linear" slope={grain.slope} intercept={grain.intercept} />
            <feFuncB type="linear" slope={grain.slope} intercept={grain.intercept} />
          </feComponentTransfer>
        </filter>
        <filter id={vgrain.filterId}>
          <feComponentTransfer>
            <feFuncR type="linear" slope={vgrain.slope} intercept={vgrain.intercept} />
            <feFuncG type="linear" slope={vgrain.slope} intercept={vgrain.intercept} />
            <feFuncB type="linear" slope={vgrain.slope} intercept={vgrain.intercept} />
          </feComponentTransfer>
        </filter>
        <clipPath id="clip-vgrain-s4">
          <path d="M144.04,57.53c1.01-17.97,3.11-50.46,5.51-52.68,1.38-1.28,2.15-.99,2.15-.99.49.2.85.77.91,1.72.17,2.55-1.76,8.01-3.29,10.97-4.31,8.32-8.91,3.42-9.23,3.07,2.33.48,3.27-.78,3.7-1.95.87-2.39.02-5.41,1.03-8.27.8-2.28,2.26-2.95,2.99-2.93,2.85.07,2.37,10.81,2.33,11.58,4.38-.6,8.76-1.2,13.13-1.8,3.49,2.66,6.98,5.32,10.47,7.98-1.56.65-3.48,1.31-5.63,1.69-9.38,1.68-15.55-3.22-15.43-3.68.12-.45,6.42,1.78,27.65,10.66-.45,1.83-1.12,4.64-1.94,8.07h0c-1.88,4.75-3.76,9.51-5.65,14.26" />
        </clipPath>
        <clipPath id="clip-grain-s4">
          <path d="M34.57,47.73c.81-.4,8.58-4.07,14.29-.5,1.94,1.21,3.42,3.12,3.77,3.58,1.85,2.45,2.61,4.92,2.9,6.15.1.42.16.72.17.76.42,2.07,12.11,5.15,50.09,9.91,11.26-1.7,22.53-3.39,33.79-5.09-3.94-1.38-7.88-2.75-11.82-4.13,13.13-.87,26.26-1.74,39.39-2.61,2.35-4.66,6.44-14.38,5.38-26.13-.11-1.26-.75-7.67-4.31-14.78-.29-.58-3.89-7.68-5.68-7.13-1.03.32-.3,2.82-1.54,6.92-1.6,5.28-4.34,6.13-3.84,8.46.29,1.38,1.62,2.77,10.76,5.77,4.94,1.62,9.18,2.72,12.3,3.46-14.53-2.12-30.33-3.77-47.27-4.61-27.59-1.36-52.66-.29-74.56,1.92.55-12.39-3.55-21.14-8.46-21.94-4.89-.79-12.04,6.08-11.15,10.79.39,2.07,2.28,3.42,5,5.38,5.11,3.68,7.67,3.04,9.22,5,4.35,5.47-4.67,24.12-11.72,23.53-4.37-.37-8.39-8.16-7.88-15.07.6-8.11,7.24-12.53,8.07-13.07" />
        </clipPath>
      </defs>

      <path d="M144.04,57.53c1.01-17.97,3.11-50.46,5.51-52.68,1.38-1.28,2.15-.99,2.15-.99.49.2.85.77.91,1.72.17,2.55-1.76,8.01-3.29,10.97-4.31,8.32-8.91,3.42-9.23,3.07,2.33.48,3.27-.78,3.7-1.95.87-2.39.02-5.41,1.03-8.27.8-2.28,2.26-2.95,2.99-2.93,2.85.07,2.37,10.81,2.33,11.58,4.38-.6,8.76-1.2,13.13-1.8,3.49,2.66,6.98,5.32,10.47,7.98-1.56.65-3.48,1.31-5.63,1.69-9.38,1.68-15.55-3.22-15.43-3.68.12-.45,6.42,1.78,27.65,10.66-.45,1.83-1.12,4.64-1.94,8.07h0c-1.88,4.75-3.76,9.51-5.65,14.26" fill="#010101" stroke="#4c53a4" strokeMiterlimit={10} />
      <g clipPath="url(#clip-vgrain-s4)" filter={`url(#${vgrain.filterId})`} pointerEvents="none" aria-hidden="true">
        <g fill="#010101">
          {vgrain.rects.map((r, i) => (<rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} opacity={r.opacity} />))}
        </g>
      </g>

      <g filter="url(#imq-glow-edges-s4)">
        <path d="M28.58,47.73c.81-.4,8.58-4.07,14.29-.5,1.94,1.21,3.42,3.12,3.77,3.58,0,0,2.22,2.93,3.07,6.92,2.27,10.55-3.65,7.07,8.46,17.7,2.27,1.99,7.35,2.01,9.22,0,2.22-2.38.44-8-1.92-11.15-6.63-8.86-23.07-5.26-24.21-5,6.98.07,8.8,1.48,9.22,2.69.86,2.46-3.62,5.13-2.69,8.07.74,2.34,4.44,3.31,6.53,3.46,8.18.58,14.1-9.71,14.52-10.45,12.07,1.56,24.14,3.12,36.22,4.68,11.76-1.73,23.51-3.46,35.27-5.19-1.27-.31-2.83-.68-4.62-1.05-6.94-1.43-10.26-1.46-10.28-1.83-.03-.59,8.41-1.71,35.74-3.86,0,0,6.28-13.72,5.38-26.13-.51-7.08-2.69-11.54-4.31-14.78-.29-.58-3.89-7.68-5.68-7.13-1.03.32-.3,2.82-1.54,6.92-1.6,5.28-4.34,6.13-3.84,8.46.29,1.38,1.62,2.77,10.76,5.77,4.94,1.62,9.18,2.72,12.3,3.46-14.53-2.12-30.33-3.77-47.27-4.61-27.59-1.36-52.66-.29-74.56,1.92.55-12.39-3.55-21.14-8.46-21.94-4.89-.79-12.04,6.08-11.15,10.79.39,2.07,2.28,3.42,5,5.38,5.11,3.68,7.67,3.04,9.22,5,4.35,5.47-4.67,24.12-11.72,23.53-4.37-.37-8.39-8.16-7.88-15.07.6-8.11,7.24-12.53,8.07-13.07" fill="none" stroke="#4c53a4" strokeMiterlimit={10} />
      </g>

      <path d="M34.57,47.73c.81-.4,8.58-4.07,14.29-.5,1.94,1.21,3.42,3.12,3.77,3.58,1.85,2.45,2.61,4.92,2.9,6.15.1.42.16.72.17.76.42,2.07,12.11,5.15,50.09,9.91,11.26-1.7,22.53-3.39,33.79-5.09-3.94-1.38-7.88-2.75-11.82-4.13,13.13-.87,26.26-1.74,39.39-2.61,2.35-4.66,6.44-14.38,5.38-26.13-.11-1.26-.75-7.67-4.31-14.78-.29-.58-3.89-7.68-5.68-7.13-1.03.32-.3,2.82-1.54,6.92-1.6,5.28-4.34,6.13-3.84,8.46.29,1.38,1.62,2.77,10.76,5.77,4.94,1.62,9.18,2.72,12.3,3.46-14.53-2.12-30.33-3.77-47.27-4.61-27.59-1.36-52.66-.29-74.56,1.92.55-12.39-3.55-21.14-8.46-21.94-4.89-.79-12.04,6.08-11.15,10.79.39,2.07,2.28,3.42,5,5.38,5.11,3.68,7.67,3.04,9.22,5,4.35,5.47-4.67,24.12-11.72,23.53-4.37-.37-8.39-8.16-7.88-15.07.6-8.11,7.24-12.53,8.07-13.07" fill="#4c53a4" stroke="#010101" strokeMiterlimit={10} />
      <g clipPath="url(#clip-grain-s4)" filter={`url(#${grain.filterId})`} pointerEvents="none" aria-hidden="true">
        <g fill="#010101">
          {grain.rects.map((r, i) => (<rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} opacity={r.opacity} />))}
        </g>
      </g>
    </svg>
  );
}
