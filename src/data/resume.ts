/**
 * CV content, used to render the Resume window and to build the printable
 * document. Kept in sync with `public/resume/Takwa_Laffet_CV_EN.tex` and
 * `Takwa_Laffet_CV_FR.tex`, which stay the canonical sources for the PDF.
 */

export interface CvEntry {
  title: string;
  period?: string;
  subtitle?: string;
  bullets?: string[];
  body?: string;
}

export interface CvSection {
  id: 'profile' | 'education' | 'experience' | 'skills' | 'projects' | 'certifications' | 'languages';
  heading: string;
  /** Free paragraph, used by the profile section. */
  intro?: string;
  entries?: CvEntry[];
  /** Inline pipe-separated line, used by certifications and languages. */
  line?: string;
}

export interface CvDocument {
  name: string;
  title: string;
  contactLine: string;
  links: Array<{ label: string; display: string; url: string }>;
  sections: CvSection[];
}

const LINKS = {
  linkedin: {
    label: 'LinkedIn',
    display: 'linkedin.com/in/takwa-laffet-883239211',
    url: 'https://www.linkedin.com/in/takwa-laffet-883239211/',
  },
  github: {
    label: 'GitHub',
    display: 'github.com/takwa-laffet',
    url: 'https://github.com/takwa-laffet',
  },
  portfolio: {
    label: 'Portfolio',
    display: 'laffet-takwa.github.io/portfolio',
    url: 'https://laffet-takwa.github.io/portfolio/',
  },
};

