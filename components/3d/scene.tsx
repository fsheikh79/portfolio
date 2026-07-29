"use client";

import { useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { BufferAttribute, BufferGeometry } from "three";

type Shape = "box" | "sphere" | "cylinder" | "icosahedron" | "torus";

interface TechNode {
  name: string;
  color: string;
  position: [number, number, number];
  shape: Shape;
  size: number;
  spin: [number, number, number];
}

const NODES: TechNode[] = [
  { name: "AWS",       color: "#FF9900", position: [ 2.4,  0.6,  0.2], shape: "box",          size: 0.42, spin: [0.10, 0.16, 0.00] },
  { name: "Terraform", color: "#7B42BC", position: [-2.2,  0.9, -0.4], shape: "box",          size: 0.40, spin: [0.14, 0.10, 0.02] },
  { name: "Docker",    color: "#2496ED", position: [ 1.6, -1.2, -1.1], shape: "cylinder",     size: 0.36, spin: [0.00, 0.22, 0.00] },
  { name: "K8s",       color: "#326CE5", position: [-1.9, -0.9, -1.2], shape: "icosahedron",  size: 0.44, spin: [0.14, 0.20, 0.05] },
  { name: "GitHub",    color: "#8B949E", position: [ 0.1,  1.7,  0.4], shape: "sphere",       size: 0.34, spin: [0.06, 0.14, 0.00] },
  { name: "Python",    color: "#FFD343", position: [-0.6, -1.7,  0.6], shape: "torus",        size: 0.40, spin: [0.16, 0.10, 0.08] },
  { name: "Linux",     color: "#F5A623", position: [ 1.0,  1.1,  1.6], shape: "sphere",       size: 0.32, spin: [0.10, 0.14, 0.00] },
];

function NodeGeometry({ shape, size }: { shape: Shape; size: number }) {
  switch (shape) {
    case "box":
      return <boxGeometry args={[size * 1.4, size * 1.4, size * 1.4]} />;
    case "sphere":
      return <sphereGeometry args={[size, 24, 24]} />;
    case "cylinder":
      return <cylinderGeometry args={[size * 0.75, size * 0.75, size * 1.6, 20]} />;
    case "icosahedron":
      return <icosahedronGeometry args={[size, 0]} />;
    case "torus":
      return <torusGeometry args={[size * 0.75, size * 0.28, 12, 24]} />;
  }
}

function TechNodeMesh({ node, index }: { node: TechNode; index: number }) {
  const ref = useRef<Mesh>(null);
  const bobOffset = index * 0.9;

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    mesh.rotation.x = t * node.spin[0] + index;
    mesh.rotation.y = t * node.spin[1] + index * 0.5;
    mesh.rotation.z = t * node.spin[2];
    mesh.position.y = node.position[1] + Math.sin(t * 0.55 + bobOffset) * 0.14;
    mesh.position.x = node.position[0] + Math.cos(t * 0.35 + bobOffset) * 0.08;
  });

  return (
    <mesh ref={ref} position={node.position}>
      <NodeGeometry shape={node.shape} size={node.size} />
      <meshStandardMaterial
        color={node.color}
        emissive={node.color}
        emissiveIntensity={0.35}
        roughness={0.45}
        metalness={0.15}
      />
    </mesh>
  );
}

function CentralHub() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    mesh.rotation.x = t * 0.12;
    mesh.rotation.y = t * 0.18;
    const s = 1 + Math.sin(t * 1.4) * 0.05;
    mesh.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.55, 1]} />
      <meshStandardMaterial
        color="#22D3EE"
        emissive="#22D3EE"
        emissiveIntensity={0.65}
        wireframe
      />
    </mesh>
  );
}

function ConnectionLine({ target, color }: { target: [number, number, number]; color: string }) {
  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    const positions = new Float32Array([0, 0, 0, target[0], target[1], target[2]]);
    g.setAttribute("position", new BufferAttribute(positions, 3));
    return g;
  }, [target]);

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={0.22} />
    </line>
  );
}

function ParallaxGroup({ children }: { children: ReactNode }) {
  const groupRef = useRef<Group>(null);
  const { pointer } = useThree();
  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const targetY = pointer.x * 0.28;
    const targetX = -pointer.y * 0.18;
    g.rotation.y += (targetY - g.rotation.y) * 0.04;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
  });
  return <group ref={groupRef}>{children}</group>;
}

export function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 4, 5]} intensity={1.1} color="#22D3EE" />
      <pointLight position={[-5, -3, 2]} intensity={0.55} color="#8B5CF6" />
      <pointLight position={[0, 5, -4]} intensity={0.35} color="#C026D3" />

      <ParallaxGroup>
        <CentralHub />
        {NODES.map((node) => (
          <ConnectionLine key={`line-${node.name}`} target={node.position} color={node.color} />
        ))}
        {NODES.map((node, i) => (
          <TechNodeMesh key={node.name} node={node} index={i} />
        ))}
      </ParallaxGroup>
    </Canvas>
  );
}
