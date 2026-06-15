import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { PortfolioTitleStrategy } from './core/title-strategy';
import { PROJECT_TITLE_PROVIDER } from './shared/models/project-title-provider';
import { ProjectsService } from './features/projects/services/projects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'disabled' }),
    ),
    { provide: TitleStrategy, useClass: PortfolioTitleStrategy },
    {
      provide: PROJECT_TITLE_PROVIDER,
      useFactory: (projects: ProjectsService) => (slug: string) => projects.getDetail(slug)?.title,
      deps: [ProjectsService],
    },
  ],
};
