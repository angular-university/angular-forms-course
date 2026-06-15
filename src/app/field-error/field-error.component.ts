import { Component, input } from '@angular/core';
import { ReadonlyFieldState } from '@angular/forms/signals';

@Component({
  selector: 'field-error',
  template: `
    @if (field().touched() && field().invalid()) {
      <div class="err">{{ field().errors()[0]?.message }}</div>
    }
  `
})
export class FieldErrorComponent {
  field = input.required<ReadonlyFieldState<unknown>>();
}
