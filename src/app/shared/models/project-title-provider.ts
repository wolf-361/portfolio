import { InjectionToken } from '@angular/core';

export const PROJECT_TITLE_PROVIDER = new InjectionToken<(slug: string) => string | undefined>(
  'PROJECT_TITLE_PROVIDER',
);
