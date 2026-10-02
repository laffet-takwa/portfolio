import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { useWindowManager } from '../../context/WindowManagerProvider';
import { usePreferences } from '../../context/PreferencesProvider';
import { profile, apps } from '../../data/profile';
import { publishedProjects, featuredProjects, getProjectById } from '../../data/projects';
import { skillGroups } from '../../data/skills';
import { experience } from '../../data/experience';
import { education } from '../../data/education';
import { resolveText } from '../../types';
import type { Dictionary } from '../../locales/en';
import type { Locale, ThemeMode, WindowId } from '../../types';

type LineKind = 'text' | 'muted' | 'accent' | 'success' | 'error';

interface OutputLine {
  kind: LineKind;
  content: string;
}

/** Side effects triggered by a command — executed once, on submit. */
interface CommandEffects {
  openApp?: WindowId;
  openProject?: string;
  closeSelf?: boolean;
  setLocale?: Locale;
  setThemeMode?: ThemeMode;
}

const KIND_CLASS: Record<LineKind, string> = {
  text: 'text-secondary',
  muted: 'text-muted',
  accent: 'text-accent',
  success: 'text-[var(--success)]',
  error: 'text-[var(--danger)]',
};

const HELP_KEYS = [
  'help',
  'about',
  'skills',
  'projects',
  'education',
  'experience',
  'contact',
  'clear',
] as const;

const EXTRA_KEYS = [
  'whoami',
  'role',
  'status',
  'ls',
  'cat',
  'theme',
  'lang',
  'date',
  'whoareyou',
  'neofetch',
  'open',
  'history',
  'exit',
] as const;

/**
 * Pure command interpreter: the same command always produces the same output
 * for a given language, which is what allows the whole scrollback to be
 * re-rendered when the interface language changes.
 */
