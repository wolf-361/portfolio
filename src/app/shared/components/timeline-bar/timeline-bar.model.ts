export type FloatAnchor = 'top' | 'center' | 'bottom';

export interface TimelineSegment {
  start: number;
  end: number;
  barLabel: string;
  starred?: boolean;
  /** Renders as a dashed gap marker instead of a filled bar */
  isGap?: boolean;
}

/**
 * A single row in the timeline Gantt chart.
 *
 * Use `segments` for rows that have a visible gap (e.g. academic leave).
 * When `segments` is set, `start`/`end`/`barLabel`/`starred` are ignored.
 */
export interface TimelineRow {
  /** Short label shown in the left column, e.g. "UQTR · Bac" */
  label: string;

  /** Text rendered inside the bar. Ignored when `segments` is set. */
  barLabel: string;

  /** Start year as a decimal. Ignored when `segments` is set. */
  start: number;

  /** End year as a decimal. Ignored when `segments` is set. */
  end: number;

  /** Visual variant — maps to M3 color roles */
  variant: 'education' | 'work' | 'internship' | 'association';

  /** Shows a ★ marker on the bar */
  starred?: boolean;

  /** Marks row as currently ongoing */
  ongoing?: boolean;

  /**
   * Optional multi-segment mode. When set, renders multiple bars on the same
   * track with visible gaps between them (e.g. academic leave on a B.Sc. row).
   */
  segments?: TimelineSegment[];
}
