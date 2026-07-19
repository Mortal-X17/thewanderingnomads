/**
 * Auto-discovers per-state images from `src/assets/atlas/<STATE_ID>/*`.
 *
 * Folder convention (uppercase 2-letter state code from ATLAS_STATES):
 *   src/assets/atlas/HP/chitkul-01.jpg
 *   src/assets/atlas/JK/dal-lake.jpg
 *
 * Drop new images in and they show up automatically after the next build.
 * No placeholders are committed — empty folders keep the panel graceful.
 */
const modules = import.meta.glob(
  "/src/assets/atlas/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const byState: Record<string, string[]> = {};

for (const [path, url] of Object.entries(modules)) {
  // /src/assets/atlas/HP/foo.jpg -> HP
  const match = path.match(/\/atlas\/([^/]+)\//);
  if (!match) continue;
  const id = match[1].toUpperCase();
  (byState[id] ??= []).push(url);
}

// Stable order
for (const id of Object.keys(byState)) byState[id].sort();

export function getStateImages(stateId: string) {
  return byState[stateId.toUpperCase()] ?? [];
}

export function hasStateImages(stateId: string) {
  return getStateImages(stateId).length > 0;
}
