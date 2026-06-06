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
      status: { en: 'In Development', fr: 'En développement' },
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
        duration: { en: 'Ongoing · 2026', fr: 'En cours · 2026' },
        team: { en: '2 devs · solo design', fr: '2 devs · design solo' },
      },
      heroVisual: { type: 'phone' },
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
          diagramLabel: 'planific-architecture.svg',
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
      status: { en: 'Architecting', fr: 'En conception' },
      description: {
        en: 'Spoiler-safe companion app for non-linear open-world games. Photograph any map, pin locations, track progress — free and fully local. Curated maps with fog-of-war reveal mechanics and community sync are the paid tier.',
        fr: "Application compagnon sans spoilers pour les jeux non-linéaires. Photographiez n'importe quelle carte, épinglez des emplacements, suivez votre progression — gratuit et 100% local. Les cartes curées avec brouillard de guerre et synchronisation communautaire forment le palier payant.",
      },
      tags: ['Kotlin Multiplatform', 'Compose Canvas', 'SQLDelight', 'Supabase', 'Freemium'],
      featured: true,
      meta: {
        role: { en: 'Founder · Sole Engineer', fr: 'Fondateur · Ingénieur solo' },
        roleDetail: { en: 'Architecture, Product, Design', fr: 'Architecture, Produit, Design' },
        duration: { en: 'Not started · 2026', fr: 'Pas encore commencé · 2026' },
        team: { en: 'Solo', fr: 'Solo' },
      },
      heroVisual: { type: 'phone' },
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
        nextSlug: 'templates',
        nextTitle: 'Starter Templates',
      },
    },

    templates: {
      slug: 'templates',
      title: 'Starter Templates',
      subtitle: 'Open Source · KMP · Angular · Spring',
      status: { en: 'Maintained', fr: 'Maintenu' },
      description: {
        en: 'Four production-ready starters — KMP (Android + iOS + Fastlane CI), Angular 21 (Material M3, signals, ESLint boundaries), Spring identity service (JWT + OAuth PKCE), and Spring core service (JWT consumer, vertical slices). Each stands alone. All four compose over a shared Bearer JWT contract.',
        fr: 'Quatre starters prêts pour la production — KMP (Android + iOS + Fastlane CI), Angular 21 (Material M3, signals, ESLint boundaries), service identité Spring (JWT + OAuth PKCE) et service core Spring (consommateur JWT, slices verticales). Chacun fonctionne seul. Les quatre se composent via un contrat Bearer JWT partagé.',
      },
      tags: [
        'Kotlin Multiplatform',
        'Angular 21',
        'Spring Boot',
        'Fastlane',
        'Vitest',
        'Playwright',
      ],
      featured: false,
      links: [
        { label: 'KMP', url: 'https://github.com/wolf-361/kmp-template' },
        { label: 'Angular', url: 'https://github.com/wolf-361/angular-21-standalone-template' },
        { label: 'Spring Identity', url: 'https://github.com/wolf-361/spring-identity-template' },
        { label: 'Spring Core', url: 'https://github.com/wolf-361/spring-core-template' },
      ],
      meta: {
        role: { en: 'Author', fr: 'Auteur' },
        roleDetail: { en: 'Architecture, DX, CI/CD', fr: 'Architecture, DX, CI/CD' },
        duration: { en: 'Ongoing · 2026', fr: 'En cours · 2026' },
        team: { en: 'Solo · Open Source', fr: 'Solo · Open Source' },
      },
      heroVisual: { type: 'none' },
      sections: [
        {
          id: 'problem',
          title: { en: 'Every project starts the same.', fr: 'Chaque projet commence pareil.' },
          tocLabel: { en: 'The Problem', fr: 'Le Problème' },
          body: {
            en: "Starting a new KMP project means wiring Koin, Room, Ktor, SKIE, and Fastlane from scratch — then configuring ESLint, Husky, commitlint, and Vitest for the Angular companion — then standing up Spring Security, JWT validation, Flyway migrations, and an identity service. That's days of setup before writing a single line of business logic.\n\nThe deeper problem: without enforced structure, each project accumulates its own conventions. Cross-feature imports creep in. The test pyramid collapses. Decisions that should be architecture become accidents of the first sprint.",
            fr: "Démarrer un projet KMP implique de brancher Koin, Room, Ktor, SKIE et Fastlane depuis zéro — puis de configurer ESLint, Husky, commitlint et Vitest pour le compagnon Angular — puis de monter Spring Security, la validation JWT, les migrations Flyway et un service d'identité. C'est des jours de configuration avant d'écrire une seule ligne de logique métier.\n\nLe problème plus profond : sans structure imposée, chaque projet accumule ses propres conventions. Les imports cross-features s'infiltrent. La pyramide de tests s'effondre. Les décisions qui devraient relever de l'architecture deviennent des accidents du premier sprint.",
          },
          highlight: {
            text: {
              en: "A template is not a starting point — it's a contract. It should be impossible to violate the architecture accidentally.",
              fr: "Un template n'est pas un point de départ — c'est un contrat. Il doit être impossible de violer l'architecture accidentellement.",
            },
            attribution: { en: 'design principle', fr: 'principe de conception' },
          },
        },
        {
          id: 'kmp',
          title: { en: 'KMP — shared by default.', fr: 'KMP — partagé par défaut.' },
          tocLabel: { en: 'KMP Template', fr: 'Template KMP' },
          body: {
            en: "The KMP template enforces Feature-First Clean Architecture in <code>commonMain</code> from the first commit. Every feature ships with <code>domain/</code>, <code>data/</code>, and <code>presentation/</code> layers — no shortcuts allowed by the module graph.\n\n<strong>What's pre-wired:</strong>\n\n<ul><li><strong>Koin DI</strong> — <code>CoreModule</code> and <code>AuthModule</code> declared in shared, platform apps call <code>startKoin{}</code> with zero additional config.</li><li><strong>Ktor client</strong> — <code>NetworkClient</code> interface + <code>BearerAuthPlugin</code> for transparent token injection. <code>AppResult&lt;T&gt;</code> DSL wraps every network call. Point it at spring-identity's base URL and it just works.</li><li><strong>Room KMP</strong> — <code>AppDatabase</code> with <code>DataStoreFactory</code> for platform-specific driver construction in a single expect/actual pair.</li><li><strong>SKIE</strong> — configured in Gradle, exposes all Flows as native <code>AsyncSequence</code> on iOS with zero wrapper code.</li><li><strong>Fastlane</strong> — <code>android/deploy</code> builds a signed AAB and uploads to Play Store internal track. <code>ios/deploy</code> runs Match cert management + TestFlight upload. Both lanes are CI-ready via environment variables.</li><li><strong>BaseViewModel</strong> — sealed MVI contract: immutable <code>State</code>, <code>Action</code> channel, one-shot <code>UiEffect</code> per feature.</li></ul>",
            fr: "Le template KMP impose la Feature-First Clean Architecture dans <code>commonMain</code> dès le premier commit. Chaque feature est livrée avec les couches <code>domain/</code>, <code>data/</code> et <code>presentation/</code> — aucun raccourci permis par le graphe de modules.\n\n<strong>Ce qui est pré-branché :</strong>\n\n<ul><li><strong>Koin DI</strong> — <code>CoreModule</code> et <code>AuthModule</code> déclarés dans shared, les apps plateformes appellent <code>startKoin{}</code> sans config supplémentaire.</li><li><strong>Client Ktor</strong> — interface <code>NetworkClient</code> + <code>BearerAuthPlugin</code> pour l'injection transparente de token. Le DSL <code>AppResult&lt;T&gt;</code> enveloppe chaque appel réseau. Pointez-le sur l'URL de spring-identity et c'est fonctionnel.</li><li><strong>Room KMP</strong> — <code>AppDatabase</code> avec <code>DataStoreFactory</code> pour la construction du driver spécifique à chaque plateforme en une seule paire expect/actual.</li><li><strong>SKIE</strong> — configuré dans Gradle, expose tous les Flows comme <code>AsyncSequence</code> Swift natifs sans code wrapper.</li><li><strong>Fastlane</strong> — <code>android/deploy</code> construit un AAB signé et l'envoie sur la piste interne du Play Store. <code>ios/deploy</code> gère les certs Match + upload TestFlight. Les deux lanes sont prêtes pour le CI via variables d'environnement.</li><li><strong>BaseViewModel</strong> — contrat MVI scellé : <code>State</code> immuable, canal <code>Action</code>, <code>UiEffect</code> one-shot par feature.</li></ul>",
          },
          stats: [
            { value: '3', label: { en: 'Independent templates', fr: 'Templates indépendants' } },
            {
              value: 'PKCE',
              label: { en: 'OAuth flow — shared KMP + Spring', fr: 'Flux OAuth — KMP + Spring' },
            },
            {
              value: '2',
              label: { en: 'Fastlane lanes — iOS + Android', fr: 'Lanes Fastlane — iOS + Android' },
            },
          ],
        },
        {
          id: 'spring',
          title: { en: 'Spring — backend pair.', fr: 'Spring — la paire backend.' },
          tocLabel: { en: 'Spring Templates', fr: 'Templates Spring' },
          body: {
            en: 'The Spring pair is designed as two independent services that are meant to be deployed together — but either can be replaced. <strong>spring-identity-template</strong> is a standalone auth server: JWT issuance (HMAC-SHA256), PKCE OAuth (Google, Apple, Microsoft, GitHub), refresh token rotation, password reset via email. Any client that can attach a <code>Bearer</code> token can consume it — the KMP app, the Angular SPA, or a third-party service.\n\n<strong>spring-core-template</strong> is a JWT-consuming business API. It has no auth logic of its own — it validates tokens from the identity service via a <code>JwtValidationFilter</code>, extracts the <code>userId</code> from the subject claim, and exposes the domain via strict vertical slices:\n\n<ul><li><code>domain/</code> — pure models and repository interfaces, no framework dependencies.</li><li><code>application/</code> — <code>UseCase</code>, <code>Command</code>, and <code>Result</code> classes. No anemic service layer.</li><li><code>infrastructure/</code> — JPA adapters, REST controllers, web mappers, exception handlers.</li></ul>\n\nBoth services share: <strong>Flyway</strong> migrations, <strong>CorrelationIdFilter</strong> (trace ID on every request), <strong>Docker Compose</strong> for local development (<code>docker compose up</code> starts everything + PostgreSQL), and an <code>init.sh</code> that renames packages, updates Gradle descriptors, and installs the ktlint pre-commit hook in under 2 minutes.',
            fr: "La paire Spring est conçue comme deux services indépendants pensés pour être déployés ensemble — mais chacun peut être remplacé. <strong>spring-identity-template</strong> est un serveur d'auth autonome : émission JWT (HMAC-SHA256), OAuth PKCE (Google, Apple, Microsoft, GitHub), rotation des refresh tokens, réinitialisation de mot de passe par email. Tout client capable d'attacher un token <code>Bearer</code> peut le consommer — l'app KMP, la SPA Angular, ou un service tiers.\n\n<strong>spring-core-template</strong> est une API métier consommatrice de JWT. Elle n'a aucune logique d'auth propre — elle valide les tokens du service identité via un <code>JwtValidationFilter</code>, extrait le <code>userId</code> du claim subject, et expose le domaine via des slices verticales strictes :\n\n<ul><li><code>domain/</code> — modèles purs et interfaces repository, aucune dépendance framework.</li><li><code>application/</code> — classes <code>UseCase</code>, <code>Command</code> et <code>Result</code>. Pas de couche service anémique.</li><li><code>infrastructure/</code> — adaptateurs JPA, controllers REST, mappers web, gestionnaires d'exceptions.</li></ul>\n\nLes deux services partagent : migrations <strong>Flyway</strong>, <strong>CorrelationIdFilter</strong> (trace ID sur chaque requête), <strong>Docker Compose</strong> pour le développement local (<code>docker compose up</code> démarre tout + PostgreSQL), et un <code>init.sh</code> qui renomme les packages, met à jour les descripteurs Gradle et installe le hook pre-commit ktlint en moins de 2 minutes.",
          },
        },
        {
          id: 'angular',
          title: {
            en: 'Angular — frontend, any backend.',
            fr: "Angular — frontend, n'importe quel backend.",
          },
          tocLabel: { en: 'Angular Template', fr: 'Template Angular' },
          body: {
            en: "The Angular 21 template is frontend-only and backend-agnostic. It ships an HTTP interceptor that attaches a <code>Bearer</code> token to every outbound request — pair it with spring-identity, a Supabase project, or any OAuth-compliant server. The architecture is enforced at lint time by <strong>eslint-plugin-boundaries</strong>: the <code>core → shared → features</code> import hierarchy is a build error, not a code review comment. Cross-feature imports are statically impossible.\n\n<strong>What's pre-wired:</strong>\n\n<ul><li><strong>Signals throughout</strong> — no RxJS subscriptions in components. <code>httpResource()</code> for all data fetching, <code>computed()</code> for derived state.</li><li><strong>Material M3</strong> — full design token system via <code>_tokens.scss</code>. Run <code>bun run init</code> to set palette, font, and border-radius interactively.</li><li><strong>Auth guard + interceptor</strong> — JWT stored in memory (not localStorage), auto-refresh, redirect on 401.</li><li><strong>Feature shell</strong> — <code>mkdir -p src/app/features/{name}/{models,services,components,pages}</code> + one route registration and you have a fully wired feature.</li><li><strong>Quality gate</strong> — ESLint (boundaries + Angular rules), Prettier, Vitest for unit tests, Playwright for e2e. All configured, all passing on first clone.</li></ul>",
            fr: "Le template Angular 21 est 100% frontend et agnostique au backend. Il embarque un intercepteur HTTP qui attache un token <code>Bearer</code> à chaque requête sortante — associez-le à spring-identity, un projet Supabase, ou n'importe quel serveur OAuth-compatible. L'architecture est imposée au lint par <strong>eslint-plugin-boundaries</strong> : la hiérarchie d'imports <code>core → shared → features</code> est une erreur de build, pas un commentaire de code review. Les imports cross-features sont statiquement impossibles.\n\n<strong>Ce qui est pré-branché :</strong>\n\n<ul><li><strong>Signals partout</strong> — aucune souscription RxJS dans les composants. <code>httpResource()</code> pour toutes les fetches, <code>computed()</code> pour l'état dérivé.</li><li><strong>Material M3</strong> — système complet de tokens de design via <code>_tokens.scss</code>. Lancez <code>bun run init</code> pour configurer palette, police et border-radius interactivement.</li><li><strong>Guard + intercepteur auth</strong> — JWT stocké en mémoire (pas localStorage), rafraîchissement auto, redirection sur 401.</li><li><strong>Shell de feature</strong> — <code>mkdir -p src/app/features/{name}/{models,services,components,pages}</code> + un enregistrement de route et vous avez une feature entièrement branchée.</li><li><strong>Gate qualité</strong> — ESLint (boundaries + règles Angular), Prettier, Vitest pour les tests unitaires, Playwright pour e2e. Tout configuré, tout passant au premier clone.</li></ul>",
          },
        },
      ],
      pager: {
        prevSlug: 'waystone',
        prevTitle: 'Waystone',
        nextSlug: 'home-ops',
        nextTitle: 'Home Ops',
      },
    },

    'home-ops': {
      slug: 'home-ops',
      title: 'Home Ops',
      subtitle: 'Self-Hosted · Bare Metal · Zero-Trust',
      status: { en: 'Production', fr: 'Production' },
      description: {
        en: '3-node bare-metal Debian cluster provisioned end-to-end with Ansible. 12 roles, 9 production stacks, dual-path network (NetBird VPN for internal traffic, Cloudflare tunnels for public), mTLS + Authelia SSO, full Prometheus/Grafana/Loki observability stack. One command from fresh Debian to fully connected node.',
        fr: "Cluster bare-metal 3 nœuds Debian provisionné intégralement avec Ansible. 12 rôles, 9 stacks en production, réseau dual-path (VPN NetBird pour le trafic interne, tunnels Cloudflare pour le public), mTLS + Authelia SSO, stack d'observabilité Prometheus/Grafana/Loki complète. Une commande depuis un Debian vierge jusqu'à un nœud pleinement connecté.",
      },
      tags: ['Ansible', 'Docker', 'Traefik', 'NetBird', 'Cloudflare', 'Authelia', 'Prometheus'],
      featured: false,
      meta: {
        role: { en: 'Infrastructure Engineer', fr: 'Ingénieur infrastructure' },
        roleDetail: {
          en: 'Provisioning, Networking, Security, Ops',
          fr: 'Provisioning, Réseau, Sécurité, Ops',
        },
        duration: { en: 'Ongoing · 2026', fr: 'En cours · 2026' },
        team: { en: 'Solo · 2 months build', fr: 'Solo · 2 mois de build' },
        url: 'https://github.com/wolf-361/home-ops',
        urlLabel: { en: 'GitHub →', fr: 'GitHub →' },
      },
      heroVisual: {
        type: 'terminal',
        terminalCommand: 'ansible-playbook site.yml',
        terminalLines: [
          'PLAY [all] *****************************',
          '',
          'TASK [common : apply hardening] ********',
          'ok: [firenze]  ok: [siena]  ok: [roma]',
          '',
          'TASK [netbird : configure mesh VPN] ****',
          'ok: [firenze]  ok: [siena]  ok: [roma]',
          '',
          'PLAY RECAP *****************************',
          'firenze  : ok=18  changed=0  failed=0',
          'siena    : ok=16  changed=0  failed=0',
          'roma     : ok=16  changed=0  failed=0',
        ],
      },
      sections: [
        {
          id: 'problem',
          title: { en: 'Full control, zero vendor lock-in.', fr: 'Contrôle total, zéro lock-in.' },
          tocLabel: { en: 'The Problem', fr: 'Le Problème' },
          body: {
            en: 'Running production workloads on cloud VMs is convenient until you see the bill. More importantly, it\'s not infrastructure engineering — it\'s infrastructure renting. The goal was to build real operational depth: provisioning, networking, observability, security hardening — and to run actual production services on owned hardware.\n\nThe non-negotiable constraint: the cluster had to be <strong>reproducible from a fresh Debian install</strong>. Not "documented enough to reconstruct" — literally one command. Any node that dies gets wiped and re-provisioned in minutes. Two months of work distilled into <code>make cluster</code>.',
            fr: "Faire tourner des workloads en production sur des VMs cloud est pratique jusqu'à ce qu'on voit la facture. Plus important : ce n'est pas de l'ingénierie infrastructure — c'est de la location. L'objectif était de développer une vraie profondeur opérationnelle : provisioning, réseau, observabilité, durcissement de sécurité — et faire tourner de vrais services en production sur du matériel possédé.\n\nLa contrainte non-négociable : le cluster devait être <strong>reproductible depuis un Debian vierge</strong>. Pas « documenté suffisamment pour reconstruire » — littéralement une commande. Tout nœud qui tombe est effacé et re-provisionné en minutes. Deux mois de travail distillés en <code>make cluster</code>.",
          },
          highlight: {
            text: {
              en: "If you can't rebuild it from scratch in under 10 minutes, you don't own your infrastructure — it owns you.",
              fr: "Si vous ne pouvez pas le reconstruire depuis zéro en moins de 10 minutes, vous ne possédez pas votre infrastructure — c'est elle qui vous possède.",
            },
            attribution: { en: 'operational principle', fr: 'principe opérationnel' },
          },
        },
        {
          id: 'architecture',
          title: { en: '12 roles, one command.', fr: '12 rôles, une commande.' },
          tocLabel: { en: 'Architecture', fr: "L'Architecture" },
          body: {
            en: '<code>make cluster</code> runs <code>site.yml</code> across all nodes in a single Ansible execution. Roles apply in strict dependency order — base hardening first, networking second, orchestration last. Two playbook passes: one for all cluster nodes, one scoped to the manager only.\n\n<strong>Role breakdown — all nodes:</strong>\n<ul><li><strong>common</strong> — UFW default-deny, Fail2Ban, root login disabled, unattended security upgrades, <code>svc-runner</code> service account, UDP buffer tuning for WireGuard.</li><li><strong>netbird</strong> — WireGuard mesh VPN. Each node gets a stable <code>wt0</code> IP (100.x range). Inter-node traffic never leaves the VPN. New nodes register by setup key and report their <code>wt0</code> IP back as an Ansible fact.</li><li><strong>docker</strong> — Engine + log rotation config.</li><li><strong>traefik</strong> — Reverse proxy with dual-path entrypoints (internal on <code>wt0</code>, public via Cloudflare tunnel). Runs the mesh-companion sidecar for automatic DNS/monitor registration.</li><li><strong>cloudflared</strong> — Outbound-only Cloudflare tunnel daemon. No inbound firewall rules required.</li><li><strong>monitoring-agent</strong> — cAdvisor (container metrics) + Promtail (log shipping to Loki).</li><li><strong>cockpit</strong> — Node management UI, internal only.</li><li><strong>dev-tools</strong> — NvChad, shell utilities for the <code>wolf361</code> user.</li><li><strong>backup</strong> — Incremental backups via <strong>Restic</strong>, running nightly in staggered cron jobs. First a database pre-dump at 2:45 AM, then two concurrent targets: cross-node over SFTP to a partner node (7 daily / 4 weekly / 6 monthly retention), and Cloudflare R2 object storage (7 daily / 2 weekly / 1 monthly, with automated size monitoring against the 10 GB free tier cap).</li></ul>\n\n<strong>Manager-only roles:</strong>\n<ul><li><strong>identity</strong> — Authelia (SSO/ForwardAuth) + LLDAP (LDAP directory). All internal services route through ForwardAuth before serving a response.</li><li><strong>coolify</strong> — Control plane on <code>firenze</code>. Workers register via their <code>wt0</code> NetBird IP — never a public address.</li><li><strong>monitoring-hub</strong> — Prometheus, Grafana, Loki, Uptime Kuma. Receives metrics and logs from all agents.</li></ul>',
            fr: "<code>make cluster</code> exécute <code>site.yml</code> sur tous les nœuds en une seule exécution Ansible. Les rôles s'appliquent dans un ordre de dépendance strict — durcissement d'abord, réseau ensuite, orchestration en dernier. Deux passes de playbook : une pour tous les nœuds, une scoped au manager uniquement.\n\n<strong>Répartition des rôles — tous les nœuds :</strong>\n<ul><li><strong>common</strong> — UFW deny par défaut, Fail2Ban, login root désactivé, mises à jour de sécurité automatiques, compte <code>svc-runner</code>, tuning des buffers UDP pour WireGuard.</li><li><strong>netbird</strong> — VPN mesh WireGuard. Chaque nœud obtient une IP <code>wt0</code> stable (plage 100.x). Le trafic inter-nœuds ne quitte jamais le VPN. Les nouveaux nœuds s'enregistrent par setup key et remontent leur IP <code>wt0</code> comme fact Ansible.</li><li><strong>docker</strong> — Engine + config de rotation des logs.</li><li><strong>traefik</strong> — Reverse proxy avec entrypoints dual-path (interne sur <code>wt0</code>, public via tunnel Cloudflare). Lance le sidecar mesh-companion pour l'enregistrement automatique DNS/monitors.</li><li><strong>cloudflared</strong> — Tunnel Cloudflare sortant uniquement. Aucune règle de pare-feu entrante requise.</li><li><strong>monitoring-agent</strong> — cAdvisor (métriques conteneurs) + Promtail (envoi de logs vers Loki).</li><li><strong>cockpit</strong> — UI de gestion des nœuds, interne uniquement.</li><li><strong>dev-tools</strong> — NvChad, utilitaires shell pour l'utilisateur <code>wolf361</code>.</li><li><strong>backup</strong> — Sauvegardes incrémentales via <strong>Restic</strong>, en crons nocturnes décalés. Pré-dump de bases de données à 2h45, puis deux cibles : cross-nœud via SFTP vers un nœud partenaire (7 quotidiens / 4 hebdomadaires / 6 mensuels), et stockage objet Cloudflare R2 (7 quotidiens / 2 hebdomadaires / 1 mensuel, avec surveillance automatisée de la taille vis-à-vis du plafond gratuit de 10 Go).</li></ul>\n\n<strong>Rôles manager uniquement :</strong>\n<ul><li><strong>identity</strong> — Authelia (SSO/ForwardAuth) + LLDAP (annuaire LDAP). Tous les services internes passent par ForwardAuth avant de répondre.</li><li><strong>coolify</strong> — Control plane sur <code>firenze</code>. Les workers s'enregistrent via leur IP <code>wt0</code> NetBird — jamais une adresse publique.</li><li><strong>monitoring-hub</strong> — Prometheus, Grafana, Loki, Uptime Kuma. Reçoit métriques et logs de tous les agents.</li></ul>",
          },
          stats: [
            { value: '12', label: { en: 'Ansible roles', fr: 'Rôles Ansible' } },
            { value: '9', label: { en: 'Production stacks', fr: 'Stacks en production' } },
            {
              value: '1',
              label: {
                en: 'Command — fresh Debian to prod',
                fr: 'Commande — Debian vierge → prod',
              },
            },
          ],
        },
        {
          id: 'network',
          title: {
            en: 'Dual-path network — same domain, two routes.',
            fr: 'Réseau dual-path — même domaine, deux routes.',
          },
          tocLabel: { en: 'Network', fr: 'Réseau' },
          body: {
            en: "Every service lives under <code>*.wolf-361.ca</code> — but whether you reach it over the VPN or the public internet, Traefik routes you differently based on which entrypoint received the connection.\n\n<strong>Traefik has two TLS entrypoints:</strong>\n<ul><li><code>:443</code> (<code>internal</code>) — bound to the node's NetBird IP (<code>wt0</code>). Only reachable if you're on the VPN. Admin dashboards, Grafana, Prometheus, Cockpit, and all management UIs live here exclusively.</li><li><code>:8443</code> (<code>https</code>) — reached via the Cloudflare tunnel. The tunnel daemon maintains a persistent outbound connection to Cloudflare — no inbound port is ever opened. Public-facing services (status page, portfolio) route here.</li></ul>\n\nTraefik's DNS resolver is set to the node's own NetBird IP first, then <code>1.1.1.1</code>. On VPN, <code>*.wolf-361.ca</code> resolves to a <code>wt0</code> address — traffic stays fully internal. Off VPN, the same hostname resolves via Cloudflare DNS to the tunnel. <strong>Same domain name, two completely different traffic paths, zero port exposure.</strong>\n\n<strong>Inter-service traffic:</strong> When a service on the same node calls another (e.g. Promtail → Loki), it goes directly over the Docker <code>coolify</code> network — no VPN hop, no round-trip through Traefik. Cross-node traffic (e.g. agent → monitoring hub) goes over the NetBird WireGuard tunnel between <code>wt0</code> addresses. The VPN is the inter-node fabric; Docker networks are the intra-node fabric.\n\nAdding a new node: <code>make worker</code> — Ansible provisions, NetBird assigns <code>wt0</code>, the IP surfaces as an Ansible fact, Coolify registers the node via that internal address.",
            fr: "Chaque service vit sous <code>*.wolf-361.ca</code> — mais que vous y accédiez via le VPN ou l'internet public, Traefik vous route différemment selon l'entrypoint qui a reçu la connexion.\n\n<strong>Traefik a deux entrypoints TLS :</strong>\n<ul><li><code>:443</code> (<code>internal</code>) — lié à l'IP NetBird du nœud (<code>wt0</code>). Accessible uniquement si vous êtes sur le VPN. Les tableaux de bord admin, Grafana, Prometheus, Cockpit et toutes les UIs de gestion vivent ici exclusivement.</li><li><code>:8443</code> (<code>https</code>) — atteint via le tunnel Cloudflare. Le daemon tunnel maintient une connexion sortante persistante vers Cloudflare — aucun port entrant n'est jamais ouvert. Les services publics (status page, portfolio) passent par ici.</li></ul>\n\nLe résolveur DNS de Traefik pointe d'abord sur l'IP NetBird propre du nœud, puis sur <code>1.1.1.1</code>. Sur le VPN, <code>*.wolf-361.ca</code> résout vers une adresse <code>wt0</code> — le trafic reste entièrement interne. Hors VPN, le même hostname résout via le DNS Cloudflare vers le tunnel. <strong>Même nom de domaine, deux chemins de trafic complètement différents, zéro exposition de port.</strong>\n\n<strong>Trafic inter-services :</strong> Quand un service sur le même nœud appelle un autre (ex: Promtail → Loki), le trafic passe directement par le réseau Docker <code>coolify</code> — aucun saut VPN, aucun aller-retour par Traefik. Le trafic cross-nœud (ex: agent → monitoring hub) transite par le tunnel WireGuard NetBird entre les adresses <code>wt0</code>. Le VPN est le fabric inter-nœuds ; les réseaux Docker sont le fabric intra-nœud.\n\nAjouter un nœud : <code>make worker</code> — Ansible provisionne, NetBird assigne le <code>wt0</code>, l'IP remonte comme fact Ansible, Coolify enregistre le nœud via cette adresse interne.",
          },
          diagramLabel: 'home-ops-network.svg',
          svgDiagram: `<svg viewBox="0 0 820 330" xmlns="http://www.w3.org/2000/svg" font-family="var(--font-mono)" font-size="11">
  <defs>
    <marker id="arr-pub" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="var(--mat-sys-primary)"/>
    </marker>
    <marker id="arr-vpn" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="var(--mat-sys-tertiary)"/>
    </marker>
  </defs>

  <!-- Browser (top-left) -->
  <rect x="10" y="90" width="115" height="40" rx="6"
        fill="var(--mat-sys-surface-container-high)" stroke="var(--mat-sys-outline-variant)" stroke-width="1"/>
  <text x="67" y="107" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">Browser</text>
  <text x="67" y="121" text-anchor="middle" fill="var(--mat-sys-primary)" font-size="9">off VPN · public</text>

  <!-- VPN Client (bottom-left) -->
  <rect x="10" y="200" width="115" height="40" rx="6"
        fill="var(--mat-sys-surface-container-high)" stroke="var(--mat-sys-tertiary)" stroke-width="1"/>
  <text x="67" y="217" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">VPN Client</text>
  <text x="67" y="231" text-anchor="middle" fill="var(--mat-sys-tertiary)" font-size="9">NetBird · wt0</text>

  <!-- Cloudflare (center) -->
  <rect x="210" y="80" width="135" height="58" rx="6"
        fill="color-mix(in srgb, var(--mat-sys-primary) 10%, var(--mat-sys-surface-container))"
        stroke="var(--mat-sys-primary)" stroke-width="1"/>
  <text x="277" y="101" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">Cloudflare</text>
  <text x="277" y="116" text-anchor="middle" fill="var(--mat-sys-primary)" font-size="9">DNS + Zero-Trust</text>
  <text x="277" y="129" text-anchor="middle" fill="var(--mat-sys-on-surface-variant)" font-size="9">tunnel outbound only</text>

  <!-- Traefik outer box -->
  <rect x="460" y="70" width="225" height="145" rx="8"
        fill="var(--mat-sys-surface-container)" stroke="var(--mat-sys-outline-variant)" stroke-width="1"/>
  <text x="572" y="90" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600" font-size="12">Traefik · firenze</text>

  <!-- :8443 entrypoint box -->
  <rect x="476" y="98" width="193" height="38" rx="4"
        fill="color-mix(in srgb, var(--mat-sys-primary) 12%, var(--mat-sys-surface-container-high))"
        stroke="var(--mat-sys-primary)" stroke-width="1"/>
  <text x="572" y="114" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600" font-size="10">:8443  entrypoint https</text>
  <text x="572" y="128" text-anchor="middle" fill="var(--mat-sys-primary)" font-size="9">public services · Cloudflare</text>

  <!-- :443 entrypoint box -->
  <rect x="476" y="148" width="193" height="38" rx="4"
        fill="color-mix(in srgb, var(--mat-sys-tertiary) 12%, var(--mat-sys-surface-container-high))"
        stroke="var(--mat-sys-tertiary)" stroke-width="1"/>
  <text x="572" y="164" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600" font-size="10">:443  entrypoint internal</text>
  <text x="572" y="178" text-anchor="middle" fill="var(--mat-sys-tertiary)" font-size="9">wt0 only · admin + dashboards</text>

  <!-- Portfolio (right of :8443, vertically centered on it) -->
  <rect x="700" y="98" width="110" height="38" rx="5"
        fill="var(--mat-sys-surface-container-high)" stroke="var(--mat-sys-primary)" stroke-width="1"/>
  <text x="755" y="115" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600" font-size="10">Portfolio</text>
  <text x="755" y="128" text-anchor="middle" fill="var(--mat-sys-primary)" font-size="9">public</text>

  <!-- Grafana (right of :443, vertically centered on it) -->
  <rect x="700" y="148" width="110" height="38" rx="5"
        fill="var(--mat-sys-surface-container-high)" stroke="var(--mat-sys-tertiary)" stroke-width="1"/>
  <text x="755" y="165" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600" font-size="10">Grafana</text>
  <text x="755" y="178" text-anchor="middle" fill="var(--mat-sys-tertiary)" font-size="9">internal only</text>

  <!-- ── Arrows ── -->

  <!-- Browser → Cloudflare -->
  <line x1="125" y1="110" x2="208" y2="110"
        stroke="var(--mat-sys-primary)" stroke-width="1.5" stroke-dasharray="5,3"
        marker-end="url(#arr-pub)"/>

  <!-- Cloudflare → :8443 -->
  <path d="M345,109 C400,109 430,117 474,117"
        fill="none" stroke="var(--mat-sys-primary)" stroke-width="1.5" stroke-dasharray="5,3"
        marker-end="url(#arr-pub)"/>

  <!-- VPN Client → :443 -->
  <path d="M125,220 C300,220 360,167 474,167"
        fill="none" stroke="var(--mat-sys-tertiary)" stroke-width="1.5"
        marker-end="url(#arr-vpn)"/>

  <!-- :8443 → Portfolio -->
  <line x1="669" y1="117" x2="698" y2="117"
        stroke="var(--mat-sys-primary)" stroke-width="1" stroke-dasharray="4,3"
        marker-end="url(#arr-pub)"/>

  <!-- :443 → Grafana -->
  <line x1="669" y1="167" x2="698" y2="167"
        fill="none" stroke="var(--mat-sys-tertiary)" stroke-width="1"
        marker-end="url(#arr-vpn)"/>

  <!-- ── Legend ── -->
  <line x1="10" y1="314" x2="38" y2="314"
        stroke="var(--mat-sys-primary)" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="44" y="318" fill="var(--mat-sys-on-surface-variant)" font-size="10">Public path (Cloudflare tunnel)</text>

  <line x1="252" y1="314" x2="280" y2="314"
        stroke="var(--mat-sys-tertiary)" stroke-width="1.5"/>
  <text x="286" y="318" fill="var(--mat-sys-on-surface-variant)" font-size="10">Internal path (NetBird VPN)</text>
</svg>`,
        },
        {
          id: 'security',
          title: { en: 'Network-first security.', fr: 'Sécurité réseau en premier.' },
          tocLabel: { en: 'Security', fr: 'Sécurité' },
          body: {
            en: "<strong>Layer 1 — Network: NetBird VPN.</strong> The <code>internal</code> Traefik entrypoint is bound to the node's <code>wt0</code> interface. If you're not on the mesh, the port is unreachable — TCP never establishes. Admin dashboards, Grafana, Prometheus, Cockpit: all internal-only, no Cloudflare route exists for them.\n\n<strong>Layer 2 — Application: Authelia SSO.</strong> The public Uptime Kuma status dashboard is protected by an Authelia ForwardAuth middleware. Authelia is backed by LLDAP — a lightweight LDAP directory — and requires authentication before serving the dashboard. This gates the one public-facing management UI behind an identity check without exposing any infrastructure services.\n\n<strong>Hardening baseline (applied by the <code>common</code> role on every node):</strong>\n<ul><li>UFW default-deny — only explicitly allowed ports open.</li><li>Fail2Ban — SSH brute-force protection.</li><li>Root login disabled — key-only SSH via the <code>wolf361</code> user.</li><li>Unattended security upgrades — OS patches applied automatically.</li><li><code>svc-runner</code> service account — Docker services run as a non-root system user.</li></ul>\n\n<strong>Secrets management:</strong> Ansible Vault encrypts all credentials at rest — NetBird setup keys, Cloudflare tokens, database passwords, Kuma credentials. Three separate vault files: global (<code>group_vars/all.yml</code>) and per-host (<code>host_vars/firenze.yml</code>, <code>host_vars/roma.yml</code>). The Makefile exposes <code>make vault</code>, <code>make vault-firenze</code>, and <code>make vault-roma</code> — secrets are never in plaintext on disk.",
            fr: "<strong>Couche 1 — Réseau : VPN NetBird.</strong> L'entrypoint Traefik <code>internal</code> est lié à l'interface <code>wt0</code> du nœud. Si vous n'êtes pas sur le mesh, le port est inaccessible — TCP ne s'établit jamais. Tableaux de bord admin, Grafana, Prometheus, Cockpit : tous internes uniquement, aucune route Cloudflare n'existe pour eux.\n\n<strong>Couche 2 — Application : Authelia SSO.</strong> Le tableau de bord Uptime Kuma public est protégé par un middleware ForwardAuth Authelia. Authelia s'appuie sur LLDAP — un annuaire LDAP léger — et exige une authentification avant de servir le dashboard. Cela protège la seule UI de gestion publique derrière une vérification d'identité sans exposer aucun service d'infrastructure.\n\n<strong>Durcissement de base (appliqué par le rôle <code>common</code> sur chaque nœud) :</strong>\n<ul><li>UFW deny par défaut — seuls les ports explicitement autorisés sont ouverts.</li><li>Fail2Ban — protection contre le brute-force SSH.</li><li>Login root désactivé — SSH par clé uniquement via l'utilisateur <code>wolf361</code>.</li><li>Mises à jour de sécurité automatiques — patches OS appliqués sans intervention.</li><li>Compte de service <code>svc-runner</code> — les services Docker tournent en utilisateur système non-root.</li></ul>\n\n<strong>Gestion des secrets :</strong> Ansible Vault chiffre toutes les credentials au repos — clés NetBird, tokens Cloudflare, mots de passe de bases de données, credentials Kuma. Trois fichiers vault séparés : global (<code>group_vars/all.yml</code>) et par hôte (<code>host_vars/firenze.yml</code>, <code>host_vars/roma.yml</code>). Le Makefile expose <code>make vault</code>, <code>make vault-firenze</code> et <code>make vault-roma</code> — jamais de texte clair sur disque.",
          },
          highlight: {
            text: {
              en: "If you're not on the VPN, the port doesn't exist. Everything else is defense in depth.",
              fr: "Si vous n'êtes pas sur le VPN, le port n'existe pas. Tout le reste est défense en profondeur.",
            },
            attribution: { en: 'security model', fr: 'modèle de sécurité' },
          },
        },
        {
          id: 'observability',
          title: {
            en: 'Full-stack observability — automated.',
            fr: 'Observabilité full-stack — automatisée.',
          },
          tocLabel: { en: 'Observability', fr: 'Observabilité' },
          body: {
            en: 'The monitoring stack runs on <code>roma</code> (monitoring hub) and pulls from agents on every node. Nothing is configured by hand — the mesh-companion sidecar on each Traefik instance reads Docker labels and auto-registers monitors in Uptime Kuma when containers start, and removes them when they stop.\n\n<strong>Metrics pipeline:</strong> cAdvisor on each node exposes container CPU, memory, and network metrics. Prometheus on <code>roma</code> scrapes all nodes. Grafana visualises the data with pre-provisioned dashboards.\n\n<strong>Logs pipeline:</strong> Promtail on each node ships container logs and host system logs to Loki on <code>roma</code>. Grafana queries Loki alongside Prometheus — a single interface for metrics and logs, correlated by timestamp and node label.\n\n<strong>Uptime monitoring:</strong> The <a href="/projects/mesh-companion" style="color:var(--mat-sys-primary)">traefik-mesh-companion</a> runs as a sidecar on every Traefik instance. It watches Docker events and, when a container with <code>mesh.kuma.*</code> labels starts, automatically creates an Uptime Kuma monitor, a Cloudflare DNS record (external), and a NetBird DNS entry (internal). When the container stops, it removes all three. No manual Kuma config, no stale monitors.',
            fr: 'La stack monitoring tourne sur <code>roma</code> (hub de monitoring) et collecte depuis les agents sur chaque nœud. Rien n\'est configuré manuellement — le sidecar mesh-companion sur chaque instance Traefik lit les labels Docker et enregistre automatiquement les monitors dans Uptime Kuma au démarrage des conteneurs, et les supprime à l\'arrêt.\n\n<strong>Pipeline métriques :</strong> cAdvisor sur chaque nœud expose les métriques CPU, mémoire et réseau des conteneurs. Prometheus sur <code>roma</code> scrape tous les nœuds. Grafana visualise les données avec des dashboards pré-provisionnés.\n\n<strong>Pipeline logs :</strong> Promtail sur chaque nœud envoie les logs des conteneurs et les logs système vers Loki sur <code>roma</code>. Grafana interroge Loki et Prometheus ensemble — une seule interface pour métriques et logs, corrélés par timestamp et label de nœud.\n\n<strong>Monitoring de disponibilité :</strong> Le <a href="/projects/mesh-companion" style="color:var(--mat-sys-primary)">traefik-mesh-companion</a> tourne comme sidecar sur chaque instance Traefik. Il surveille les événements Docker et, quand un conteneur avec des labels <code>mesh.kuma.*</code> démarre, crée automatiquement un monitor Uptime Kuma, un enregistrement DNS Cloudflare (externe) et une entrée DNS NetBird (interne). À l\'arrêt du conteneur, il supprime les trois. Aucune config Kuma manuelle, aucun monitor obsolète.',
          },
          stats: [
            {
              value: '3',
              label: {
                en: 'Auth layers (VPN + mTLS + SSO)',
                fr: 'Couches auth (VPN + mTLS + SSO)',
              },
            },
            {
              value: '4',
              label: {
                en: 'Observability services (Prometheus, Grafana, Loki, Kuma)',
                fr: 'Services observabilité',
              },
            },
            {
              value: '0',
              label: {
                en: 'Manual monitor configs — mesh-companion handles it',
                fr: 'Configs monitors manuelles — mesh-companion gère',
              },
            },
          ],
        },
      ],
      pager: {
        prevSlug: 'templates',
        prevTitle: 'Starter Templates',
        nextSlug: 'mesh-companion',
        nextTitle: 'Traefik Mesh Companion',
      },
    },

    'mesh-companion': {
      slug: 'mesh-companion',
      title: 'Traefik Mesh Companion',
      subtitle: 'wolf-infra · Open Source · Go',
      status: { en: 'Production', fr: 'Production' },
      description: {
        en: 'Lightweight Go sidecar for Traefik. Watches Docker events and automatically synchronizes Traefik routing labels to Cloudflare DNS (external), NetBird DNS (internal), and Uptime Kuma monitors — enabling split-horizon DNS and zero-config observability across a multi-node cluster.',
        fr: 'Sidecar Go léger pour Traefik. Surveille les événements Docker et synchronise automatiquement les labels de routage Traefik vers DNS Cloudflare (externe), DNS NetBird (interne) et monitors Uptime Kuma — DNS split-horizon et observabilité zéro-config sur un cluster multi-nœuds.',
      },
      tags: ['Go', 'Docker', 'Traefik', 'Uptime Kuma', 'Cloudflare', 'NetBird', 'Open Source'],
      featured: false,
      links: [{ label: 'GitHub', url: 'https://github.com/wolf-infra/traefik-mesh-companion' }],
      meta: {
        role: { en: 'Author · Sole Engineer', fr: 'Auteur · Ingénieur solo' },
        roleDetail: { en: 'Architecture, Go, CI/CD', fr: 'Architecture, Go, CI/CD' },
        duration: { en: '2026', fr: '2026' },
        team: { en: 'Solo · Open Source', fr: 'Solo · Open Source' },
        url: 'https://github.com/wolf-infra/traefik-mesh-companion',
        urlLabel: { en: 'GitHub →', fr: 'GitHub →' },
      },
      heroVisual: {
        type: 'terminal',
        terminalCommand: './mesh-companion --watch',
        terminalLines: [
          'INFO  watching Traefik API for route changes',
          'INFO  new route detected: portfolio.wolf-361.ca',
          'INFO  registered DNS record  → 100.64.0.1',
          'INFO  registered monitor    → uptime-kuma',
          'INFO  route removed: old-service.wolf-361.ca',
          'INFO  cleaned up DNS + monitor entries',
        ],
      },
      sections: [
        {
          id: 'problem',
          title: {
            en: 'Every new service is three manual steps.',
            fr: "Chaque nouveau service, c'est trois étapes manuelles.",
          },
          tocLabel: { en: 'The Problem', fr: 'Le Problème' },
          body: {
            en: 'Adding a new service to the <a href="/projects/home-ops" style="color:var(--mat-sys-primary)">Home Ops cluster</a> meant three separate manual operations: create a CNAME in Cloudflare pointing at the tunnel, register the internal hostname in NetBird DNS, and add a monitor in Uptime Kuma. Across three nodes that\'s nine operations — all of which drift the moment a container is renamed, moved, or removed.\n\nInfrastructure-as-code solves provisioning reproducibility. But <strong>runtime service discovery is a different problem</strong>: the cluster needs to react to Docker lifecycle events, not just to Ansible runs. Traefik already knows everything about your services — its routing rules contain the hostnames, entrypoints, and router names. The companion reads that information and syncs it outward, automatically.',
            fr: "Ajouter un nouveau service au <a href=\"/projects/home-ops\" style=\"color:var(--mat-sys-primary)\">cluster Home Ops</a> impliquait trois opérations manuelles : créer un CNAME dans Cloudflare pointant vers le tunnel, enregistrer le hostname interne dans NetBird DNS, et ajouter un monitor dans Uptime Kuma. Sur trois nœuds, c'est neuf opérations — qui dérivent toutes dès qu'un conteneur est renommé, déplacé ou supprimé.\n\nL'infrastructure-as-code résout la reproductibilité du provisioning. Mais <strong>la découverte de services à l'exécution est un problème différent</strong> : le cluster doit réagir aux événements Docker, pas seulement aux runs Ansible. Traefik connaît déjà tout de vos services — ses règles de routage contiennent les hostnames, entrypoints et noms de routers. Le companion lit ces informations et les synchronise vers l'extérieur, automatiquement.",
          },
          highlight: {
            text: {
              en: 'The Traefik label is the source of truth. If the container is running, everything is registered. If it stops, everything is cleaned up.',
              fr: "Le label Traefik est la source de vérité. Si le conteneur tourne, tout est enregistré. S'il s'arrête, tout est nettoyé.",
            },
            attribution: { en: 'design principle', fr: 'principe de conception' },
          },
        },
        {
          id: 'architecture',
          title: { en: 'Three pipelines, one binary.', fr: 'Trois pipelines, un binaire.' },
          tocLabel: { en: 'Architecture', fr: "L'Architecture" },
          body: {
            en: "The companion is a statically linked Go binary running in a distroless <code>scratch</code> container (10.2 MB). It runs a background sync loop (<code>SYNC_INTERVAL</code>, default 1m) and reacts to Docker events in real time. All integrations implement a single <code>Processor</code> interface — adding a new provider means implementing two methods.\n\n<strong>Three concurrent pipelines:</strong>\n<ul><li><strong>Internal pipeline (NetBird DNS)</strong> — filters Traefik routers on the <code>internal</code> entrypoint. Creates NetBird DNS entries pointing to the node's <code>wt0</code> IP. Drives split-horizon resolution: VPN clients resolve <code>*.wolf-361.ca</code> to a private address.</li><li><strong>External pipeline (Cloudflare DNS)</strong> — filters routers on the <code>https</code> entrypoint. Creates CNAME records pointing to the Cloudflare tunnel UUID. Public clients resolve to the tunnel without any node IP ever being exposed.</li><li><strong>Monitoring pipeline (Uptime Kuma)</strong> — discovers all routers, groups them by container, deduplicates identical URLs. Creates and maintains two distinct Kuma objects per service: a <strong>monitor</strong> (the uptime check itself) and a <strong>public status page entry</strong> (which page the service appears on, its display order, and its group). Both are fully label-driven — no manual Kuma UI work, no config drift.</li></ul>\n\n<strong>Pure-Go rule parser:</strong> Instead of importing Traefik's internal packages (which would couple the binary to Traefik's release cycle), the companion ships a custom regex-based AST parser that extracts hosts from <code>Host()</code>, <code>PathPrefix()</code>, <code>&&</code>, and <code>||</code> expressions. The binary stays small and immune to upstream breaking changes.\n\n<strong>Coordinator/agent model:</strong> Uptime Kuma's Socket.io API has a race condition when multiple nodes write Status Page UI state simultaneously. One instance runs as <code>KUMA_COORDINATOR_MODE: server</code> and owns a sequential queue. All others are clients — they provision their monitors locally but forward UI layout instructions to the coordinator. No duplicate monitors, no conflicting writes.",
            fr: "Le companion est un binaire Go statiquement lié tournant dans un conteneur <code>scratch</code> distroless (10,2 Mo). Il exécute une boucle de sync en arrière-plan (<code>SYNC_INTERVAL</code>, défaut 1m) et réagit aux événements Docker en temps réel. Toutes les intégrations implémentent une interface <code>Processor</code> unique — ajouter un nouveau provider revient à implémenter deux méthodes.\n\n<strong>Trois pipelines concurrents :</strong>\n<ul><li><strong>Pipeline interne (DNS NetBird)</strong> — filtre les routers Traefik sur l'entrypoint <code>internal</code>. Crée des entrées DNS NetBird pointant vers l'IP <code>wt0</code> du nœud. Pilote la résolution split-horizon : les clients VPN résolvent <code>*.wolf-361.ca</code> vers une adresse privée.</li><li><strong>Pipeline externe (DNS Cloudflare)</strong> — filtre les routers sur l'entrypoint <code>https</code>. Crée des enregistrements CNAME pointant vers l'UUID du tunnel Cloudflare. Les clients publics résolvent vers le tunnel sans jamais exposer une IP de nœud.</li><li><strong>Pipeline monitoring (Uptime Kuma)</strong> — découvre tous les routers, les groupe par conteneur, déduplique les URLs identiques. Crée et maintient deux objets Kuma distincts par service : un <strong>monitor</strong> (la vérification de disponibilité) et une <strong>entrée de page de statut publique</strong> (quelle page, l'ordre d'affichage, le groupe). Les deux sont entièrement pilotés par labels — aucune manipulation manuelle dans l'UI Kuma, aucune dérive de configuration.</li></ul>\n\n<strong>Parseur de règles Go pur :</strong> Plutôt que d'importer les packages internes de Traefik (ce qui couplerait le binaire au cycle de release de Traefik), le companion embarque un parseur AST custom basé sur des regex qui extrait les hosts des expressions <code>Host()</code>, <code>PathPrefix()</code>, <code>&&</code> et <code>||</code>. Le binaire reste léger et immunisé aux breaking changes upstream.\n\n<strong>Modèle coordinateur/agent :</strong> L'API Socket.io d'Uptime Kuma a une race condition quand plusieurs nœuds écrivent l'état UI de la Status Page simultanément. Une instance tourne en <code>KUMA_COORDINATOR_MODE: server</code> et détient une file séquentielle. Toutes les autres sont clientes — elles provisionnent leurs monitors localement mais transmettent les instructions UI au coordinateur. Aucun monitor en double, aucun conflit d'écriture.",
          },
          diagramLabel: 'mesh-companion-architecture.svg',
          svgDiagram: `<svg viewBox="0 0 680 306" xmlns="http://www.w3.org/2000/svg" font-family="var(--font-mono)" font-size="11">
  <defs>
    <marker id="arr-mc2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="var(--mat-sys-outline-variant)"/>
    </marker>
    <marker id="arr-mc2-p" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="var(--mat-sys-primary)"/>
    </marker>
    <marker id="arr-mc2-t" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="var(--mat-sys-tertiary)"/>
    </marker>
  </defs>

  <!-- Docker -->
  <rect x="10" y="100" width="110" height="40" rx="6" fill="var(--mat-sys-surface-container-high)" stroke="var(--mat-sys-outline-variant)" stroke-width="1"/>
  <text x="65" y="117" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">Docker</text>
  <text x="65" y="131" text-anchor="middle" fill="var(--mat-sys-on-surface-variant)" font-size="9">labels + events</text>

  <!-- Companion -->
  <rect x="160" y="60" width="175" height="120" rx="8" fill="color-mix(in srgb, var(--mat-sys-primary) 10%, var(--mat-sys-surface-container))" stroke="var(--mat-sys-primary)" stroke-width="1.5"/>
  <text x="247" y="82" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="700" font-size="12">mesh-companion</text>
  <text x="247" y="97" text-anchor="middle" fill="var(--mat-sys-primary)" font-size="9">10.2 MB · distroless Go</text>
  <line x1="170" y1="106" x2="325" y2="106" stroke="var(--mat-sys-outline-variant)" stroke-width="0.5"/>
  <text x="247" y="121" text-anchor="middle" fill="var(--mat-sys-on-surface-variant)" font-size="9">AST rule parser</text>
  <text x="247" y="135" text-anchor="middle" fill="var(--mat-sys-on-surface-variant)" font-size="9">URL deduplicator</text>
  <text x="247" y="149" text-anchor="middle" fill="var(--mat-sys-on-surface-variant)" font-size="9">coordinator queue</text>
  <text x="247" y="163" text-anchor="middle" fill="var(--mat-sys-on-surface-variant)" font-size="9">Processor interface</text>

  <line x1="120" y1="120" x2="158" y2="120" stroke="var(--mat-sys-outline-variant)" stroke-width="1.5" marker-end="url(#arr-mc2)"/>

  <!-- Uptime Kuma -->
  <rect x="390" y="16" width="175" height="44" rx="6" fill="var(--mat-sys-surface-container-high)" stroke="var(--mat-sys-primary)" stroke-width="1"/>
  <text x="477" y="35" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">Uptime Kuma</text>
  <text x="477" y="49" text-anchor="middle" fill="var(--mat-sys-primary)" font-size="9">monitors · status pages · tags</text>

  <!-- Cloudflare -->
  <rect x="400" y="100" width="155" height="44" rx="6" fill="var(--mat-sys-surface-container-high)" stroke="var(--mat-sys-primary)" stroke-width="1"/>
  <text x="477" y="119" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">Cloudflare DNS</text>
  <text x="477" y="133" text-anchor="middle" fill="var(--mat-sys-primary)" font-size="9">CNAME → tunnel UUID</text>

  <!-- NetBird -->
  <rect x="400" y="184" width="155" height="44" rx="6" fill="var(--mat-sys-surface-container-high)" stroke="var(--mat-sys-tertiary)" stroke-width="1"/>
  <text x="477" y="203" text-anchor="middle" fill="var(--mat-sys-on-surface)" font-weight="600">NetBird DNS</text>
  <text x="477" y="217" text-anchor="middle" fill="var(--mat-sys-tertiary)" font-size="9">A record → wt0 IP</text>

  <!-- Arrows -->
  <path d="M335,100 Q365,100 365,38 L388,38" stroke="var(--mat-sys-primary)" stroke-width="1.5" fill="none" marker-end="url(#arr-mc2-p)"/>
  <line x1="335" y1="120" x2="398" y2="120" stroke="var(--mat-sys-primary)" stroke-width="1.5" marker-end="url(#arr-mc2-p)"/>
  <path d="M335,140 Q365,140 365,206 L398,206" stroke="var(--mat-sys-tertiary)" stroke-width="1.5" fill="none" marker-end="url(#arr-mc2-t)"/>

  <!-- Cleanup note -->
  <rect x="10" y="268" width="660" height="26" rx="4" fill="color-mix(in srgb, var(--mat-sys-error) 8%, var(--mat-sys-surface-container))"/>
  <text x="340" y="284" text-anchor="middle" fill="var(--mat-sys-on-surface-variant)" font-size="9">on container stop → orphan cleanup (all 3 providers)</text>
</svg>`,
        },
        {
          id: 'engineering',
          title: {
            en: 'Built to last, built to extend.',
            fr: "Construit pour durer, construit pour s'étendre.",
          },
          tocLabel: { en: 'Engineering', fr: 'Ingénierie' },
          body: {
            en: "<strong>100% test coverage on core logic.</strong> The pure-function architecture — every state transformation is a function with no side effects — makes the full sync pipeline testable without mocking Docker or any API. The <code>Executor</code> wraps all state-mutating API calls behind a <code>DryRun</code> flag: set <code>DRY_RUN=true</code> and the companion logs every action it would take without touching anything.\n\n<strong>Safe orphan cleanup.</strong> When a container stops, the companion removes its DNS records and monitors. A strict Target Lock prevents accidental deletion of records it didn't create — manually managed Cloudflare records are never touched.\n\n<strong>Global URL deduplication.</strong> If multiple Traefik routers resolve to the same final URL, the companion groups them into a single Kuma monitor. No duplicate alerts, no API spam.\n\n<strong>Label override hierarchy.</strong> To avoid breaking Traefik's strict schema validator, overrides live in a separate <code>mesh.*</code> namespace:\n<ul><li><code>mesh.routers.{router}.kuma.url</code> — override the probed path (relative or absolute).</li><li><code>mesh.routers.{router}.kuma.accepted_status_codes</code> — custom expected codes.</li><li><code>mesh.routers.{router}.kuma.pages</code> — bind to specific Kuma status pages.</li><li><code>mesh.routers.{router}.managed=false</code> — exclude from all pipelines entirely.</li></ul>\n\n<strong>GHCR image tags:</strong> <code>stable</code> tracks the latest release, <code>latest</code> tracks <code>main</code>, <code>vX.Y.Z</code> pins a specific immutable version. Releasing is a single <code>git tag + push</code> — GitHub Actions builds and pushes automatically.",
            fr: "<strong>100% de couverture de tests sur la logique core.</strong> L'architecture pure-function — chaque transformation d'état est une fonction sans effets de bord — rend le pipeline de sync entièrement testable sans mocker Docker ni aucune API. L'<code>Executor</code> enveloppe tous les appels API mutants derrière un flag <code>DryRun</code> : mettez <code>DRY_RUN=true</code> et le companion loggue chaque action qu'il prendrait sans rien toucher.\n\n<strong>Nettoyage sûr des orphelins.</strong> Quand un conteneur s'arrête, le companion supprime ses enregistrements DNS et monitors. Un Target Lock strict empêche la suppression accidentelle d'enregistrements qu'il n'a pas créés — les enregistrements Cloudflare gérés manuellement ne sont jamais touchés.\n\n<strong>Déduplication globale des URLs.</strong> Si plusieurs routers Traefik résolvent vers la même URL finale, le companion les regroupe en un seul monitor Kuma. Aucune alerte en double, aucun spam API.\n\n<strong>Hiérarchie d'overrides par labels.</strong> Pour ne pas casser le validateur de schéma strict de Traefik, les overrides vivent dans un namespace <code>mesh.*</code> séparé :\n<ul><li><code>mesh.routers.{router}.kuma.url</code> — surcharger le chemin sondé (relatif ou absolu).</li><li><code>mesh.routers.{router}.kuma.accepted_status_codes</code> — codes attendus personnalisés.</li><li><code>mesh.routers.{router}.kuma.pages</code> — lier à des pages de statut Kuma spécifiques.</li><li><code>mesh.routers.{router}.managed=false</code> — exclure de tous les pipelines.</li></ul>\n\n<strong>Tags GHCR :</strong> <code>stable</code> suit la dernière release, <code>latest</code> suit <code>main</code>, <code>vX.Y.Z</code> fixe une version immuable. Une release = un <code>git tag + push</code> — GitHub Actions build et push automatiquement.",
          },
          stats: [
            {
              value: '100%',
              label: { en: 'Test coverage — core logic', fr: 'Couverture tests — core' },
            },
            {
              value: '10MB',
              label: {
                en: 'Binary size — distroless scratch image',
                fr: 'Taille binaire — image scratch',
              },
            },
            {
              value: '3',
              label: {
                en: 'Pipelines — DNS internal, DNS external, monitoring',
                fr: 'Pipelines — DNS interne, DNS externe, monitoring',
              },
            },
          ],
        },
      ],
      pager: {
        prevSlug: 'home-ops',
        prevTitle: 'Home Ops',
      },
    },
  };

  readonly featured: Project[] = [
    {
      title: 'Planific',
      slug: 'planific',
      subtitle: 'Studio Drave · Android & iOS',
      status: { en: 'In Development', fr: 'En développement' },
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
      status: { en: 'Architecting', fr: 'En conception' },
      description: this._details['waystone'].description,
      tags: ['Kotlin Multiplatform', 'Compose Canvas', 'SQLDelight', 'Supabase', 'Offline-First'],
      featured: true,
    },
    {
      title: 'Starter Templates',
      slug: 'templates',
      subtitle: 'Open Source · KMP · Angular · Spring',
      status: { en: 'Maintained', fr: 'Maintenu' },
      description: this._details['templates'].description,
      tags: ['Kotlin Multiplatform', 'Angular 21', 'Spring Boot', 'Fastlane', 'Vitest'],
      featured: false,
    },
    {
      title: 'Home Ops',
      slug: 'home-ops',
      subtitle: 'Self-Hosted · Bare Metal · Zero-Trust',
      status: { en: 'Production', fr: 'Production' },
      description: this._details['home-ops'].description,
      tags: ['Ansible', 'Docker', 'Traefik', 'NetBird', 'Cloudflare', 'Authelia'],
      featured: false,
    },
    {
      title: 'Traefik Mesh Companion',
      slug: 'mesh-companion',
      subtitle: 'wolf-infra · Open Source · Go',
      status: { en: 'Production', fr: 'Production' },
      description: this._details['mesh-companion'].description,
      tags: ['Go', 'Docker', 'Traefik', 'Uptime Kuma', 'Cloudflare', 'NetBird'],
      featured: false,
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
