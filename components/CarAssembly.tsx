"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  ASSEMBLY_PARTS,
  lerpAssembly,
  UNIQUE_MODEL_PATHS,
  type AssemblyPartConfig,
} from "@/lib/assembly-config";
import { prepareModel, staggeredProgress } from "@/lib/model-utils";
import { useAssemblyProgress } from "@/context/AssemblyProgressContext";

UNIQUE_MODEL_PATHS.forEach((path) => useGLTF.preload(path));

function GltfPart({ path, config }: { path: string; config: AssemblyPartConfig }) {
  const { scene } = useGLTF(path);
  const prepared = useMemo(
    () => prepareModel(scene, config.id),
    [scene, config.id]
  );
  return <primitive object={prepared} />;
}

function AssemblyPart({
  config,
  globalProgress,
  index,
  total,
  idlePhase,
}: {
  config: AssemblyPartConfig;
  globalProgress: number;
  index: number;
  total: number;
  idlePhase: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const partProgress = staggeredProgress(globalProgress, index, total);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const floatOffset =
      Math.sin(idlePhase + index) * 0.04 * (1 - partProgress);

    const pos = lerpAssembly(
      config.startPosition,
      config.assembledPosition,
      partProgress
    );
    group.position.set(pos[0], pos[1] + floatOffset, pos[2]);

    const rotStart = config.startRotation;
    const rotEnd = config.assembledRotation;
    const ease = 1 - Math.pow(1 - partProgress, 4);
    group.rotation.set(
      rotStart[0] + (rotEnd[0] - rotStart[0]) * ease,
      rotStart[1] + (rotEnd[1] - rotStart[1]) * ease,
      rotStart[2] + (rotEnd[2] - rotStart[2]) * ease
    );

    const scale = config.assembledScale * (0.55 + 0.45 * ease);
    group.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      <GltfPart path={config.modelPath} config={config} />
    </group>
  );
}

export function CarAssembly() {
  const { progress, heroScrollProgress } = useAssemblyProgress();
  const assemblyProgress = Math.max(progress, heroScrollProgress);
  const rootRef = useRef<THREE.Group>(null);
  const idleRef = useRef(0);
  const sorted = useMemo(
    () => [...ASSEMBLY_PARTS].sort((a, b) => a.assemblyOrder - b.assemblyOrder),
    []
  );

  useFrame((_, delta) => {
    idleRef.current += delta;
    const root = rootRef.current;
    if (!root) return;

    if (assemblyProgress > 0.92) {
      root.rotation.y += delta * 0.15;
    } else {
      root.rotation.y = THREE.MathUtils.lerp(
        root.rotation.y,
        Math.sin(idleRef.current * 0.4) * 0.08,
        1 - Math.exp(-3 * delta)
      );
    }
  });

  return (
    <group ref={rootRef}>
      {sorted.map((part, i) => (
        <AssemblyPart
          key={part.id}
          config={part}
          globalProgress={assemblyProgress}
          index={i}
          total={sorted.length}
          idlePhase={i * 1.2}
        />
      ))}
    </group>
  );
}
