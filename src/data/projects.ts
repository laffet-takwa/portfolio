import type { Project } from '../types';

/* ============================================================
   PROJECTS
   ------------------------------------------------------------
   Only real, delivered work is listed here. `github` and `demo`
   stay empty strings until a public link actually exists — the
   UI renders a disabled state instead of a broken anchor.

   HOW TO ADD A PROJECT
   1. Copy the template at the bottom of this file.
   2. Fill in the fields and set `published: true`.
   3. Done — it appears in Featured Projects, All Projects, search,
      category filters, the Start menu recommendations and its own
      detail window. No UI change required.
   ============================================================ */

/** Filter order: the core categories first, then project-specific tags. */
export const projectFilters = [
  'All',
  'Cybersecurity',
  'AI',
  'SOC',
  'Full-Stack',
  'Backend',
  'Frontend',
  'Microservices',
  'Distributed Systems',
  'Automation',
  'Cloud-Native',
  'ERP',
  'FinTech',
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export const projects: Project[] = [
  /* ---------------------------------------------------------- 01 */
  {
    id: 'beta-ai-soc',
    title: 'BETA — Intelligent Cyber Defense System',
    subtitle: {
      en: 'AI-assisted decision support for Security Operations Centers',
      fr: 'Aide à la décision assistée par l’IA pour les centres de opérations de sécurité',
    },
    category: ['Cybersecurity', 'AI', 'SOC'],
    icon: 'shield-check',
    description: {
      en: 'AI-assisted SOC decision-support platform integrating security monitoring, threat intelligence, case management and machine learning to help analysts investigate and prioritize security alerts.',
      fr: 'Plateforme d’aide à la décision pour les SOC, assistée par l’IA, qui intègre supervision de la sécurité, renseignement sur les menaces, gestion de cas et machine learning pour aider les analystes à investiguer et prioriser les alertes.',
    },
    highlight: {
      en: 'AI-assisted cybersecurity with a human-in-the-loop SOC workflow.',
      fr: 'Cybersécurité assistée par l’IA avec un workflow SOC human-in-the-loop.',
    },
    longDescription: {
      en: 'BETA structures the analyst decision instead of replacing it. Alerts coming from the detection stack are aggregated, correlated and enriched with threat intelligence, scored against MITRE ATT&CK techniques and presented with the evidence behind each recommendation. Machine learning models assist triage by estimating severity and surfacing related indicators, while the analyst keeps the final call — the system supports the human rather than acting on its own.',
      fr: 'BETA structure la décision de l’analyste au lieu de la remplacer. Les alertes issues de la pile de détection sont agrégées, corrélées et enrichies avec du renseignement sur les menaces, notées au regard des techniques MITRE ATT&CK et présentées avec les preuves qui justifient chaque recommandation. Des modèles de machine learning assistent le tri en estimant la sévérité et en remontant les indicateurs liés, tandis que l’analyste conserve la décision finale : le système assiste l’humain sans agir à sa place.',
    },
    problem: {
      en: 'Security Operations Centers receive far more alerts than analysts can review manually, while correlation, threat intelligence and prioritization are split across separate tools.',
      fr: 'Les centres de opérations de sécurité reçoivent bien plus d’alertes que les analystes ne peuvent en traiter manuellement, tandis que la corrélation, le renseignement sur les menaces et la priorisation sont répartis entre des outils distincts.',
    },
    solution: {
      en: 'A single React dashboard pulls alerts from Wazuh and Suricata, manages cases in TheHive, runs enrichers and responders through Cortex, pulls indicators of compromise from MISP and external sources, and ranks the result with ML assistance. n8n orchestrates the enrichment workflows.',
      fr: 'Un tableau de bord React unique récupère les alertes de Wazuh et Suricata, gère les cas dans TheHive, exécute les enrichisseurs et répondeurs via Cortex, récupère les indicateurs de compromission depuis MISP et des sources externes, puis classe le résultat avec une assistance ML. n8n orchestre les workflows d’enrichissement.',
    },
    architecture: {
      en: 'React + Vite front end → Flask REST API → security stack (Wazuh, Suricata, TheHive, Cortex, MISP, n8n) → Supabase for storage, with XGBoost models serving classification and Server-Sent Events streaming updates to the dashboard.',
      fr: 'Front end React + Vite → API REST Flask → pile de sécurité (Wazuh, Suricata, TheHive, Cortex, MISP, n8n) → Supabase pour le stockage, avec des modèles XGBoost pour la classification et des Server-Sent Events pour diffuser les mises à jour vers le tableau de bord.',
    },
    architectureFlow: [
      'Detection stack — Wazuh • Suricata',
      'Flask REST API + n8n workflows',
      'Case & intelligence — TheHive • Cortex • MISP',
      'XGBoost classification + Supabase',
      'React + Vite SOC dashboard',
    ],
    features: [
      { en: 'Alert correlation and triage dashboard', fr: 'Tableau de bord de corrélation et de tri des alertes' },
      { en: 'Wazuh integration for host and detection telemetry', fr: 'Intégration Wazuh pour la télémétrie hôtes et détection' },
      { en: 'Suricata integration for network security events', fr: 'Intégration Suricata pour les événements de sécurité réseau' },
      { en: 'TheHive case management and Cortex responders', fr: 'Gestion de cas TheHive et répondeurs Cortex' },
      { en: 'MISP and external threat-intelligence sources', fr: 'MISP et sources externes de renseignement sur les menaces' },
      { en: 'Enrichment workflows orchestrated with n8n', fr: 'Workflows d’enrichissement orchestrés avec n8n' },
      { en: 'MITRE ATT&CK technique identification', fr: 'Identification des techniques MITRE ATT&CK' },
      { en: 'XGBoost-based security classification', fr: 'Classification de sécurité basée sur XGBoost' },
      { en: 'Alert prioritization with analyst-reviewable evidence', fr: 'Priorisation des alertes avec des preuves vérifiables par l’analyste' },
      { en: 'Real-time updates over Server-Sent Events', fr: 'Mises à jour temps réel via Server-Sent Events' },
    ],
    technologies: [
      'Wazuh',
      'Suricata',
      'TheHive',
      'Cortex',
      'MISP',
      'n8n',
      'Flask',
      'React',
      'TypeScript',
      'Vite',
      'Python',
      'XGBoost',
      'Supabase',
      'MITRE ATT&CK',
    ],
    github: '',
    demo: '',
    featured: true,
    published: true,
    year: '2026',
    role: { en: 'Cybersecurity / Full-Stack & AI-SOC Engineer', fr: 'Ingénieur Cybersécurité / Full-Stack & AI-SOC' },
  },

  /* ---------------------------------------------------------- 02 */
  {
    id: 'focus',
    title: 'Foucs',
    subtitle: {
      en: 'Floating-doc productivity workspace',
      fr: 'Espace de productivité en document flottant',
    },
    category: ['Full-Stack', 'Frontend'],
    icon: 'sparkle',
    description: {
      en: 'A privacy-focused productivity web app that merges note-taking, Kanban task management and Scrum project planning into a single floating document workspace, with real-time Supabase synchronization and row-level security.',
      fr: 'Une application web de productivité axée sur la confidentialité, qui réunit prise de notes, gestion de tâches Kanban et planification de projets Scrum dans un unique document flottant, avec synchronisation temps réel via Supabase et sécurité au niveau des lignes.',
    },
    highlight: {
      en: 'Notes, tasks and project boards sharing one document, one auth layer and one glassmorphic surface.',
      fr: 'Notes, tâches et tableaux projet partageant un seul document, une seule couche d’authentification et une seule surface glassmorphique.',
    },
    longDescription: {
      en: 'Most productivity tools split your work across separate silos: notes in one app, tasks in another, project boards in a third. Foucs takes the opposite approach and treats them as three views over the same document. The notes module is built on a Quill rich text editor with a formatting toolbar, drag-and-drop image uploads with interactive resizing, a searchable history sidebar and PDF export. The To-Do module adds a drag-and-drop Kanban board with colour-coded priorities, custom categories, due dates and completion tracking. The Scrum module layers customizable columns on top so cards can be dragged between To Do, In Progress and Done. Underneath, Supabase provides authentication, PostgreSQL storage and realtime reads, and row-level security policies keep every note private to its owner instead of relying on the interface to hide it.',
      fr: 'La plupart des outils de productivité dispersent votre travail : les notes dans une application, les tâches dans une autre, les tableaux projet dans une troisième. Foucs prend la voie inverse et les traite comme trois vues du même document. Le module notes repose sur un éditeur de texte riche Quill avec barre d’outils, téléversement d’images par glisser-déposer avec redimensionnement interactif, une barre latérale d’historique consultable et l’export PDF. Le module To-Do ajoute un tableau Kanban par glisser-déposer avec priorités codées par couleur, catégories personnalisées, dates d’échéance et suivi d’achèvement. Le module Scrum empile des colonnes personnalisables pour faire glisser les cartes entre To Do, In Progress et Done. En dessous, Supabase fournit l’authentification, le stockage PostgreSQL et les lectures temps réel, et les politiques de sécurité au niveau des lignes garantissent que chaque note reste privée pour son propriétaire plutôt que de reposer sur l’interface pour la masquer.',
    },
    problem: {
      en: 'Capture, organize and plan are three different activities that live in three different tools. Context is lost at every hand-off, and no single tool knows what you wrote, what you have to do and what your project status actually is.',
      fr: 'Capturer, organiser et planifier sont trois activités distinctes dispersées dans trois outils distincts. Le contexte se perd à chaque passage, et aucun outil ne sait à la fois ce que vous avez écrit, ce qu’il reste à faire et quel est l’état réel de votre projet.',
    },
    solution: {
      en: 'Build one React application where the note editor, the Kanban task board and the Scrum project board are views over the same authenticated document, persisted in Supabase and protected by row-level security policies.',
      fr: 'Construire une seule application React où l’éditeur de notes, le tableau Kanban et le tableau Scrum sont des vues du même document authentifié, persisté dans Supabase et protégé par des politiques de sécurité au niveau des lignes.',
    },
    architecture: {
      en: 'React 18 SPA (TypeScript, React Router) → Supabase client for Auth, Postgres and Realtime → PostgreSQL tables for notes, categories, tasks, Scrum columns and cards, with row-level security policies enforced in the database and Quill handling rich text rendering.',
      fr: 'SPA React 18 (TypeScript, React Router) → client Supabase pour Auth, Postgres et Realtime → tables PostgreSQL pour les notes, catégories, tâches, colonnes Scrum et cartes, avec des politiques de sécurité au niveau des lignes appliquées en base et Quill pour le rendu du texte riche.',
    },
    architectureFlow: [
      'React 18 SPA — TypeScript · React Router',
      'Tailwind CSS + Framer Motion glassmorphic UI',
      'Supabase client — Auth · Postgres · Realtime',
      'PostgreSQL with row-level security',
      'Quill rich editor · PDF export',
    ],
    features: [
      { en: 'Rich text note editor built on Quill with a formatting toolbar', fr: 'Éditeur de notes en texte riche basé sur Quill avec barre d’outils' },
      { en: 'Drag-and-drop image upload with interactive resizing', fr: 'Téléversement d’images par glisser-déposer avec redimensionnement interactif' },
      { en: 'Real-time note synchronization across sessions', fr: 'Synchronisation des notes en temps réel entre les sessions' },
      { en: 'PDF export of notes', fr: 'Export des notes en PDF' },
      { en: 'Searchable note history sidebar', fr: 'Barre latérale d’historique des notes consultable' },
      { en: 'To-Do Kanban board with drag and drop and colour-coded priorities', fr: 'Tableau Kanban To-Do par glisser-déposer avec priorités codées par couleur' },
      { en: 'Custom task categories with due dates and completion tracking', fr: 'Catégories de tâches personnalisées avec dates d’échéance et suivi d’achèvement' },
      { en: 'Scrum board with customizable columns and drag-and-drop cards', fr: 'Tableau Scrum avec colonnes personnalisables et cartes en glisser-déposer' },
      { en: 'Glassmorphic interface with backdrop blur and animated light rays', fr: 'Interface glassmorphique avec flou d’arrière-plan et rayons lumineux animés' },
      { en: 'Floating navigation dock with physics-based animations', fr: 'Dock de navigation flottant avec animations fondées sur la physique' },
      { en: 'Email/password and OAuth authentication with protected routes', fr: 'Authentification e-mail/mot de passe et OAuth avec routes protégées' },
      { en: 'Row-level security policies keeping every note private to its owner', fr: 'Politiques de sécurité au niveau des lignes gardant chaque note privée pour son propriétaire' },
    ],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Supabase',
      'React Router',
      'Framer Motion',
      'Quill',
      'PostgreSQL',
      'Row Level Security',
    ],
    github: 'https://github.com/laffet-takwa/focus',
    demo: '',
    featured: false,
    published: true,
    year: '2026',
    role: { en: 'Full-Stack Developer', fr: 'Développeur Full-Stack' },
  },

  /* ---------------------------------------------------------- 03 */
  {
    id: 'finova',
    title: 'Finova',
    subtitle: {
      en: 'Digital banking and smart transaction platform',
      fr: 'Plateforme bancaire numérique et transactions intelligentes',
    },
    category: ['FinTech', 'Backend', 'Microservices', 'Distributed Systems'],
    icon: 'landmark',
    description: {
      en: 'Event-driven banking platform: eight Spring Boot services behind a reactive API Gateway, a rule-based fraud engine scoring 0–100, Kafka-driven settlement with a transactional outbox, and a Vue 3 client that behaves like a real FinTech product.',
      fr: 'Plateforme bancaire pilotée par les événements : huit services Spring Boot derrière une API Gateway réactive, un moteur de fraude à règles notant de 0 à 100, un règlement piloté par Kafka avec outbox transactionnelle, et un client Vue 3 qui se comporte comme un vrai produit FinTech.',
    },
    highlight: {
      en: 'Deadlock-free settlement, an outbox that cannot lose money, and a fraud engine kept as a pure, unit-tested function.',
      fr: 'Règlement sans risque d’interblocage, une outbox incapable de perdre d’argent, et un moteur de fraude gardé comme une fonction pure et testée.',
    },
    longDescription: {
      en: 'Finova is built around the money path rather than around screens. A transfer is validated by ten rules, written as PENDING together with its domain event in the same database transaction, and settled only once the fraud engine approves it. Settlement locks both ledger rows in a global ascending order, so no wait-for cycle can form, and idempotency is enforced by a unique index on the key rather than by convention. Every event is published through a transactional outbox, so a broker outage delays events instead of losing money. Around that core sit a reactive gateway, service discovery, five bounded contexts with their own databases, a fraud-operations console, an immutable audit log, correlated structured logs in Kibana, and Kubernetes manifests with probes and disruption budgets.',
      fr: 'Finova est construit autour du chemin de l’argent plutôt qu autour des écrans. Un virement est validé par dix règles, écrit en PENDING avec son événement de domaine dans la même transaction base de données, et n’est réglé qu’une fois le moteur de fraude l’ayant validé. Le règlement verrouille les deux lignes du grand livre dans un ordre croissant global, si bien qu’aucun cycle d’attente ne peut se former, et l’idempotence est garantie par un index unique sur la clé plutôt que par convention. Chaque événement est publié via une outbox transactionnelle : une panne du broker retarde les événements au lieu de perdre de l’argent. Autour de ce cœur gravitent une gateway réactive, la découverte de services, cinq contextes bornés dotés de leurs propres bases, une console d’opérations fraude, un journal d’audit immuable, des logs structurés corrélés dans Kibana, et des manifestes Kubernetes avec probes et budgets de rupture.',
    },
    problem: {
      en: 'Money movement is where distributed systems usually break. Double-debits, events lost while the broker is down, deadlocks between two transfers in opposite directions, and “approved” confused with “completed” are all easy to ship by accident.',
      fr: 'Le mouvement d’argent est précisément là où les systèmes distribués cassent. Le double débit, les événements perdus pendant une panne du broker, les interblocages entre deux virements en sens opposés, et la confusion entre « approuvé » et « terminé » sont autant d’erreurs faciles à livrer par mégarde.',
    },
    solution: {
      en: 'Each bounded context is an independent Spring Boot service behind a Spring Cloud Gateway, with Eureka for discovery and nine explicitly provisioned Kafka topics — auto-creation is off so a typo fails loudly. Approval and completion are separate topics, so a consumer can never mistake “fraud cleared this” for “the money moved”. Deadlock is made impossible by a global lock ordering, idempotency by a unique index, and event loss by an outbox drained after commit.',
      fr: 'Chaque contexte borné est un service Spring Boot indépendant derrière une Spring Cloud Gateway, avec Eureka pour la découverte et neuf topics Kafka provisionnés explicitement — l’autocréation est désactivée pour qu’une faute de frappe échoue bruyamment. L’approbation et l’achèvement sont deux topics distincts, afin qu’aucun consommateur ne puisse confondre « la fraude a validé » avec « l’argent a bougé ». L’interblocage est rendu impossible par un ordre de verrouillage global, l’idempotence par un index unique, et la perte d’événements par une outbox drainée après le commit.',
    },
    architecture: {
      en: 'Vue 3 SPA → Spring Cloud Gateway (JWT, CORS, rate limiting, correlation id, unified error envelope) → Eureka discovery → five Spring Boot services (user, account, transaction, fraud, notification) → PostgreSQL 16 per bounded context and MongoDB 7 for fraud alerts, with Kafka 3.8 in KRaft mode between them and Elasticsearch/Kibana collecting the correlated structured logs.',
      fr: 'SPA Vue 3 → Spring Cloud Gateway (JWT, CORS, rate limiting, correlation id, enveloppe d’erreur unifiée) → découverte Eureka → cinq services Spring Boot (user, account, transaction, fraud, notification) → PostgreSQL 16 par contexte borné et MongoDB 7 pour les alertes de fraude, avec Kafka 3.8 en mode KRaft entre eux et Elasticsearch/Kibana qui collecte les logs structurés corrélés.',
    },
    architectureFlow: [
      'Vue 3 SPA — TypeScript · Pinia',
      'API Gateway — JWT · rate limit · correlation id',
      'Spring Boot services — user · account · transaction · fraud · notification',
      'Kafka — 9 topics + transactional outbox',
      'PostgreSQL 16 · MongoDB 7 · ELK',
    ],
    features: [
      { en: 'Idempotent transfers enforced by a unique database index', fr: 'Virements idempotents garantis par un index unique en base' },
      { en: 'Deadlock-free settlement with a global lock ordering', fr: 'Règlement sans interblocage grâce à un ordre de verrouillage global' },
      { en: 'Transactional outbox: a broker outage cannot lose a transfer', fr: 'Outbox transactionnelle : une panne du broker ne perd aucun virement' },
      { en: 'Rule-based fraud engine scoring 0–100 across five weighted rules', fr: 'Moteur de fraude à règles notant de 0 à 100 sur cinq règles pondérées' },
      { en: 'Fraud console with per-alert timelines and audited review actions', fr: 'Console fraude avec chronologies par alerte et actions de revue auditées' },
      { en: 'JWT auth with silent refresh and a unified error envelope carrying a correlation id', fr: 'Authentification JWT avec rafraîchissement silencieux et enveloppe d’erreur unifiée portant un correlation id' },
      { en: 'Multi-currency accounts in TND, EUR and USD with a reconstructed balance history', fr: 'Comptes multi-devises TND, EUR et USD avec un historique de solde reconstruit' },
      { en: 'Event-driven notifications for completed, failed and held transfers', fr: 'Notifications pilotées par les événements pour les virements terminés, échoués et retenus' },
      { en: 'Immutable audit log filterable by action, actor, result and time', fr: 'Journal d’audit immuable filtrable par action, acteur, résultat et horodatage' },
      { en: 'Structured logs correlated end-to-end into Kibana dashboards', fr: 'Logs structurés corrélés de bout en bout dans des tableaux de bord Kibana' },
      { en: 'Kubernetes manifests with probes, disruption budgets and a hardened security context', fr: 'Manifestes Kubernetes avec probes, budgets de rupture et contexte de sécurité durci' },
      { en: 'Testcontainers-backed suite across gateway, fraud, account and transaction', fr: 'Suite de tests avec Testcontainers couvrant gateway, fraude, comptes et transactions' },
    ],
    technologies: [
      'Java 17',
      'Spring Boot 3',
      'Spring Cloud Gateway',
      'Eureka',
      'Kafka',
      'PostgreSQL',
      'MongoDB',
      'Flyway',
      'JWT',
      'Vue 3',
      'TypeScript',
      'Docker',
      'Kubernetes',
      'Elasticsearch',
      'Testcontainers',
    ],
    github: 'https://github.com/laffet-takwa/Finova',
    demo: '',
    featured: true,
    published: true,
    year: '2026',
    role: { en: 'Backend / Distributed Systems Engineer', fr: 'Ingénieur Back-end / Systèmes distribués' },
    screenshotFolder: 'finova',
    screenshots: [
      {
        id: 'login',
        caption: { en: 'Sign in', fr: 'Connexion' },
        src: '/projects/finova/01-login.webp',
      },
      {
        id: 'register',
        caption: { en: 'Registration', fr: 'Inscription' },
        src: '/projects/finova/02-register.webp',
      },
      {
        id: 'dashboard',
        caption: {
          en: 'Dashboard — total balance, 30-day cash flow and recent activity',
          fr: 'Tableau de bord — solde total, flux de trésorerie sur 30 jours et activité récente',
        },
        src: '/projects/finova/03-dashboard.webp',
      },
      {
        id: 'open-account',
        caption: { en: 'Opening a checking or savings account', fr: 'Ouverture d’un compte courant ou d’épargne' },
        src: '/projects/finova/04-accounts-new-account.webp',
      },
      {
        id: 'account-detail',
        caption: {
          en: 'Account detail — balance history reconstructed from real ledger movements',
          fr: 'Détail du compte — historique de solde reconstruit à partir des mouvements réels',
        },
        src: '/projects/finova/05-account-detail.webp',
      },
      {
        id: 'transfer',
        caption: {
          en: 'Send money — recipient verification, then the amount and the idempotency key',
          fr: 'Envoi d’argent — vérification du destinataire, puis montant et clé d’idempotence',
        },
        src: '/projects/finova/06-transfer.webp',
      },
      {
        id: 'transfer-review',
        caption: {
          en: 'Step 3 of 4 — the review screen that carries the idempotency key through confirmation',
          fr: 'Étape 3 sur 4 — l’écran de revue qui porte la clé d’idempotence jusqu’à la confirmation',
        },
        src: '/projects/finova/07-transfer-review.webp',
      },
      {
        id: 'security',
        caption: {
          en: 'Security centre — two-factor shown as “Not enabled” rather than a green tick',
          fr: 'Centre de sécurité — double authentification affichée « non activée » plutôt qu’une coche verte',
        },
        src: '/projects/finova/08-security.webp',
      },
      {
        id: 'settings',
        caption: { en: 'Profile settings', fr: 'Paramètres du profil' },
        src: '/projects/finova/09-settings.webp',
      },
      {
        id: 'settings-notifications',
        caption: { en: 'Notification preferences', fr: 'Préférences de notification' },
        src: '/projects/finova/10-settings-notifications.webp',
      },
      {
        id: 'not-found',
        caption: { en: 'Not-found route', fr: 'Route introuvable' },
        src: '/projects/finova/11-not-found.webp',
      },
      {
        id: 'dashboard-mobile',
        caption: {
          en: 'Mobile — redesigned as a drawer and single-column cards',
          fr: 'Mobile — repensée en tiroir et en cartes sur une colonne',
        },
        src: '/projects/finova/12-dashboard-mobile.webp',
      },
      {
        id: 'transfer-mobile',
        caption: { en: 'Mobile — transfer flow', fr: 'Mobile — parcours de virement' },
        src: '/projects/finova/13-transfer-mobile.webp',
      },
      {
        id: 'transactions-mobile',
        caption: {
          en: 'Mobile — filters expanded and the table turned into cards',
          fr: 'Mobile — filtres déployés et tableau transformé en cartes',
        },
        src: '/projects/finova/14-transactions-filters-mobile.webp',
      },
      {
        id: 'security-mobile',
        caption: { en: 'Mobile — security centre', fr: 'Mobile — centre de sécurité' },
        src: '/projects/finova/15-security-mobile.webp',
      },
    ],
  },

  /* ---------------------------------------------------------- 04 */
  {
    id: 'fleetflow',
    title: 'FleetFlow',
    subtitle: {
      en: 'Smart logistics and delivery platform on an event-driven backbone',
      fr: 'Plateforme logistique et de livraison intelligente sur un socle piloté par les événements',
    },
    category: ['Full-Stack', 'Microservices', 'Distributed Systems', 'Backend', 'Cloud-Native'],
    icon: 'map-pin',
    description: {
      en: 'Smart logistics and delivery platform: eight Spring Boot services behind a single API gateway with a Vue 3 single-page front end, covering customer ordering, warehouse inventory, last-mile delivery and live tracking. Order, inventory and delivery changes travel over Kafka, and position updates are streamed to the browser over Server-Sent Events.',
      fr: 'Plateforme logistique et de livraison intelligente : huit services Spring Boot derrière une unique API Gateway, avec un front end SPA Vue 3, couvrant la commande client, l’inventaire des entrepôts, la livraison du dernier kilomètre et le suivi en direct. Les changements de commande, de stock et de livraison circulent via Kafka, et les mises à jour de position sont diffusées au navigateur en Server-Sent Events.',
    },
    highlight: {
      en: 'The browser only ever talks to the gateway, and every state change reaches tracking, inventory and notifications as a Kafka event instead of a synchronous call chain.',
      fr: 'Le navigateur ne parle qu’à la gateway, et chaque changement d’état atteint le suivi, le stock et les notifications via un événement Kafka plutôt que par une chaîne d’appels synchrones.',
    },
    longDescription: {
      en: 'FleetFlow is built around the delivery itself rather than around a screen. A customer places an order, the warehouse reserves stock, a driver is assigned and picks the parcel up — and each of those transitions has to reach the tracking map, the notification feed and the operations console at the same time. Rather than chaining synchronous calls that fail together, every service publishes a JSON event envelope on one of nine explicitly provisioned Kafka topics, and the consumers react. The tracking service keeps location history in MongoDB, caches hot state in Redis and pushes each new position to the browser over a Server-Sent Events stream, so the map moves without polling. Consumers de-duplicate on the event id, and a correlation id minted at the gateway is echoed on every response, carried inside the envelope and restored on the consuming side, so one customer order can be followed across all eight services. The SPA ships three shells — operations, driver and customer — behind route guards that resolve against the JWT role. Docker Compose brings the whole platform up with one command, creating the datastores, the Kafka topics and the demo identities, and holding the gateway until every downstream service reports healthy.',
      fr: 'FleetFlow est construit autour de la livraison elle-même plutôt qu autour d’un écran. Un client passe commande, l’entrepôt réserve du stock, un chauffeur est affecté et prend le colis en charge — et chacune de ces transitions doit atteindre en même temps la carte de suivi, le fil de notifications et la console d’opérations. Plutôt que d’enchaîner des appels synchrones qui tombent ensemble, chaque service publie une enveloppe d’événement JSON sur l’un des neuf topics Kafka provisionnés explicitement, et les consommateurs réagissent. Le service de tracking conserve l’historique des positions dans MongoDB, met en cache l’état chaud dans Redis et pousse chaque nouvelle position vers le navigateur via un flux Server-Sent Events, si bien que la carte bouge sans interrogation périodique. Les consommateurs dédupliquent sur l’identifiant d’événement, et un correlation id émis par la gateway est renvoyé sur chaque réponse, transporté dans l’enveloppe puis restauré côté consommateur : une seule commande client peut ainsi être suivie à travers les huit services. La SPA embarque trois coquilles — opérations, chauffeur et client — derrière des gardes de route qui se résolvent sur le rôle du JWT. Docker Compose fait monter toute la plateforme en une seule commande, créant les bases, les topics Kafka et les identités de démonstration, et retenant la gateway jusqu’à ce que chaque service en aval soit sain.',
    },
    problem: {
      en: 'Delivery operations cut across customers, orders, stock, drivers and vehicles, and each of them moves on its own schedule. A picked-up parcel has to reach tracking, the customer and the notification feed at once. A warehouse that cannot reserve stock has to say so before the order is accepted, not after. And a driver phone on a patchy mobile network still has to report where the parcel actually is.',
      fr: 'Les opérations de livraison traversent les clients, les commandes, le stock, les chauffeurs et les véhicules, et chacun évolue à son propre rythme. Un colis pris en charge doit atteindre en même temps le suivi, le client et le fil de notifications. Un entrepôt incapable de réserver du stock doit le signaler avant que la commande ne soit acceptée, pas après. Et un téléphone de chauffeur sur un réseau mobile instable doit tout de même remonter la position réelle du colis.',
    },
    solution: {
      en: 'Eight Spring Boot services, each owning its own database, sit behind a Spring Cloud gateway that authenticates with JWT and handles CORS and routing. They exchange state changes as event envelopes on nine Kafka topics declared by a script, with auto-creation disabled so a typo fails loudly instead of silently creating a new topic. Idempotency comes from the event id rather than from convention, and correlation ids link logs, events and HTTP calls into one trace. Position updates are pushed to the browser over Server-Sent Events, while role-based routing gives ADMIN, OPERATIONS, DRIVER and CUSTOMER genuinely different screens.',
      fr: 'Huit services Spring Boot, chacun propriétaire de sa base, se placent derrière une Spring Cloud Gateway qui authentifie par JWT et gère le CORS et le routage. Ils échangent leurs changements d’état sous forme d’enveloppes d’événements sur neuf topics Kafka déclarés par un script, l’autocréation étant désactivée pour qu’une faute de frappe échoue bruyamment au lieu de créer silencieusement un nouveau topic. L’idempotence vient de l’identifiant d’événement plutôt que d’une convention, et les correlation ids relient logs, événements et appels HTTP en une seule trace. Les mises à jour de position sont poussées au navigateur en Server-Sent Events, tandis que le routage par rôle offre à ADMIN, OPERATIONS, DRIVER et CUSTOMER des écrans réellement différents.',
    },
    architecture: {
      en: 'Vue 3 SPA (TypeScript, Pinia, Vue Router, Leaflet) → API gateway (JWT filter, CORS, routing) → eight Spring Boot services (auth, customer, order, warehouse, delivery, tracking, notification), each with its own PostgreSQL database, plus MongoDB 7 and Redis 7 for location history. Kafka 3.8 in KRaft mode carries the domain events between them, with an optional Eureka registry, and an optional ELK stack fed by every service collects the correlated logs. Docker Compose brings the whole platform up with one command.',
      fr: 'SPA Vue 3 (TypeScript, Pinia, Vue Router, Leaflet) → API gateway (filtre JWT, CORS, routage) → huit services Spring Boot (auth, customer, order, warehouse, delivery, tracking, notification), chacun avec sa base PostgreSQL, plus MongoDB 7 et Redis 7 pour l’historique des positions. Kafka 3.8 en mode KRaft transporte les événements de domaine entre eux, avec un registre Eureka optionnel, et une pile ELK optionnelle alimentée par chaque service collecte les logs corrélés. Docker Compose fait monter toute la plateforme en une seule commande.',
    },
    architectureFlow: [
      'Vue 3 SPA — TypeScript · Pinia · Leaflet',
      'API Gateway — JWT filter · CORS · routing',
      'Spring Boot services — auth · order · warehouse · delivery · tracking',
      'Kafka 3.8 — order.* · inventory.* · delivery.*',
      'PostgreSQL 16 · MongoDB 7 · Redis · ELK',
    ],
    features: [
      { en: 'Storefront with catalogue browsing, order placement and live map tracking', fr: 'Boutique avec navigation du catalogue, passage de commande et suivi sur carte en direct' },
      { en: 'Operations console for the order pipeline, inventory, warehouses, drivers, vehicles and analytics', fr: 'Console d’opérations pour le pipeline de commandes, le stock, les entrepôts, les chauffeurs, les véhicules et les analyses' },
      { en: 'Driver app with assigned deliveries and assigned → picked up → in transit → delivered transitions', fr: 'Application chauffeur avec livraisons assignées et transitions assignée → prise en charge → en transit → livrée' },
      { en: 'Event-driven backbone carrying order, inventory and delivery changes over Kafka', fr: 'Socle piloté par les événements transportant les changements de commande, de stock et de livraison via Kafka' },
      { en: 'Live position updates streamed to the browser over Server-Sent Events', fr: 'Mises à jour de position diffusées au navigateur en Server-Sent Events' },
      { en: 'Role-based access — ADMIN, OPERATIONS, DRIVER, CUSTOMER — with JWT auth and per-role routing', fr: 'Accès par rôle — ADMIN, OPERATIONS, DRIVER, CUSTOMER — avec authentification JWT et routage par rôle' },
      { en: 'Data owned per service: PostgreSQL each, with MongoDB and Redis for location history', fr: 'Données possédées par service : PostgreSQL pour chacun, avec MongoDB et Redis pour l’historique des positions' },
      { en: 'Idempotent consumers de-duplicating on the event id', fr: 'Consommateurs idempotents dédupliquant sur l’identifiant d’événement' },
      { en: 'Correlation ids threaded through logs, event envelopes and HTTP calls', fr: 'Correlation ids traversant les logs, les enveloppes d’événements et les appels HTTP' },
      { en: 'Explicitly provisioned Kafka topics with partition counts matched to ordering needs', fr: 'Topics Kafka provisionnés explicitement avec des partitions calées sur les besoins d’ordre' },
      { en: 'Optional ELK stack with Filebeat forwarding Docker logs to Kibana', fr: 'Pile ELK optionnelle avec Filebeat qui transmet les logs Docker à Kibana' },
      { en: 'One-command local stack with seeded demo identities and health-gated startup', fr: 'Pile locale en une commande avec identités de démonstration et démarrage conditionné au health check' },
      { en: 'Testcontainers-backed integration tests against real datastores', fr: 'Tests d’intégration avec Testcontainers sur de vraies bases de données' },
    ],
    technologies: [
      'Java 17',
      'Spring Boot 3',
      'Spring Cloud',
      'Spring Security',
      'JJWT',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Kafka',
      'Eureka',
      'Flyway',
      'Vue 3',
      'TypeScript',
      'Vite',
      'Pinia',
      'Tailwind CSS',
      'Leaflet',
      'Docker',
      'Testcontainers',
      'OpenAPI',
    ],
    github: 'https://github.com/laffet-takwa/FleetFlow',
    demo: '',
    featured: true,
    published: true,
    year: '2026',
    role: { en: 'Backend / Distributed Systems Engineer', fr: 'Ingénieur Back-end / Systèmes distribués' },
    screenshotFolder: 'fleetflow',
    screenshots: [
      {
        id: 'operations-dashboard',
        caption: {
          en: 'Operations dashboard — live KPIs, active deliveries and a chart on real data',
          fr: 'Tableau de bord des opérations — KPI en direct, livraisons actives et graphique sur données réelles',
        },
      },
{
        id: 'operations-order-detail',
        caption: {
          en: 'Order detail — timeline rebuilt from the status history, staff actions gated',
          fr: 'Détail d’une commande — chronologie reconstruite depuis l’historique de statut, actions du personnel réservées',
        },
      },
      {
        id: 'operations-inventory',
        caption: {
          en: 'Inventory — low stock visible immediately, filters and adjustment dialog',
          fr: 'Stocks — ruptures visibles immédiatement, filtres et dialogue d’ajustement',
        },
      },
      {
        id: 'operations-tracking-map',
        caption: {
          en: 'Live operations map — full-width Leaflet view, delivery list and live positions',
          fr: 'Carte opérationnelle en direct — vue Leaflet pleine largeur, liste des livraisons et positions en direct',
        },
      },
      {
        id: 'customer-checkout',
        caption: {
          en: 'Customer checkout — address, payment and review before confirming',
          fr: 'Paiement client — adresse, règlement et récapitulatif avant confirmation',
        },
      },
      {
        id: 'customer-tracking',
        caption: {
          en: 'Live tracking — courier position streamed over Server-Sent Events',
          fr: 'Suivi en direct — position du livreur diffusée en Server-Sent Events',
        },
      },
      {
        id: 'driver-delivery',
        caption: {
          en: 'Driver delivery — proof of delivery, status transitions',
          fr: 'Livraison livreur — preuve de livraison, transitions de statut',
        },
      },
      {
        id: 'login',
        caption: { en: 'Sign in', fr: 'Connexion' },
      },
      {
        id: 'customer-home',
        caption: { en: 'Customer home — active deliveries and recent orders', fr: 'Accueil client — livraisons actives et commandes récentes' },
      },
      {
        id: 'customer-orders',
        caption: { en: 'Order history', fr: 'Historique des commandes' },
      },
      {
        id: 'driver-deliveries',
        caption: { en: 'Driver — assigned deliveries for the day', fr: 'Livreur — livraisons assignées pour la journée' },
      },
      {
        id: 'driver-today',
        caption: { en: 'Driver — today’s route', fr: 'Livreur — tournée du jour' },
      },
      {
        id: 'operations-deliveries',
        caption: { en: 'Operations — delivery board by status', fr: 'Opérations — tableau des livraisons par statut' },
      },
      {
        id: 'operations-inventory',
        caption: {
          en: 'Operations — warehouse inventory and adjustments',
          fr: 'Opérations — stocks de l’entrepôt et ajustements',
        },
      },
      {
        id: 'operations-order-detail',
        caption: {
          en: 'Operations — order detail with status history and staff actions',
          fr: 'Opérations — détail d’une commande, historique de statut et actions staff',
        },
      },
      {
        id: 'operations-orders',
        caption: { en: 'Operations — order queue', fr: 'Opérations — file des commandes' },
      },
      {
        id: 'operations-tracking-map',
        caption: {
          en: 'Operations — tracking map across all active deliveries',
          fr: 'Opérations — carte de suivi de toutes les livraisons actives',
        },
      },
    ],
  },

  /* ---------------------------------------------------------- 05 */
  {
    id: 'stockly',
    title: 'Stockly',
    subtitle: {
      en: 'Inventory management with a React interface and a FastAPI service',
      fr: 'Gestion de stock avec une interface React et un service FastAPI',
    },
    category: ['Full-Stack', 'Backend'],
    icon: 'archive',
    description: {
      en: 'Inventory management application pairing a React interface with a Python FastAPI API and a SQLite database: stock value, references, units and reorder alerts on a dashboard, product creation, edition and deletion, and stock movements that refuse an output larger than the available quantity.',
      fr: 'Application de gestion de stock associant une interface React à une API Python FastAPI et à une base SQLite : valeur du stock, références, unités et alertes de réapprovisionnement sur un tableau de bord, création, modification et suppression de produits, et mouvements de stock qui refusent une sortie supérieure à la quantité disponible.',
    },
    highlight: {
      en: 'An output larger than the stock on hand is refused by the API instead of driving the inventory negative, and every movement is journalled in SQLite.',
      fr: 'Une sortie supérieure au stock disponible est refusée par l’API plutôt que de rendre l’inventaire négatif, et chaque mouvement est journalisé dans SQLite.',
    },
    longDescription: {
      en: 'Stockly is a complete inventory stack kept deliberately small: a React single-page interface talking to a FastAPI service over a plain REST contract, with SQLite as the datastore. The dashboard answers what a stock manager checks first — total value, number of references, units on hand and the products that dropped below their reorder threshold. Each product carries a SKU, a category, a quantity, a minimum quantity and a unit price, and can be created, edited or deleted from the interface. Stock movements are the write path that matters: an entry (`in`) or an exit (`out`) is posted through the API with a quantity and an optional note, and the service checks the available quantity before accepting an output, so the inventory cannot silently go negative. Every movement is persisted with its type, quantity and note, which makes the history explain why the current quantity is what it is. The database is created on first startup from `backend/schema.sql`, which defines the `products` and `movements` tables, their constraints and the demo data — a fresh clone is usable immediately, with no manual seeding step. FastAPI generates interactive OpenAPI documentation at `/docs`, where the endpoints can be read and exercised without reading the code.',
      fr: 'Stockly est une pile de gestion de stock complète et volontairement compacte : une interface React monopage qui dialogue avec un service FastAPI via un contrat REST simple, avec SQLite comme base de données. Le tableau de bord répond à ce qu’un gestionnaire de stock vérifie en premier — la valeur totale, le nombre de références, les unités en main et les produits passés sous leur seuil de réapprovisionnement. Chaque produit porte un SKU, une catégorie, une quantité, une quantité minimale et un prix unitaire, et peut être créé, modifié ou supprimé depuis l’interface. Les mouvements de stock constituent le chemin d’écriture qui compte : une entrée (`in`) ou une sortie (`out`) est envoyée à l’API avec une quantité et une note facultative, et le service contrôle la quantité disponible avant d’accepter une sortie, si bien que l’inventaire ne peut pas devenir négatif silencieusement. Chaque mouvement est persisté avec son type, sa quantité et sa note, ce qui fait de l’historique l’explication de la quantité actuelle. La base est créée au premier démarrage à partir de `backend/schema.sql`, qui définit les tables `products` et `movements`, leurs contraintes et les données de démonstration — un clone nouvellement lancé est utilisable immédiatement, sans étape d’initialisation manuelle. FastAPI génère une documentation OpenAPI interactive sur `/docs`, où les endpoints peuvent être lus et essayés sans lire le code.',
    },
    problem: {
      en: 'Inventory kept in a spreadsheet drifts from reality the moment someone records a movement without updating the count. The quantities stop matching, low-stock items are discovered too late, and there is no history explaining how the current stock was reached.',
      fr: 'Un stock tenu dans un tableur dérive de la réalité dès qu’un mouvement est saisi sans mettre le compte à jour. Les quantités ne correspondent plus, les ruptures sont découvertes trop tard, et aucun historique n’explique comment le stock actuel a été atteint.',
    },
    solution: {
      en: 'Put the quantity behind an API that refuses impossible movements: products and movements live in SQLite, the FastAPI service validates each entry and output against the available quantity, writes the movement to the journal, and the React interface reads the same state so the dashboard, the filters and the history always agree.',
      fr: 'Placer la quantité derrière une API qui refuse les mouvements impossibles : produits et mouvements vivent dans SQLite, le service FastAPI valide chaque entrée et sortie par rapport à la quantité disponible, écrit le mouvement au journal, et l’interface React lit le même état si bien que le tableau de bord, les filtres et l’historique sont toujours d’accord.',
    },
    architecture: {
      en: 'React single-page interface (Vite, plain CSS) → REST calls to /api/products and /api/movements, with the base URL supplied by VITE_API_URL and defaulting to http://localhost:8000/api → FastAPI application served by Uvicorn with reload → SQLite database created at startup from backend/schema.sql, holding the products and movements tables with their constraints and the demo data.',
      fr: 'Interface React monopage (Vite, CSS simple) → appels REST vers /api/products et /api/movements, l’URL de base étant fournie par VITE_API_URL et valant http://localhost:8000/api par défaut → application FastAPI servie par Uvicorn avec rechargement → base SQLite créée au démarrage à partir de backend/schema.sql, contenant les tables products et movements avec leurs contraintes et les données de démonstration.',
    },
    architectureFlow: [
      'React SPA — Vite · plain CSS',
      'REST contract — /api/products · /api/movements',
      'FastAPI application — Uvicorn --reload',
      'SQLite — products · movements',
      'schema.sql — tables, constraints, demo data',
    ],
    features: [
      { en: 'Dashboard with stock value, reference count, units on hand and reorder alerts', fr: 'Tableau de bord avec la valeur du stock, le nombre de références, les unités en main et les alertes de réapprovisionnement' },
      { en: 'Search and filters by availability and category', fr: 'Recherche et filtres par disponibilité et par catégorie' },
      { en: 'Product creation, edition and deletion with SKU, category, quantity, minimum quantity and unit price', fr: 'Création, modification et suppression de produits avec SKU, catégorie, quantité, quantité minimale et prix unitaire' },
      { en: 'Stock entries and exits recorded through a single movement endpoint', fr: 'Entrées et sorties de stock enregistrées via une seule route de mouvement' },
      { en: 'Available-quantity check that refuses an output larger than the stock on hand', fr: 'Contrôle de la quantité disponible qui refuse une sortie supérieure au stock en main' },
      { en: 'Movement history with type, quantity and note, journalled in SQLite', fr: 'Historique des mouvements avec type, quantité et note, journalisé dans SQLite' },
      { en: 'Database created on first startup from schema.sql, with demo data included', fr: 'Base créée au premier démarrage à partir de schema.sql, avec les données de démonstration incluses' },
      { en: 'Interactive OpenAPI documentation generated by FastAPI at /docs', fr: 'Documentation OpenAPI interactive générée par FastAPI sur /docs' },
      { en: 'API base URL configurable through the VITE_API_URL environment variable', fr: 'URL de base de l’API configurable par la variable d’environnement VITE_API_URL' },
    ],
    technologies: [
      'React',
      'JavaScript',
      'Vite',
      'CSS',
      'FastAPI',
      'Python',
      'Uvicorn',
      'SQLite',
      'REST',
      'OpenAPI',
    ],
    github: 'https://github.com/laffet-takwa/Stockly',
    demo: '',
    featured: false,
    published: true,
    year: '2026',
    role: { en: 'Full-Stack Developer', fr: 'Développeur Full-Stack' },
    screenshotFolder: 'stockly',
    screenshots: [
      {
        id: 'inventaire-tableau-de-bord',
        caption: {
          en: 'Inventory dashboard — total value, references, units on hand and reorder alerts',
          fr: 'Tableau de bord des stocks — valeur totale, références, unités en main et alertes de réapprovisionnement',
        },
      },
      {
        id: 'modale-nouveau-produit',
        caption: {
          en: 'New product dialog — SKU, category, quantity, minimum and unit price',
          fr: 'Modale de nouveau produit — référence, catégorie, quantité, minimum et prix unitaire',
        },
      },
      {
        id: 'modale-produit-erreur-sku',
        caption: {
          en: 'Duplicate SKU refused by the service, with the field flagged',
          fr: 'Référence en double refusée par le service, avec le champ signalé',
        },
      },
      {
        id: 'modale-modifier-produit',
        caption: { en: 'Edit product dialog', fr: 'Modale de modification d’un produit' },
      },
      {
        id: 'modale-mouvement-entree',
        caption: { en: 'Stock-in movement with quantity and note', fr: 'Mouvement d’entrée avec quantité et note' },
      },
      {
        id: 'modale-mouvement-sortie',
        caption: { en: 'Stock-out movement', fr: 'Mouvement de sortie' },
      },
      {
        id: 'modale-mouvement-stock-insuffisant',
        caption: {
          en: 'Output larger than available stock refused before it can drive the inventory negative',
          fr: 'Sortie supérieure au stock disponible refusée avant de rendre l’inventaire négatif',
        },
      },
      {
        id: 'filtre-stock-faible',
        caption: { en: 'Low-stock filter', fr: 'Filtre stock faible' },
      },
      {
        id: 'filtre-categorie-papeterie',
        caption: { en: 'Filtered by category', fr: 'Filtré par catégorie' },
      },
      {
        id: 'recherche-resultats',
        caption: { en: 'Search returning matches', fr: 'Recherche renvoyant des résultats' },
      },
      {
        id: 'recherche-aucun-resultat',
        caption: { en: 'Search with no results', fr: 'Recherche sans résultat' },
      },
      {
        id: 'panneaux-repartition-et-activite',
        caption: { en: 'Distribution and activity panels', fr: 'Panneaux de répartition et d’activité' },
      },
      {
        id: 'notification-succes',
        caption: { en: 'Success notification after a movement', fr: 'Notification de succès après un mouvement' },
      },
      {
        id: 'api-indisponible',
        caption: { en: 'API unreachable — error surfaced in the interface', fr: 'API injoignable — erreur remontée dans l’interface' },
      },
      {
        id: 'largeur-1728-inventaire',
        caption: { en: 'Wide layout, 1728px', fr: 'Mise en page large, 1728 px' },
      },
      {
        id: 'tablette-inventaire',
        caption: { en: 'Tablet layout', fr: 'Mise en page tablette' },
      },
      {
        id: 'mobile-inventaire',
        caption: { en: 'Mobile inventory', fr: 'Stocks sur mobile' },
      },
      {
        id: 'mobile-inventaire-complet',
        caption: { en: 'Mobile inventory, full page', fr: 'Stocks sur mobile, page complète' },
      },
      {
        id: 'mobile-modale-produit',
        caption: { en: 'Mobile — product dialog', fr: 'Mobile — modale produit' },
      },
      {
        id: 'mobile-modale-mouvement',
        caption: { en: 'Mobile — movement dialog', fr: 'Mobile — modale mouvement' },
      },
    ],
  },

  /* ---------------------------------------------------------- 06 */
  {
    id: 'diva-store',
    title: 'DIVA STORE',
    subtitle: {
      en: 'Perfume house storefront with real photography graded to one studio look',
      fr: 'Boutique d’une maison de parfum avec photographie réelle étalonnée sur un rendu de studio unique',
    },
    category: ['Frontend', 'Full-Stack'],
    icon: 'star',
    description: {
      en: 'Front-end storefront for a fictional perfume house: catalogue of 26 fragrances, product pages, wishlist, cart, three-step checkout and a scent finder. There is no backend — payments, authentication and orders are simulated in the browser.',
      fr: 'Boutique front end pour une maison de parfum fictive : catalogue de 26 parfums, fiches produit, liste d’envies, panier, paiement en trois étapes et scent finder. Il n’y a pas de back end — les paiements, l’authentification et les commandes sont simulés dans le navigateur.',
    },
    highlight: {
      en: 'Twenty-six product photographs graded to one studio look by measurement rather than by eye, with a vector plate per olfactive family so a drawn flacon and a real frame sit on the same sweep.',
      fr: 'Vingt-six photographies produit étalonnées sur un rendu de studio unique par la mesure plutôt que par l’œil, avec une plaque vectorielle par famille olfactive pour qu’un flacon dessiné et un cadre réel reposent sur le même balayage.',
    },
    longDescription: {
      en: 'DIVA STORE is a storefront for an invented house — fictional names, no real brand packaging — built as a front-end only application, which pushes the interesting engineering to the client side. The hard part is not the cart, it is the imagery: a catalogue of 26 fragrances has to read as one studio shoot, and photographs sourced from different sets arrive with different backdrops, different colour casts and different light. Rather than eyeball that, the set was measured — backdrop luma held in a narrow L208–L255 band, #FFFFFF the most common dominant colour, mean saturation between 0.02 and 0.28, a near-black cap and warm gold hardware recurring across the frames — and each product declares a `photoTone` recording what its frame actually is, so a white-studio shot is multiplied into the house plate until its own sweep disappears into the page while a genuinely dark backdrop keeps its own. `STUDIO_PLATES` reproduces the measured band in vector form, keyed by olfactive family, so a drawn flacon sits on the same sweep as the photograph beside it, and the per-product `art` recipe of five colours and a silhouette remains the vector fallback and the tint of that plate. `CREDITS.md` records the measurement and the licence of every file, and the CC BY reference set stays out of the UI because attribution is not optional. Around the imagery sits the shop itself: five nested contexts with no state library, cart and wishlist persisted in versioned localStorage keys that stay in sync across tabs through the storage event and are validated against the catalogue on read, filtering and search written once as pure functions so the shop, the search overlay and new arrivals cannot disagree, routes lazy-loaded behind one shared motion transition, drawers that trap and restore focus, reduced motion honoured, and user-supplied strings sanitized before they reach the DOM or the document title. A Puppeteer script runs 36 end-to-end checks against a dev server as a safety net under the build.',
      fr: 'DIVA STORE est une boutique pour une maison inventée — des noms fictifs, aucun emballage de marque réelle — construite comme une application exclusivement front end, ce qui pousse l’ingénierie intéressante côté client. Le difficile n’est pas le panier, c’est l’imagerie : un catalogue de 26 parfums doit se lire comme une seule séance de studio, et des photographies issues de jeux différents arrivent avec des fonds, des dominantes colorimétriques et des éclairages différents. Plutôt que de juger cela à l’œil, le jeu a été mesuré — luminance du fond maintenue dans une bande étroite L208–L255, #FFFFFF la couleur dominante la plus fréquente, saturation moyenne entre 0,02 et 0,28, un bouchon quasi noir et une quincaillerie dorée chaude récurrents d’un cadre à l’autre — et chaque produit déclare un `photoTone` consignant ce qu’est réellement son cadre, si bien qu’une photo sur fond blanc est multipliée dans la plaque de la maison jusqu’à ce que son propre balayage se fonde dans la page, tandis qu’un vrai fond sombre conserve le sien. `STUDIO_PLATES` reproduit la bande mesurée sous forme vectorielle, indexée par famille olfactive, si bien qu’un flacon dessiné repose sur le même balayage que la photographie voisine, et la recette `art` par produit — cinq couleurs et une silhouette — demeure le repli vectoriel et la teinte de cette plaque. `CREDITS.md` consigne la mesure et la licence de chaque fichier, et le jeu de référence sous CC BY reste hors de l’interface car l’attribution n’est pas optionnelle. Autour de l’imagerie se tient la boutique : cinq contextes imbriqués sans bibliothèque d’état, panier et liste d’envies persistés dans des clés localStorage versionnées, synchronisés entre onglets via l’événement storage et validés par rapport au catalogue à la lecture, filtrage et recherche écrits une seule fois comme fonctions pures pour que la boutique, la recherche et les nouveautés ne puissent pas se contredire, routes découpées derrière une transition de mouvement partagée, tiroirs qui piègent et restaurent le focus, réduction des animations respectée, et chaînes saisies par l’utilisateur assainies avant d’atteindre le DOM ou le titre du document. Un script Puppeteer exécute 36 vérifications de bout en bout contre un serveur de développement, filet de sécurité sous le build.',
    },
    problem: {
      en: 'A catalogue is mostly images, and images are the part that goes wrong quietly. Frames shot weeks apart arrive with different backdrops and colour casts, so the grid stops reading as one shoot. Any missing file renders as a broken card, and a licence has to be answered file by file — while invented products cannot borrow real brand packaging to fill the gap.',
      fr: 'Un catalogue est surtout constitué d’images, et les images sont la partie qui échoue en silence. Des cadres shooting à des semaines d’intervalle arrivent avec des fonds et des dominantes colorimétriques différents, si bien que la grille cesse de se lire comme une seule séance. Tout fichier manquant s’affiche comme une carte cassée, et une licence doit être répondue fichier par fichier — tandis que des produits inventés ne peuvent pas emprunter les emballages de marques réelles pour combler l’écart.',
    },
    solution: {
      en: 'Treat the imagery as data and the grid as one shoot. Each product carries a photograph, an alt text and a `photoTone` recording what its frame actually is, the set is graded against a measured luma band rather than by eye, and `STUDIO_PLATES` reproduces that band in vector form per olfactive family so the drawn fallback and the photograph share one sweep. Then build the shop honestly on top of it: five nested contexts with no state library, cart and wishlist persisted in versioned localStorage keys that stay in sync across tabs and are validated against the catalogue on read, and filtering, sorting and search written once as pure functions so the shop, the search overlay and new arrivals cannot disagree.',
      fr: 'Traiter l’imagerie comme une donnée et la grille comme une seule séance. Chaque produit porte une photographie, un texte alternatif et un `photoTone` consignant ce qu’est réellement son cadre, le jeu est étalonné sur une bande de luminance mesurée plutôt qu’à l’œil, et `STUDIO_PLATES` reproduit cette bande sous forme vectorielle par famille olfactive si bien que le repli dessiné et la photographie partagent le même balayage. Construire ensuite la boutique honnêtement par-dessus : cinq contextes imbriqués sans bibliothèque d’état, panier et liste d’envies persistés dans des clés localStorage versionnées qui restent synchronisés entre onglets et sont validés par rapport au catalogue à la lecture, et filtrage, tri et recherche écrits une seule fois comme fonctions pures pour que la boutique, la recherche et les nouveautés ne puissent pas se contredire.',
    },
    architecture: {
      en: 'React 19 single-page application (Vite 8, React Router 7, Tailwind CSS 4, framer-motion, lucide-react) → five nested context providers (Toast, Wishlist, Cart, Order, UI) persisted in versioned localStorage keys and synchronized across tabs through the storage event → a 26-product catalogue in a typed data module exposing pure filter, sort and search functions → product photography served from public/images/products, composed onto a vector studio plate keyed by olfactive family, with a per-product SVG bottle recipe as the fallback frame. No server: checkout and order confirmation run in the browser.',
      fr: 'Application monopage React 19 (Vite 8, React Router 7, Tailwind CSS 4, framer-motion, lucide-react) → cinq fournisseurs de contexte imbriqués (Toast, Wishlist, Cart, Order, UI) persistés dans des clés localStorage versionnées et synchronisés entre onglets via l’événement storage → un catalogue de 26 produits dans un module de données typé exposant des fonctions pures de filtre, tri et recherche → la photographie produit servie depuis public/images/products, composée sur une plaque vectorielle indexée par famille olfactive, avec une recette SVG de flacon par produit comme cadre de repli. Aucun serveur : le paiement et la confirmation de commande s’exécutent dans le navigateur.',
    },
    architectureFlow: [
      'React 19 SPA — Vite 8 · React Router 7',
      'Contexts — Toast → Wishlist → Cart → Order → UI',
      'localStorage — diva.cart.v1 · diva.wishlist.v1',
      'Catalogue — 26 products · pure filter / sort / search',
      'Photography graded to one measured studio look',
    ],
    features: [
      { en: 'Catalogue of 26 fragrances — 11 women, 8 men, 7 unisex — each with a scent pyramid and a 30/50/100 ml price ladder', fr: 'Catalogue de 26 parfums — 11 femme, 8 homme, 7 unisexe — chacun avec sa pyramide olfactive et son palier de prix 30/50/100 ml' },
      { en: 'Product pages with a four-view gallery built from the photograph, the studio plate and the drawn bottle as fallback', fr: 'Fiches produit avec une galerie à quatre vues construite à partir de la photographie, de la plaque de studio et du flacon dessiné en repli' },
      { en: 'Product photography graded against a measured luma band — L208–L255, #FFFFFF dominant, saturation 0.02–0.28 — with every file’s measurement and licence status recorded in CREDITS.md', fr: 'Photographie produit étalonnée sur une bande de luminance mesurée — L208–L255, #FFFFFF dominante, saturation 0,02–0,28 — avec la mesure et le statut de licence de chaque fichier consignés dans CREDITS.md' },
      { en: 'A `photoTone` per product, so a white-studio shot is multiplied into the house plate while a genuinely dark backdrop keeps its own', fr: 'Un `photoTone` par produit, pour qu’une photo sur fond blanc soit multipliée dans la plaque de la maison tandis qu’un vrai fond sombre conserve le sien' },
      { en: 'Vector studio plates keyed by olfactive family, so a drawn flacon and a photographed one sit on the same sweep', fr: 'Plaques de studio vectorielles indexées par famille olfactive, pour qu’un flacon dessiné et un flacon photographié reposent sur le même balayage' },
      { en: 'Puppeteer smoke test driving 36 end-to-end checks — filters, product page, cart, checkout, search, finder — against a running dev server', fr: 'Test de fumée Puppeteer exécutant 36 vérifications de bout en bout — filtres, fiche produit, panier, paiement, recherche, finder — contre un serveur de développement actif' },
      { en: 'Wishlist and cart drawer with quantity stepper and order summary', fr: 'Liste d’envies et tiroir panier avec sélecteur de quantité et récapitulatif de commande' },
      { en: 'Three-step checkout and order confirmation simulated in the browser', fr: 'Paiement en trois étapes et confirmation de commande simulés dans le navigateur' },
      { en: 'Scent finder matching a fragrance by notes and intensity', fr: 'Scent finder associant un parfum à des notes et à une intensité' },
      { en: 'Filters, sorting and search implemented once as pure functions and shared by the shop, the search overlay and new arrivals', fr: 'Filtres, tri et recherche implémentés une seule fois comme fonctions pures et partagés par la boutique, la recherche et les nouveautés' },
      { en: 'Cart and wishlist persisted in localStorage, synchronized across tabs and validated against the catalogue on read', fr: 'Panier et wishlist persistés dans localStorage, synchronisés entre onglets et validés par rapport au catalogue à la lecture' },
      { en: 'Five nested contexts with no state library, behind hooks that throw outside their provider', fr: 'Cinq contextes imbriqués sans bibliothèque d’état, derrière des hooks qui lèvent une erreur hors de leur fournisseur' },
      { en: 'Code-split routes: every page except the home page is lazy-loaded behind a skeleton with one shared motion transition', fr: 'Routes découpées : toutes les pages sauf l’accueil sont chargées à la demande derrière un squelette, avec une transition de mouvement partagée' },
      { en: 'Accessibility: skip link, focus-trapped drawers and modals, arrow-key gallery and the scent pyramid duplicated as a screen-reader list', fr: 'Accessibilité : lien d’évitement, tiroirs et modales avec piège de focus, galerie navigable aux flèches et pyramide olfactive dupliquée en liste pour lecteur d’écran' },
      { en: 'Client-side SEO per route and sanitization of every user-supplied string before it reaches the DOM', fr: 'SEO côté client pour chaque route et assainissement de toute chaîne saisie par l’utilisateur avant injection dans le DOM' },
    ],
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'React Router',
      'Tailwind CSS',
      'framer-motion',
      'lucide-react',
      'SVG',
      'Oxlint',
      'Puppeteer',
    ],
    github: 'https://github.com/laffet-takwa/diva-perfume-ecommerce',
    demo: 'https://diva-perfume-ecommerce-src.vercel.app/',
    featured: true,
    published: true,
    year: '2026',
    role: { en: 'Front-End Developer', fr: 'Développeur Front-End' },
  },

  /* ---------------------------------------------------------- 07 */
  {
    id: 'nexora-erp',
    title: 'Nexora ERP',
    subtitle: {
      en: 'CRM, sales, finance and inventory on a modular ERP',
      fr: 'CRM, ventes, finance et stocks sur un ERP modulaire',
    },
    category: ['ERP', 'Full-Stack', 'Backend'],
    icon: 'database',
    description: {
      en: 'A modular ERP MVP pairing a Laravel 12 REST API with a React front end: customers and catalog, orders with constrained status transitions, invoices generated from confirmed orders, inventory movements, reports, audit logs and administration.',
      fr: 'Un MVP d’ERP modulaire associant une API REST Laravel 12 à un front end React : clients et catalogue, commandes à transitions de statut contraintes, factures générées à partir des commandes confirmées, mouvements de stock, rapports, journaux d’audit et administration.',
    },
    highlight: {
      en: 'TND amounts stored as DECIMAL(12,3), stock deducted only on completion, and every privileged action written to an audit log.',
      fr: 'Montants en TND stockés en DECIMAL(12,3), stock déduit uniquement à la clôture, et chaque action privilégiée consignée dans un journal d’audit.',
    },
    longDescription: {
      en: 'Nexora covers the operational chain a small company actually runs on, from the first customer call to the paid invoice. Public registration always creates an employee and only an administrator can assign elevated roles, so privilege escalation cannot happen through the API itself. Order status changes go through constrained transitions rather than free-form updates, and stock is deducted when an order is completed rather than when it is created — otherwise a cancelled order would leave phantom shortages. Invoices are generated from confirmed orders and payments are checked against locked invoice balances so a payment cannot be recorded twice. Amounts use DECIMAL(12,3) to keep TND precision intact, order and invoice numbers are generated server-side, and a scheduled job flags overdue invoices daily. Inventory movements are typed: in and out use a quantity delta, an adjustment sets a new target stock including zero, and a transfer records a move between two named locations without touching total on-hand stock.',
      fr: 'Nexora couvre la chaîne opérationnelle qu’une petite entreprise déroule réellement, du premier appel client à la facture payée. L’inscription publique crée toujours un employé et seul un administrateur peut attribuer des rôles élevés : l’élévation de privilèges ne peut donc pas passer par l’API elle-même. Les changements de statut des commandes suivent des transitions contraintes plutôt que des mises à jour libres, et le stock est déduit à la clôture d’une commande plutôt qu’à sa création — sinon une commande annulée laisserait des pénuries fantômes. Les factures sont générées à partir des commandes confirmées et les paiements sont contrôlés par rapport à des soldes de facture verrouillés, afin qu’un paiement ne puisse pas être enregistré deux fois. Les montants utilisent DECIMAL(12,3) pour préserver la précision du TND, les numéros de commande et de facture sont générés côté serveur, et une tâche planifiée signale chaque jour les factures échues. Les mouvements de stock sont typés : « in » et « out » utilisent un delta de quantité, un ajustement fixe un stock cible incluant zéro, et un transfert enregistre un déplacement entre deux emplacements nommés sans modifier le stock total en main.',
    },
    problem: {
      en: 'CRM, invoicing and stock usually end up as three disconnected tools that disagree with each other. Sales confirm an order, accounting issues an invoice by hand, and nobody notices the warehouse is already out of the product being sold.',
      fr: 'Le CRM, la facturation et le stock finissent souvent par être trois outils déconnectés qui se contredisent. Les ventes confirment une commande, la comptabilité édite une facture à la main, et personne ne remarque que le produit vendu est déjà en rupture dans l’entrepôt.',
    },
    solution: {
      en: 'Model the whole chain in one Laravel application behind a versioned REST API — order, invoice, payment and stock movement as linked records — and expose it through a React front end, with role-gated administration and an audit trail for every privileged action.',
      fr: 'Modéliser toute la chaîne dans une seule application Laravel derrière une API REST versionnée — commande, facture, paiement et mouvement de stock comme enregistrements liés — et l’exposer via un front end React, avec une administration à accès par rôle et une piste d’audit pour chaque action privilégiée.',
    },
    architecture: {
      en: 'React 19 + TypeScript (Vite) → REST API under /api/v1 → Laravel 12 controllers, form requests and services → Eloquent ORM → MySQL 8, authenticated with Laravel Sanctum bearer tokens and covered by PHPUnit feature tests running against an in-memory SQLite database.',
      fr: 'React 19 + TypeScript (Vite) → API REST sous /api/v1 → contrôleurs, form requests et services Laravel 12 → ORM Eloquent → MySQL 8, authentifiés par des jetons bearer Laravel Sanctum et couverts par des tests fonctionnels PHPUnit exécutés sur une base SQLite en mémoire.',
    },
    architectureFlow: [
      'React 19 + TypeScript client — Vite',
      'REST API /api/v1 — Laravel 12 · Sanctum',
      'Domain services — orders · invoices · inventory',
      'Eloquent ORM + migrations',
      'MySQL 8 · audit log',
    ],
    features: [
      { en: 'Employee-only public registration with admin-assigned roles', fr: 'Inscription publique limitée aux employés, rôles attribués par un administrateur' },
      { en: 'CRM and catalog with search, filtering and pagination', fr: 'CRM et catalogue avec recherche, filtrage et pagination' },
      { en: 'Orders with constrained status transitions', fr: 'Commandes avec transitions de statut contraintes' },
      { en: 'Stock deducted on order completion, not on creation', fr: 'Stock déduit à la clôture de la commande, pas à sa création' },
      { en: 'Invoices generated from confirmed orders with server-side numbering', fr: 'Factures générées à partir des commandes confirmées avec numérotation côté serveur' },
      { en: 'Payments checked against locked invoice balances', fr: 'Paiements contrôlés par rapport à des soldes de facture verrouillés' },
      { en: 'Typed inventory movements: in, out, adjustment and inter-location transfer', fr: 'Mouvements de stock typés : entrée, sortie, ajustement et transfert inter-emplacements' },
      { en: 'Stock history and low-stock reporting', fr: 'Historique du stock et rapports de stock bas' },
      { en: 'Dashboard with sales, product, customer and finance reports', fr: 'Tableau de bord avec rapports ventes, produits, clients et finance' },
      { en: 'User and role administration with audit logs', fr: 'Administration des utilisateurs et des rôles avec journaux d’audit' },
      { en: 'Administrator-managed settings grouped by key/value', fr: 'Paramètres administrés par groupe clé/valeur' },
      { en: 'In-app notifications with read state', fr: 'Notifications in-app avec état de lecture' },
      { en: 'Daily scheduled job flagging overdue invoices', fr: 'Tâche planifiée quotidienne signalant les factures échues' },
    ],
    technologies: [
      'PHP',
      'Laravel 12',
      'Laravel Sanctum',
      'MySQL',
      'Eloquent ORM',
      'React',
      'TypeScript',
      'Vite',
      'REST API',
      'PHPUnit',
    ],
    github: 'https://github.com/laffet-takwa/Nexora-ERP',
    demo: '',
    featured: false,
    published: true,
    year: '2026',
    role: { en: 'Full-Stack Developer', fr: 'Développeur Full-Stack' },
    screenshotFolder: 'nexora-erp',
    screenshots: [
      {
        id: 'login',
        caption: { en: 'Sign in', fr: 'Connexion' },
        src: '/projects/nexora-erp/01-login.webp',
      },
      {
        id: 'dashboard',
        caption: {
          en: 'Dashboard — sales, stock and receivables at a glance',
          fr: 'Tableau de bord — ventes, stock et créances en un coup d’œil',
        },
        src: '/projects/nexora-erp/02-dashboard.webp',
      },
      {
        id: 'customers',
        caption: { en: 'CRM — customer records with search and pagination', fr: 'CRM — fiches clients avec recherche et pagination' },
        src: '/projects/nexora-erp/03-customers.webp',
      },
      {
        id: 'products',
        caption: { en: 'Catalog with stock levels per product', fr: 'Catalogue avec le niveau de stock par produit' },
        src: '/projects/nexora-erp/04-products.webp',
      },
      {
        id: 'inventory',
        caption: {
          en: 'Inventory — on-hand stock and movement history',
          fr: 'Stocks — quantité en main et historique des mouvements',
        },
        src: '/projects/nexora-erp/05-inventory.webp',
      },
      {
        id: 'orders',
        caption: {
          en: 'Orders with constrained status transitions',
          fr: 'Commandes avec transitions de statut contraintes',
        },
        src: '/projects/nexora-erp/06-orders.webp',
      },
      {
        id: 'invoices',
        caption: {
          en: 'Invoices generated from confirmed orders',
          fr: 'Factures générées à partir des commandes confirmées',
        },
        src: '/projects/nexora-erp/07-invoices.webp',
      },
      {
        id: 'payments',
        caption: {
          en: 'Payments checked against locked invoice balances',
          fr: 'Paiements contrôlés par rapport aux soldes de facture verrouillés',
        },
        src: '/projects/nexora-erp/08-payments.webp',
      },
      {
        id: 'reports',
        caption: {
          en: 'Sales, product, customer and finance reports',
          fr: 'Rapports ventes, produits, clients et finance',
        },
        src: '/projects/nexora-erp/09-reports.webp',
      },
      {
        id: 'users',
        caption: { en: 'Employee directory with role assignment', fr: 'Annuaire des employés avec attribution des rôles' },
        src: '/projects/nexora-erp/10-users.webp',
      },
      {
        id: 'roles',
        caption: { en: 'Role-based access administration', fr: 'Administration des accès par rôle' },
        src: '/projects/nexora-erp/11-roles.webp',
      },
      {
        id: 'audit-logs',
        caption: {
          en: 'Audit log of every privileged action',
          fr: 'Journal d’audit de chaque action privilégiée',
        },
        src: '/projects/nexora-erp/12-audit-logs.webp',
      },
      {
        id: 'notifications',
        caption: { en: 'In-app notifications with read state', fr: 'Notifications in-app avec état de lecture' },
        src: '/projects/nexora-erp/13-notifications.webp',
      },
      {
        id: 'settings',
        caption: { en: 'Administrator-managed settings by key/value', fr: 'Paramètres administrés par groupe clé/valeur' },
        src: '/projects/nexora-erp/14-settings.webp',
      },
      {
        id: 'dashboard-dark',
        caption: { en: 'Dark theme on the reporting dashboard', fr: 'Thème sombre sur le tableau de bord' },
        src: '/projects/nexora-erp/15-dashboard-dark.webp',
      },
      {
        id: 'dark-login',
        caption: { en: 'Sign in, dark theme', fr: 'Connexion, thème sombre' },
        src: '/projects/nexora-erp/login.webp',
      },
      {
        id: 'dark-dashboard',
        caption: { en: 'Reporting dashboard, dark theme', fr: 'Tableau de bord de reporting, thème sombre' },
        src: '/projects/nexora-erp/dashboard.webp',
      },
      {
        id: 'dark-dashboard-alt',
        caption: { en: 'Reporting dashboard, alternate dark capture', fr: 'Tableau de bord de reporting, autre capture sombre' },
        src: '/projects/nexora-erp/dashboard-dark.webp',
      },
      {
        id: 'dark-customers',
        caption: { en: 'CRM records, dark theme', fr: 'Fiches clients, thème sombre' },
        src: '/projects/nexora-erp/customers.webp',
      },
      {
        id: 'dark-products',
        caption: { en: 'Catalog, dark theme', fr: 'Catalogue, thème sombre' },
        src: '/projects/nexora-erp/products.webp',
      },
      {
        id: 'dark-products-alt',
        caption: { en: 'Catalog, alternate dark capture', fr: 'Catalogue, autre capture sombre' },
        src: '/projects/nexora-erp/products-dark.webp',
      },
      {
        id: 'dark-inventory',
        caption: { en: 'Inventory, dark theme', fr: 'Stocks, thème sombre' },
        src: '/projects/nexora-erp/inventory.webp',
      },
      {
        id: 'dark-orders',
        caption: { en: 'Orders, dark theme', fr: 'Commandes, thème sombre' },
        src: '/projects/nexora-erp/orders.webp',
      },
      {
        id: 'dark-invoices',
        caption: { en: 'Invoices, dark theme', fr: 'Factures, thème sombre' },
        src: '/projects/nexora-erp/invoices.webp',
      },
      {
        id: 'dark-payments',
        caption: { en: 'Payments, dark theme', fr: 'Paiements, thème sombre' },
        src: '/projects/nexora-erp/payments.webp',
      },
      {
        id: 'dark-reports',
        caption: { en: 'Reports, dark theme', fr: 'Rapports, thème sombre' },
        src: '/projects/nexora-erp/reports.webp',
      },
      {
        id: 'dark-users',
        caption: { en: 'Users, dark theme', fr: 'Utilisateurs, thème sombre' },
        src: '/projects/nexora-erp/users.webp',
      },
      {
        id: 'dark-roles',
        caption: { en: 'Roles and permissions, dark theme', fr: 'Rôles et permissions, thème sombre' },
        src: '/projects/nexora-erp/roles.webp',
      },
      {
        id: 'dark-audit-logs',
        caption: { en: 'Audit log, dark theme', fr: 'Journal d’audit, thème sombre' },
        src: '/projects/nexora-erp/audit-logs.webp',
      },
      {
        id: 'dark-notifications',
        caption: { en: 'Notifications, dark theme', fr: 'Notifications, thème sombre' },
        src: '/projects/nexora-erp/notifications.webp',
      },
      {
        id: 'dark-settings',
        caption: { en: 'Settings, dark theme', fr: 'Paramètres, thème sombre' },
        src: '/projects/nexora-erp/settings.webp',
      },
    ],
  },

  /* ---------------------------------------------------------- 08 */
  {
    id: 'shopsphere',
    title: 'ShopSphere',
    subtitle: {
      en: 'Cloud-native microservices with event-driven inventory',
      fr: 'Microservices cloud-native avec gestion d’inventaire pilotée par les événements',
    },
    category: ['Full-Stack', 'Microservices', 'Cloud-Native'],
    icon: 'shopping-cart',
    description: {
      en: 'Cloud-native e-commerce platform built with independently deployable Spring Boot services behind an API Gateway. The Vue 3 frontend communicates with real REST APIs, while Kafka events coordinate inventory and simulated payment workflows.',
      fr: 'Plateforme e-commerce cloud-native construite avec des services Spring Boot déployables indépendamment derrière une API Gateway. Le front end Vue 3 communique avec de vraies API REST, tandis que les événements Kafka coordonnent l’inventaire et les workflows de paiement simulés.',
    },
    highlight: {
      en: 'Distributed systems and event-driven architecture.',
      fr: 'Systèmes distribués et architecture pilotée par les événements.',
    },
    longDescription: {
      en: 'ShopSphere splits the e-commerce domain into services that can be deployed on their own: a Vue 3 client consumes the REST APIs exposed through an API Gateway, and each backend service owns its own data. Kafka carries the state changes between them, so an order can trigger an inventory reservation and a payment workflow without a synchronous call chain. Everything is packaged with Docker so each service stays reproducible.',
      fr: 'ShopSphere découpe le domaine e-commerce en services déployables indépendamment : un client Vue 3 consomme les API REST exposées via une API Gateway, et chaque service backend possède ses données. Kafka transporte les changements d’état entre eux, si bien qu’une commande peut déclencher une réservation de stock et un workflow de paiement sans chaîne d’appels synchrones. L’ensemble est conteneurisé avec Docker pour rester reproductible.',
    },
    problem: {
      en: 'Catalog, cart, inventory and orders have different scaling and release needs. In one application they ship together and fail together.',
      fr: 'Le catalogue, le panier, le stock et les commandes ont des besoins de mise à l’échelle et de livraison différents. Dans une seule application, ils sont livrés ensemble et tombent ensemble.',
    },
    solution: {
      en: 'Deploy each capability as an independent Spring Boot service behind an API Gateway, exchange state changes over Kafka topics and expose REST APIs consumed by the Vue 3 client. Package every service with Docker.',
      fr: 'Déployer chaque fonctionnalité comme un service Spring Boot indépendant derrière une API Gateway, échanger les changements d’état via des topics Kafka et exposer des API REST consommées par le client Vue 3. Empaqueter chaque service avec Docker.',
    },
    architecture: {
      en: 'Vue 3 client → API Gateway → independent Spring Boot services (catalog, cart, orders, inventory, payment) → PostgreSQL per service, Kafka between services, Docker packaging.',
      fr: 'Client Vue 3 → API Gateway → services Spring Boot indépendants (catalogue, panier, commandes, stock, paiement) → PostgreSQL par service, Kafka entre services, packaging Docker.',
    },
    architectureFlow: [
      'Vue 3 client',
      'API Gateway',
      'Spring Boot services • catalog • cart • orders • inventory • payment',
      'Kafka event backbone',
      'PostgreSQL + Docker',
    ],
    features: [
      { en: 'Product catalog and search', fr: 'Catalogue produits et recherche' },
      { en: 'Shopping cart', fr: 'Panier d’achat' },
      { en: 'Order processing', fr: 'Traitement des commandes' },
      { en: 'Inventory coordination over Kafka', fr: 'Coordination du stock via Kafka' },
      { en: 'Simulated payment workflow', fr: 'Workflow de paiement simulé' },
      { en: 'API Gateway routing', fr: 'Routage via API Gateway' },
      { en: 'Dockerized independent services', fr: 'Services indépendants conteneurisés' },
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Cloud',
      'Vue 3',
      'REST',
      'API Gateway',
      'Kafka',
      'Docker',
      'Microservices',
    ],
    github: 'https://github.com/laffet-takwa/shopsphere-ecommerce',
    demo: '',
    featured: true,
    published: true,
    year: '2025',
    role: { en: 'Full-Stack / Microservices Developer', fr: 'Développeur Full-Stack / Microservices' },
    screenshotFolder: 'shopsphere-ecommerce',
    screenshots: [
      {
        id: 'home',
        caption: { en: 'Storefront home', fr: 'Page d’accueil de la boutique' },
        src: '/projects/shopsphere-ecommerce/01-home.webp',
      },
      {
        id: 'catalog',
        caption: { en: 'Product catalog browsing', fr: 'Navigation du catalogue produits' },
        src: '/projects/shopsphere-ecommerce/02-catalog.webp',
      },
      {
        id: 'product',
        caption: { en: 'Product detail page', fr: 'Page de détail produit' },
        src: '/projects/shopsphere-ecommerce/03-product-detail.webp',
      },
      {
        id: 'login',
        caption: { en: 'Sign in', fr: 'Connexion' },
        src: '/projects/shopsphere-ecommerce/05-login.webp',
      },
      {
        id: 'register',
        caption: { en: 'Registration', fr: 'Inscription' },
        src: '/projects/shopsphere-ecommerce/06-register.webp',
      },
      {
        id: 'cart',
        caption: { en: 'Shopping cart', fr: 'Panier d’achat' },
        src: '/projects/shopsphere-ecommerce/09-cart.webp',
      },
      {
        id: 'checkout',
        caption: { en: 'Checkout flow', fr: 'Parcours de paiement' },
        src: '/projects/shopsphere-ecommerce/10-checkout.webp',
      },
      {
        id: 'confirmation',
        caption: { en: 'Order confirmation', fr: 'Confirmation de commande' },
        src: '/projects/shopsphere-ecommerce/11-confirmation.webp',
      },
      {
        id: 'orders',
        caption: { en: 'Order history', fr: 'Historique des commandes' },
        src: '/projects/shopsphere-ecommerce/12-orders.webp',
      },
      {
        id: 'order-detail',
        caption: { en: 'Order detail and status', fr: 'Détail et statut d’une commande' },
        src: '/projects/shopsphere-ecommerce/13-order-detail.webp',
      },
      {
        id: 'account',
        caption: { en: 'Customer account', fr: 'Compte client' },
        src: '/projects/shopsphere-ecommerce/14-account.webp',
      },
      {
        id: 'notifications',
        caption: { en: 'In-app notifications', fr: 'Notifications dans l’application' },
        src: '/projects/shopsphere-ecommerce/15-notifications.webp',
      },
      {
        id: 'admin-dashboard',
        caption: { en: 'Admin dashboard — revenue, orders and low stock', fr: 'Tableau de bord admin — chiffre d’affaires, commandes et stock bas' },
        src: '/projects/shopsphere-ecommerce/16-admin-dashboard.webp',
      },
      {
        id: 'admin-products',
        caption: { en: 'Admin product catalogue', fr: 'Catalogue produits côté admin' },
        src: '/projects/shopsphere-ecommerce/17-admin-products.webp',
      },
      {
        id: 'admin-analytics',
        caption: { en: 'Admin analytics', fr: 'Analytique admin' },
        src: '/projects/shopsphere-ecommerce/21-admin-analytics.webp',
      },
      {
        id: 'mobile-home',
        caption: { en: 'Mobile storefront', fr: 'Boutique sur mobile' },
        src: '/projects/shopsphere-ecommerce/23-mobile-home.webp',
      },
      {
        id: 'mobile-catalog',
        caption: { en: 'Mobile catalog', fr: 'Catalogue sur mobile' },
        src: '/projects/shopsphere-ecommerce/24-mobile-catalog.webp',
      },
      {
        id: 'mobile-product',
        caption: { en: 'Mobile product page', fr: 'Page produit sur mobile' },
        src: '/projects/shopsphere-ecommerce/25-mobile-product.webp',
      },
      {
        id: 'mobile-checkout',
        caption: { en: 'Mobile checkout', fr: 'Paiement sur mobile' },
        src: '/projects/shopsphere-ecommerce/27-mobile-checkout.webp',
      },
      {
        id: 'tablet-home',
        caption: { en: 'Tablet layout', fr: 'Mise en page tablette' },
        src: '/projects/shopsphere-ecommerce/32-tablet-home.webp',
      },
      {
        id: 'about',
        caption: { en: 'About page', fr: 'Page à propos' },
        src: '/projects/shopsphere-ecommerce/04-about.webp',
      },
      {
        id: 'cart-empty',
        caption: { en: 'Empty cart state', fr: 'Panier vide' },
        src: '/projects/shopsphere-ecommerce/07-cart-empty.webp',
      },
      {
        id: 'not-found',
        caption: { en: '404 — route not found', fr: '404 — route introuvable' },
        src: '/projects/shopsphere-ecommerce/08-not-found.webp',
      },
      {
        id: 'admin-orders',
        caption: { en: 'Admin — order management', fr: 'Admin — gestion des commandes' },
        src: '/projects/shopsphere-ecommerce/18-admin-orders.webp',
      },
      {
        id: 'admin-inventory',
        caption: { en: 'Admin — inventory levels', fr: 'Admin — niveaux de stock' },
        src: '/projects/shopsphere-ecommerce/19-admin-inventory.webp',
      },
      {
        id: 'admin-customers',
        caption: { en: 'Admin — customer records', fr: 'Admin — fiches clients' },
        src: '/projects/shopsphere-ecommerce/20-admin-customers.webp',
      },
      {
        id: 'admin-settings',
        caption: { en: 'Admin — storefront settings', fr: 'Admin — paramètres de la boutique' },
        src: '/projects/shopsphere-ecommerce/22-admin-settings.webp',
      },
      {
        id: 'mobile-cart',
        caption: { en: 'Mobile — cart', fr: 'Mobile — panier' },
        src: '/projects/shopsphere-ecommerce/26-mobile-cart.webp',
      },
      {
        id: 'mobile-orders',
        caption: { en: 'Mobile — order history', fr: 'Mobile — historique des commandes' },
        src: '/projects/shopsphere-ecommerce/28-mobile-orders.webp',
      },
      {
        id: 'mobile-account',
        caption: { en: 'Mobile — account', fr: 'Mobile — compte' },
        src: '/projects/shopsphere-ecommerce/29-mobile-account.webp',
      },
      {
        id: 'mobile-admin',
        caption: { en: 'Mobile — admin dashboard', fr: 'Mobile — tableau de bord admin' },
        src: '/projects/shopsphere-ecommerce/30-mobile-admin.webp',
      },
      {
        id: 'tablet-catalog',
        caption: { en: 'Tablet — catalog browsing', fr: 'Tablette — navigation du catalogue' },
        src: '/projects/shopsphere-ecommerce/31-tablet-catalog.webp',
      },
    ],
  },

  /* ---------------------------------------------------------- 09 */
  {
    id: 'logistics-platform',
    title: 'Logistics & Delivery Management Platform',
    subtitle: {
      en: 'Event-driven logistics across distributed services',
      fr: 'Logistique pilotée par les événements sur des services distribués',
    },
    category: ['Full-Stack', 'Microservices', 'Distributed Systems'],
    icon: 'layers',
    description: {
      en: 'Enterprise logistics platform designed to manage customers, orders, drivers, vehicles, warehouses, deliveries and real-time tracking.',
      fr: 'Plateforme logistique d’entreprise conçue pour gérer les clients, les commandes, les chauffeurs, les véhicules, les entrepôts, les livraisons et le suivi en temps réel.',
    },
    highlight: {
      en: 'Event-driven logistics and distributed architecture.',
      fr: 'Logistique pilotée par les événements et architecture distribuée.',
    },
    longDescription: {
      en: 'A logistics platform built around the operational reality of delivery: customers, orders, drivers, vehicles and warehouses each live behind their own service, and deliveries emit events that other services consume to update tracking and planning. The frontend stays a regular REST client, while Kafka decouples the parts of the chain that must not fail together — a late delivery updates tracking without blocking order management.',
      fr: 'Une plateforme logistique construite autour de la réalité opérationnelle de la livraison : clients, commandes, chauffeurs, véhicules et entrepôts résident chacun derrière leur service, et les livraisons émettent des événements consommés par d’autres services pour mettre à jour le suivi et la planification. Le front end reste un client REST classique, tandis que Kafka découple les maillons de la chaîne qui ne doivent pas échouer ensemble — une livraison retardée met à jour le suivi sans bloquer la gestion des commandes.',
    },
    problem: {
      en: 'Logistics operations span many entities that change independently, and a driver update must reach tracking, planning and customers without a long synchronous call chain.',
      fr: 'Les opérations logistiques couvrent de nombreuses entités qui évoluent indépendamment, et une mise à jour de chauffeur doit atteindre le suivi, la planification et les clients sans une longue chaîne d’appels synchrones.',
    },
    solution: {
      en: 'Model each operational entity as an independent Spring Boot service behind an API Gateway, publish delivery events on Kafka topics and let tracking and planning consume them asynchronously. Vue.js provides the operational front end.',
      fr: 'Modéliser chaque entité opérationnelle comme un service Spring Boot indépendant derrière une API Gateway, publier les événements de livraison sur des topics Kafka et laisser le suivi et la planification les consommer de manière asynchrone. Vue.js fournit le front end opérationnel.',
    },
    architecture: {
      en: 'Vue.js client → API Gateway → Spring Boot services (customers, orders, drivers, vehicles, warehouses, deliveries) → Kafka for tracking and planning events, PostgreSQL per service.',
      fr: 'Client Vue.js → API Gateway → services Spring Boot (clients, commandes, chauffeurs, véhicules, entrepôts, livraisons) → Kafka pour les événements de suivi et de planification, PostgreSQL par service.',
    },
    architectureFlow: [
      'Vue.js operational client',
      'API Gateway',
      'Spring Boot services • customers • orders • drivers • vehicles • warehouses',
      'Kafka delivery events',
      'Real-time tracking + PostgreSQL',
    ],
    features: [
      { en: 'Customer management', fr: 'Gestion des clients' },
      { en: 'Order planning', fr: 'Planification des commandes' },
      { en: 'Driver and vehicle assignment', fr: 'Affectation des chauffeurs et des véhicules' },
      { en: 'Warehouse management', fr: 'Gestion des entrepôts' },
      { en: 'Delivery tracking', fr: 'Suivi des livraisons' },
      { en: 'Real-time status over Kafka events', fr: 'Statut temps réel via les événements Kafka' },
      { en: 'API Gateway routing', fr: 'Routage via API Gateway' },
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'Vue.js',
      'API Gateway',
      'Kafka',
      'REST',
      'Microservices',
      'PostgreSQL',
    ],
    github: '',
    demo: '',
    featured: true,
    published: true,
    year: '2025',
    role: { en: 'Full-Stack / Distributed Systems Developer', fr: 'Développeur Full-Stack / Systèmes distribués' },
  },

  /* ---------------------------------------------------------- 10 */
  {
    id: 'odoo-invoice-automation',
    title: 'Odoo Invoice Automation',
    subtitle: { en: 'PFE — IT Koncept', fr: 'PFE — IT Koncept' },
    category: ['Automation', 'ERP', 'Backend'],
    icon: 'receipt',
    description: {
      en: 'Invoice automation solution built on Odoo 14: documents are read with OCR, key fields are extracted and structured records are written into the ERP database automatically.',
      fr: 'Solution d’automatisation de factures fondée sur Odoo 14 : les documents sont lus par OCR, les champs clés sont extraits et les enregistrements structurés sont écrits automatiquement dans la base de l’ERP.',
    },
    highlight: {
      en: 'Automated invoice processing and OCR-based information extraction.',
      fr: 'Traitement automatisé des factures et extraction d’informations par OCR.',
    },
    longDescription: {
      en: 'A graduation project delivered at IT Koncept that removes manual data entry from invoice processing. Invoices are read with OCR, key fields are extracted with a document-understanding service, and the results are written into the Odoo database through the platform’s ORM, so accounting records are created automatically and consistently. The workflow was modelled in UML during requirements analysis and delivered with Scrum.',
      fr: 'Un projet de fin d’études réalisé chez IT Koncept qui supprime la saisie manuelle lors du traitement des factures. Les factures sont lues par OCR, les champs clés sont extraits via un service de compréhension documentaire, et les résultats sont écrits dans la base Odoo via l’ORM de la plateforme, afin que les enregistrements comptables soient créés automatiquement et de manière cohérente. Le workflow a été modélisé en UML lors de l’analyse des besoins et livré en Scrum.',
    },
    problem: {
      en: 'Invoice entry is manual, repetitive and error-prone. Typing each document into the accounting system consumes time and introduces transcription mistakes that surface much later.',
      fr: 'La saisie des factures est manuelle, répétitive et source d’erreurs. Taper chaque document dans le système comptable consomme du temps et introduit des erreurs de transcription détectées bien plus tard.',
    },
    solution: {
      en: 'Combine OCR with a document-understanding service to extract invoice fields, validate them, and push structured records into Odoo automatically through its ORM on PostgreSQL.',
      fr: 'Combiner l’OCR avec un service de compréhension documentaire pour extraire les champs de la facture, les valider, et pousser automatiquement les enregistrements structurés dans Odoo via son ORM sur PostgreSQL.',
    },
    architecture: {
      en: 'Scanned or digital invoice → OCR extraction → structured fields → Odoo ORM → PostgreSQL records, with the customization expressed in Python and XML configuration.',
      fr: 'Facture scannée ou numérique → extraction OCR → champs structurés → ORM Odoo → enregistrements PostgreSQL, la personnalisation étant exprimée en Python et en configuration XML.',
    },
    architectureFlow: ['Invoice document', 'OCR (Mindee)', 'Extracted fields', 'Odoo ORM (Python)', 'PostgreSQL'],
    features: [
      { en: 'Invoice document extraction', fr: 'Extraction du document de facture' },
      { en: 'OCR-based field capture', fr: 'Capture des champs par OCR' },
      { en: 'Transformation into structured records', fr: 'Transformation en enregistrements structurés' },
      { en: 'Odoo 14 module customization', fr: 'Personnalisation de modules Odoo 14' },
      { en: 'UML-modelled workflow', fr: 'Workflow modélisé en UML' },
    ],
    technologies: ['Python', 'Odoo 14', 'PostgreSQL', 'Mindee OCR', 'XML', 'UML'],
    github: '',
    demo: '',
    featured: false,
    published: true,
    year: '2023',
    role: { en: 'Software Engineer Intern / PFE Developer', fr: 'Stagiaire ingénieur logiciel / Développeur PFE' },
  },

  /* ---------------------------------------------------------- 11 */
  {
    id: 'donation-event-platform',
    title: 'Donation & Event Management Platform',
    subtitle: {
      en: 'Users, events and donations on a typed REST API',
      fr: 'Utilisateurs, événements et dons sur une API REST typée',
    },
    category: ['Full-Stack'],
    icon: 'blocks',
    description: {
      en: 'Full-stack platform managing users, events and donations, with NestJS REST APIs, Prisma and PostgreSQL on the backend and a Vue/Nuxt front end.',
      fr: 'Plateforme full-stack de gestion des utilisateurs, des événements et des dons, avec des API REST NestJS, Prisma et PostgreSQL côté back end et un front end Vue/Nuxt.',
    },
    highlight: {
      en: 'Typed REST APIs with a Nuxt front end.',
      fr: 'API REST typées avec un front end Nuxt.',
    },
    longDescription: {
      en: 'A platform where three domains — users, events and donations — have to stay consistent with each other. The backend is a NestJS application exposing REST endpoints, with Prisma mapping the relational model onto PostgreSQL so migrations stay explicit and typed. The Vue/Nuxt front end consumes those endpoints and renders the event and donation flows with Vuetify components.',
      fr: 'Une plateforme où trois domaines — utilisateurs, événements et dons — doivent rester cohérents entre eux. Le back end est une application NestJS exposant des endpoints REST, Prisma mappant le modèle relationnel sur PostgreSQL afin que les migrations restent explicites et typées. Le front end Vue/Nuxt consomme ces endpoints et rend les parcours événement et don avec des composants Vuetify.',
    },
    solution: {
      en: 'Model users, events and donations in PostgreSQL through Prisma, expose typed CRUD endpoints with NestJS and connect a Vue/Nuxt interface through REST.',
      fr: 'Modéliser les utilisateurs, les événements et les dons dans PostgreSQL via Prisma, exposer des endpoints CRUD typés avec NestJS et connecter une interface Vue/Nuxt par REST.',
    },
    architecture: {
      en: 'Vue.js / Nuxt + Vuetify → REST APIs → NestJS controllers and services → Prisma ORM → PostgreSQL.',
      fr: 'Vue.js / Nuxt + Vuetify → API REST → contrôleurs et services NestJS → ORM Prisma → PostgreSQL.',
    },
    architectureFlow: ['Vue.js / Nuxt + Vuetify', 'REST APIs', 'NestJS services', 'Prisma ORM', 'PostgreSQL'],
    features: [
      { en: 'User management', fr: 'Gestion des utilisateurs' },
      { en: 'Event management', fr: 'Gestion des événements' },
      { en: 'Donation management', fr: 'Gestion des dons' },
      { en: 'CRUD endpoints exposed as REST APIs', fr: 'Endpoints CRUD exposés en API REST' },
      { en: 'Typed relational access with Prisma', fr: 'Accès relationnel typé avec Prisma' },
    ],
    technologies: ['NestJS', 'Node.js', 'Prisma', 'PostgreSQL', 'Vue.js', 'Nuxt', 'Vuetify'],
    github: '',
    demo: '',
    featured: false,
    published: true,
    year: '2024',
    role: { en: 'Full-Stack Developer', fr: 'Développeur Full-Stack' },
  },

  /* ---------------------------------------------------------- 12 */
  {
    id: 'time-tracking-app',
    title: 'Time-Tracking Application',
    subtitle: { en: 'React interface on Supabase', fr: 'Interface React sur Supabase' },
    category: ['Frontend', 'Full-Stack'],
    icon: 'clock',
    description: {
      en: 'Time-tracking management application built with React and Supabase: tracking entries are created, edited and removed through CRUD operations exposed by the backend.',
      fr: 'Application de gestion de temps de travail construite avec React et Supabase : les entrées de suivi sont créées, modifiées et supprimées via des opérations CRUD exposées par le back end.',
    },
    highlight: {
      en: 'CRUD front end connected to Supabase.',
      fr: 'Front end CRUD connecté à Supabase.',
    },
    longDescription: {
      en: 'A focused CRUD application built during a short internship: React renders the tracking views, reusable components keep the interface consistent, and Supabase provides authentication, database access and real-time reads. Responsive layouts let the same screens work on a laptop and on a phone.',
      fr: 'Une application CRUD simple réalisée lors d’un stage court : React rend les vues de suivi, des composants réutilisables assurent la cohérence de l’interface, et Supabase fournit l’authentification, l’accès à la base et les lectures temps réel. Des interfaces responsives permettent d’utiliser les mêmes écrans sur un ordinateur portable et sur un téléphone.',
    },
    architecture: {
      en: 'React + Bootstrap components → Supabase (auth, database, realtime) for time entries.',
      fr: 'Composants React + Bootstrap → Supabase (authentification, base de données, temps réel) pour les entrées de suivi.',
    },
    architectureFlow: ['React + Bootstrap components', 'CRUD operations', 'Supabase auth & database'],
    features: [
      { en: 'Time entry creation and editing', fr: 'Création et modification d’entrées de temps' },
      { en: 'Reusable React components', fr: 'Composants React réutilisables' },
      { en: 'Supabase-backed data', fr: 'Données hébergées sur Supabase' },
      { en: 'Responsive interface', fr: 'Interface responsive' },
    ],
    technologies: ['React', 'JavaScript', 'Bootstrap', 'Supabase'],
    github: '',
    demo: '',
    featured: false,
    published: true,
    year: '2022',
    role: { en: 'Full-Stack Developer Intern', fr: 'Stagiaire développement Full-Stack' },
  },

  /* ---------------------------------------------------------------
     TEMPLATE — copy this block for a new project.
     Drafts stay hidden (`published: false`) and never reach the UI.
     Set `published: true` once the content is real.
     Leave `github` and `demo` empty until a public link exists.
     --------------------------------------------------------------- */
  {
    id: 'project-template',
    title: 'Project title',
    category: ['Full-Stack'],
    description: 'One or two sentences describing what the project does.',
    longDescription: 'A longer summary: the context, the constraints and what was actually built.',
    highlight: 'The single most useful takeaway of this project.',
    technologies: [],
    github: '',
    demo: '',
    icon: 'folder',
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