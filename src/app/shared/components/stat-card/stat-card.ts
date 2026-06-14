import { Component, inject, input } from '@angular/core';
import { LangService } from '../../../core/lang/lang';
import { StatCard } from '../../models/stat-card';

@Component({
  selector: 'ui-stat-card',
  template: `
    <div class="stat-card">
      <span class="stat-value">{{ stat().value }}</span>
      <span class="stat-label">{{ lang.t(stat().label.en, stat().label.fr) }}</span>
    </div>
  `,
  styleUrl: './stat-card.scss',
})
export class StatCardComponent {
  readonly stat = input.required<StatCard>();
  readonly lang = inject(LangService);
}
