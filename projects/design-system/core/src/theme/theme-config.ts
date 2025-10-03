type Theme = {
  colors: {
    // Main - Primário
    'main-primary-50': string;
    'main-primary-100': string;
    'main-primary-200': string;
    'main-primary-300': string;
    'main-primary-400': string;
    'main-primary-500': string;
    'main-primary-600': string;
    'main-primary-700': string;
    'main-primary-800': string;
    'main-primary-900': string;
    'main-primary-950': string;

    // Main - Secundário
    'main-secondary-50': string;
    'main-secondary-100': string;
    'main-secondary-200': string;
    'main-secondary-300': string;
    'main-secondary-400': string;
    'main-secondary-500': string;
    'main-secondary-600': string;
    'main-secondary-700': string;
    'main-secondary-800': string;
    'main-secondary-900': string;
    'main-secondary-950': string;

    // Neutral
    'neutral-50': string;
    'neutral-100': string;
    'neutral-200': string;
    'neutral-300': string;
    'neutral-400': string;
    'neutral-500': string;
    'neutral-600': string;
    'neutral-700': string;
    'neutral-800': string;
    'neutral-900': string;
    'neutral-950': string;
    'neutral-1000': string;

    // Feedback
    'feedback-success-light': string;
    'feedback-success-medium': string;
    'feedback-success-dark': string;
    'feedback-warning-light': string;
    'feedback-warning-medium': string;
    'feedback-warning-dark': string;
    'feedback-error-light': string;
    'feedback-error-medium': string;
    'feedback-error-dark': string;
    'feedback-info-light': string;
    'feedback-info-medium': string;
    'feedback-info-dark': string;

    // Text
    'text-light': string;
    'text-medium': string;
    'text-dark': string;
    'text-heading': string;
    'text-link': string;

    // Backgrounds
    'background-dark': string;
    'background-medium': string;
    'background-light': string;
    'background-primary-white': string;
    'background-primary-dark': string;
  };
  opacities: {
    // Dark
    'dark-50': string;
    'dark-100': string;
    'dark-200': string;
    'dark-400': string;
    'dark-800': string;

    // Light
    'light-50': string;
    'light-100': string;
    'light-200': string;
    'light-400': string;
    'light-800': string;
  };
  shadows: {
    soft: string;
    medium: string;
    strong: string;
  };
  gradients: {
    scrim: string;
    light: string;
    dark: string;
    'dark-alt': string;
  };
};

export type FullTheme = Theme;
export type ThemeConfig = Partial<Theme>;
