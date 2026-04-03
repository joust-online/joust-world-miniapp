"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home", icon: "⚔️" },
  { href: "/discover", label: "Discover", icon: "🔍" },
  { href: "/leaderboard", label: "Ranks", icon: "🏆" },
  { href: "/create", label: "Create", icon: "+" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

export function TabNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs transition-colors ${
                isActive ? "text-accent" : "text-muted-foreground"
              }`}
            >
              <span className={`text-lg ${tab.icon === "+" ? "w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xl font-bold" : ""}`}>
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
