import { NgClass } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';

type Variant = 'primary' | 'secondary' | 'tertiary';

@Component({
  selector: 'ds-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  readonly variant = input<Variant>('secondary');
  readonly disabled = input(false, {
    transform: booleanAttribute
  });
}
