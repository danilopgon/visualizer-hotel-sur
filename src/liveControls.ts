export const LIVE_CONTROL_BINDINGS = {
  previousSong: {
    key: "ArrowLeft",
    midiNote: 60,
  },
  nextSong: {
    key: "ArrowRight",
    midiNote: 61,
  },
} as const;

export type LiveControlAction = keyof typeof LIVE_CONTROL_BINDINGS;
