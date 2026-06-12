import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const SESSION_KEY = 'boot-seen';

@Injectable({ providedIn: 'root' })
export class BootService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly _seen =
    isPlatformBrowser(this.platformId) && !!sessionStorage.getItem(SESSION_KEY);

  private readonly _showOverlay = signal(!this._seen);
  readonly showOverlay = this._showOverlay.asReadonly();

  private readonly _isFirstLoad = signal(!this._seen);
  readonly isFirstLoad = this._isFirstLoad.asReadonly();

  markSeen(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(SESSION_KEY, '1');
    }
    this._showOverlay.set(false);
  }
}
