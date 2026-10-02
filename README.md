# Takwa Laffet — Portfolio

A personal portfolio built as a **Windows-inspired desktop**: a desktop
with applications, a taskbar, a Start menu and draggable windows. Built with
React, TypeScript, Vite and Tailwind CSS.

> Cybersecurity Engineer · Full-Stack Developer · DevOps / DevSecOps Engineer — Tunisia

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run lint       # TypeScript project check
```

On Windows, if PowerShell blocks `npm`, use `npm.cmd` instead of `npm`.

---

## Adding a project

Everything about a project lives in **`src/data/projects.ts`**. No component
needs to be touched — a new entry automatically appears in Featured Projects,
All Projects, search, category filters, the Start menu recommendations and its
own detail window.

```ts
{
  id: 'my-project',                  // unique, also used for the asset folder
  title: 'My Project',
  subtitle: { en: 'Short tagline', fr: 'Accroche courte' },
  category: ['Full-Stack', 'Backend'],   // any tag from projectFilters
  icon: '🚀',                        // used when no image is provided
  image: '/projects/my-project.png', // optional cover image
  description:  { en: '…', fr: '…' },   // card + summary
  longDescription: { en: '…', fr: '…' },
  problem:  { en: '…', fr: '…' },
  solution: { en: '…', fr: '…' },
  architecture: { en: '…', fr: '…' },
  architectureFlow: ['Vue.js', 'API Gateway', 'Services', 'Kafka'],
  features: [{ en: '…', fr: '…' }],
  technologies: ['React', 'Spring Boot'],
  github: '',                        // empty = shown as "not available yet"
  demo: '',                          // empty = shown as "not available yet"
  screenshots: [{ id: 'overview', caption: { en: '…', fr: '…' } }],
  featured: true,
  published: true,                   // false keeps the entry hidden
  year: '2026',
  role: { en: '…', fr: '…' },
}
```

**Reserved slots.** `project-07` … `project-12` already exist at the bottom of
the file with `published: false`. Fill one in and flip the flag — the UI needs
no change.

**Translations.** Any translatable field accepts a plain string (English only)
or `{ en, fr }`. Proper names (Takwa Laffet, ESPRIT, ISET Kébili, CYBEXPSU,
Wazuh, TheHive, MISP, React, Spring Boot…) are never translated.

---

## Editing content

| What | Where |
| --- | --- |
| Identity, contact links, CV path | `src/data/profile.ts` |
| Projects | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Experience timeline | `src/data/experience.ts` |
| Education | `src/data/education.ts` |
| Certifications | `src/data/certifications.ts` |
| English UI strings | `src/locales/en.ts` |
| French UI strings | `src/locales/fr.ts` |
| Colours, themes, wallpaper | `src/index.css` (CSS variables) |
| Page title, description, OG tags | `index.html` |

Adding a language: copy `src/locales/fr.ts`, translate it, register it in
`src/locales/index.ts`. `en.ts` is the reference shape, so TypeScript will tell
you exactly what is missing.

---

## Resume

Drop your PDF at:

```
public/resume/Takwa_Laffet_CV.pdf
```

The Resume application detects the file automatically and shows a placeholder
while it is missing.

---

## Architecture

```
src/
├── components/
│   ├── desktop/          wallpaper, hero, desktop icons
│   ├── taskbar/          taskbar, system tray, mobile navigation
│   ├── start-menu/       Start menu + Ctrl+K search overlay
│   ├── windows/          WindowFrame (drag/resize/controls) + WindowHost
│   ├── projects/         projects app, project card, project detail
│   ├── about/  skills/  experience/  education/
│   ├── certifications/   resume/  contact/  terminal/  settings/
│   └── ui/               shared primitives (Button, Tag, EmptyState…)
├── context/
│   ├── PreferencesProvider.tsx    theme, language, accessibility
│   └── WindowManagerProvider.tsx  open/close/minimize/maximize/z-order
├── data/                 all portfolio content
├── hooks/                media queries, labels, search index
├── i18n/                 useI18n hook
├── locales/              en.ts, fr.ts
└── types/                shared domain types
```

**Window manager** — open, close, minimize, maximize, restore, focus,
bring-to-front, z-index, drag from the title bar, resize from the bottom-right
corner, cascade placement and viewport clamping. No external dependency.

**Responsive behaviour** — on phones the desktop metaphor becomes a mobile OS:
applications open full screen, a bottom navigation bar replaces the taskbar and
the Start menu covers the viewport. Desktop icons are replaced by a quick-launch
grid so every application stays reachable.

**Preferences** — theme (System / Light / Dark), language (EN / FR), reduced
motion and larger text are stored in `localStorage` (`tl.theme`, `tl.lang`,
`tl.reduceMotion`, `tl.largeText`) and applied before first paint.

**Keyboard**

| Shortcut | Action |
| --- | --- |
| `Ctrl` / `⌘` + `K` | Search apps, projects and skills |
| `Esc` | Close the search, then the Start menu, then the active window |
| `↑` / `↓` | Navigate search results and terminal history |
| `Enter` | Open the selected result / run a terminal command |

Reduced motion is honoured from the operating system and can also be enabled in
Settings.

---

## Terminal commands

`help` · `about` · `skills` · `projects` · `education` · `experience` ·
`contact` · `clear` · `whoami` · `role` · `status` · `ls` ·
`cat <project-id>` · `theme light|dark` · `lang en|fr` · `date` · `whoareyou` ·
`neofetch` · `open <app>` · `history` · `exit`

---

## Deployment

Any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages).
`npm run build` emits `dist/`. Remember to add your `resume/Takwa_Laffet_CV.pdf`
and any project images before deploying.