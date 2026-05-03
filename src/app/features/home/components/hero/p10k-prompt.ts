import { Component } from '@angular/core';

/**
 * Renders the p10k rainbow segment bar (the top line of the two-line prompt).
 * Arrow size is em-based so it scales correctly when the font is reduced on mobile.
 */
@Component({
  selector: 'app-p10k-prompt',
  template: `
    <span class="bar" aria-hidden="true">
      <span class="seg s-user"> luc@arch </span><span class="seg s-dir"> ~/portfolio </span
      ><span class="seg s-git"> main </span>
    </span>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      .bar {
        display: inline-flex;
        align-items: stretch;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 0.78rem;
        font-weight: 700;
        user-select: none;
        flex-shrink: 0;
        line-height: 1.55;
        isolation: isolate;
      }

      /*
     * Arrow width in em so it scales with font-size on every breakpoint.
     * Each segment is clipped to a right-pointing chevron; segments 2+
     * overlap the previous by the same arrow width at a lower z-index,
     * so the previous segment's colour bleeds through as a powerline arrow.
     */
      .seg {
        --aw: 0.55em;
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.15em calc(0.4rem + var(--aw)) 0.15em 0.4rem;
        clip-path: polygon(
          0 0,
          calc(100% - var(--aw)) 0,
          100% 50%,
          calc(100% - var(--aw)) 100%,
          0 100%
        );
      }

      .s-user {
        background: #1c4230;
        color: #a7f3d0;
        z-index: 3;
      }

      .s-dir {
        background: #1e3a5f;
        color: #7dd3fc;
        z-index: 2;
        margin-left: calc(-1 * var(--aw));
        padding-left: calc(0.4rem + var(--aw));
      }

      .s-git {
        background: #3d2f0a;
        color: #fde68a;
        z-index: 1;
        margin-left: calc(-1 * var(--aw));
        padding-left: calc(0.4rem + var(--aw));
      }

      @media (max-width: 599px) {
        .bar {
          font-size: 0.68rem;
        }
      }
    `,
  ],
})
export class P10kPromptComponent {}
