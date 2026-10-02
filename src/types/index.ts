/* ============================================================
   Shared domain types
   ============================================================
   Translatable content uses `TText`:
     description: 'English only'                  → EN fallback everywhere
     description: { en: '…', fr: '…' }            → full translation
   This keeps a project entry as small as one English string
   while still allowing French content per field.
   ============================================================ */

export type Locale = 'en' | 'fr';
export type ThemeMode = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

import type { IconName } from './icons';

export type { IconName };

export type TText = string | { en: string; fr: string };

export function resolveText(value: TText | undefined, locale: Locale): string {
  if (value === undefined) return '';
  if (typeof value === 'string') return value;
  return value[locale] ?? value.en;
}

export function hasTranslation(value: TText | undefined, locale: Locale): boolean {
  if (value === undefined) return false;
  if (typeof value === 'string') return locale === 'en';
  return Boolean(value[locale]);
}

/* ---------------- Applications / windows ---------------- */

export type WindowId =
  | 'about'
  | 'projects'
  | 'project-detail'
  | 'skills'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'resume'
  | 'contact'
  | 'terminal'
  | 'settings';

export interface WindowRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ManagedWindow {
  id: WindowId;
  rect: WindowRect;
  restoreRect: WindowRect;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  focused: boolean;
  seq: number;
  /** Only used by the project-detail window. */
  projectId?: string;
}

export interface AppDefinition {
  id: WindowId;
  icon: IconName;
  /** Preferred window size on desktop, in pixels. */
  size: { width: number; height: number };
  minSize?: { width: number; height: number };
  /** Show in the Start menu pinned grid. */
  pinned: boolean;
  /** Show in the mobile bottom navigation. */
  mobileNav: boolean;
}

/* ---------------- Projects ---------------- */

export interface ProjectScreenshot {
  id: string;
  caption: TText;
  /** Optional asset path, e.g. '/projects/beta/soc-overview.png'. */
  src?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: TText;
  category: string[];
  description: TText;
  longDescription: TText;
  problem?: TText;
  solution?: TText;
  architecture?: TText;
  /** Optional vertical flow rendered as a diagram, e.g. ['Vue.js', 'API Gateway', …]. */
  architectureFlow?: string[];
  features?: TText[];
  technologies: string[];
  image?: string;
  /** Icon name used when no screenshot asset is provided. */
  icon?: IconName;
  github?: string;
  demo?: string;
  featured?: boolean;
  screenshots?: ProjectScreenshot[];
  /** Draft entries stay hidden until real content is added. */
  published?: boolean;
  year?: string;
  role?: TText;
}

/* ---------------- Skills ---------------- */

export interface SkillGroup {
  id: string;
  label: TText;
  icon: IconName;
  items: string[];
}

/* ---------------- Experience ---------------- */

export interface ExperienceEntry {
  id: string;
  role: TText;
  organization: string;
  location: TText;
  period: string;
  type: TText;
  highlights: TText[];
  technologies: string[];
}

/* ---------------- Education ---------------- */

export interface EducationEntry {
  id: string;
  degree: TText;
  school: string;
  period: string;
  note?: TText;
}

/* ---------------- Certifications ---------------- */

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: TText;
  group: 'cisco' | 'linux' | 'cloud' | 'other';
}

/* ---------------- Profile ---------------- */

export interface Profile {
  name: string;
  roles: string[];
  location: TText;
  availability: TText;
  email: string;
  linkedin: string;
  github: string;
  resumeFile: string;
  resumeFileName: string;
}