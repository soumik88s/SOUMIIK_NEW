import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getNextCuratedPaletteIndex,
  pickCuratedPalette,
} from '../../utils/tubesPalette';
import { createThreeFallbackTubes } from './threeFallbackTubes';

const TUBES_CDN_URL =
  'https://cdn.jsdelivr.net/npm/threejs-components@0.0.30/build/cursors/tubes1.min.js';

function probeWebGLSupport() {
  try {
    const testCanvas = document.createElement('canvas');
    const gl2 = testCanvas.getContext('webgl2');
    const gl = gl2 || testCanvas.getContext('webgl');
    if (!gl) {
      return { webgl: false, webgl2: false, isSoftwareGl: false };
    }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = debugInfo
      ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '')
      : '';
    const isSoftwareGl = /swiftshader|llvmpipe|software/i.test(rendererStr);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return { webgl: true, webgl2: Boolean(gl2), isSoftwareGl };
  } catch {
    return { webgl: false, webgl2: false, isSoftwareGl: false };
  }
}

async function loadTubesCdnModule(timeoutMs = 5500) {
  let timeoutId;
  try {
    const importPromise = import(/* @vite-ignore */ TUBES_CDN_URL);
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = window.setTimeout(() => {
        reject(new Error('Tubes CDN module load timed out'));
      }, timeoutMs);
    });
    return await Promise.race([importPromise, timeoutPromise]);
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function TubesBackground({
  children,
  className = '',
  enableClickInteraction = true,
  onPaletteChange,
}) {
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);
  const paletteIndexRef = useRef(0);
  const [activePalette, setActivePalette] = useState(() => pickCuratedPalette(0));
  const [renderMode, setRenderMode] = useState('initializing');
  const [contextLost, setContextLost] = useState(false);

  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let mounted = true;
    const capabilities = probeWebGLSupport();

    if (!capabilities.webgl) {
      setRenderMode('non-webgl');
      return undefined;
    }

    const initialPalette = pickCuratedPalette(paletteIndexRef.current);

    async function initTubes() {
      // Use local Three.js tubes engine on software WebGL for deterministic framing,
      // and load threejs-components CDN with fallback on hardware GPUs.
      if (!capabilities.isSoftwareGl && capabilities.webgl2) {
        try {
          const module = await loadTubesCdnModule(5500);
          if (!mounted) return;
          const TubesCursor = module?.default;
          if (typeof TubesCursor === 'function') {
            const instance = TubesCursor(canvas, {
              bloom: {
                threshold: 0,
                strength: reducedMotion ? 1.05 : 1.35,
                radius: 0.55,
              },
              sleepRadiusX: reducedMotion ? 90 : 280,
              sleepRadiusY: reducedMotion ? 45 : 140,
              sleepTimeScale1: reducedMotion ? 0.25 : 0.75,
              sleepTimeScale2: reducedMotion ? 0.45 : 1.35,
              tubes: {
                colors: initialPalette.tubes,
                lights: {
                  intensity: 195,
                  colors: initialPalette.lights,
                },
              },
            });

            if (instance?.three) {
              instance.three.minPixelRatio = 1;
              instance.three.maxPixelRatio = Math.min(window.devicePixelRatio || 1, 2);
              instance.three.resize();
            }

            instanceRef.current = instance;
            setRenderMode('threejs-components');
            return;
          }
        } catch {
          // Graceful fallback to local Three.js 3D tubes engine below
        }
      }

      if (!mounted) return;

      try {
        const fallbackInstance = createThreeFallbackTubes({
          canvas,
          palette: initialPalette,
          isSoftwareGl: capabilities.isSoftwareGl,
          reducedMotion,
          onContextLost: () => {
            if (mounted) setContextLost(true);
          },
          onContextRestored: () => {
            if (mounted) setContextLost(false);
          },
        });
        instanceRef.current = fallbackInstance;
        setRenderMode('three-fallback');
      } catch {
        if (mounted) setRenderMode('non-webgl');
      }
    }

    initTubes();

    return () => {
      mounted = false;
      if (instanceRef.current && typeof instanceRef.current.dispose === 'function') {
        instanceRef.current.dispose();
      }
      instanceRef.current = null;
    };
  }, [reducedMotion]);

  const handleContainerClick = useCallback(
    (event) => {
      if (!enableClickInteraction) return;
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest('a, button, [role="button"], [data-hero-interactive="true"]')
      ) {
        return;
      }

      const nextIndex = getNextCuratedPaletteIndex(paletteIndexRef.current);
      paletteIndexRef.current = nextIndex;
      const nextPalette = pickCuratedPalette(nextIndex);
      setActivePalette(nextPalette);
      onPaletteChange?.(nextPalette);

      const tubesController = instanceRef.current?.tubes;
      if (tubesController) {
        if (typeof tubesController.setColors === 'function') {
          tubesController.setColors(nextPalette.tubes);
        }
        if (typeof tubesController.setLightsColors === 'function') {
          tubesController.setLightsColors(nextPalette.lights);
        }
      }
    },
    [enableClickInteraction, onPaletteChange]
  );

  const showCssFallback = renderMode === 'non-webgl' || contextLost;

  return (
    <div
      onClick={handleContainerClick}
      data-tubes-mode={showCssFallback ? 'non-webgl' : renderMode}
      data-tubes-palette={activePalette.id}
      className={`relative h-full min-h-dvh w-full overflow-hidden bg-[#0a0814] select-none ${className}`}
    >
      {/* Non-WebGL / atmospheric base layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-all duration-700"
        style={{
          background: showCssFallback
            ? `radial-gradient(circle at 28% 28%, ${activePalette.tubes[2]}55 0%, transparent 52%),
               radial-gradient(circle at 72% 68%, ${activePalette.lights[1]}4d 0%, transparent 56%),
               radial-gradient(circle at 50% 50%, ${activePalette.tubes[1]}33 0%, #090712 78%)`
            : `radial-gradient(circle at 50% 48%, ${activePalette.tubes[1]}22 0%, #090712 72%)`,
        }}
      />

      {!showCssFallback && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 block h-full w-full touch-none"
        />
      )}

      {/* Subtle readability vignette ensuring high contrast under centered white/lavender type */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(10, 8, 20, 0.28) 0%, rgba(10, 8, 20, 0.62) 85%)',
        }}
      />

      <div className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
