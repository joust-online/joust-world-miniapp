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
    <div className="fixed right-2 bottom-16 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-black"
      >
        D
      </button>
      {open && (
        <div className="bg-card border-border absolute right-0 bottom-10 w-64 space-y-1 rounded-lg border p-3 text-xs">
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
