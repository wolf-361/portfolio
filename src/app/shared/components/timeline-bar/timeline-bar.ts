import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { FloatAnchor, TimelineRow, TimelineSegment } from './timeline-bar.model';

/** Mobile vertical layout: each row enriched with an inset level (0 = full width) */
export interface TimelineRowV {
  row: TimelineRow;
  /** How many px to inset on each side (0, 8, 16, …) */
  inset: number;
  /** Where to anchor the label when the bar is too short to contain it */
  floatAnchor: FloatAnchor;
}

/**
 * Gantt-style horizontal timeline component.
 *
 * Renders a grid of rows, each with a label column and a proportionally
 * positioned bar. All colors map to M3 tokens — changing the theme palette
 * automatically updates bar colors.
 *
 * On mobile (≤600px) switches to a vertical Gantt — time flows top→bottom,
 * each entry is a full-width bar. Entries contained within a wider one are
 * inset so the parent bar shows through on the sides.
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
  host: { '[class.timeline--visible]': 'visible()' },
})
export class TimelineBarComponent implements AfterViewInit, OnDestroy {
  private readonly GAP_INSET = 2; // px — sp.$xxs
  private readonly V_INSET_STEP = 8; // px per containment level

  private readonly zone = inject(NgZone);
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  readonly visible = signal(false);

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

  /**
   * Rows enriched with inset levels for the vertical mobile layout.
   * Sorted widest-first (paint order: background → foreground).
   *
   * Algorithm:
   * 1. Sort by duration descending.
   * 2. For each item, its inset = number of already-placed items whose time
   *    range overlaps with this one × V_INSET_STEP. This means each
   *    successive overlapping entry gets pushed in one more step.
   */
  readonly verticalRows = computed<TimelineRowV[]>(() => {
    const rows = this.rows();

    // Resolve effective start/end for each row (handles segments)
    const spans = rows.map((r) => ({
      row: r,
      start: r.segments ? Math.min(...r.segments.map((s) => s.start)) : r.start,
      end: r.segments ? Math.max(...r.segments.map((s) => s.end)) : r.end,
    }));

    // Sort widest → narrowest, tie-break by earliest start
    const sorted = [...spans].sort((a, b) => {
      const durationDiff = b.end - b.start - (a.end - a.start);
      return durationDiff !== 0 ? durationDiff : a.start - b.start;
    });

    // For each item, count how many already-placed items overlap it in time.
    // That count becomes the inset level.
    const placed: typeof sorted = [];
    const insets = new Map<string, number>();

    for (const item of sorted) {
      const overlapCount = placed.filter((p) => p.start < item.end && item.start < p.end).length;
      insets.set(item.row.label, overlapCount * this.V_INSET_STEP);
      placed.push(item);
    }

    // Assign float anchors: among short bars that overlap in time, cycle top/center/bottom
    const anchors: FloatAnchor[] = ['top', 'center', 'bottom'];
    const floatAnchors = new Map<string, FloatAnchor>();
    const shortBars = sorted.filter((s) => {
      const pctH = this.toPercent(s.end) - this.toPercent(s.start);
      return pctH < 20;
    });
    // Group overlapping short bars together and assign cycling anchors
    const assignedShort = new Set<string>();
    for (const item of shortBars) {
      if (assignedShort.has(item.row.label)) continue;
      const group = shortBars.filter((o) => o.start < item.end && item.start < o.end);
      group.forEach((g, idx) => {
        floatAnchors.set(g.row.label, anchors[idx % anchors.length]);
        assignedShort.add(g.row.label);
      });
    }

    return sorted.map((s) => ({
      row: s.row,
      inset: insets.get(s.row.label) ?? 0,
      floatAnchor: floatAnchors.get(s.row.label) ?? 'top',
    }));
  });

  toPercent(year: number): number {
    const span = this.endYear() - this.startYear();
    return Math.max(0, Math.min(100, ((year - this.startYear()) / span) * 100));
  }

  rowStart(row: TimelineRow): number {
    return row.segments ? Math.min(...row.segments.map((s) => s.start)) : row.start;
  }

  rowEnd(row: TimelineRow): number {
    return row.segments ? Math.max(...row.segments.map((s) => s.end)) : row.end;
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

  /** Bar spans less than 20% of the total range — label should float outside */
  isShortBar(row: TimelineRow): boolean {
    const start = this.rowStart(row);
    const end = this.rowEnd(row);
    return this.toPercent(end) - this.toPercent(start) < 20;
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            this.zone.run(() => this.visible.set(true));
            this.observer?.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
