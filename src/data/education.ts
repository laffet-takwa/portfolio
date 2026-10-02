import type { EducationEntry } from '../types';

/**
 * Academic background, most recent first.
 *
 * The 2020–2023 diploma is a Tunisian "Licence en Technologie de l'Informatique",
 * a bac+3 degree equivalent to a bachelor's. The FR locale keeps the official
 * diploma name; the EN locale renders the English translation.
 */
export const education: EducationEntry[] = [
  {
    id: 'esprit-cybersecurity',
    degree: {
      en: 'Engineering Degree in Cybersecurity',
      fr: 'Diplôme d’ingénieur en Cybersécurité',
    },
    school: 'ESPRIT',
    schoolDetail: {
      en: 'École Supérieure Privée d’Ingénierie et de Technologies',
      fr: 'École Supérieure Privée d’Ingénierie et de Technologies',
    },
    period: '2023 – 2026',
    note: { en: 'Graduated in September 2026', fr: 'Diplômé en septembre 2026' },
  },
  {
    id: 'iset-kebili',
    degree: {
      en: 'Bachelor’s Degree in Information Technology — Information Systems Development',
      fr: 'Licence en Technologie de l’Informatique — Développement des Systèmes d’Information',
    },
    degreeAlt: {
      en: 'Licence en Technologie de l’Informatique — Développement des Systèmes d’Information',
      fr: 'Bac+3 — Développement des Systèmes d’Information',
    },
    school: 'ISET Kébili',
    schoolDetail: {
      en: 'Institut Supérieur des Études Technologiques de Kébili',
      fr: 'Institut Supérieur des Études Technologiques de Kébili',
    },
    period: '2020 – 2023',
  },
];