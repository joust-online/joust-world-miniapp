export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 min-h-screen w-full overflow-hidden">
      {/* SVG Noise Filters */}
      <svg className="pointer-events-none absolute h-0 w-0">
        <defs>
          {/* First noise filter - chunky grain, break grid with different X/Y */}
          <filter id="noise1" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              baseFrequency="0.29 0.32"
              numOctaves="1"
              result="noise"
              seed="11"
              stitchTiles="stitch"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="monoNoise"
            />
            <feComponentTransfer in="monoNoise" result="noise">
              <feFuncA type="discrete" tableValues="0.4" />
            </feComponentTransfer>
            <feColorMatrix
              in="noise"
              type="matrix"
              values="1 1 1 0 0
                      1 1 1 0 0  
                      1 1 1 0 0
                      0 0 0 1 0"
            />
          </filter>

          {/* Second noise filter - larger chunks, different aspect ratio */}
          <filter id="noise2" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              baseFrequency="0.14 0.18"
              numOctaves="1"
              result="noise"
              seed="37"
              stitchTiles="stitch"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="monoNoise"
            />
            <feComponentTransfer in="monoNoise" result="noise">
              <feFuncA type="discrete" tableValues="0.3" />
            </feComponentTransfer>
            <feColorMatrix
              in="noise"
              type="matrix"
              values="1 1 1 0 0
                      1 1 1 0 0  
                      1 1 1 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Base background the color of our Figma background lol */}
      <div className="absolute inset-0 bg-[#323131]" />

      {/* Rectangle 67 - Next overlay from figma */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(41, 48, 57, 0.49)",
        }}
      />

      {/* Black overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 1)",
        }}
      />

      {/* Figma gradient overlay - exact copy from Figma */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(188.28deg, rgba(41, 48, 57, 0.49) 6.35%, rgba(113, 113, 113, 0.49) 51.06%)",
        }}
      />

      {/* First noise layer - chunky and visible */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          filter: "url(#noise1)",
          mixBlendMode: "overlay",
          opacity: 0.8,
        }}
      />

      {/* Second noise layer - larger chunks */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          filter: "url(#noise2)",
          mixBlendMode: "multiply",
          opacity: 0.6,
        }}
      />

      {/* Black overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.7)",
        }}
      />
    </div>
  );
}
