import * as THREE from "three";
import type { PartId } from "./assembly-config";

const TARGET_SIZES: Partial<Record<PartId, number>> = {
  chassis: 4.2,
  engine: 1.2,
  wheel_fl: 0.85,
  wheel_fr: 0.85,
  wheel_rl: 0.85,
  wheel_rr: 0.85,
  brake_fl: 0.55,
  brake_fr: 0.55,
  oil_filter: 0.35,
};

export function prepareModel(
  object: THREE.Object3D,
  partId: PartId
): THREE.Object3D {
  const clone = object.clone(true);

  clone.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];
        mats.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.envMapIntensity = 1.2;
            mat.needsUpdate = true;
          }
        });
      }
    }
  });

  const target = TARGET_SIZES[partId] ?? 1;
  const box = new THREE.Box3().setFromObject(clone);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z, 0.001);
  const scale = target / maxDim;
  clone.scale.multiplyScalar(scale);

  box.setFromObject(clone);
  const center = box.getCenter(new THREE.Vector3());
  clone.position.sub(center);
  box.setFromObject(clone);
  clone.position.y -= box.min.y;

  return clone;
}

export function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

export function staggeredProgress(
  globalProgress: number,
  index: number,
  total: number
): number {
  const slot = 1 / total;
  const start = index * slot * 0.55;
  const end = start + slot * 1.45;
  return clamp01((globalProgress - start) / (end - start));
}
