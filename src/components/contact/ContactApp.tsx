import { useState, type FormEvent } from 'react';
import { profile } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { resolveText, type IconName } from '../../types';
import { assetUrl } from '../../lib/assets';
import { hasContactEndpoint, isValidPhone, sendContactSubmission } from '../../lib/contact';
import { Icon } from '../ui/Icon';
import { Button, Tag } from '../ui/Primitives';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'failed';

export function ContactApp() {
  const { t, locale } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', company: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const directDelivery = hasContactEndpoint();

const opportunities: Array<{ icon: IconName; label: string }> = [
    { icon: 'shield', label: t.contact.opportunities.cybersecurity },
    { icon: 'code', label: t.contact.opportunities.fullStack },
    { icon: 'cloud', label: t.contact.opportunities.devops },
    { icon: 'cpu', label: t.contact.opportunities.ai },
  ];

  const channels: Array<{
    icon: IconName;
    label: string;
    value: string;
    href: string;
    external: boolean;
  }> = [
    {
      icon: 'mail',
      label: t.common.email,
      value: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
    },
    {
      icon: 'briefcase',
      label: t.contact.linkedin,
      value: `linkedin.com/in/${profile.handles.linkedin}`,
      href: profile.linkedin,
      external: true,
    },
    {
      icon: 'git-branch',
      label: t.contact.github,
      value: `github.com/${profile.handles.github}`,
      href: profile.github,
      external: true,
    },
    {
      icon: 'globe',
      label: t.contact.portfolio,
      value: profile.portfolioUrl.replace(/^https?:\/\//, ''),
      href: profile.portfolioUrl,
      external: true,
    },
  ];

  const update = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = t.contact.required;
    if (!form.email.trim()) next.email = t.contact.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = t.contact.invalidEmail;
    if (!isValidPhone(form.phone)) next.phone = t.contact.invalidPhone;
    if (!form.message.trim()) next.message = t.contact.required;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = `${t.contact.formTitle} — ${form.name.trim()}`;
    const submission = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      company: form.company,
    };

    if (directDelivery) {
      setStatus('sending');
      const result = await sendContactSubmission(submission, subject);
      setStatus(result.ok ? 'sent' : 'failed');
      return;
    }

    const details = [submission.email, submission.phone].filter(Boolean).join('\n');
    const body = encodeURIComponent(
      `${submission.message}\n\n— ${submission.name}\n${details}`,
    );
    setStatus('sent');
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${body}`;
  };

  return (
    <div className="scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-7">
      <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-[1fr_1.05fr]">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          <header>
            <h3 className="text-lg font-semibold tracking-tight text-ink">
              {t.contact.windowTitle}
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-secondary">{t.contact.intro}</p>
          </header>

          <section className="rounded-xl border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-accent-soft p-4">
            <h4 className="text-sm font-semibold text-ink">{t.contact.calendarTitle}</h4>
            <a
              href={profile.calendly}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-[var(--accent-contrast)] shadow-sm transition-colors hover:bg-[var(--accent-hover)]"
            >
              <Icon name="clock" size={15} />
              {t.contact.calendarButton}
            </a>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">{t.contact.calendarNote}</p>
          </section>

          <section>
            <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
              {t.contact.opportunitiesLabel}
            </h4>
            <ul className="flex flex-wrap gap-1.5">
              {opportunities.map((item) => (
                <li key={item.label}>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-2.5 py-1.5 text-xs text-secondary">
                    <Icon name={item.icon} size={15} className="text-accent" />
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
              {t.contact.channelsLabel}
            </h4>
            <ul className="flex flex-col gap-2">
              {channels.map((channel) => (
<li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noreferrer noopener' : undefined}
                    className="group flex items-center gap-3 rounded-lg border border-[var(--border)] px-3 py-2.5 transition-colors hover:border-accent/60 hover:bg-accent-soft"
                  >
                    <Icon name={channel.icon} size={16} className="text-accent" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] text-muted">{channel.label}</span>
                      <span className="block truncate text-[13px] text-ink">{channel.value}</span>
                    </span>
<Icon
                      name="external-link"
                      size={14}
                      className="text-muted transition-colors group-hover:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>

<div className="flex flex-wrap gap-1.5">
            <Tag tone="accent"><Icon name="check-circle" size={12} /> {resolveText(profile.availability, locale)}</Tag>
            <Tag><Icon name="map-pin" size={12} /> {resolveText(profile.location, locale)}</Tag>
          </div>

          <Button
            variant="primary"
            icon={<Icon name="download" size={15} />}
            onClick={() => {
              const resume =
                profile.resumes.find((item) => item.locale === locale) ?? profile.resumes[0];
              const link = document.createElement('a');
              link.href = assetUrl(resume.file);
              link.download = resume.fileName;
              document.body.appendChild(link);
              link.click();
              link.remove();
            }}
          >
            {t.contact.downloadCv}
          </Button>
        </div>

        {/* Form */}
        <section className="card-surface p-4 sm:p-5">
<h4 className="text-sm font-semibold text-ink">{t.contact.formTitle}</h4>
          <p className="mt-1 text-[11px] leading-relaxed text-muted">
            {directDelivery ? t.contact.formIntroDirect : t.contact.formIntro}
          </p>

          <form onSubmit={onSubmit} noValidate className="mt-4 flex flex-col gap-3.5">
            <div>
              <label htmlFor="contact-name" className="mb-1 block text-xs font-medium text-secondary">
                {t.contact.name}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={update('name')}
                aria-invalid={Boolean(errors.name)}
                className={`w-full rounded-lg border bg-[var(--hover-surface)] px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none ${
                  errors.name ? 'border-[var(--danger)]' : 'border-[var(--border)] focus:border-accent'
                }`}
              />
              {errors.name ? (
                <p role="alert" className="mt-1 text-[11px] text-[var(--danger)]">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1 block text-xs font-medium text-secondary">
                {t.contact.email}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={update('email')}
                aria-invalid={Boolean(errors.email)}
                className={`w-full rounded-lg border bg-[var(--hover-surface)] px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none ${
                  errors.email ? 'border-[var(--danger)]' : 'border-[var(--border)] focus:border-accent'
                }`}
              />
              {errors.email ? (
                <p role="alert" className="mt-1 text-[11px] text-[var(--danger)]">
                  {errors.email}
                </p>
              ) : null}
            </div>

<div>
              <label htmlFor="contact-phone" className="mb-1 block text-xs font-medium text-secondary">
                {t.contact.phone}
                <span className="ml-1.5 font-normal text-muted">({t.contact.optional})</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+216 20 000 000"
                value={form.phone}
                onChange={update('phone')}
                aria-invalid={Boolean(errors.phone)}
                className={`w-full rounded-lg border bg-[var(--hover-surface)] px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none ${
                  errors.phone ? 'border-[var(--danger)]' : 'border-[var(--border)] focus:border-accent'
                }`}
              />
              {errors.phone ? (
                <p role="alert" className="mt-1 text-[11px] text-[var(--danger)]">
                  {errors.phone}
                </p>
              ) : null}
            </div>

            {/* Honeypot: hidden from people, filled in by bots. */}
            <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={update('company')}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1 block text-xs font-medium text-secondary">
                {t.contact.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={update('message')}
                aria-invalid={Boolean(errors.message)}
                className={`w-full resize-y rounded-lg border bg-[var(--hover-surface)] px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none ${
                  errors.message ? 'border-[var(--danger)]' : 'border-[var(--border)] focus:border-accent'
                }`}
              />
              {errors.message ? (
                <p role="alert" className="mt-1 text-[11px] text-[var(--danger)]">
                  {errors.message}
                </p>
              ) : null}
            </div>

<Button
              type="submit"
              variant="primary"
              icon={<Icon name="send" size={15} />}
              fullWidth
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
            >
              {status === 'sending'
                ? directDelivery
                  ? t.contact.sendingDirect
                  : t.contact.sending
                : t.contact.send}
            </Button>

            <p
              aria-live="polite"
              className={`min-h-[1rem] text-center text-[11px] ${
                status === 'failed' ? 'text-[var(--danger)]' : 'text-[var(--success)]'
              }`}
            >
              {status === 'sent'
                ? directDelivery
                  ? t.contact.formSent
                  : t.contact.formOpened
                : null}
              {status === 'failed' ? `${t.contact.sendError} ${profile.email}.` : null}
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}