import { Component, inject, input, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LangService } from '../../../../core/lang/lang';
import { ProjectsService } from '../../services/projects';
import { ProjectDetail } from '../../models/project-detail';
import { TagChipSetComponent } from '../../../../shared/components/tag-chip-set/tag-chip-set';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card';
import { ScrollSpyDirective } from '../../../../shared/directives/scroll-spy/scroll-spy';
import { FadeInDirective } from '../../../../shared/directives/fade-in/fade-in';

@Component({
  selector: 'app-project-detail-page',
  imports: [
    RouterLink,
    UpperCasePipe,
    TagChipSetComponent,
    StatCardComponent,
    ScrollSpyDirective,
    FadeInDirective,
  ],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.scss',
})
export class ProjectDetailPageComponent {
  private readonly projects = inject(ProjectsService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly lang = inject(LangService);

  readonly slug = input.required<string>();

  get project(): ProjectDetail | undefined {
    return this.projects.getDetail(this.slug());
  }

  get sectionIds(): string[] {
    return this.project?.sections.map((s) => s.id) ?? [];
  }

  readonly activeSection = signal<string>('');

  onActiveSection(id: string): void {
    this.activeSection.set(id);
  }

  /** Split body on double-newline and sanitize each paragraph (supports <strong> and <mark>) */
  bodyParagraphs(text: string): SafeHtml[] {
    return text.split('\n\n').map((p) => this.sanitizer.bypassSecurityTrustHtml(p));
  }

  /** Sanitize raw SVG/HTML for use with [innerHTML] */
  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
