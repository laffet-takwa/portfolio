import type { SkillGroup } from '../types';

/**
 * Skills are listed as technologies only — no invented proficiency levels,
 * scores or years of practice. Groups and labels are translated, the
 * technology names are not.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: { en: 'Frontend', fr: 'Frontend' },
    icon: 'palette',
    items: ['React', 'TypeScript', 'JavaScript', 'Vue.js', 'Vite', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    label: { en: 'Backend', fr: 'Backend' },
    icon: 'server',
    items: [
      'Java',
      'Spring Boot',
      'Node.js',
      'Express',
      'NestJS',
      'Python',
      'Flask',
      'FastAPI',
      'REST APIs',
    ],
  },
  {
    id: 'databases',
    label: { en: 'Databases', fr: 'Bases de données' },
    icon: 'database',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase'],
  },
  {
    id: 'devops',
    label: { en: 'DevOps / Cloud', fr: 'DevOps / Cloud' },
    icon: 'cloud',
    items: ['Docker', 'Kubernetes', 'Helm', 'Git', 'Linux', 'CI/CD', 'AWS'],
  },
  {
    id: 'cybersecurity',
    label: { en: 'Cybersecurity', fr: 'Cybersécurité' },
    icon: 'shield',
    items: [
      'Wazuh',
      'Suricata',
      'TheHive',
      'Cortex',
      'MISP',
      'MITRE ATT&CK',
      'Threat Intelligence',
      'SOC',
      'Security Monitoring',
    ],
  },
];