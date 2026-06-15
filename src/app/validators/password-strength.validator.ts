import { SchemaPath } from '@angular/forms/signals';
import { validate } from '@angular/forms/signals';

export function passwordStrength(path: SchemaPath<string>, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const password = value();
    if (!password) return null;
    const valid = /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
    return valid ? null : {
      kind: 'passwordStrength',
      message: options?.message ?? 'Must contain lower, upper and numeric characters.'
    };
  });
}
