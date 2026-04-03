interface VerificationBadgeProps {
  level?: string | null;
  size?: "sm" | "md";
}

export function VerificationBadge({ level, size = "sm" }: VerificationBadgeProps) {
  if (!level) return null;

  const isOrb = level === "orb";
  const sizeClasses = size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-0.5";

  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full font-medium ${sizeClasses} ${
      isOrb ? "bg-accent/20 text-accent" : "bg-blue-500/20 text-blue-400"
    }`}>
      {isOrb ? "Orb" : "Device"}
    </span>
  );
}
