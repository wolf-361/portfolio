import { Component, inject } from '@angular/core';

import { HeroComponent } from '../../components/hero/hero';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card';
import { ProjectCardComponent } from '../../components/project-card/project-card';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { TimelineBarComponent } from '../../../../shared/components/timeline-bar/timeline-bar';
import { TimelineRow } from '../../../../shared/components/timeline-bar/timeline-bar.model';
import { LangService } from '../../../../core/lang/lang';
import { Experience, Education } from '../../models/experience';
import { Project } from '../../models/project';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroComponent,
    ExperienceCardComponent,
    ProjectCardComponent,
    SectionHeaderComponent,
    TimelineBarComponent,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePageComponent {
  readonly lang = inject(LangService);

  // ── Professional experience ────────────────────────────────────────────────

  readonly workExperiences: Experience[] = [
    {
      title: { en: 'Software Developer', fr: 'Développeur logiciel' },
      company: 'Simaudio',
      period: { en: 'Apr. 2025 – Present', fr: 'Avr. 2025 – Présent' },
      location: 'Montréal, QC',
      kind: 'work',
      active: true,
      bullets: [
        {
          en: 'Reverse-engineered an undocumented proprietary TCP protocol for the MiND1 hardware player — no documentation, no prior team — and implemented the command queue with mutex serialization and a keepalive coroutine on a dedicated dispatcher in Kotlin.',
          fr: "Rétro-ingénierie d'un protocole TCP propriétaire non documenté pour le lecteur MiND1 — aucune doc, aucune équipe précédente — et implémentation de la file de commandes avec sérialisation par mutex et une coroutine keepalive sur dispatcher dédié en Kotlin.",
        },
        {
          en: 'Rebuilt the TeamCity CI/CD pipeline from scratch on a Mac mini (Docker Compose) for the .NET → KMP migration: branch protection, unit tests, Android + iOS builds, Firebase App Distribution + TestFlight, manual production gate.',
          fr: 'Reconstruction du pipeline CI/CD TeamCity depuis zéro sur Mac mini (Docker Compose) pour la migration .NET → KMP : protection des branches, tests unitaires, builds Android + iOS, Firebase App Distribution + TestFlight, gate manuel de production.',
        },
        {
          en: 'Restructured the physical device test suite and contributed unit test coverage on the shared KMP module (AAA pattern).',
          fr: 'Restructuration de la suite de tests sur appareils physiques et contribution à la couverture de tests unitaires sur le module KMP partagé (patron AAA).',
        },
      ],
      stack: ['Kotlin Multiplatform', 'Coroutines', 'Ktor', 'TeamCity', 'Firebase', 'TestFlight'],
    },
    {
      title: {
        en: 'Developer Intern — STI/IDEV Team',
        fr: 'Stagiaire développeur — Équipe STI/IDEV',
      },
      company: 'UQTR',
      period: { en: 'May – Aug 2024', fr: 'Mai – Août 2024' },
      location: 'Trois-Rivières, QC',
      kind: 'internship',
      bullets: [
        {
          en: 'Designed and shipped a Jira plugin on Atlassian Forge for internal project tracking — ticket creation, assignment, and reporting.',
          fr: "Conception et livraison d'un plugin Jira sur Atlassian Forge pour le suivi de projet interne — création de tickets, attribution et reporting.",
        },
        {
          en: 'Migrated and improved an existing inventory management plugin, refactoring the data model and fixing regressions across the Forge suite.',
          fr: "Migration et amélioration d'un plugin de gestion d'inventaire existant — refactorisation du modèle de données et correction de régressions sur la suite Forge.",
        },
        {
          en: 'Built a local development bootstrapping tool to reduce environment setup friction for the team.',
          fr: "Développement d'un outil de bootstrapping local pour réduire la friction d'installation des environnements de développement.",
        },
      ],
      stack: ['TypeScript', 'Angular', 'NestJS', 'Atlassian Forge', 'Jira API'],
    },
  ];

  // ── Associations ───────────────────────────────────────────────────────────

  readonly associationExperiences: Experience[] = [
    {
      title: { en: 'Programmer', fr: 'Programmeur' },
      company: 'ASUQTR — RoboSub',
      period: { en: 'Sept 2023 – May 2024', fr: 'Sept 2023 – Mai 2024' },
      location: 'Trois-Rivières, QC',
      kind: 'association',
      bullets: [
        {
          en: 'Vision system (OpenCV/Python) + full IT infrastructure migration — servers, Nginx, Docker.',
          fr: "Système de vision (OpenCV/Python) + migration complète de l'infrastructure IT — serveurs, Nginx, Docker.",
        },
      ],
      stack: ['Python', 'OpenCV', 'Docker', 'Nginx', 'Linux'],
    },
    {
      title: { en: 'VP Academic Affairs', fr: 'VP aux affaires académiques' },
      company: 'AMI — UQTR',
      period: { en: 'Sept 2023 – May 2024', fr: 'Sept 2023 – Mai 2024' },
      location: 'Trois-Rivières, QC',
      kind: 'association',
      bullets: [
        {
          en: 'Deployed and managed association servers + shipped two production web apps for student events.',
          fr: "Déploiement et gestion des serveurs de l'association + livraison de deux apps web de production pour des événements étudiants.",
        },
      ],
      stack: ['TypeScript', 'Angular', 'NestJS', 'PostgreSQL', 'Docker'],
    },
  ];

  // ── Education ──────────────────────────────────────────────────────────────

  // ── Timeline ───────────────────────────────────────────────────────────────
  // Decimal year formula: year + (month - 1) / 12
  // Jan = 0, May = 4/12, Sept = 8/12

  readonly timelineRows: TimelineRow[] = [
    {
      label: 'UQTR · Informatique',
      barLabel: 'B.Sc. Informatique',
      start: 2022, // unused — segments takes over
      end: 2026,
      variant: 'education',
      ongoing: true,
      segments: [
        { start: 2022, end: 2024 + 7 / 12, barLabel: 'B.Sc. Informatique', starred: true },
        { start: 2024 + 7 / 12, end: 2025 + 3 / 12, barLabel: 'Congé', isGap: true },
        { start: 2025 + 3 / 12, end: 2026, barLabel: 'B.Sc. Informatique' },
      ],
    },
    {
      label: 'AMI · UQTR',
      barLabel: 'VP Académique',
      start: 2023 + 8 / 12, // Sept 2023
      end: 2024 + 4 / 12, // May 2024
      variant: 'association',
    },
    {
      label: 'ASUQTR',
      barLabel: 'Programmeur',
      start: 2023 + 8 / 12, // Sept 2023
      end: 2024 + 4 / 12, // May 2024
      variant: 'association',
    },
    {
      label: 'UQTR · STI',
      barLabel: 'STI',
      start: 2024 + 4 / 12, // May 2024
      end: 2024 + 7 / 12, // Aug 2024
      variant: 'internship',
    },
    {
      label: 'Simaudio',
      barLabel: 'Développeur logiciel',
      start: 2025 + 3 / 12, // April 2025
      end: new Date().getFullYear() + new Date().getMonth() / 12,
      variant: 'work',
      ongoing: true,
    },
  ];

  readonly educationEntries: Education[] = [
    {
      degree: { en: 'B.Sc. Computer Science', fr: 'B.Sc. Informatique' },
      institution: 'UQTR',
      period: '2022 – 2026',
      location: 'Trois-Rivières, QC',
      active: true,
      badge: { en: "Dean's List 2023 & 2024", fr: 'Liste du recteur 2023 & 2024' },
    },
    {
      degree: { en: 'B.Sc. Chemistry', fr: 'B.Sc. Chimie' },
      institution: 'UQTR',
      period: '2020 – 2022',
      location: 'Trois-Rivières, QC',
    },
  ];

  // ── Projects ───────────────────────────────────────────────────────────────

  readonly projects: Project[] = [
    {
      size: 'featured',
      tag: { en: 'mobile · featured', fr: 'mobile · featured' },
      title: { en: 'Planific', fr: 'Planific' },
      description: {
        en: 'Cross-platform student planner for Android and iOS. The shared KMP module owns 100% of domain logic, state, and data — only the UI is platform-specific.',
        fr: "Agenda étudiant multiplateforme pour Android et iOS. Le module KMP partagé détient 100 % de la logique métier, l'état et les données — seule l'interface est spécifique à chaque plateforme.",
      },
      details: {
        en: 'Strict MVI unidirectional flow — Native UI → ViewModel (shared StateFlow) → UseCase → Repository → Room KMP / Ktor. Swift interop via SKIE, exposing Kotlin Flows as native AsyncSequence.',
        fr: 'Flux MVI unidirectionnel strict — UI native → ViewModel (StateFlow partagé) → UseCase → Repository → Room KMP / Ktor. Interop Swift via SKIE, exposant les Flows Kotlin en AsyncSequence native.',
      },
      stack: [
        'Kotlin Multiplatform',
        'Jetpack Compose',
        'SwiftUI',
        'Ktor',
        'Room KMP',
        'SKIE',
        'Koin',
        'MVI',
      ],
      wip: true,
    },
    {
      size: 'small',
      tag: { en: 'mobile · game', fr: 'mobile · jeu' },
      title: { en: 'Waystone', fr: 'Waystone' },
      description: {
        en: 'Companion app for open-world game maps — track locations, pins, and progress across sessions.',
        fr: 'Application compagnon pour cartes de jeux open-world — suivez vos emplacements, épingles et progression.',
      },
      stack: ['Kotlin Multiplatform', 'Compose Multiplatform', 'SQLDelight'],
      wip: true,
    },
    {
      size: 'small',
      tag: { en: 'open source', fr: 'open source' },
      accentFirst: false,
      title: { en: 'Starter Templates', fr: 'Templates de démarrage' },
      description: {
        en: 'Production-ready starters for KMP, Angular 21, and Spring Boot — enforced architecture, full quality gate out of the box.',
        fr: 'Starters prêts pour la production : KMP, Angular 21 et Spring Boot — architecture imposée, qualité intégrée.',
      },
      stack: ['Kotlin Multiplatform', 'Angular 21', 'Spring Boot', 'Bun', 'Vitest', 'Playwright'],
      url: 'https://github.com/wolf-361',
      urlLabel: { en: 'GitHub →', fr: 'GitHub →' },
    },
    {
      size: 'small',
      tag: { en: 'infra · self-hosted', fr: 'infra · self-hosted' },
      title: { en: 'Home Ops', fr: 'Home Ops' },
      description: {
        en: '3-node bare-metal Debian cluster provisioned end-to-end with Ansible. Coolify orchestration, NetBird mesh VPN, Cloudflare Zero Trust tunnels, and custom Go services.',
        fr: 'Cluster bare-metal 3 nœuds Debian provisionné intégralement avec Ansible. Orchestration Coolify, VPN mesh NetBird, tunnels Cloudflare Zero Trust et services Go maison.',
      },
      stack: ['Ansible', 'Docker', 'Coolify', 'NetBird', 'Cloudflare', 'Go', 'Debian'],
      terminal: {
        command: 'cluster status --watch',
        nodes: [
          { name: 'firenze', status: 'online', uptime: '12d', cpu: '38%' },
          { name: 'roma', status: 'online', uptime: '12d', cpu: '22%' },
          { name: 'milano', status: 'backup', uptime: '—', cpu: '—' },
          { name: 'edge-01', status: 'online', uptime: '2h', cpu: '11%' },
        ],
      },
    },
  ];
}
