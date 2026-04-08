"use client";

import { useId, useMemo } from "react";
import {
  generateGrainData,
  generateVerticalGrainData,
} from "@/lib/generate-grain";

// scroll4_wide.svg — viewBox 0 0 608.96 246.01

const VB_W = 608.96;
const VB_H = 246.01;

const VGRAIN_PATH =
  "M572.08,62.78c1.01-17.97,3.11-50.46,5.51-52.68,1.38-1.28,2.15-.99,2.15-.99.49.2.85.77.91,1.72.17,2.55-1.76,8.01-3.29,10.97-4.31,8.32-8.91,3.42-9.23,3.07,2.33.48,3.27-.78,3.7-1.95.87-2.39.02-5.41,1.03-8.27.8-2.28,2.26-2.95,2.99-2.93,2.85.07,2.37,10.81,2.33,11.58,4.38-.6,8.76-1.2,13.13-1.8l10.47,7.98c-1.56.65-3.48,1.31-5.63,1.69-9.38,1.68-15.55-3.22-15.43-3.68.12-.45,6.42,1.78,27.65,10.66-.45,1.83-1.12,4.64-1.94,8.07h0c-1.88,4.75-3.76,9.51-5.65,14.26";

const GLOW_PATH =
  "M1.66,52.98c.81-.4,8.58-4.07,14.29-.5,1.94,1.21,3.42,3.12,3.77,3.58,0,0,2.22,2.93,3.07,6.92,2.27,10.55-3.65,7.07,8.46,17.7,2.27,1.99,10.99,2.01,25.95,0,17.76-2.38,3.52-8-15.36-11.15-9.92-8.86-26.36-5.26-27.5-5,6.98.07,8.8,1.48,9.22,2.69.86,2.46-3.62,5.13-2.69,8.07.74,2.34,4.44,3.31,6.53,3.46,8.18.58,38.04-9.71,41.4-10.45,96.56,1.56,193.1,3.12,289.8,4.68,94.08-1.73,188.1-3.46,209.9-5.19-1.27-.31-2.83-.68-4.62-1.05-15.55-1.43-42.11-1.46-42.27-1.83-.24-.59,40.4-1.71,67.73-3.86,0,0,6.28-13.72,5.38-26.13-.51-7.08-2.69-11.54-4.31-14.78-.29-.58-3.89-7.68-5.68-7.13-1.03.32-.3,2.82-1.54,6.92-1.6,5.28-4.34,6.13-3.84,8.46.29,1.38,1.62,2.77,10.76,5.77,4.94,1.62,9.18,2.72,12.3,3.46-14.53-2.12-30.33-3.77-68.48-4.61-220.7-1.36-421.3-.29-508.4,1.92.55-12.39-3.55-21.14-8.46-21.94-4.89-.79-12.04,6.08-11.15,10.79.39,2.07,2.28,3.42,5,5.38,5.11,3.68,7.67,3.04,9.22,5,4.35,5.47-4.67,24.12-11.72,23.53-4.37-.37-8.39-8.16-7.88-15.07.6-8.11,7.24-12.53,8.07-13.07";

const GRAIN_PATH =
  "M7.65,52.98c.81-.4,8.58-4.07,14.29-.5,1.94,1.21,3.42,3.12,3.77,3.58,1.85,2.45,2.61,4.92,2.9,6.15.1.42.16.72.17.76.42,2.07,31.78,5.15,335.6,9.91,90.08-1.7,180.2-3.39,203.3-5.09-3.94-1.38-7.88-2.75-27.5-4.13,28.81-.87,41.94-1.74,55.07-2.61,2.35-4.66,6.44-14.38,5.38-26.13-.11-1.26-.75-7.67-4.31-14.78-.29-.58-3.89-7.68-5.68-7.13-1.03.32-.3,2.82-1.54,6.92-1.6,5.28-4.34,6.13-3.84,8.46.29,1.38,1.62,2.77,10.76,5.77,4.94,1.62,9.18,2.72,12.3,3.46-14.53-2.12-30.33-3.77-47.27-4.61-200.1-1.36-400.6-.29-529.6,1.92.55-12.39-3.55-21.14-8.46-21.94-4.89-.79-12.04,6.08-11.15,10.79.39,2.07,2.28,3.42,5,5.38,5.11,3.68,7.67,3.04,9.22,5,4.35,5.47-4.67,24.12-11.72,23.53-4.37-.37-8.39-8.16-7.88-15.07.6-8.11,7.24-12.53,8.07-13.07";

interface Props {
  className?: string;
  preserveAspectRatio?: string;
}

export function ScrollWide4({ className, preserveAspectRatio }: Props) {
  // Per-instance unique suffix so SVG IDs do not collide when multiple
  // wide scrolls render on the same page.
  const uid = useId().replace(/[:]/g, "");
  const glowId = `imq-glow-edges-sw4-${uid}`;
  const grainFilterId = `grain-filter-sw4-${uid}`;
  const vgrainFilterId = `vgrain-filter-sw4-${uid}`;
  const vclipId = `clip-vgrain-sw4-${uid}`;
  const cclipId = `clip-grain-sw4-${uid}`;

  const grain = useMemo(
    () =>
      generateGrainData({
        seed: 71,
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
        seed: 73,
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
        <filter id={glowId} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
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
        <filter id={grainFilterId}>
          <feComponentTransfer>
            <feFuncR type="linear" slope={grain.slope} intercept={grain.intercept} />
            <feFuncG type="linear" slope={grain.slope} intercept={grain.intercept} />
            <feFuncB type="linear" slope={grain.slope} intercept={grain.intercept} />
          </feComponentTransfer>
        </filter>
        <filter id={vgrainFilterId}>
          <feComponentTransfer>
            <feFuncR type="linear" slope={vgrain.slope} intercept={vgrain.intercept} />
            <feFuncG type="linear" slope={vgrain.slope} intercept={vgrain.intercept} />
            <feFuncB type="linear" slope={vgrain.slope} intercept={vgrain.intercept} />
          </feComponentTransfer>
        </filter>
        <clipPath id={vclipId}>
          <path d={VGRAIN_PATH} />
        </clipPath>
        <clipPath id={cclipId}>
          <path d={GRAIN_PATH} />
        </clipPath>
      </defs>

      <path d={VGRAIN_PATH} fill="#010101" stroke="#4c53a4" strokeMiterlimit={10} />
      <g clipPath={`url(#${vclipId})`} filter={`url(#${vgrainFilterId})`} pointerEvents="none" aria-hidden="true">
        <g fill="#010101">
          {vgrain.rects.map((r, i) => (<rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} opacity={r.opacity} />))}
        </g>
      </g>

      <g filter={`url(#${glowId})`}>
        <path d={GLOW_PATH} fill="none" stroke="#4c53a4" strokeMiterlimit={10} />
      </g>

      <path d={GRAIN_PATH} fill="#4c53a4" stroke="#010101" strokeMiterlimit={10} />
      <g clipPath={`url(#${cclipId})`} filter={`url(#${grainFilterId})`} pointerEvents="none" aria-hidden="true">
        <g fill="#010101">
          {grain.rects.map((r, i) => (<rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} opacity={r.opacity} />))}
        </g>
      </g>
    </svg>
  );
}
