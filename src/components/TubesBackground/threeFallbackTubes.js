import * as THREE from 'three';

function createColorRamp(hexColors) {
  const colors = hexColors.map((hex) => new THREE.Color(hex));
  return function sampleRamp(t, out = new THREE.Color()) {
    const clamped = Math.max(0, Math.min(1, t));
    if (colors.length === 1) return out.copy(colors[0]);
    const scaled = clamped * (colors.length - 1);
    const idx = Math.floor(scaled);
    const frac = scaled - idx;
    if (idx >= colors.length - 1) return out.copy(colors[colors.length - 1]);
    return out.copy(colors[idx]).lerp(colors[idx + 1], frac);
  };
}

function createZeroAllocTubeGeometry(tubularSegments, radialSegments) {
  const vertexCount = (tubularSegments + 1) * (radialSegments + 1);
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const indices = [];

  for (let i = 0; i < tubularSegments; i += 1) {
    for (let j = 0; j < radialSegments; j += 1) {
      const a = (radialSegments + 1) * i + j;
      const b = (radialSegments + 1) * (i + 1) + j;
      const c = (radialSegments + 1) * (i + 1) + (j + 1);
      const d = (radialSegments + 1) * i + (j + 1);
      indices.push(a, b, d, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  return geometry;
}

const _p = new THREE.Vector3();
const _normal = new THREE.Vector3();
const _vertex = new THREE.Vector3();

function updateTubeGeometryFromCurve(geometry, curve, tubularSegments, radialSegments, baseRadius) {
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const posAttr = geometry.attributes.position;
  const normAttr = geometry.attributes.normal;

  for (let i = 0; i <= tubularSegments; i += 1) {
    const u = i / tubularSegments;
    curve.getPointAt(u, _p);

    const N = frames.normals[i];
    const B = frames.binormals[i];
    const taper = Math.sin(u * Math.PI);
    const radius = baseRadius * (0.18 + 0.82 * Math.pow(taper, 0.45));

    for (let j = 0; j <= radialSegments; j += 1) {
      const v = (j / radialSegments) * Math.PI * 2;
      const sin = Math.sin(v);
      const cos = -Math.cos(v);

      _normal.x = cos * N.x + sin * B.x;
      _normal.y = cos * N.y + sin * B.y;
      _normal.z = cos * N.z + sin * B.z;
      _normal.normalize();

      _vertex.x = _p.x + radius * _normal.x;
      _vertex.y = _p.y + radius * _normal.y;
      _vertex.z = _p.z + radius * _normal.z;

      const idx = i * (radialSegments + 1) + j;
      posAttr.setXYZ(idx, _vertex.x, _vertex.y, _vertex.z);
      normAttr.setXYZ(idx, _normal.x, _normal.y, _normal.z);
    }
  }

  posAttr.needsUpdate = true;
  normAttr.needsUpdate = true;
  geometry.computeBoundingSphere();
}

export function createThreeFallbackTubes({
  canvas,
  palette,
  isSoftwareGl = false,
  reducedMotion = false,
  onContextLost,
  onContextRestored,
}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !isSoftwareGl,
    powerPreference: isSoftwareGl ? 'default' : 'high-performance',
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 5.2);
  camera.lookAt(0, 0, 0);

  const hemiLight = new THREE.HemisphereLight('#b8a7e8', '#140f24', 0.55);
  scene.add(hemiLight);

  const lightPositions = [
    [-4.5, -3.5, 4.0],
    [-4.5, 3.5, 4.0],
    [4.5, -3.5, 4.0],
    [4.5, 3.5, 4.0],
  ];
  const lights = lightPositions.map((pos, idx) => {
    const light = new THREE.PointLight(
      palette.lights[idx % palette.lights.length],
      115,
      26,
      1.35
    );
    light.position.set(pos[0], pos[1], pos[2]);
    scene.add(light);
    return light;
  });

  const strandCount = isSoftwareGl ? 12 : 16;
  const controlCount = 14;
  const tubularSegments = isSoftwareGl ? 40 : 60;
  const radialSegments = isSoftwareGl ? 8 : 10;

  const strands = [];
  for (let s = 0; s < strandCount; s += 1) {
    const spreadRatio = (s / Math.max(1, strandCount - 1)) * 2 - 1;
    const points = Array.from({ length: controlCount }, (_, i) => {
      const t = i / (controlCount - 1);
      const angle = t * Math.PI * 1.1 + s * 0.36;
      return new THREE.Vector3(
        Math.cos(angle) * (0.9 + Math.abs(spreadRatio) * 0.7) - t * 0.65,
        Math.sin(angle * 0.75) * 0.7 + spreadRatio * 0.3,
        spreadRatio * 0.4 - t * 0.75
      );
    });

    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
    const coreGeometry = createZeroAllocTubeGeometry(tubularSegments, radialSegments);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: '#8b72c9',
      emissive: '#7c6daa',
      emissiveIntensity: 0.34,
      metalness: 0.9,
      roughness: 0.22,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    let glowGeometry = null;
    let glowMaterial = null;
    if (s % 3 === 0) {
      glowGeometry = createZeroAllocTubeGeometry(tubularSegments, 6);
      glowMaterial = new THREE.MeshBasicMaterial({
        color: '#8b72c9',
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(glowMesh);
    }

    strands.push({
      coreGeometry,
      coreMaterial,
      glowGeometry,
      glowMaterial,
      curve,
      points,
      radius: 0.018 + (s % 5) * 0.0085,
      phase: s * 0.42,
      followRate: 0.22 + (s % 4) * 0.025,
      orbitX: 0.16 + (s % 5) * 0.075,
      orbitY: 0.12 + ((s + 2) % 4) * 0.065,
      zOffset: spreadRatio * 0.36,
    });
  }

  function applyTubeColors(colors) {
    const sample = createColorRamp(colors);
    strands.forEach((strand, idx) => {
      const color = sample(idx / Math.max(1, strands.length - 1));
      strand.coreMaterial.color.copy(color);
      strand.coreMaterial.emissive.copy(color).multiplyScalar(0.45);
      if (strand.glowMaterial) {
        strand.glowMaterial.color.copy(color);
      }
    });
  }

  function applyLightColors(colors) {
    lights.forEach((light, idx) => {
      light.color.set(colors[idx % colors.length]);
    });
  }

  applyTubeColors(palette.tubes);
  applyLightColors(palette.lights);

  let worldWidth = 6.5;
  let worldHeight = 4.2;

  function resize() {
    const parent = canvas.parentElement;
    const width = parent?.clientWidth || window.innerWidth || 1;
    const height = parent?.clientHeight || window.innerHeight || 1;
    const dpr = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const vFov = (camera.fov * Math.PI) / 180;
    worldHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
    worldWidth = worldHeight * camera.aspect;
  }

  resize();

  const pointerTarget = new THREE.Vector3(0, 0, 0);
  const smoothTarget = new THREE.Vector3(0, 0, 0);
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const ndc = new THREE.Vector2();
  let pointerActive = false;
  let lastPointerMoveAt = 0;

  function handlePointerMove(event) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    ndc.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    if (raycaster.ray.intersectPlane(plane, pointerTarget)) {
      pointerActive = true;
      lastPointerMoveAt = performance.now();
    }
  }

  function handlePointerLeave() {
    pointerActive = false;
  }

  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  document.addEventListener('pointerleave', handlePointerLeave);
  window.addEventListener('resize', resize);

  const resizeObserver =
    typeof ResizeObserver !== 'undefined' && canvas.parentElement
      ? new ResizeObserver(resize)
      : null;
  if (resizeObserver && canvas.parentElement) {
    resizeObserver.observe(canvas.parentElement);
  }

  let disposed = false;
  let paused = false;
  let rafId = 0;
  let timerId = 0;
  const startTime = performance.now();

  function handleContextLost(event) {
    event.preventDefault();
    paused = true;
    onContextLost?.();
  }

  function handleContextRestored() {
    paused = false;
    onContextRestored?.();
  }

  canvas.addEventListener('webglcontextlost', handleContextLost);
  canvas.addEventListener('webglcontextrestored', handleContextRestored);

  function scheduleNextFrame(cb) {
    if (disposed) return;
    if (isSoftwareGl) {
      timerId = window.setTimeout(() => {
        if (!disposed) rafId = window.requestAnimationFrame(cb);
      }, 16);
    } else {
      rafId = window.requestAnimationFrame(cb);
    }
  }

  function tick(now) {
    if (disposed) return;
    const elapsed = (now - startTime) * 0.001 + 1.8;
    const motionFactor = reducedMotion ? 0.2 : 1;

    if (!paused) {
      const idleTimeoutElapsed = now - lastPointerMoveAt > 2400;
      if (!pointerActive || idleTimeoutElapsed) {
        const rx = Math.min(worldWidth * 0.34, 2.45) * motionFactor;
        const ry = Math.min(worldHeight * 0.28, 1.25) * motionFactor;
        pointerTarget.set(
          Math.cos(elapsed * 0.52) * rx,
          Math.sin(elapsed * 1.04) * ry,
          0
        );
      }

      smoothTarget.lerp(pointerTarget, reducedMotion ? 0.035 : 0.075);

      for (let s = 0; s < strands.length; s += 1) {
        const strand = strands[s];
        const pts = strand.points;

        const leadAngle = elapsed * (0.9 * motionFactor) + strand.phase;
        pts[0].set(
          smoothTarget.x + Math.cos(leadAngle) * strand.orbitX,
          smoothTarget.y + Math.sin(leadAngle * 1.15) * strand.orbitY,
          strand.zOffset + Math.sin(leadAngle * 0.65) * 0.22
        );

        for (let i = 1; i < pts.length; i += 1) {
          const prev = pts[i - 1];
          const curr = pts[i];
          curr.x = THREE.MathUtils.lerp(curr.x, prev.x, strand.followRate);
          curr.y = THREE.MathUtils.lerp(curr.y, prev.y, strand.followRate);
          curr.z = THREE.MathUtils.lerp(curr.z, prev.z - 0.08, strand.followRate);
        }

        updateTubeGeometryFromCurve(
          strand.coreGeometry,
          strand.curve,
          tubularSegments,
          radialSegments,
          strand.radius
        );

        if (strand.glowGeometry) {
          updateTubeGeometryFromCurve(
            strand.glowGeometry,
            strand.curve,
            tubularSegments,
            6,
            strand.radius * 1.95
          );
        }
      }

      renderer.render(scene, camera);
    }

    scheduleNextFrame(tick);
  }

  rafId = window.requestAnimationFrame(tick);

  return {
    tubes: {
      setColors: applyTubeColors,
      setLightsColors: applyLightColors,
    },
    dispose() {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timerId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', resize);
      resizeObserver?.disconnect();
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);

      strands.forEach((strand) => {
        strand.coreGeometry.dispose();
        strand.coreMaterial.dispose();
        strand.glowGeometry?.dispose();
        strand.glowMaterial?.dispose();
      });
      renderer.dispose();
    },
  };
}
