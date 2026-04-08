export type DeviceTier = "high" | "medium" | "low";

export function getDeviceTier(gl?: WebGLRenderingContext | WebGL2RenderingContext): DeviceTier {
  if (typeof window === "undefined") return "low";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "low";

  const cores = navigator.hardwareConcurrency ?? 2;
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 2;

  // GPU renderer string detection
  if (gl) {
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      if (/Adreno \(TM\) [6-7]\d\d|Mali-G[7-9]\d|Apple GPU/i.test(renderer)) return "high";
      if (/Adreno \(TM\) [3-5]|Mali-G[5-6]|PowerVR/i.test(renderer)) return "medium";
    }
  }

  if (cores >= 8 && memory >= 8) return "high";
  if (cores >= 4 && memory >= 4) return "medium";
  return "low";
}
