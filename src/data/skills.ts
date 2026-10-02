import type { SkillGroup } from '../types';

/**
 * Skills are listed as technologies and concepts only — no invented proficiency
 * levels, scores or years of practice. Group labels are translated, the
 * technology names are not.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'cybersecurity',
    label: { en: 'Cybersecurity', fr: 'Cybersécurité' },
    icon: 'shield',
    items: [
      'SOC',
      'SIEM',
      'Wazuh',
      'Suricata',
      'TheHive',
      'Cortex',
      'MISP',
      'Threat Intelligence',
      'MITRE ATT&CK',
      'Incident Analysis',
      'Vulnerability Analysis',
      'Security Monitoring',
      'Security Automation',
    ],
  },
  {
    id: 'programming',
    label: { en: 'Programming', fr: 'Programmation' },
    icon: 'code',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    id: 'frontend',
    label: { en: 'Frontend', fr: 'Frontend' },
    icon: 'palette',
    items: ['React', 'Vue.js', 'Nuxt', 'Vite', 'Tailwind CSS', 'Bootstrap', 'Vuetify'],
  },
  {
    id: 'backend',
    label: { en: 'Backend', fr: 'Backend' },
    icon: 'server',
    items: ['Flask', 'FastAPI', 'Node.js', 'Express', 'NestJS', 'Spring Boot', 'REST APIs'],
  },
  {
    id: 'databases',
    label: { en: 'Databases', fr: 'Bases de données' },
    icon: 'database',
    items: ['PostgreSQL', 'MySQL', 'Supabase', 'Prisma', 'Drizzle'],
  },
  {
    id: 'devops',
    label: { en: 'DevOps / Cloud', fr: 'DevOps / Cloud' },
    icon: 'cloud',
    items: [
      'Linux',
      'Docker',
      'Kubernetes',
      'Helm',
      'Git',
      'GitHub Actions',
      'GitLab CI',
      'Jenkins',
      'Nginx',
      'AWS',
    ],
  },
  {
    id: 'ai',
    label: { en: 'AI / Machine Learning', fr: 'IA / Machine Learning' },
    icon: 'cpu',
    items: [
      'Python',
      'XGBoost',
      'Machine Learning',
      'Classification',
      'AI-assisted Security Analysis',
      'LLM API Integration',
    ],
  },
];