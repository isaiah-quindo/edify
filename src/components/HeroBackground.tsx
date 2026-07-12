"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERTEX_SHADER = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// Animated take on the brand key visual: deep ink navy with drifting
// electric-blue and crimson blooms, domain-warped by fbm noise.
// The cursor drags a lens warp and a hue-shifting energy glow around.
const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uMouseStrength;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = uTime * 0.16;

  // Domain warp for the fluid, smoky movement
  vec2 q = vec2(fbm(p * 1.3 + t * 0.5), fbm(p * 1.3 - t * 0.35));
  vec2 w = p + (q - 0.5) * 0.6;

  // Cursor stir: swirls the field around the pointer like stirring smoke.
  // A rotation has no singularity at its center, so there is no "sucking
  // dot" — just a soft vortex with a gentle outward bulge.
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  vec2 rel = w - m;
  float md = length(rel);
  float fall = exp(-md * md * 5.0);
  float ang = 1.1 * uMouseStrength * fall;
  float ca = cos(ang);
  float sa = sin(ang);
  w = m + vec2(rel.x * ca - rel.y * sa, rel.x * sa + rel.y * ca)
        * (1.0 + 0.12 * uMouseStrength * fall);

  vec3 ink     = vec3(0.016, 0.024, 0.102);
  vec3 navy    = vec3(0.043, 0.075, 0.300);
  vec3 royal   = vec3(0.100, 0.190, 0.950);
  vec3 crimson = vec3(0.900, 0.060, 0.240);
  vec3 cherry  = vec3(1.000, 0.140, 0.310);

  vec3 col = ink;

  // Broad navy wash
  col = mix(col, navy, smoothstep(0.9, 0.1, distance(w, vec2(aspect * 0.4, 0.5))));

  // Electric blue — drifts around the left half
  vec2 cb = vec2(aspect * 0.18 + 0.14 * sin(t * 1.2), 0.45 + 0.20 * cos(t * 0.9));
  col = mix(col, royal, 0.85 * smoothstep(0.95, 0.0, distance(w, cb)));

  // Crimson bloom — upper right
  vec2 cr = vec2(aspect * 0.85 + 0.11 * cos(t * 0.7), 0.75 + 0.16 * sin(t * 1.1));
  col = mix(col, crimson, 0.9 * smoothstep(0.85, 0.0, distance(w, cr)));

  // Cherry streak — lower right
  vec2 cc = vec2(aspect * 0.95 + 0.08 * sin(t * 0.9), 0.20 + 0.13 * cos(t * 1.4));
  col = mix(col, cherry, 0.7 * smoothstep(0.75, 0.0, distance(w, cc)));

  // Dark mass behind the headline for legibility
  col = mix(col, ink, 0.65 * smoothstep(0.75, 0.0, distance(w, vec2(aspect * 0.55, 0.62))));

  // Cursor energy glow — broad, soft light that breathes between blue and cherry
  float glow = uMouseStrength * smoothstep(0.65, 0.0, md);
  vec3 energy = mix(royal, cherry, 0.5 + 0.5 * sin(uTime * 0.8));
  col += energy * glow * glow * 0.3;

  // Fine grain to prevent banding
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.02;

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return; // No WebGL — the static CSS gradient stays as fallback
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseStrength: { value: 0 },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    // The gradient is soft — render under-resolution for cheap frames
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h);
      material.uniforms.uRes.value.set(w * dpr, h * dpr);
    };
    resize();

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity 1.2s ease";
    container.appendChild(canvas);

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    // Pointer tracking with eased trailing — listens on the hero section so
    // hovering anywhere over the content drives the shader.
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, s: 0, ts: 0 };
    const hoverTarget = container.parentElement ?? container;

    const onPointerMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      pointer.tx = (e.clientX - r.left) / r.width;
      pointer.ty = 1 - (e.clientY - r.top) / r.height;
      pointer.ts = 1;
    };
    const onPointerLeave = () => {
      pointer.ts = 0;
    };
    hoverTarget.addEventListener("pointermove", onPointerMove);
    hoverTarget.addEventListener("pointerleave", onPointerLeave);

    const start = performance.now();
    let raf = 0;
    const renderFrame = () => {
      material.uniforms.uTime.value = (performance.now() - start) / 1000;

      // Trail behind the cursor; ramp in quickly, fade out slowly
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      pointer.s += (pointer.ts - pointer.s) * (pointer.ts > pointer.s ? 0.08 : 0.03);
      material.uniforms.uMouse.value.set(pointer.x, pointer.y);
      material.uniforms.uMouseStrength.value = pointer.s;

      renderer.render(scene, camera);
    };

    // First paint, then fade the canvas in over the CSS gradient
    renderFrame();
    raf = requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reduceMotion) {
      const loop = () => {
        renderFrame();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      hoverTarget.removeEventListener("pointermove", onPointerMove);
      hoverTarget.removeEventListener("pointerleave", onPointerLeave);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 -z-20 overflow-hidden"
    />
  );
}
