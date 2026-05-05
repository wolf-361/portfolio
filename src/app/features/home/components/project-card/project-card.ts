import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project';
import { LangService } from '../../../../core/lang/lang';
import { TagChipSetComponent } from '../../../../shared/components/tag-chip-set/tag-chip-set';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, TagChipSetComponent],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly lang = inject(LangService);
}
