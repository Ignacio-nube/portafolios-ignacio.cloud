export type Lang = 'es' | 'en';

export interface Dictionary {
  nav: {
    projects: string;
    stack: string;
    technologies: string;
    aboutMe: string;
    contact: string;
    viewProjects: string;
  };
  hero: {
    badge: string;
    subtitle: string;
    typingTexts: string[];
    cta: string;
    ctaProjects: string;
    ctaCV: string;
    mockup: { badge: string; sub: string; metric: string };
  };
  whyme: {
    title: string;
    subtitle: string;
    cards: { title: string; desc: string }[];
  };
  about: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
    p3highlight: string;
    statLabels: string[];
  };
  stack: {
    title: string;
    subtitle: string;
    categories: string[];
  };
  projects: {
    title: string;
    subtitle: string;
    categoryLabels: Record<string, string>;
    statusLabels: Record<string, string>;
    viewDemo: string;
    code: string;
    noResults: string;
    noCategory: string;
    searchPlaceholder: string;
    showMore: (n: number) => string;
  };
  metrics: {
    labels: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    note: string;
    waSub: string;
    waCta: string;
    waMsg: string;
    emailCta: string;
  };
}

const es: Dictionary = {
  nav: {
    projects: 'Proyectos',
    stack: 'Stack',
    technologies: 'Tecnologías',
    aboutMe: 'Sobre mí',
    contact: 'Contacto',
    viewProjects: 'Ver proyectos',
  },
  hero: {
    badge: 'Disponible — respondo en menos de 24hs',
    subtitle: 'Técnico en Programación · Tucumán, Argentina',
    typingTexts: [
      'Sistemas de reservas directas',
      'Webs que generan clientes',
      'Apps sin comisiones de Booking',
    ],
    cta: 'Hablar de tu proyecto →',
    ctaProjects: 'Ver proyectos',
    ctaCV: 'Descargar CV',
    mockup: { badge: 'Reserva directa', sub: 'Sin comisiones', metric: 'Reservas este mes' },
  },
  whyme: {
    title: 'Por qué trabajar conmigo',
    subtitle: 'Más rápido, más directo, más local.',
    cards: [
      { title: 'Entrego rápido', desc: 'De idea a demo funcional en días, no meses.' },
      { title: 'Sin intermediarios', desc: 'Trabajás directo conmigo, no con una agencia.' },
      { title: 'Local y disponible', desc: 'Zona horaria argentina, respuesta rápida.' },
    ],
  },
  about: {
    title: 'Sobre mí',
    p1: 'Combino programación con pensamiento de sistemas — vengo de mecatrónica, donde todo tiene que funcionar junto. Eso me cambió la forma de construir software.',
    p2: 'Actualmente construyo productos web para mercados locales argentinos: plataformas de reservas, agregadores inmobiliarios, marketplaces.',
    p3: 'No hago demos de práctica.',
    p3highlight: 'Cada proyecto tiene usuarios reales o está en producción.',
    statLabels: [
      'proyectos construidos',
      'en producción o staging',
      'ciudades target',
      'stack dominado end-to-end',
    ],
  },
  stack: {
    title: 'Con qué trabajo',
    subtitle: 'Stack probado en producción, no en tutoriales.',
    categories: ['Frontend', 'Backend', 'Base de datos', 'Herramientas'],
  },
  projects: {
    title: 'Lo que construí',
    subtitle: 'Proyectos reales para mercados reales.',
    categoryLabels: {
      all: 'Todos',
      saas: 'SaaS',
      demo: 'Demo',
      negocio: 'Negocio',
      ia: 'IA',
      app: 'App',
      juego: 'Juego',
    },
    statusLabels: {
      produccion: 'En producción',
      desarrollo: 'En desarrollo',
      demo: 'Demo',
    },
    viewDemo: 'Ver demo',
    code: 'Código',
    noResults: 'Sin resultados. Probá con otro término.',
    noCategory: 'Sin proyectos en esta categoría.',
    searchPlaceholder: 'Buscar proyecto...',
    showMore: (n) => `+ Ver ${n} proyectos más`,
  },
  metrics: {
    labels: [
      'productos en producción',
      'destinos turísticos cubiertos',
      'proyectos con código real',
    ],
  },
  contact: {
    title: '¿Tenés un proyecto?',
    subtitle: 'Hablemos hoy.',
    note: 'No cobro consulta inicial.',
    waSub: 'Respuesta inmediata',
    waCta: 'Escribirme →',
    waMsg: 'Hola Ignacio, vi tu portfolio y quiero hablar de mi proyecto.',
    emailCta: 'Enviar email →',
  },
};

const en: Dictionary = {
  nav: {
    projects: 'Projects',
    stack: 'Stack',
    technologies: 'Technologies',
    aboutMe: 'About me',
    contact: 'Contact',
    viewProjects: 'View projects',
  },
  hero: {
    badge: 'Available — I respond in less than 24hrs',
    subtitle: 'Programming Technician · Tucumán, Argentina',
    typingTexts: [
      'Direct booking systems',
      'Websites that generate clients',
      'Apps without Booking commissions',
    ],
    cta: 'Talk about your project →',
    ctaProjects: 'View projects',
    ctaCV: 'Download CV',
    mockup: { badge: 'Direct booking', sub: 'No commissions', metric: 'Bookings this month' },
  },
  whyme: {
    title: 'Why work with me',
    subtitle: 'Faster, more direct, more local.',
    cards: [
      { title: 'I deliver fast', desc: 'From idea to working demo in days, not months.' },
      { title: 'No intermediaries', desc: 'You work directly with me, not with an agency.' },
      { title: 'Local and available', desc: 'Argentine timezone, quick response.' },
    ],
  },
  about: {
    title: 'About me',
    p1: "I combine programming with systems thinking — I come from mechatronics, where everything has to work together. That changed the way I build software.",
    p2: 'I currently build web products for local Argentine markets: booking platforms, real estate aggregators, marketplaces.',
    p3: "I don't build practice demos.",
    p3highlight: 'Every project has real users or is in production.',
    statLabels: [
      'projects built',
      'in production or staging',
      'target cities',
      'stack mastered end-to-end',
    ],
  },
  stack: {
    title: 'What I work with',
    subtitle: 'Stack proven in production, not in tutorials.',
    categories: ['Frontend', 'Backend', 'Database', 'Tools'],
  },
  projects: {
    title: 'What I built',
    subtitle: 'Real projects for real markets.',
    categoryLabels: {
      all: 'All',
      saas: 'SaaS',
      demo: 'Demo',
      negocio: 'Business',
      ia: 'AI',
      app: 'App',
      juego: 'Game',
    },
    statusLabels: {
      produccion: 'In production',
      desarrollo: 'In development',
      demo: 'Demo',
    },
    viewDemo: 'View demo',
    code: 'Code',
    noResults: 'No results. Try another term.',
    noCategory: 'No projects in this category.',
    searchPlaceholder: 'Search project...',
    showMore: (n) => `+ View ${n} more projects`,
  },
  metrics: {
    labels: [
      'products in production',
      'tourist destinations covered',
      'projects with real code',
    ],
  },
  contact: {
    title: 'Do you have a project?',
    subtitle: "Let's talk today.",
    note: 'No charge for initial consultation.',
    waSub: 'Immediate response',
    waCta: 'Write to me →',
    waMsg: 'Hi Ignacio, I saw your portfolio and want to talk about my project.',
    emailCta: 'Send email →',
  },
};

export const dictionaries: Record<Lang, Dictionary> = { es, en };
