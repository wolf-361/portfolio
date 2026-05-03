import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Single-page shell — all sections live here as anchor fragments
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then((m) => m.HomePageComponent),
  },
  {
    // Project case study — the only true separate route
    path: 'projects/:slug',
    loadComponent: () =>
      import('./features/projects/pages/project-detail-page/project-detail-page').then(
        (m) => m.ProjectDetailPageComponent,
      ),
  },
  {
    // 404 — catch-all
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found-page').then((m) => m.NotFoundPageComponent),
  },
];
