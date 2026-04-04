"use client";

import { useState } from "react";
import { useSession } from "@/hooks/use-profile";
import { runWorldIdVerification } from "@/lib/world-id-verify";
import { useQueryClient } from "@tanstack/react-query";

interface WorldIdGateProps {
  level: "device" | "orb";
  action?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function WorldIdGate({
  level,
  action = "verify-identity",
  children,
  fallback,
}: WorldIdGateProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!session?.authenticated) {
    return (
      fallback ?? (
        <div className="text-muted-foreground py-8 text-center">
          <p>Sign in to continue</p>
        </div>
      )
    );
  }

  const user = session.user;
  const hasRequired = level === "device" ? user.worldIdVerified : user.worldIdLevel === "orb";

  if (hasRequired) return <>{children}</>;

  const handleVerify = async () => {
    setVerifying(true);
    setError(null);
    try {
      await runWorldIdVerification(action);
      queryClient.invalidateQueries({ queryKey: ["session"] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="py-8 text-center">
      <div className="mb-4">
        <div className="bg-muted mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-2xl">
          {level === "orb" ? "🔮" : "📱"}
        </div>
        <h3 className="mb-1 font-semibold">
          {level === "orb" ? "Orb Verification Required" : "World ID Required"}
        </h3>
        <p className="text-muted-foreground text-sm">
          {level === "orb"
            ? "This action requires Orb-level World ID verification to ensure one-person-one-vote."
            : "Verify with World ID to access this feature."}
        </p>
      </div>
      {error && <p className="text-destructive mb-3 text-xs">{error}</p>}
      <button
        onClick={handleVerify}
        disabled={verifying}
        className="bg-accent rounded-full px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50"
      >
        {verifying ? "Verifying..." : `Verify with ${level === "orb" ? "Orb" : "World ID"}`}
      </button>
    </div>
  );
}
