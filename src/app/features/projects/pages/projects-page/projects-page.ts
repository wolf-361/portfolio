import { Component, inject } from '@angular/core';
import { ProjectCardComponent } from '../../components/project-card/project-card';
import { LangService } from '../../../../core/lang/lang';
import { ProjectsService } from '../../services/projects';

@Component({
  selector: 'app-projects-page',
  imports: [ProjectCardComponent],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.scss',
})
export class ProjectsPageComponent {
  private readonly projects = inject(ProjectsService);

  readonly lang = inject(LangService);
  readonly featuredProjects = this.projects.featured;
  readonly academicProjects = this.projects.academic;
}
