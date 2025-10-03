import { DEFAULT_THEME } from './default-theme';
import { ThemeConfig } from './theme-config';

const STYLE_ELEMENT_ID = 'liv-design-system-theme';

/**
 * Lê uma variável CSS do :root
 */
const getCssVariable = (name: string): string | null => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || null;
};

/**
 * Verifica se uma categoria do tema está definida no :root
 * Retorna true se pelo menos uma variável da categoria existir
 */
const hasCssThemeCategory = (prefix: string, keys: string[]): boolean => {
  return keys.some((key) => getCssVariable(`--${prefix}-${key}`) !== null);
};

/**
 * Lê uma categoria inteira do tema do :root
 */
const readCssThemeCategory = <T extends Record<string, string>>(
  prefix: string,
  defaultValues: T
): T | undefined => {
  const keys = Object.keys(defaultValues);

  // Se nenhuma variável da categoria existe, retorna undefined
  if (!hasCssThemeCategory(prefix, keys)) {
    return undefined;
  }

  // Lê todas as variáveis ou usa o default se não existir
  const result = {} as T;
  for (const key of keys) {
    const cssValue = getCssVariable(`--${prefix}-${key}`);
    result[key as keyof T] = (cssValue ?? defaultValues[key]) as T[keyof T];
  }

  return result;
};

/**
 * Lê o tema completo do :root (se disponível)
 */
const readCssTheme = (): ThemeConfig => {
  return {
    colors: readCssThemeCategory('color', DEFAULT_THEME.colors),
    opacities: readCssThemeCategory('opacity', DEFAULT_THEME.opacities),
    shadows: readCssThemeCategory('shadow', DEFAULT_THEME.shadows),
    gradients: readCssThemeCategory('gradient', DEFAULT_THEME.gradients)
  };
};

export const injectThemeCss = (theme: ThemeConfig) => {
  // Lê o tema do CSS :root
  const cssTheme = readCssTheme();

  // Faz o merge: DEFAULT_THEME -> provideTheme -> CSS :root
  // CSS :root tem a maior prioridade
  const mergedTheme = {
    colors: cssTheme.colors ?? theme.colors ?? DEFAULT_THEME.colors ?? {},
    opacities:
      cssTheme.opacities ?? theme.opacities ?? DEFAULT_THEME.opacities ?? {},
    shadows: cssTheme.shadows ?? theme.shadows ?? DEFAULT_THEME.shadows ?? {},
    gradients:
      cssTheme.gradients ?? theme.gradients ?? DEFAULT_THEME.gradients ?? {}
  };

  const cssVars = [
    ...Object.entries(mergedTheme.colors).map(
      ([key, value]) => `--color-${key}: ${value};`
    ),
    ...Object.entries(mergedTheme.opacities).map(
      ([key, value]) => `--opacity-${key}: ${value};`
    ),
    ...Object.entries(mergedTheme.shadows).map(
      ([key, value]) => `--shadow-${key}: ${value};`
    ),
    ...Object.entries(mergedTheme.gradients).map(
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
