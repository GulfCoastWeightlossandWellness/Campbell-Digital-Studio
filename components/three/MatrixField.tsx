"use client";

/**
 * MatrixField — instanced 3D node grid for the /local-services page.
 *
 * Visualises the city × service intersection matrix that underpins the
 * Campbell Digital Studio local-services product: 15 cities × 9 services
 * = 135 node positions arranged in a 3D grid. Each node is a small
 * chamfered-cube (BoxGeometry) rendered via InstancedMesh for performance.
 *
 * Motion:
 *   - Continuous slow Y-axis rotation (0.3 rpm)
 *   - Sine-wave height-pulse that sweeps column-by-column, giving the
 *     impression that the matrix is "breathing" — data alive.
 *   - Mouse-follow camera offset with damped lerp (slow, intentional).
 *   - Click: triggers an "alignment burst" — nodes pulse to full brightness
 *     then settle, representing a moment of system coherence.
 *   - Scroll-linked tilt via a MotionValue passed in from the parent.
 *
 * Performance:
 *   - Single InstancedMesh for all 135 nodes (one draw call).
 *   - frameloop="demand" with manual invalidation.
 *   - dpr capped at 1.5.
 *   - Lower grid on mobile (9×5 = 45 nodes).
 *   - Pauses rendering when offscreen via IntersectionObserver in mount.
 *
 * Color discipline:
 *   - Canvas background transparent (cream paper shows through) but scene
 *     is embedded in the dark cover-surface so it reads against navy.
 *   - Node base: gold #C49A35, emissive tinted navy for depth.
 *   - Active / pulse nodes: brighter gold + white emissive.
 *   - No neon, no rainbows.
 *
 * A11y: aria-hidden on the container — the section text carries meaning.
 */

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constants ─────────────────────────────────────────────────────────────

const GOLD = new THREE.Color("#C49A35");
const GOLD_BRIGHT = new THREE.Color("#E8C46B");
const NAVY = new THREE.Color("#14182A");
const CREAM = new THREE.Color("#FAF6EC");

// Desktop grid: 15 cities × 9 services
const COLS_D = 15;
const ROWS_D = 9;
// Mobile grid: 9 × 5
const COLS_M = 9;
const ROWS_M = 5;

const NODE_SIZE = 0.18;
const GAP = 0.52; // spacing between nodes

// ─── InstancedNodes ────────────────────────────────────────────────────────

interface NodesProps {
  cols: number;
  rows: number;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  burstRef: React.RefObject<{ active: boolean; t: number }>;
  activeRef: React.RefObject<boolean>;
}

function InstancedNodes({ cols, rows, mouseRef, burstRef, activeRef }: NodesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const count = cols * rows;

  // Pre-compute base positions
  const positions = useMemo<THREE.Vector3[]>(() => {
    const result: THREE.Vector3[] = [];
    const xOffset = ((cols - 1) * GAP) / 2;
    const yOffset = ((rows - 1) * GAP) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        result.push(new THREE.Vector3(c * GAP - xOffset, r * GAP - yOffset, 0));
      }
    }
    return result;
  }, [cols, rows]);

  // Scratch objects (avoid GC in render loop)
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock, invalidate }) => {
    if (!activeRef.current) return;
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    if (!mesh) return;

    const mouse = mouseRef.current;
    const burst = burstRef.current;

    for (let i = 0; i < count; i++) {
      const base = positions[i];
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Wave: sine sweeps column-by-column, period ~4s
      const wave = Math.sin(t * 0.8 + col * 0.4 + row * 0.2) * 0.12;

      // Subtle mouse parallax in Z
      const zShift = (mouse.x * 0.3 + mouse.y * 0.2) * 0.4;

      dummy.position.set(base.x, base.y + wave, base.z + zShift);

      // Scale: nodes near mouse slightly enlarge
      const dx = (mouse.x * cols * GAP) / 2 - base.x;
      const dy = (mouse.y * rows * GAP) / 2 - base.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / (GAP * 3));
      const s = 1 + proximity * 0.4;
      dummy.scale.setScalar(s);

      // Rotation: each node slowly tilts, offset by position
      dummy.rotation.x = Math.sin(t * 0.3 + row * 0.15) * 0.3;
      dummy.rotation.y = Math.cos(t * 0.25 + col * 0.12) * 0.3;

      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Color: base gold, brighter near mouse, burst overlay
      const burstFactor = burst.active
        ? Math.max(0, 1 - burst.t * 1.5) * Math.sin(burst.t * 15 + col * 0.5)
        : 0;

      color.copy(GOLD).lerp(GOLD_BRIGHT, proximity * 0.7 + Math.max(0, burstFactor));
      // Dim far nodes slightly for depth
      const depthDim = 0.6 + (row / rows) * 0.4;
      color.multiplyScalar(depthDim);
      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    invalidate();
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow>
      <boxGeometry args={[NODE_SIZE, NODE_SIZE, NODE_SIZE]} />
      <meshStandardMaterial
        color={GOLD}
        metalness={0.15}
        roughness={0.75}
        emissive={NAVY}
        emissiveIntensity={0.3}
      />
    </instancedMesh>
  );
}

