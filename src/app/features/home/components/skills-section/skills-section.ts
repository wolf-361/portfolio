import { Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { LangService } from '../../../../core/lang/lang';
import { I18n } from '../../../../shared/models/i18n';

interface SkillGroup {
  label: I18n;
  skills: string[];
}

@Component({
  selector: 'app-skills-section',
  imports: [MatChipsModule],
  templateUrl: './skills-section.html',
  styleUrl: './skills-section.scss',
})
export class SkillsSectionComponent {
  readonly lang = inject(LangService);

  readonly groups: SkillGroup[] = [
    {
      label: { en: 'Mobile & KMP — Primary Skills', fr: 'Mobile & KMP — Compétences primaires' },
      skills: [
        'Kotlin',
        'Kotlin Multiplatform',
        'Coroutines / Flow',
        'Jetpack Compose',
        'SwiftUI',
        'Room KMP',
        'Ktor',
        'Koin',
        'SKIE',
        'MVI',
        'Clean Architecture',
      ],
    },
    {
      label: { en: 'Backend — Kotlin', fr: 'Backend — Kotlin' },
      skills: ['Kotlin Spring Boot', 'Spring Security', 'REST', 'PostgreSQL'],
    },
    {
      label: { en: 'Infrastructure & DevOps', fr: 'Infrastructure & DevOps' },
      skills: [
        'Docker',
        'Docker Compose',
        'Ansible',
        'TeamCity',
        'Firebase App Distribution',
        'TestFlight',
        'NetBird',
        'Cloudflare Zero Trust',
        'Coolify',
        'Linux (Debian)',
      ],
    },
    {
      label: { en: 'Web — Secondary Skills', fr: 'Web — Compétences secondaires' },
      skills: ['Angular 21', 'TypeScript', 'Angular Material (M3)', 'NestJS', 'HTML / CSS'],
    },
    {
      label: { en: 'Version Control & Tooling', fr: 'Contrôle de version & outils' },
      skills: ['Git', 'GitHub', 'Jira'],
    },
  ];
}
