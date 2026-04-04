"use client";

import { useState, useCallback } from "react";
import { useSession } from "@/hooks/use-profile";
import { MiniKit } from "@worldcoin/minikit-js";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/scroll-illustration";

export function VerificationWall({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = useSession();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exitTriggered, setExitTriggered] = useState(false);

  const doSignIn = useCallback(async () => {
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
  }, [queryClient]);

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
  const handleSignIn = () => {
    // Trigger the exit animation; actual sign-in fires after animation completes
    setExitTriggered(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-6 text-center">
      <div className="bg-accent/20 mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl">
        ⚔️
      </div>
      <h1 className="text-3xl font-bold mb-2">Joust</h1>
      {/* Scroll SVG in flow (determines height), text overlaid on top */}
      <div className="relative max-w-xs w-full overflow-visible">
        {/* SVG in document flow — its height pushes the button down */}
        <div className="flex justify-center pointer-events-none" style={{ marginTop: "-15%" }}>
          <ScrollAnimation
            className="w-[150%] opacity-30"
            triggerExit={exitTriggered}
            onExitComplete={doSignIn}
          />
        </div>
        {/* Text content positioned on top of the SVG */}
        <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center">
          <p className="text-lg text-muted-foreground mb-1">Prediction Markets</p>
          <p className="text-sm text-muted-foreground mb-8 px-2">
            Stake your conviction on real-world outcomes. Arbitrated by verified humans. Powered by World ID.
          </p>
          <div className="space-y-3 w-full px-2">
            <div className="flex items-center gap-3 text-left">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm">🔮</span>
              <div>
                <div className="text-sm font-medium">Sybil-Resistant</div>
                <div className="text-xs text-muted-foreground">One person = one voice</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm">⚖️</span>
              <div>
                <div className="text-sm font-medium">Human Arbiters</div>
                <div className="text-xs text-muted-foreground">Outcomes decided by trusted people, not chance</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm">⭐</span>
              <div>
                <div className="text-sm font-medium">Honor System</div>
                <div className="text-xs text-muted-foreground">Rate arbiters — verified humans only</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-destructive mb-3 text-xs">{error}</p>}
      <Button onClick={handleSignIn} disabled={loading} size="lg" className="px-8 font-semibold">
        {loading ? "Connecting..." : "Sign In with World App"}
      </Button>
    </div>
  );
}
