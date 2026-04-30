---
name: single-visualizer-prototype
description: Keep this repo as a compact initial single-song visualizer prototype. Use when editing React, Three.js setup, controls, assets, project structure, or build behavior to avoid turning it into a routing app, engine, or multi-song system too early.
---

# Single Visualizer Prototype

Preserve the repo as an initial prototype for one song: Hotel Sur's "En Cualquier Lugar".

## Architecture Guardrails

- Keep one visualizer experience.
- Keep one main video texture loaded from `public/videos/en-cualquier-lugar.mp4`.
- Keep one main fragment shader for the visual language.
- Do not add routing, pages, song registries, visualizer registries, content APIs, or multi-song config.
- Do not split code into abstractions unless a local edit has become genuinely hard to maintain.

## Editing Style

- Prefer localized changes in `src/Visualizer.tsx`, `src/shaders/`, or `src/styles.css`.
- Keep React state and Three.js lifecycle easy to inspect.
- Keep controls basic and temporary; Leva is for prototyping parameters, not the final performance UI.
- Avoid adding dependencies unless the prototype clearly cannot move forward without them.

## Verification

- Run `npm run build` after meaningful changes.
- If visual behavior changes, sanity-check that fullscreen, keyboard controls, video playback, and shader uniforms still work.
