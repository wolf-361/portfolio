import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Lang = 'en' | 'fr';

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly _lang = signal<Lang>(this.storedLang());

  readonly lang = this._lang.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) this.applyLang(this._lang());
  }

  toggle(): void {
    const next: Lang = this._lang() === 'en' ? 'fr' : 'en';
    if (isPlatformBrowser(this.platformId)) localStorage.setItem('lang', next);
    this._lang.set(next);
    if (isPlatformBrowser(this.platformId)) this.applyLang(next);
  }

  private storedLang(): Lang {
    if (!isPlatformBrowser(this.platformId)) return 'en';
    const stored = localStorage.getItem('lang');
    return stored === 'en' || stored === 'fr' ? stored : 'en';
  }

  private applyLang(lang: Lang): void {
    document.documentElement.lang = lang;
  }

  t<T>(en: T, fr: T): T {
    return this._lang() === 'en' ? en : fr;
  }
}
