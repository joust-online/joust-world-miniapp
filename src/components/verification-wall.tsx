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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Authenticated and has at least device verification — show the app
  if (session?.authenticated && session.user.worldIdVerified) {
    return <>{children}</>;
  }

  // Authenticated but not verified — show verify step
  if (session?.authenticated && !session.user.worldIdVerified) {
    const handleVerify = async () => {
      if (!MiniKit.isInstalled()) {
        setError("Please open this app inside World App.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const result = await MiniKit.verify({
          action: "verify-identity",
          verification_level: "device",
        });
        if (result.executedWith === "fallback") {
          throw new Error("Verification not available");
        }
        const res = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            proof: result.data,
            action: "verify-identity",
          }),
        });
        if (res.ok) {
          queryClient.invalidateQueries({ queryKey: ["session"] });
        } else {
          const err = await res.json();
          throw new Error(err.error ?? "Verification failed on server");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-4xl mb-6">
          🌐
        </div>
        <h1 className="text-2xl font-bold mb-2">Verify You&apos;re Human</h1>
        <p className="text-muted-foreground mb-2 max-w-xs">
          Joust uses World ID to ensure every prediction comes from a real person — not bots or Sybil accounts.
        </p>
        <div className="bg-card border border-border rounded-xl p-4 mb-6 max-w-xs w-full text-left">
          <h3 className="text-sm font-semibold mb-2">Why World ID?</h3>
          <ul className="text-xs text-muted-foreground space-y-1.5">
            <li>One person, one vote on arbiter reputation</li>
            <li>Fair rate limits prevent market manipulation</li>
            <li>Orb verification unlocks pool creation & arbitration</li>
            <li>Device verification lets you start predicting</li>
          </ul>
        </div>
        {error && (
          <p className="text-xs text-destructive mb-3">{error}</p>
        )}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="px-8 py-3 bg-accent text-white rounded-full font-semibold text-base disabled:opacity-50 mb-3"
        >
          {loading ? "Verifying..." : "Verify with World ID"}
        </button>
        <p className="text-[11px] text-muted-foreground">
          Powered by World ID 4.0 — proof of unique human
        </p>
      </div>
    );
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
        statement: "Sign in to Joust — prediction markets powered by World ID",
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-4xl mb-6">
        ⚔️
      </div>
      <h1 className="text-3xl font-bold mb-2">Joust</h1>
      <p className="text-lg text-muted-foreground mb-1">Prediction Markets</p>
      <p className="text-sm text-muted-foreground mb-8 max-w-xs">
        Stake your conviction on real-world outcomes. Arbitrated by verified humans. Powered by World ID.
      </p>
      <div className="space-y-3 max-w-xs w-full mb-8">
        <div className="flex items-center gap-3 text-left">
          <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">🔮</span>
          <div>
            <div className="text-sm font-medium">Sybil-Resistant</div>
            <div className="text-xs text-muted-foreground">One person = one voice</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-left">
          <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">⚖️</span>
          <div>
            <div className="text-sm font-medium">Human Arbiters</div>
            <div className="text-xs text-muted-foreground">Outcomes decided by trusted people, not chance</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-left">
          <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">⭐</span>
          <div>
            <div className="text-sm font-medium">Honor System</div>
            <div className="text-xs text-muted-foreground">Rate arbiters — verified humans only</div>
          </div>
        </div>
      </div>
      {error && (
        <p className="text-xs text-destructive mb-3">{error}</p>
      )}
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="px-8 py-3 bg-accent text-white rounded-full font-semibold text-base disabled:opacity-50"
      >
        {loading ? "Connecting..." : "Sign In with World App"}
      </button>
    </div>
  );
}
