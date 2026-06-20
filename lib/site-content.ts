export const SITE = {
  name: "ProDrive",
  tagline: "Garage",
  phone: "+1 (555) 892-0140",
  email: "service@prodrivegarage.com",
  address: "2840 Motor Avenue, Los Angeles, CA 90034",
  hours: "Mon–Sat 7:30 AM – 7:00 PM",
} as const;

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Book Now" },
] as const;

export const HERO = {
  eyebrow: "Premium Oil Change & Garage",
  title: "Expert care for",
  titleAccent: "every mile",
  description:
    "Full-synthetic oil changes, brake service, and complete vehicle maintenance — performed by certified technicians in a state-of-the-art bay.",
  cta: "Book Service",
  scrollHint: "Scroll to watch assembly",
} as const;

export const SERVICES = [
  {
    icon: "/icons/icon-oil.svg",
    title: "Full Synthetic Oil Change",
    description:
      "Premium 0W-20 / 5W-30 synthetic oil, new filter, 21-point inspection, and fluid top-off. Most vehicles done in 30 minutes.",
    price: "From $79",
    accent: "#3b9eff",
  },
  {
    icon: "/icons/icon-engine.svg",
    title: "Engine Diagnostics",
    description:
      "OBD-II scan, compression check, and detailed report. We find issues early — before they become costly repairs.",
    price: "From $49",
    accent: "#ff6b2c",
  },
  {
    icon: "/icons/icon-wrench.svg",
    title: "Brake & Suspension",
    description:
      "Pad replacement, rotor resurfacing, caliper service, and alignment. OEM-grade parts with 12-month warranty.",
    price: "From $149",
    accent: "#3b9eff",
  },
  {
    icon: "/icons/icon-lift.svg",
    title: "Lift & Undercarriage",
    description:
      "Complete underbody inspection, exhaust check, and tire rotation. Transparent pricing before any work begins.",
    price: "From $39",
    accent: "#ff6b2c",
  },
] as const;

export const PROCESS = [
  {
    step: "01",
    title: "Drive-in & Check-in",
    body: "Pull into our bay, check in at the desk or via app. We log your vehicle and service history instantly.",
  },
  {
    step: "02",
    title: "Inspection & Quote",
    body: "Technician performs a visual and digital inspection. You approve the work before we touch a single bolt.",
  },
  {
    step: "03",
    title: "Service & Assembly",
    body: "Precision work with quality fluids and parts. Watch live from our lounge or get SMS updates.",
  },
  {
    step: "04",
    title: "Quality Check & Go",
    body: "Final road test, torque verification, and service sticker. Drive away with confidence and a clean cabin.",
  },
] as const;

export const STATS = [
  { value: "15K+", label: "Services Completed" },
  { value: "4.9", label: "Google Rating" },
  { value: "30 min", label: "Avg. Oil Change" },
  { value: "12 mo", label: "Parts Warranty" },
] as const;

export const PRICING = [
  {
    name: "Essential",
    price: "$79",
    period: "per visit",
    features: [
      "Full synthetic oil change",
      "Oil filter replacement",
      "21-point inspection",
      "Tire pressure check",
    ],
    highlighted: false,
  },
  {
    name: "Complete",
    price: "$149",
    period: "per visit",
    features: [
      "Everything in Essential",
      "Brake pad inspection",
      "Battery & belt check",
      "Cabin air filter",
      "Priority scheduling",
    ],
    highlighted: true,
  },
  {
    name: "Performance",
    price: "$249",
    period: "per visit",
    features: [
      "Everything in Complete",
      "Full diagnostic scan",
      "Fluid flush (coolant/brake)",
      "Alignment check",
      "1-year maintenance plan",
    ],
    highlighted: false,
  },
] as const;

export const FOOTER = {
  copyright: `© ${new Date().getFullYear()} ProDrive Garage. All rights reserved.`,
  links: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Careers", href: "#" },
  ],
} as const;
