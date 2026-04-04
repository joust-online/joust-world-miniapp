"use client";

import { useState } from "react";
import { useSession } from "@/hooks/use-profile";
import { MiniKit } from "@worldcoin/minikit-js";
import { useQueryClient } from "@tanstack/react-query";

export function VerificationWall({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = useSession();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent">
        <div className="text-muted-foreground animate-pulse">Loading...</div>
      </div>
    );
  }

  // Authenticated — let them through (verified or not)
  if (session?.authenticated) {
    return <>{children}</>;
  }

  // Not authenticated — show sign-in
  const handleSignIn = async () => {
    if (!MiniKit.isInstalled()) {
      setError("Please open this app inside World App to sign in.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const nonceRes = await fetch("/api/auth/nonce");
      const { nonce } = await nonceRes.json();

      const result = await MiniKit.walletAuth({
        nonce,
        statement: "Sign in to Joust — hypersocial media powered by World ID",
        expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      if (result.executedWith === "fallback") {
        throw new Error("Sign-in not available outside World App");
      }

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: result.data, nonce }),
      });
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["session"] });
      } else {
        const err = await res.json();
        throw new Error(err.error ?? "Authentication failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-6 text-center">
      <div className="bg-accent/20 mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl">
        ⚔️
      </div>
      <h1 className="mb-2 text-3xl font-bold">Joust</h1>
      <p className="text-muted-foreground mb-1 text-lg">Hypersocial Media</p>
      <p className="text-muted-foreground mb-8 max-w-xs text-sm">
        Put your reputation on the line. Stake convictions, challenge friends, and prove you know
        what's up.
      </p>
      <div className="mb-8 w-full max-w-xs space-y-3">
        <div className="flex items-center gap-3 text-left">
          <span className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm">
            🔮
          </span>
          <div>
            <div className="text-sm font-medium">Sybil-Resistant</div>
            <div className="text-muted-foreground text-xs">One person = one voice</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-left">
          <span className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm">
            ⚖️
          </span>
          <div>
            <div className="text-sm font-medium">Human Arbiters</div>
            <div className="text-muted-foreground text-xs">
              Outcomes decided by trusted people, not chance
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-left">
          <span className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm">
            ⭐
          </span>
          <div>
            <div className="text-sm font-medium">Honor System</div>
            <div className="text-muted-foreground text-xs">
              Rate arbiters — verified humans only
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-destructive mb-3 text-xs">{error}</p>}
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="bg-accent rounded-full px-8 py-3 text-base font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Connecting..." : "Sign In with World App"}
      </button>
    </div>
  );
}
