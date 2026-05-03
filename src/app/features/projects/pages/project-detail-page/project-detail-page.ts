import { Component, Input, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { LangService } from '../../../../core/lang/lang';
import { ProjectsService } from '../../services/projects';
import { ProjectDetail } from '../../models/project-detail';

@Component({
  selector: 'app-project-detail-page',
  imports: [RouterLink, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.scss',
})
export class ProjectDetailPageComponent implements OnInit {
  private readonly projects = inject(ProjectsService);

  @Input() slug!: string;

  readonly lang = inject(LangService);
  project: ProjectDetail | undefined;

  ngOnInit(): void {
    this.project = this.projects.getDetail(this.slug);
  }
}
