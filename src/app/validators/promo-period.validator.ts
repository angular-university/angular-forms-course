import { SchemaPath, validateTree } from '@angular/forms/signals';

export function promoPeriod<T extends { promoStartAt: Date | null; promoEndAt: Date | null }>(
  path: SchemaPath<T>,
  options?: { message?: string }
) {
  validateTree(path, ({ value }) => {
    const { promoStartAt, promoEndAt } = value();
    if (promoStartAt && promoEndAt && promoEndAt.getTime() - promoStartAt.getTime() <= 0) {
      return { kind: 'promoPeriod', message: options?.message ?? 'Start date must be before end date.' };
    }
    return null;
  });
}
