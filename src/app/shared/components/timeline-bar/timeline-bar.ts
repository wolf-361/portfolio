import { Component, computed, input } from '@angular/core';
import { TimelineRow } from './timeline-bar.model';

/**
 * Gantt-style horizontal timeline component.
 *
 * Renders a grid of rows, each with a label column and a proportionally
 * positioned bar. All colors map to M3 tokens — changing the theme palette
 * automatically updates bar colors.
 *
 * Usage:
 *   <ui-timeline-bar
 *     [rows]="timelineRows"
 *     [startYear]="2022"
 *     [endYear]="2026"
 *   />
 */
@Component({
  selector: 'ui-timeline-bar',
  templateUrl: './timeline-bar.html',
  styleUrl: './timeline-bar.scss',
})
export class TimelineBarComponent {
  readonly rows = input.required<TimelineRow[]>();
  readonly startYear = input<number>(2022);
  readonly endYear = input<number>(2026);

  /** Year ticks shown on the axis */
  readonly axisTicks = computed<number[]>(() => {
    const ticks: number[] = [];
    for (let y = this.startYear(); y <= this.endYear(); y++) {
      ticks.push(y);
    }
    return ticks;
  });

  readonly currentYear = new Date().getFullYear();
  readonly currentYearDecimal = computed(() => {
    const now = new Date();
    return now.getFullYear() + now.getMonth() / 12;
  });

  /** Convert a decimal year to a percentage offset within the timeline */
  toPercent(year: number): number {
    const span = this.endYear() - this.startYear();
    return Math.max(0, Math.min(100, ((year - this.startYear()) / span) * 100));
  }

  barLeft(row: TimelineRow): string {
    return `${this.toPercent(row.start)}%`;
  }

  barWidth(row: TimelineRow): string {
    return `${this.toPercent(row.end) - this.toPercent(row.start)}%`;
  }

  currentYearLeft(): string {
    return `${this.toPercent(this.currentYearDecimal())}%`;
  }

  isCurrentYear(tick: number): boolean {
    return tick === this.currentYear;
  }
}
