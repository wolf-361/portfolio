import { Component, input } from '@angular/core';

/**
 * Availability / status pill with an animated pulsing LED dot.
 *
 * Usage:
 *   <ui-status-pill
 *     label="Disponible · temps plein · contrats"
 *     status="available"
 *   />
 *
 * @input status — 'available' (green LED) | 'busy' (amber) | 'unavailable' (muted)
 * @input label  — Text shown beside the dot
 */
@Component({
  selector: 'ui-status-pill',
  templateUrl: './status-pill.html',
  styleUrl: './status-pill.scss',
})
export class StatusPillComponent {
  readonly label = input.required<string>();
  readonly status = input<'available' | 'busy' | 'unavailable'>('available');
}
