/**
 * Travel Atlas — content model
 * Designed as a scalable schema. Everything except id/name is optional so
 * states, cities, places, stories, and media can be added over time
 * (or later hydrated from a CMS) without touching the UI.
 *
 * Future World Atlas: wrap this list under a Country node; the components
 * already accept a generic `region` prop shape.
 */

import mapData from "./india-svg.json";

export type MediaImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
};

export type MediaVideo = {
  src: string;
  poster?: string;
  title?: string;
};

export type Story = {
  id: string;
  title: string;
  date?: string; // ISO
  destination?: string; // place or city
  narrative?: string;
  images?: MediaImage[];
  relatedPlaces?: string[];
};

export type Place = {
  id: string;
  name: string;
  kind?: "temple" | "trek" | "viewpoint" | "cafe" | "village" | "monument" | "beach" | "market" | "other";
  summary?: string;
  images?: MediaImage[];
  tips?: string[];
};

export type City = {
  id: string;
  name: string;
  summary?: string;
  places?: Place[];
  images?: MediaImage[];
};

export type StateContent = {
  cover?: MediaImage;
  overview?: string;
  journal?: string;
  cities?: City[];
  gallery?: MediaImage[];
  favoriteMemory?: string;
  hiddenGems?: string[];
  culture?: string;
  food?: string[];
  tips?: string[];
  videos?: MediaVideo[];
  relatedExpeditions?: { slug: string; title: string }[];
  stories?: Story[];
};

export type AtlasState = {
  id: string; // 2-letter code from map data
  name: string; // display name
  d: string; // SVG path
  visited: boolean;
  visitedYear?: number;
  content?: StateContent;
};

const raw = mapData as {
  width: number;
  height: number;
  states: { id: string; name: string; d: string }[];
};

export const MAP_WIDTH = raw.width;
export const MAP_HEIGHT = raw.height;

// A few name tweaks for correctness
const nameFix: Record<string, string> = {
  "Arunanchal Pradesh": "Arunachal Pradesh",
  "Andaman & Nicobar Island": "Andaman & Nicobar Islands",
  "Dadara & Nagar Havelli": "Dadra & Nagar Haveli",
  "NCT of Delhi": "Delhi",
};

// Krish's 24 explored states (matches brand stat). Adjustable — this is
// structural metadata (which state is highlighted), NOT a fictional story.
const visitedIds = new Set([
  "HP", "UK", "JK", "PB", "HR", "DL", "RJ", "GJ", "MH", "GA",
  "KA", "KL", "TN", "AP", "TS", "MP", "UP", "BR", "WB", "OD",
  "SK", "AS", "ML", "AR",
]);

export const ATLAS_STATES: AtlasState[] = raw.states
  .map((s) => ({
    id: s.id,
    name: nameFix[s.name] ?? s.name,
    d: s.d,
    visited: visitedIds.has(s.id),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const ATLAS_STATS = {
  statesExplored: ATLAS_STATES.filter((s) => s.visited).length,
  citiesVisited: 200,
  countriesExplored: 1,
  soloExpeditions: 30,
  communityTrips: 5,
};

export function getState(id: string): AtlasState | undefined {
  return ATLAS_STATES.find((s) => s.id === id);
}
