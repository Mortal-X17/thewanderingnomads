# The Wandering Nomads

A premium founder-led travel platform built to showcase authentic expeditions across India.

Designed with:

- TanStack Start (React 19 + SSR)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Supabase (CMS, auth, storage) via Lovable Cloud

Status:
🚧 Under Active Development

Vision:
To evolve into a production-grade travel platform with booking, AI recommendations, blogs, dashboards, and a seamless digital experience.

## Develop

```bash
npm install
npm run dev       # dev server (SSR)
npm run build     # production build (deploy target managed by the Lovable toolchain)
npm run lint      # eslint
npm run format    # prettier
```

The public site reads published content from Supabase with the publishable key; the
owner dashboard lives at `/admin` (first visit offers one-time owner setup).
