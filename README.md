# Visualizer Hotel Sur

First prototype for "En Cualquier Lugar".

```bash
npm install
npm run dev
```

Place the loop at `public/videos/en-cualquier-lugar.mp4`.

## Controls

- `F`: fullscreen.
- `Space`: soft pulse.
- `ArrowLeft`: previous song action.
- `ArrowRight`: next song action.

## Live Control Contract

MIDI is documented as a live contract for now; the app does not request Web MIDI
permissions or listen to MIDI devices yet.

- Previous song: keyboard `ArrowLeft`, MIDI note `60`.
- Next song: keyboard `ArrowRight`, MIDI note `61`.

The current runtime still loads one video for this prototype. The future target is
a live set visualizer where every song in the setlist has its own video asset and
the same navigation actions move through that set.
