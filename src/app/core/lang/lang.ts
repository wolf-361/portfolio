import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'fr';

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly _lang = signal<Lang>((localStorage.getItem('lang') as Lang) ?? 'en');

  readonly lang = this._lang.asReadonly();

  toggle(): void {
    const next: Lang = this._lang() === 'en' ? 'fr' : 'en';
    this._lang.set(next);
    localStorage.setItem('lang', next);
  }

  t<T>(en: T, fr: T): T {
    return this._lang() === 'en' ? en : fr;
  }
}
