---
name: hotel-sur-visual-style
description: Preserve the visual language for the Hotel Sur live concert backdrop. Use when changing colors, shader tone, motion, overlays, typography, grain, fog, pulse, video treatment, or any visual direction in this repo.
---

# Hotel Sur Visual Style

This is a **live concert stage backdrop** — projected behind the band, mapped to the stage wall. The visuals are part of the lighting and atmosphere of the show, not a web UI or music video. They must read at 10+ metres on a large surface.

## Core Mood

- Dark, nebulous, slow, cinematic, emotionally restrained.
- Black-and-white base with low light, soft contrast, and deep blacks.
- Orange `#f55033` as a live lighting accent — appears on highlights like warm stage light bleeding through fog. Never dominant or decorative.
- Fog, veils, analog grain, imperfect video texture, slow drift.
- Movement: organic, patient, slightly unstable. Let the image breathe.
- Intimate and nocturnal — not spectacular or aggressive.

## Projection Context

- Grain must be **heavy and legible** at large scale. This is not a screen; it's a wall.
- Blacks must be truly dark. Projector blacks wash out when brightness floor is too high.
- The center of the frame is the focal point — vignette should create a strong nebula bloom.
- Orange accent reads as a live lighting color, not UI decoration. It should appear as if the stage lights are warming the fog.

## Avoid

- Do not make it EDM, clubby, neon, hyper-saturated, or arcade-like.
- Do not add audio bars, equalizer columns, flashy geometry, tunnels, lasers, or aggressive beat flashes.
- Do not over-sharpen, over-brighten, or make the image feel clean and digital.
- Do not introduce big UI chrome unless explicitly requested.

## Loop Continuity

The video must feel continuous — no visible cut at the loop point. The current technique fires a brief analog glitch burst (`uLoopGlitch`) 0.4s before the video end, masking the visual discontinuity as intentional signal imperfection. This is consistent with the analog/nocturnal aesthetic.

## Practical Checks

- Before changing visuals, identify whether the change supports the song mood.
- Keep pulses subtle and emotional rather than percussive.
- Prefer shadow, fog, and luma shifts over obvious shapes.
- Grain at `VISUAL_PARAMETERS.grain = 1.8` is the baseline for projection. Do not reduce below 1.2.
