import { Component, inject } from '@angular/core';

import { HeroComponent } from '../../components/hero/hero';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { LangService } from '../../../../core/lang/lang';
import { Experience, Education } from '../../models/experience';

@Component({
  selector: 'app-home-page',
  imports: [HeroComponent, ExperienceCardComponent, SectionHeaderComponent],
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
      period: { en: 'Sept 2023 – Present', fr: 'Sept 2023 – Présent' },
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
      period: { en: 'Sept 2022 – May 2023', fr: 'Sept 2022 – Mai 2023' },
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
      period: { en: 'Sept 2022 – May 2023', fr: 'Sept 2022 – Mai 2023' },
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
}
