/**
 * Merge CMS atlas records onto the built-in (code-authored) atlas states so the
 * map keeps working when the CMS is empty, and gains real chapters when it isn't.
 */
import { ATLAS_STATES, type AtlasState, type StateContent } from "./data";
import type {
  AtlasDestinationRecord,
  AtlasRegionRecord,
  AtlasStoryRecord,
  GalleryImageRecord,
} from "@/lib/cms/types";

export function mergeAtlasStates(
  regions: AtlasRegionRecord[],
  destinations: AtlasDestinationRecord[],
  stories: AtlasStoryRecord[],
  gallery: GalleryImageRecord[],
): AtlasState[] {
  if (regions.length === 0) return ATLAS_STATES;

  const byCode = new Map(regions.map((r) => [r.code, r]));

  return ATLAS_STATES.map((state) => {
    const region = byCode.get(state.id);
    if (!region) return state;

    const regionGallery = gallery
      .filter((g) => g.region_id === region.id)
      .map((g) => ({ src: g.url, alt: g.alt_text ?? g.caption ?? state.name, caption: g.caption ?? undefined }));

    const cover = region.cover_image_url
      ? { src: region.cover_image_url, alt: `${state.name} cover` }
      : (regionGallery[0] ?? state.content?.cover);

    const content: StateContent = {
      ...state.content,
      cover,
      gallery: regionGallery.length > 0 ? regionGallery : state.content?.gallery,
      overview: region.overview ?? state.content?.overview,
      journal: region.journal ?? state.content?.journal,
      favoriteMemory: region.favorite_memory ?? state.content?.favoriteMemory,
      culture: region.culture ?? state.content?.culture,
      food: region.food.length > 0 ? region.food : state.content?.food,
      tips: region.tips.length > 0 ? region.tips : state.content?.tips,
      hiddenGems: region.hidden_gems.length > 0 ? region.hidden_gems : state.content?.hiddenGems,
      cities: destinations
        .filter((d) => d.region_id === region.id)
        .map((d) => ({
          id: d.id,
          name: d.name,
          summary: d.summary ?? undefined,
          places: [],
        })),
      stories: stories
        .filter((st) => st.region_id === region.id)
        .map((st) => ({
          id: st.id,
          title: st.title,
          date: st.story_date ?? undefined,
          narrative: st.narrative ?? undefined,
        })),
    };

    return {
      ...state,
      visited: region.visited,
      visitedYear: region.visited_year ?? state.visitedYear,
      content,
    };
  });
}
