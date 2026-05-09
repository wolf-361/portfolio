import { Injectable, signal, computed, effect } from '@angular/core';

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
  private readonly _theme = signal<Theme>((this.readStored('theme') as Theme) ?? 'system');
  private readonly _palette = signal<PaletteName>(
    (this.readStored('palette') as PaletteName) ?? 'cyan',
  );

  /** Tracks the OS preference — updated via MediaQueryList change event */
  private readonly _systemDark = signal<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  readonly isDark = computed(() => {
    const t = this._theme();
    if (t === 'system') return this._systemDark();
    return t === 'dark';
  });

  readonly palette = this._palette.asReadonly();

  constructor() {
    // Keep _systemDark in sync with OS preference changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => this._systemDark.set(e.matches);
    mq.addEventListener('change', handler);

    // Apply theme/palette reactively
    effect(() => this.applyTheme(this.isDark()));
    this.applyPalette(this._palette());
  }

  toggle(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
    localStorage.setItem('theme', theme);
  }

  setPalette(name: PaletteName): void {
    this._palette.set(name);
    localStorage.setItem('palette', name);
    this.applyPalette(name);
  }

  private applyTheme(dark: boolean): void {
    document.documentElement.classList.toggle('dark', dark);
  }

  private applyPalette(name: PaletteName): void {
    const cl = document.documentElement.classList;
    PALETTES.forEach((p) => cl.remove(`palette-${p}`));
    cl.add(`palette-${name}`);
  }

  private readStored(key: string): string | null {
    return localStorage.getItem(key);
  }
}
