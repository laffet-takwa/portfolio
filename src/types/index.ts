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
  /** Optional asset path, e.g. '/projects/beta/soc-overview.jpg'. */
  src?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: TText;
  category: string[];
  description: TText;
  longDescription: TText;
  /** One-line takeaway rendered on the card and at the top of the detail view. */
  highlight?: TText;
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
  /** Folder under /projects/ holding the screenshots. Defaults to `id`. */
  screenshotFolder?: string;
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
  /** Project or product this work belongs to. */
  project?: TText;
  /** One or two sentences shown before the card is expanded. */
  summary?: TText;
  /** Two to four bullets visible in the collapsed state. */
  highlights: TText[];
  /** Full contribution list revealed by the "details" toggle. */
  contributions?: TText[];
  /** Ways of working, e.g. Scrum, CRISP-DM. */
  methodologies?: string[];
  technologies: string[];
}

/* ---------------- Education ---------------- */

export interface EducationEntry {
  id: string;
  degree: TText;
  /** Official diploma name or English equivalent, shown under the degree. */
  degreeAlt?: TText;
  school: string;
  /** Full institution name. */
  schoolDetail?: TText;
  period: string;
  note?: TText;
}

/* ---------------- Languages ---------------- */

export type LanguageLevel = 'native' | 'c2' | 'c1' | 'b2' | 'b1' | 'a2';

export interface LanguageEntry {
  id: string;
  name: string;
  level: LanguageLevel;
}

/* ---------------- Certifications ---------------- */

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: TText;
  group: 'cisco' | 'linux' | 'cloud' | 'other';
  /** Only set when a real verification link already exists. */
  url?: string;
}

/* ---------------- Profile ---------------- */

/** One published CV. The PDF is optional — the app detects it at runtime. */
export interface ResumeVariant {
  /** Matches the site locale that should be selected by default. */
  locale: Locale;
  label: string;
  file: string;
  fileName: string;
}

export interface Profile {
  name: string;
  roles: string[];
  /** Single-line positioning statement used by the hero. */
  headline: string;
  /** Short supporting sentence under the hero. */
  tagline: TText;
  location: TText;
  availability: TText;
  email: string;
  linkedin: string;
  github: string;
  portfolioUrl: string;
  /** Calendly scheduling link for intro calls. */
  calendly: string;
  /** Handles shown next to the icons, without the domain. */
  handles: { github: string; linkedin: string };
  /** Published CVs, most recent language first. */
  resumes: ResumeVariant[];
}