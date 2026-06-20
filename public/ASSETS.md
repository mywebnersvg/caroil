# Required 3D & Media Assets

Place all files in the paths below **exactly** as named. The app loads these paths automatically.

---

## 3D Models (`.glb` format)

| Exact filename | Place in folder | Search keywords | Best sources |
|----------------|-----------------|-----------------|--------------|
| `car_chassis.glb` | `public/models/` | car chassis frame glb | Sketchfab, Poly Pizza |
| `engine-block.glb` | `public/models/` | v8 engine block glb | Sketchfab, CGTrader |
| `wheel-tire.glb` | `public/models/` | car wheel tire glb | Poly Pizza, Sketchfab |
| `brake_rotor.glb` | `public/models/` | brake disc rotor glb | Sketchfab, Poly Pizza |
| `phram_oil_filter.glb` | `public/models/` | oil filter canister glb | Sketchfab, CGTrader |
| `car-assembled.glb` | `public/models/` | *(optional)* complete car glb | Sketchfab |

### Per-model download tips

1. **car-chassis.glb** — Search: `car chassis frame glb free` · Prefer single mesh, &lt; 5MB, CC license. Sketchfab filter: Downloadable + GLB.
2. **engine-block.glb** — Search: `engine block v8 glb` · Poly Pizza tag: `engine`.
3. **wheel-tire.glb** — Search: `car wheel 4k glb` · One wheel is enough (instanced ×4 in scene).
4. **brake-disc.glb** — Search: `brake disc glb pbr` · Small detail mesh, &lt; 2MB.
5. **oil-filter.glb** — Search: `oil filter 3d glb` · Cylindrical canister, low poly OK.
6. **car-assembled.glb** — Search: `complete car glb low poly` · Fallback only if part assembly is disabled.

**Compression:** Re-export with [gltf-transform](https://gltf-transform.dev/) + DRACO. Place `.glb` in `public/models/`.

---

## Environment lighting (HDRI)

| Exact filename | Place in folder | Search keywords | Best sources |
|----------------|-----------------|-----------------|--------------|
| `garage_interior_1k.hdr` | `public/hdri/` | "garage hdri 1k" OR "automotive workshop hdri" | [Poly Haven](https://polyhaven.com/hdris), [HDRI Haven](https://hdrihaven.com) |
| `studio_soft_1k.hdr` | `public/hdri/` | "studio soft light hdri 1k" OR "photo studio hdri" | Poly Haven |

Alternative Poly Haven names to download and rename:
- Garage: `empty_warehouse_01_1k.hdr` → rename to `garage_interior_1k.hdr`
- Studio: `studio_small_09_1k.hdr` → rename to `studio_soft_1k.hdr`

---

## Textures

| Exact filename | Place in folder | Search keywords | Best sources |
|----------------|-----------------|-----------------|--------------|
| `metal_scratched_steel_diff.jpg` | `public/textures/` | "scratched steel texture seamless" | [Poly Haven](https://polyhaven.com/textures), [ambientCG](https://ambientcg.com) |
| `metal_scratched_steel_nrm.jpg` | `public/textures/` | *(normal map for above)* | Same pack |
| `carbon_fiber_diff.jpg` | `public/textures/` | "carbon fiber weave seamless" | ambientCG, Poly Haven |
| `tire_rubber_diff.jpg` | `public/textures/` | "tire rubber texture seamless" | texture.ninja, ambientCG |
| `garage_floor_diff.jpg` | `public/textures/` | "concrete floor garage seamless" OR "asphalt dark seamless" | Poly Haven, ambientCG |
| `garage_floor_rough.jpg` | `public/textures/` | *(roughness map)* | Same pack |

---

## UI assets

| Exact filename | Place in folder | Notes |
|----------------|-----------------|-------|
| `icon-oil.svg` | `public/icons/` | Oil drop / lubricant |
| `icon-engine.svg` | `public/icons/` | Engine block outline |
| `icon-wrench.svg` | `public/icons/` | Wrench / tools |
| `icon-lift.svg` | `public/icons/` | Car lift / hydraulic |
| `particles_soft.png` | `public/textures/` | *(optional)* Soft white dust specks, 512×512, transparent PNG |

**Icon sources:** [Lucide](https://lucide.dev), [Heroicons](https://heroicons.com), [Phosphor](https://phosphoricons.com) — export as SVG, rename to match.

---

## Folder structure (after download)

```
public/
├── models/
│   ├── car-chassis.glb
│   ├── engine-block.glb
│   ├── wheel-tire.glb
│   ├── brake-disc.glb
│   ├── oil-filter.glb
│   └── car-assembled.glb          (optional)
├── hdri/
│   ├── garage_interior_1k.hdr
│   └── studio_soft_1k.hdr
├── textures/
│   ├── metal_scratched_steel_diff.jpg
│   ├── metal_scratched_steel_nrm.jpg
│   ├── carbon_fiber_diff.jpg
│   ├── tire_rubber_diff.jpg
│   ├── garage_floor_diff.jpg
│   ├── garage_floor_rough.jpg
│   └── particles_soft.png         (optional)
└── icons/
    ├── icon-oil.svg
    ├── icon-engine.svg
    ├── icon-wrench.svg
    └── icon-lift.svg
```

Until assets are added, the site uses **procedural placeholder geometry** with the same paths ready for swap-in.
