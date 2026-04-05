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
import { getPfpUrl } from "@/lib/image-urls";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

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
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="grid grid-cols-3 gap-3">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
        </div>
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
          <Card className="rounded-xl py-0 shadow-none">
            <CardContent className="p-4 text-center">
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
                    // Resize image on client
                    const dataUrl = await resizeImage(file, 256);
                    const response = await fetch(dataUrl);
                    const blob = await response.blob();

                    // Get presigned upload URL
                    const filename = `user_${user.id}_pfp_${Date.now()}.jpg`;
                    const tokenRes = await fetch("/api/upload-token", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        filename,
                        contentType: "image/jpeg",
                      }),
                    });
                    if (!tokenRes.ok) throw new Error("Failed to get upload token");
                    const { uploadUrl } = await tokenRes.json();

                    // Upload directly to R2
                    await fetch(uploadUrl, {
                      method: "PUT",
                      headers: { "Content-Type": "image/jpeg" },
                      body: blob,
                    });

                    // Update profile with filepath
                    const profileRes = await fetch("/api/profile", {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ pfp: filename }),
                    });
                    if (profileRes.ok) {
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
                className="group relative mx-auto mb-2 block"
              >
                <Avatar className="h-16 w-16">
                  {user.pfp ? (
                    <AvatarImage src={getPfpUrl(user.pfp) ?? undefined} alt={user.username} />
                  ) : null}
                  <AvatarFallback className="text-2xl">👤</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-xs text-white">{uploading ? "..." : "Edit"}</span>
                </div>
              </button>
              {editingName ? (
                <div className="mt-1 mb-1 flex items-center justify-center gap-2">
                  <Input
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    maxLength={50}
                    autoFocus
                    className="w-36 text-center text-sm"
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
                  <Button
                    variant="ghost"
                    onClick={() => setEditingName(false)}
                    className="text-muted-foreground h-auto p-0 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setNewUsername(user.username);
                    setEditingName(true);
                  }}
                  className="hover:text-accent h-auto p-0 font-semibold transition-colors"
                >
                  {user.username} <span className="text-muted-foreground text-xs">✏️</span>
                </Button>
              )}
              <p className="text-muted-foreground text-xs">{shortenAddress(user.address)}</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <VerificationBadge level={user.worldIdLevel} size="lg" />
              </div>
            </CardContent>
          </Card>

          {/* World ID Verification Section */}
          <Card className="rounded-xl py-0 shadow-none">
            <CardContent className="p-4">
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
                  <Button
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
                    className="w-full"
                  >
                    {verifying ? "Verifying..." : "Verify with World ID"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-3">
            <Card className="rounded-xl py-0 shadow-none">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold">{user._count?.jousts ?? 0}</div>
                <div className="text-muted-foreground text-xs">Predictions</div>
              </CardContent>
            </Card>
            <Card className="rounded-xl py-0 shadow-none">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-green-400">{user.winCount ?? 0}</div>
                <div className="text-muted-foreground text-xs">Wins</div>
              </CardContent>
            </Card>
            <Card className="rounded-xl py-0 shadow-none">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold">{user._count?.createdPools ?? 0}</div>
                <div className="text-muted-foreground text-xs">Pools</div>
              </CardContent>
            </Card>
          </div>

          {user.honorScore && (
            <Card className="rounded-xl py-0 shadow-none">
              <CardContent className="p-4">
                <h3 className="mb-2 text-sm font-semibold">Arbiter Honor</h3>
                <div className="flex items-center gap-4">
                  <span className="text-green-400">+{user.honorScore.totalUpvotes}</span>
                  <span className="text-destructive">-{user.honorScore.totalDownvotes}</span>
                  <span className="text-muted-foreground text-sm">
                    Score: {user.honorScore.score}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="rounded-xl py-0 shadow-none">
            <CardContent className="p-4">
              <div className="text-muted-foreground mb-1 text-sm">Points</div>
              <div className="text-2xl font-bold">{user.totalPoints}</div>
            </CardContent>
          </Card>

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

          <Button
            variant="outline"
            className="w-full text-destructive"
            onClick={async () => {
              await fetch("/api/auth/session", { method: "DELETE" });
              queryClient.invalidateQueries({ queryKey: ["session"] });
              queryClient.invalidateQueries({ queryKey: ["profile"] });
            }}
          >
            Sign Out
          </Button>
        </div>
      )}

      <TabNavigation />
    </main>
  );
}
