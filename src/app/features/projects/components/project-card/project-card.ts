import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SurfaceDirective } from '../../../../shared/directives/surface/surface';
import { LangService } from '../../../../core/lang/lang';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, MatChipsModule, MatButtonModule, MatIconModule, SurfaceDirective],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;

  readonly lang = inject(LangService);
}
