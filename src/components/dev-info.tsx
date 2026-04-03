"use client";

import { useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useSession } from "@/hooks/use-profile";
import { JOUST_ARENA_ADDRESS, CHAIN_ID } from "@/lib/contracts";

export function DevInfo() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-16 right-2 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 bg-yellow-500 text-black rounded-full text-xs font-bold flex items-center justify-center"
      >
        D
      </button>
      {open && (
        <div className="absolute bottom-10 right-0 w-64 bg-card border border-border rounded-lg p-3 text-xs space-y-1">
          <p>MiniKit: {MiniKit.isInstalled() ? "Installed" : "Not installed"}</p>
          <p>Chain: {CHAIN_ID}</p>
          <p className="break-all">Contract: {JOUST_ARENA_ADDRESS}</p>
          <p>Session: {session?.authenticated ? "Yes" : "No"}</p>
          {session?.authenticated && (
            <>
              <p>User: {session.user.username}</p>
              <p>World ID: {session.user.worldIdLevel ?? "none"}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
