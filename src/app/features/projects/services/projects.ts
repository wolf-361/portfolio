import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { ProjectDetail } from '../models/project-detail';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly _details: Record<string, ProjectDetail> = {
    planific: {
      slug: 'planific',
      title: 'Planific',
      subtitle: 'Studio Drave · Android & iOS',
      status: 'In Development',
      description: {
        en: 'Cross-platform student planner for Android and iOS. The shared KMP module owns 100% of domain logic, state, and data — only the UI is platform-specific.',
        fr: "Agenda étudiant multiplateforme pour Android et iOS. Le module KMP partagé détient 100 % de la logique métier, l'état et les données — seule l'interface est spécifique à chaque plateforme.",
      },
      tags: [
        'Kotlin Multiplatform',
        'Jetpack Compose',
        'SwiftUI',
        'Ktor',
        'Room KMP',
        'SKIE',
        'Koin',
        'MVI',
      ],
      featured: true,
      meta: {
        role: { en: 'Lead Mobile', fr: 'Lead Mobile' },
        roleDetail: { en: 'Architecture, UI, KMP', fr: 'Architecture, UI, KMP' },
        duration: { en: '8 months · 2025', fr: '8 mois · 2025' },
        team: { en: '2 devs · solo design', fr: '2 devs · design solo' },
      },
      sections: [
        {
          id: 'problem',
          title: { en: 'Three apps, zero overview.', fr: "Trois apps, zéro vue d'ensemble." },
          tocLabel: { en: 'The Problem', fr: 'Le Problème' },
          body: {
            en: 'Students juggle their university portal, a shared calendar, a notes app, and — often — a paper planner. Each source imposes its own format: schedules in iCal, assignments in PDF, exam dates on Moodle. Nobody has a clear view of the week ahead.\n\nThe goal: <strong>one screen, updated in real time</strong>, that aggregates these streams and exposes a planning layer — smart reminders, schedule conflicts, weekly load. Everything had to work offline and preserve the native aesthetic of each platform.',
            fr: "Les étudiants jonglent quotidiennement avec leur portail universitaire, un agenda partagé, une app de notes et — souvent — un calendrier papier. Chaque source impose son propre format : horaires en iCal, devoirs en PDF, dates d'examen sur Moodle. Personne n'a une vue claire de la semaine à venir.\n\nL'objectif : <strong>un seul écran, mis à jour en temps réel</strong>, qui agrège ces flux et expose une couche de planification — rappels intelligents, conflits d'horaire, charge hebdomadaire. Le tout devait fonctionner hors-ligne et conserver l'esthétique native de chaque plateforme.",
          },
          highlight: {
            text: {
              en: 'How do you share 80% of the code between iOS and Android without sacrificing the native feel, or offline autonomy?',
              fr: "Comment partager 80% du code entre iOS et Android sans sacrifier le feeling natif, ni l'autonomie hors-ligne ?",
            },
            attribution: {
              en: 'founding question of the project',
              fr: 'question fondatrice du projet',
            },
          },
        },
        {
          id: 'architecture',
          title: { en: 'Shared brain, native surface.', fr: 'Cerveau partagé, surface native.' },
          tocLabel: { en: 'Architecture', fr: "L'Architecture" },
          body: {
            en: 'We chose <strong>Kotlin Multiplatform</strong> for the business layer: models, validation, sync, caching. Each platform keeps its native renderer — <mark>Jetpack Compose</mark> on Android, <mark>SwiftUI</mark> on iOS — both driven by the same <mark>StateFlow</mark>-based ViewModel.\n\n<strong>Shared module (commonMain) — 10 features, Feature-First:</strong>\n\n<ul><li><strong>Business layer (~95% of non-UI code shared)</strong> — domain models, UseCases, Repository interfaces, sync engine, iCal parsers.</li><li><strong>Persistence</strong> — <mark>Room KMP</mark> for a typed, shared schema with migration support from common code.</li><li><strong>Networking</strong> — <mark>Ktor</mark> client with interceptors, typed error handling via a custom <mark>AppResult&lt;T&gt;</mark> DSL.</li><li><strong>DI</strong> — <mark>Koin</mark> modules declared once in shared, platform apps just call <code>startKoin{}</code>.</li><li><strong>Swift bridge</strong> — <mark>SKIE</mark> (Touchlab) exposes Kotlin Flows as native <code>AsyncSequence</code> — zero wrapper classes on the iOS side.</li></ul>',
            fr: "Nous avons choisi <strong>Kotlin Multiplatform</strong> pour la couche métier : modèles, validation, synchronisation, cache. Chaque plateforme garde son moteur de rendu natif — <mark>Jetpack Compose</mark> sur Android, <mark>SwiftUI</mark> sur iOS — pilotés par un même ViewModel basé sur <mark>StateFlow</mark>.\n\n<strong>Module partagé (commonMain) — 10 features, Feature-First :</strong>\n\n<ul><li><strong>Couche métier (~95% du code non-UI mutualisé)</strong> — modèles domaine, UseCases, interfaces Repository, moteur de sync, parseurs iCal.</li><li><strong>Persistance</strong> — <mark>Room KMP</mark> pour un schéma typé, partagé, et migrable depuis le code commun.</li><li><strong>Réseau</strong> — client <mark>Ktor</mark> avec intercepteurs, gestion d'erreurs typée via un DSL <mark>AppResult&lt;T&gt;</mark> maison.</li><li><strong>DI</strong> — modules <mark>Koin</mark> déclarés une fois dans shared, les apps plateformes appellent juste <code>startKoin{}</code>.</li><li><strong>Bridge Swift</strong> — <mark>SKIE</mark> (Touchlab) expose les Kotlin Flows comme des <code>AsyncSequence</code> Swift natifs — zéro classe wrapper côté iOS.</li></ul>",
          },
          svgDiagram: `<svg viewBox="0 0 640 340" xmlns="http://www.w3.org/2000/svg" font-family="var(--font-mono)" font-size="12">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="var(--mat-sys-outline-variant)"/>
    </marker>
  </defs>

  <!-- Native UI row -->
  <rect x="40" y="16" width="180" height="44" rx="6" fill="var(--mat-sys-surface-container-high)" stroke="var(--mat-sys-outline-variant)" stroke-width="1"/>
  <text x="130" y="34" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">Compose Screen</text>
  <text x="130" y="50" text-anchor="middle" fill="var(--mat-sys-primary)" font-size="10">Android</text>

  <rect x="420" y="16" width="180" height="44" rx="6" fill="var(--mat-sys-surface-container-high)" stroke="var(--mat-sys-outline-variant)" stroke-width="1"/>
  <text x="510" y="34" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">SwiftUI View</text>
  <text x="510" y="50" text-anchor="middle" fill="var(--mat-sys-primary)" font-size="10">iOS</text>

  <!-- Arrows from UI to ViewModel -->
  <line x1="130" y1="60" x2="295" y2="104" stroke="var(--mat-sys-outline-variant)" stroke-width="1" marker-end="url(#arr)"/>
  <line x1="510" y1="60" x2="348" y2="104" stroke="var(--mat-sys-outline-variant)" stroke-width="1" marker-end="url(#arr)"/>

  <!-- Shared badge -->
  <rect x="200" y="96" width="240" height="44" rx="6" fill="color-mix(in srgb, var(--mat-sys-primary) 12%, var(--mat-sys-surface-container))" stroke="var(--mat-sys-primary)" stroke-width="1"/>
  <text x="320" y="114" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">ViewModel</text>
  <text x="320" y="130" text-anchor="middle" fill="var(--mat-sys-primary)" font-size="10">shared · StateFlow</text>

  <line x1="320" y1="140" x2="320" y2="164" stroke="var(--mat-sys-outline-variant)" stroke-width="1" marker-end="url(#arr)"/>

  <rect x="200" y="166" width="240" height="44" rx="6" fill="color-mix(in srgb, var(--mat-sys-primary) 12%, var(--mat-sys-surface-container))" stroke="var(--mat-sys-primary)" stroke-width="1"/>
  <text x="320" y="184" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">UseCase</text>
  <text x="320" y="200" text-anchor="middle" fill="var(--mat-sys-primary)" font-size="10">pure domain logic</text>

  <line x1="320" y1="210" x2="320" y2="234" stroke="var(--mat-sys-outline-variant)" stroke-width="1" marker-end="url(#arr)"/>

  <rect x="200" y="236" width="240" height="44" rx="6" fill="color-mix(in srgb, var(--mat-sys-primary) 12%, var(--mat-sys-surface-container))" stroke="var(--mat-sys-primary)" stroke-width="1"/>
  <text x="320" y="254" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">RepositoryImpl</text>
  <text x="320" y="270" text-anchor="middle" fill="var(--mat-sys-primary)" font-size="10">shared</text>

  <!-- Arrows to storage -->
  <line x1="270" y1="280" x2="155" y2="304" stroke="var(--mat-sys-outline-variant)" stroke-width="1" marker-end="url(#arr)"/>
  <line x1="370" y1="280" x2="487" y2="304" stroke="var(--mat-sys-outline-variant)" stroke-width="1" marker-end="url(#arr)"/>

  <!-- Storage row -->
  <rect x="40" y="296" width="200" height="36" rx="6" fill="var(--mat-sys-surface-container-high)" stroke="var(--mat-sys-outline-variant)" stroke-width="1"/>
  <text x="140" y="314" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">Room KMP</text>
  <text x="140" y="326" text-anchor="middle" fill="var(--mat-sys-on-surface-variant)" font-size="10">local</text>

  <rect x="400" y="296" width="200" height="36" rx="6" fill="var(--mat-sys-surface-container-high)" stroke="var(--mat-sys-outline-variant)" stroke-width="1"/>
  <text x="500" y="314" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">Ktor</text>
  <text x="500" y="326" text-anchor="middle" fill="var(--mat-sys-on-surface-variant)" font-size="10">remote</text>
</svg>`,
          highlight: {
            text: {
              en: 'DTOs from the network never touch the domain layer. Every boundary has an explicit mapper — Dto → Entity → Domain — enforced by the architecture doc.',
              fr: "Les DTOs du réseau ne touchent jamais la couche domaine. Chaque frontière a un mapper explicite — Dto → Entity → Domain — imposé par le document d'architecture.",
            },
            attribution: { en: 'Studio Drave golden rule', fr: "règle d'or Studio Drave" },
          },
        },
        {
          id: 'results',
          title: {
            en: 'Real numbers, measured on the repo.',
            fr: 'Des chiffres réels, mesurés sur le dépôt.',
          },
          tocLabel: { en: 'Results', fr: 'Les Résultats' },
          body: {
            en: 'The 53% figure is the honest measure of shared code across the full codebase — including both native UI layers. Exclude the UI (which is platform-specific <em>by design</em>) and <strong>95% of all business logic is shared</strong>: domain models, sync engine, caching, validation, DI, navigation.\n\nA single <mark>commonTest</mark> suite covers the domain layer for both platforms simultaneously. There is no Android test and no iOS test for business logic — there is one test.',
            fr: "Le chiffre de 53% est la mesure honnête du code partagé sur l'ensemble du dépôt — couches UI natives incluses. Exclure l'UI (spécifique à chaque plateforme <em>par conception</em>) et <strong>95% de toute la logique métier est partagée</strong> : modèles domaine, moteur de sync, cache, validation, DI, navigation.\n\nUne seule suite <mark>commonTest</mark> couvre la couche domaine pour les deux plateformes simultanément. Il n'y a pas de test Android ni de test iOS pour la logique métier — il y a un seul test.",
          },
          stats: [
            {
              value: '53%',
              label: {
                en: 'Total shared code (UI included)',
                fr: 'Code partagé total (UI incluse)',
              },
            },
            {
              value: '95%',
              label: {
                en: 'Non-UI logic shared across platforms',
                fr: 'Logique non-UI mutualisée',
              },
            },
            {
              value: '1×',
              label: {
                en: 'Test suite for both platforms',
                fr: 'Suite de tests pour les deux plateformes',
              },
            },
          ],
        },
      ],
      pager: {
        nextSlug: 'waystone',
        nextTitle: 'Waystone',
      },
    },

    waystone: {
      slug: 'waystone',
      title: 'Waystone',
      subtitle: 'Studio Drave · Android & iOS',
      status: 'Architecting',
      description: {
        en: 'KMP companion engine for non-linear open-world games. Custom map renderer on Compose Canvas with viewport culling and zoom-level tile management. Offline-first community sync via Supabase.',
        fr: 'Moteur compagnon KMP pour les jeux non-linéaires à monde ouvert. Moteur de carte custom sur Compose Canvas avec viewport culling et gestion des tuiles par niveau de zoom. Synchronisation communautaire offline-first via Supabase.',
      },
      tags: ['Kotlin Multiplatform', 'Compose Canvas', 'SQLDelight', 'Supabase', 'Offline-First'],
      featured: true,
      meta: {
        role: { en: 'Lead Mobile', fr: 'Lead Mobile' },
        duration: { en: 'Ongoing · 2025', fr: 'En cours · 2025' },
        team: { en: 'Solo', fr: 'Solo' },
      },
      sections: [
        {
          id: 'problem',
          title: {
            en: 'Community knowledge, scattered.',
            fr: 'La connaissance communautaire, éparpillée.',
          },
          tocLabel: { en: 'The Problem', fr: 'Le Problème' },
          body: {
            en: 'Non-linear open-world games generate enormous amounts of community knowledge: where to find things, hidden paths, puzzle solutions. That knowledge lives in wikis, Discord servers, and YouTube videos.\n\nIt should live in a companion app that works offline, on any platform, and lets the community contribute directly.',
            fr: "Les jeux non-linéaires à monde ouvert génèrent d'énormes quantités de connaissances communautaires : où trouver les choses, les chemins cachés, les solutions de puzzles. Ces connaissances vivent dans des wikis, des serveurs Discord et des vidéos YouTube.\n\nElles devraient vivre dans une application compagnon qui fonctionne hors ligne, sur n'importe quelle plateforme, et qui permet à la communauté de contribuer directement.",
          },
          highlight: {
            text: {
              en: 'The app must be fully functional with no network connection.',
              fr: "L'application doit être pleinement fonctionnelle sans connexion réseau.",
            },
            attribution: { en: 'non-negotiable constraint', fr: 'contrainte non négociable' },
          },
        },
        {
          id: 'map-engine',
          title: { en: 'Custom map engine.', fr: 'Moteur de carte custom.' },
          tocLabel: { en: 'Map Engine', fr: 'Moteur de carte' },
          body: {
            en: 'Built on Compose Canvas with a custom spatial coordinate system — not a wrapped mapping SDK. This means implementing viewport culling, zoom-level tile management, and coordinate projection from scratch.\n\nThe payoff is full control over how community-contributed markers and annotations are layered and rendered at any resolution. KMP file handling manages the underlying high-res map assets — large image segmentation, tile caching, and lazy loading happen in the shared module so the strategy is identical on both platforms.',
            fr: 'Construit sur Compose Canvas avec un système de coordonnées spatiales custom — pas un SDK de cartographie encapsulé. Cela signifie implémenter le viewport culling, la gestion des tuiles par niveau de zoom, et la projection de coordonnées from scratch.\n\nLe résultat : un contrôle total sur la façon dont les marqueurs et annotations sont superposés et rendus. La gestion de fichiers KMP gère les assets haute résolution dans le module partagé — stratégie identique sur les deux plateformes.',
          },
        },
        {
          id: 'sync',
          title: { en: 'Offline-first sync.', fr: 'Synchronisation offline-first.' },
          tocLabel: { en: 'Sync Strategy', fr: 'Stratégie de sync' },
          body: {
            en: 'Community sync is offline-first via Supabase. The local SQLDelight database is the source of truth; Supabase handles conflict resolution and propagation when connectivity is restored. Users can contribute markers, routes, and annotations without an internet connection — sync happens in the background.',
            fr: 'La synchronisation communautaire est offline-first via Supabase. La base de données SQLDelight locale est la source de vérité ; Supabase gère la résolution de conflits et la propagation quand la connectivité est rétablie. Les utilisateurs peuvent contribuer des marqueurs, routes et annotations sans connexion internet — la synchronisation se fait en arrière-plan.',
          },
          stats: [
            {
              value: 'Offline',
              label: { en: 'First — always functional', fr: 'First — toujours fonctionnel' },
            },
            { value: 'KMP', label: { en: 'Shared map engine', fr: 'Moteur de carte partagé' } },
            { value: 'CRDT', label: { en: 'Conflict-free sync', fr: 'Sync sans conflits' } },
          ],
        },
      ],
      pager: {
        prevSlug: 'planific',
        prevTitle: 'Planific',
      },
    },
  };

  readonly featured: Project[] = [
    {
      title: 'Planific',
      slug: 'planific',
      subtitle: 'Studio Drave · Android & iOS',
      status: 'In Development',
      description: this._details['planific'].description,
      tags: [
        'Kotlin Multiplatform',
        'Jetpack Compose',
        'SwiftUI',
        'Room KMP',
        'Ktor',
        'Koin',
        'SKIE',
        'MVI',
      ],
      featured: true,
    },
    {
      title: 'Waystone',
      slug: 'waystone',
      subtitle: 'Studio Drave · Android & iOS',
      status: 'Architecting',
      description: this._details['waystone'].description,
      tags: ['Kotlin Multiplatform', 'Compose Canvas', 'SQLDelight', 'Supabase', 'Offline-First'],
      featured: true,
    },
  ];

  readonly academic: Project[] = [
    {
      title: "Bob's Food",
      subtitle: 'Academic · Full Stack',
      description: {
        en: 'Online ordering app simulating a restaurant. CI/CD pipeline with automatic Docker image updates per branch.',
        fr: 'Application de commande en ligne simulant un restaurant. Pipeline CI/CD avec mise à jour automatique des images Docker selon la branche.',
      },
      tags: ['Angular', 'NestJS', 'PostgreSQL', 'Docker'],
      links: [
        { label: 'GitHub', url: 'https://github.com/wolf-361/bobs-food', icon: 'open_in_new' },
      ],
    },
    {
      title: 'AMI Integration Website',
      subtitle: 'AMI — UQTR · 2023 & 2024',
      description: {
        en: 'Student onboarding site shipped to production.',
        fr: "Site d'intégration étudiant livré en production.",
      },
      tags: ['Angular', 'NestJS', 'PostgreSQL', 'Docker'],
      links: [{ label: 'Live', url: 'https://ami.uqtr.ca/integration/', icon: 'open_in_new' }],
    },
  ];

  getDetail(slug: string): ProjectDetail | undefined {
    return this._details[slug];
  }
}
