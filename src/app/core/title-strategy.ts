import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProjectsService } from '../features/projects/services/projects';

@Injectable({ providedIn: 'root' })
export class PortfolioTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly projects = inject(ProjectsService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const routeTitle = this.buildTitle(snapshot);

    if (routeTitle) {
      this.title.setTitle(routeTitle);
      return;
    }

    // Dynamic title for project detail pages — derive from slug
    const slug = snapshot.root.firstChild?.params?.['slug'];
    if (slug) {
      const project = this.projects.getDetail(slug);
      const name = project?.title ?? slug;
      this.title.setTitle(`${name} — Luc Allaire`);
      return;
    }

    this.title.setTitle('Luc Allaire — KMP Developer');
  }
}
