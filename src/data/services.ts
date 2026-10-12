import {
  Palette,
  Layers,
  Share2,
  TrendingUp,
  Megaphone,
  Printer,
  Shirt,
  Layout,
  Video,
  Code2,
  Globe,
  Smartphone,
  LucideIcon
} from 'lucide-react';

export interface ServiceDefinition {
  number: string;
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
  badge: string;
}

export const ALL_SERVICES: ServiceDefinition[] = [
  {
    number: '01',
    id: 'brand-identity',
    title: 'Brand Identity',
    tagline: 'Distinctive visual systems & strategic foundation',
    description: 'From primary logo marks to complete brand guidelines, we forge memorable visual systems that tell your story with prestige and longevity.',
    deliverables: ['Primary & Secondary Logo Marks', 'Comprehensive 40+ Page Style Guide', 'Typography & Color Tokens', 'Tone of Voice & Messaging'],
    icon: Palette,
    badge: 'CORE PILLAR',
  },
  {
    number: '02',
    id: 'graphic-design',
    title: 'Graphic Design',
    tagline: 'High-impact print & digital collateral',
    description: 'Striking visual assets including investor decks, packaging, brochures, digital banners, and corporate presentation kits crafted with creative mastery.',
    deliverables: ['Pitch Decks & Keynotes', 'Packaging & Product Sleeves', 'Corporate Brochures & Reports', 'Digital Display Advertising'],
    icon: Layers,
    badge: 'CREATIVE',
  },
  {
    number: '03',
    id: 'social-media-management',
    title: 'Social Media Management',
    tagline: 'High-converting organic growth & content systems',
    description: 'Strategic content creation, community engagement, and analytics-driven campaigns across Instagram, LinkedIn, TikTok, and Meta platforms.',
    deliverables: ['Monthly Editorial Calendars', 'Reels, Carousels & Motion Content', 'Proactive Community Care', 'Audience Growth & Performance Reports'],
    icon: Share2,
    badge: 'ENGAGEMENT',
  },
  {
    number: '04',
    id: 'ads-strategy',
    title: 'Ads Strategy',
    tagline: 'Data-driven paid acquisition & ROAS scaling',
    description: 'Performance-engineered advertising funnels across Google Ads, Meta Ads, and LinkedIn with continuous budget optimization and tracking.',
    deliverables: ['Full-Funnel Media Architecture', 'Creative & Copywriting Variations', 'Conversion API & Pixel Tracking', 'A/B Testing & Weekly ROAS Reports'],
    icon: TrendingUp,
    badge: 'PERFORMANCE',
  },
  {
    number: '05',
    id: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'Omnichannel growth, outreach & SEO domination',
    description: 'Holistic inbound digital marketing strategies that unite SEO, email automation, public relations, and conversion rate optimization.',
    deliverables: ['Technical & On-Page SEO', 'Automated Email Nurture Sequences', 'Lead Magnet & Landing Page Design', 'Conversion Rate Optimization (CRO)'],
    icon: Megaphone,
    badge: 'GROWTH',
  },
  {
    number: '06',
    id: 'print-designs',
    title: 'Print Designs',
    tagline: 'Tactile, premium offline brand collateral',
    description: 'High-resolution press-ready vector designs for billboards, luxury business cards, brochures, retail store signage, flyers, and merchandise.',
    deliverables: ['Large-Format Billboard & Signage', 'Luxury Embossed Business Cards', 'Custom Product Catalogs & Menus', 'Pre-Press CMYK Ready Files'],
    icon: Printer,
    badge: 'PRINT READY',
  },
  {
    number: '07',
    id: 'apparel-design',
    title: 'Apparel Design',
    tagline: 'Custom clothing, corporate uniforms & streetwear merchandise',
    description: 'Distinctive apparel collections, branded corporate team wear, streetwear capsules, embroidery mockups, and screen-print tech packs.',
    deliverables: ['Complete Factory Tech Packs', 'Screen Print & Embroidery Vector Assets', 'Photorealistic 3D Apparel Mockups', 'Fabric & Color Pantone Specs'],
    icon: Shirt,
    badge: 'MERCHANDISE',
  },
  {
    number: '08',
    id: 'ux-ui-design',
    title: 'UX/UI Design',
    tagline: 'Intuitive user experiences & world-class product interfaces',
    description: 'Human-centric user research, wireframing, interactive prototyping, and design systems in Figma built to delight users and maximize conversions.',
    deliverables: ['User Flow & Wireframing', 'Interactive Figma High-Fi Prototypes', 'Production Design Systems & Tokens', 'Micro-Interactions & Usability Testing'],
    icon: Layout,
    badge: 'PRODUCT',
  },
  {
    number: '09',
    id: 'content-creation',
    title: 'Content Creation',
    tagline: 'Cinematic video, 3D animations & brand storytelling',
    description: 'High-end short-form vertical video (Reels/TikTok), 3D product renders, commercial voiceover, and narrative brand storytelling that stops the scroll.',
    deliverables: ['4K Cinematic Video Production', '3D Motion Graphics & CGI Visuals', 'Scriptwriting & Storyboarding', 'Podcast & Audio Post-Production'],
    icon: Video,
    badge: 'MULTIMEDIA',
  },
  {
    number: '10',
    id: 'software-development',
    title: 'Software Development',
    tagline: 'Robust enterprise backend, APIs & cloud architectures',
    description: 'Scalable cloud infrastructure, custom SaaS engines, REST & GraphQL APIs, database architecture, and mission-critical business software.',
    deliverables: ['Scalable Microservices & APIs', 'PostgreSQL / Cloud Database Systems', 'Enterprise RBAC & Authentication', 'Cloud Deployment & CI/CD Pipelines'],
    icon: Code2,
    badge: 'ENGINEERING',
  },
  {
    number: '11',
    id: 'website-development',
    title: 'Website Development',
    tagline: 'Ultra-fast Next.js, React & headless web platforms',
    description: 'Lightning-fast, search-engine optimized web applications with 99+ Lighthouse performance scores, fluid animations, and headless CMS integrations.',
    deliverables: ['Next.js / React 19 / TypeScript Stack', 'Tailwind CSS Fluid Modern UI', 'Headless CMS Integration (Sanity/Strapi)', '99+ Core Web Vitals Optimization'],
    icon: Globe,
    badge: 'FULL-STACK',
  },
  {
    number: '12',
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    tagline: 'Native iOS & Android apps with seamless performance',
    description: 'Cross-platform React Native and Flutter mobile applications delivering 60fps smooth gestures, offline caching, push notifications, and app store publishing.',
    deliverables: ['React Native / iOS & Android Build', 'Offline-First Local Storage Sync', 'Push Notifications & Deep Linking', 'App Store & Google Play Publishing'],
    icon: Smartphone,
    badge: 'MOBILE',
  },
];

