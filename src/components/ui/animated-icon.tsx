export function SwordIcon({ animate = true, delay = 0, ...props }: { animate?: boolean; delay?: number } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <style>{`
        @keyframes draw-in {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .draw-path {
          stroke-dasharray: 100;
          stroke-dashoffset: ${animate ? 100 : 0};
          animation: ${animate ? `draw-in 0.8s ease-out ${delay}s forwards` : "none"};
        }
      `}</style>
      <path className="draw-path" d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path className="draw-path" d="M13 19l6-6" />
      <path className="draw-path" d="M16 16l4 4" />
    </svg>
  );
}
