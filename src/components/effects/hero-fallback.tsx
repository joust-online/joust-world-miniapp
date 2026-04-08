"use client";

export default function HeroFallback() {
  return (
    <div className="absolute inset-0 bg-[#131516]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(188.28deg, rgba(41,48,57,0.49) 6.35%, rgba(113,113,113,0.49) 51.06%)",
        }}
      />
    </div>
  );
}
