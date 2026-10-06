import { profile } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { resolveText } from '../../types';
import { Icon } from '../ui/Icon';
import { Tag } from '../ui/Primitives';

export function BookingApp() {
  const { t, locale } = useI18n();
  const agenda = profile.booking.agenda[locale] ?? profile.booking.agenda.en;
  const prepare = profile.booking.prepare[locale] ?? profile.booking.prepare.en;
  const description = resolveText(profile.booking.description, locale);

  return (
    <div className="scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-7">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 lg:flex-row">
        <aside className="w-full lg:w-80 xl:w-96 shrink-0">
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {t.booking.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-secondary">{description}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <Tag tone="accent">
                <Icon name="clock" size={12} /> {profile.booking.duration}
              </Tag>
              <Tag>
                <Icon name="info" size={12} /> {profile.booking.type}
              </Tag>
            </div>

            <section className="rounded-xl border border-[var(--border)] bg-[var(--hover-surface)] p-4">
              <h4 className="text-sm font-semibold text-ink">{t.booking.agendaTitle}</h4>
              <ul className="mt-2.5 flex flex-col gap-2">
                {agenda.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-secondary">
                    <Icon name="arrow-right" size={14} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-[var(--border)] bg-[var(--hover-surface)] p-4">
              <h4 className="text-sm font-semibold text-ink">{t.booking.prepareTitle}</h4>
              <ul className="mt-2.5 flex flex-col gap-2">
                {prepare.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-secondary">
                    <Icon name="check" size={14} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-[var(--border)] bg-[var(--hover-surface)] p-4">
              <h4 className="text-sm font-semibold text-ink">{t.booking.whoLabel}</h4>
              <p className="mt-2 text-[13px] leading-relaxed text-secondary">
                {resolveText(profile.tagline, locale)}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Tag tone="accent">
                  <Icon name="check-circle" size={12} /> {resolveText(profile.availability, locale)}
                </Tag>
                <Tag>
                  <Icon name="map-pin" size={12} /> {resolveText(profile.location, locale)}
                </Tag>
              </div>
            </section>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="h-[630px] w-full rounded-xl border border-[var(--border)] bg-[var(--window-content)] overflow-hidden">
            <iframe
              src={profile.calendly}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule a meeting with Takwa Laffet"
              allow="camera; microphone"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
