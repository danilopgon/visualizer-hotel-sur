# Visualizer Hotel Sur

Live concert backdrop visualizer for Hotel Sur. Shader-based fullscreen projection driven by looping video textures. Projected behind the band, mapped to the stage backdrop — this is part of the lighting and atmosphere of a live set, not a web UI.

## Stack

- Vite
- React
- TypeScript
- Three.js
- GLSL shaders

## Commands

- `pnpm install`
- `pnpm run dev`
- `pnpm run build`

## Working Rules

- Keep this as a compact prototype.
- Do not add routing yet.
- Do not add a setlist UI, content API, or plugin system.
- The songs array in `src/songs.ts` is the canonical setlist — add songs there, not in a registry or config layer.
- ArrowLeft/ArrowRight swap the active video using the songs array. MIDI will extend this later.
- Keep the shader and visualizer code compact.
- Keep video assets in `public/videos/`.
- Final direction should come from defined visual parameters, not a permanent UI.
- Keep live controls compact: keyboard actions exist now, MIDI comes later.
- Preserve a dark, slow, cinematic Hotel Sur mood. This is stage backdrop, not EDM.

## Visual Direction

The visuals are a **stage backdrop** projected behind the band at a live concert. They must read at 10+ metres: grain should be heavy and analog, contrast should be high, blacks should be truly dark (projector blacks). The image is part of the lighting — not a decoration, part of the atmosphere.

- Black-and-white base, foggy light, analog grain, imperfect video texture, slow nebula-like drift.
- Orange `#f55033` appears as a live accent color — like stage lighting bleeding through fog.
- Movement is organic, patient, slightly unstable. Never mechanical.
- The loop must feel continuous. The current technique is an analog glitch burst at the loop point, masking the cut as intentional signal imperfection.

## Change Conventions

- Prefer localized edits over broad rewrites.
- Avoid premature abstractions, config layers, registries, engines, or plugin systems.
- Keep the visualizer centered on one video texture and one main shader unless there is a clear prototype need.
- Preserve the black-and-white base, foggy light, restrained emotion, analog grain, and subtle orange accent `#f55033`.
- Avoid bars, flashy geometry, rapid cuts, neon palettes, and beat-reactive EDM language.
- Run `pnpm run build` after meaningful changes.
