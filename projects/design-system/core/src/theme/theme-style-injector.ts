import { DEFAULT_THEME } from './default-theme';
import { ThemeConfig } from './theme-config';

const STYLE_ELEMENT_ID = 'liv-design-system-theme';

export const injectThemeCss = (theme: ThemeConfig) => {
  const cssVars = [
    ...Object.entries(theme.colors).map(
      ([key, value]) => `--color-${key}: ${value};`
    ),
    ...Object.entries(theme.opacities).map(
      ([key, value]) => `--opacity-${key}: ${value};`
    ),
    ...Object.entries(theme.shadows).map(
      ([key, value]) => `--shadow-${key}: ${value};`
    ),
    ...Object.entries(theme.gradients).map(
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
