import { Helmet } from 'react-helmet-async';
import { useI18n } from '../i18n/useI18n';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { resolveText } from '../types';

export function SEO() {
  const { locale } = useI18n();
  const title = 'Takwa Laffet | Cybersecurity Engineer | Full-Stack Developer | DevSecOps | Tunisia';
  const description = locale === 'fr'
    ? 'Ingénieure en Cybersécurité & Full-Stack Developer en Tunisie. Conception de solutions numériques sécurisées, évolutives et intelligentes (Cloud, DevSecOps, IA, SOC).'
    : 'Cybersecurity Engineer & Full-Stack Developer in Tunisia. Building secure, scalable digital solutions across software engineering, cloud, cybersecurity, AI and DevSecOps.';
  const url = profile.portfolioUrl;
  const image = `${url}og-cover.svg`;

  return (
    <Helmet>
      <html lang={locale} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Takwa Laffet — Portfolio" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:locale:alternate" content={locale === 'fr' ? 'en_US' : 'fr_FR'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="fr" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Takwa Laffet',
          jobTitle: ['Cybersecurity Engineer', 'Full-Stack Developer', 'DevSecOps Engineer'],
          url: url,
          email: 'mailto:takwa.laffet@esprit.tn',
          address: { '@type': 'PostalAddress', addressCountry: 'TN' },
          sameAs: [profile.linkedin, profile.github],
          knowsAbout: ['Cybersecurity', 'DevSecOps', 'Full-Stack Development', 'React', 'TypeScript', 'Spring Boot', 'Kubernetes', 'Wazuh', 'TheHive', 'MISP'],
          worksFor: { '@type': 'Organization', name: 'Available for opportunities' },
          alumniOf: [
            { '@type': 'CollegeOrUniversity', name: 'ESPRIT — École Supérieure Privée d\'Ingénierie et de Technologies' },
            { '@type': 'CollegeOrUniversity', name: 'ISET Kébili' }
          ]
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Featured Projects',
          itemListElement: projects.filter(p => p.featured && p.published !== false).slice(0, 10).map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'SoftwareSourceCode',
              name: p.title,
              description: resolveText(p.description, locale),
              codeRepository: p.github || undefined,
              url: p.demo || undefined,
              programmingLanguage: p.technologies,
              author: { '@type': 'Person', name: 'Takwa Laffet' }
            }
          }))
        })}
      </script>
    </Helmet>
  );
}
