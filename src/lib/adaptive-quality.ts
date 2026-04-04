export class AdaptiveQuality {
  private targetFrameTime: number;
  private frameTimes: number[] = [];
  public currentDPR: number;
  private cooldown = 0;

  constructor(targetFPS = 30) {
    this.targetFrameTime = 1000 / targetFPS;
    this.currentDPR = Math.min(devicePixelRatio, 2);
  }

  update(dt: number): boolean {
    this.frameTimes.push(dt);
    if (this.frameTimes.length > 30) this.frameTimes.shift();
    if (this.cooldown-- > 0 || this.frameTimes.length < 30) return false;

    const avg = this.frameTimes.reduce((a, b) => a + b) / 30;
    let changed = false;

    if (avg > this.targetFrameTime * 1.2 && this.currentDPR > 0.75) {
      this.currentDPR -= 0.25; // Drop aggressively
      this.cooldown = 60;
      changed = true;
    } else if (avg < this.targetFrameTime * 0.8 && this.currentDPR < 2) {
      this.currentDPR += 0.125; // Raise gradually (hysteresis)
      this.cooldown = 90;
      changed = true;
    }
    return changed;
  }
}
