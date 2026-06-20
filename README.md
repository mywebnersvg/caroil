# VeloGarage — Premium 3D Car Oil & Garage Experience

Cinematic Next.js experience with React Three Fiber, GSAP ScrollTrigger, Lenis smooth scroll, and Framer Motion UI.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **React Three Fiber** + **Drei**
- **GSAP** + ScrollTrigger
- **Lenis** smooth scroll
- **Framer Motion**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 3D assets

Download models, HDRIs, and textures per **`public/ASSETS.md`** and place them in `public/models/`, `public/hdri/`, and `public/textures/`.

Until files are added, the scene uses **procedural placeholder geometry** automatically.

## Project structure

```
components/
  Hero3DScene.tsx    # Fullscreen R3F canvas, camera, lighting
  CarAssembly.tsx    # Part scatter → assemble on scroll
  ScrollSections.tsx # Hero pin, horizontal GSAP panels, story
  GarageExperience.tsx
  LoadingScreen.tsx
  SmoothScrollProvider.tsx
  MagneticButton.tsx
context/
  AssemblyProgressContext.tsx
lib/
  assembly-config.ts
public/
  ASSETS.md
  models/ hdri/ textures/ icons/
```

## Performance

- 3D canvas lazy-loaded (`dynamic`, `ssr: false`)
- GLB models loaded only when present (HEAD check)
- HDRI falls back to Drei `warehouse` preset
- Target 60fps on desktop; reduce `dpr` in `Hero3DScene` on low-end devices

## Build

```bash
npm run build
npm start
```
