"use client";

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedBorder({ children, className = "" }: AnimatedBorderProps) {
  return (
    <div className={`relative rounded-xl p-px overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 animate-[spin_3s_linear_infinite]"
        style={{
          background: "conic-gradient(from 0deg, transparent, hsl(var(--accent)), transparent 30%)",
        }}
      />
      <div className="relative rounded-xl bg-card">
        {children}
      </div>
    </div>
  );
}
