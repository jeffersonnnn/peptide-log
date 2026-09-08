"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";

/*
 * Topology-style chrome ripple. One fixed WebGL canvas sits behind every
 * section: concentric liquid-metal rings that catch a faint thin-film tint,
 * brightest at the top of the page and fading to graphite as you scroll.
 * The pointer nudges the ring centre.
 */
const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uDim;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 c = vec2(0.28, 0.12) + (uMouse - 0.5) * vec2(0.12, -0.08);
  float d = length(uv - c);

  /* Concentric rings, slowly breathing outward. */
  float ring = sin(d * 26.0 - uTime * 0.55);
  float ring2 = sin(d * 9.0 - uTime * 0.25 + 1.7);
  float m = ring * 0.65 + ring2 * 0.35;

  /* Chrome ramp: graphite in the troughs, silver on the crests. */
  float chrome = smoothstep(-0.9, 0.9, m);
  chrome = pow(chrome, 1.6);

  /* Thin-film tint on the crests: steel blue, warm bone, back to steel. */
  float phase = d * 26.0 - uTime * 0.55;
  vec3 steel = vec3(0.655, 0.706, 0.729);
  vec3 bone = vec3(0.894, 0.886, 0.847);
  vec3 tint = mix(steel, bone, 0.5 + 0.5 * sin(phase * 0.5));

  vec3 base = vec3(0.082);
  vec3 col = mix(base, tint, chrome);

  /* Bright core near the ring centre, dark vignette at the edges. */
  float core = smoothstep(1.1, 0.0, d);
  col = mix(base, col, 0.35 + 0.65 * core);

  /* Fade to graphite once the reader leaves the hero, and keep inner pages
     (where text sits over the canvas) much quieter than the landing hero. */
  float depth = clamp(uScroll, 0.0, 1.0);
  col = mix(col, base, max(depth * 0.85, uDim));

  /* Film grain, Topology-style. */
  float g = hash(gl_FragCoord.xy + fract(uTime)) - 0.5;
  col += g * 0.035;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function ChromeRipple() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  /* Read inside the render loop without re-creating the GL context on route change. */
  const dimRef = useRef(0);
  dimRef.current = pathname === "/" ? 0 : 0.72;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uScroll = gl.getUniformLocation(prog, "uScroll");
    const uDim = gl.getUniformLocation(prog, "uDim");

    const mouse = { x: 0.5, y: 0.5 };
    let target = { x: 0.5, y: 0.5 };
    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const onMove = (e: PointerEvent) => {
      target = { x: e.clientX / window.innerWidth, y: 1 - e.clientY / window.innerHeight };
    };

    const frame = (now: number) => {
      mouse.x += (target.x - mouse.x) * 0.04;
      mouse.y += (target.y - mouse.y) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce ? 0 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uScroll, window.scrollY / window.innerHeight);
      gl.uniform1f(uDim, dimRef.current);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    if (reduce) {
      frame(start);
      window.addEventListener("scroll", () => frame(start), { passive: true });
    } else {
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="chrome-canvas pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
