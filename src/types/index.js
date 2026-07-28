/**
 * Data structures and fallback templates for portfolio configurations.
 * In plain JS, interfaces are omitted and default objects/constructors are used instead.
 */

export const createHeroConfig = (overrides = {}) => ({
  name: '',
  title: '',
  typedTitles: [],
  animationStyle: 'typing', // 'typing' | 'fade' | 'slide' | 'glow'
  typingSpeed: 80,
  pauseDuration: 2000,
  shortBio: '',
  profileImage: '',
  resumeUrl: '#',
  hireMeUrl: '#',
  whatsappNumber: '',
  email: '',
  location: '',
  availableForFreelance: true,
  githubUrl: '',
  linkedinUrl: '',
  ...overrides
});

export const createExperienceItem = (overrides = {}) => ({
  id: '',
  role: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  technologies: [],
  ...overrides
});

export const createEducationItem = (overrides = {}) => ({
  id: '',
  degree: '',
  institution: '',
  location: '',
  year: '',
  grade: '',
  highlights: [],
  ...overrides
});

export const createAchievementStat = (overrides = {}) => ({
  id: '',
  label: '',
  value: 0,
  prefix: '',
  suffix: '',
  iconName: '',
  ...overrides
});

export const createAboutConfig = (overrides = {}) => ({
  summary: '',
  detailedBio: '',
  yearsOfExperience: 0,
  completedProjects: 0,
  happyClients: 0,
  awardsWon: 0,
  experiences: [],
  education: [],
  stats: [],
  ...overrides
});

export const createProject = (overrides = {}) => ({
  id: '',
  title: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  category: 'Full Stack', // 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'AI / Cloud' | 'UI/UX'
  technologies: [],
  thumbnail: '',
  images: [],
  githubUrl: '',
  demoUrl: '',
  featured: false,
  published: true,
  status: 'Completed', // 'Completed' | 'In Development' | 'Maintained'
  challenges: '',
  solutions: '',
  order: 0,
  createdAt: new Date().toISOString(),
  ...overrides
});

export const createSkill = (overrides = {}) => ({
  id: '',
  name: '',
  category: 'Frontend', // 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud' | 'Tools & Methods' | 'UI/UX Design'
  proficiency: 0, // 0 to 100
  iconName: '',
  featured: false,
  description: '',
  ...overrides
});

export const createService = (overrides = {}) => ({
  id: '',
  title: '',
  description: '',
  features: [],
  iconName: '',
  featured: false,
  order: 0,
  ...overrides
});

export const createCertificate = (overrides = {}) => ({
  id: '',
  title: '',
  issuer: '',
  issueDate: '',
  expiryDate: '',
  credentialId: '',
  credentialUrl: '',
  imageUrl: '',
  category: '',
  description: '',
  ...overrides
});

export const createTestimonial = (overrides = {}) => ({
  id: '',
  clientName: '',
  clientRole: '',
  company: '',
  clientAddress: '',
  clientPhoto: '',
  rating: 5,
  review: '',
  featured: false,
  projectWorkedOn: '',
  createdAt: new Date().toISOString(),
  status: 'approved', // 'approved' | 'pending'
  authorEmail: '',
  authorPasscode: '',
  ...overrides
});

export const createGalleryItem = (overrides = {}) => ({
  id: '',
  title: '',
  category: 'UI/UX Mockups', // 'UI/UX Mockups' | 'Architecture Diagrams' | 'Speaking & Events' | 'Code Snapshots' | 'Workstation'
  imageUrl: '',
  description: '',
  ...overrides
});

export const createSocialLink = (overrides = {}) => ({
  id: '',
  platform: '',
  url: '',
  enabled: true,
  order: 0,
  customLabel: '',
  ...overrides
});

export const createContactMessage = (overrides = {}) => ({
  id: '',
  name: '',
  email: '',
  subject: '',
  message: '',
  createdAt: new Date().toISOString(),
  read: false,
  ...overrides
});

export const createMediaFile = (overrides = {}) => ({
  id: '',
  name: '',
  url: '',
  type: 'image', // 'image' | 'pdf' | 'video' | 'document'
  size: 0,
  createdAt: new Date().toISOString(),
  ...overrides
});

export const createThemeSettings = (overrides = {}) => ({
  mode: 'dark', // 'dark' | 'light'
  preset: 'luxury', // 'luxury' | 'cyberpunk' | 'emerald' | 'gold' | 'sapphire'
  primaryColor: '#4f46e5',
  secondaryColor: '#6366f1',
  accentColor: '#10b981',
  backgroundColor: '#020617',
  cardBgColor: 'rgba(15, 23, 42, 0.85)',
  glassBlur: 16,
  borderRadius: 16,
  fontFamily: "'Inter', sans-serif",
  animationSpeed: 1,
  cursorAnimation: true,
  bgMeshAnimation: true,
  ...overrides
});

export const createSectionTitles = (overrides = {}) => ({
  about: 'About Me',
  aboutSubtitle: '',
  skills: 'Skills & Technologies',
  skillsSubtitle: '',
  services: 'Services',
  servicesSubtitle: '',
  projects: 'Projects',
  projectsSubtitle: '',
  certificates: 'Certifications',
  certificatesSubtitle: '',
  gallery: 'Gallery',
  gallerySubtitle: '',
  resume: 'Resume',
  resumeSubtitle: '',
  testimonials: 'Testimonials',
  testimonialsSubtitle: '',
  contact: 'Contact Me',
  contactSubtitle: '',
  footerBottomText: '',
  ...overrides
});

export const createActivityLog = (overrides = {}) => ({
  id: '',
  action: '',
  module: '',
  timestamp: new Date().toISOString(),
  details: '',
  ...overrides
});