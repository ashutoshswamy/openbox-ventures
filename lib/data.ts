export const servicePillars = [
  {
    title: "Media Management",
    summary: "Large-format shows and immersive projection, engineered for scale.",
    details: [
      "Laser Show",
      "Light & Sound Show",
      "Holographic Projection",
      "3D Projection Mapping",
      "History & Heritage",
      "3D Room Projection",
    ],
  },
  {
    title: "Content Creation & Execution",
    summary: "Brand and campaign work, produced end to end.",
    details: ["Branding & Identity", "360° Campaigns & Activations", "Digital & Performance", "Content & Film"],
  },
  {
    title: "Strategy & Consulting",
    summary: "Advisory for organizations operating in the public interest.",
    details: [
      "CSR & Public Communication",
      "Technology Solutions",
      "Development Communications",
      "Public Policy Solutions",
    ],
  },
] as const;

export const stats = [
  { value: 12, suffix: "+", label: "Years active" },
  { value: 350, suffix: "+", label: "Projects delivered" },
  { value: 27, suffix: "", label: "Cities served" },
] as const;

export const differentiators = [
  {
    title: "Specialist focus",
    body: "One operating team, entirely dedicated to media, content, and strategy — no split attention, no side business.",
  },
  {
    title: "End-to-end execution",
    body: "We hold the plan, the vendors, and the outcome. No handoffs where accountability gets lost.",
  },
  {
    title: "Pan-India network",
    body: "Ground presence across major metros and secondary cities, ready on short notice.",
  },
  {
    title: "Dedicated account management",
    body: "A single point of contact from kickoff to delivery, every time.",
  },
] as const;

export const processSteps = [
  { title: "Discover", body: "We map the brief against the audience, the constraints, and the goals." },
  { title: "Plan", body: "Production, content, and messaging, locked before day one." },
  { title: "Execute", body: "One accountable team runs delivery on the ground and in real time." },
  { title: "Deliver", body: "On time, on brief." },
  { title: "Support", body: "Post-delivery reporting and an open line for what comes next." },
] as const;

export const testimonials = [
  {
    quote: "They ran the full production top to bottom — planning, vendors, delivery — and we never had to chase a single detail.",
    name: "Production Partner",
    role: "Media Management client",
  },
  {
    quote: "Sharp strategic thinking that actually held up once the campaign was live.",
    name: "Communications Lead",
    role: "Strategy & Consulting client",
  },
  {
    quote: "One point of contact, start to finish. Nothing fell through the cracks.",
    name: "Account Sponsor",
    role: "Ongoing retainer client",
  },
] as const;
