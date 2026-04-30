import { useCallback, useEffect, useRef, useState } from "react";
import { Leva, useControls } from "leva";
import * as THREE from "three";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import fragmentShader from "./shaders/enCualquierLugar.frag?raw";
import vertexShader from "./shaders/vertex.glsl?raw";

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

type VisualizerControls = {
  grain: number;
  distortion: number;
  fog: number;
  orangeTint: number;
  pulseStrength: number;
  speed: number;
};

const fallbackTexture = () => {
  const data = new Uint8Array([6, 6, 6, 255]);
  const texture = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat);
  texture.needsUpdate = true;
  return texture;
};

export function Visualizer() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const uniformsRef = useRef<Uniforms | null>(null);
  const pulseRef = useRef(0);
  const [debugVisible, setDebugVisible] = useState(true);

  const controls = useControls("En Cualquier Lugar", {
    grain: { value: 0.42, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.34, min: 0, max: 1, step: 0.01 },
    fog: { value: 0.58, min: 0, max: 1, step: 0.01 },
    orangeTint: { value: 0.3, min: 0, max: 1, step: 0.01 },
    pulseStrength: { value: 0.55, min: 0, max: 1, step: 0.01 },
    speed: { value: 0.72, min: 0.1, max: 2, step: 0.01 },
  }) as VisualizerControls;

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

  useKeyboardControls({
    onFullscreen: toggleFullscreen,
    onToggleDebug: () => setDebugVisible((visible) => !visible),
    onPulse: triggerPulse,
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

    video.src = "/videos/en-cualquier-lugar.mp4";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    const uniforms: Uniforms = {
      uVideo: { value: darkTexture },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTime: { value: 0 },
      uGrain: { value: controls.grain },
      uDistortion: { value: controls.distortion },
      uFog: { value: controls.fog },
      uOrangeTint: { value: controls.orangeTint },
      uPulse: { value: 0 },
      uPulseStrength: { value: controls.pulseStrength },
      uSpeed: { value: controls.speed },
    };
    uniformsRef.current = uniforms;

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

    video.addEventListener("canplay", enableVideoTexture);
    video.play().catch(() => {
      uniforms.uVideo.value = darkTexture;
    });

    const clock = new THREE.Clock();
    let frameId = 0;

    const render = () => {
      frameId = window.requestAnimationFrame(render);
      pulseRef.current = THREE.MathUtils.damp(pulseRef.current, 0, 3.8, clock.getDelta());
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
      video.pause();
      video.removeAttribute("src");
      video.load();
      geometry.dispose();
      material.dispose();
      darkTexture.dispose();
      videoTexture?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      uniformsRef.current = null;
    };
  }, []);

  useEffect(() => {
    const uniforms = uniformsRef.current;

    if (!uniforms) {
      return;
    }

    uniforms.uGrain.value = controls.grain;
    uniforms.uDistortion.value = controls.distortion;
    uniforms.uFog.value = controls.fog;
    uniforms.uOrangeTint.value = controls.orangeTint;
    uniforms.uPulseStrength.value = controls.pulseStrength;
    uniforms.uSpeed.value = controls.speed;
  }, [controls]);

  return (
    <div className="visualizer-shell" ref={rootRef}>
      <div className="visualizer-canvas" ref={mountRef} />
      <div className="visualizer-title">
        <span>Hotel Sur</span>
        <strong>En Cualquier Lugar</strong>
      </div>
      <Leva hidden={!debugVisible} collapsed />
    </div>
  );
}
