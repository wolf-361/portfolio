import { Component, input } from '@angular/core';
import { StatCard } from '../../models/stat-card';

@Component({
  selector: 'ui-stat-card',
  template: `
    <div class="stat-card">
      <span class="stat-value">{{ stat().value }}</span>
      <span class="stat-label">{{ stat().label[locale()] }}</span>
    </div>
  `,
  styleUrl: './stat-card.scss',
})
export class StatCardComponent {
  readonly stat = input.required<StatCard>();
  readonly locale = input.required<'en' | 'fr'>();
}
