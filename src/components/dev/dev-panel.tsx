"use client";
import { useAppConfig } from "@/lib/app-config";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export function DevPanel() {
  const config = useAppConfig();
  if (process.env.NODE_ENV === "production") return null;

  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-4 right-4 z-50 rounded-full bg-primary text-primary-foreground w-10 h-10 text-sm font-mono">
        ⚙
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] overflow-y-auto space-y-6 pt-8">
        <h3 className="font-semibold text-sm">Shader</h3>
        <label className="text-xs text-muted-foreground">Speed: {config.shader.speed.toFixed(1)}</label>
        <Slider min={0} max={5} step={0.1}
          value={[config.shader.speed]}
          onValueChange={([v]) => config.update("shader.speed", v)} />
        <label className="text-xs text-muted-foreground">Intensity: {config.shader.intensity.toFixed(2)}</label>
        <Slider min={0} max={1} step={0.01}
          value={[config.shader.intensity]}
          onValueChange={([v]) => config.update("shader.intensity", v)} />

        <h3 className="font-semibold text-sm">Animation</h3>
        <label className="text-xs text-muted-foreground">Duration: {config.animation.duration}ms</label>
        <Slider min={50} max={800} step={25}
          value={[config.animation.duration]}
          onValueChange={([v]) => config.update("animation.duration", v)} />

        <h3 className="font-semibold text-sm">Quality</h3>
        <label className="text-xs text-muted-foreground">DPR Cap: {config.quality.dpr.toFixed(2)}</label>
        <Slider min={0.5} max={3} step={0.25}
          value={[config.quality.dpr]}
          onValueChange={([v]) => config.update("quality.dpr", v)} />

        <h3 className="font-semibold text-sm">Features</h3>
        {(Object.entries(config.features) as [string, boolean][]).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-xs font-mono">{key}</span>
            <Switch checked={val}
              onCheckedChange={(v) => config.update(`features.${key}`, v)} />
          </div>
        ))}

        <div className="flex gap-2 pt-4">
          <Button size="sm" variant="outline" onClick={() =>
            navigator.clipboard.writeText(JSON.stringify(useAppConfig.getState(), null, 2))
          }>
            Copy JSON
          </Button>
          <Button size="sm" variant="destructive" onClick={config.reset}>
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
