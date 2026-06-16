// Locations for programmatic SEO pages. Cities filter the directory by
// `location`; Nairobi areas filter by `location = 'Nairobi'` + `town`.

export type Location = {
  slug: string;
  name: string;
  type: 'city' | 'area';
  city: string; // parent city (same as name for type 'city')
  blurb: string; // unique local context, keeps combo pages from being thin
};

export const LOCATIONS: Location[] = [
  // --- Cities ---
  { slug: 'nairobi', name: 'Nairobi', type: 'city', city: 'Nairobi', blurb: 'Kenya’s capital and commercial hub, home to the densest concentration of CPA-K professionals and KRA enforcement activity.' },
  { slug: 'mombasa', name: 'Mombasa', type: 'city', city: 'Mombasa', blurb: 'The coastal port city, with strong demand around shipping, logistics, hospitality and rental property.' },
  { slug: 'kisumu', name: 'Kisumu', type: 'city', city: 'Kisumu', blurb: 'The lakeside hub for western Kenya, serving agribusiness, trade and a growing SME base.' },
  { slug: 'nakuru', name: 'Nakuru', type: 'city', city: 'Nakuru', blurb: 'A fast-growing Rift Valley city with agribusiness, real estate and manufacturing activity.' },
  { slug: 'eldoret', name: 'Eldoret', type: 'city', city: 'Eldoret', blurb: 'A North Rift commercial centre with agriculture, transport and a rising number of SMEs.' },
  { slug: 'thika', name: 'Thika', type: 'city', city: 'Thika', blurb: 'An industrial town near Nairobi with manufacturing, agribusiness and rental property demand.' },

  // --- Nairobi areas ---
  { slug: 'westlands', name: 'Westlands', type: 'area', city: 'Nairobi', blurb: 'A business and lifestyle district packed with SMEs, agencies and serviced apartments.' },
  { slug: 'upper-hill', name: 'Upper Hill', type: 'area', city: 'Nairobi', blurb: 'Nairobi’s corporate and financial-services core, dense with company head offices.' },
  { slug: 'cbd', name: 'CBD', type: 'area', city: 'Nairobi', blurb: 'The central business district, with traders, professional firms and commercial property.' },
  { slug: 'kilimani', name: 'Kilimani', type: 'area', city: 'Nairobi', blurb: 'A high-density residential and rental hotspot, a focus of KRA rental-income enforcement.' },
  { slug: 'karen', name: 'Karen', type: 'area', city: 'Nairobi', blurb: 'An upmarket suburb with high-value residential property and small businesses.' },
  { slug: 'parklands', name: 'Parklands', type: 'area', city: 'Nairobi', blurb: 'A mixed commercial-residential area with a strong trader and landlord base.' },
  { slug: 'kasarani', name: 'Kasarani', type: 'area', city: 'Nairobi', blurb: 'A large residential zone and an early target of KRA rental-income data collection.' },
  { slug: 'embakasi', name: 'Embakasi', type: 'area', city: 'Nairobi', blurb: 'A populous eastern sub-county with dense rental housing and small enterprises.' },
  { slug: 'langata', name: 'Langata', type: 'area', city: 'Nairobi', blurb: 'A residential area with significant rental property under active KRA monitoring.' },
];

export const LOCATION_MAP = Object.fromEntries(LOCATIONS.map((l) => [l.slug, l]));
export const getLocation = (slug: string): Location | undefined => LOCATION_MAP[slug];
