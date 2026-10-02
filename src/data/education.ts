import type { EducationEntry } from '../types';

/**
 * Note: the 2020–2023 diploma is a Tunisian "Licence en Technologie de l’Informatique",
 * a bac+3 degree equivalent to a bachelor's. The FR locale keeps the official
 * diploma name; the EN locale renders the English translation.
 */
export const education: EducationEntry[] = [
  {
    id: 'esprit-cybersecurity',
    degree: { en: 'Engineering Degree in Cybersecurity', fr: 'Diplôme d’ingénieur en Cybersécurité' },
    school: 'ESPRIT',
    period: '2023 – 2026',
    note: { en: 'Graduated in 2026', fr: 'Diplômé en 2026' },
  },
  {
    id: 'iset-kebili',
    degree: {
      en: 'Bachelor’s Degree in Information Technology — Information Systems Development',
      fr: 'Licence en Technologie de l’Informatique — Développement des Systèmes d’Information',
    },
    school: 'ISET Kébili',
    period: '2020 – 2023',
  },
];