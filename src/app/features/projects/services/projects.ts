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
        en: 'Cross-platform student scheduling app built on a strict KMP shared-first architecture. Business logic, state management, DI, networking, and local persistence all live in commonMain. The only platform-specific code is the UI layer.',
        fr: "Application d'agenda étudiant cross-platform construite sur une architecture KMP strictement partagée-first. La logique métier, la gestion d'état, l'injection de dépendances, le réseau et la persistance locale vivent tous dans commonMain. Le seul code spécifique à une plateforme, c'est la couche UI.",
      },
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
      sections: [
        {
          title: { en: 'The Design Principle', fr: 'Le principe de conception' },
          body: {
            en: "Everything that can be shared, is shared. Business logic, state management, dependency injection, networking, and local persistence all live in commonMain. The only platform-specific code is the UI layer — Jetpack Compose on Android, SwiftUI on iOS. This isn't a target to approximate — it's a hard constraint enforced at the module level.",
            fr: "Tout ce qui peut être partagé, l'est. La logique métier, la gestion d'état, l'injection de dépendances, le réseau et la persistance locale vivent tous dans commonMain. Le seul code spécifique à une plateforme, c'est la couche UI — Jetpack Compose sur Android, SwiftUI sur iOS. Ce n'est pas un objectif à approximer — c'est une contrainte dure enforced au niveau module.",
          },
        },
        {
          title: { en: 'Architecture', fr: 'Architecture' },
          body: {
            en: 'The shared module is structured Feature-First. Each feature owns its full vertical slice — data/, domain/, and presentation/ — with no cross-feature imports permitted. Data flows in one direction:',
            fr: 'Le module partagé est structuré Feature-First. Chaque feature possède sa tranche verticale complète — data/, domain/ et presentation/ — sans imports inter-features autorisés. Le flux de données est unidirectionnel :',
          },
          diagram: [
            'Native UI (Compose / SwiftUI)',
            '  → ViewModel (shared, StateFlow)',
            '    → UseCase (pure domain logic)',
            '      → Repository Interface (domain contract)',
            '        → RepositoryImpl (data layer)',
            '          → Room KMP (local) / Ktor (remote)',
          ],
        },
        {
          title: { en: 'Key Decisions', fr: 'Décisions architecturales clés' },
          body: {
            en: 'Mapping is layered and purposeful. DTOs from the network never touch the domain layer — a SyncMapper converts them to Room Entities, and an EntityMapper converts Entities to pure domain models. Presentation mappers exist for one purpose only: converting typed domain errors into localized strings.\n\nThe MVI contract is explicit per feature: an immutable State, a sealed Action class for user intent, and a UiEffect for one-shot events like navigation. All ViewModels inherit from BaseViewModel, which provides the handle {} DSL for processing AppResult<T> responses without repetitive success/failure boilerplate.\n\nThe Swift bridge uses SKIE (Touchlab), which exposes Kotlin Flows as native Swift AsyncSequence — no wrapper classes on the iOS side, clean SwiftUI views.\n\nStorage follows a decision tree: relational data → Room, user preferences → DataStore (Proto), auth tokens → platform Keychain/Keystore, file paths (never raw files) → Room. No exceptions.',
            fr: "La stratégie de mapping est stratifiée et intentionnelle. Les DTOs du réseau ne touchent jamais la couche domaine — un SyncMapper les convertit en Room Entities, et un EntityMapper convertit les Entities en modèles domaine purs. Les presentation mappers existent pour une seule raison : convertir des erreurs domaine typées en chaînes localisées.\n\nLe contrat MVI est explicite par feature : un State immutable, une classe Action sealée pour l'intention utilisateur, et un UiEffect pour les événements one-shot comme la navigation. Tous les ViewModels héritent de BaseViewModel, qui fournit le DSL handle {} pour traiter les réponses AppResult<T> sans boilerplate success/failure répétitif.\n\nLe bridge Swift utilise SKIE (Touchlab), qui expose les Kotlin Flows comme des AsyncSequence Swift natifs — pas de classes wrapper côté iOS, des vues SwiftUI propres.\n\nLe contrat de stockage est enforced par un arbre de décision : données relationnelles → Room, préférences utilisateur → DataStore (Proto), tokens d'auth → Keychain/Keystore de la plateforme, chemins de fichiers (jamais les fichiers bruts) → Room. Aucune exception.",
          },
        },
      ],
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
      tags: ['Kotlin Multiplatform', 'Compose Canvas', 'Supabase', 'Offline-First'],
      featured: true,
      sections: [
        {
          title: { en: 'The Problem', fr: 'Le problème' },
          body: {
            en: 'Non-linear open-world games — the kind with massive, hand-crafted maps — generate enormous amounts of community knowledge: where to find things, hidden paths, puzzle solutions. That knowledge lives in wikis, Discord servers, and YouTube videos. It should live in a companion app that works offline, on any platform, and lets the community contribute directly.',
            fr: "Les jeux non-linéaires à monde ouvert — ceux avec des cartes massives et artisanales — génèrent d'énormes quantités de connaissances communautaires : où trouver les choses, les chemins cachés, les solutions de puzzles. Ces connaissances vivent dans des wikis, des serveurs Discord et des vidéos YouTube. Elles devraient vivre dans une application compagnon qui fonctionne hors ligne, sur n'importe quelle plateforme, et qui permet à la communauté de contribuer directement.",
          },
        },
        {
          title: { en: 'Map Engine', fr: 'Moteur de carte' },
          body: {
            en: 'Built on Compose Canvas with a custom spatial coordinate system — not a wrapped mapping SDK. This means implementing viewport culling, zoom-level tile management, and coordinate projection from scratch. The payoff is full control over how community-contributed markers and annotations are layered and rendered at any resolution. KMP file handling manages the underlying high-res map assets — large image segmentation, tile caching, and lazy loading happen in the shared module so the strategy is identical on both platforms.',
            fr: "Construit sur Compose Canvas avec un système de coordonnées spatiales custom — pas un SDK de cartographie encapsulé. Cela signifie implémenter le viewport culling, la gestion des tuiles par niveau de zoom, et la projection de coordonnées from scratch. Le résultat : un contrôle total sur la façon dont les marqueurs et annotations contributés par la communauté sont superposés et rendus à n'importe quelle résolution. La gestion de fichiers KMP gère les assets de carte haute résolution — la segmentation d'images, le cache de tuiles et le chargement paresseux se passent dans le module partagé.",
          },
        },
        {
          title: { en: 'Offline-First Sync', fr: 'Synchronisation offline-first' },
          body: {
            en: 'Community sync is offline-first via Supabase. The local Room database is the source of truth; Supabase handles conflict resolution and propagation when connectivity is restored. Users can contribute markers, routes, and annotations without an internet connection — sync happens in the background.\n\nThe design constraint driving every decision: the app must be fully functional with no network connection, and community data must never feel stale or inconsistent when it comes back online.',
            fr: "La synchronisation communautaire est offline-first via Supabase. La base de données Room locale est la source de vérité ; Supabase gère la résolution de conflits et la propagation quand la connectivité est rétablie. Les utilisateurs peuvent contribuer des marqueurs, routes et annotations sans connexion internet — la synchronisation se fait en arrière-plan.\n\nLa contrainte de conception qui gouverne chaque décision : l'application doit être pleinement fonctionnelle sans connexion réseau, et les données communautaires ne doivent jamais sembler périmées ou incohérentes au retour en ligne.",
          },
        },
      ],
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
      tags: ['Kotlin Multiplatform', 'Compose Canvas', 'Supabase', 'Offline-First'],
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
        en: 'Student onboarding site shipped to production. UQTR auth, file uploads, reCAPTCHA v3 protection, PostgreSQL, deployed via Docker.',
        fr: "Site d'intégration étudiant livré en production sur les serveurs de l'AMI. Auth UQTR, upload de fichiers, protection reCAPTCHA v3, base de données PostgreSQL, déployé sous Docker.",
      },
      tags: ['Angular', 'NestJS', 'PostgreSQL', 'Docker'],
      links: [{ label: 'Live', url: 'https://ami.uqtr.ca/integration/', icon: 'open_in_new' }],
    },
    {
      title: 'AMI Pow Pow',
      subtitle: 'AMI — UQTR',
      description: {
        en: 'Real-time two-player speed duel game with game code system, deployed on AMI servers.',
        fr: "Jeu de duel temps-réel pour deux joueurs avec système de code de partie, déployé sur les serveurs de l'AMI.",
      },
      tags: ['Angular', 'NestJS', 'WebSockets'],
      links: [{ label: 'Live', url: 'https://ami.uqtr.ca/pow-pow/', icon: 'open_in_new' }],
    },
    {
      title: 'ASUQTR Website',
      subtitle: 'ASUQTR Submarine Team',
      description: {
        en: 'Public website for the student autonomous submarine team. Embedded 3D model, deployed with Docker/Nginx.',
        fr: "Site web pour l'équipe de sous-marin autonome étudiant. Modèle 3D intégré, déployé avec Docker/Nginx.",
      },
      tags: ['Angular', 'Express', 'Docker', 'Nginx'],
      links: [{ label: 'Live', url: 'https://asuqtr.com/', icon: 'open_in_new' }],
    },
  ];

  getDetail(slug: string): ProjectDetail | undefined {
    return this._details[slug];
  }
}
