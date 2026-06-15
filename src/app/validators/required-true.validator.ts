import { SchemaPath, validate } from '@angular/forms/signals';

export function requiredTrue(path: SchemaPath<boolean>, options?: { message?: string }) {
  validate(path, ({ value }) =>
    value() === true ? null : { kind: 'requiredTrue', message: options?.message ?? 'This field must be checked.' }
  );
}
