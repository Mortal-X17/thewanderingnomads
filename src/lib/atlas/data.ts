/**
 * Travel Atlas — content model.
 *
 * Renders India + Nepal + Bhutan from a pre-projected map built at author
 * time (see src/lib/atlas/subcontinent-map.json). Content is optional so
 * cities/places/stories/media can be added over time (or CMS-hydrated)
 * without touching the UI.
 */

import mapData from "./subcontinent-map.json";
import { getStateImages } from "./state-images";

export type MediaImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
};

export type MediaVideo = { src: string; poster?: string; title?: string };

export type Story = {
  id: string;
  title: string;
  date?: string;
  destination?: string;
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

export type AtlasCountry = {
  id: string;
  name: string;
  d: string;
  cx: number;
  cy: number;
};

export type AtlasState = {
  id: string;
  name: string;
  d: string;
  cx: number;
  cy: number;
  w: number;
  h: number;
  visited: boolean;
  visitedYear?: number;
  content?: StateContent;
};

const raw = mapData as {
  width: number;
  height: number;
  countries: AtlasCountry[];
  states: { id: string; name: string; d: string; cx: number; cy: number; w: number; h: number }[];
};

export const MAP_WIDTH = raw.width;
export const MAP_HEIGHT = raw.height;
export const ATLAS_COUNTRIES: AtlasCountry[] = raw.countries;

// Krish's 24 explored states.
const visitedIds = new Set([
  "HP", "UK", "JK", "PB", "HR", "DL", "RJ", "GJ", "MH", "GA",
  "KA", "KL", "TN", "AP", "TG", "MP", "UP", "BR", "WB", "OR",
  "SK", "AS", "ML", "AR",
]);

function buildContent(id: string): StateContent | undefined {
  const imgs = getStateImages(id);
  if (imgs.length === 0) return undefined;
  const gallery: MediaImage[] = imgs.map((src, i) => ({
    src,
    alt: `Photograph ${i + 1}`,
  }));
  return { cover: gallery[0], gallery };
}

export const ATLAS_STATES: AtlasState[] = raw.states
  .map((s) => ({
    ...s,
    visited: visitedIds.has(s.id),
    content: buildContent(s.id),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const ATLAS_STATS = {
  statesExplored: ATLAS_STATES.filter((s) => s.visited).length,
  citiesVisited: 200,
  countriesExplored: 3, // India, Nepal, Bhutan
  soloExpeditions: 30,
  communityTrips: 5,
};

export function getState(id: string): AtlasState | undefined {
  return ATLAS_STATES.find((s) => s.id === id);
}
