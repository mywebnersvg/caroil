import type { Vector3Tuple } from "three";

export type PartId =
  | "chassis"
  | "engine"
  | "wheel_fl"
  | "wheel_fr"
  | "wheel_rl"
  | "wheel_rr"
  | "brake_fl"
  | "brake_fr"
  | "oil_filter";

export interface AssemblyPartConfig {
  id: PartId;
  modelPath: string;
  assembledPosition: Vector3Tuple;
  assembledRotation: Vector3Tuple;
  assembledScale: number;
  startPosition: Vector3Tuple;
  startRotation: Vector3Tuple;
  assemblyOrder: number;
}

/** Paths match files in public/models/ */
export const MODEL_PATHS = {
  chassis: "/models/car_chassis.glb",
  engine: "/models/engine-block.glb",
  wheel: "/models/wheel-tire.glb",
  brake: "/models/brake_rotor.glb",
  oilFilter: "/models/phram_oil_filter.glb",
  assembled: "/models/car-assembled.glb",
} as const;

export const ASSEMBLY_PARTS: AssemblyPartConfig[] = [
  {
    id: "chassis",
    modelPath: MODEL_PATHS.chassis,
    assembledPosition: [0, 0, 0],
    assembledRotation: [0, 0, 0],
    assembledScale: 1,
    startPosition: [-5, 2.2, -3],
    startRotation: [0.4, 1.1, 0.15],
    assemblyOrder: 0,
  },
  {
    id: "engine",
    modelPath: MODEL_PATHS.engine,
    assembledPosition: [0, 0.45, 0.75],
    assembledRotation: [0, 0, 0],
    assembledScale: 1,
    startPosition: [5.5, 3, 2],
    startRotation: [-0.5, -1.4, 0.35],
    assemblyOrder: 1,
  },
  {
    id: "wheel_fl",
    modelPath: MODEL_PATHS.wheel,
    assembledPosition: [-0.92, 0.38, 1.15],
    assembledRotation: [0, 0, Math.PI / 2],
    assembledScale: 1,
    startPosition: [-7, 1.2, 4],
    startRotation: [0.6, 2.2, 1],
    assemblyOrder: 2,
  },
  {
    id: "wheel_fr",
    modelPath: MODEL_PATHS.wheel,
    assembledPosition: [0.92, 0.38, 1.15],
    assembledRotation: [0, 0, Math.PI / 2],
    assembledScale: 1,
    startPosition: [7, 1.5, 3.5],
    startRotation: [0.3, -1.8, 0.5],
    assemblyOrder: 3,
  },
  {
    id: "wheel_rl",
    modelPath: MODEL_PATHS.wheel,
    assembledPosition: [-0.92, 0.38, -1.15],
    assembledRotation: [0, 0, Math.PI / 2],
    assembledScale: 1,
    startPosition: [-6.5, 2.5, -4],
    startRotation: [-0.4, 1.3, 0.7],
    assemblyOrder: 4,
  },
  {
    id: "wheel_rr",
    modelPath: MODEL_PATHS.wheel,
    assembledPosition: [0.92, 0.38, -1.15],
    assembledRotation: [0, 0, Math.PI / 2],
    assembledScale: 1,
    startPosition: [6.5, 2, -3.5],
    startRotation: [0.8, -1.1, 0.25],
    assemblyOrder: 5,
  },
  {
    id: "brake_fl",
    modelPath: MODEL_PATHS.brake,
    assembledPosition: [-0.85, 0.42, 1.05],
    assembledRotation: [0, 0, 0],
    assembledScale: 1,
    startPosition: [-4, 3.5, 5],
    startRotation: [1.2, 0.6, 0.1],
    assemblyOrder: 6,
  },
  {
    id: "brake_fr",
    modelPath: MODEL_PATHS.brake,
    assembledPosition: [0.85, 0.42, 1.05],
    assembledRotation: [0, 0, 0],
    assembledScale: 1,
    startPosition: [4.2, 3.2, 5.2],
    startRotation: [-1, -0.7, 0.5],
    assemblyOrder: 7,
  },
  {
    id: "oil_filter",
    modelPath: MODEL_PATHS.oilFilter,
    assembledPosition: [0.4, 0.52, 0.45],
    assembledRotation: [0, 0.5, 0],
    assembledScale: 1,
    startPosition: [2.5, 4, -5],
    startRotation: [0.7, 2.5, -0.4],
    assemblyOrder: 8,
  },
];

export function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function lerpAssembly(
  start: Vector3Tuple,
  end: Vector3Tuple,
  t: number
): Vector3Tuple {
  const e = easeOutExpo(t);
  return [
    start[0] + (end[0] - start[0]) * e,
    start[1] + (end[1] - start[1]) * e,
    start[2] + (end[2] - start[2]) * e,
  ];
}

export const UNIQUE_MODEL_PATHS = [
  ...new Set(ASSEMBLY_PARTS.map((p) => p.modelPath)),
  MODEL_PATHS.assembled,
];
