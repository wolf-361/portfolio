import { I18n } from '../../../shared/models/i18n';
import { Project } from './project';

export interface ProjectSection {
  title: I18n;
  body: I18n;
  diagram?: string[];
}

export interface ProjectDetail extends Omit<Project, 'slug'> {
  slug: string;
  sections: ProjectSection[];
}
