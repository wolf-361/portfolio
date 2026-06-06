import { Injectable, signal } from '@angular/core';

const SESSION_KEY = 'boot-seen';

@Injectable({ providedIn: 'root' })
export class BootService {
  private readonly _seen = !!sessionStorage.getItem(SESSION_KEY);

  private readonly _showOverlay = signal(!this._seen);
  readonly showOverlay = this._showOverlay.asReadonly();

  private readonly _isFirstLoad = signal(!this._seen);
  readonly isFirstLoad = this._isFirstLoad.asReadonly();

  markSeen(): void {
    sessionStorage.setItem(SESSION_KEY, '1');
    this._showOverlay.set(false);
  }
}
