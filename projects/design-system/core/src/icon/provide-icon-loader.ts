import { withCaching, provideNgIconLoader } from '@ng-icons/core';

/**
 * Options for the icon loader provider.
 * @property cache Whether to enable caching for loaded icons (default: true).
 */
type ProvideIconLoaderOptions = {
  /**
   * Enable caching for loaded icons. Default is true.
   */
  cache?: boolean;
};

/**
 * Creates Angular providers for loading SVG icons using a custom loader callback, with optional caching.
 *
 * @param loader A callback that receives the icon name and returns an Observable<string> or Promise<string> with the SVG content.
 * @param options Loader options (default: `{ cache: true }`).
 * @returns Array of Angular providers for icon loading and caching.
 *
 * @example
 * ```ts
 * provideIconLoader((iconName) => http.get(`/assets/icons/${iconName}.svg`, { responseType: 'text' }))
 * provideIconLoader((iconName) => fetch(`/cdn/${iconName}.svg`).then(r => r.text()), { cache: false })
 * ```
 */

export function provideIconLoader(
  loader: (
    iconName: string
  ) => Promise<string> | import('rxjs').Observable<string>,
  options: ProvideIconLoaderOptions = { cache: true }
): ReturnType<typeof provideNgIconLoader> {
  return provideNgIconLoader(loader, ...(options.cache ? [withCaching()] : []));
}
