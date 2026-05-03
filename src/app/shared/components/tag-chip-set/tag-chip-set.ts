import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Consistent tech stack chip set. Wraps MatChipSet with the portfolio's
 * mono-font, uppercase, compact chip style.
 *
 * Usage:
 *   <ui-tag-chip-set [tags]="['Kotlin Multiplatform', 'Compose', 'SKIE']" />
 *
 * Optionally highlight the first tag as the primary/accent chip:
 *   <ui-tag-chip-set [tags]="stack" [accentFirst]="true" />
 */
@Component({
  selector: 'ui-tag-chip-set',
  imports: [MatChipsModule],
  templateUrl: './tag-chip-set.html',
  styleUrl: './tag-chip-set.scss',
})
export class TagChipSetComponent {
  /** List of tech tags to display */
  readonly tags = input.required<string[]>();

  /**
   * When true, the first chip is styled with primary-container colors
   * to visually emphasize the main technology.
   */
  readonly accentFirst = input<boolean>(false);
}
