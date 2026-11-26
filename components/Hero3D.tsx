"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function seedParticle(
  index: number,
  positions: Float32Array,
  speeds: Float32Array,
  spread: boolean,
) {
  const i = index * 3;
  positions[i] = (Math.random() - 0.5) * (spread ? 3.2 : 1.15);
  positions[i + 1] = spread ? Math.random() * 2.4 - 0.8 : 0.2 - Math.random() * 1.5;
  positions[i + 2] = spread ? (Math.random() - 0.5) * 1.4 : 0.42 + Math.random() * 0.15;
  speeds[index] = 0.45 + Math.random() * 0.7;
}

function ColdAir() {
  const points = useRef<THREE.Points>(null);
  const count = 80;
  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) seedParticle(i, positions, speeds, false);
    return { positions, speeds };
  }, []);

  useFrame((_, delta) => {
    const geom = points.current?.geometry;
    const attr = geom?.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (!attr) return;
    const array = attr.array as Float32Array;
    for (let i = 0; i < count; i += 1) {
      array[i * 3 + 1] -= data.speeds[i] * delta;
      array[i * 3 + 2] += delta * 0.12;
      if (array[i * 3 + 1] < -1.35) seedParticle(i, array, data.speeds, false);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#dff7ff" size={0.045} transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

function Snow() {
  const points = useRef<THREE.Points>(null);
  const count = 50;
  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) seedParticle(i, positions, speeds, true);
    return { positions, speeds };
  }, []);

  useFrame((_, delta) => {
    const attr = points.current?.geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (!attr) return;
    const array = attr.array as Float32Array;
    for (let i = 0; i < count; i += 1) {
      array[i * 3 + 1] -= data.speeds[i] * delta * 0.35;
      if (array[i * 3 + 1] < -1.2) {
        array[i * 3 + 1] = 1.5;
        array[i * 3] = (Math.random() - 0.5) * 3.2;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.035} transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

function SplitUnit() {
  const rig = useRef<THREE.Group>(null);
  const flap = useRef<THREE.Mesh>(null);
  const gyro = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onOrientation = (event: DeviceOrientationEvent) => {
      gyro.current.y = THREE.MathUtils.clamp((event.gamma ?? 0) / 50, -0.6, 0.6);
      gyro.current.x = THREE.MathUtils.clamp((event.beta ?? 45 - 45) / 70, -0.35, 0.35);
    };
    window.addEventListener("deviceorientation", onOrientation);
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, []);

  useFrame((state, delta) => {
    const group = rig.current;
    if (!group) return;
    const targetY = state.pointer.x * 0.45 + gyro.current.y + Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
    const targetX = -state.pointer.y * 0.18 + gyro.current.x * 0.2;
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 3.2, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 3.2, delta);
    group.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.04;
    if (flap.current) {
      flap.current.rotation.x = -0.35 + Math.sin(state.clock.elapsedTime * 1.6) * 0.12;
    }
  });

  return (
    <group ref={rig}>
      <RoundedBox args={[1.95, 0.62, 0.48]} radius={0.1} smoothness={3} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#f4fbff" roughness={0.32} metalness={0.04} />
      </RoundedBox>
      <mesh position={[0, -0.02, 0.25]}>
        <boxGeometry args={[1.62, 0.2, 0.02]} />
        <meshStandardMaterial color="#10283a" roughness={0.6} />
      </mesh>
      {[-0.06, -0.01, 0.04, 0.09].map((y) => (
        <mesh key={y} position={[0, y, 0.265]}>
          <boxGeometry args={[1.5, 0.012, 0.01]} />
          <meshStandardMaterial color="#8fd0e4" />
        </mesh>
      ))}
      <mesh ref={flap} position={[0, -0.22, 0.28]}>
        <boxGeometry args={[1.62, 0.05, 0.08]} />
        <meshStandardMaterial color="#e7f6fb" />
      </mesh>
      <mesh position={[0.68, 0.28, 0.25]}>
        <planeGeometry args={[0.32, 0.12]} />
        <meshBasicMaterial color="#10283a" />
      </mesh>
      <mesh position={[-0.78, 0.28, 0.25]}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color="#3ee0ff" />
      </mesh>
      <ColdAir />
      <Snow />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[2.5, 3, 4]} intensity={2.2} />
      <pointLight position={[-1.5, 0.4, 2]} color="#8ae7ff" intensity={6} distance={6} />
      <SplitUnit />
    </>
  );
}

export default function Hero3D() {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={host} className="h-full w-full" aria-hidden="true">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.12, 3.7], fov: 32 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
