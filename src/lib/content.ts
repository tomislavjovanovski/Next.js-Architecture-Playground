export type Collection = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  palette: string[];
  style: string;
  trend: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  tag: string;
};

export const collections: Collection[] = [
  {
    slug: 'atelier-oak',
    title: 'Atelier Oak',
    tagline: 'Warm wood, sculpted layers, calm contrast.',
    description: 'An architectural palette for modern homes that rely on tactile wood grains, soft lighting, and layered silhouettes.',
    palette: ['Walnut', 'Ivory', 'Graphite'],
    style: 'Soft Modern',
    trend: 'Organic minimalism',
  },
  {
    slug: 'luna-terrace',
    title: 'Luna Terrace',
    tagline: 'A sunlit residential concept built for flexible living.',
    description: 'A breezy urban concept that blends indoor-outdoor flow, hidden storage, and sculpted furniture placement.',
    palette: ['Sand', 'Ocean', 'Clay'],
    style: 'Coastal Contemporary',
    trend: 'Biophilic design',
  },
  {
    slug: 'studio-echo',
    title: 'Studio Echo',
    tagline: 'Bold forms, luminous surfaces, editorial pacing.',
    description: 'A gallery-inspired mood for designers who want crisp proportions, rich texture, and cinematic staging.',
    palette: ['Onyx', 'Pearl', 'Sage'],
    style: 'Editorial Luxe',
    trend: 'Curated contrast',
  },
];

export const articles: Article[] = [
  {
    slug: 'rendering-strategy-playbook',
    title: 'Rendering Strategy Playbook',
    excerpt: 'How to decide between SSG, SSR, ISR, and CSR in a real production codebase.',
    body: 'Server Components reduce client bundle size, ISR keeps marketing pages fresh, and SSR is ideal for user-specific dashboards. The right strategy is the architecture decision that keeps interfaces fast and relevant.',
    tag: 'Architecture',
  },
  {
    slug: 'bff-for-design-ops',
    title: 'Why BFF Matters for Design Ops',
    excerpt: 'A backend-for-frontend layer can simplify CMS orchestration and keep the UI resilient.',
    body: 'By composing CMS content, recommendation data, and analytics in one route, teams can ship faster while keeping caching and revalidation predictable.',
    tag: 'Platform',
  },
];

export const homepage = {
  hero: 'A Next.js 15 architecture showcase for rendering, caching, and CMS-led experiences.',
  summary: 'This playground highlights SSG, SSR, ISR, CSR, middleware, and route handlers in one interior design experience platform.',
};

export const trends = [
  'Soft layering and tactile materials',
  'Biophilic palettes with daylight-first spaces',
  'Editorial furniture staging and modular storage',
];
