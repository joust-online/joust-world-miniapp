"use client";

import { useMemo } from "react";
import {
  generateGrainData,
  generateVerticalGrainData,
} from "@/lib/generate-grain";

// scroll1_wide.svg — viewBox 0 0 633.07 246.01 (idle/rest frame, wide)

const VB_W = 633.07;
const VB_H = 246.01;

const VGRAIN_PATH =
  "M440.38,171.6c1.36.46,15.04,4.74,36.96,1.64,7.44-1.05,15.04-2.84,16.8-3.27,10.88-2.62,17.84-5.3,21.36-6.66,12.16-4.7,34.32-15.69,58.88-30.27,8.65-8.78,11.19-23.9,13.94-42.57,6.82-46.36,9.11-74.91,13.38-80.33,1.27-1.61,2.92-1.43,3.06.73.17,2.55-1.76,8.01-3.29,10.97-4.31,8.32-8.91,3.42-9.23,3.07,2.33.48,3.27-.78,3.7-1.95.87-2.39.02-5.41,1.03-8.27.8-2.28,2.26-2.95,2.99-2.93,2.85.07,2.37,10.81,2.33,11.58,4.38-.6,8.76-1.2,13.13-1.8l10.47,7.98c-1.56.65-3.48,1.31-5.63,1.69-9.38,1.68-15.55-3.22-15.43-3.68.12-.45,6.42,1.78,27.65,10.66-.45,1.83-1.12,4.64-1.94,8.07,0,0-3.17,13.56-5.75,27.19-10.51,55.49-14.11,100.6-14.11,100.6-.33,4.84-1.29,14.87-4.44,26.51-.34,1.25-2.08,7.6-4.95,14.41-.23.56-3.12,7.36-3.58,6.67-.27-.4.57-2.84,1.14-7.03.73-5.4.02-6.46.74-8.74.43-1.36,1.2-2.64,4.95-4.9,2.03-1.22,3.69-1.99,4.91-2.48-4.79-1.43-11.69-2.64-16.79.86-7.7,5.28-5.94,17.65-9.48,18.35-13.6.44-46.88-3.88-113.9-26.17-25.76,1.86-33.04,2.39-33.04,2.4,0,0,6.32-.39,12.48-1.19,1.6-.21,3.2-.48,4.8-.87,22-5.11,33.6-24.44,13.76-24.41-9.68.02-24.72,3.16-49.68,14.42";

const GLOW_PATH =
  "M25.79,52.98c.81-.4,8.58-4.07,14.29-.5,1.94,1.21,3.42,3.12,3.77,3.58,2.11,2.79,2.75,5.53,3.07,6.92,1.12,4.8,1.56,15.85.38,30.36-1.67,8.67-4.73,23.57-9.61,41.89-12.11,45.49-25.02,73.07-16.53,79.17,2.53,1.82,7.35,2.01,9.22,0,2.22-2.38.44-8-1.92-11.15-6.63-8.86-23.07-5.26-24.21-5,6.98.07,8.8,1.48,9.22,2.69.86,2.46-3.62,5.13-2.69,8.07.74,2.34,4.44,3.31,6.53,3.46,8.18.58,14.1-9.71,14.52-10.45,12.07,1.56,24.14,3.12,74.51,4.68,94.08-1.73,188.1-3.46,282.2-5.19-32-.97-72.24-2.03-119.2-2.88-204.7-3.71-227.4-.47-227.4,0,.03.45,19.5-.23,541.1-3.84-.04-1.83-.03-4.65-.03-8.08,0,0,.2-13.57,2.12-27.08,7.82-54.97,28.28-98.59,28.28-98.59,2.35-4.66,6.44-14.38,5.38-26.13-.11-1.26-.75-7.67-4.31-14.78-.29-.58-3.89-7.68-5.68-7.13-1.03.32-.3,2.82-1.54,6.92-1.6,5.28-4.34,6.13-3.84,8.46.29,1.38,1.62,2.77,10.76,5.77,4.94,1.62,9.18,2.72,12.3,3.46-14.53-2.12-30.33-3.77-71.07-4.61-220.7-1.36-421.3-.29-505.8,1.92.55-12.39-3.55-21.14-8.46-21.94-4.89-.79-12.04,6.08-11.15,10.79.39,2.07,2.28,3.42,5,5.38,5.11,3.68,7.67,3.04,9.22,5,4.35,5.47-4.67,24.12-11.72,23.53-4.37-.37-8.39-8.16-7.88-15.07.6-8.11,7.24-12.53,8.07-13.07";

