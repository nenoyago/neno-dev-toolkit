import { FullTheme } from './theme-config';

export const DEFAULT_THEME: FullTheme = {
  colors: {
    // Main - Primário
    'main-primary-50': '#F2F2F2',
    'main-primary-100': '#DDD7EA',
    'main-primary-200': '#BCAAE4',
    'main-primary-300': '#9E84D7',
    'main-primary-400': '#7F5DCB',
    'main-primary-500': '#5E30C5',
    'main-primary-600': '#4E2F92',
    'main-primary-700': '#3E2574',
    'main-primary-800': '#251645',
    'main-primary-900': '#100A1F',
    'main-primary-950': '#000000',

    // Main - Secundário
    'main-secondary-50': '#EEEEEE',
    'main-secondary-100': '#EFEFEF',
    'main-secondary-200': '#C9D8E9',
    'main-secondary-300': '#9EBEE1',
    'main-secondary-400': '#77A4D4',
    'main-secondary-500': '#4F89C8',
    'main-secondary-600': '#3770AF',
    'main-secondary-700': '#3470B1',
    'main-secondary-800': '#1E3E61',
    'main-secondary-900': '#12253A',
    'main-secondary-950': '#000000',

    // Neutral
    'neutral-50': '#FFFFFF',
    'neutral-100': '#FAF9FA',
    'neutral-200': '#DFDDE4',
    'neutral-300': '#C5C1CD',
    'neutral-400': '#AAA5B6',
    'neutral-500': '#8F899F',
    'neutral-600': '#756D87',
    'neutral-700': '#5D576B',
    'neutral-800': '#44404F',
    'neutral-900': '#2D2A34',
    'neutral-950': '#141217',

    // Feedback
    'feedback-success-light': '#93B2B7',
    'feedback-success-medium': '#5A82AA',
    'feedback-success-dark': '#397770',
    'feedback-warning-light': '#FFE6CD',
    'feedback-warning-medium': '#FAD05F',
    'feedback-warning-dark': '#F7C050',
    'feedback-error-light': '#F7B7B7',
    'feedback-error-medium': '#E41112',
    'feedback-error-dark': '#B4010E',
    'feedback-info-light': '#FAF3FA',
    'feedback-info-medium': '#44404F',
    'feedback-info-dark': '#2D2A34',

    // Text
    'text-light': '#AAA5B6', // Neutral 400
    'text-medium': '#756D87', // Neutral 600
    'text-dark': '#2D2A34', // Neutral 900
    'text-heading': '#3E2574', // Main Secondary 700
    'text-link': '#4F89C8', // Main Secondary 500

    // Backgrounds
    'background-white': '#FAF9FA',
    'background-dark': '#141217',
    'background-medium': '#251645',
    'background-light': '#DFDDE4'
  },
  opacities: {
    // Dark
    'dark-50': '#dadada',
    'dark-100': '#c2c2c2',
    'dark-200': '#91919133',
    'dark-400': '#61616166',
    'dark-800': '#303030cc',

    // Light
    'light-50': '#ffffff0d',
    'light-100': '#ffffff1a',
    'light-200': '#ffffff33',
    'light-400': '#ffffff66',
    'light-800': '#ffffffcc'
  },
  shadows: {
    soft: '2px 0px 2px 0px rgba(0,0,0,0.15)',
    medium: '8px 0px 4px 0px rgba(0,0,0,0.15)',
    strong: '16px 0px 8px 0px rgba(0,0,0,0.20)'
  },
  gradients: {
    scrim: 'linear-gradient(90deg, #919191 0%, #dadada 100%)',
    light: 'linear-gradient(90deg, #ffffff 0%, #dadada 100%)',
    dark: 'linear-gradient(90deg, #3e2574 0%, #4e2f92 100%)',
    medium: 'linear-gradient(90deg, #7f5dcb 0%, #4e2f92 100%)'
  }
};
