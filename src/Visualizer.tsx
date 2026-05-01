import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import fragmentShader from "./shaders/enCualquierLugar.frag?raw";
import vertexShader from "./shaders/vertex.glsl?raw";
import { SONGS, INITIAL_SONG_INDEX } from "./songs";

type Uniforms = {
  uVideo: { value: THREE.Texture };
  uResolution: { value: THREE.Vector2 };
  uTime: { value: number };
  uGrain: { value: number };
  uDistortion: { value: number };
  uFog: { value: number };
  uOrangeTint: { value: number };
  uPulse: { value: number };
  uPulseStrength: { value: number };
  uSpeed: { value: number };
};

const VISUAL_PARAMETERS = {
  grain: 1.8,
  distortion: 1,
  fog: 1,
  orangeTint: 1,
  pulseStrength: 1,
  speed: 2,
} as const;

const fallbackTexture = () => {
  const data = new Uint8Array([6, 6, 6, 255]);
  const texture = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat);
  texture.needsUpdate = true;
  return texture;
};

export function Visualizer() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pulseRef = useRef(0);
  const songIndexRef = useRef(INITIAL_SONG_INDEX);
  const loadSongCallbackRef = useRef<((index: number) => void) | null>(null);

  const toggleFullscreen = useCallback(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }

    void root.requestFullscreen();
  }, []);

  const triggerPulse = useCallback(() => {
    pulseRef.current = 1;
  }, []);

  const previousSong = useCallback(() => {
    const newIndex = (songIndexRef.current - 1 + SONGS.length) % SONGS.length;
    songIndexRef.current = newIndex;
    loadSongCallbackRef.current?.(newIndex);
  }, []);

  const nextSong = useCallback(() => {
    const newIndex = (songIndexRef.current + 1) % SONGS.length;
    songIndexRef.current = newIndex;
    loadSongCallbackRef.current?.(newIndex);
  }, []);

  useKeyboardControls({
    onFullscreen: toggleFullscreen,
    onPulse: triggerPulse,
    onPreviousSong: previousSong,
    onNextSong: nextSong,
  });

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const video = document.createElement("video");
    const darkTexture = fallbackTexture();
    let videoTexture: THREE.VideoTexture | null = null;

    const initialSong = SONGS[songIndexRef.current];
    video.src = initialSong.videoPath;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    const uniforms: Uniforms = {
      uVideo: { value: darkTexture },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTime: { value: 0 },
      uGrain: { value: VISUAL_PARAMETERS.grain },
      uDistortion: { value: VISUAL_PARAMETERS.distortion },
      uFog: { value: VISUAL_PARAMETERS.fog },
      uOrangeTint: { value: VISUAL_PARAMETERS.orangeTint },
      uPulse: { value: 0 },
      uPulseStrength: { value: VISUAL_PARAMETERS.pulseStrength },
      uSpeed: { value: VISUAL_PARAMETERS.speed },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const enableVideoTexture = () => {
      if (videoTexture) {
        return;
      }

      videoTexture = new THREE.VideoTexture(video);
      videoTexture.colorSpace = THREE.SRGBColorSpace;
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      uniforms.uVideo.value = videoTexture;
    };

    const loadSong = (index: number) => {
      const song = SONGS[index];
      video.pause();
      video.src = song.videoPath;
      video.load();
      video.play().catch(() => {
        console.warn(`[visualizer] Could not play video: ${song.videoPath}`);
      });
      console.info(`[visualizer] Loading: ${song.title}`);
    };

    loadSongCallbackRef.current = loadSong;

    video.addEventListener("canplay", enableVideoTexture);
    video.play().catch(() => {
      uniforms.uVideo.value = darkTexture;
      console.warn(`[visualizer] Could not play video: ${initialSong.videoPath}`);
    });
    console.info(`[visualizer] Loading loop: ${initialSong.videoPath}`);

    const clock = new THREE.Clock();
    let frameId = 0;

    const render = () => {
      frameId = window.requestAnimationFrame(render);
      const delta = clock.getDelta();

      pulseRef.current = THREE.MathUtils.damp(pulseRef.current, 0, 3.8, delta);
      uniforms.uTime.value = clock.elapsedTime;
      uniforms.uPulse.value = pulseRef.current;
      renderer.render(scene, camera);
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener("resize", resize);
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      video.removeEventListener("canplay", enableVideoTexture);
      loadSongCallbackRef.current = null;
      video.pause();
      video.removeAttribute("src");
      video.load();
      geometry.dispose();
      material.dispose();
      darkTexture.dispose();
      videoTexture?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="visualizer-shell" ref={rootRef}>
      <div className="visualizer-canvas" ref={mountRef} />
    </div>
  );
}
