import { certificationGroups, certifications } from '../../data/certifications';
import { useI18n } from '../../i18n/useI18n';
import { Icon } from '../ui/Icon';

export function CertificationsApp() {
  const { t, locale } = useI18n();

  const groups = certificationGroups
    .map((group) => ({
      ...group,
      items: certifications.filter((cert) => cert.group === group.id),
    }))
    .filter((group) => group.items.length > 0);

  const groupLabel = (id: string) => {
    if (id === 'cisco') return 'Cisco';
    if (id === 'linux') return 'Linux Foundation';
    if (id === 'cloud') return locale === 'fr' ? 'Cloud' : 'Cloud';
    return t.certs.group;
  };

  return (
    <div className="scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header>
          <h3 className="text-lg font-semibold tracking-tight text-ink">{t.certs.title}</h3>
          <p className="mt-0.5 text-xs text-muted">{t.certs.subtitle}</p>
        </header>

        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`cert-group-${group.id}`}>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon name={group.icon} size={15} />
              </span>
              <h4 id={`cert-group-${group.id}`} className="text-sm font-semibold text-ink">
                {groupLabel(group.id)}
              </h4>
              <span className="text-xs text-muted">({group.items.length})</span>
            </div>
            <ul className="flex flex-col gap-2">
              {group.items.map((cert) => (
                <li
                  key={cert.id}
                  className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-3 py-2.5"
                >
                  <Icon
                    name="check-circle"
                    size={16}
                    className="shrink-0 text-[var(--success)]"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-ink">{cert.name}</p>
                    <p className="text-[11px] text-muted">{t.certs.earned}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="text-[11px] leading-relaxed text-muted">{t.certs.note}</p>
      </div>
    </div>
  );
}
