# Visualizer Hotel Sur

Single-song visualizer prototype for Hotel Sur's "En Cualquier Lugar". This repo is in an initial prototype state: keep the experience focused, compact, and close to the current visual mood.

## Stack

- Vite
- React
- TypeScript
- Three.js
- GLSL shaders
- Leva for temporary debug controls

## Commands

- `npm install`
- `npm run dev`
- `npm run build`

## Working Rules

- Keep this as a simple prototype.
- Do not add routing yet.
- Do not add a multi-song or multi-visualizer system yet.
- Keep the shader and visualizer code compact.
- Keep video assets in `public/videos/`.
- Treat the Leva control panel as temporary; final direction should come from defined visual parameters, not a permanent UI.
- Preserve a dark, slow, cinematic Hotel Sur mood rather than an EDM visualizer mood.

## Change Conventions

- Prefer localized edits over broad rewrites.
- Avoid premature abstractions, config layers, registries, engines, or plugin systems.
- Keep the visualizer centered on one video texture and one main shader unless there is a clear prototype need.
- Preserve the black-and-white base, foggy light, restrained emotion, analog grain, and subtle orange accent `#f55033`.
- Avoid bars, flashy geometry, rapid cuts, neon palettes, and beat-reactive EDM language.
- Run `npm run build` after meaningful changes.
