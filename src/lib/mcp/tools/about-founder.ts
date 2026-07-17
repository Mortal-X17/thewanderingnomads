import { defineTool } from "@lovable.dev/mcp-js";

const founder = {
  name: "Krishnakant Yadav",
  alias: "Krish",
  role: "Founder & Expedition Lead, The Wandering Nomads",
  basedIn: "Jaipur, Rajasthan, India",
  origin: "Deoria, Uttar Pradesh, India",
  bio: "Krish has spent nine months on the road across India — 24+ states, 200+ cities. He personally leads every expedition offered by The Wandering Nomads. Alongside travel, he is a certified ethical hacker and cybersecurity professional.",
  milestones: [
    "Born in a small village in Deoria, Uttar Pradesh",
    "Moved to Jaipur for university",
    "Discovered solo travel — one backpack, thousands of kilometres of hitchhiking",
    "Travelled across 24+ Indian states",
    "Visited 200+ cities and towns",
    "Built a travel community",
    "Founded The Wandering Nomads (2024)",
    "Certified ethical hacker (parallel practice)",
  ],
};

export default defineTool({
  name: "about_founder",
  title: "About the founder",
  description:
    "Get a short biography and journey timeline for Krish (Krishnakant Yadav), founder of The Wandering Nomads.",
  inputSchema: {},
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(founder, null, 2) }],
    structuredContent: { founder },
  }),
});
