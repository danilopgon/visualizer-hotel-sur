---
name: glsl-visualizer-utils
description: Guide GLSL shader edits for the Hotel Sur visualizer. Use when modifying `src/shaders/enCualquierLugar.frag`, shader uniforms, Three.js ShaderMaterial wiring, video texture treatment, noise, grain, displacement, fog, pulse, loop glitch, or performance-sensitive visual effects.
---

# GLSL Visualizer Utils

Edit the shader as a compact visual instrument, not a general engine.

## Current Uniforms

- `uVideo`: video texture sampler.
- `uResolution`: viewport size for resolution-aware grain.
- `uTime`: elapsed time.
- `uGrain`: analog grain amount. Default `1.8` — heavy for projection legibility.
- `uDistortion`: organic UV warp amount.
- `uFog`: lifted shadows and veil intensity.
- `uOrangeTint`: restrained orange highlight amount.
- `uPulse`: transient manual pulse value (Space key trigger, decays at 3.8).
- `uPulseStrength`: pulse intensity.
- `uSpeed`: motion speed multiplier.
- `uLoopGlitch`: analog glitch burst at the video loop point (triggered from Visualizer.tsx, decays at 6.0). Causes scanline UV displacement and a noise spike, masking the loop cut.

When adding a uniform, wire it in both `src/Visualizer.tsx` and the shader, and keep the default value visually conservative.

## Current Parameter Defaults (concert projection tuned)

```ts
const VISUAL_PARAMETERS = {
  grain: 1.8,        // heavy analog grain for large-scale projection
  distortion: 1,
  fog: 1,
  orangeTint: 1,
  pulseStrength: 1,
  speed: 2,
};
```

## Shader Direction

- Prefer low-frequency fbm/noise, drifting displacement, fog, vignette, luma shaping, and heavy grain.
- Keep movement slow and organic.
- Use pulse as a subtle breath or flare, not a hard beat hit.
- `uLoopGlitch` is a transient burst — scanline horizontal displacement + noise spike. Keep it brief and analog-feeling, not EDM glitch.
- Preserve the monochrome base and subtle orange highlight.
- Deep blacks: brightness floor at `mix(0.48, 1.0, vignette)` — projector-optimized.
- Strong vignette: `smoothstep(0.95, 0.18, ...)` for nebula-like center bloom.

## Performance

- Keep fragment work modest; this runs full-screen.
- Avoid high iteration counts, nested loops, dynamic loops, heavy branching, or multiple video texture samples unless clearly needed.
- Keep noise functions small and readable.
- Verify with `npm run build` after shader or TypeScript uniform changes.
