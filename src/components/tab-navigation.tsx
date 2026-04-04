"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home", icon: "⚔️" },
  { href: "/discover", label: "Discover", icon: "🔍" },
  { href: "/ai-arbiters", label: "Agents", icon: "🤖" },
  { href: "/create", label: "Create", icon: "+" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

export function TabNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-border bg-background/95 fixed right-0 bottom-0 left-0 z-50 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
      <div className="flex h-14 items-center justify-around">
        {tabs.map((tab) => {
          const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex h-full flex-1 flex-col items-center justify-center gap-0.5 text-xs transition-colors ${
                isActive ? "text-accent" : "text-muted-foreground"
              }`}
            >
              <span
                className={`text-lg ${tab.icon === "+" ? "bg-accent flex h-8 w-8 items-center justify-center rounded-full text-xl font-bold text-white" : ""}`}
              >
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
