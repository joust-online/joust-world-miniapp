"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export function NotificationBell() {
  const { data: session } = useSession();
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!session?.authenticated) return;
    fetch("/api/notification")
      .then((r) => r.json())
      .then((data) => {
        setUnread(data.unreadCount ?? 0);
        setNotifications(data.notifications ?? []);
      })
      .catch(() => {});
  }, [session?.authenticated]);

  const markRead = async () => {
    await fetch("/api/notification", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setUnread(0);
  };

  if (!session?.authenticated) return null;

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen && unread > 0) markRead();
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unread > 0 && (
            <span className="bg-destructive absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="max-h-80 w-72 overflow-y-auto p-0">
        {notifications.length === 0 ? (
          <p className="text-muted-foreground p-4 text-center text-xs">No notifications</p>
        ) : (
          <div className="divide-border divide-y">
            {notifications.slice(0, 10).map((n: any) => (
              <div key={n.id} className={`p-3 ${n.read ? "" : "bg-accent/5"}`}>
                <p className="text-xs font-medium">{n.title}</p>
                {n.body && <p className="text-muted-foreground mt-0.5 text-xs">{n.body}</p>}
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
