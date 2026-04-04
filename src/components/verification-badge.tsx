interface VerificationBadgeProps {
  level?: string | null;
  size?: "sm" | "md" | "lg";
}

export function VerificationBadge({ level, size = "sm" }: VerificationBadgeProps) {
  const sizeClasses =
    size === "lg"
      ? "text-sm px-3 py-1"
      : size === "md"
      ? "text-xs px-2 py-0.5"
      : "text-[10px] px-1.5 py-0.5";

  if (level === "orb") {
    return (
      <span className={`inline-flex items-center gap-0.5 rounded-full font-medium ${sizeClasses} bg-green-500/20 text-green-400`}>
        Orb Verified
      </span>
    );
  }

  if (level === "device") {
    return (
      <span className={`inline-flex items-center gap-0.5 rounded-full font-medium ${sizeClasses} bg-blue-500/20 text-blue-400`}>
        Device Verified
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full font-medium ${sizeClasses} bg-red-500/10 text-red-400`}>
      Unverified
    </span>
  );
}
