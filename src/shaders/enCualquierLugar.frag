precision highp float;

uniform sampler2D uVideo;
uniform vec2 uResolution;
uniform float uTime;
uniform float uGrain;
uniform float uDistortion;
uniform float uFog;
uniform float uOrangeTint;
uniform float uPulse;
uniform float uPulseStrength;
uniform float uSpeed;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.03;
    amplitude *= 0.5;
  }

  return value;
}

void main() {
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  float time = uTime * uSpeed;

  float drift = fbm(uv * 2.4 + vec2(time * 0.035, -time * 0.025));
  float veil = fbm(uv * 4.0 + vec2(-time * 0.02, time * 0.03));
  vec2 warp = vec2(drift - 0.5, veil - 0.5);

  float pulse = uPulse * uPulseStrength;
  uv += warp * uDistortion * 0.055;
  uv += normalize(centered + 0.0001) * pulse * 0.018;

  vec3 video = texture2D(uVideo, uv).rgb;
  float luma = dot(video, vec3(0.299, 0.587, 0.114));

  float vignette = smoothstep(0.88, 0.22, length(centered));
  float fog = fbm(uv * 1.25 + vec2(time * 0.018, time * 0.012));
  float lifted = mix(luma, 0.5 + (luma - 0.5) * 0.72, uFog);
  lifted = mix(lifted, lifted + fog * 0.16, uFog * 0.65);
  lifted *= mix(0.62, 1.0, vignette);

  vec3 monochrome = vec3(lifted);
  vec3 orange = vec3(0.9608, 0.3137, 0.2);
  float highlight = smoothstep(0.48, 0.96, lifted + fog * 0.22 + pulse * 0.35);
  vec3 color = mix(monochrome, orange, highlight * uOrangeTint * 0.42);

  float grain = hash(uv * uResolution + fract(uTime * 24.0));
  color += (grain - 0.5) * uGrain * 0.18;
  color += pulse * vec3(0.09, 0.035, 0.02);
  color = pow(max(color, 0.0), vec3(1.08));

  gl_FragColor = vec4(color, 1.0);
}
