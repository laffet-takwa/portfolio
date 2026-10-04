/**
 * Contact form delivery.
 *
 * The form has two paths, chosen at build time:
 *
 *   VITE_CONTACT_ENDPOINT    POST target — a Formspree form URL, a Web3Forms
 *                            access-key URL, Getform, Basin, or any endpoint
 *                            that accepts a JSON body.
 *   VITE_CONTACT_ACCESS_KEY  Optional key sent as `access_key` (Web3Forms).
 *
 * With no endpoint configured the form keeps its original behaviour and hands
 * the message to the visitor's mail client, so a fork or a preview build still
 * works without any configuration.
 *
 * Vite inlines `VITE_*` variables at build time: on GitHub Pages they must be
 * present in the build environment (repository secrets exposed to the Actions
 * workflow), not in a committed file.
 */

export interface ContactSubmission {
  name: string;
  email: string;
  /** Optional — the visitor's phone number. */
  phone: string;
  message: string;
  /** Hidden field meant to stay empty. Bots fill it, so their POST is dropped. */
  company?: string;
}

export type ContactDelivery = 'service' | 'mail-client';

export interface ContactResult {
  ok: boolean;
  delivery: ContactDelivery;
}

/** Configured POST target, or an empty string when delivery is not set up. */
export function contactEndpoint(): string {
  return (import.meta.env.VITE_CONTACT_ENDPOINT ?? '').trim();
}

/** True when a mailing service is configured and the form should POST to it. */
export function hasContactEndpoint(): boolean {
  return contactEndpoint().length > 0;
}

/**
 * Accepts the shapes people actually type — `+216 20 123 456`,
 * `00216 20 123 456`, `06 12 34 56 78` — by counting digits rather than
 * matching a strict pattern. Optional field: an empty value is always valid.
 */
export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (!/^[\d\s+()-]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 6 && digits.length <= 15;
}

/**
 * Posts the submission to the configured endpoint.
 *
 * A filled honeypot resolves as a success without any network call, so the
 * sender sees the same confirmation a person would get.
 */
export async function sendContactSubmission(
  submission: ContactSubmission,
  subject: string,
): Promise<ContactResult> {
  const endpoint = contactEndpoint();
  if (!endpoint) return { ok: false, delivery: 'mail-client' };
  if (submission.company?.trim()) return { ok: true, delivery: 'service' };

  const accessKey = (import.meta.env.VITE_CONTACT_ACCESS_KEY ?? '').trim();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...(accessKey ? { access_key: accessKey } : {}),
        subject,
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        message: submission.message,
        // Formspree and Web3Forms both use `replyto` to set the reply address.
        replyto: submission.email,
      }),
    });

    return { ok: response.ok, delivery: 'service' };
  } catch {
    return { ok: false, delivery: 'service' };
  }
}