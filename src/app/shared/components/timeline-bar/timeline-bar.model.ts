/**
 * A single row in the timeline Gantt chart.
 */
export interface TimelineRow {
  /** Short label shown in the left column, e.g. "UQTR · Bac" */
  label: string;

  /** Text rendered inside the bar, e.g. "BACCALAURÉAT INFORMATIQUE · 2022 – 2026" */
  barLabel: string;

  /**
   * Start year as a decimal, e.g. 2022.0 = Jan 2022, 2023.75 = Sept 2023.
   * Formula: year + (month - 1) / 12
   */
  start: number;

  /**
   * End year as a decimal. Use the current year's end for ongoing rows.
   */
  end: number;

  /** Visual variant — maps to M3 color roles */
  variant: 'education' | 'work' | 'internship' | 'association';

  /** Shows a ★ marker on the bar (e.g. Dean's List) */
  starred?: boolean;

  /** Marks row as currently ongoing — adds a subtle indicator */
  ongoing?: boolean;
}
