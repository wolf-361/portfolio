import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Single-page shell — all sections live here as anchor fragments
    path: '',
    title: 'Luc Allaire — KMP Developer',
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then((m) => m.HomePageComponent),
  },
  {
    // Project case study — dynamic title resolved by PortfolioTitleStrategy
    path: 'projects/:slug',
    loadComponent: () =>
      import('./features/projects/pages/project-detail-page/project-detail-page').then(
        (m) => m.ProjectDetailPageComponent,
      ),
  },
  {
    // 404 — catch-all
    path: '**',
    title: '404 — Luc Allaire',
    loadComponent: () =>
      import('./features/not-found/not-found-page').then((m) => m.NotFoundPageComponent),
  },
];
