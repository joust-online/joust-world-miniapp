"use client";

import { useRef, useState } from "react";
import { useProfile, useSession } from "@/hooks/use-profile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TabNavigation } from "@/components/tab-navigation";
import { PoolCard } from "@/components/pool-card";
import { AuthButton } from "@/components/auth-button";
import { VerificationBadge } from "@/components/verification-badge";
import { runWorldIdVerification } from "@/lib/world-id-verify";
import { shortenAddress } from "@/lib/utils";

function resizeImage(file: File, maxSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = (height / width) * maxSize;
            width = maxSize;
          } else {
            width = (width / height) * maxSize;
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const { data: profileData, isLoading } = useProfile();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const { data: myPoolsData } = useQuery({
    queryKey: ["pools", "my"],
    queryFn: async () => {
      const res = await fetch("/api/pool?mine=true");
      if (!res.ok) throw new Error("Failed to fetch pools");
      return res.json();
    },
    enabled: !!session?.authenticated,
  });

  if (!session?.authenticated) {
    return (
      <main className="px-4 pt-4 pb-20">
        <h1 className="mb-4 text-xl font-bold">Profile</h1>
        <div className="py-16 text-center">
          <p className="text-muted-foreground mb-4">Sign in to view your profile</p>
          <AuthButton large />
        </div>
        <TabNavigation />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="px-4 pt-4 pb-20">
        <h1 className="mb-4 text-xl font-bold">Profile</h1>
        <div className="text-muted-foreground py-8 text-center">Loading...</div>
        <TabNavigation />
      </main>
    );
  }

  const user = profileData?.user;

  return (
    <main className="px-4 pt-4 pb-20">
      <h1 className="mb-4 text-xl font-bold">Profile</h1>

      {user && (
        <div className="space-y-4">
          <div className="bg-card border-border rounded-xl border p-4 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploading(true);
                try {
                  const dataUrl = await resizeImage(file, 256);
                  const res = await fetch("/api/profile", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pfp: dataUrl }),
                  });
                  if (res.ok) {
                    queryClient.invalidateQueries({ queryKey: ["profile"] });
                  }
                } catch (err) {
                  console.error("Upload failed:", err);
                } finally {
                  setUploading(false);
                }
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-muted group relative mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full text-2xl"
            >
              {user.pfp ? (
                <img src={user.pfp} alt="" className="h-full w-full rounded-full object-cover" />
              ) : (
                "👤"
              )}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-xs text-white">{uploading ? "..." : "Edit"}</span>
              </div>
            </button>
            {editingName ? (
              <div className="mt-1 mb-1 flex items-center justify-center gap-2">
                <input
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  maxLength={50}
                  autoFocus
                  className="bg-muted border-border w-36 rounded-lg border px-2 py-1 text-center text-sm outline-none"
                  onKeyDown={async (e) => {
                    if (e.key === "Enter" && newUsername.trim()) {
                      setSavingName(true);
                      const res = await fetch("/api/profile", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username: newUsername.trim() }),
                      });
                      if (res.ok) {
                        queryClient.invalidateQueries({ queryKey: ["profile"] });
                        queryClient.invalidateQueries({ queryKey: ["session"] });
                      }
                      setSavingName(false);
                      setEditingName(false);
                    }
                    if (e.key === "Escape") setEditingName(false);
                  }}
                />
                <button
                  onClick={() => setEditingName(false)}
                  className="text-muted-foreground text-xs"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setNewUsername(user.username);
                  setEditingName(true);
                }}
                className="hover:text-accent font-semibold transition-colors"
              >
                {user.username} <span className="text-muted-foreground text-xs">✏️</span>
              </button>
            )}
            <p className="text-muted-foreground text-xs">{shortenAddress(user.address)}</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <VerificationBadge level={user.worldIdLevel} size="lg" />
            </div>
          </div>

          {/* World ID Verification Section */}
          <div className="bg-card border-border rounded-xl border p-4">
            <h3 className="mb-3 text-sm font-semibold">World ID Verification</h3>
            {user.worldIdVerified ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <VerificationBadge level={user.worldIdLevel} size="md" />
                  <span className="text-muted-foreground text-sm">
                    {user.worldIdLevel === "orb"
                      ? "Orb-level proof of unique human"
                      : "Device-level verification"}
                  </span>
                </div>
                {user.worldIdVerifiedAt && (
                  <p className="text-muted-foreground text-xs">
                    Verified on {new Date(user.worldIdVerifiedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm">
                  Verify with World ID to prove you are a unique human. Build trust as an arbiter
                  and unlock the full Joust experience.
                </p>
                {verifyError && <p className="text-destructive text-xs">{verifyError}</p>}
                <button
                  onClick={async () => {
                    setVerifying(true);
                    setVerifyError(null);
                    try {
                      await runWorldIdVerification("verify-identity");
                      queryClient.invalidateQueries({ queryKey: ["session"] });
                      queryClient.invalidateQueries({ queryKey: ["profile"] });
                    } catch (err) {
                      setVerifyError(err instanceof Error ? err.message : "Verification failed");
                    } finally {
                      setVerifying(false);
                    }
                  }}
                  disabled={verifying}
                  className="bg-accent w-full rounded-xl py-2.5 text-sm font-medium text-white disabled:opacity-50"
                >
                  {verifying ? "Verifying..." : "Verify with World ID"}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card border-border rounded-xl border p-3 text-center">
              <div className="text-lg font-bold">{user._count?.jousts ?? 0}</div>
              <div className="text-muted-foreground text-xs">Predictions</div>
            </div>
            <div className="bg-card border-border rounded-xl border p-3 text-center">
              <div className="text-lg font-bold text-green-400">{user.winCount ?? 0}</div>
              <div className="text-muted-foreground text-xs">Wins</div>
            </div>
            <div className="bg-card border-border rounded-xl border p-3 text-center">
              <div className="text-lg font-bold">{user._count?.createdPools ?? 0}</div>
              <div className="text-muted-foreground text-xs">Pools</div>
            </div>
          </div>

          {user.honorScore && (
            <div className="bg-card border-border rounded-xl border p-4">
              <h3 className="mb-2 text-sm font-semibold">Arbiter Honor</h3>
              <div className="flex items-center gap-4">
                <span className="text-green-400">+{user.honorScore.totalUpvotes}</span>
                <span className="text-destructive">-{user.honorScore.totalDownvotes}</span>
                <span className="text-muted-foreground text-sm">
                  Score: {user.honorScore.score.toFixed(1)}
                </span>
              </div>
            </div>
          )}

          <div className="bg-card border-border rounded-xl border p-4">
            <div className="text-muted-foreground mb-1 text-sm">Points</div>
            <div className="text-2xl font-bold">{user.totalPoints}</div>
          </div>

          {myPoolsData?.pools?.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold">Your Pools</h3>
              <div className="space-y-3">
                {myPoolsData.pools.map((pool: any) => (
                  <PoolCard key={pool.id} pool={pool} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <TabNavigation />
    </main>
  );
}
