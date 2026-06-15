import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PROJECT_TITLE_PROVIDER } from '../shared/models/project-title-provider';

@Injectable({ providedIn: 'root' })
export class PortfolioTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly getProjectTitle = inject(PROJECT_TITLE_PROVIDER);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const routeTitle = this.buildTitle(snapshot);

    if (routeTitle) {
      this.title.setTitle(routeTitle);
      return;
    }

    // Dynamic title for project detail pages — derive from slug
    const slug = snapshot.root.firstChild?.params?.['slug'];
    if (slug) {
      const name = this.getProjectTitle(slug) ?? slug;
      this.title.setTitle(`${name} — Luc Allaire`);
      return;
    }

    this.title.setTitle('Luc Allaire — KMP Developer');
  }
}
