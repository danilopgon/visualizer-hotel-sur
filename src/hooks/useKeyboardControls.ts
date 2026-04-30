import { useEffect } from "react";

type KeyboardControls = {
  onFullscreen: () => void;
  onToggleDebug: () => void;
  onPulse: () => void;
};

export function useKeyboardControls({
  onFullscreen,
  onToggleDebug,
  onPulse,
}: KeyboardControls) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      if (event.code === "KeyF") {
        onFullscreen();
      }

      if (event.code === "KeyH") {
        onToggleDebug();
      }

      if (event.code === "Space") {
        event.preventDefault();
        onPulse();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onFullscreen, onPulse, onToggleDebug]);
}
