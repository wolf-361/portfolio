import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then((m) => m.HomePageComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/pages/projects-page/projects-page').then(
        (m) => m.ProjectsPageComponent,
      ),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./features/projects/pages/project-detail-page/project-detail-page').then(
        (m) => m.ProjectDetailPageComponent,
      ),
  },
];