function execute(
  raw: string,
  ctx: { t: Dictionary; locale: Locale; history: string[] },
): { lines: OutputLine[]; effects: CommandEffects } {
  const { t, locale, history } = ctx;
  const lines: OutputLine[] = [];
  const effects: CommandEffects = {};
  const out = (kind: LineKind, content: string) => lines.push({ kind, content });

  const [command = '', ...args] = raw.trim().split(/\s+/);
  const key = command.toLowerCase();

  switch (key) {
    case 'help': {
      out('accent', t.terminal.outputs.helpHeader);
      [...HELP_KEYS, ...EXTRA_KEYS].forEach((item) =>
        out('text', `  ${item.padEnd(12)} ${t.terminal.labels[item]}`),
      );
      out('muted', `  ${t.terminal.outputs.helpHint}`);
      break;
    }

    case 'whoami':
      out('success', t.terminal.outputs.whoamiUser);
      break;

    case 'role':
    case 'about': {
      out('text', `${t.terminal.outputs.aboutLabel}: ${profile.name}`);
      out('muted', `${t.terminal.outputs.rolesLabel}:`);
      [t.desktop.role1, t.desktop.role2, t.desktop.role3].forEach((role) =>
        out('text', `  • ${role}`),
      );
      out('muted', `${t.terminal.outputs.aboutLocation}: ${resolveText(profile.location, locale)}`);
      out(
        'muted',
        `${t.terminal.outputs.aboutAvailability}: ${resolveText(profile.availability, locale)}`,
      );
      if (key === 'about') out('muted', `${t.terminal.outputs.aboutSummary}: ${t.about.description}`);
      break;
    }

    case 'whoareyou':
      out('accent', `${profile.name} — ${t.desktop.role1}`);
      out('muted', t.desktop.heroTagline);
      break;

    case 'status':
      out('success', t.terminal.outputs.statusAvailable);
      out('muted', `${t.terminal.outputs.aboutLocation}: ${resolveText(profile.location, locale)}`);
      break;

    case 'skills': {
      out('accent', t.terminal.outputs.skillsHeader);
      const total = skillGroups.reduce((sum, group) => sum + group.items.length, 0);
      skillGroups.forEach((group) => {
        out('text', `  [${resolveText(group.label, locale)}]`);
        out('muted', `    ${group.items.join(', ')}`);
      });
      out('muted', `${total} ${t.terminal.outputs.skillsTotal}`);
      break;
    }

    case 'projects':
    case 'ls': {
      out('accent', `${t.terminal.outputs.projectsHeader} (${publishedProjects.length})`);
      publishedProjects.forEach((project) => {
        const marker = featuredProjects.some((item) => item.id === project.id) ? '*' : ' ';
        out('text', `  ${marker} ${project.id.padEnd(28)} ${project.title}`);
      });
      out('muted', t.terminal.outputs.projectsHint);
      break;
    }

    case 'cat': {
      const id = args[0];
      if (!id) {
        out('error', t.terminal.outputs.unknownProject);
        out('muted', t.terminal.outputs.projectsHint);
        break;
      }
      const project = getProjectById(id) ?? getProjectById(id.toLowerCase().replace(/\s+/g, '-'));
      if (!project) {
        out('error', `${id}: ${t.terminal.outputs.unknownProject}`);
        break;
      }
      out('accent', `${t.terminal.outputs.projectDetail}: ${project.title}`);
      out('muted', `${t.terminal.outputs.categoriesLabel}: ${project.category.join(', ')}`);
      out('text', resolveText(project.description, locale));
      if (project.technologies.length > 0) {
        out('muted', `${t.terminal.outputs.techLabel}: ${project.technologies.join(', ')}`);
      }
      break;
    }

    case 'education': {
      out('accent', t.terminal.outputs.educationHeader);
      education.forEach((entry) => {
        out('text', `  ${resolveText(entry.degree, locale)}`);
        out('muted', `    ${entry.school} — ${entry.period}`);
      });
      break;
    }

    case 'experience': {
      out('accent', t.terminal.outputs.experienceHeader);
      experience.forEach((entry) => {
        out('text', `  ${entry.organization} — ${resolveText(entry.role, locale)}`);
        out('muted', `    ${entry.period}`);
      });
      break;
    }

    case 'contact': {
      out('accent', t.terminal.outputs.contactHeader);
      out('text', `  ${t.terminal.outputs.emailLabel}: ${profile.email}`);
      out('text', `  ${t.terminal.outputs.linkedinLabel}: ${profile.linkedin}`);
      out('text', `  ${t.terminal.outputs.githubLabel}: ${profile.github}`);
      out('text', `  ${t.terminal.outputs.resumeLabel}: ${profile.resumeFileName}`);
      break;
    }

    case 'theme': {
      const option = (args[0] ?? '').toLowerCase();
      if (['light', 'dark', 'system'].includes(option)) {
        effects.setThemeMode = option as ThemeMode;
        out('success', `${t.taskbar.theme}: ${option}`);
      } else {
        out('muted', `${t.terminal.outputs.themeCurrent}: ${args[0] || 'light | dark | system'}`);
      }
      break;
    }

    case 'lang': {
      const option = (args[0] ?? '').toLowerCase();
      if (['en', 'fr'].includes(option)) {
        effects.setLocale = option as Locale;
        out('success', `${t.taskbar.language}: ${option.toUpperCase()}`);
      } else {
        out('muted', `${t.terminal.outputs.languageCurrent}: ${locale.toUpperCase()}`);
      }
      break;
    }

    case 'date':
      out('text', new Date().toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-GB'));
      break;

    case 'history':
      if (history.length === 0) out('muted', '—');
      history.forEach((item, index) => out('muted', `  ${index + 1}  ${item}`));
      break;

    case 'neofetch': {
      out('accent', `   ${t.about.name}`);
      out('muted', '   ─────────────');
      const rows: Array<[string, string]> = [
        ['Host', `${profile.name.toLowerCase().replace(/\s+/g, '-')}-pc`],
        ['OS', t.terminal.outputs.os],
        ['WM', t.terminal.outputs.windowManager],
        ['Shell', t.terminal.outputs.shell],
        ['Terminal', `${t.apps.terminal} 1.0`],
        ['Language', locale === 'fr' ? 'Français' : 'English'],
      ];
      rows.forEach(([label, value]) => out('text', `  ${label.padEnd(16)} ${value}`));
      out('text', '  ██  ██  ██  ██  ██');
      out('text', '  ██  ██  ██  ██  ██');
      break;
    }

    case 'open': {
      const target = (args[0] ?? '').toLowerCase();
      const match = (Object.keys(apps) as WindowId[]).find(
        (id) => id === target || apps[id].icon === args[0],
      );
      if (match && match !== 'project-detail') {
        effects.closeSelf = true;
        effects.openApp = match;
      } else {
        out('error', `${args[0] ?? ''}: ${t.terminal.unknown}`);
      }
      break;
    }

    case 'exit':
      effects.closeSelf = true;
      break;

    case 'sudo':
      out('error', 'sudo: a password is required');
      out('muted', 'This portfolio is read-only. Nothing to escalate.');
      break;

    default:
      out('error', `'${command}' ${t.terminal.notFound}`);
      out('muted', t.terminal.typeHelp);
  }

  return { lines, effects };
}

interface Entry {
  id: number;
  /** Banner entry, or the command that was typed. */
  command: string;
  banner?: boolean;
}

export function TerminalApp() {
  const { t, locale, setLocale } = useI18n();
  const { setThemeMode } = usePreferences();
  const { openWindow, closeWindow } = useWindowManager();
  const [entries, setEntries] = useState<Entry[]>(() => [{ id: 0, command: '', banner: true }]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /** Re-derived on every render, so switching language retranslates the scrollback. */
  const rendered = useMemo(() => {
    const nodes: ReactNode[] = [];
    entries.forEach((entry) => {
      if (entry.banner) {
        nodes.push(
          <div key={`banner-${entry.id}`}>
            <div className="text-accent">{t.terminal.banner}</div>
            <div className="text-muted">{t.terminal.bannerHint}</div>
            <div className="text-muted">&nbsp;</div>
          </div>,
        );
        return;
      }
      const { lines } = execute(entry.command, { t, locale, history });
      nodes.push(
        <div key={entry.id} className="whitespace-pre-wrap break-words">
          <div className="text-[var(--success)]">
            <span className="opacity-70">{t.terminal.prompt} </span>
            {entry.command}
          </div>
          {lines.map((line, index) => (
            <div key={index} className={KIND_CLASS[line.kind]}>
              {line.content}
            </div>
          ))}
        </div>,
      );
    });
    return nodes;
  }, [entries, t, locale, history]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [entries]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;

    const { effects } = execute(command, { t, locale, history });
    setHistory((current) => [...current, command]);
    setHistoryIndex(-1);
    setInput('');

    if (command.toLowerCase() === 'clear') {
      idRef.current += 1;
      setEntries([{ id: idRef.current, command: '', banner: true }]);
      return;
    }

    idRef.current += 1;
    setEntries((current) => [...current, { id: idRef.current, command }]);

    if (effects.setThemeMode) setThemeMode(effects.setThemeMode);
    if (effects.setLocale) setLocale(effects.setLocale);
    if (effects.closeSelf) closeWindow('terminal');
    if (effects.openApp) openWindow(effects.openApp);
    if (effects.openProject) openWindow('project-detail', { projectId: effects.openProject });
  };

  return (
    <div
      className="flex h-full flex-col bg-[color-mix(in_srgb,var(--background)_92%,black)]"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="scroll-thin min-h-0 flex-1 overflow-y-auto px-3 py-3 font-mono text-[12px] leading-relaxed sm:px-4"
        role="log"
        aria-live="polite"
        aria-label={t.apps.terminal}
      >
        {rendered}

        <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
          <label htmlFor="terminal-input" className="shrink-0 text-[var(--success)]">
            {t.terminal.prompt}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (history.length === 0) return;
                const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(next);
                setInput(history[next]);
              } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (historyIndex < 0) return;
                const next = historyIndex + 1;
                if (next >= history.length) {
                  setHistoryIndex(-1);
                  setInput('');
                } else {
                  setHistoryIndex(next);
                  setInput(history[next]);
                }
              }
            }}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            autoCapitalize="off"
            aria-label={t.terminal.hint}
            className="min-w-0 flex-1 border-none bg-transparent text-secondary caret-[var(--success)] outline-none"
          />
        </form>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] px-3 py-1.5 text-[10px] text-muted sm:px-4">
        {HELP_KEYS.join(' · ')}
      </div>
    </div>
  );
}