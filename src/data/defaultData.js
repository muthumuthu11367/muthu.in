export const defaultHero = {
  name: 'Muthu',
  title: 'Senior Full Stack & AI Architect',
  typedTitles: [
    'Senior Full Stack Architect',
    'AI & Cloud Systems Specialist',
    'React & Node.js Engineer',
    'UI/UX Design Systems Lead',
    'Firebase & DevOps Specialist'
  ],
  animationStyle: 'typing',
  typingSpeed: 80,
  pauseDuration: 2000,
  shortBio: 'Architecting scalable cloud microservices, high-performance web applications, and intuitive user experiences with modern full-stack technologies.',
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  resumeUrl: '#resume',
  hireMeUrl: '#contact',
  whatsappNumber: '+1234567890',
  email: 'muthumuthu11367@gmail.com',
  location: 'Railway Road, Sirkali, Tamil Nadu, India',
  availableForFreelance: true,
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
};

export const defaultAbout = {
  summary: 'Passionate Senior Engineer with over 8 years of experience leading engineering teams, shipping cloud-native web apps, and crafting seamless digital experiences.',
  detailedBio: 'I specialize in transforming complex business challenges into elegant, resilient web and mobile platforms. Having built systems processing millions of requests daily, I bridge the gap between robust software engineering, scalable cloud backend architectures, and refined micro-interactions.',
  yearsOfExperience: 8,
  completedProjects: 45,
  happyClients: 32,
  awardsWon: 12,
  experiences: [
    {
      id: 'exp-1',
      role: 'Principal Full Stack Architect',
      company: 'Apex Cloud Technologies',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      description: 'Head of web application architecture. Spearheaded migration to React 19, Vite, and serverless edge functions, cutting latency by 42%.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Firebase', 'GCP', 'Docker', 'GraphQL']
    },
    {
      id: 'exp-2',
      role: 'Senior UI/UX & Frontend Lead',
      company: 'Vanguard Software Inc.',
      location: 'Remote',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      description: 'Designed and engineered an enterprise design system adopted across 14 product lines. Mentored 12 frontend developers.',
      technologies: ['React', 'Tailwind CSS', 'Redux Toolkit', 'Framer Motion', 'Vite', 'Jest']
    },
    {
      id: 'exp-3',
      role: 'Full Stack Developer',
      company: 'Nexus Tech Solutions',
      location: 'Austin, TX',
      startDate: '2017-08',
      endDate: '2019-05',
      current: false,
      description: 'Built real-time telemetry dashboards and RESTful API endpoints for financial data analytics.',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Vue.js', 'MongoDB', 'Docker']
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      year: '2015 - 2017',
      grade: '3.94 GPA',
      highlights: ['Specialization in Distributed Systems & AI', 'Published research on real-time stream processing']
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Science in Software Engineering',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      year: '2011 - 2015',
      grade: 'Highest Honors',
      highlights: ['Dean’s Honor List', 'ACM Collegiate Programming Regional Winner']
    }
  ],
  stats: [
    { id: 'st-1', label: 'Years Experience', value: 8, prefix: '', suffix: '+', iconName: 'Briefcase' },
    { id: 'st-2', label: 'Projects Completed', value: 45, prefix: '', suffix: '+', iconName: 'Code' },
    { id: 'st-3', label: 'Happy Clients', value: 32, prefix: '', suffix: '', iconName: 'Users' },
    { id: 'st-4', label: 'Awards & Badges', value: 12, prefix: '', suffix: '', iconName: 'Award' }
  ]
};

