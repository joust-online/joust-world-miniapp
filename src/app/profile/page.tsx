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
      <main className="pb-20 px-4 pt-4">
        <h1 className="text-xl font-bold mb-4">Profile</h1>
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">Sign in to view your profile</p>
          <AuthButton large />
        </div>
        <TabNavigation />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="pb-20 px-4 pt-4">
        <h1 className="text-xl font-bold mb-4">Profile</h1>
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
        <TabNavigation />
      </main>
    );
  }

  const user = profileData?.user;

  return (
    <main className="pb-20 px-4 pt-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      {user && (
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-4 text-center">
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
              className="relative w-16 h-16 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center text-2xl group"
            >
              {user.pfp ? (
                <img src={user.pfp} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                "👤"
              )}
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-white">{uploading ? "..." : "Edit"}</span>
              </div>
            </button>
            {editingName ? (
              <div className="flex items-center justify-center gap-2 mt-1 mb-1">
                <input
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  maxLength={50}
                  autoFocus
                  className="bg-muted rounded-lg px-2 py-1 text-sm border border-border outline-none text-center w-36"
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
                  className="text-xs text-muted-foreground"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setNewUsername(user.username); setEditingName(true); }}
                className="font-semibold hover:text-accent transition-colors"
              >
                {user.username} <span className="text-xs text-muted-foreground">✏️</span>
              </button>
            )}
            <p className="text-xs text-muted-foreground">{shortenAddress(user.address)}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <VerificationBadge level={user.worldIdLevel} size="lg" />
            </div>
          </div>

          {/* World ID Verification Section */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-sm mb-3">World ID Verification</h3>
            {user.worldIdVerified ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <VerificationBadge level={user.worldIdLevel} size="md" />
                  <span className="text-sm text-muted-foreground">
                    {user.worldIdLevel === "orb" ? "Orb-level proof of unique human" : "Device-level verification"}
                  </span>
                </div>
                {user.worldIdVerifiedAt && (
                  <p className="text-xs text-muted-foreground">
                    Verified on {new Date(user.worldIdVerifiedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Verify with World ID to prove you are a unique human. Unlock full prediction features and build trust as an arbiter.
                </p>
                {verifyError && (
                  <p className="text-xs text-destructive">{verifyError}</p>
                )}
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
                  className="w-full py-2.5 bg-accent text-white rounded-xl font-medium text-sm disabled:opacity-50"
                >
                  {verifying ? "Verifying..." : "Verify with World ID"}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-xl border border-border p-3 text-center">
              <div className="text-lg font-bold">{user._count?.jousts ?? 0}</div>
              <div className="text-xs text-muted-foreground">Predictions</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-3 text-center">
              <div className="text-lg font-bold text-green-400">{user.winCount ?? 0}</div>
              <div className="text-xs text-muted-foreground">Wins</div>
            </div>
            <div className="bg-card rounded-xl border border-border p-3 text-center">
              <div className="text-lg font-bold">{user._count?.createdPools ?? 0}</div>
              <div className="text-xs text-muted-foreground">Pools</div>
            </div>
          </div>

          {user.honorScore && (
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-semibold text-sm mb-2">Arbiter Honor</h3>
              <div className="flex items-center gap-4">
                <span className="text-green-400">+{user.honorScore.totalUpvotes}</span>
                <span className="text-destructive">-{user.honorScore.totalDownvotes}</span>
                <span className="text-sm text-muted-foreground">
                  Score: {user.honorScore.score.toFixed(1)}
                </span>
              </div>
            </div>
          )}

          <div className="bg-card rounded-xl border border-border p-4">
            <div className="text-sm text-muted-foreground mb-1">Points</div>
            <div className="text-2xl font-bold">{user.totalPoints}</div>
          </div>

          {myPoolsData?.pools?.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-2">Your Pools</h3>
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
