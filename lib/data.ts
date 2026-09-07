/**
 * Single source of site content. Facts (founding year, offices, countries)
 * verified against the Open Box Ventures LLP public LinkedIn profile, Sept 2026.
 * Marketing copy is written for the site, not quoted from a source.
 */

export const company = {
  name: "Open Box Ventures",
  legalName: "Open Box Ventures LLP",
  founded: 2023,
  tagline: "A diversified business solutions company.",
  blurb:
    "Open Box Ventures is a diversified business solutions company helping brands and businesses grow, connect, and operate more effectively in an ever-changing global marketplace.",
  about: [
    "Founded in 2023, Open Box Ventures brings a broad range of services together under one roof so businesses don't have to stitch together a dozen different providers to bring an idea to life.",
    "With teams across India, the United States, Canada, and the UAE, our international presence lets us work with clients across markets while delivering solutions that are creative, practical, scalable, and results-driven.",
    "Our multidisciplinary team combines industry expertise, creativity, technology, and strategic thinking to provide end-to-end solutions tailored to each client's goals.",
  ],
  email: "hello@openboxventures.in",
  phone: "+91 00000 00000",
} as const;

export const offices = [
  { city: "Mohali", region: "Punjab, India", role: "Headquarters" },
  { city: "Dharamshala", region: "Himachal Pradesh, India" },
  { city: "Pune", region: "Maharashtra, India" },
  { city: "Wayne", region: "New Jersey, USA" },
  { city: "Abbotsford", region: "British Columbia, Canada" },
  { city: "Sharjah", region: "United Arab Emirates" },
] as const;

export const stats = [
  { value: 6, suffix: "", label: "Offices worldwide" },
  { value: 4, suffix: "", label: "Countries" },
  { value: 8, suffix: "", label: "Service lines" },
] as const;

/**
 * `icon` is a lucide-react export name, resolved in the component layer so this
 * file stays a plain data module. `accent` drives the per-service visual block.
 */
export const services = [
  {
    slug: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    icon: "Truck",
    accent: "#7ca6c9",
    tagline: "Freight, dispatch, and cross-border trade, handled end to end.",
    summary:
      "We move goods and paperwork across borders so your operation keeps running. From freight brokerage and truck dispatch to import and export documentation, we take the coordination load off your team.",
    offerings: [
      "Freight brokerage & carrier sourcing",
      "Truck dispatch & load management",
      "Import & export documentation",
      "Customs and compliance coordination",
      "Warehousing & fulfilment partners",
      "Route and cost optimisation",
    ],
    outcome: "A supply chain that runs without you chasing every shipment.",
  },
  {
    slug: "marketing-branding",
    name: "Marketing & Branding",
    icon: "Megaphone",
    accent: "#c98f7c",
    tagline: "Positioning, identity, and campaigns that actually move numbers.",
    summary:
      "We build the brand and the demand. Strategy, identity, and full-funnel campaigns designed around your goals and measured against them.",
    offerings: [
      "Brand strategy & positioning",
      "Visual identity & guidelines",
      "Campaign planning & execution",
      "Social media management",
      "SEO & performance marketing",
      "Email & lifecycle marketing",
    ],
    outcome: "A brand people recognise and a pipeline you can forecast.",
  },
  {
    slug: "event-management",
    name: "Event Management",
    icon: "CalendarDays",
    accent: "#b3c97c",
    tagline: "Launches, conferences, and activations, planned and run on the ground.",
    summary:
      "We handle the whole event — concept, vendors, logistics, and the day itself — so your team can focus on the guests, not the run sheet.",
    offerings: [
      "Concept & creative direction",
      "Venue sourcing & vendor management",
      "Production & on-site execution",
      "Corporate events & conferences",
      "Product launches & activations",
      "Artist & talent coordination",
    ],
    outcome: "An event that lands, with nothing falling through the cracks.",
  },
  {
    slug: "it-digital",
    name: "IT Services & Digital Solutions",
    icon: "MonitorSmartphone",
    accent: "#8f7cc9",
    tagline: "Software, automation, and support to keep the business moving.",
    summary:
      "We design, build, and maintain the systems your business runs on — web apps, internal tools, integrations, and the support to keep them healthy.",
    offerings: [
      "Web & mobile application development",
      "Business process automation",
      "API & third-party integrations",
      "Cloud setup & DevOps",
      "AI & data solutions",
      "Ongoing maintenance & support",
    ],
    outcome: "Systems that fit how you work, not the other way around.",
  },
  {
    slug: "ecommerce-development",
    name: "E-Commerce Development",
    icon: "ShoppingCart",
    accent: "#7cc9a6",
    tagline: "Storefronts built to sell and simple to run.",
    summary:
      "We build online stores on the right platform for your catalogue and margins, wired into payments, shipping, and inventory from day one.",
    offerings: [
      "Shopify, WooCommerce & custom builds",
      "Payment & shipping integration",
      "Inventory & order management",
      "Conversion-focused UX",
      "Marketplace listings & sync",
      "Analytics & reporting setup",
    ],
    outcome: "A store your team can operate without a developer on call.",
  },
  {
    slug: "content-creation",
    name: "Content Creation",
    icon: "PenLine",
    accent: "#c9b37c",
    tagline: "Words, visuals, and video that carry the brand across every channel.",
    summary:
      "We produce the content your channels need — written, designed, and built for how people actually read and scroll.",
    offerings: [
      "Copywriting & editorial",
      "Social & short-form content",
      "Graphic design & motion",
      "AI-assisted content production",
      "Content calendars & workflows",
      "Localisation for regional markets",
    ],
    outcome: "A content pipeline that stays full without last-minute scrambles.",
  },
  {
    slug: "photography-videography",
    name: "Photography & Videography",
    icon: "Camera",
    accent: "#7c9fc9",
    tagline: "Product, brand, and event shoots, from brief to final cut.",
    summary:
      "We shoot and edit the visuals your brand needs — products, people, spaces, and events — with a crew that plans the shot list before the camera comes out.",
    offerings: [
      "Product & catalogue photography",
      "Brand & lifestyle shoots",
      "Corporate & event coverage",
      "Video production & editing",
      "Aerial & drone footage",
      "Studio & on-location setups",
    ],
    outcome: "A visual library you can draw on for months, not one campaign.",
  },
  {
    slug: "advertising",
    name: "Advertising Services",
    icon: "Radio",
    accent: "#c97ca6",
    tagline: "Media planning and buying across digital, print, and outdoor.",
    summary:
      "We plan, buy, and manage advertising across the channels that reach your audience, and report on what each rupee returned.",
    offerings: [
      "Media planning & strategy",
      "Paid search & social buying",
      "Programmatic & display",
      "Print, radio & outdoor",
      "Creative production for ads",
      "Performance tracking & reporting",
    ],
    outcome: "Ad spend you can defend in a board meeting.",
  },
] as const;

