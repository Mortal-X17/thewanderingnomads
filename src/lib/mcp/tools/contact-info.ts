import { defineTool } from "@lovable.dev/mcp-js";

const contact = {
  brand: "The Wandering Nomads",
  founder: "Krishnakant Yadav (Krish)",
  email: "wanderwithkrish@gmail.com",
  phone: "+91 90052 15255",
  whatsapp: "https://wa.me/919005215255",
  instagramCompany: "https://instagram.com/thewanderingnomads.in",
  instagramFounder: "https://instagram.com/wanderwithkrishh",
  basedIn: "Jaipur, Rajasthan, India",
  website: "https://thewanderingnomads.lovable.app",
  note: "Enquiries are answered personally by Krish. WhatsApp is the fastest route.",
};

export default defineTool({
  name: "contact_info",
  title: "Contact information",
  description:
    "Get the public contact channels for The Wandering Nomads — email, phone, WhatsApp, Instagram handles and the brand's base city.",
  inputSchema: {},
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
    structuredContent: { contact },
  }),
});
