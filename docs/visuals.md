# Hotel Sur Visuals

Live concert backdrop visualizer for Hotel Sur. The app renders one fullscreen
Three.js shader over a looping video texture and lets the operator cycle through
the setlist with compact keyboard controls.

## Setlist

The canonical setlist lives in `src/songs.ts`. Each entry maps to a video file
under `public/videos/`.

| # | Title | ID | Video path |
|---|-------|----|------------|
| 1 | En Cualquier Lugar | `en-cualquier-lugar` | `/videos/en-cualquier-lugar.mp4` |
| 2 | Tras la Tormenta | `tras-la-tormenta` | `/videos/tras-la-tormenta.mp4` |
| 3 | Nocturna | `nocturna` | `/videos/nocturna.mp4` |
| 4 | Crisantemos | `crisantemos` | `/videos/crisantemos.mp4` |
| 5 | Pais en Llamas | `pais-en-llamas` | `/videos/pais-en-llamas.mp4` |
| 6 | Oscuro Affaire | `oscuro-affaire` | `/videos/oscuro-affaire.mp4` |
| 7 | Estrella Bipolar | `estrella-bipolar` | `/videos/estrella-bipolar.mp4` |
| 8 | Demonio Azul | `demonio-azul` | `/videos/demonio-azul.mp4` |
| 9 | La Isla | `la-isla` | `/videos/la-isla.mp4` |
| 10 | Ventolin | `ventolin` | `/videos/ventolin.mp4` |
| 11 | Salvador | `salvador` | `/videos/salvador.mp4` |
| 12 | Merecido | `merecido` | `/videos/merecido.mp4` |
| 13 | Aguas Rojas | `aguas-rojas` | `/videos/aguas-rojas.mp4` |
| 14 | DD | `dd` | `/videos/dd.mp4` |

To add or reorder songs, edit `src/songs.ts`. Do not add a registry or routing
layer for this prototype.

## Runtime Controls

- `F`: fullscreen.
- `Space`: soft pulse.
- `ArrowLeft`: previous song.
- `ArrowRight`: next song.

MIDI notes are documented in `src/liveControls.ts` as the future live-control
contract, but the app does not request Web MIDI permissions yet.

## Visual Parameters

The current shader is tuned for large-scale projection:

| Parameter | Value | Notes |
|-----------|-------|-------|
| `grain` | `1.8` | Heavy analog grain for distance legibility |
| `distortion` | `1` | Organic UV warp |
| `fog` | `1` | Veil and lifted shadows |
| `orangeTint` | `1` | Warm stage-light accent |
| `pulseStrength` | `1` | Manual pulse intensity |
| `speed` | `2` | Slow drift multiplier |

Keep the base black-and-white, foggy, dark, and restrained. Orange `#f55033`
should read as light bleeding through fog, not as a graphic palette.

## File Structure

```text
public/videos/         video assets served by Vite
src/songs.ts           canonical setlist
src/liveControls.ts    keyboard/MIDI action contract
src/Visualizer.tsx     Three.js runtime and video texture lifecycle
src/shaders/           GLSL shader pair
docs/visuals.md        this guide
```
