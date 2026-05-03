import { Component, inject } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card';
import { SkillsSectionComponent } from '../../components/skills-section/skills-section';
import { LangService } from '../../../../core/lang/lang';
import { Experience } from '../../models/experience';

@Component({
  selector: 'app-home-page',
  imports: [HeroComponent, ExperienceCardComponent, SkillsSectionComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePageComponent {
  readonly lang = inject(LangService);

  readonly workExperiences: Experience[] = [
    {
      title: {
        en: 'Software Developer (Contractor → Intern)',
        fr: 'Développeur logiciel (Entrepreneur → Stagiaire)',
      },
      company: 'Simaudio',
      period: 'Sept 2023 – Présent',
      location: 'Montréal, QC',
      type: 'work',
      bullets: [
        {
          en: 'Reverse-engineered a proprietary TCP protocol for the first-generation MiND1 player — no documentation, no prior team — and implemented the command queue and keepalive coroutine layer in Kotlin.',
          fr: "Rétro-ingénierie d'un protocole TCP propriétaire pour le lecteur MiND1 de première génération — aucune documentation, aucune équipe précédente — et implémentation de la file de commandes et de la coroutine keepalive en Kotlin.",
        },
        {
          en: 'Rebuilt the TeamCity CI/CD pipeline from scratch for both Android and iOS targets, enforcing branch protection and automating Alpha/Beta distribution via Firebase App Distribution and TestFlight.',
          fr: 'Reconstruction complète du pipeline CI/CD TeamCity pour les cibles Android et iOS, avec enforcement de la protection des branches et automatisation de la distribution Alpha/Bêta via Firebase App Distribution et TestFlight.',
        },
        {
          en: 'Restructured the physical device test suite and contributed unit test coverage on the shared KMP module.',
          fr: 'Restructuration de la suite de tests sur appareils physiques et contribution à la couverture de tests unitaires sur le module KMP partagé.',
        },
      ],
      stack: ['Kotlin Multiplatform', 'Coroutines', 'TeamCity', 'Firebase', 'TestFlight'],
    },
    {
      title: {
        en: 'Developer Intern, STI/IDEV Team',
        fr: 'Stagiaire développeur, équipe STI/IDEV',
      },
      company: 'UQTR',
      period: 'Mai 2024 – Août 2024',
      location: 'Trois-Rivières, QC',
      type: 'work',
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
      stack: ['TypeScript', 'Angular', 'NestJS', 'Atlassian Forge', 'React', 'Jira API'],
    },
  ];

  readonly extracurricularExperiences: Experience[] = [
    {
      title: {
        en: 'Programmer (Extracurricular)',
        fr: 'Programmeur (Parascolaire)',
      },
      company: 'ASUQTR',
      period: 'Sept 2022 – Mai 2023',
      location: 'Trois-Rivières, QC',
      type: 'extracurricular',
      bullets: [
        {
          en: "Owned the submarine's vision system (image processing, OpenCV/Python) for RoboSub 2023.",
          fr: "Responsable du système de vision du sous-marin (traitement d'image, OpenCV/Python) pour RoboSub 2023.",
        },
        {
          en: "Replaced the association's entire IT infrastructure — migrated off Atlassian, deployed servers, Nginx reverse proxy, Docker.",
          fr: "Remplacement de l'infrastructure IT complète de l'association — migration hors de la suite Atlassian, mise en place de serveurs, reverse proxy Nginx, Docker.",
        },
        {
          en: "Developed the association's public website (Angular/Express, Docker/Nginx, shipped to production).",
          fr: "Développement du site web public de l'association (Angular/Express, Docker/Nginx, déployé en production).",
        },
      ],
      stack: ['Python', 'OpenCV', 'Angular', 'Docker', 'Nginx', 'Linux'],
    },
    {
      title: {
        en: 'Vice-President of Academic Affairs (Extracurricular)',
        fr: 'Vice-président aux affaires académiques (Parascolaire)',
      },
      company: 'AMI — UQTR',
      period: 'Sept 2022 – Mai 2023',
      location: 'Trois-Rivières, QC',
      type: 'extracurricular',
      bullets: [
        {
          en: "Deployed and managed the association's network infrastructure — servers, reverse proxy, Docker.",
          fr: "Déploiement et gestion de l'infrastructure réseau de l'association — serveurs, reverse proxy, Docker.",
        },
        {
          en: 'Designed and shipped two production web apps for student events, including backend, PostgreSQL database, and full deployment pipeline.',
          fr: 'Conception et livraison de deux applications web de production pour des événements étudiants, incluant le backend, la base de données PostgreSQL et le pipeline de déploiement complet.',
        },
      ],
      stack: ['TypeScript', 'Angular', 'NestJS', 'PostgreSQL', 'Docker', 'Nginx'],
    },
  ];
}
