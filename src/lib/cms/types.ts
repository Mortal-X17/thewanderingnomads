/**
 * Shared CMS content types consumed by the public website.
 *
 * These are intentionally hand-written (rather than derived from the generated
 * database types) so public components can stay decoupled from the schema and
 * so fallback/default content can satisfy the same shape.
 */

export type ContentStatus = "draft" | "published";

export type SiteSettings = {
  site_title: string;
  site_description: string;
  seo_title: string;
  seo_description: string;
  keywords: string;
  og_image_url: string | null;
  favicon_url: string | null;
  logo_url: string | null;
  footer_copyright: string;
  launch_status: "pre_launch" | "live";
  launch_at: string;
  timezone: string;
  contact_email: string | null;
  contact_phone: string | null;
  updated_at?: string;
};

export type DesignSettings = {
  primary_color: string;
  accent_color: string;
  bg_light: string;
  bg_dark: string;
  text_light: string;
  text_dark: string;
  border_color: string;
  glass_opacity: number;
  glass_blur: number;
  radius: number;
  heading_font: string;
  body_font: string;
  base_font_size: number;
  animation_intensity: number;
  animation_speed: number;
};

export type SocialLink = {
  id: string;
  platform: string;
  label: string;
  handle: string | null;
  url: string;
  sort_order: number;
};

export type PageSection = {
  id: string;
  page: string;
  section_key: string;
  heading: string | null;
  subtitle: string | null;
  description: string | null;
  cta_label: string | null;
  cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
  image_url: string | null;
  sort_order: number;
};

export type AboutContent = {
  founder_name: string;
  founder_title: string;
  biography: string;
  secondary_identity: string;
  founder_image_url: string | null;
  achievements: string[];
  certifications: string[];
  cta_label: string | null;
  cta_href: string | null;
};

export type Milestone = {
  id: string;
  year: string | null;
  title: string;
  description: string | null;
  sort_order: number;
};

export type JourneyRecord = {
  id: string;
  slug: string;
  destination: string;
  title: string;
  short_description: string | null;
  long_description: string | null;
  duration: string | null;
  price: string | null;
  difficulty: string | null;
  best_season: string | null;
  is_available: boolean;
  highlights: string[];
  travel_info: string | null;
  notes: string | null;
  cta_label: string | null;
  booking_url: string | null;
  hero_image_url: string | null;
  sort_order: number;
};

export type GalleryImageRecord = {
  id: string;
  url: string;
  caption: string | null;
  alt_text: string | null;
  location: string | null;
  album: string | null;
  region_id: string | null;
  journey_id: string | null;
  sort_order: number;
};

export type AtlasRegionRecord = {
  id: string;
  code: string;
  name: string;
  kind: "state" | "country";
  visited: boolean;
  visited_year: number | null;
  overview: string | null;
  journal: string | null;
  favorite_memory: string | null;
  culture: string | null;
  food: string[];
  tips: string[];
  hidden_gems: string[];
  founder_note: string | null;
  cover_image_url: string | null;
  sort_order: number;
};

export type AtlasDestinationRecord = {
  id: string;
  region_id: string;
  name: string;
  kind: string | null;
  summary: string | null;
  tips: string[];
  sort_order: number;
};

export type AtlasStoryRecord = {
  id: string;
  region_id: string;
  destination_id: string | null;
  title: string;
  story_date: string | null;
  narrative: string | null;
  sort_order: number;
};

export type TestimonialRecord = {
  id: string;
  name: string;
  review: string;
  avatar_url: string | null;
  trip: string | null;
  review_date: string | null;
  rating: number | null;
  sort_order: number;
};

export type PublicContent = {
  ok: boolean;
  settings: SiteSettings | null;
  design: DesignSettings | null;
  social: SocialLink[];
  sections: PageSection[];
  about: AboutContent | null;
  milestones: Milestone[];
  journeys: JourneyRecord[];
  gallery: GalleryImageRecord[];
  regions: AtlasRegionRecord[];
  destinations: AtlasDestinationRecord[];
  stories: AtlasStoryRecord[];
  testimonials: TestimonialRecord[];
};

export const EMPTY_CONTENT: PublicContent = {
  ok: false,
  settings: null,
  design: null,
  social: [],
  sections: [],
  about: null,
  milestones: [],
  journeys: [],
  gallery: [],
  regions: [],
  destinations: [],
  stories: [],
  testimonials: [],
};

/** Find a page section by page + key. */
export function findSection(
  sections: PageSection[],
  page: string,
  key: string,
): PageSection | undefined {
  return sections.find((s) => s.page === page && s.section_key === key);
}
