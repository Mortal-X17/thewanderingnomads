import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const journeys = [
  {
    slug: "kashmir",
    name: "Kashmir",
    tag: "Signature Expedition",
    duration: "8 days",
    season: "Apr — Oct",
    group: "8–12",
    difficulty: "Easy",
    summary:
      "Shikaras on Dal Lake. Nights inside Kashmiri homes. The valley the way Krish knows it.",
  },
  {
    slug: "spiti",
    name: "Spiti",
    tag: "High Altitude",
    duration: "10 days",
    season: "Jun — Sep",
    group: "6–10",
    difficulty: "Moderate",
    summary:
      "Cold desert monasteries, star-lit villages, and roads that hang from the mountain's edge.",
  },
  {
    slug: "jibhi",
    name: "Jibhi",
    tag: "Slow Travel",
    duration: "5 days",
    season: "Mar — Nov",
    group: "6–10",
    difficulty: "Easy",
    summary:
      "Wooden houses, misty pine forests, and a small stream that never stops singing.",
  },
  {
    slug: "valley-of-flowers",
    name: "Valley of Flowers",
    tag: "Monsoon Trek",
    duration: "6 days",
    season: "Jul — Aug",
    group: "6–8",
    difficulty: "Moderate",
    summary:
      "An alpine meadow that bursts into colour for only a few weeks a year.",
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    tag: "Desert Route",
    duration: "7 days",
    season: "Oct — Mar",
    group: "8–12",
    difficulty: "Easy",
    summary:
      "Dunes at dusk, forts at dawn, and the honesty of home-cooked thalis in between.",
  },
  {
    slug: "rishikesh",
    name: "Rishikesh",
    tag: "River & Ridge",
    duration: "4 days",
    season: "Year-round",
    group: "6–10",
    difficulty: "Easy",
    summary:
      "The Ganges at first light, mountain trails at noon, and prayer flags in every breath.",
  },
];

export default defineTool({
  name: "list_journeys",
  title: "List journeys",
  description:
    "List every featured, founder-led expedition offered by The Wandering Nomads, with duration, best season, group size, difficulty and a short summary.",
  inputSchema: {},
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(journeys, null, 2) }],
    structuredContent: { journeys },
  }),
});

export { journeys };

// Re-export slug schema for get_journey to reuse
export const journeySlugs = journeys.map((j) => j.slug) as [string, ...string[]];
export const JourneySlug = z.enum(journeySlugs);
