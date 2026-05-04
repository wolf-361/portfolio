import { I18n } from '../../../shared/models/i18n';

export type ProjectSize = 'featured' | 'small';

export interface ProjectVisual {
  /** Path to image asset, relative to /assets/projects/ */
  src: string;
  alt: I18n;
  /** Render as a phone frame (portrait) or wide screenshot */
  kind: 'phone' | 'screenshot';
}

export interface TerminalNode {
  name: string;
  status: 'online' | 'backup' | 'offline';
  uptime: string;
  cpu: string;
}

export interface ProjectTerminal {
  command: string;
  nodes: TerminalNode[];
}

export interface Project {
  title: I18n;
  description: I18n;
  /** Extended description shown only on featured cards */
  details?: I18n;
  stack: string[];
  /** Optional GitHub or live URL */
  url?: string;
  urlLabel?: I18n;
  /** Visual size in the bento grid */
  size: ProjectSize;
  /** Optional tag line rendered above the title in mono, e.g. "// mobile" */
  tag?: I18n;
  /** Marks the project as actively in development */
  wip?: boolean;
  /** Whether to accent the first stack chip. Defaults true — set false when no single tech deserves focus */
  accentFirst?: boolean;
  /** Optional visual asset — shown in featured cards on desktop */
  visual?: ProjectVisual;
  /** Optional terminal block — shown on full-width cards */
  terminal?: ProjectTerminal;
}