export const cvDocuments: Record<'en' | 'fr', CvDocument> = {
  en: {
    name: 'TAKWA LAFFET',
    title: 'Cybersecurity Engineer | Full-Stack Developer | DevSecOps',
    contactLine: 'Tunisia | +216 93 250 946 | takwa.laffet@esprit.tn',
    links: [LINKS.linkedin, LINKS.github, LINKS.portfolio],
    sections: [
      {
        id: 'profile',
        heading: 'Professional Profile',
        intro:
          'Recently graduated Cybersecurity Engineer with hands-on experience in Full-Stack development, application security, API integration and automation. Proficient with React, TypeScript, JavaScript, Python, Node.js, NestJS, Flask, PostgreSQL, Docker and Linux. Available immediately for a Full-Stack Developer, DevSecOps Engineer or Junior Software Engineer role.',
      },
      {
        id: 'education',
        heading: 'Education',
        entries: [
          {
            title: 'ESPRIT — École Supérieure Privée d’Ingénierie et de Technologies',
            period: '2023 – 2026',
            subtitle: 'Engineering Degree in Cybersecurity — Very Good / Excellent Distinction',
          },
          {
            title: 'ISET Kébili',
            period: '2020 – 2023',
            subtitle:
              'Bachelor’s Degree in Information Technology — Information Systems Development',
          },
        ],
      },
      {
        id: 'experience',
        heading: 'Professional Experience',
        entries: [
          {
            title:
              'CYBEXPSU — Cybersecurity Center of Excellence, Prince Sultan University, Saudi Arabia',
            period: '01/2026 – 06/2026',
            subtitle: 'Cybersecurity / Full-Stack Engineering Intern — Remote',
            bullets: [
              'Developed a cybersecurity platform with React, Vite, Flask and REST APIs; built SOC alert analysis dashboards.',
              'Integrated Wazuh, TheHive, Cortex, MISP and threat intelligence.',
              'Linux environment, Docker, Git and Agile/Scrum.',
            ],
          },
          {
            title: 'Digital Research & Technologies — Ariana, Tunisia',
            period: '07/2025 – 09/2025',
            subtitle: 'Frontend / Full-Stack Developer Intern',
            bullets: [
              'Developed a content identification and analysis application with React, TypeScript, Vite and Tailwind CSS.',
              'API integration and development of reusable frontend components.',
            ],
          },
          {
            title: 'Digital Research & Technologies — Ariana, Tunisia',
            period: '07/2024 – 09/2024',
            subtitle: 'Full-Stack Developer Intern',
            bullets: [
              'Developed a donation, event and user management application with NestJS, Prisma, PostgreSQL, Nuxt.js, Vue.js and Vuetify.',
              'Designed REST APIs and CRUD functionality.',
            ],
          },
          {
            title: 'IT KONCEPT — Tunisia',
            period: '01/2023 – 06/2023',
            subtitle: 'Software Developer Intern — End of Studies Project',
            bullets: [
              'Developed an invoice automation solution with Odoo 14, Python, PostgreSQL and Mindee OCR.',
              'Developed Odoo modules using XML, with UML design and Scrum.',
            ],
          },
          {
            title: 'AURES — Tunisia',
            period: '01/2022',
            subtitle: 'Web Developer Intern',
            bullets: [
              'Developed a time-tracking application with React, Bootstrap and Supabase; CRUD functionality.',
            ],
          },
          {
            title: 'Tunisie Télécom — Tunisia',
            period: '2020 – 2021',
            subtitle: 'Network and Infrastructure Intern',
            bullets: [
              'Network maintenance and troubleshooting: TCP/IP, VLAN and network configuration.',
            ],
          },
        ],
      },
      {
        id: 'skills',
        heading: 'Technical Skills',
        entries: [
          {
            title: 'Development',
            body: 'Python, JavaScript, TypeScript, SQL, HTML5, CSS3, React.js, Vue.js, Nuxt.js, Vite, Tailwind CSS, Bootstrap, Node.js, Express.js, NestJS, Flask, FastAPI, REST API',
          },
          {
            title: 'Databases',
            body: 'PostgreSQL, MySQL, Supabase, Prisma',
          },
          {
            title: 'DevOps / DevSecOps',
            body: 'Git, GitHub, Docker, Linux, CI/CD, containerization, automation, Secure Software Development, API Security',
          },
          {
            title: 'Cybersecurity',
            body: 'Wazuh, Suricata, TheHive, Cortex, MISP, n8n, SIEM, Threat Intelligence, Network Security, Application Security, MITRE ATT&CK, AWS Cloud Security',
          },
        ],
      },
      {
        id: 'projects',
        heading: 'Projects',
        entries: [
          {
            title: 'Full-Stack Donation & Event Management Platform',
            period: '2024',
            body: 'Nuxt.js, Vue.js, Vuetify, NestJS, Prisma, PostgreSQL. User, donation and event management, REST APIs, CRUD and frontend–backend integration.',
          },
          {
            title: 'Content Identification & Analysis Web Application',
            period: '2025',
            body: 'React, TypeScript, Vite, Tailwind CSS and REST APIs. Digital content identification and analysis, results management and reusable components.',
          },
          {
            title: 'Full-Stack E-Commerce Platform',
            period: '2022 – 2023',
            body: 'Development of an e-commerce platform covering product, user and order management. Responsive web interfaces, frontend–backend integration, data management and CRUD functionality.',
          },
        ],
      },
      {
        id: 'certifications',
        heading: 'Certifications',
        line: 'Cisco Junior Cybersecurity Analyst | Cisco Ethical Hacker | Cisco Network Defense | AWS Academy Cloud Security Foundations | Linux Foundation LFD121',
      },
      {
        id: 'languages',
        heading: 'Languages',
        line: 'Arabic: native language   ·   French: B2   ·   English: B2',
      },
    ],
  },

  fr: {
    name: 'TAKWA LAFFET',
    title: 'Ingénieure en Cybersécurité | Full-Stack Developer | DevSecOps',
    contactLine: 'Tunisie | +216 93 250 946 | takwa.laffet@esprit.tn',
    links: [LINKS.linkedin, LINKS.github, LINKS.portfolio],
    sections: [
      {
        id: 'profile',
        heading: 'Profil professionnel',
        intro:
          'Ingénieure en cybersécurité récemment diplômée, avec une expérience pratique en développement Full-Stack, sécurité applicative, intégration d’API et automatisation. Maîtrise de React, TypeScript, JavaScript, Python, Node.js, NestJS, Flask, PostgreSQL, Docker et Linux. Disponible immédiatement pour un poste de Full-Stack Developer, DevSecOps Engineer ou Software Engineer Junior.',
      },
      {
        id: 'education',
        heading: 'Formation',
        entries: [
          {
            title: 'ESPRIT — École Supérieure Privée d’Ingénierie et de Technologies',
            period: '2023 – 2026',
            subtitle: 'Diplôme d’Ingénieur en Cybersécurité — Mention Très Bien / Excellent',
          },
          {
            title: 'ISET Kébili',
            period: '2020 – 2023',
            subtitle:
              'Licence en Technologie de l’Informatique — Développement des Systèmes d’Information',
          },
        ],
      },
      {
        id: 'experience',
        heading: 'Expériences professionnelles',
        entries: [
          {
            title:
              'CYBEXPSU — Cybersecurity Center of Excellence, Prince Sultan University, Arabie Saoudite',
            period: '01/2026 – 06/2026',
            subtitle: 'Stagiaire Ingénieure Cybersécurité / Développeuse Full-Stack — Remote',
            bullets: [
              'Développement d’une plateforme de cybersécurité avec React, Vite, Flask et API REST ; création de dashboards d’analyse des alertes SOC.',
              'Intégration de Wazuh, TheHive, Cortex, MISP et Threat Intelligence.',
              'Environnement Linux, Docker, Git et Agile/Scrum.',
            ],
          },
          {
            title: 'Digital Research & Technologies — Ariana, Tunisie',
            period: '07/2025 – 09/2025',
            subtitle: 'Stagiaire Développeuse Frontend / Full-Stack',
            bullets: [
              'Développement d’une application d’identification et d’analyse de contenus avec React, TypeScript, Vite et Tailwind CSS.',
              'Intégration d’API et développement de composants frontend réutilisables.',
            ],
          },
          {
            title: 'Digital Research & Technologies — Ariana, Tunisie',
            period: '07/2024 – 09/2024',
            subtitle: 'Stagiaire Développeuse Full-Stack',
            bullets: [
              'Développement d’une application de gestion des dons, événements et utilisateurs avec NestJS, Prisma, PostgreSQL, Nuxt.js, Vue.js et Vuetify.',
              'Conception d’API REST et fonctionnalités CRUD.',
            ],
          },
          {
            title: 'IT KONCEPT — Tunisie',
            period: '01/2023 – 06/2023',
            subtitle: 'Stagiaire Développeuse Logiciel — Projet de Fin d’Études',
            bullets: [
              'Développement d’une solution d’automatisation des factures avec Odoo 14, Python, PostgreSQL et OCR Mindee.',
              'Développement de modules Odoo avec XML, UML et Scrum.',
            ],
          },
          {
            title: 'AURES — Tunisie',
            period: '01/2022',
            subtitle: 'Stagiaire Développeuse Web',
            bullets: [
              'Développement d’une application de suivi du temps avec React, Bootstrap et Supabase ; fonctionnalités CRUD.',
            ],
          },
          {
            title: 'Tunisie Télécom — Tunisie',
            period: '2020 – 2021',
            subtitle: 'Stagiaire Réseaux et Infrastructure',
            bullets: [
              'Maintenance et dépannage réseau : TCP/IP, VLAN et configuration réseau.',
            ],
          },
        ],
      },
      {
        id: 'skills',
        heading: 'Compétences techniques',
        entries: [
          {
            title: 'Développement',
            body: 'Python, JavaScript, TypeScript, SQL, HTML5, CSS3, React.js, Vue.js, Nuxt.js, Vite, Tailwind CSS, Bootstrap, Node.js, Express.js, NestJS, Flask, FastAPI, REST API',
          },
          {
            title: 'Bases de données',
            body: 'PostgreSQL, MySQL, Supabase, Prisma',
          },
          {
            title: 'DevOps / DevSecOps',
            body: 'Git, GitHub, Docker, Linux, CI/CD, conteneurisation, automatisation, Secure Software Development, API Security',
          },
          {
            title: 'Cybersécurité',
            body: 'Wazuh, Suricata, TheHive, Cortex, MISP, n8n, SIEM, Threat Intelligence, Network Security, Application Security, MITRE ATT&CK, AWS Cloud Security',
          },
        ],
      },
      {
        id: 'projects',
        heading: 'Projets',
        entries: [
          {
            title: 'Plateforme Full-Stack de Gestion des Dons et Événements',
            period: '2024',
            body: 'Nuxt.js, Vue.js, Vuetify, NestJS, Prisma, PostgreSQL. Gestion des utilisateurs, dons et événements, API REST, CRUD et intégration frontend–backend.',
          },
          {
            title: 'Application Web d’Identification et d’Analyse de Contenus',
            period: '2025',
            body: 'React, TypeScript, Vite, Tailwind CSS et API REST. Identification et analyse de contenus numériques, gestion des résultats et composants réutilisables.',
          },
          {
            title: 'Plateforme E-Commerce Full-Stack',
            period: '2022 – 2023',
            body: 'Développement d’une plateforme e-commerce permettant la gestion des produits, utilisateurs et commandes. Conception d’interfaces web responsives, intégration frontend–backend, gestion des données et fonctionnalités CRUD.',
          },
        ],
      },
      {
        id: 'certifications',
        heading: 'Certifications',
        line: 'Cisco Junior Cybersecurity Analyst | Cisco Ethical Hacker | Cisco Network Defense | AWS Academy Cloud Security Foundations | Linux Foundation LFD121',
      },
      {
        id: 'languages',
        heading: 'Langues',
        line: 'Arabe : langue maternelle   ·   Français : B2   ·   Anglais : B2',
      },
    ],
  },
};