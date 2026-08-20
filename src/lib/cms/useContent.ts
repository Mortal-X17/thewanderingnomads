import { queryOptions, useQuery } from "@tanstack/react-query";

import { getPublicContent } from "./content.functions";
import { EMPTY_CONTENT, findSection, type PageSection, type PublicContent } from "./types";

export const publicContentQuery = queryOptions({
  queryKey: ["cms", "public-content"],
  queryFn: () => getPublicContent(),
  staleTime: 60_000,
  gcTime: 10 * 60_000,
  retry: 1,
});

/**
 * Public website content. Never suspends and never throws — components keep
 * their built-in default content until CMS data arrives.
 */
export function useContent(): PublicContent {
  const { data } = useQuery(publicContentQuery);
  return data ?? EMPTY_CONTENT;
}

export function useSection(page: string, key: string): PageSection | undefined {
  const { sections } = useContent();
  return findSection(sections, page, key);
}

/** First matching social link URL, with a fallback for pre-CMS defaults. */
export function pickSocial(
  links: PublicContent["social"],
  platform: string,
  fallback: string,
  match?: (handle: string | null) => boolean,
): string {
  const candidates = links.filter((l) => l.platform === platform);
  const found = match ? candidates.find((l) => match(l.handle)) : candidates[0];
  return found?.url ?? fallback;
}
