"use client";

import { useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useSession } from "@/hooks/use-profile";
import { useQueryClient } from "@tanstack/react-query";
import { shortenAddress } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AuthButton({ large }: { large?: boolean }) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const nonceRes = await fetch("/api/auth/nonce");
      const { nonce } = await nonceRes.json();

      const result = await MiniKit.walletAuth({
        nonce,
        statement: "Sign in to Joust",
        expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      if (result.executedWith === "fallback") {
        throw new Error("Wallet auth not available");
      }

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: result.data, nonce }),
      });

      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ["session"] });
        queryClient.invalidateQueries({ queryKey: ["profile"] });

        if (MiniKit.isInstalled()) {
          try {
            await MiniKit.requestPermission({ permission: "notifications" as any });
          } catch {
            // Notification permission is optional
          }
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
        <span className="text-muted-foreground text-sm">
          {session.user.username || shortenAddress(session.user.address)}
        </span>
      </div>
    );
  }

  return (
    <Button onClick={handleSignIn} disabled={loading} size={large ? "lg" : "default"}>
      {loading ? "Connecting..." : "Sign In"}
    </Button>
  );
}
