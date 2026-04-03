"use client";

import { useState } from "react";
import { useSession } from "@/hooks/use-profile";
import { requestVerification } from "@/lib/minikit";

interface WorldIdGateProps {
  level: "device" | "orb";
  action?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function WorldIdGate({ level, action = "verify-identity", children, fallback }: WorldIdGateProps) {
  const { data: session } = useSession();
  const [verifying, setVerifying] = useState(false);

  if (!session?.authenticated) {
    return fallback ?? (
      <div className="text-center py-8 text-muted-foreground">
        <p>Sign in to continue</p>
      </div>
    );
  }

  const user = session.user;
  const hasRequired = level === "device"
    ? user.worldIdVerified
    : user.worldIdLevel === "orb";

  if (hasRequired) return <>{children}</>;

  const handleVerify = async () => {
    setVerifying(true);
    try {
      const proof = await requestVerification(action);
      // Send proof to server
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proof, action }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error("Verification failed:", err);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="text-center py-8">
      <div className="mb-4">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center text-2xl">
          {level === "orb" ? "🔮" : "📱"}
        </div>
        <h3 className="font-semibold mb-1">
          {level === "orb" ? "Orb Verification Required" : "World ID Required"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {level === "orb"
            ? "This action requires Orb-level World ID verification to ensure one-person-one-vote."
            : "Verify with World ID to access this feature."}
        </p>
      </div>
      <button
        onClick={handleVerify}
        disabled={verifying}
        className="px-6 py-2.5 bg-accent text-white rounded-full font-medium text-sm disabled:opacity-50"
      >
        {verifying ? "Verifying..." : `Verify with ${level === "orb" ? "Orb" : "World ID"}`}
      </button>
    </div>
  );
}
