import { Component, computed, input } from '@angular/core';
import { TimelineRow, TimelineSegment } from './timeline-bar.model';

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
  private readonly GAP_INSET = 2; // px — sp.$xxs

  readonly rows = input.required<TimelineRow[]>();
  readonly startYear = input<number>(2022);
  readonly endYear = input<number>(2026);

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

  showLabel(row: TimelineRow): boolean {
    return this.toPercent(row.end) - this.toPercent(row.start) > 4;
  }

  segLeft(seg: TimelineSegment): string {
    const pct = this.toPercent(seg.start);
    return seg.isGap ? `calc(${pct}% + ${this.GAP_INSET}px)` : `${pct}%`;
  }

  segWidth(seg: TimelineSegment): string {
    const w = this.toPercent(seg.end) - this.toPercent(seg.start);
    return seg.isGap ? `calc(${w}% - ${this.GAP_INSET * 2}px)` : `${w}%`;
  }

  showSegLabel(seg: TimelineSegment): boolean {
    return this.toPercent(seg.end) - this.toPercent(seg.start) > 4;
  }

  currentYearLeft(): string {
    return `${this.toPercent(this.currentYearDecimal())}%`;
  }

  isCurrentYear(tick: number): boolean {
    return tick === this.currentYear;
  }
}
