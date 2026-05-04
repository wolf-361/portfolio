import { I18n } from '../../../shared/models/i18n';

export interface Experience {
  title: I18n;
  company: string;
  period: I18n;
  /** Short period label for card header, e.g. "2023 → présent" */
  periodShort?: I18n;
  location: string;
  kind: 'work' | 'internship' | 'association';
  active?: boolean;
  bullets: I18n[];
  /** One-line summary for compact layouts */
  summary?: I18n;
  stack?: string[];
  /** Role progression shown as chips, e.g. ['Entrepreneur', 'Stagiaire DUAL'] */
  roleProgression?: string[];
}

export interface Education {
  degree: I18n;
  institution: string;
  institutionFull?: I18n;
  period: string;
  location: string;
  credits?: string;
  badge?: I18n;
  active?: boolean;
  /** Years on Dean's List, shown as individual year chips */
  deanYears?: number[];
  /** Featured = large hero card. Default true for first entry. */
  featured?: boolean;
}
