# Travel Atlas — State Image Library

Drop real photographs into these folders and they'll appear on the
Atlas panel for that state automatically. **No placeholders are
committed** — empty folders keep the UI in its graceful "awaiting
a chapter" state.

## Folder convention

```
src/assets/atlas/
├── HP/                 # 2-letter state code (uppercase)
│   ├── chitkul-01.jpg
│   ├── kalpa-morning.jpg
│   └── ...
├── JK/
│   └── dal-lake-01.jpg
└── ...
```

The **first image (alphabetically) becomes the chapter cover**;
the full set powers the state gallery. Any of `.jpg`, `.jpeg`,
`.png`, `.webp`, `.avif` are picked up.

## State codes

`AN AP AR AS BR CH CT DD DL DN GA GJ HR HP JK JH KA KL LD MP MH MN ML MZ NL OR PY PB RJ SK TN TG TR UP UK WB`

## Adding a new photo

1. Save it as `src/assets/atlas/<STATE_ID>/<slug>.jpg`
2. Commit and push — the build picks it up via `import.meta.glob`.
3. It appears in the Travel Atlas immediately on the next deploy.

No code changes required.
