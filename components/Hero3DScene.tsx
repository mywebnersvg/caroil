"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Grid,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { CarAssembly } from "./CarAssembly";
import { useAssemblyProgress } from "@/context/AssemblyProgressContext";

function CameraRig() {
  const { camera, pointer, size } = useThree();
  const target = useRef(new THREE.Vector3());
  const lookAt = useRef(new THREE.Vector3(0, 0.35, 0));
  const { heroScrollProgress } = useAssemblyProgress();

  useFrame((_, delta) => {
    const isMobile = size.width < 768;
    const scrollAngle = heroScrollProgress * Math.PI * 0.4;
    const radius = isMobile ? 6.8 : 5.8;
    const baseX = Math.sin(scrollAngle) * radius;
    const baseZ = Math.cos(scrollAngle) * radius;
    const baseY = (isMobile ? 1.8 : 1.5) + heroScrollProgress * 0.9;

    const parallaxStrength = isMobile ? 0.35 : 0.7;
    target.current.set(
      baseX + pointer.x * parallaxStrength,
      baseY + pointer.y * (isMobile ? 0.15 : 0.3),
      baseZ + pointer.x * 0.25
    );
    lookAt.current.set(0, 0.35 + pointer.y * 0.12, 0);

    camera.position.lerp(target.current, 1 - Math.exp(-3.5 * delta));
    camera.lookAt(lookAt.current);
  });

  return null;
}

function GarageEnvironment() {
  return (
    <Environment
      files="/hdri/garage_interior_1k.hdr"
      background={false}
      environmentIntensity={1.1}
    />
  );
}

function GarageFloor() {
  return (
    <group position={[0, -0.01, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[14, 64]} />
        <meshStandardMaterial
          color="#0a0c10"
          metalness={0.55}
          roughness={0.55}
        />
      </mesh>
      <Grid
        infiniteGrid
        fadeDistance={16}
        fadeStrength={1.4}
        cellSize={0.45}
        sectionSize={2.25}
        cellColor="#152238"
        sectionColor="#2d4a72"
        position={[0, 0.005, 0]}
      />
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 12, 6]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={28}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
      />
      <spotLight
        position={[-5, 7, 3]}
        angle={0.45}
        penumbra={0.9}
        intensity={2.2}
        color="#3b9eff"
        castShadow
      />
      <spotLight
        position={[5, 6, -4]}
        angle={0.4}
        penumbra={1}
        intensity={1.4}
        color="#ff6b2c"
      />
      <pointLight position={[0, 2.5, 0]} intensity={0.35} color="#6ec4ff" />
    </>
  );
}

function ResponsiveCamera() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, isMobile ? 2 : 1.5, isMobile ? 7 : 5.8]}
      fov={isMobile ? 48 : 42}
    />
  );
}

function SceneContent() {
  return (
    <>
      <ResponsiveCamera />
      <CameraRig />
      <SceneLights />
      <Suspense fallback={null}>
        <GarageEnvironment />
        <CarAssembly />
      </Suspense>
      <GarageFloor />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.6}
        scale={14}
        blur={2.8}
        far={7}
      />
    </>
  );
}

function LoaderBridge({ onLoaded }: { onLoaded: () => void }) {
  const { progress, active } = useProgress();
  const called = useRef(false);

  useEffect(() => {
    if (!active && progress === 100 && !called.current) {
      called.current = true;
      onLoaded();
    }
  }, [active, progress, onLoaded]);

  return null;
}

interface Hero3DSceneProps {
  onModelsReady?: () => void;
}

function AdaptiveDpr() {
  const { size, gl } = useThree();
  useEffect(() => {
    const dpr = size.width < 768 ? Math.min(window.devicePixelRatio, 1.25) : Math.min(window.devicePixelRatio, 1.75);
    gl.setPixelRatio(dpr);
  }, [size.width, gl]);
  return null;
}

export function Hero3DScene({ onModelsReady }: Hero3DSceneProps) {
  return (
    <div className="absolute inset-0 touch-none">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <AdaptiveDpr />
        <color attach="background" args={["#050608"]} />
        <fog attach="fog" args={["#050608", 7, 20]} />
        {onModelsReady && <LoaderBridge onLoaded={onModelsReady} />}
        <SceneContent />
      </Canvas>
    </div>
  );
}