export const defaultProjects = [
  {
    id: 'proj-1',
    title: 'Aether Cloud Engine - Multi-Tenant SaaS Platform',
    slug: 'aether-cloud-engine',
    shortDescription: 'Enterprise cloud management dashboard with real-time cluster telemetry, automated deployments, and custom RBAC.',
    fullDescription: 'Aether Cloud Engine is a high-performance SaaS control plane built for DevOps and Cloud Architects. Features real-time cluster monitoring, granular team permissions, live server logs streaming, and single-click Kubernetes microservice deployment.',
    category: 'Full Stack',
    technologies: ['React 19', 'Node.js', 'Firebase Auth', 'Firestore', 'Tailwind CSS', 'Framer Motion', 'Docker'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
    featured: true,
    published: true,
    status: 'Completed',
    challenges: 'Handling real-time web socket streams for 10,000+ concurrent metric points without client-side UI degradation.',
    solutions: 'Implemented virtualized time-series charts, web workers for background payload parsing, and debounced chart renders.'
  },
  {
    id: 'proj-2',
    title: 'CogniMind AI - Intelligent Knowledge Graph',
    slug: 'cognimind-ai',
    shortDescription: 'AI-powered document summarization, semantic neural search, and dynamic visual mind-map generator.',
    fullDescription: 'CogniMind harnesses Gemini AI models to analyze complex enterprise PDFs, codebases, and research papers. Generates instant multi-layered mind maps, natural language query answers, and automatic key takeaway cards.',
    category: 'AI / Cloud',
    technologies: ['React 19', 'Gemini AI API', 'Express', 'Tailwind CSS', 'D3.js', 'Firebase'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
    featured: true,
    published: true,
    status: 'Completed',
    challenges: 'Managing large context window prompt limits and ensuring sub-second response times for multi-page documents.',
    solutions: 'Built server-side text chunking pipelines with embeddings indexing and streamed Gemini API responses directly to the client.'
  },
  {
    id: 'proj-3',
    title: 'Luminary Design System & Component Library',
    slug: 'luminary-design-system',
    shortDescription: 'Accessible, dark-luxury React component library with built-in theme engine and glassmorphism styling.',
    fullDescription: 'A production-grade design system built with WCAG AA compliance, Framer Motion micro-interactions, dark/light theme switching, and modular Tailwind component extensions.',
    category: 'UI/UX',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Storybook', 'Vite', 'Radix UI'],
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
    featured: true,
    published: true,
    status: 'Maintained',
    challenges: 'Creating fluid, responsive components that adapt dynamically to custom theme variables without layout shift.',
    solutions: 'Utilized CSS custom properties combined with Tailwind custom utilities and automated visual regression testing.'
  },
  {
    id: 'proj-4',
    title: 'PulsePay - Cross-Border Payment Gateway',
    slug: 'pulsepay-payment-gateway',
    shortDescription: 'Fintech transaction portal with instant currency exchange calculations, fraud detection alerts, and audit logs.',
    fullDescription: 'PulsePay provides seamless international wire transfers, merchant invoicing, live FX rate feeds, and comprehensive security compliance dashboards.',
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'React', 'Stripe API', 'Tailwind CSS'],
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
    featured: false,
    published: true,
    status: 'Completed',
    challenges: 'Guaranteeing ACID transactional compliance during high-concurrency wallet transfers.',
    solutions: 'Designed strict database transaction locks, idempotency keys, and automated reconciliation queues.'
  }
];

export const defaultSkills = [
  // Frontend
  { id: 'sk-1', name: 'React 19 & Next.js', category: 'Frontend', proficiency: 98, iconName: 'Code', featured: true, description: 'Server components, custom hooks, context, state optimization' },
  { id: 'sk-2', name: 'TypeScript & JavaScript (ESNext)', category: 'Frontend', proficiency: 95, iconName: 'FileCode', featured: true, description: 'Strict typing, generic abstractions, async pipelines' },
  { id: 'sk-3', name: 'Tailwind CSS & CSS Grid/Flexbox', category: 'Frontend', proficiency: 96, iconName: 'Layout', featured: true, description: 'Glassmorphism, fluid typography, dark themes' },
  { id: 'sk-4', name: 'Framer Motion & Animation', category: 'Frontend', proficiency: 92, iconName: 'Sparkles', featured: true, description: 'Layout transitions, scroll triggers, micro-interactions' },

  // Backend
  { id: 'sk-5', name: 'Node.js & Express', category: 'Backend', proficiency: 94, iconName: 'Server', featured: true, description: 'REST APIs, middleware security, clustering, streaming' },
  { id: 'sk-6', name: 'Firebase & Cloud Functions', category: 'Backend', proficiency: 96, iconName: 'Flame', featured: true, description: 'Firestore, Authentication, Storage, Rules, Functions' },
  { id: 'sk-7', name: 'GraphQL & REST Architectures', category: 'Backend', proficiency: 88, iconName: 'Cpu', featured: false, description: 'Schema design, query optimization, resolvers' },

  // Database
  { id: 'sk-8', name: 'Firestore NoSQL', category: 'Database', proficiency: 95, iconName: 'Database', featured: true, description: 'Complex index configuration, real-time listeners, security rules' },
  { id: 'sk-9', name: 'PostgreSQL & SQL ORMs', category: 'Database', proficiency: 89, iconName: 'Database', featured: false, description: 'Relational migrations, indexing, performance tuning' },

  // DevOps & Cloud
  { id: 'sk-10', name: 'Google Cloud Platform (GCP)', category: 'DevOps & Cloud', proficiency: 90, iconName: 'Cloud', featured: true, description: 'Cloud Run, Cloud Build, IAM, Secrets Manager' },
  { id: 'sk-11', name: 'Docker & Containerization', category: 'DevOps & Cloud', proficiency: 87, iconName: 'Box', featured: false, description: 'Multi-stage builds, compose stacks, microservices' },
  { id: 'sk-12', name: 'Git & CI/CD Pipelines', category: 'DevOps & Cloud', proficiency: 94, iconName: 'GitBranch', featured: true, description: 'GitHub Actions, automated testing, release tagging' }
];

export const defaultServices = [
  {
    id: 'srv-1',
    title: 'Full Stack Web Architecture',
    description: 'Custom end-to-end web applications built with modern frontend frameworks, secure backend services, and scalable database schemas.',
    features: ['React & Modern JS/TS Frontend', 'Express & Node.js API Layer', 'Firebase / Cloud Database Integration', 'Authentication & RBAC Security'],
    iconName: 'Layers',
    featured: true
  },
  {
    id: 'srv-2',
    title: 'Cloud Systems & Serverless Engineering',
    description: 'Designing resilient cloud infrastructure, microservices, container deployments, and cost-effective auto-scaling serverless workflows.',
    features: ['GCP & Cloud Run Setup', 'Serverless API Functions', 'Database Optimization & Security', 'CI/CD Pipeline Automation'],
    iconName: 'Cloud',
    featured: true
  },
  {
    id: 'srv-3',
    title: 'UI/UX Design Systems & Motion',
    description: 'Transforming brand visions into modern luxury interfaces with high-contrast color palettes, smooth animations, and pixel-perfect layouts.',
    features: ['Luxury UI/UX Layouts', 'Framer Motion & GSAP Animations', 'Fully Responsive Mobile First', 'Design System Token Libraries'],
    iconName: 'Palette',
    featured: true
  },
  {
    id: 'srv-4',
    title: 'AI Product Integration & Automation',
    description: 'Empowering applications with cutting-edge Gemini AI models, natural language processing, automated content generation, and intelligent search.',
    features: ['Gemini AI API Integration', 'Semantic Search & Embeddings', 'Automated Summarization', 'Custom Prompt Engineering'],
    iconName: 'Cpu',
    featured: true
  }
];

export const defaultCertificates = [
  {
    id: 'cert-1',
    title: 'Google Cloud Certified Professional Cloud Architect',
    issuer: 'Google Cloud Platform',
    issueDate: '2023-10',
    expiryDate: '2026-10',
    credentialId: 'GCP-PCA-884912',
    credentialUrl: 'https://cloud.google.com',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    category: 'Cloud Architecture',
    description: 'Validated expertise in cloud infrastructure design, security compliance, microservices, and system reliability engineering.'
  },
  {
    id: 'cert-2',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    issueDate: '2022-05',
    credentialId: 'AWS-SAA-302910',
    credentialUrl: 'https://aws.amazon.com',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    category: 'Cloud Engineering',
    description: 'Demonstrated proficiency in building cost-optimized, highly available distributed architectures on AWS.'
  },
  {
    id: 'cert-3',
    title: 'Meta Senior Full Stack React & Node Developer Certificate',
    issuer: 'Meta Coursera Professional Certificate',
    issueDate: '2021-12',
    credentialId: 'META-REACT-99201',
    credentialUrl: 'https://coursera.org',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    category: 'Frontend & Full Stack',
    description: 'Advanced mastery in complex React state, custom hook optimization, client performance, and REST backend engineering.'
  }
];

export const defaultTestimonials = [
  {
    id: 'tst-1',
    clientName: 'Elena Rostova',
    clientRole: 'VP of Product',
    company: 'Apex Cloud Technologies',
    clientAddress: 'San Francisco, CA, USA',
    clientPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    review: 'Muthu is an exceptional full-stack architect. He transformed our core web application pipeline, built automated cloud deployments, and delivered clean, self-documenting code with extraordinary velocity. His deep knowledge of React 19, Firebase, and cloud backend engineering enabled us to scale our platform to thousands of daily active users effortlessly. I highly recommend Muthu for any complex web or software initiative!',
    featured: true,
    projectWorkedOn: 'Aether Cloud Engine & Multi-Tenant SaaS Platform',
    status: 'approved',
    createdAt: '2026-05-10T10:00:00Z'
  },
  {
    id: 'tst-2',
    clientName: 'Marcus Vance',
    clientRole: 'Founder & CEO',
    company: 'CogniMind AI Solutions',
    clientAddress: 'Bengaluru, Karnataka, India',
    clientPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    review: 'Working with Muthu was a seamless and highly rewarding experience from start to finish. His mastery over React, Tailwind CSS, and Gemini AI API integrations enabled us to launch our MVP three weeks ahead of schedule. Muthu took full ownership of the user interface design, state management, and serverless backend API layer. The final product exceeded our highest expectations in both aesthetics and performance!',
    featured: true,
    projectWorkedOn: 'CogniMind AI Knowledge Graph & Analytics Portal',
    status: 'approved',
    createdAt: '2026-06-18T14:30:00Z'
  },
  {
    id: 'tst-3',
    clientName: 'Sophia Lin',
    clientRole: 'Head of Engineering',
    company: 'Vanguard Software Inc.',
    clientAddress: 'Singapore',
    clientPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    review: 'Muthu combines deep engineering discipline with flawless visual taste. He designed an enterprise component library and design system adopted across 14 product lines. His focus on micro-interactions, responsive accessibility, and sub-second rendering boosted our engineering productivity across all product teams. Any company fortunate enough to work with Muthu will see instant results.',
    featured: true,
    projectWorkedOn: 'Luminary Design System & Component Library',
    status: 'approved',
    createdAt: '2026-07-02T09:15:00Z'
  },
  {
    id: 'tst-4',
    clientName: 'David K. Miller',
    clientRole: 'Director of Technology',
    company: 'Nexus FinTech Global',
    clientAddress: 'London, UK',
    clientPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    review: 'Muthu spearheaded the complete rebuild of our cross-border transactional dashboard. His code quality is pristine, security practices are top-tier, and he delivered complex financial charts and realtime WebSockets integrations smoothly. Outstanding communicator and developer!',
    featured: false,
    projectWorkedOn: 'PulsePay Global Merchant Portal',
    status: 'approved',
    createdAt: '2026-07-15T11:20:00Z'
  },
  {
    id: 'tst-5',
    clientName: 'Aria Takahashi',
    clientRole: 'Lead UI/UX Architect',
    company: 'Sora Cloud Labs',
    clientAddress: 'Tokyo, Japan',
    clientPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    review: 'Muthu brings unmatched expertise in modern web performance and high-level full-stack development. His ability to bridge complex backend cloud architectures with responsive, dark-mode polished user interfaces made our collaboration an absolute success.',
    featured: false,
    projectWorkedOn: 'Sora Cloud Realtime Telemetry Platform',
    status: 'approved',
    createdAt: '2026-07-20T16:45:00Z'
  }
];

export const defaultGallery = [
  {
    id: 'gal-1',
    title: 'Cloud Infrastructure Architecture Diagram',
    category: 'Architecture Diagrams',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    description: 'Multi-region serverless load balancing setup for high availability enterprise apps.'
  },
  {
    id: 'gal-2',
    title: 'Luxury Glassmorphic Dashboard Design',
    category: 'UI/UX Mockups',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    description: 'High-contrast dark theme telemetry control center UI mockup.'
  },
  {
    id: 'gal-3',
    title: 'Developer Setup & Workstation',
    category: 'Workstation',
    imageUrl: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1000&q=80',
    description: 'Triple display ergonomic setup for continuous integration & full stack coding.'
  },
  {
    id: 'gal-4',
    title: 'Keynote Speaker at WebDev Conference',
    category: 'Speaking & Events',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
    description: 'Delivering a presentation on React 19 performance patterns and server components.'
  },
  {
    id: 'gal-5',
    title: 'Microservices & Database Topology Blueprint',
    category: 'Architecture Diagrams',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    description: 'Relational & NoSQL database cluster topology for high concurrency workloads.'
  },
  {
    id: 'gal-6',
    title: 'Mobile App Wireframe & Design Prototype',
    category: 'UI/UX Mockups',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    description: 'Interactive high-fidelity Figma prototype for cross-platform fintech app.'
  }
];

export const defaultSocialLinks = [
  { id: 'soc-1', platform: 'GitHub', url: 'https://github.com', enabled: true, order: 1 },
  { id: 'soc-2', platform: 'LinkedIn', url: 'https://linkedin.com', enabled: true, order: 2 },
  { id: 'soc-3', platform: 'X (Twitter)', url: 'https://x.com', enabled: true, order: 3 },
  { id: 'soc-4', platform: 'LeetCode', url: 'https://leetcode.com', enabled: true, order: 4 },
  { id: 'soc-5', platform: 'Stack Overflow', url: 'https://stackoverflow.com', enabled: true, order: 5 },
  { id: 'soc-6', platform: 'Medium', url: 'https://medium.com', enabled: true, order: 6 },
  { id: 'soc-7', platform: 'Dribbble', url: 'https://dribbble.com', enabled: true, order: 7 }
];

export const defaultThemeSettings = {
  mode: 'dark',
  preset: 'Indigo Dusk',
  primaryColor: '#4f46e5', // Subtle Indigo 600
  secondaryColor: '#6366f1', // Indigo 500
  accentColor: '#10b981', // Emerald 500
  backgroundColor: '#020617', // Obsidian Slate 950
  cardBgColor: 'rgba(15, 23, 42, 0.85)',
  glassBlur: 16,
  borderRadius: 16,
  fontFamily: "'Inter', sans-serif",
  animationSpeed: 1,
  cursorAnimation: true,
  bgMeshAnimation: true
};

export const defaultSectionTitles = {
  about: 'Architecting Detailed Excellence',
  aboutSubtitle: 'A passion for elegant code, scalable distributed systems, and modern UI engineering.',
  skills: 'Skills and Technologies',
  skillsSubtitle: 'Comprehensive technical toolset across frontend, backend, databases, and cloud engineering.',
  services: 'Specialised Engineering Services',
  servicesSubtitle: 'High-impact technical solutions tailored for modern digital applications.',
  projects: 'Future Portfolio Projects',
  projectsSubtitle: 'A showcase of production web applications, multi-tenant SaaS platforms, and enterprise cloud microservices.',
  certificates: 'Certifications',
  certificatesSubtitle: 'Verified industry certifications from Google Cloud, AWS, Meta, and major tech institutions.',
  gallery: 'Media and Archive Gallery',
  gallerySubtitle: 'Visual showcase of UI designs, architecture blueprints, and workstation setups.',
  resume: 'Professional Resume and CV',
  resumeSubtitle: 'Download my verified curriculum vitae or inspect key architectural career milestones.',
  testimonials: 'Client Testimonials',
  testimonialsSubtitle: 'Direct client feedback, star ratings, and project reviews automatically saved and updated.',
  contact: "Let's Build Something Extraordinary",
  contactSubtitle: 'Have an ambitious project, cloud architecture request, or engineering lead opportunity? Send a message directly.',
  footerBottomText: '© 2026 Muthu. All rights reserved. Enterprise Portfolio CMS.'
};