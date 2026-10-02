import { certificationGroups, certifications } from '../../data/certifications';
import { useI18n } from '../../i18n/useI18n';
import { resolveText } from '../../types';
import { Icon } from '../ui/Icon';

export function CertificationsApp() {
  const { t, locale } = useI18n();

  const groups = certificationGroups
    .map((group) => ({
      ...group,
      items: certifications.filter((cert) => cert.group === group.id),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header>
          <h3 className="text-lg font-semibold tracking-tight text-ink">{t.certs.title}</h3>
          <p className="mt-0.5 text-xs text-muted">{t.certs.subtitle}</p>
        </header>

        {groups.map((group, index) => (
          <section
            key={group.id}
            aria-labelledby={`cert-group-${group.id}`}
            className="animate-rise-in"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon name={group.icon} size={15} />
              </span>
              <h4 id={`cert-group-${group.id}`} className="text-sm font-semibold text-ink">
                {group.label}
              </h4>
              <span className="text-xs text-muted">({group.items.length})</span>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {group.items.map((cert) => {
                const body = (
                  <>
                    <Icon name="check-circle" size={16} className="shrink-0 text-[var(--success)]" />
                    <span className="min-w-0">
                      <span className="block text-[13px] font-medium leading-snug text-ink">
                        {cert.name}
                      </span>
                      <span className="block text-[11px] text-muted">
                        {resolveText(cert.issuer, locale)}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={cert.id}>
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2.5 transition-colors hover:border-accent/60"
                      >
                        {body}
                        <Icon
                          name="external-link"
                          size={13}
                          className="ml-auto shrink-0 text-muted transition-colors group-hover:text-accent"
                        />
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2.5">
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <p className="text-[11px] leading-relaxed text-muted">{t.certs.note}</p>
      </div>
    </div>
  );
}