import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LangService } from '../../core/lang/lang';

/** 404 — terminal crash aesthetic. */
@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, MatButtonModule],
  template: `
    <div class="page">
      <p class="eyebrow mono">// 404 · RouteNotMatchedError</p>
      <h1 class="title mono">404</h1>
      <p class="message">{{ lang.t('This route does not exist.', "Cette route n'existe pas.") }}</p>
      <a mat-flat-button routerLink="/">{{ lang.t('← Back', '← Retour') }}</a>
    </div>
  `,
  styles: [
    `
      @use 'styles/sys' as sys;
      @use 'styles/spacing' as sp;

      .page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: sp.$md;
        min-height: 60dvh;
        text-align: center;
        padding: sp.$xl;
      }

      .eyebrow {
        margin: 0;
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        color: sys.$on-surface-variant;
      }

      .title {
        margin: 0;
        font-size: clamp(6rem, 18vw, 14rem);
        font-weight: 700;
        line-height: 0.9;
        letter-spacing: -0.04em;
        color: sys.$on-surface;
      }

      .message {
        margin: 0;
        font: sys.$body-large;
        color: sys.$on-surface-variant;
      }

      .mono {
        font-family: var(--font-mono);
      }
    `,
  ],
})
export class NotFoundPageComponent {
  readonly lang = inject(LangService);
}
