"use client";

import { useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useSession } from "@/hooks/use-profile";
import { useQueryClient } from "@tanstack/react-query";
import { shortenAddress } from "@/lib/utils";

export function AuthButton({ large }: { large?: boolean }) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      // Get nonce
      const nonceRes = await fetch("/api/auth/nonce");
      const { nonce } = await nonceRes.json();

      // Request wallet auth via MiniKit
      const result = await MiniKit.commandsAsync.walletAuth({
        nonce,
        statement: "Sign in to Joust",
        expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      if (result.finalPayload.status === "error") {
        throw new Error("Wallet auth failed");
      }

      // Send to server
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: result.finalPayload, nonce }),
      });

      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["session"] });
        queryClient.invalidateQueries({ queryKey: ["profile"] });

        // Request notification permission after successful auth
        if (MiniKit.isInstalled()) {
          try {
            await MiniKit.commandsAsync.requestPermission({ permission: "notifications" as any });
          } catch {}
        }
      }
    } catch (err) {
      console.error("Sign in failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (session?.authenticated) {
    return (
      <div className="flex items-center gap-2">
        {session.user.worldIdLevel === "orb" && <span className="text-xs">🔮</span>}
        <span className="text-sm text-muted-foreground">{session.user.username || shortenAddress(session.user.address)}</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className={`bg-accent text-white font-medium rounded-full disabled:opacity-50 ${
        large ? "px-8 py-3 text-base" : "px-4 py-2 text-sm"
      }`}
    >
      {loading ? "Connecting..." : "Sign In"}
    </button>
  );
}
