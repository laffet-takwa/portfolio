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
    github: '',
    demo: '',
    featured: true,
    published: true,
    year: '2026',
    role: { en: 'Backend / Distributed Systems Engineer', fr: 'Ingénieur Back-end / Systèmes distribués' },
  },

  /* ---------------------------------------------------------- 03 */
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
    github: '',
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
        src: '/projects/shopsphere-ecommerce/01-home.png',
      },
      {
        id: 'catalog',
        caption: { en: 'Product catalog browsing', fr: 'Navigation du catalogue produits' },
        src: '/projects/shopsphere-ecommerce/02-catalog.png',
      },
      {
        id: 'product',
        caption: { en: 'Product detail page', fr: 'Page de détail produit' },
        src: '/projects/shopsphere-ecommerce/03-product-detail.png',
      },
      {
        id: 'cart',
        caption: { en: 'Cart', fr: 'Panier' },
        src: '/projects/shopsphere-ecommerce/09-cart.png',
      },
      {
        id: 'checkout',
        caption: { en: 'Checkout flow', fr: 'Parcours de paiement' },
        src: '/projects/shopsphere-ecommerce/10-checkout.png',
      },
      {
        id: 'orders',
        caption: { en: 'Order history', fr: 'Historique des commandes' },
        src: '/projects/shopsphere-ecommerce/12-orders.png',
      },
      {
        id: 'admin',
        caption: { en: 'Admin dashboard', fr: 'Tableau de bord administrateur' },
        src: '/projects/shopsphere-ecommerce/16-admin-dashboard.png',
      },
      {
        id: 'mobile',
        caption: { en: 'Responsive catalog on mobile', fr: 'Catalogue responsive sur mobile' },
        src: '/projects/shopsphere-ecommerce/24-mobile-catalog.png',
      },
    ],
  },

  /* ---------------------------------------------------------- 04 */
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

  /* ---------------------------------------------------------- 05 */
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

  /* ---------------------------------------------------------- 06 */
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

  /* ---------------------------------------------------------- 07 */
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