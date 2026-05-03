import { I18n } from '../../../shared/models/i18n';

export interface Experience {
  title: I18n;
  company: string;
  period: string;
  location: string;
  type: 'work' | 'extracurricular';
  bullets: I18n[];
  stack?: string[];
}
