import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgpInput } from 'ng-primitives/input';

export const INPUT_IMPORTS = [NgpInput, FormsModule, NgClass];

export const INPUT_CLASSES =
  'shadow-sm block w-full border-0 outline-none transition-all duration-150 disabled:cursor-not-allowed ring-1 ring-inset focus-within:ring-2 disabled:opacity-40 pr-3 pl-3 group-has-[span[data-slot=leading]:not(:empty)]/wrapper:pl-10 group-has-[span[data-slot=trailing]:not(:empty)]/wrapper:pr-10';

export const LEADING_SPAN_CLASSES =
  'peer/leading absolute inset-y-0 left-3 flex items-center empty:hidden';

export const TRAILING_SPAN_CLASSES =
  'peer/trailing absolute inset-y-0 right-3 flex items-center empty:hidden';

export const LEADING_SPAN_CLASSES_NON_INTERACTIVE = `${LEADING_SPAN_CLASSES} pointer-events-none`;

export const TRAILING_SPAN_CLASSES_NON_INTERACTIVE = `${TRAILING_SPAN_CLASSES} pointer-events-none`;

export const WRAPPER_CLASSES = 'group/wrapper relative';
