import { NgClass, NgComponentOutlet } from '@angular/common';
import { Component, inject, Injector, input, InputSignal } from '@angular/core';

import { provideIcons, IconName as NgIconName, NgIcon } from '@ng-icons/core';

const AVAILABLE_ICONS_IMPORT = [
  import('@ng-icons/heroicons/outline'),
  import('@ng-icons/lucide')
];

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
  strokeWidth?: InputSignal<number>;
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
  readonly size = input<string>('');
  readonly strokeWidth = input<number>(1.5);
  readonly class = input<string>('');
  readonly ngClass = input<string | string[] | Record<string, boolean>>('');
  readonly style = input<Record<string, string>>({});
}

@Component({
  selector: 'liv-icon-render',
  imports: [NgIcon, NgClass],
  template: `
    @if (name(); as name) {
      <ng-icon
        [name]="name"
        [size]="size()"
        [strokeWidth]="strokeWidth()"
        [class]="class()"
        [ngClass]="ngClass()"
        [style]="style()"
      />
    }
  `
})
class IconRenderComponent extends IconBaseComponent {}

@Component({
  selector: 'liv-icon',
  imports: [NgComponentOutlet],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent extends IconBaseComponent {
  private readonly parentInjector = inject(Injector);

  protected injector: Injector | null = null;
  protected child = IconRenderComponent;

  async ngOnInit() {
    const name = this.name();

    if (!name) {
      this.injector = this.parentInjector;
      throw new Error('Icon name is required');
    }

    const isCustomIcon =
      typeof name === 'string' &&
      !name.startsWith('hero') &&
      !name.startsWith('lucide');

    if (isCustomIcon) {
      this.injector = Injector.create({
        providers: [],
        parent: this.parentInjector
      });
      return;
    }

    try {
      // @ts-ignore
      for await (const { [name]: icon } of AVAILABLE_ICONS_IMPORT) {
        if (icon) {
          this.injector = Injector.create({
            providers: [provideIcons({ [name]: icon })],
            parent: this.parentInjector
          });
          break;
        }
        this.injector = this.parentInjector;
      }
    } catch (err) {
      console.error('Error loading icon:', err);
      this.injector = this.parentInjector;
    }
  }
}
