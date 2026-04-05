"use client";
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useAppConfig } from "@/lib/app-config";

// Precision-safe header for all shaders
const PRECISION_HEADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
`;

const vertex = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragment = PRECISION_HEADER + `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uSpeed;
  uniform float uIntensity;

  // Pre-compute UVs in varying to avoid dependent texture reads on mobile
  varying vec2 vUv;

  // Keep ALU instructions under 100-200 for low-end mobile GPUs
  void main() {
    vec2 uv = vUv;

    // Simple noise displacement (mediump-safe, no overflow)
    mediump float wave = sin(uv.x * 6.2832 + uTime * uSpeed) * 0.5 + 0.5;
    mediump float noise = sin(uv.y * 12.566 + uTime * uSpeed * 0.7) * uIntensity * 0.02;
    uv.x += noise;

    // Brand color gradient
    vec3 dark = vec3(0.075, 0.082, 0.09);
    vec3 accent = vec3(0.0, 0.35, 0.35);
    vec3 color = mix(dark, accent, smoothstep(0.2, 0.8, uv.y + wave * 0.1));

    // Subtle vignette
    mediump float vig = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5) * 1.8);
    color *= vig;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const rendererRef = useRef<Renderer | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Renderer with mobile-safe defaults ---
    const renderer = new Renderer({
      canvas,
      dpr: Math.min(window.devicePixelRatio, 2), // Cap at 2x
      alpha: true,
      antialias: false,           // MSAA too expensive on mobile
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
    rendererRef.current = renderer;
    const gl = renderer.gl;

    // --- Context loss handling (OGL has no built-in recovery) ---
    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(rafRef.current);
    };
    const onContextRestored = () => {
      // Must rebuild everything — all GL state is gone
      setupScene();
      startLoop();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    // --- Resize ---
    const resize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      if (program) {
        program.uniforms.uResolution.value = [
          gl.canvas.width,
          gl.canvas.height,
        ];
      }
    };

    // --- Scene setup ---
    let program: Program;
    let mesh: Mesh;

    function setupScene() {
      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [gl.canvas.width, gl.canvas.height] },
          uSpeed: { value: 1.0 },
          uIntensity: { value: 0.8 },
        },
      });
      mesh = new Mesh(gl, { geometry, program });
      resize();
    }

    // --- Animation loop with 30fps throttle & visibility pause ---
    let lastFrame = 0;
    const FRAME_INTERVAL = 1000 / 30; // 30fps for decorative effect

    function tick(t: number) {
      rafRef.current = requestAnimationFrame(tick);

      // Skip frames for 30fps throttle
      if (t - lastFrame < FRAME_INTERVAL) return;
      lastFrame = t;

      // Read config outside React (no re-render)
      const { shader } = useAppConfig.getState();
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uSpeed.value = shader.speed;
      program.uniforms.uIntensity.value = shader.intensity;

      renderer.render({ scene: mesh });
    }

    function startLoop() {
      rafRef.current = requestAnimationFrame(tick);
    }

    // --- Visibility API: pause when hidden ---
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // --- Init ---
    setupScene();
    startLoop();
    window.addEventListener("resize", resize);

    // --- Cleanup: dispose EVERYTHING ---
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      // OGL cleanup
      mesh?.geometry?.remove();
      program?.remove();
      renderer?.gl?.getExtension("WEBGL_lose_context")?.loseContext();
      rendererRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ touchAction: "none" }} // Prevent scroll conflicts in webview
    />
  );
}
