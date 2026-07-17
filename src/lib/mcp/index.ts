import { defineMcp } from "@lovable.dev/mcp-js";
import listJourneysTool from "./tools/list-journeys";
import getJourneyTool from "./tools/get-journey";
import aboutFounderTool from "./tools/about-founder";
import contactInfoTool from "./tools/contact-info";
import brandStatsTool from "./tools/brand-stats";

export default defineMcp({
  name: "the-wandering-nomads-mcp",
  title: "The Wandering Nomads",
  version: "0.1.0",
  instructions:
    "Public tools for The Wandering Nomads — a founder-led expedition brand run by Krish across the Indian Himalayas and beyond. Use `list_journeys` and `get_journey` to browse expeditions, `about_founder` for Krish's story, `contact_info` to reach him, and `brand_stats` for headline numbers. All data is public and read-only.",
  tools: [
    listJourneysTool,
    getJourneyTool,
    aboutFounderTool,
    contactInfoTool,
    brandStatsTool,
  ],
});
