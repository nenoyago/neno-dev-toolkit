import { InjectionToken } from '@angular/core';
import { ThemeConfig } from './theme-config';
import { DEFAULT_THEME } from './default-theme';

export const THEME_CONFIG = new InjectionToken<ThemeConfig>('THEME_CONFIG');
