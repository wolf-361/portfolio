import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'system';
export type PaletteName =
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'cyan'
  | 'magenta'
  | 'orange'
  | 'chartreuse'
  | 'spring-green'
  | 'azure'
  | 'violet'
  | 'rose';

export const PALETTES: PaletteName[] = [
  'violet',
  'rose',
  'red',
  'orange',
  'yellow',
  'chartreuse',
  'green',
  'spring-green',
  'cyan',
  'azure',
  'blue',
  'magenta',
];

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly _theme = signal<Theme>((this.readStored('theme') as Theme) ?? 'system');
  private readonly _palette = signal<PaletteName>(
    (this.readStored('palette') as PaletteName) ?? 'cyan',
  );

  /** Tracks the OS preference — updated via MediaQueryList change event */
  private readonly _systemDark = signal<boolean>(
    isPlatformBrowser(this.platformId)
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false,
  );

  readonly isDark = computed(() => {
    const t = this._theme();
    if (t === 'system') return this._systemDark();
    return t === 'dark';
  });

  readonly palette = this._palette.asReadonly();

  constructor() {
    // Keep _systemDark in sync with OS preference changes
    if (isPlatformBrowser(this.platformId)) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => this._systemDark.set(e.matches);
      mq.addEventListener('change', handler);
    }

    // Apply theme/palette reactively
    effect(() => this.applyTheme(this.isDark()));
    this.applyPalette(this._palette());
  }

  toggle(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
    if (isPlatformBrowser(this.platformId)) localStorage.setItem('theme', theme);
  }

  setPalette(name: PaletteName): void {
    this._palette.set(name);
    if (isPlatformBrowser(this.platformId)) localStorage.setItem('palette', name);
    this.applyPalette(name);
  }

  private applyTheme(dark: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.documentElement.classList.toggle('dark', dark);
  }

  private applyPalette(name: PaletteName): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const cl = document.documentElement.classList;
    PALETTES.forEach((p) => cl.remove(`palette-${p}`));
    cl.add(`palette-${name}`);
  }

  private readStored(key: string): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem(key) : null;
  }
}
