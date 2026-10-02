import type { ReactNode } from 'react';
import type { IconName } from '../../types/icons';

/**
 * Single line-icon set for the whole portfolio — no emoji anywhere.
 * All icons share a 24×24 viewBox and inherit `currentColor`.
 */
const SHAPES: Record<IconName, ReactNode> = {
  folder: (
    <>
      <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4.2a1.5 1.5 0 0 1 1.2.6L11.4 8h8.1A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
    </>
  ),
  'file-text': (
    <>
      <path d="M14.5 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V6.5z" />
      <path d="M14 3v3.5a1 1 0 0 0 1 1h3.5" />
      <path d="M9 12.5h6M9 16h4" />
    </>
  ),
  terminal: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <path d="M6.5 9l3 3-3 3M12.5 15h5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="6.6" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 3.4v1.5M12 19.1v1.5M3.4 12h1.5M19.1 12h1.5" strokeWidth="2.1" />
      <path d="M5.9 5.9l1 1M17.1 17.1l1 1M18.1 5.9l-1 1M6.9 17.1l-1 1" strokeWidth="2.1" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  shield: <path d="M12 3l7 2.8v5.4c0 4.2-2.9 7.8-7 9.8-4.1-2-7-5.6-7-9.8V5.8z" />,
  'shield-check': (
    <>
      <path d="M12 3l7 2.8v5.4c0 4.2-2.9 7.8-7 9.8-4.1-2-7-5.6-7-9.8V5.8z" />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2.5" y="7" width="19" height="13" rx="2" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7" />
      <path d="M2.5 12.5h19" />
    </>
  ),
  graduation: (
    <>
      <path d="M2.5 9L12 5l9.5 4L12 13z" />
      <path d="M6.5 10.8V16c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-5.2" />
      <path d="M20.5 10.5V16" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </>
  ),
  moon: <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7z" />,
  monitor: (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M8.5 21h7M12 17v4" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 9.5a14 14 0 0 1 19 0" />
      <path d="M5.8 13a9 9 0 0 1 12.4 0" />
      <path d="M9 16.4a4.5 4.5 0 0 1 6 0" />
      <circle cx="12" cy="19.4" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  speaker: (
    <>
      <path d="M4 9.5h3l4.5-3.5v12L7 14.5H4z" />
      <path d="M15 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M17.8 7a7 7 0 0 1 0 10" />
    </>
  ),
  battery: (
    <>
      <rect x="2" y="7.5" width="17" height="9" rx="2" />
      <path d="M21.5 11v2" />
      <rect x="4" y="9.5" width="8.5" height="5" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  code: <path d="M8.5 8.5L4 12l4.5 3.5M15.5 8.5L20 12l-4.5 3.5M13.6 5l-3.2 14" />,
  cloud: (
    <path d="M7 18.5A4 4 0 0 1 7.3 10.6 5.5 5.5 0 0 1 18 11.5a3.5 3.5 0 0 1-.5 7z" />
  ),
  check: <path d="M4.5 12.5l5 5 10-11" />,
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.2l2.8 2.8L16 9.5" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  blocks: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <path d="M17.25 13.5v7.5M13.5 17.25h7.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
    </>
  ),
  zap: <path d="M13.5 2.5L4 13.5h7l-1 8 9.5-11h-7z" />,
  server: (
    <>
      <rect x="2.5" y="3.5" width="19" height="7" rx="2" />
      <rect x="2.5" y="13.5" width="19" height="7" rx="2" />
      <path d="M6.5 7h.01M6.5 17h.01" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5c0-4-4-7.2-9-7.2z" />
      <circle cx="7.6" cy="11.4" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="11" cy="7.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.4" cy="9" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="4.6" r="1.8" />
      <path d="M5 8.6c2.3.8 4.6 1.2 7 1.2s4.7-.4 7-1.2" />
      <path d="M12 9.8v4.7M12 14.5L9 21M12 14.5L15 21" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.8h.01" />
    </>
  ),
  school: (
    <>
      <path d="M12 3l9 4.5-9 4.5-9-4.5z" />
      <path d="M6.5 10v5.5c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3V10" />
      <path d="M21 7.5V14" />
    </>
  ),
  star: (
    <path d="M12 3.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8z" />
  ),
  'external-link': (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4l-8.5 8.5" />
      <path d="M18 14.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7.5A1.5 1.5 0 0 1 5 6h4.5" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.6 2.6 0 1 1 3.4 2.5c-.6.2-.9.8-.9 1.4v.4" />
      <path d="M12 16.8h.01" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9.5 18h5M10.5 21h3" />
      <path d="M12 3a6 6 0 0 1 3.6 10.8c-.6.5-1 1.2-1 2H9.4c0-.8-.4-1.5-1-2A6 6 0 0 1 12 3z" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3.5 12.5L12 17l8.5-4.5" />
      <path d="M3.5 16.5L12 21l8.5-4.5" />
    </>
  ),
  wrench: (
    <>
      <path d="M15.2 4.3a4.6 4.6 0 0 0 5.6 6L21 21H3l10.6-11a4.6 4.6 0 0 0 1.6-5.7z" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="M21 16l-5-5-6 6.5-2.5-2.5L3 19" />
    </>
  ),
  'chevron-down': <path d="M6 9.5l6 6 6-6" />,
  'arrow-right': <path d="M4 12h15M13 6l6 6-6 6" />,
  'arrow-left': <path d="M20 12H5M11 6l-6 6 6 6" />,
  cpu: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <path d="M9.5 2.5v4M14.5 2.5v4M9.5 17.5v4M14.5 17.5v4M2.5 9.5h4M2.5 14.5h4M17.5 9.5h4M17.5 14.5h4" />
    </>
  ),
  landmark: (
    <>
      <path d="M3 9.5L12 4l9 5.5" />
      <path d="M5.5 10.5v7.5M9.8 10.5v7.5M14.2 10.5v7.5M18.5 10.5v7.5" />
      <path d="M3 20.5h18" />
    </>
  ),
  'shopping-cart': (
    <>
      <path d="M2.5 4h2.2l2.4 11h11l2-8H6.2" />
      <circle cx="9" cy="19.3" r="1.4" />
      <circle cx="17.5" cy="19.3" r="1.4" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <path d="M12 12l6.4-6.4" />
    </>
  ),
  receipt: (
    <>
      <path d="M5 3.5h14v18l-2.3-1.6-2.4 1.6-2.3-1.6-2.3 1.6L7.3 20 5 21.5z" />
      <path d="M9 8.5h6M9 12.5h6" />
    </>
  ),
  archive: (
    <>
      <rect x="3" y="4" width="18" height="4.5" rx="1.5" />
      <path d="M4.5 8.5V19A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5V8.5" />
      <path d="M10 12.5h4" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4.5 4.5 0 0 0 6.5 0l2.5-2.5a4.5 4.5 0 0 0-6.4-6.4L11.4 6.4" />
      <path d="M14 10a4.5 4.5 0 0 0-6.5 0L5 12.5a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />
    </>
  ),
  'git-branch': (
    <>
      <circle cx="6.5" cy="5.5" r="2.5" />
      <circle cx="6.5" cy="18.5" r="2.5" />
      <circle cx="17.5" cy="9.5" r="2.5" />
      <path d="M6.5 8v8M17.5 12c0 3-2.6 4-5 4.4" />
    </>
  ),
  send: (
    <>
      <path d="M21 3L10.5 13.5" />
      <path d="M21 3l-6.5 18-4-8-8-4z" />
    </>
  ),
  download: <path d="M12 3.5v11M7.5 10.5L12 15l4.5-4.5M4 19.5h16" />,
  sparkle: (
    <>
      <path d="M11 3l1.7 4.3L17 9l-4.3 1.7L11 15l-1.7-4.3L5 9l4.3-1.7z" />
      <path d="M18 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
};

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  /** Filled icons read better for status dots. */
  filled?: boolean;
}

/** Decorative by default — the surrounding text or label carries the meaning. */
export function Icon({ name, size = 18, className = '', strokeWidth = 1.7 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0 }}
      className={className}
    >
      {SHAPES[name]}
    </svg>
  );
}

/** Renders an icon centred inside a rounded tile — used for app and project tiles. */
export function IconTile({
  name,
  size = 20,
  className = '',
  tone = 'default',
}: {
  name: IconName;
  size?: number;
  className?: string;
  tone?: 'default' | 'accent' | 'muted' | 'inverse';
}) {
  const tones: Record<string, string> = {
    default: 'bg-[var(--hover-surface)] text-secondary',
    accent: 'bg-accent-soft text-accent',
    muted: 'bg-[var(--hover-surface)] text-muted',
    inverse: 'bg-[var(--accent-contrast)]/15 text-[var(--accent-contrast)]',
  };
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center ${tones[tone]} ${className}`}
    >
      <Icon name={name} size={size} />
    </span>
  );
}
