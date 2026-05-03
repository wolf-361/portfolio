import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-footer',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <footer class="footer">
      <span class="copy">AGPLv3 · {{ year }} Luc Allaire</span>
      <div class="socials">
        <a
          mat-icon-button
          href="https://github.com/wolf-361"
          target="_blank"
          rel="noopener"
          matTooltip="GitHub"
        >
          <mat-icon>open_in_new</mat-icon>
        </a>
        <a
          mat-icon-button
          href="https://www.linkedin.com/in/wolf361/"
          target="_blank"
          rel="noopener"
          matTooltip="LinkedIn"
        >
          <mat-icon>link</mat-icon>
        </a>
      </div>
    </footer>
  `,
  styles: [
    `
      @use 'styles/sys' as sys;

      .footer {
        padding: 0.875rem 1.5rem;
        border-top: 1px solid sys.$outline-variant;
        background: sys.$surface-container;
        color: sys.$on-surface-variant;
        font: sys.$body-small;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }

      .copy {
        opacity: 0.7;
      }

      .socials {
        display: flex;
        gap: 0.25rem;
      }
    `,
  ],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