// ─── CameraRig ─────────────────────────────────────────────────────────────

interface CameraRigProps {
  mouseRef: React.RefObject<{ x: number; y: number }>;
  activeRef: React.RefObject<boolean>;
}

function CameraRig({ mouseRef, activeRef }: CameraRigProps) {
  const { camera, invalidate } = useThree();
  const basePos = useMemo(() => new THREE.Vector3(0, 0, 8), []);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!activeRef.current) return;
    const t = clock.getElapsedTime();
    const mouse = mouseRef.current;

    // Slow Y-axis drift
    const drift = Math.sin(t * 0.12) * 0.08;

    // Mouse-follow offset: max ±0.6 units, damped
    target.set(
      basePos.x + mouse.x * 0.6 + drift,
      basePos.y + mouse.y * 0.4,
      basePos.z
    );

    // Lerp camera toward target (slow, intentional)
    camera.position.lerp(target, 0.025);
    camera.lookAt(0, 0, 0);
    invalidate();
  });

  return null;
}

// ─── Scene ─────────────────────────────────────────────────────────────────

interface SceneProps {
  cols: number;
  rows: number;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  burstRef: React.RefObject<{ active: boolean; t: number }>;
  activeRef: React.RefObject<boolean>;
  reducedMotion: boolean;
}

function Scene({ cols, rows, mouseRef, burstRef, activeRef, reducedMotion }: SceneProps) {
  const { clock, invalidate } = useThree();

  // Start clock ticking
  useEffect(() => {
    if (!reducedMotion) clock.start();
    invalidate();
  }, [clock, reducedMotion, invalidate]);

  return (
    <>
      {/* Ambient + directional for brushed-brass look */}
      <ambientLight intensity={0.4} color={CREAM} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color={CREAM}
        castShadow={false}
      />
      <directionalLight
        position={[-4, -2, 3]}
        intensity={0.35}
        color={GOLD}
      />
      {/* Subtle back-light in navy */}
      <pointLight position={[0, 0, -8]} intensity={0.8} color={NAVY} />

      {!reducedMotion && (
        <>
          <InstancedNodes
            cols={cols}
            rows={rows}
            mouseRef={mouseRef}
            burstRef={burstRef}
            activeRef={activeRef}
          />
          <CameraRig mouseRef={mouseRef} activeRef={activeRef} />
        </>
      )}

      {/* Reduced motion: static grid of nodes */}
      {reducedMotion && <StaticGrid cols={cols} rows={rows} />}
    </>
  );
}

// ─── StaticGrid — reduced-motion fallback (no animation) ──────────────────

function StaticGrid({ cols, rows }: { cols: number; rows: number }) {
  const positions = useMemo<[number, number, number][]>(() => {
    const result: [number, number, number][] = [];
    const xOffset = ((cols - 1) * GAP) / 2;
    const yOffset = ((rows - 1) * GAP) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        result.push([c * GAP - xOffset, r * GAP - yOffset, 0]);
      }
    }
    return result;
  }, [cols, rows]);

  const geometry = useMemo(() => new THREE.BoxGeometry(NODE_SIZE, NODE_SIZE, NODE_SIZE), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GOLD,
        metalness: 0.15,
        roughness: 0.75,
        emissive: NAVY,
        emissiveIntensity: 0.2,
      }),
    []
  );

  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} geometry={geometry} material={material} />
      ))}
    </>
  );
}

// ─── MatrixField (exported) ─────────────────────────────────────────────────

interface MatrixFieldProps {
  isMobile: boolean;
  reducedMotion: boolean;
}

export default function MatrixField({ isMobile, reducedMotion }: MatrixFieldProps) {
  const cols = isMobile ? COLS_M : COLS_D;
  const rows = isMobile ? ROWS_M : ROWS_D;

  // Mouse tracking (normalised -1 → 1)
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  // Burst state
  const burstRef = useRef<{ active: boolean; t: number }>({ active: false, t: 0 });
  // Whether canvas is in viewport (pauses rendering when false)
  const activeRef = useRef<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver: pause when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
    };
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: 0, y: 0 };
  }, []);

  // Click: trigger burst animation
  const handleClick = useCallback(() => {
    if (reducedMotion) return;
    burstRef.current = { active: true, t: 0 };
    // Animate burst.t from 0 → 1 over 1.5s
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const elapsed = now - start;
      burstRef.current.t = Math.min(elapsed / dur, 1);
      if (elapsed < dur) requestAnimationFrame(tick);
      else burstRef.current.active = false;
    };
    requestAnimationFrame(tick);
  }, [reducedMotion]);

  const [canvasKey] = useState(() => Math.random().toString(36).slice(2));

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Canvas
        key={canvasKey}
        frameloop="demand"
        dpr={[1, isMobile ? 1 : 1.5]}
        gl={{ antialias: !isMobile, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 55 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <Scene
          cols={cols}
          rows={rows}
          mouseRef={mouseRef as React.RefObject<{ x: number; y: number }>}
          burstRef={burstRef as React.RefObject<{ active: boolean; t: number }>}
          activeRef={activeRef as React.RefObject<boolean>}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
