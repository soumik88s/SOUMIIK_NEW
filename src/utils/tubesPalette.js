export const ALLOWED_TUBE_COLORS = Object.freeze([
  '#9b8ec4',
  '#7c6daa',
  '#b8a7e8',
  '#8b72c9',
  '#d2c4f5',
]);

export const CURATED_TUBE_PALETTES = Object.freeze([
  Object.freeze({
    id: 'lavender-mist',
    tubes: ['#9b8ec4', '#7c6daa', '#b8a7e8'],
    lights: ['#d2c4f5', '#8b72c9', '#9b8ec4', '#b8a7e8'],
  }),
  Object.freeze({
    id: 'amethyst-glow',
    tubes: ['#b8a7e8', '#8b72c9', '#d2c4f5'],
    lights: ['#9b8ec4', '#7c6daa', '#d2c4f5', '#8b72c9'],
  }),
  Object.freeze({
    id: 'velvet-iris',
    tubes: ['#7c6daa', '#9b8ec4', '#d2c4f5'],
    lights: ['#b8a7e8', '#8b72c9', '#7c6daa', '#d2c4f5'],
  }),
  Object.freeze({
    id: 'twilight-violet',
    tubes: ['#8b72c9', '#d2c4f5', '#7c6daa'],
    lights: ['#b8a7e8', '#9b8ec4', '#d2c4f5', '#7c6daa'],
  }),
  Object.freeze({
    id: 'lilac-prism',
    tubes: ['#d2c4f5', '#9b8ec4', '#8b72c9'],
    lights: ['#7c6daa', '#b8a7e8', '#9b8ec4', '#d2c4f5'],
  }),
]);

export function getNextCuratedPaletteIndex(currentIndex, total = CURATED_TUBE_PALETTES.length) {
  if (!Number.isInteger(total) || total <= 1) return 0;
  const safeCurrent = Number.isInteger(currentIndex) && currentIndex >= 0 ? currentIndex : 0;
  return (safeCurrent + 1) % total;
}

export function pickCuratedPalette(index = 0) {
  const safeIndex =
    ((Number.isInteger(index) ? index : 0) % CURATED_TUBE_PALETTES.length +
      CURATED_TUBE_PALETTES.length) %
    CURATED_TUBE_PALETTES.length;
  const entry = CURATED_TUBE_PALETTES[safeIndex];
  return {
    id: entry.id,
    tubes: [...entry.tubes],
    lights: [...entry.lights],
  };
}

export function isPaletteWithinAllowedColors(palette) {
  if (!palette || !Array.isArray(palette.tubes) || !Array.isArray(palette.lights)) {
    return false;
  }
  const allowed = new Set(ALLOWED_TUBE_COLORS.map((hex) => hex.toLowerCase()));
  return (
    palette.tubes.length >= 3 &&
    palette.lights.length >= 4 &&
    palette.tubes.every((hex) => allowed.has(String(hex).toLowerCase())) &&
    palette.lights.every((hex) => allowed.has(String(hex).toLowerCase()))
  );
}
