import { useEffect, useState } from 'react';
import { profile } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { Button } from '../ui/Primitives';
import { Icon } from '../ui/Icon';

type FileState = 'checking' | 'ready' | 'missing';

/** Professional PDF viewer application for the CV. */
export function ResumeApp() {
  const { t } = useI18n();
  const [state, setState] = useState<FileState>('checking');

  useEffect(() => {
    let cancelled = false;
    fetch(profile.resumeFile, { method: 'HEAD' })
      .then((response) => {
        if (cancelled) return;
        const type = response.headers.get('content-type') ?? '';
        setState(response.ok && (type === '' || type.includes('pdf')) ? 'ready' : 'missing');
      })
      .catch(() => {
        if (!cancelled) setState('missing');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2">
        <Icon name="file-text" size={14} className="text-muted" />
        <p className="mr-auto truncate font-mono text-xs text-secondary">
          {t.resume.fileLabel}
        </p>
        <Button
          size="sm"
          variant="primary"
          icon={<Icon name="download" size={14} />}
          onClick={() => {
            const link = document.createElement('a');
            link.href = profile.resumeFile;
            link.download = profile.resumeFileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
          }}
        >
          {t.resume.download}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          icon={<Icon name="external-link" size={14} />}
          onClick={() => window.open(profile.resumeFile, '_blank', 'noopener,noreferrer')}
        >
          {t.resume.open}
        </Button>
      </div>

      {/* Viewer */}
      <div className="min-h-0 flex-1 bg-[var(--background)]">
        {state === 'checking' ? (
          <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted">
            {t.resume.loading}
          </div>
        ) : state === 'missing' ? (
          <div className="flex h-full items-center justify-center p-8">
            <div className="max-w-md text-center">
              <Icon
                name="file-text"
                size={44}
                className="mx-auto text-muted opacity-60"
              />
              <p className="mt-3 text-sm font-semibold text-ink">{t.resume.missing}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{t.resume.missingHint}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => window.open(profile.resumeFile, '_blank', 'noopener,noreferrer')}>
                  {t.resume.open}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <iframe
              title={`${profile.name} — CV`}
              src={profile.resumeFile}
              className="min-h-0 w-full flex-1 border-0 bg-white"
            >
              <object
                data={profile.resumeFile}
                type="application/pdf"
                className="h-full w-full"
                aria-label={profile.resumeFileName}
              >
                <p className="p-4 text-sm text-secondary">{t.resume.fileHint}</p>
              </object>
            </iframe>
            <p className="border-t border-[var(--border)] px-3 py-1.5 text-center text-[11px] text-muted">
              {t.resume.fileHint}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}