export function convertHexToRGBA(hex: string, opacity: number): string {
  const tempHex = hex.replace('#', '');
  const r = getConvertedColor(parseInt(tempHex.substring(0, 2), 16), opacity);
  const g = getConvertedColor(parseInt(tempHex.substring(2, 4), 16), opacity);
  const b = getConvertedColor(parseInt(tempHex.substring(4, 6), 16), opacity);
  return `rgb(${r},${g},${b})`;
}

export function convertHexToRGBAWithOpacity(
  hex: string,
  opacity: number
): string {
  const tempHex = hex.replace('#', '');
  const r = parseInt(tempHex.substring(0, 2), 16);
  const g = parseInt(tempHex.substring(2, 4), 16);
  const b = parseInt(tempHex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

export function getContrastColor(
  R: number,
  G: number,
  B: number,
  A: number
): string {
  const brightness = R * 0.299 + G * 0.587 + B * 0.114 + (1 - A) * 255;

  return brightness > 186 ? '#000' : '#FFF';
}

export function getRGBAandContrastcolor(rgba: string, alpha?: number): string {
  const r = parseInt(rgba.substring(5, 8));
  const g = parseInt(rgba.substring(9, 12));
  const b = parseInt(rgba.substring(13, 16));

  return getContrastColor(r, g, b, alpha ?? 1);
}

const getConvertedColor = (color: number, opacity: number): number =>
  Math.round((1 - opacity) * 255 + opacity * color);
