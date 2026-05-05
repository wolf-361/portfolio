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
        en: 'Spoiler-safe companion app for non-linear open-world games. Photograph any map, pin locations, track progress — free and fully local. Curated maps with fog-of-war reveal mechanics and community sync are the paid tier.',
        fr: "Application compagnon sans spoilers pour les jeux non-linéaires. Photographiez n'importe quelle carte, épinglez des emplacements, suivez votre progression — gratuit et 100% local. Les cartes curées avec brouillard de guerre et synchronisation communautaire forment le palier payant.",
      },
      tags: ['Kotlin Multiplatform', 'Compose Canvas', 'SQLDelight', 'Supabase', 'Freemium'],
      featured: true,
      meta: {
        role: { en: 'Founder · Sole Engineer', fr: 'Fondateur · Ingénieur solo' },
        roleDetail: { en: 'Architecture, Product, Design', fr: 'Architecture, Produit, Design' },
        duration: { en: 'Ongoing · 2025', fr: 'En cours · 2025' },
        team: { en: 'Solo', fr: 'Solo' },
      },
      sections: [
        {
          id: 'problem',
          title: {
            en: 'Every guide is a spoiler.',
            fr: 'Chaque guide est un spoiler.',
          },
          tocLabel: { en: 'The Problem', fr: 'Le Problème' },
          body: {
            en: 'Non-linear games like <strong>Hollow Knight: Silksong</strong> are built around discovery. The moment you search for help, a wiki dumps the entire map, every item, every secret — all at once. There is no middle ground between "completely lost" and "everything ruined."\n\nExisting companion apps are either too generic (photo notes, no spatial context) or too revealing (full community maps with every pin visible by default). Neither respects the pacing of discovery that makes these games worth playing.',
            fr: "Les jeux non-linéaires comme <strong>Hollow Knight : Silksong</strong> sont construits autour de la découverte. Dès que vous cherchez de l'aide, un wiki déverse la carte complète, chaque objet, chaque secret — d'un seul coup. Il n'existe pas de juste milieu entre « complètement perdu » et « tout gâché ».\n\nLes applications compagnon existantes sont soit trop génériques (notes photo, sans contexte spatial), soit trop révélatrices (cartes communautaires avec toutes les épingles visibles par défaut). Aucune ne respecte le rythme de la découverte.",
          },
          highlight: {
            text: {
              en: 'How do you give players exactly the help they asked for — and nothing more?',
              fr: "Comment donner aux joueurs exactement l'aide demandée — et rien de plus ?",
            },
            attribution: {
              en: 'founding constraint of the product',
              fr: 'contrainte fondatrice du produit',
            },
          },
        },
        {
          id: 'design',
          title: { en: 'The world stays visible.', fr: 'Le monde reste visible.' },
          tocLabel: { en: 'Design System', fr: 'Système de design' },
          body: {
            en: 'The core UI constraint: <strong>the map is always the primary surface</strong>. Search bars, filter strips, bottom sheets, and FABs all sit on 24px backdrop-blur glass panels — the cartography underneath never disappears.\n\nThe palette is built for dark environments: deep <mark>#08000F</mark> base, warm <mark>Burfoo</mark> surface, amber accent. Pins follow a strict 5-category taxonomy, each with a diamond glyph and a dedicated color role:\n\n<ul><li><strong style="color:#e8472a">Obstacle</strong> — crimson. Blocks or hazards that gate progress.</li><li><strong style="color:#f5a623">Quest</strong> — gold. Story and objective markers.</li><li><strong style="color:#4caf50">Loot</strong> — jade. Collectibles and items.</li><li><strong style="color:#9c27b0">Secret</strong> — violet. Hidden or off-path discoveries.</li><li><strong style="color:#f44336">Enemy</strong> — red. Threat markers.</li></ul>\n\nUndiscovered pins render at 65% opacity — present but muted. Revealed pins snap to full color. The visual language communicates reveal state without any additional UI chrome.',
            fr: "La contrainte UI centrale : <strong>la carte est toujours la surface primaire</strong>. Barres de recherche, filtres, bottom sheets et FAB sont posés sur des panneaux en verre avec 24px de backdrop-blur — la cartographie ne disparaît jamais.\n\nLa palette est conçue pour les environnements sombres : base <mark>#08000F</mark>, surface <mark>Burfoo</mark> chaude, accent ambre. Les épingles suivent une taxonomie stricte à 5 catégories, chacune avec un glyphe losange et un rôle couleur dédié :\n\n<ul><li><strong style='color:#e8472a'>Obstacle</strong> — cramoisi. Blocages ou dangers qui conditionnent la progression.</li><li><strong style='color:#f5a623'>Quête</strong> — or. Marqueurs d'objectifs et de scénario.</li><li><strong style='color:#4caf50'>Butin</strong> — jade. Collectibles et objets.</li><li><strong style='color:#9c27b0'>Secret</strong> — violet. Découvertes cachées ou hors-chemin.</li><li><strong style='color:#f44336'>Ennemi</strong> — rouge. Marqueurs de menace.</li></ul>\n\nLes épingles non découvertes s'affichent à 65% d'opacité — présentes mais atténuées. Les épingles révélées passent à pleine couleur. Le langage visuel communique l'état de révélation sans chrome UI supplémentaire.",
          },
        },
        {
          id: 'model',
          title: {
            en: 'Free forever, paid for depth.',
            fr: 'Gratuit pour toujours, payant pour la profondeur.',
          },
          tocLabel: { en: 'Product Model', fr: 'Modèle produit' },
          body: {
            en: "The free tier is fully functional with no account required. Photograph any map — the game box, a hand-drawn dungeon layout, a screenshot — and Waystone converts it into a pinnable spatial canvas. Drop markers across all 5 categories, write notes, track what you've cleared. Everything stays on-device.\n\nThe paid tier unlocks <strong>curated maps</strong>: official high-res layouts for specific games, pre-loaded with community-contributed points of interest. This is where the spoiler problem becomes an engineering problem.\n\n<strong>Fog-of-war reveal system:</strong>\n\n<ul><li><strong>All pins hidden by default.</strong> The map looks clean — no information you didn't earn.</li><li><strong>Long-press any spot</strong> to reveal that a pin exists there, without showing what it is. Mark it visited without being spoiled.</li><li><strong>Act-scoped unlocks</strong> — reveal all pins for a completed zone when you want a completeness check.</li><li><strong>Hint-first reveals</strong> — tap a hidden pin for a cryptic clue. One more tap to see the full annotation.</li></ul>",
            fr: "Le palier gratuit est pleinement fonctionnel sans compte requis. Photographiez n'importe quelle carte et Waystone la convertit en canevas spatial épinglable. Posez des marqueurs dans les 5 catégories, rédigez des notes, suivez votre progression. Tout reste sur l'appareil.\n\nLe palier payant débloque les <strong>cartes curées</strong> : mises en page officielles haute résolution pré-chargées avec les points d'intérêt communautaires. C'est là que le problème de spoilers devient un problème d'ingénierie.\n\n<strong>Système de révélation brouillard de guerre :</strong>\n\n<ul><li><strong>Toutes les épingles cachées par défaut.</strong> La carte est propre — aucune info non gagnée.</li><li><strong>Appui long sur un spot</strong> pour révéler qu'une épingle existe, sans montrer ce que c'est.</li><li><strong>Déverrouillages par acte</strong> — révélez toutes les épingles d'une zone complétée pour vérifier la complétion.</li><li><strong>Révélations par indice</strong> — appuyez sur une épingle cachée pour un indice cryptique. Un appui de plus pour l'annotation complète.</li></ul>",
          },
        },
        {
          id: 'architecture',
          title: {
            en: 'Local-first, sync as a feature.',
            fr: 'Local-first, sync comme fonctionnalité.',
          },
          tocLabel: { en: 'Architecture', fr: "L'Architecture" },
          body: {
            en: 'The free tier must work with <strong>zero network calls</strong>. This is a hard constraint that shapes every layer.\n\n<strong>Shared KMP module (commonMain):</strong>\n\n<ul><li><strong>SQLDelight</strong> — typed queries at compile time, single schema shared across Android and iOS. The <code>RevealState</code> enum (<code>HIDDEN → HINTED → REVEALED → COMPLETED</code>) is persisted per pin.</li><li><strong>Camera → tile pipeline</strong> — photos are segmented into tiles in commonMain, stored locally, rendered by the Compose Canvas engine with viewport culling and zoom-level management.</li><li><strong>Supabase sync</strong> (paid) — delta sync on reconnect, last-write-wins conflict resolution per pin. Community contributions go through a moderation queue before entering the curated dataset.</li></ul>',
            fr: "Le palier gratuit doit fonctionner avec <strong>zéro appel réseau</strong>. C'est une contrainte ferme qui structure chaque couche.\n\n<strong>Module KMP partagé (commonMain) :</strong>\n\n<ul><li><strong>SQLDelight</strong> — requêtes typées à la compilation, schéma unique partagé entre Android et iOS. L'enum <code>RevealState</code> (<code>HIDDEN → HINTED → REVEALED → COMPLETED</code>) est persisté par épingle.</li><li><strong>Pipeline caméra → tuiles</strong> — les photos sont segmentées en tuiles dans commonMain, stockées localement, rendues par le moteur Compose Canvas avec viewport culling et gestion par niveau de zoom.</li><li><strong>Sync Supabase</strong> (payant) — sync delta à la reconnexion, last-write-wins par épingle. Les contributions communautaires passent par une file de modération.</li></ul>",
          },
          stats: [
            {
              value: '0',
              label: { en: 'Network calls — free tier', fr: 'Appels réseau — free tier' },
            },
            {
              value: '5',
              label: {
                en: 'Pin categories + reveal states',
                fr: 'Catégories + états de révélation',
              },
            },
            {
              value: 'KMP',
              label: { en: 'Camera + map engine shared', fr: 'Caméra + moteur partagés' },
            },
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
