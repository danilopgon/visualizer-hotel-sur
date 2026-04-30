import { useEffect } from "react";
import { LIVE_CONTROL_BINDINGS } from "../liveControls";

type KeyboardControls = {
  onFullscreen: () => void;
  onPulse: () => void;
  onPreviousSong: () => void;
  onNextSong: () => void;
};

export function useKeyboardControls({
  onFullscreen,
  onPulse,
  onPreviousSong,
  onNextSong,
}: KeyboardControls) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      if (event.code === "KeyF") {
        onFullscreen();
      }

      if (event.code === "Space") {
        event.preventDefault();
        onPulse();
      }

      if (event.code === LIVE_CONTROL_BINDINGS.previousSong.key) {
        onPreviousSong();
      }

      if (event.code === LIVE_CONTROL_BINDINGS.nextSong.key) {
        onNextSong();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onFullscreen, onNextSong, onPreviousSong, onPulse]);
}
