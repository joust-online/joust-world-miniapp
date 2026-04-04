"use client";

import { useState } from "react";
import { useSession } from "@/hooks/use-profile";
import { WorldIdGate } from "./world-id-gate";
import { sendHaptic } from "@/lib/minikit";

interface HonorVoteProps {
  arbiterId: number;
  arbiterUsername: string;
  poolId: string;
  poolTitle: string;
}

export function HonorVote({ arbiterId, arbiterUsername, poolId, poolTitle }: HonorVoteProps) {
  const { data: session } = useSession();
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVote = async (voteType: "UPVOTE" | "DOWNVOTE") => {
    setLoading(true);
    try {
      const res = await fetch("/api/honor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arbiterId, poolId, voteType }),
      });
      if (res.ok) {
        setVoted(true);
        sendHaptic("success");
      } else {
        const data = await res.json();
        if (data.error === "Already voted on this pool") {
          setVoted(true);
        }
      }
    } catch (err) {
      console.error("Vote failed:", err);
      sendHaptic("error");
    } finally {
      setLoading(false);
    }
  };

  if (!session?.authenticated || session.user.userId === arbiterId) return null;

  return (
    <WorldIdGate level="orb" action="honor-vote">
      <div className="bg-card border-border rounded-xl border p-4">
        <h3 className="mb-1 text-sm font-semibold">Rate Arbiter</h3>
        <p className="text-muted-foreground mb-3 text-xs">
          Was {arbiterUsername} a fair arbiter for "{poolTitle}"?
        </p>
        {voted ? (
          <p className="text-accent text-center text-xs">Thanks for voting!</p>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => handleVote("UPVOTE")}
              disabled={loading}
              className="flex-1 rounded-lg bg-green-500/20 py-2 text-sm font-medium text-green-400 disabled:opacity-50"
            >
              Fair
            </button>
            <button
              onClick={() => handleVote("DOWNVOTE")}
              disabled={loading}
              className="flex-1 rounded-lg bg-red-500/20 py-2 text-sm font-medium text-red-400 disabled:opacity-50"
            >
              Unfair
            </button>
          </div>
        )}
      </div>
    </WorldIdGate>
  );
}
