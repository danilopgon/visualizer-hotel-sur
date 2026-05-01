---
name: single-visualizer-prototype
description: Keep this repo as a compact live concert backdrop visualizer. Use when editing React, Three.js setup, controls, assets, project structure, or build behavior to avoid turning it into a routing app, engine, or multi-song system too early.
---

# Single Visualizer Prototype

This is a live concert backdrop projector for Hotel Sur. The full setlist (14 songs) is registered in `src/songs.ts`. Song navigation via ArrowLeft/ArrowRight is wired. The longer-term direction includes MIDI control and per-song shader variations — but do not build that runtime until the need is explicit.

## Architecture Guardrails

- Keep one visualizer experience with one active video texture and one main fragment shader.
- The songs array in `src/songs.ts` is the canonical setlist. Song navigation is a simple array index lookup — no routing, no pages, no song registries or config APIs.
- Do not add routing, song registries, visualizer registries, content APIs, or multi-song config systems.
- MIDI-oriented action hooks are acceptable when they stay compact.
- Do not split code into abstractions unless a local edit has become genuinely hard to maintain.

## Song Navigation

- `SONGS` array in `src/songs.ts`: all 14 setlist songs with `id`, `title`, and `videoPath`.
- `songIndexRef` in `Visualizer.tsx`: tracks current index, wraps around on both ends.
- `loadSong(index)`: swaps `video.src`, reloads, plays. Reuses the existing video element and VideoTexture.
- `loadSongCallbackRef`: exposes `loadSong` from the useEffect closure to the `useCallback` handlers outside it.

## Editing Style

- Prefer localized changes in `src/Visualizer.tsx`, `src/shaders/`, `src/songs.ts`, or `src/styles.css`.
- Keep React state and Three.js lifecycle easy to inspect.
- Keep controls basic and performance-oriented; avoid permanent debug UI.
- Avoid adding dependencies unless the prototype clearly cannot move forward without them.

## Verification

- Run `npm run build` after meaningful changes.
- If visual behavior changes, sanity-check that fullscreen, keyboard controls, song navigation, video playback, and shader uniforms still work.
