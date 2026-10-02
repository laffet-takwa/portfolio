import { useEffect, useState } from 'react';
import { profile } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { Button } from '../ui/Primitives';
import { Icon } from '../ui/Icon';
import type { Locale } from '../../types';
import { CvDocument } from './CvDocument';
import { buildCvPrintHtml } from './cvPrint';

const CV_LOCALES: Locale[] = ['en', 'fr'];

const localeLabel = (locale: Locale): string => (locale === 'fr' ? 'Français' : 'English');

function openPrintable(locale: Locale) {
  const blob = new Blob([buildCvPrintHtml(locale)], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank', 'noopener,noreferrer');
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

/**
 * Resume window.
 *
 * The CV is always rendered on screen from `data/resume.ts`, so there is no
 * missing-file state. A compiled PDF is optional: when
 * `public/resume/Takwa_Laffet_CV_<lang>.pdf` exists, a direct download button
 * appears next to the print action.
 */
export function ResumeApp() {
  const { t, locale } = useI18n();
  const [active, setActive] = useState<Locale>(locale === 'fr' ? 'fr' : 'en');
  const [pdf, setPdf] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  // Follow the interface language until the reader picks a tab.
  useEffect(() => {
    setActive(locale === 'fr' ? 'fr' : 'en');
  }, [locale]);

  useEffect(() => {
    let cancelled = false;
    const file = `/resume/Takwa_Laffet_CV_${active.toUpperCase()}.pdf`;
    setChecking(true);
    fetch(file, { method: 'HEAD' })
      .then((response) => {
        const type = response.headers.get('content-type') ?? '';
        if (!cancelled) setPdf(response.ok && type.includes('pdf') ? file : null);
      })
      .catch(() => {
        if (!cancelled) setPdf(null);
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [active]);

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2">
        <Icon name="file-text" size={14} className="text-muted" />

        <div
          role="group"
          aria-label={t.resume.language}
          className="flex overflow-hidden rounded-lg border border-[var(--border)]"
        >
          {CV_LOCALES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActive(item)}
              aria-pressed={active === item}
              className={[
                'px-2.5 py-1 text-xs font-medium transition-colors',
                active === item
                  ? 'bg-accent text-[var(--accent-contrast)]'
                  : 'text-secondary hover:bg-[var(--hover-surface)]',
              ].join(' ')}
            >
              {localeLabel(item)}
            </button>
          ))}
        </div>

        <p className="mr-auto truncate font-mono text-xs text-muted">
          {profile.name} — {localeLabel(active)}
        </p>

        {pdf && !checking ? (
          <Button
            size="sm"
            variant="primary"
            icon={<Icon name="download" size={14} />}
            onClick={() => {
              const link = document.createElement('a');
              link.href = pdf;
              link.download = `Takwa_Laffet_CV_${active.toUpperCase()}.pdf`;
              document.body.appendChild(link);
              link.click();
              link.remove();
            }}
          >
            {t.resume.download}
          </Button>
        ) : null}

        <Button
          size="sm"
          variant={pdf ? 'secondary' : 'primary'}
          icon={<Icon name="printer" size={14} />}
          onClick={() => openPrintable(active)}
        >
          {t.resume.saveAsPdf}
        </Button>
      </div>

      {/* Document */}
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto bg-[var(--background)] p-4 sm:p-6">
        <CvDocument locale={active} />
      </div>

      <p className="border-t border-[var(--border)] px-3 py-1.5 text-center text-[11px] text-muted">
        {t.resume.printHint}
      </p>
    </div>
  );
}