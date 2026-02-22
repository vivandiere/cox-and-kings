export const palette = {
  surface: {
    white: '#FFFFFF',
    stone: '#F2F2EB',
    subtleStone: '#E8E8E0',
  },
  primary: {
    default: '#102037',
    light: '#1E3A5F',
    lighter: '#2D5280',
    muted: '#4A6380',
    faded: '#8FA3B8',
    tint: '#E8ECF0',
  },
  semantic: {
    success: '#4A9B8A',
    successLight: '#E8F2EF',
    warning: '#B08968',
    warningLight: '#F5EDE6',
    error: '#B07878',
    errorLight: '#F5EBEB',
    info: '#8E9AAF',
    infoLight: '#ECEEF2',
  },
  neutral: {
    900: '#1A1A18',
    700: '#4A4A46',
    500: '#7A7A74',
    400: '#9A9A94',
    300: '#BABAB4',
    200: '#D4D4CC',
    100: '#EAEAE4',
  }
};

export const brandAccents = {
  primary: { name: 'Primary Only', hex: '#102037', desc: 'No additional accent — uses primary throughout' },
};

export const brandDecorative = {
  warmSand: { name: 'Warm Sand', hex: '#E5BDB1', desc: 'Brand decorative — soft blush sand. Sparingly as backgrounds, interactive maps' },
  cream: { name: 'Soft Cream', hex: '#F8F1CD', desc: 'Brand decorative — warm cream. Sparingly as backgrounds, interactive maps' },
  mist: { name: 'Cool Mist', hex: '#DAE0EF', desc: 'Brand decorative — soft blue-grey. Sparingly as backgrounds, interactive maps' },
};

export const brandDecorativeDeep = {
  warmSandDeep: { name: 'Warm Sand Deep', hex: '#B58474', desc: 'Brand compound — legible warm sand' },
  creamDeep: { name: 'Soft Cream Deep', hex: '#9A8A5A', desc: 'Brand compound — legible ochre cream' },
  mistDeep: { name: 'Cool Mist Deep', hex: '#566A9B', desc: 'Brand compound — deeper blue-grey' },
};

export const uiAccents = {
  sandDeep: { name: 'Desert Sand', hex: '#C4897A', desc: 'Deeper sand — good contrast on light surfaces' },
  khaki: { name: 'Soft Khaki', hex: '#8A8562', desc: 'Earthy neutral — safari-friendly, legible' },
  khakiGold: { name: 'Golden Khaki', hex: '#A08C4A', desc: 'Warmer gold-toned khaki — luxe feel' },
  terracotta: { name: 'Soft Terracotta', hex: '#D4836A', desc: 'Warm, earthy, very travel-appropriate' },
  periwinkle: { name: 'Dusty Periwinkle', hex: '#7B8CDE', desc: 'Soft but distinctive, modern feel' },
  rose: { name: 'Dusty Rose', hex: '#C4727E', desc: 'Sophisticated warmth, luxury feel' },
  amber: { name: 'Muted Amber', hex: '#C9944A', desc: 'Golden hour warmth, premium' },
};

export const allAccents = { ...brandAccents, ...brandDecorative, ...brandDecorativeDeep, ...uiAccents };

export const lightAccents = ['warmSand', 'cream', 'mist'];

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
};
const mixWith = (rgb, target, amount) =>
  rgb.map((c, i) => Math.round(c + (target[i] - c) * amount));
const rgbToHex = (rgb) => '#' + rgb.map(c => Math.min(255, Math.max(0, c)).toString(16).padStart(2, '0')).join('');

const stone = [242, 242, 235];
const dark = [16, 32, 55];

export function buildAccentScale(accentHex) {
  const baseRgb = hexToRgb(accentHex);
  return {
    120: rgbToHex(mixWith(baseRgb, dark, 0.35)),
    100: accentHex,
    80: rgbToHex(mixWith(baseRgb, stone, 0.15)),
    60: rgbToHex(mixWith(baseRgb, stone, 0.3)),
    50: rgbToHex(mixWith(baseRgb, stone, 0.45)),
    40: rgbToHex(mixWith(baseRgb, stone, 0.55)),
    20: rgbToHex(mixWith(baseRgb, stone, 0.72)),
    10: rgbToHex(mixWith(baseRgb, stone, 0.82)),
  };
}

export function deriveAccentHelpers(activeAccent, accent) {
  const isPrimaryAccent = activeAccent === 'primary';
  const isLightAccent = lightAccents.includes(activeAccent);
  const onPrimaryText = isPrimaryAccent ? palette.surface.stone : accent.hex;
  const onPrimaryButtonBg = isPrimaryAccent ? palette.surface.stone : accent.hex;
  const onPrimaryButtonText = palette.primary.default;
  return { isPrimaryAccent, isLightAccent, onPrimaryText, onPrimaryButtonBg, onPrimaryButtonText };
}
