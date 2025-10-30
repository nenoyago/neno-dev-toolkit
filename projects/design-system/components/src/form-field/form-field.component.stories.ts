import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Meta, StoryObj } from '@storybook/angular';

import { FormFieldComponent } from './form-field.component';
import { InputComponent } from '../input/input.component';

const meta: Meta = {
  title: 'Components/Form Field',
  component: FormFieldComponent,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof FormFieldComponent>;

export const Default: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [InputComponent, ReactiveFormsModule]
    },
    props: {
      formGroup: new FormGroup({
        name: new FormControl('', [Validators.required])
      })
    },
    template: `
      <form [formGroup]="formGroup">
        <liv-form-field label="Nome" hint="Digite seu nome completo">
          <liv-input formControlName="name" placeholder="Seu nome" />
        </liv-form-field>
      </form>
    `
  })
};
