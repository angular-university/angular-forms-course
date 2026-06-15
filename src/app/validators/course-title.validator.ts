import { SchemaPath, validateHttp } from '@angular/forms/signals';

export function courseTitleExists(path: SchemaPath<string>) {
  validateHttp<string, { payload: Array<{ description: string }> }>(path, {
    request: (ctx) => (ctx.value() ? '/api/courses' : undefined),
    onSuccess: (result, ctx) => {
      const found = result?.payload?.find(
        (c) => c.description.toLowerCase() === ctx.value()?.toLowerCase()
      );
      return found ? { kind: 'titleExists', message: 'This title is already being used.' } : null;
    },
    onError: () => null,
  });
}
