import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { MediaImage } from "@/lib/atlas/data";
import { EmptyBlock } from "./EmptyBlock";

/**
 * Reusable masonry gallery with fullscreen lightbox, lazy loading,
 * and optional category filter. Prepared to scale to hundreds of images.
 */
export function Gallery({
  images,
  categories,
  emptyTitle = "Photographs will land here after the next expedition.",
  emptyHint = "As Krish captures new frames on the trail, they'll be curated into this gallery.",
}: {
  images?: MediaImage[];
  categories?: string[];
  emptyTitle?: string;
  emptyHint?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const shown = active
    ? images?.filter((i) => i.caption?.toLowerCase().includes(active.toLowerCase()))
    : images;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open === null || !shown) return;
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? 0 : (i + 1) % shown.length));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? 0 : (i - 1 + shown.length) % shown.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shown]);

  if (!images || images.length === 0) {
    return (
      <EmptyBlock
        label="Gallery"
        title={emptyTitle}
        hint={emptyHint}
      />
    );
  }

  return (
    <div>
      {categories && categories.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActive(null)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              active === null
                ? "border-ink bg-ink text-snow"
                : "border-ink/15 text-ink/70 hover:bg-ink/5"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                active === c
                  ? "border-ink bg-ink text-snow"
                  : "border-ink/15 text-ink/70 hover:bg-ink/5"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}

      <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3">
        {shown?.map((img, i) => (
          <button
            key={img.src + i}
            onClick={() => setOpen(i)}
            className="group block w-full overflow-hidden rounded-xl border border-ink/8 bg-ink/[0.02] break-inside-avoid"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              width={img.width}
              height={img.height}
              className="h-auto w-full transition duration-700 group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && shown && shown[open] ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur"
          >
            <motion.img
              key={shown[open].src}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              src={shown[open].src}
              alt={shown[open].alt}
              className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
