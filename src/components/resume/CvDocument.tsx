import type { Locale } from '../../types';
import { cvDocuments } from '../../data/resume';

/**
 * The CV rendered as a document inside the Resume window.
 * Mirrors the print stylesheet in `cvPrint.ts` so what is on screen matches
 * what the browser produces as PDF.
 */
export function CvDocument({ locale }: { locale: Locale }) {
  const cv = cvDocuments[locale === 'fr' ? 'fr' : 'en'];

  return (
    <article className="mx-auto max-w-[210mm] bg-white px-6 py-7 text-[#14171f] shadow-[var(--shadow-soft)] sm:px-9 sm:py-9">
      <header className="text-center">
        <h2 className="text-[22px] font-bold uppercase tracking-[0.1em] text-[#14171f]">
          {cv.name}
        </h2>
        <p className="mt-1 text-[13px] font-semibold text-[#14171f]">{cv.title}</p>
        <p className="mt-1 text-[12px] text-[#4b5563]">{cv.contactLine}</p>
        <p className="mt-1.5 flex flex-wrap justify-center gap-x-2 text-[11px]">
          {cv.links.map((link, index) => (
            <span key={link.url} className="flex items-center gap-2">
              {index > 0 ? <span className="text-[#9ca3af]">|</span> : null}
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#1a4fd6] hover:underline"
              >
                {link.label}: {link.display}
              </a>
            </span>
          ))}
        </p>
      </header>

      {cv.sections.map((section) => (
        <section key={section.id} className="mt-4">
          <h3 className="border-b border-[#14171f] pb-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#14171f]">
            {section.heading}
          </h3>

          {section.intro || section.line ? (
            <p className="mt-1.5 text-justify text-[12px] leading-[1.45] text-[#14171f]">
              {section.intro ?? section.line}
            </p>
          ) : (
            <div className="mt-1.5 flex flex-col gap-2">
              {section.entries?.map((entry) => (
                <div key={entry.title} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <strong className="text-[12.5px] font-semibold text-[#14171f]">
                      {entry.title}
                    </strong>
                    {entry.period ? (
                      <span className="font-mono text-[10.5px] text-[#4b5563]">
                        {entry.period}
                      </span>
                    ) : null}
                  </div>
                  {entry.subtitle ? (
                    <p className="mt-0.5 text-[11.5px] italic text-[#4b5563]">
                      {entry.subtitle}
                    </p>
                  ) : null}
                  {entry.body ? (
                    <p className="mt-0.5 text-[11.5px] italic text-[#4b5563]">{entry.body}</p>
                  ) : null}
                  {entry.bullets?.length ? (
                    <ul className="mt-1 flex list-disc flex-col gap-0.5 pl-4 text-[11.5px] leading-[1.4] text-[#14171f]">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </article>
  );
}