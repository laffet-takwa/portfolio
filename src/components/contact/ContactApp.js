import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { profile } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { resolveText } from '../../types';
import { assetUrl } from '../../lib/assets';
import { Icon } from '../ui/Icon';
import { Button, Tag } from '../ui/Primitives';
export function ContactApp() {
    const { t, locale } = useI18n();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);
    const opportunities = [
        { icon: 'shield', label: t.contact.opportunities.cybersecurity },
        { icon: 'code', label: t.contact.opportunities.fullStack },
        { icon: 'cloud', label: t.contact.opportunities.devops },
        { icon: 'cpu', label: t.contact.opportunities.ai },
    ];
    const channels = [
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
    const update = (field) => (event) => {
        setForm((current) => ({ ...current, [field]: event.target.value }));
        setErrors((current) => ({ ...current, [field]: undefined }));
    };
    const onSubmit = (event) => {
        event.preventDefault();
        const next = {};
        if (!form.name.trim())
            next.name = t.contact.required;
        if (!form.email.trim())
            next.email = t.contact.required;
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
            next.email = t.contact.invalidEmail;
        if (!form.message.trim())
            next.message = t.contact.required;
        setErrors(next);
        if (Object.keys(next).length > 0)
            return;
        const subject = encodeURIComponent(`${t.contact.formTitle} — ${form.name.trim()}`);
        const body = encodeURIComponent(`${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`);
        setSent(true);
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    };
    return (_jsx("div", { className: "scroll-thin h-full overflow-y-auto px-4 py-5 sm:px-6 sm:py-7", children: _jsxs("div", { className: "mx-auto grid max-w-3xl gap-6 lg:grid-cols-[1fr_1.05fr]", children: [_jsxs("div", { className: "flex flex-col gap-5", children: [_jsxs("header", { children: [_jsx("h3", { className: "text-lg font-semibold tracking-tight text-ink", children: t.contact.windowTitle }), _jsx("p", { className: "mt-1.5 text-[13px] leading-relaxed text-secondary", children: t.contact.intro })] }), _jsxs("section", { children: [_jsx("h4", { className: "mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted", children: t.contact.opportunitiesLabel }), _jsx("ul", { className: "flex flex-wrap gap-1.5", children: opportunities.map((item) => (_jsx("li", { children: _jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--hover-surface)] px-2.5 py-1.5 text-xs text-secondary", children: [_jsx(Icon, { name: item.icon, size: 15, className: "text-accent" }), item.label] }) }, item.label))) })] }), _jsxs("section", { children: [_jsx("h4", { className: "mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted", children: t.contact.channelsLabel }), _jsx("ul", { className: "flex flex-col gap-2", children: channels.map((channel) => (_jsx("li", { children: _jsxs("a", { href: channel.href, target: channel.external ? '_blank' : undefined, rel: channel.external ? 'noreferrer noopener' : undefined, className: "group flex items-center gap-3 rounded-lg border border-[var(--border)] px-3 py-2.5 transition-colors hover:border-accent/60 hover:bg-accent-soft", children: [_jsx(Icon, { name: channel.icon, size: 16, className: "text-accent" }), _jsxs("span", { className: "min-w-0 flex-1", children: [_jsx("span", { className: "block text-[11px] text-muted", children: channel.label }), _jsx("span", { className: "block truncate text-[13px] text-ink", children: channel.value })] }), _jsx(Icon, { name: "external-link", size: 14, className: "text-muted transition-colors group-hover:text-accent" })] }) }, channel.label))) })] }), _jsxs("div", { className: "flex flex-wrap gap-1.5", children: [_jsxs(Tag, { tone: "accent", children: [_jsx(Icon, { name: "check-circle", size: 12 }), " ", resolveText(profile.availability, locale)] }), _jsxs(Tag, { children: [_jsx(Icon, { name: "map-pin", size: 12 }), " ", resolveText(profile.location, locale)] })] }), _jsx(Button, { variant: "primary", icon: _jsx(Icon, { name: "download", size: 15 }), onClick: () => {
                                const resume = profile.resumes.find((item) => item.locale === locale) ?? profile.resumes[0];
                                const link = document.createElement('a');
                                link.href = assetUrl(resume.file);
                                link.download = resume.fileName;
                                document.body.appendChild(link);
                                link.click();
                                link.remove();
                            }, children: t.contact.downloadCv })] }), _jsxs("section", { className: "card-surface p-4 sm:p-5", children: [_jsx("h4", { className: "text-sm font-semibold text-ink", children: t.contact.formTitle }), _jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-muted", children: t.contact.formIntro }), _jsxs("form", { onSubmit: onSubmit, noValidate: true, className: "mt-4 flex flex-col gap-3.5", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "contact-name", className: "mb-1 block text-xs font-medium text-secondary", children: t.contact.name }), _jsx("input", { id: "contact-name", name: "name", type: "text", autoComplete: "name", value: form.name, onChange: update('name'), "aria-invalid": Boolean(errors.name), className: `w-full rounded-lg border bg-[var(--hover-surface)] px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none ${errors.name ? 'border-[var(--danger)]' : 'border-[var(--border)] focus:border-accent'}` }), errors.name ? (_jsx("p", { role: "alert", className: "mt-1 text-[11px] text-[var(--danger)]", children: errors.name })) : null] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "contact-email", className: "mb-1 block text-xs font-medium text-secondary", children: t.contact.email }), _jsx("input", { id: "contact-email", name: "email", type: "email", autoComplete: "email", value: form.email, onChange: update('email'), "aria-invalid": Boolean(errors.email), className: `w-full rounded-lg border bg-[var(--hover-surface)] px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none ${errors.email ? 'border-[var(--danger)]' : 'border-[var(--border)] focus:border-accent'}` }), errors.email ? (_jsx("p", { role: "alert", className: "mt-1 text-[11px] text-[var(--danger)]", children: errors.email })) : null] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "contact-message", className: "mb-1 block text-xs font-medium text-secondary", children: t.contact.message }), _jsx("textarea", { id: "contact-message", name: "message", rows: 5, value: form.message, onChange: update('message'), "aria-invalid": Boolean(errors.message), className: `w-full resize-y rounded-lg border bg-[var(--hover-surface)] px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none ${errors.message ? 'border-[var(--danger)]' : 'border-[var(--border)] focus:border-accent'}` }), errors.message ? (_jsx("p", { role: "alert", className: "mt-1 text-[11px] text-[var(--danger)]", children: errors.message })) : null] }), _jsx(Button, { type: "submit", variant: "primary", icon: _jsx(Icon, { name: "send", size: 15 }), fullWidth: true, children: t.contact.send }), _jsx("p", { "aria-live": "polite", className: "min-h-[1rem] text-center text-[11px] text-[var(--success)]", children: sent ? t.contact.formOpened : '' })] })] })] }) }));
}
