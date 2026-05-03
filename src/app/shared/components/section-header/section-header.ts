import { Component, input } from '@angular/core';

/**
 * Section header with terminal-style eyebrow, title, and optional subtitle.
 *
 * Usage:
 *   <ui-section-header
 *     index="01"
 *     label="EXPÉRIENCES"
 *     title="Parcours professionnel"
 *     subtitle="Un profil dual — carrière en parallèle du cursus académique."
 *   />
 *
 * The eyebrow renders as:  // 01. EXPÉRIENCES
 * Title and subtitle use M3 headline tokens.
 */
@Component({
  selector: 'ui-section-header',
  templateUrl: './section-header.html',
  styleUrl: './section-header.scss',
})
export class SectionHeaderComponent {
  /** Two-digit section number, e.g. "01", "02", "03" */
  readonly index = input.required<string>();

  /** ALL CAPS label shown after the index, e.g. "EXPÉRIENCES" */
  readonly label = input.required<string>();

  /** Main section title — uses headline-large */
  readonly title = input.required<string>();

  /** Optional supporting subtitle — uses body-large */
  readonly subtitle = input<string>('');
}
