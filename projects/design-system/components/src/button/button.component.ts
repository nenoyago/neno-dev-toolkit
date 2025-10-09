import { NgClass } from '@angular/common';
import { booleanAttribute, Component, input, output } from '@angular/core';

type Variant = 'primary' | 'secondary';

@Component({
  selector: 'liv-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  readonly variant = input<Variant>('primary');
  readonly disabled = input(false, {
    transform: booleanAttribute
  });
  readonly formId = input('', {
    transform: (value) => (value === null ? '' : value)
  });
  readonly htmlType = input<'button' | 'submit' | 'reset'>('button');

  readonly buttonClick = output<MouseEvent>();

  onClick(event: MouseEvent) {
    this.buttonClick.emit(event);
  }
}
