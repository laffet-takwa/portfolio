import type { Project } from '../types';

/* ============================================================
   PROJECTS
   ------------------------------------------------------------
   HOW TO ADD A PROJECT
   1. Copy the draft template at the bottom of this file.
   2. Fill in the fields and set `published: true`.
   3. Done — it appears in Featured Projects, All Projects, search,
      category filters, the Start menu recommendations and its own
      detail window. No UI change required.
   ============================================================ */

/** Filter order: the core categories first, then project-specific tags. */
export const projectFilters = [
  'All',
  'Full-Stack',
  'Backend',
  'Frontend',
  'Cybersecurity',
  'DevOps',
  'Cloud',
  'AI',
  'Microservices',
  'SOC',
  'FinTech',
  'Automation',
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export const projects: Project[] = [
  /* ---------------------------------------------------------- 01 */
  {
    id: 'beta-ai-soc',
    title: 'BETA — Intelligent Cyber Defense System for Security Operations Centers',
    subtitle: { en: 'AI-SOC decision-support platform', fr: 'Plateforme d’aide à la décision pour les SOC' },
    category: ['Cybersecurity', 'AI', 'SOC'],
    icon: 'cpu',
    description: {
      en: 'An intelligent SOC decision-support platform that helps security analysts analyze alerts, enrich incidents with threat intelligence and generate evidence-based recommendations while keeping the human analyst in control.',
      fr: 'Une plateforme intelligente d’aide à la décision pour les SOC qui aide les analystes à analyser les alertes, à enrichir les incidents avec de la renseignement sur les menaces et à générer des recommandations fondées sur des preuves, tout en gardant l’analyste humain dans la boucle.',
    },
    longDescription: {
      en: 'BETA is a security operations platform built around a real analysis workflow. Rather than automating away the analyst, it structures the decision: alerts from the detection stack are aggregated and correlated, enriched with threat intelligence, scored with respect to MITRE ATT&CK, and presented with evidence and recommendations. Machine learning models assist triage by estimating alert severity and surfacing related indicators, while every recommendation stays explainable and reviewable by the analyst.',
      fr: 'BETA est une plateforme de sécurité opérationnelle construite autour d’un véritable workflow d’analyse. Plutôt que d’automatiser l’analyste, elle structure la décision : les alertes de la pile de détection sont agrégées et corrélées, enrichies avec du renseignement sur les menaces, notées au regard de MITRE ATT&CK, puis présentées avec les preuves et des recommandations. Des modèles de machine learning assiste le tri en estimant la sévérité des alertes et en remontant les indicateurs liés, tandis que chaque recommandation reste explicable et vérifiable par l’analyste.',
    },
    problem: {
      en: 'Security Operations Centers face alert volume far beyond what analysts can review manually. Correlation, threat intelligence enrichment and prioritization are often split across tools, and generic scoring models give little insight into why an alert matters.',
      fr: 'Les centres de opérations de sécurité font face à un volume d’alertes largement supérieur à ce que les analystes peuvent traiter manuellement. La corrélation, l’enrichissement par le renseignement sur les menaces et la priorisation sont souvent répartis entre plusieurs outils, et les modèles de scoring génériques n’expliquent pas pourquoi une alerte est importante.',
    },
    solution: {
      en: 'A single dashboard that pulls alerts from Wazuh and Suricata, manages incidents in TheHive, runs enrichers and responders through Cortex, and pulls indicators of compromise from MISP. Machine learning assists triage and every recommendation is traceable back to evidence.',
      fr: 'Un tableau de bord unique qui récupère les alertes de Wazuh et Suricata, gère les incidents dans TheHive, exécute les enrichisseurs et répondeurs via Cortex, et récupère les indicateurs de compromission depuis MISP. Le machine learning assiste le tri et chaque recommandation est traçable jusqu’aux preuves.',
    },
    architecture: {
      en: 'A React + Vite single-page front end talks to a Flask REST API. The API orchestrates the security stack (Wazuh, Suricata, TheHive, Cortex, MISP), runs the analytical services and persists incident data. Every container is orchestrated with Docker on Linux.',
      fr: 'Une application monopage React + Vite dialogue avec une API REST Flask. L’API orchestre la pile de sécurité (Wazuh, Suricata, TheHive, Cortex, MISP), exécute les services d’analyse et persiste les données d’incident. Chaque conteneur est orchestré avec Docker sous Linux.',
    },
    architectureFlow: ['React + Vite (SPA)', 'Flask REST API', 'Detection & SOAR stack', 'Data stores & ML services'],
    features: [
      { en: 'Alert correlation and triage dashboard', fr: 'Tableau de bord de corrélation et de tri des alertes' },
      { en: 'Wazuh integration for host and detection telemetry', fr: 'Intégration Wazuh pour la télémétrie hôtes et détection' },
      { en: 'Suricata integration for network alerts', fr: 'Intégration Suricata pour les alertes réseau' },
      { en: 'TheHive incident management', fr: 'Gestion des incidents avec TheHive' },
      { en: 'Cortex enrichers and responders', fr: 'Enrichisseurs et répondeurs Cortex' },
      { en: 'MISP threat intelligence and IOC matching', fr: 'Renseignement sur les menaces MISP et correspondance d’IOC' },
      { en: 'MITRE ATT&CK mapping for detections and techniques', fr: 'Cartographie MITRE ATT&CK des détections et techniques' },
      { en: 'Machine learning assisted alert scoring', fr: 'Scoring d’alerte assisté par le machine learning' },
      { en: 'Evidence-based, analyst-reviewable recommendations', fr: 'Recommandations fondées sur les preuves et révisables par l’analyste' },
      { en: 'Dockerized deployment', fr: 'Déploiement conteneurisé avec Docker' },
    ],
    technologies: [
      'React',
      'Vite',
      'Flask',
      'Python',
      'Wazuh',
      'Suricata',
      'TheHive',
      'Cortex',
      'MISP',
      'Docker',
      'Linux',
      'Machine Learning',
      'MITRE ATT&CK',
    ],
    github: '',
    demo: '',
    featured: true,
    published: true,
    year: '2026',
    role: {
      en: 'Cybersecurity / Full-Stack Project',
      fr: 'Projet Cybersécurité / Full-Stack',
    },
    screenshots: [
      { id: 'soc-dashboard', caption: { en: 'Security overview dashboard', fr: 'Tableau de bord de supervision de la sécurité' } },
      { id: 'alert-triage', caption: { en: 'Alert triage and correlation view', fr: 'Vue de tri et de corrélation des alertes' } },
      { id: 'incident-workspace', caption: { en: 'Incident investigation workspace', fr: 'Espace de travail d’investigation d’incident' } },
      { id: 'intel-enrichment', caption: { en: 'Threat intelligence enrichment panel', fr: 'Panneau d’enrichissement par renseignement sur les menaces' } },
    ],
  },

  /* ---------------------------------------------------------- 02 */
  {
    id: 'banking-transaction-system',
    title: 'Banking / FinTech Transaction System',
    subtitle: { en: 'Event-driven microservices', fr: 'Microservices pilotés par les événements' },
    category: ['Backend', 'Microservices', 'FinTech'],
    icon: 'landmark',
    description: {
      en: 'A secure banking transaction platform demonstrating microservices architecture, transaction processing, event-driven communication and security.',
      fr: 'Une plateforme bancaire sécurisée démontrant l’architecture microservices, le traitement des transactions, la communication pilotée par les événements et la sécurité.',
    },
    longDescription: {
      en: 'A banking platform built as independent services around a single transactional domain. Users, accounts and transactions live in separate Spring Boot services that never share a database; they coordinate through Kafka topics and synchronous REST calls behind a central API Gateway. Each transaction is published as an event so downstream consumers can react asynchronously, while centralized logging and security filters give a consistent operational picture.',
      fr: 'Une plateforme bancaire construite comme services indépendants autour d’un seul domaine transactionnel. Les utilisateurs, les comptes et les transactions résident dans des services Spring Boot distincts qui ne partagent jamais de base de données ; ils se coordonnent par des topics Kafka et des appels REST synchrones derrière une API Gateway centrale. Chaque transaction est publiée sous forme d’événement afin que les consommateurs en aval réagissent de manière asynchrone, tandis qu’une journalisation centralisée et des filtres de sécurité offrent une vue opérationnelle cohérente.',
    },
    problem: {
      en: 'Financial transactions require strong consistency, traceability and auditability. A monolithic design couples every change to the whole system, and synchronous call chains make failures hard to isolate.',
      fr: 'Les transactions financières exigent une forte consistance, une traçabilité et une auditabilité. Une architecture monolithique couple chaque évolution à l’ensemble du système, et les chaînes d’appels synchrones rendent les pannes difficiles à isoler.',
    },
    solution: {
      en: 'Split the domain into User, Account and Transaction services, route every external call through an API Gateway, and use Kafka as the backbone for asynchronous communication between services.',
      fr: 'Découper le domaine en services User, Account et Transaction, router tous les appels externes via une API Gateway et utiliser Kafka comme colonne vertébrale de la communication asynchrone entre services.',
    },
    architecture: {
      en: 'Vue.js front end → API Gateway → User / Account / Transaction services → Kafka for asynchronous event flow between services.',
      fr: 'Front end Vue.js → API Gateway → services User / Account / Transaction → Kafka pour le flux asynchrone entre services.',
    },
    architectureFlow: [
      'Vue.js',
      'API Gateway',
      'User Service • Account Service • Transaction Service',
      'Kafka',
    ],
    features: [
      { en: 'User authentication', fr: 'Authentification des utilisateurs' },
      { en: 'Account management', fr: 'Gestion des comptes' },
      { en: 'Transactions', fr: 'Transactions' },
      { en: 'Transaction history', fr: 'Historique des transactions' },
      { en: 'Event-driven processing', fr: 'Traitement piloté par les événements' },
      { en: 'Kafka messaging', fr: 'Messagerie Kafka' },
      { en: 'Security', fr: 'Sécurité' },
      { en: 'Centralized logging', fr: 'Journalisation centralisée' },
      { en: 'API Gateway', fr: 'API Gateway' },
      { en: 'Service-to-service communication', fr: 'Communication inter-services' },
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'Kafka',
      'PostgreSQL',
      'Docker',
      'Vue.js',
      'API Gateway',
      'Microservices',
    ],
    github: '',
    demo: '',
    featured: true,
    published: true,
    year: '2025',
    role: { en: 'Backend / Microservices Project', fr: 'Projet Backend / Microservices' },
    screenshots: [
      { id: 'accounts', caption: { en: 'Accounts and balances overview', fr: 'Vue d’ensemble des comptes et soldes' } },
      { id: 'transaction-flow', caption: { en: 'Transaction processing flow', fr: 'Flux de traitement des transactions' } },
      { id: 'kafka-topics', caption: { en: 'Event stream between services', fr: 'Flux d’événements entre services' } },
    ],
  },

  /* ---------------------------------------------------------- 03 */
  {
    id: 'ecommerce-microservices',
    title: 'E-Commerce Microservices Platform',
    subtitle: { en: 'Independent services, event-driven', fr: 'Services indépendants, pilotés par les événements' },
    category: ['Full-Stack', 'Microservices'],
    icon: 'shopping-cart',
    description: {
      en: 'A modern e-commerce application designed around independent backend services and event-driven communication.',
      fr: 'Une application e-commerce moderne conçue autour de services backend indépendants et d’une communication pilotée par les événements.',
    },
    longDescription: {
      en: 'An e-commerce application where each business capability is deployed as its own service. Customer identity, the product catalog, carts and orders evolve independently and communicate through Kafka events, so a change in the catalog does not require redeploying orders. A Vue.js front end consumes the REST APIs, while Docker keeps every service reproducible.',
      fr: 'Une application e-commerce où chaque capacité métier est déployée comme un service indépendant. L’identité client, le catalogue produits, les paniers et les commandes évoluent séparément et communiquent par des événements Kafka, si bien qu’une évolution du catalogue ne nécessite pas de redéployer les commandes. Un front end Vue.js consomme les API REST, tandis que Docker rend chaque service reproductible.',
    },
    problem: {
      en: 'E-commerce domains have very different scaling and release needs. Coupling them in one application means the catalog, the cart and the order pipeline all ship together and fail together.',
      fr: 'Les domaines e-commerce ont des besoins de mise à l’échelle et de livraison très différents. Les coupler dans une seule application signifie que le catalogue, le panier et le pipeline de commandes sont livrés ensemble et tombent ensemble.',
    },
    solution: {
      en: 'Deploy each domain as an independent Spring Boot service, exchange state changes over Kafka topics, and expose REST APIs consumed by a Vue.js client. Package everything with Docker.',
      fr: 'Déployer chaque domaine comme un service Spring Boot indépendant, échanger les changements d’état via des topics Kafka, et exposer des API REST consommées par un client Vue.js. Empaqueter l’ensemble avec Docker.',
    },
    architecture: {
      en: 'Vue.js client → REST API layer → independent domain services (users, catalog, cart, orders) → PostgreSQL per service, Kafka between services.',
      fr: 'Client Vue.js → couche API REST → services de domaine indépendants (utilisateurs, catalogue, panier, commandes) → PostgreSQL par service, Kafka entre services.',
    },
    architectureFlow: ['Vue.js client', 'REST API layer', 'Domain services', 'PostgreSQL + Kafka'],
    features: [
      { en: 'User management', fr: 'Gestion des utilisateurs' },
      { en: 'Product catalog', fr: 'Catalogue produits' },
      { en: 'Shopping cart', fr: 'Panier d’achat' },
      { en: 'Orders', fr: 'Commandes' },
      { en: 'Payments simulation', fr: 'Simulation de paiement' },
      { en: 'Notifications', fr: 'Notifications' },
      { en: 'Kafka events', fr: 'Événements Kafka' },
      { en: 'Authentication', fr: 'Authentification' },
      { en: 'Dockerized services', fr: 'Services conteneurisés' },
    ],
    technologies: ['Java', 'Spring Boot', 'Vue.js', 'Kafka', 'Docker', 'PostgreSQL', 'REST API'],
    github: '',
    demo: '',
    featured: true,
    published: true,
    year: '2025',
    role: { en: 'Full-Stack / Microservices Project', fr: 'Projet Full-Stack / Microservices' },
    screenshots: [
      { id: 'catalog', caption: { en: 'Product catalog browsing', fr: 'Navigation du catalogue produits' } },
      { id: 'cart', caption: { en: 'Cart and checkout flow', fr: 'Flux panier et paiement' } },
      { id: 'orders', caption: { en: 'Order tracking', fr: 'Suivi des commandes' } },
    ],
  },

  /* ---------------------------------------------------------- 04 */
  {
    id: 'security-monitoring-platform',
    title: 'Security Monitoring & Threat Intelligence Platform',
    subtitle: { en: 'Monitoring, alerts, intelligence, incidents', fr: 'Supervision, alertes, renseignement, incidents' },
    category: ['Cybersecurity', 'SOC'],
    icon: 'radar',
    description: {
      en: 'A security operations environment combining monitoring, alert analysis, threat intelligence and incident management.',
      fr: 'Un environnement de sécurité opérationnelle combinant supervision, analyse des alertes, renseignement sur les menaces et gestion des incidents.',
    },
    longDescription: {
      en: 'A complete monitoring environment where host and network telemetry land in one place. Wazuh watches endpoints and logs, Suricata inspects network traffic, TheHive centralizes incidents, Cortex automates enrichers and responders, and MISP keeps the threat intelligence picture current. The result is a working analyst path from raw signal to handled incident.',
      fr: 'Un environnement de supervision complet où les données hôtes et réseau convergent au même endroit. Wazuh surveille les points de terminaison et les journaux, Suricata inspecte le trafic réseau, TheHive centralise les incidents, Cortex automatise les enrichisseurs et répondeurs, et MISP maintient à jour le renseignement sur les menaces. Le résultat est un chemin d’analyste complet, du signal brut à l’incident traité.',
    },
    problem: {
      en: 'Raw telemetry alone does not produce security outcomes. Without correlation, enrichment and a tracked incident lifecycle, alerts remain an undifferentiated stream and analysts lose time on manual triage.',
      fr: 'La seule télémétrie brute ne produit pas de résultat de sécurité. Sans corrélation, enrichissement ni cycle de vie d’incident suivi, les alertes restent un flux indifférencié et les analystes perdent du temps en tri manuel.',
    },
    solution: {
      en: 'Chain the open security stack end to end: detect with Wazuh and Suricata, decide with TheHive, enrich and respond with Cortex, and share intelligence through MISP — all containerized on Linux.',
      fr: 'Enchaîner la pile sécurité open source de bout en bout : détecter avec Wazuh et Suricata, décider avec TheHive, enrichir et répondre avec Cortex, et partager le renseignement via MISP — le tout conteneurisé sous Linux.',
    },
    architecture: {
      en: 'Wazuh and Suricata produce events; TheHive manages incidents; Cortex runs enrichers and responders; MISP stores and shares threat intelligence. Linux hosts and Docker run the stack.',
      fr: 'Wazuh et Suricata produisent les événements ; TheHive gère les incidents ; Cortex exécute les enrichisseurs et répondeurs ; MISP stocke et partage le renseignement sur les menaces. Des hôtes Linux et Docker exécutent la pile.',
    },
    architectureFlow: ['Wazuh • Suricata', 'TheHive', 'Cortex', 'MISP'],
    features: [
      { en: 'Security monitoring', fr: 'Supervision de la sécurité' },
      { en: 'Alert management', fr: 'Gestion des alertes' },
      { en: 'Threat intelligence', fr: 'Renseignement sur les menaces' },
      { en: 'Incident management', fr: 'Gestion des incidents' },
      { en: 'IOC analysis', fr: 'Analyse des IOC' },
      { en: 'Security dashboards', fr: 'Tableaux de bord de sécurité' },
    ],
    technologies: ['Wazuh', 'Suricata', 'TheHive', 'Cortex', 'MISP', 'Linux', 'Docker'],
    github: '',
    demo: '',
    featured: true,
    published: true,
    year: '2026',
    role: { en: 'Cybersecurity Project', fr: 'Projet Cybersécurité' },
    screenshots: [
      { id: 'monitoring', caption: { en: 'Monitoring dashboards', fr: 'Tableaux de bord de supervision' } },
      { id: 'intel', caption: { en: 'Threat intelligence workspace', fr: 'Espace de renseignement sur les menaces' } },
      { id: 'incident', caption: { en: 'Incident lifecycle', fr: 'Cycle de vie d’un incident' } },
    ],
  },

  /* ---------------------------------------------------------- 05 */
  {
    id: 'cloud-devops-platform',
    title: 'Cloud & DevOps Deployment Platform',
    subtitle: { en: 'Containers, CI/CD, Kubernetes, AWS', fr: 'Conteneurs, CI/CD, Kubernetes, AWS' },
    category: ['DevOps', 'Cloud'],
    icon: 'cloud',
    description: {
      en: 'A project demonstrating containerization, CI/CD automation, cloud deployment and infrastructure practices.',
      fr: 'Un projet démontrant la conteneurisation, l’automatisation CI/CD, le déploiement cloud et les pratiques d’infrastructure.',
    },
    longDescription: {
      en: 'An infrastructure-oriented project focused on delivering software repeatably. Applications are packaged as Docker images, pipelines run automatically from Git, and deployments are orchestrated on Kubernetes with Helm-managed configuration. Environments are separated and observed rather than treated as one machine that occasionally changes.',
      fr: 'Un projet axé sur l’infrastructure et la livraison reproductible du logiciel. Les applications sont empaquetées en images Docker, les pipelines s’exécutent automatiquement depuis Git, et les déploiements sont orchestrés sur Kubernetes avec une configuration gérée par Helm. Les environnements sont séparés et observés plutôt que traités comme une machine qui change de temps en temps.',
    },
    problem: {
      en: 'Manual deployments are slow, untraceable and impossible to reproduce. Without containerization and automated pipelines, every environment diverges from the others and releases depend on individual knowledge.',
      fr: 'Les déploiements manuels sont lents, non traçables et impossibles à reproduire. Sans conteneurisation ni pipelines automatisés, chaque environnement diverge des autres et les livraisons dépendent de connaissances individuelles.',
    },
    solution: {
      en: 'Package applications as Docker images, automate build and test through CI/CD pipelines, deploy to Kubernetes with Helm charts, and manage environments and monitoring explicitly. AWS is used for the cloud layer.',
      fr: 'Empaqueter les applications en images Docker, automatiser la build et les tests via des pipelines CI/CD, déployer sur Kubernetes avec des charts Helm, et gérer explicitement les environnements et la supervision. AWS est utilisé pour la couche cloud.',
    },
    architecture: {
      en: 'Git repository → CI pipeline (build, test, package) → container registry → Helm-managed Kubernetes deployment → environment monitoring.',
      fr: 'Dépôt Git → pipeline CI (build, test, packaging) → registre de conteneurs → déploiement Kubernetes géré par Helm → supervision des environnements.',
    },
    architectureFlow: ['Git', 'CI/CD pipeline', 'Container registry', 'Kubernetes + Helm', 'Cloud environment'],
    features: [
      { en: 'Containerized applications', fr: 'Applications conteneurisées' },
      { en: 'CI/CD pipeline', fr: 'Pipeline CI/CD' },
      { en: 'Automated deployment', fr: 'Déploiement automatisé' },
      { en: 'Kubernetes deployment', fr: 'Déploiement Kubernetes' },
      { en: 'Environment management', fr: 'Gestion des environnements' },
      { en: 'Monitoring', fr: 'Supervision' },
      { en: 'Cloud deployment', fr: 'Déploiement cloud' },
    ],
    technologies: ['Docker', 'Kubernetes', 'Helm', 'Git', 'Linux', 'AWS', 'CI/CD'],
    github: '',
    demo: '',
    featured: true,
    published: true,
    year: '2025',
    role: { en: 'DevOps / Cloud Project', fr: 'Projet DevOps / Cloud' },
    screenshots: [
      { id: 'pipeline', caption: { en: 'CI/CD pipeline runs', fr: 'Exécutions du pipeline CI/CD' } },
      { id: 'cluster', caption: { en: 'Kubernetes cluster overview', fr: 'Vue d’ensemble du cluster Kubernetes' } },
    ],
  },

  /* ---------------------------------------------------------- 06 */
  {
    id: 'odoo-invoice-automation',
    title: 'Odoo Invoice Automation',
    subtitle: { en: 'PFE — IT Koncept', fr: 'PFE — IT Koncept' },
    category: ['Backend', 'Automation'],
    icon: 'receipt',
    description: {
      en: 'An invoice automation solution developed during the PFE project at IT Koncept.',
      fr: 'Une solution d’automatisation de factures développée lors du projet de fin d’études chez IT Koncept.',
    },
    longDescription: {
      en: 'A graduation project delivered at IT Koncept that removes manual data entry from invoice processing. Invoices are read with OCR, key fields are extracted with a document-understanding service, and the results are written into the Odoo database through the platform’s ORM, so accounting records are created automatically and consistently.',
      fr: 'Un projet de fin d’études réalisé chez IT Koncept qui supprime la saisie manuelle lors du traitement des factures. Les factures sont lues par OCR, les champs clés sont extraits via un service de compréhension documentaire, et les résultats sont écrits dans la base Odoo via l’ORM de la plateforme, afin que les enregistrements comptables soient créés automatiquement et de manière cohérente.',
    },
    problem: {
      en: 'Invoice entry is manual, repetitive and error-prone. Typing each document into the accounting system consumes time and introduces transcription mistakes that are only caught much later.',
      fr: 'La saisie des factures est manuelle, répétitive et source d’erreurs. taper chaque document dans le système comptable consomme du temps et introduit des erreurs de transcription détectées bien plus tard.',
    },
    solution: {
      en: 'Combine OCR with a document-understanding service to extract invoice fields, validate them, and push structured records into Odoo automatically through its ORM on PostgreSQL.',
      fr: 'Combiner l’OCR avec un service de compréhension documentaire pour extraire les champs de la facture, les valider, et pousser automatiquement les enregistrements structurés dans Odoo via son ORM sur PostgreSQL.',
    },
    architecture: {
      en: 'Scanned or digital invoice → OCR extraction → structured fields → Odoo ORM → PostgreSQL records, with the pipeline expressed in XML configuration.',
      fr: 'Facture scannée ou numérique → extraction OCR → champs structurés → ORM Odoo → enregistrements PostgreSQL, le pipeline étant décrit par une configuration XML.',
    },
    architectureFlow: ['Invoice document', 'OCR (Mindee)', 'Extracted fields', 'Odoo ORM', 'PostgreSQL'],
    features: [
      { en: 'Invoice processing', fr: 'Traitement des factures' },
      { en: 'OCR extraction', fr: 'Extraction par OCR' },
      { en: 'Database management', fr: 'Gestion de base de données' },
      { en: 'Automation', fr: 'Automatisation' },
      { en: 'Odoo integration', fr: 'Intégration Odoo' },
    ],
    technologies: ['Python', 'Odoo', 'PostgreSQL', 'OCR', 'Mindee', 'XML'],
    github: '',
    demo: '',
    featured: false,
    published: true,
    year: '2023',
    role: { en: 'PFE — End of Studies Project', fr: 'PFE — Projet de fin d’études' },
    screenshots: [
      { id: 'extraction', caption: { en: 'Invoice field extraction', fr: 'Extraction des champs de facture' } },
      { id: 'odoo', caption: { en: 'Records created in Odoo', fr: 'Enregistrements créés dans Odoo' } },
    ],
  },

  /* ---------------------------------------------------------------
     FUTURE PROJECT SPACE — Project 07 … Project 12
     Drafts stay hidden (`published: false`) and never reach the UI.
     To activate one: fill in the content, add a screenshot asset under
     /public/projects/<id>/ if you have one, then set published: true.
     No component needs to be touched.
     --------------------------------------------------------------- */
  {
    id: 'project-07',
    title: 'Project 07',
    category: ['Backend'],
    description: 'Reserved slot for a future project.',
    longDescription: 'Reserved slot for a future project. Replace this description with a real project summary.',
    technologies: [],
    icon: 'archive',
    featured: false,
    published: false,
  },
  {
    id: 'project-08',
    title: 'Project 08',
    category: ['Full-Stack'],
    description: 'Reserved slot for a future project.',
    longDescription: 'Reserved slot for a future project. Replace this description with a real project summary.',
    technologies: [],
    icon: 'archive',
    featured: false,
    published: false,
  },
  {
    id: 'project-09',
    title: 'Project 09',
    category: ['Cybersecurity'],
    description: 'Reserved slot for a future project.',
    longDescription: 'Reserved slot for a future project. Replace this description with a real project summary.',
    technologies: [],
    icon: 'archive',
    featured: false,
    published: false,
  },
  {
    id: 'project-10',
    title: 'Project 10',
    category: ['DevOps'],
    description: 'Reserved slot for a future project.',
    longDescription: 'Reserved slot for a future project. Replace this description with a real project summary.',
    technologies: [],
    icon: 'archive',
    featured: false,
    published: false,
  },
  {
    id: 'project-11',
    title: 'Project 11',
    category: ['AI'],
    description: 'Reserved slot for a future project.',
    longDescription: 'Reserved slot for a future project. Replace this description with a real project summary.',
    technologies: [],
    icon: 'archive',
    featured: false,
    published: false,
  },
  {
    id: 'project-12',
    title: 'Project 12',
    category: ['Cloud'],
    description: 'Reserved slot for a future project.',
    longDescription: 'Reserved slot for a future project. Replace this description with a real project summary.',
    technologies: [],
    icon: 'archive',
    featured: false,
    published: false,
  },
];

/* ---------------- Derived collections ---------------- */

/** Every project that is ready to be shown in the UI. */
export const publishedProjects: Project[] = projects.filter((p) => p.published !== false);

export const featuredProjects: Project[] = publishedProjects.filter((p) => p.featured);

/** Projects recommended in the Start menu (featured first, then the rest). */
export const recommendedProjects: Project[] = [...publishedProjects].sort((a, b) => {
  const fa = a.featured ? 0 : 1;
  const fb = b.featured ? 0 : 1;
  if (fa !== fb) return fa - fb;
  return (b.year ?? '').localeCompare(a.year ?? '');
});

export function getProjectById(id: string | undefined): Project | undefined {
  if (!id) return undefined;
  return publishedProjects.find((p) => p.id === id);
}

/** Categories actually used by published projects, in filter order. */
export function usedFilters(): string[] {
  const used = new Set(publishedProjects.flatMap((p) => p.category));
  return projectFilters.filter((f) => f === 'All' || used.has(f));
}