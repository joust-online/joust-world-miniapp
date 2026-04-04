"use client";

export function AiArbiterBadge({
  name,
  agentBookVerified,
  size = "md",
}: {
  name?: string;
  agentBookVerified?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5 gap-0.5",
    md: "text-xs px-2 py-1 gap-1",
    lg: "text-sm px-3 py-1.5 gap-1.5",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 font-medium ${sizeClasses[size]}`}
    >
      <span>🤖</span>
      <span>{name ?? "AI Arbiter"}</span>
      {agentBookVerified && (
        <span className="text-green-400" title="Verified in AgentBook">
          ✓
        </span>
      )}
    </span>
  );
}
