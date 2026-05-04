import { I18n } from '../../../shared/models/i18n';

export interface Experience {
  title: I18n;
  company: string;
  period: I18n;
  location: string;
  kind: 'work' | 'internship' | 'association';
  active?: boolean; // true = show active dot
  bullets: I18n[];
  stack?: string[];
}

export interface Education {
  degree: I18n;
  institution: string;
  period: string;
  location: string;
  badge?: I18n; // e.g. "Dean's List 2023 & 2024"
  active?: boolean;
}
