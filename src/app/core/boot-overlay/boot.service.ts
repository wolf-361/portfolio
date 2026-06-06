import { Injectable, signal } from '@angular/core';

const SESSION_KEY = 'boot-seen';

@Injectable({ providedIn: 'root' })
export class BootService {
  private readonly _seen = !!sessionStorage.getItem(SESSION_KEY);

  readonly showOverlay = signal(!this._seen);
  readonly isFirstLoad = signal(!this._seen);

  markSeen(): void {
    sessionStorage.setItem(SESSION_KEY, '1');
    this.showOverlay.set(false);
  }
}