export type Service = (typeof services)[number];

export const differentiators = [
  {
    title: "Everything under one roof",
    body: "Every discipline your business needs, held by one team — no juggling vendors, no gaps where accountability gets lost.",
  },
  {
    title: "Multidisciplinary by default",
    body: "Industry expertise, creative, technology, and strategy in the same room, working the same brief.",
  },
  {
    title: "International presence",
    body: "Teams across India, the US, Canada, and the UAE, working across markets and time zones.",
  },
  {
    title: "Built around your goals",
    body: "Solutions shaped to each client's objectives — creative, practical, scalable, and results-driven.",
  },
] as const;

export const processSteps = [
  { title: "Discover", body: "We map the brief against your audience, your constraints, and what success actually looks like." },
  { title: "Plan", body: "Scope, budget, and timeline locked before any work starts — no moving goalposts." },
  { title: "Execute", body: "One accountable team runs delivery, on the ground and in real time." },
  { title: "Deliver", body: "On time and on brief, with the handover your team needs to run it." },
  { title: "Support", body: "Post-delivery reporting and an open line for whatever comes next." },
] as const;

// ponytail: placeholder testimonials — swap for real client quotes before launch.
export const testimonials = [
  {
    quote: "They took on marketing, the website, and our launch event as one engagement. One point of contact, nothing dropped.",
    name: "Client testimonial",
    role: "Placeholder — retail brand",
  },
  {
    quote: "We stopped managing five agencies and started managing one relationship. The work got better, not worse.",
    name: "Client testimonial",
    role: "Placeholder — logistics client",
  },
  {
    quote: "Practical people. Every recommendation came with a plan to actually do it.",
    name: "Client testimonial",
    role: "Placeholder — B2B services",
  },
] as const;

// ponytail: placeholder outcomes — replace with verified metrics/case studies.
export const achievements = [
  { value: 6, suffix: "", label: "Offices opened across 4 countries since 2023" },
  { value: 8, suffix: "", label: "Service lines delivered under one roof" },
  { value: 100, suffix: "+", label: "Projects delivered for brands and businesses" },
] as const;

export const reviews = [
  { platform: "Google", rating: "4.8", note: "Placeholder — connect live rating." },
  { platform: "Clutch", rating: "4.7", note: "Placeholder — connect live rating." },
  { platform: "LinkedIn", rating: "—", note: "29 team members and growing." },
] as const;

// ponytail: gallery is placeholder tiles until real photos/clips land in /public.
export const lifeGallery = [
  { caption: "Team standup, Mohali HQ", accent: "#7ca6c9" },
  { caption: "Campaign shoot day", accent: "#c98f7c" },
  { caption: "Diwali celebration", accent: "#c9b37c" },
  { caption: "Client launch event", accent: "#b3c97c" },
  { caption: "Design critique", accent: "#8f7cc9" },
  { caption: "Friday demo session", accent: "#7cc9a6" },
  { caption: "Dharamshala offsite", accent: "#7c9fc9" },
  { caption: "New joiners week", accent: "#c97ca6" },
] as const;

export const lifePoints = [
  {
    title: "Real work, real ownership",
    body: "Small teams, direct client contact, and the room to run a project rather than a task list.",
  },
  {
    title: "Across offices, one culture",
    body: "Mohali, Dharamshala, Pune, and beyond — same standards, same openness, wherever you sit.",
  },
  {
    title: "We celebrate the wins",
    body: "Launches, festivals, offsites, Friday demos — the calendar isn't only deadlines.",
  },
] as const;

// ponytail: placeholder employee voices — replace with real quotes + names/roles.
export const employeeVoices = [
  {
    quote: "I've touched logistics, marketing, and a product build in my first year. You don't get boxed in here.",
    name: "Team member",
    role: "Placeholder — Operations",
  },
  {
    quote: "The people who set the strategy are the same people who sit next to you doing the work.",
    name: "Team member",
    role: "Placeholder — Creative",
  },
] as const;
