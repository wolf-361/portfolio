import { I18n } from '../../../shared/models/i18n';

export interface ProjectLink {
  label: string;
  url: string;
  icon?: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: I18n;
  tags: string[];
  links?: ProjectLink[];
  status?: string;
  featured?: boolean;
  slug?: string;
}
