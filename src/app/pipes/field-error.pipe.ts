import { Pipe, PipeTransform } from '@angular/core';
import { ReadonlyFieldState } from '@angular/forms/signals';

@Pipe({ name: 'fieldError', pure: false })
export class FieldErrorPipe implements PipeTransform {
  transform(fieldState: ReadonlyFieldState<unknown>): string | null {
    if (!fieldState.touched() || !fieldState.invalid()) return null;
    return fieldState.errors()[0]?.message ?? null;
  }
}
