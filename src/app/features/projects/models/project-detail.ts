import { I18n } from '../../../shared/models/i18n';
import { Project } from './project';

export interface StatCard {
  value: string;
  label: I18n;
}

export interface ProjectMeta {
  role: I18n;
  roleDetail?: I18n; // e.g. "Architecture, UI, KMP"
  duration: I18n;
  team: I18n;
  url?: string; // production / live link
  urlLabel?: I18n; // e.g. { en: 'GitHub →', fr: 'GitHub →' }
}

export interface ProjectPager {
  prevSlug?: string;
  prevTitle?: string;
  nextSlug?: string;
  nextTitle?: string;
}

export interface ProjectHighlight {
  text: I18n;
  attribution?: I18n;
}

export interface ProjectSection {
  id: string; // anchor id for TOC
  title: I18n; // large section heading
  tocLabel: I18n; // short label for TOC + eyebrow (e.g. "Le Problème")
  body: I18n;
  highlight?: ProjectHighlight;
  diagram?: string[]; // legacy ASCII fallback
  svgDiagram?: string; // inline SVG markup — takes priority over diagram
  diagramLabel?: string; // filename shown in the terminal bar, e.g. 'network.svg'
  stats?: StatCard[];
}

export interface ProjectDetail extends Omit<Project, 'slug'> {
  slug: string;
  meta?: ProjectMeta;
  sections: ProjectSection[];
  pager?: ProjectPager;
}
