import { useQuery } from "@tanstack/react-query";

import { listRows, type MediaRecord } from "@/lib/cms/admin";

/** Shared media-library list (MediaPicker + the Media admin page). */
export function useMediaList() {
  return useQuery({
    queryKey: ["admin", "media"],
    queryFn: async () => (await listRows("media", "created_at")) as unknown as MediaRecord[],
  });
}
