/**
 * Joins URL segments safely, avoiding double slashes.
 * @param segments The URL segments to join.
 * @returns The combined URL string.
 */
export function joinUrl(...segments: string[]): string {
  return segments.join('/').replace(/([^:]\/)\/+/g, '$1'); // Replace // with / but not for protocol like http://
}
