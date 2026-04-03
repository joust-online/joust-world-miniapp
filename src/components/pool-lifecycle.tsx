interface PoolLifecycleProps {
  state: string;
}

const STATES = ["PENDING_ARBITER", "ACTIVE", "CLOSED", "SETTLED"];

export function PoolLifecycle({ state }: PoolLifecycleProps) {
  const isRefunded = state === "REFUNDED";
  const currentIdx = STATES.indexOf(state);

  if (isRefunded) {
    return (
      <div className="flex items-center gap-1 text-xs">
        <span className="text-muted-foreground">Refunded</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {STATES.map((s, i) => {
        const isComplete = i <= currentIdx;
        const isCurrent = i === currentIdx;
        return (
          <div key={s} className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                isCurrent ? "bg-accent" : isComplete ? "bg-accent/50" : "bg-muted"
              }`}
            />
            <span className={`text-[10px] ${isCurrent ? "text-accent font-medium" : "text-muted-foreground"}`}>
              {s === "PENDING_ARBITER" ? "Pending" : s === "ACTIVE" ? "Active" : s === "CLOSED" ? "Closed" : "Settled"}
            </span>
            {i < STATES.length - 1 && (
              <div className={`w-4 h-px ${isComplete && i < currentIdx ? "bg-accent/50" : "bg-muted"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
