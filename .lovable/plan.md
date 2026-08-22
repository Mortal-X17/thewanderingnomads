# Admin CMS Enhancements

## Goal
Add two production-ready customisation features to the `/admin` studio so content can be edited more expressively and arranged more intuitively, without touching code for every layout change.

## 1. Rich text editor for long-form content

**What it is**
Replace the plain `textarea` control for long-form fields with a lightweight inline rich-text editor (headings, bold, italic, links, lists, blockquotes). Output is stored as clean HTML.

**Where it applies**
- `about_content.biography`
- `journeys.long_description` and `travel_info`
- `atlas_regions.journal`, `favorite_memory`, `culture`, `founder_note`
- `atlas_stories.narrative`
- `page_sections.description`

**How it works for the user**
- Fields marked `type: "rich-text"` in `fields.tsx` render a styled toolbar above a content-editable area.
- Existing plain-text content continues to work; it is treated as a single paragraph.
- Only safe formatting tags are allowed; pasted content is stripped to the allowed schema.
- The public site renders the stored HTML safely inside its existing text containers.

**Technical notes**
- Use Tiptap (`@tiptap/react` + starter-kit + link extension) — headless, works with Tailwind v4, and is lightweight enough for the admin bundle.
- Add a new `RichTextEditor` component under `src/components/admin/`.
- Add `"rich-text"` to the `FieldType` union and render it in `FieldInput`.
- Sanitise output on the server side inside `saveSingleton` / `insertRow` / `updateRow` helpers using a small allow-list (or store raw HTML and render via a sanitising utility on the public side).
- No database schema changes required; the same text columns hold HTML.

## 2. Drag-and-drop visual reordering

**What it is**
Upgrade the `CollectionManager` list from up/down arrow buttons to a drag-and-drop interface so admins can reorder items by dragging cards.

**Where it applies**
Any `orderable` collection:
- Journeys on the homepage
- Gallery images
- Milestones
- Testimonials
- Page sections
- Social links
- Atlas destinations and stories (within their parent region)

**How it works for the user**
- Each list row shows a drag handle on the left.
- Dragging a row moves it to a new position; on drop, the new order is saved immediately and the public site updates.
- Mobile: the same drag handle works with touch.
- The existing `sort_order` column continues to drive the order.

**Technical notes**
- Use `@dnd-kit/sortable` + `@dnd-kit/core` — modular, accessible, and supports both pointer and keyboard reordering.
- Refactor `CollectionManager` rows into sortable items.
- Replace the `swapOrder` helper with a `reorderRows(table, orderedIds)` helper that writes the new `sort_order` values in one batch.
- Keep the existing `move` mutation shape but call the new reorder helper.

## 3. Homepage section layout (bonus scope if the first two feel small)

**What it is**
A visual mini-layout switcher for `page_sections` so Krish can change how a homepage block is presented.

**How it works for the user**
- In the Page Sections editor, a new "Layout" select on each section offers options like `default`, `text-left`, `text-right`, `full-bleed`, `centered`.
- The public homepage reads the `data.layout` field and applies the chosen layout class.
- This requires populating the `data` JSONB column on `page_sections`.

**Technical notes**
- Add a `layout` select field to `page_sections` fields.
- Update the homepage to consume `section.data.layout` and apply the corresponding layout class.
- This is a small, optional extension; the main deliverables are the rich-text editor and drag-and-drop reordering.

## Out of scope
- No new database tables or migrations.
- No changes to public-page routing or the launch countdown.
- No new admin roles or permissions.

## Files to change
- `package.json` — add `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.
- `src/components/admin/fields.tsx` — add `rich-text` type.
- `src/components/admin/RichTextEditor.tsx` — new Tiptap wrapper.
- `src/components/admin/CollectionManager.tsx` — add drag-and-drop.
- `src/lib/cms/admin.ts` — add `reorderRows` helper.
- `src/routes/admin/pages.tsx`, `src/routes/admin/journeys.tsx`, `src/routes/admin/atlas.tsx` — switch relevant `textarea` fields to `rich-text`.
- Public rendering files — ensure HTML from rich-text fields is rendered safely (e.g. `src/routes/about.tsx`, `src/routes/journeys.tsx`, `src/routes/atlas.tsx`).

## Acceptance criteria
1. Long-form fields render a working toolbar with bold, italic, link, list, and heading controls.
2. Stored content displays correctly on the public website with the same formatting.
3. Dragging a row in any orderable collection reorders it and persists the change.
4. No console errors or hydration issues after the changes.
5. The pre-launch countdown and public site remain unchanged in behaviour.
