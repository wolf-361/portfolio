import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ThemeService } from '../../theme/theme';
import { LangService } from '../../lang/lang';
import { MobileNavComponent } from '../mobile-nav/mobile-nav';

interface NavItem {
  index: string;
  labelEn: string;
  labelFr: string;
  fragment: string;
}

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, MobileNavComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent implements OnInit {
  readonly theme = inject(ThemeService);
  readonly lang = inject(LangService);
  private readonly destroyRef = inject(DestroyRef);

  readonly mobileNavOpen = signal(false);

  /** Active section fragment, updated by scroll-spy */
  readonly activeFragment = signal<string>('');

  readonly navItems: NavItem[] = [
    { index: '01', labelEn: 'Experiences', labelFr: 'Expériences', fragment: 'experiences' },
    { index: '02', labelEn: 'Projects', labelFr: 'Projets', fragment: 'projects' },
    { index: '03', labelEn: 'Contact', labelFr: 'Contact', fragment: 'contact' },
  ];
  // Note: timeline is part of experiences section — not a separate nav item

  ngOnInit(): void {
    fromEvent(window, 'scroll', { passive: true })
      .pipe(throttleTime(50), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateActiveSection());

    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const scrollY = window.scrollY + 80; // offset for sticky navbar height
    let active = '';
    for (const item of this.navItems) {
      const el = document.getElementById(item.fragment);
      if (el && el.offsetTop <= scrollY) {
        active = item.fragment;
      }
    }
    this.activeFragment.set(active);
  }

  scrollTo(fragment: string): void {
    const el = document.getElementById(fragment);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  isActive(fragment: string): boolean {
    return this.activeFragment() === fragment;
  }

  openMobileNav(): void {
    this.mobileNavOpen.set(true);
  }

  closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }
}
