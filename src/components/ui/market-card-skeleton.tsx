export function MarketCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex justify-between">
        <div className="h-5 w-16 rounded-md bg-muted animate-pulse" />
        <div className="h-5 w-20 rounded-md bg-muted animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-muted animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
      </div>
      <div className="h-8 w-full rounded-full bg-muted animate-pulse" />
      <div className="flex gap-2">
        <div className="h-11 flex-1 rounded-lg bg-muted animate-pulse" />
        <div className="h-11 flex-1 rounded-lg bg-muted animate-pulse" />
      </div>
    </div>
  );
}
