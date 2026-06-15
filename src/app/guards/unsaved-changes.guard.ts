import { CanDeactivateFn } from '@angular/router';

export type HasUnsavedChanges = {
  hasUnsavedChanges(): boolean;
};

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  if (component.hasUnsavedChanges()) {
    return confirm('You have unsaved changes. Leave the page?');
  }
  return true;
};