const GRAIN_PATH =
  "M31.77,52.98c.81-.4,8.58-4.07,14.29-.5,1.94,1.21,3.42,3.12,3.77,3.58,2.11,2.79,2.75,5.53,3.07,6.92,1.12,4.8,1.56,15.85.38,30.36-1.67,8.67-4.73,23.57-9.61,41.89-12.11,45.49-25.02,73.07-16.53,79.17,2.53,1.82,7.35,2.01,9.22,0,2.22-2.38.44-8-1.92-11.15-6.63-8.86-23.07-5.26-24.21-5,6.98.07,8.8,1.48,9.22,2.69.86,2.46-3.62,5.13-2.69,8.07.74,2.34,4.44,3.31,6.53,3.46,8.18.58,14.1-9.71,14.52-10.45,12.07,1.56,24.14,3.12,116.4,4.68,94.08-1.73,188.1-3.46,282.2-5.19-32-.97-72.24-2.03-119.2-2.88-204.7-3.71-269.3-.47-269.2,0,.03.45,53.24-.23,541.1-3.84-.04-1.83-.03-4.65-.03-8.08,0,0,.2-13.57,2.12-27.08,7.82-54.97,28.28-98.59,28.28-98.59,2.35-4.66,6.44-14.38,5.38-26.13-.11-1.26-.75-7.67-4.31-14.78-.29-.58-3.89-7.68-5.68-7.13-1.03.32-.3,2.82-1.54,6.92-1.6,5.28-4.34,6.13-3.84,8.46.29,1.38,1.62,2.77,10.76,5.77,4.94,1.62,9.18,2.72,12.3,3.46-14.53-2.12-30.33-3.77-47.27-4.61-202.7-1.36-403.2-.29-529.6,1.92.55-12.39-3.55-21.14-8.46-21.94-4.89-.79-12.04,6.08-11.15,10.79.39,2.07,2.28,3.42,5,5.38,5.11,3.68,7.67,3.04,9.22,5,4.35,5.47-4.67,24.12-11.72,23.53-4.37-.37-8.39-8.16-7.88-15.07.6-8.11,7.24-12.53,8.07-13.07";

interface Props {
  className?: string;
  preserveAspectRatio?: string;
}

export function ScrollWide1({ className, preserveAspectRatio }: Props) {
  const grain = useMemo(
    () =>
      generateGrainData({
        seed: 11,
        viewBoxWidth: VB_W,
        viewBoxHeight: VB_H,
        cellSize: 6,
        density: 0.41,
        contrast: 0.71,
      }),
    []
  );

  const vgrain = useMemo(
    () =>
      generateVerticalGrainData({
        seed: 13,
        viewBoxWidth: VB_W,
        viewBoxHeight: VB_H,
        columnSpacing: 8,
        density: 0.41,
        contrast: 0.7,
      }),
    []
  );

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio={preserveAspectRatio}
    >
      <defs>
        <filter
          id="imq-glow-edges-sw1"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          <feConvolveMatrix in="SourceGraphic" order={3} kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" divisor={1} bias={0} edgeMode="none" preserveAlpha="true" result="edges" />
          <feMorphology operator="dilate" radius="1.3" in="edges" result="thickEdges" />
          <feComponentTransfer in="thickEdges" result="brightEdges">
            <feFuncR type="linear" slope="1.30" intercept="0.02" />
            <feFuncG type="linear" slope="1.30" intercept="0.02" />
            <feFuncB type="linear" slope="1.30" intercept="0.02" />
          </feComponentTransfer>
          <feGaussianBlur in="brightEdges" stdDeviation="2.4" result="glowBlur" />
          <feMerge result="glow">
            <feMergeNode in="glowBlur" />
            <feMergeNode in="brightEdges" />
          </feMerge>
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
        <clipPath id="clip-vgrain-sw1">
          <path d={VGRAIN_PATH} />
        </clipPath>
        <clipPath id="clip-grain-sw1">
          <path d={GRAIN_PATH} />
        </clipPath>
      </defs>

      <path d={VGRAIN_PATH} fill="#010101" stroke="#4c53a4" strokeMiterlimit={10} />
      <g clipPath="url(#clip-vgrain-sw1)" filter={`url(#${vgrain.filterId})`} pointerEvents="none" aria-hidden="true">
        <g fill="#010101">
          {vgrain.rects.map((r, i) => (<rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} opacity={r.opacity} />))}
        </g>
      </g>

      <g filter="url(#imq-glow-edges-sw1)">
        <path d={GLOW_PATH} fill="none" stroke="#4c53a4" strokeMiterlimit={10} />
      </g>

      <path d={GRAIN_PATH} fill="#4c53a4" stroke="#010101" strokeMiterlimit={10} />
      <g clipPath="url(#clip-grain-sw1)" filter={`url(#${grain.filterId})`} pointerEvents="none" aria-hidden="true">
        <g fill="#010101">
          {grain.rects.map((r, i) => (<rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} opacity={r.opacity} />))}
        </g>
      </g>
    </svg>
  );
}
