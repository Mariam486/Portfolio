/*
 * LiquidEther background
 * Vanilla adaptation for this static portfolio.
 * Three.js is loaded on demand so the existing HTML/CSS/JS setup stays intact.
 */
(function () {
  const mount = document.querySelector('[data-liquid-ether]');
  if (!mount) return;

  const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors = ['#ff6b4a', '#e8532f', '#ffab8a'];
  let renderer;
  let animationFrame;
  let resizeObserver;
  let pointer = { x: 0, y: 0, active: 0 };
  let pointerTimer;
  let startTime = performance.now();

  const fallback = () => {
    mount.classList.add('liquid-ether-fallback');
  };

  const isDarkTheme = () => {
    const background = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
    return background === '#1c1714';
  };

  const init = (THREE) => {
    let webglContext = null;
    try {
      const probe = document.createElement('canvas');
      webglContext =
        probe.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ||
        probe.getContext('webgl', { failIfMajorPerformanceCaveat: true }) ||
        probe.getContext('experimental-webgl', { failIfMajorPerformanceCaveat: true });
    } catch (error) {
      webglContext = null;
    }

    if (!webglContext) {
      fallback();
      return;
    }

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.Camera();
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uPointerActive: { value: 0 },
          uDark: { value: 0 },
          uColorOne: { value: new THREE.Color(colors[0]) },
          uColorTwo: { value: new THREE.Color(colors[1]) },
          uColorThree: { value: new THREE.Color(colors[2]) },
        },
        vertexShader: `
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          uniform float uTime;
          uniform vec2 uResolution;
          uniform vec2 uPointer;
          uniform float uPointerActive;
          uniform float uDark;
          uniform vec3 uColorOne;
          uniform vec3 uColorTwo;
          uniform vec3 uColorThree;

          vec3 palette(float t) {
            t = clamp(t, 0.0, 1.0);
            if (t < 0.5) return mix(uColorOne, uColorTwo, t * 2.0);
            return mix(uColorTwo, uColorThree, (t - 0.5) * 2.0);
          }

          void main() {
            float scale = min(uResolution.x, uResolution.y);
            vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / scale;
            float time = uTime * 0.18;
            vec2 autoPoint = vec2(
              sin(time * 1.13) * 0.38,
              cos(time * 0.87) * 0.28
            );
            vec2 cursor = mix(autoPoint, uPointer, uPointerActive);
            vec2 flow = vec2(
              sin(p.y * 4.4 + time * 2.0),
              cos(p.x * 3.8 - time * 1.7)
            ) * 0.045;
            p += flow;

            float waveOne = sin(p.x * 4.0 + p.y * 2.5 + time * 2.6);
            float waveTwo = cos(p.y * 5.0 - p.x * 2.0 - time * 2.1);
            float ripple = sin(length(p - cursor) * 12.0 - time * 9.0);
            float blob = exp(-length(p - cursor) * 2.8);
            float energy = clamp(
              0.18 + waveOne * 0.09 + waveTwo * 0.08 + ripple * blob * 0.16 + blob * 0.36,
              0.0,
              1.0
            );
            float colorMix = clamp(
              0.42 + waveOne * 0.16 + waveTwo * 0.12 + blob * 0.24,
              0.0,
              1.0
            );
            vec3 liquid = palette(colorMix);
            vec3 base = mix(vec3(0.965, 0.957, 0.945), vec3(0.11, 0.09, 0.075), uDark);
            float opacity = mix(0.14, 0.19, uDark) + energy * 0.17;
            vec3 color = mix(base, liquid, 0.72);
            gl_FragColor = vec4(color, opacity);
          }
        `,
      });

      scene.add(new THREE.Mesh(geometry, material));

      const resize = () => {
        const width = Math.max(1, mount.clientWidth);
        const height = Math.max(1, mount.clientHeight);
        renderer.setSize(width, height, false);
        material.uniforms.uResolution.value.set(width, height);
      };

      const updateTheme = () => {
        material.uniforms.uDark.value = isDarkTheme() ? 1 : 0;
      };

      const render = (now) => {
        material.uniforms.uTime.value = (now - startTime) / 1000;
        material.uniforms.uPointer.value.set(pointer.x, pointer.y);
        material.uniforms.uPointerActive.value +=
          ((pointer.active ? 1 : 0) - material.uniforms.uPointerActive.value) * 0.08;
        renderer.render(scene, camera);
        animationFrame = requestAnimationFrame(render);
      };

      resize();
      updateTheme();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      new MutationObserver(updateTheme).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style'],
      });

      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(render);
      } else {
        render(performance.now());
        cancelAnimationFrame(animationFrame);
      }
    } catch (error) {
      fallback();
    }
  };

  window.addEventListener('pointermove', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
    pointer.active = 1;
    window.clearTimeout(pointerTimer);
    pointerTimer = window.setTimeout(() => {
      pointer.active = 0;
    }, 1800);
  }, { passive: true });

  import(THREE_URL).then(init).catch(fallback);
})();