import { Reveal } from "@/components/site/Reveal";
import gCampfire from "@/assets/gallery-campfire.jpg";
import gTrail from "@/assets/gallery-trail.jpg";
import gLocal from "@/assets/gallery-local.jpg";
import gVillage from "@/assets/gallery-village.jpg";
import gPines from "@/assets/gallery-pines.jpg";

export function Community() {
  return (
    <section className="relative bg-background py-24 sm:py-36 border-t border-ink/8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">Community & Moments</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
              You're joining a community,
              <br />
              <em className="italic text-muted-foreground">not buying a trip.</em>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-3 sm:gap-4">
          <Reveal className="col-span-12 sm:col-span-7">
            <Frame src={gCampfire} alt="Campfire evening under a clear Himalayan sky" ratio="16/10" />
          </Reveal>
          <Reveal delay={0.08} className="col-span-6 sm:col-span-5">
            <Frame src={gLocal} alt="Sharing a meal with a local host in Kashmir" ratio="4/5" />
          </Reveal>
          <Reveal delay={0.12} className="col-span-6 sm:col-span-3">
            <Frame src={gPines} alt="Morning light through a deodar canopy" ratio="4/5" />
          </Reveal>
          <Reveal delay={0.16} className="col-span-12 sm:col-span-5">
            <Frame src={gVillage} alt="A stone village at the edge of the ridge" ratio="4/3" />
          </Reveal>
          <Reveal delay={0.2} className="col-span-12 sm:col-span-4">
            <Frame src={gTrail} alt="Small group on a pine-lined trail" ratio="4/3" />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-lg text-[14.5px] leading-relaxed text-muted-foreground">
            Every expedition ends the same way — new friendships, shared silences,
            and a group photo no one wants to leave.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Frame({
  src,
  alt,
  ratio,
}: {
  src: string;
  alt: string;
  ratio: string;
}) {
  return (
    <figure
      className="group relative overflow-hidden rounded-[24px] hairline bg-muted"
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />
    </figure>
  );
}
