import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
  level?: string | null;
  size?: "sm" | "md" | "lg";
}

export function VerificationBadge({ level, size = "sm" }: VerificationBadgeProps) {
  const sizeClasses =
    size === "lg"
      ? "text-sm px-3 py-1 h-auto"
      : size === "md"
        ? "text-xs px-2 py-0.5 h-auto"
        : "text-[10px] px-1.5 py-0.5 h-auto";

  if (level === "orb") {
    return (
      <Badge
        variant="outline"
        className={cn(sizeClasses, "border-green-500/30 bg-green-500/20 text-green-400")}
      >
        Orb Verified
      </Badge>
    );
  }

  if (level === "device") {
    return (
      <Badge
        variant="outline"
        className={cn(sizeClasses, "border-blue-500/30 bg-blue-500/20 text-blue-400")}
      >
        Device Verified
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={cn(sizeClasses, "border-red-500/30 bg-red-500/10 text-red-400")}
    >
      Unverified
    </Badge>
  );
}