export interface InvestmentPackage {
  id: string;
  name: string;
  badge: string;
  monthlyPrice: string;
  annualPrice: string;
  monthlyBillingNote: string;
  annualBillingNote: string;
  pricing: string;
  summary: string;
  deliverables: string[];
}

export const INVESTMENT_PACKAGES: InvestmentPackage[] = [
  {
    id: 'pkg-essentials',
    name: 'Essentials Plan (Starter Kit)',
    badge: 'STARTER KIT',
    monthlyPrice: 'NPR 2,500 / mo',
    annualPrice: 'NPR 2,000 / mo',
    monthlyBillingNote: 'Billed monthly (NPR 2,500/mo)',
    annualBillingNote: 'NPR 24,000 / year (Save 20% · NPR 2,000/mo)',
    pricing: 'Monthly: NPR 2,500/mo | Annual: NPR 2,000/mo (Save 20%)',
    summary: 'Complete Primary & Secondary Logo Package, Core Color & Typography Kit, Business Card & Display Assets, 1-Page Landing Page, WhatsApp Support Line.',
    deliverables: ['Primary & Secondary Logo Package', 'Color & Typography Kit', 'Business Card Assets', '1-Page Landing Page', '7-Day Sprint Delivery'],
  },
  {
    id: 'pkg-growth',
    name: 'Growth Plan (Most Popular)',
    badge: 'MOST POPULAR',
    monthlyPrice: 'NPR 3,500 / mo',
    annualPrice: 'NPR 2,800 / mo',
    monthlyBillingNote: 'Billed monthly (NPR 3,500/mo)',
    annualBillingNote: 'NPR 33,600 / year (Save 20% · NPR 2,800/mo)',
    pricing: 'Monthly: NPR 3,500/mo | Annual: NPR 2,800/mo (Save 20%)',
    summary: 'Master Visual Identity System, 30+ Page Guidelines, Monthly Social Media Suite (16 Posts), Full 5-Page Next.js Website, Google & Meta Ads Strategy.',
    deliverables: ['Master Visual Identity System', '30+ Page Guidelines', 'Monthly 16 Social Posts', '5-Page Next.js Website', 'Ads Strategy & ROAS Audit'],
  },
  {
    id: 'pkg-enterprise',
    name: 'Enterprise Custom (Bespoke Scope)',
    badge: 'BESPOKE SCOPE',
    monthlyPrice: 'Custom Retainer / mo',
    annualPrice: 'Custom Milestone / yr',
    monthlyBillingNote: 'Tailored monthly retainer & SLA agreement',
    annualBillingNote: 'Annual milestone or retainer billing schedule',
    pricing: 'Monthly: Custom Retainer | Annual: Custom Milestone',
    summary: 'Enterprise Brand Architecture, Print Collateral & Factory Tech Packs, Custom Web & Mobile App Engineering, Dedicated Lead Director & 24/7 SLA.',
    deliverables: ['Enterprise Brand Architecture', 'Custom Web & Mobile Apps', 'Dedicated Creative Director', '3D CGI & Video Production', 'Dedicated 24/7 Support'],
  },
];
