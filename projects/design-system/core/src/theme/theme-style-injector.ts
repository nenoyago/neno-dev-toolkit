import { DEFAULT_THEME } from './default-theme';
import { ThemeConfig } from './theme-config';

const STYLE_ELEMENT_ID = 'liv-design-system-theme';

export const injectThemeCss = (theme: ThemeConfig) => {
  const mergedTheme = { ...DEFAULT_THEME, ...theme };

  const cssVars = [
    ...Object.entries(mergedTheme.colors ?? {}).map(
      ([key, value]) => `--color-${key}: ${value};`
    ),
    ...Object.entries(mergedTheme.opacities ?? {}).map(
      ([key, value]) => `--opacity-${key}: ${value};`
    ),
    ...Object.entries(mergedTheme.shadows ?? {}).map(
      ([key, value]) => `--shadow-${key}: ${value};`
    ),
    ...Object.entries(mergedTheme.gradients ?? {}).map(
      ([key, value]) => `--gradient-${key}: ${value};`
    )
  ].join('\n');

  let style = document.getElementById(
    STYLE_ELEMENT_ID
  ) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ELEMENT_ID;
    document.head.appendChild(style);
  }
  style.innerHTML = `:root {\n${cssVars}\n}`;
};

export const initDefaultThemeCss = (defaultTheme?: ThemeConfig) => {
  injectThemeCss(defaultTheme || DEFAULT_THEME);
};
