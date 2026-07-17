import { defineTool } from "@lovable.dev/mcp-js";

const stats = {
  statesExplored: 24,
  citiesVisited: 200,
  soloExpeditions: 30,
  happyTravellers: 70,
  founderLedExpeditions: 5,
  foundedYear: 2024,
  monthsOnTheRoad: 9,
  founderLed: true,
  smallGroupsOnly: true,
};

export default defineTool({
  name: "brand_stats",
  title: "Brand statistics",
  description:
    "Get headline statistics for The Wandering Nomads — states explored, cities visited, expeditions run, and community size.",
  inputSchema: {},
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(stats, null, 2) }],
    structuredContent: { stats },
  }),
});
