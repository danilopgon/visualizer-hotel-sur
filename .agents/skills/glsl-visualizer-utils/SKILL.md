---
name: glsl-visualizer-utils
description: Guide GLSL shader edits for the Hotel Sur visualizer. Use when modifying `src/shaders/enCualquierLugar.frag`, shader uniforms, Three.js ShaderMaterial wiring, video texture treatment, noise, grain, displacement, fog, pulse, or performance-sensitive visual effects.
---

# GLSL Visualizer Utils

Edit the shader as a compact visual instrument, not a general engine.

## Current Uniforms

- `uVideo`: video texture sampler.
- `uResolution`: viewport size for resolution-aware grain.
- `uTime`: elapsed time.
- `uGrain`: analog grain amount.
- `uDistortion`: organic UV warp amount.
- `uFog`: lifted shadows and veil intensity.
- `uOrangeTint`: restrained orange highlight amount.
- `uPulse`: transient manual pulse value.
- `uPulseStrength`: pulse intensity.
- `uSpeed`: motion speed multiplier.

When adding a uniform, wire it in both `src/Visualizer.tsx` and the shader, and keep the default value visually conservative.

## Shader Direction

- Prefer low-frequency fbm/noise, drifting displacement, fog, vignette, luma shaping, and soft grain.
- Keep movement slow and organic.
- Use pulse as a subtle breath or flare, not a hard beat hit.
- Preserve the monochrome base and subtle orange highlight.

## Performance

- Keep fragment work modest; this runs full-screen.
- Avoid high iteration counts, nested loops, dynamic loops, heavy branching, or multiple video texture samples unless clearly needed.
- Keep noise functions small and readable.
- Verify with `npm run build` after shader or TypeScript uniform changes.
