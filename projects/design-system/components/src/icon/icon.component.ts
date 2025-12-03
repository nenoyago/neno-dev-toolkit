import { NgClass } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';

import { IconName as NgIconName, NgIcon } from '@ng-icons/core';

type HeroIconName = Extract<
  Exclude<
    NgIconName,
    `hero${string}Solid` | `hero${string}Mini` | `hero${string}Micro`
  >,
  `hero${string}`
>;

type LucideIconName = Extract<NgIconName, `lucide${string}`>;

type IconName = HeroIconName | LucideIconName;

export type IconInput = IconName | (string & {});

interface IconBaseComponentProps {
  name: InputSignal<IconInput>;
  size: InputSignal<string>;
  class?: InputSignal<string>;
  ngClass?: InputSignal<string | string[] | Record<string, boolean>>;
  style?: InputSignal<Record<string, string>>;
}

@Component({
  standalone: true,
  template: ''
})
abstract class IconBaseComponent implements IconBaseComponentProps {
  readonly name = input.required<IconInput>();
  readonly size = input('', {
    transform: (value: string) => {
      if (value === '') return value; // Allow empty string
      const sizeNum = Number(value);
      if (isNaN(sizeNum) || sizeNum <= 0) {
        throw new Error(
          `Invalid size value: ${value}. Must be a positive number.`
        );
      }
      return value;
    }
  });
  readonly strokeWidth = input<string | number, number>('2', {
    transform: (value: string | number) => {
      if (typeof value === 'string') {
        const num = parseFloat(value);
        if (isNaN(num)) {
          throw new Error(
            `Invalid strokeWidth value: ${value}. Must be a valid number.`
          );
        }
        return num;
      }
      return value;
    }
  });
  readonly class = input<string>('');
  readonly ngClass = input<string | string[] | Record<string, boolean>>('');
  readonly style = input<Record<string, string>>({});
}
@Component({
  selector: 'liv-icon',
  imports: [NgIcon, NgClass],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  host: {
    class: 'contents'
  }
})
export class IconComponent extends IconBaseComponent {}
