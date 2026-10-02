import type { Profile, WindowId } from '../types';
import type { Dictionary } from '../locales/en';
import type { IconName } from '../types/icons';

/**
 * Single source of truth for identity and contact details.
 * Proper names, organisations and technologies are never translated.
 */
export const profile: Profile = {
  name: 'Takwa Laffet',
  roles: ['Cybersecurity Engineer', 'Full-Stack Developer', 'DevOps / DevSecOps'],
  headline: 'Cybersecurity Engineer | Full-Stack Developer | DevOps / DevSecOps',
  tagline: {
    en: 'Building secure, scalable and intelligent digital solutions across software engineering, cloud, cybersecurity and AI.',
    fr: 'Concevoir des solutions numériques sécurisées, évolutives et intelligentes : génie logiciel, cloud, cybersécurité et IA.',
  },
  location: { en: 'Tunisia', fr: 'Tunisie' },
  availability: { en: 'Available immediately', fr: 'Disponible immédiatement' },
  email: 'takwa.laffet@esprit.tn',
  linkedin: 'https://www.linkedin.com/in/takwa-laffet-883239211/',
  github: 'https://github.com/takwa-laffet',
  portfolioUrl: 'https://laffet-takwa.github.io/portfolio/',
  handles: { github: 'takwa-laffet', linkedin: 'takwa-laffet-883239211' },
  resumes: [
    {
      locale: 'en',
      label: 'English',
      file: '/resume/Takwa_Laffet_CV_EN.pdf',
      fileName: 'Takwa_Laffet_CV_EN.pdf',
    },
    {
      locale: 'fr',
      label: 'Français',
      file: '/resume/Takwa_Laffet_CV_FR.pdf',
      fileName: 'Takwa_Laffet_CV_FR.pdf',
    },
  ],
};

/**
 * Application registry — drives desktop icons, Start menu, taskbar and mobile
 * navigation. Labels and tooltips are resolved through the locale files.
 */
export const apps = {
  about: { id: 'about', icon: 'user', size: { width: 780, height: 620 }, pinned: true, mobileNav: true },
  projects: { id: 'projects', icon: 'folder', size: { width: 1020, height: 680 }, pinned: true, mobileNav: true },
  'project-detail': {
    id: 'project-detail',
    icon: 'file-text',
    size: { width: 940, height: 700 },
    pinned: false,
    mobileNav: false,
  },
  skills: { id: 'skills', icon: 'shield', size: { width: 900, height: 640 }, pinned: true, mobileNav: true },
  experience: {
    id: 'experience',
    icon: 'briefcase',
    size: { width: 860, height: 660 },
    pinned: true,
    mobileNav: false,
  },
  education: { id: 'education', icon: 'graduation', size: { width: 820, height: 600 }, pinned: true, mobileNav: true },
  certifications: {
    id: 'certifications',
    icon: 'award',
    size: { width: 820, height: 600 },
    pinned: true,
    mobileNav: false,
  },
  resume: { id: 'resume', icon: 'file-text', size: { width: 900, height: 700 }, pinned: true, mobileNav: false },
  contact: { id: 'contact', icon: 'mail', size: { width: 760, height: 660 }, pinned: true, mobileNav: true },
  terminal: { id: 'terminal', icon: 'terminal', size: { width: 820, height: 500 }, pinned: true, mobileNav: false },
  settings: { id: 'settings', icon: 'settings', size: { width: 880, height: 620 }, pinned: true, mobileNav: true },
} as const;

/** Icon name for an application, used by every surface that renders app icons. */
export function appIcon(id: WindowId): IconName {
  return apps[id].icon as IconName;
}

/** All registered application ids. */
export const APP_IDS = Object.keys(apps) as WindowId[];

export const pinnedAppIds = [
  'projects',
  'about',
  'skills',
  'experience',
  'education',
  'certifications',
  'resume',
  'contact',
  'terminal',
  'settings',
] as const;

export const mobileNavAppIds = ['projects', 'about', 'contact', 'settings'] as const;

/** Quick-launch grid shown on the mobile home screen (desktop icons are hidden there). */
export const mobileGridAppIds = [
  'projects',
  'about',
  'skills',
  'experience',
  'education',
  'certifications',
  'resume',
  'contact',
  'terminal',
  'settings',
] as const;

/** Desktop icon order (left column of the desktop). */
export const desktopIconAppIds = [
  'projects',
  'about',
  'skills',
  'experience',
  'education',
  'certifications',
  'resume',
  'contact',
  'terminal',
  'settings',
] as const;

/** Maps a window id to its key inside the `apps` section of the dictionaries. */
export const appLabelKey: Record<WindowId, keyof Dictionary['apps']> = {
  about: 'about',
  projects: 'projects',
  'project-detail': 'projectDetail',
  skills: 'skills',
  experience: 'experience',
  education: 'education',
  certifications: 'certifications',
  resume: 'resume',
  contact: 'contact',
  terminal: 'terminal',
  settings: 'settings',
};

/** Applications opened on first visit to make the desktop feel alive. */
export const defaultOpenAppIds = ['terminal'] as const;
