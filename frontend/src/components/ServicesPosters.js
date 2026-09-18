import { Link } from "react-router-dom";
import { Reveal, ChapterTag } from "../lib/motion";

const POSTERS = [
  {
    id: "brand", num: "01", title: "Brand", cls: "bg-hot text-cream", edge: "border-cream",
    items: ["Brand strategy", "Positioning", "Identity", "Brand systems", "Messaging"],
    hover: "strategy", hoverSwap: "not another 87-slide deck",
    cta: "Need a brand that doesn't look like everyone else's?",
  },
  {
    id: "creative", num: "02", title: "Creative", cls: "bg-cream text-ink", edge: "border-ink",
    items: ["Campaigns", "Creative direction", "Social content", "Design", "Copy"],
    hover: "pretty", hoverSwap: "pretty that performs",
    cta: "Want creative people actually remember?",
  },
  {
    id: "growth", num: "03", title: "Growth", cls: "bg-ink text-cream", edge: "border-cream/40",
    items: ["Performance marketing", "Acquisition", "Conversion", "Growth strategy"],
    hover: "performance", hoverSwap: "pretty + profitable",
    cta: "Ready to turn attention into revenue?",
  },
  {
    id: "digital", num: "04", title: "Digital", cls: "bg-wine text-cream", edge: "border-cream/40",
    items: ["Websites", "Landing pages", "Product experiences", "Digital campaigns"],
    hover: "websites", hoverSwap: "not just digital brochures",
    cta: "Need a website that actually converts?",
  },
  {
    id: "launch", num: "05", title: "Launch", cls: "bg-neon text-ink", edge: "border-ink",
    items: ["Go-to-market", "Launch campaigns", "Influencer campaigns", "Social launch", "Performance"],
    hover: "websites", hoverSwap: "",
    cta: "Launching something soon?",
  },
];

export default function ServicesPosters() {
  return (
    <section id="services" className="relative bg-maroon px-5 py-24 md:px-10 md:py-36" data-testid="services-section">
      <ChapterTag num="05" label="What we do" />
      <Reveal className="mt-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-3xl font-sans text-3xl font-black uppercase leading-[1.02] tracking-tight text-cream sm:text-5xl lg:text-6xl">
          Not services.<br /><span className="font-serif normal-case italic tracking-normal text-neon">Weapons.</span>
        </h2>
        <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-cream/50">
          Pick your fighter. Or take all five — hum sambhal lenge.
        </p>
      </Reveal>

      <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 lg:grid lg:grid-cols-5 lg:overflow-visible" data-testid="services-posters">
        {POSTERS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08} className="min-w-[270px] snap-center lg:min-w-0">
            <article
              data-testid={`service-poster-${p.id}`}
              className={`group relative flex h-[440px] flex-col justify-between overflow-hidden border-2 ${p.edge} ${p.cls} p-6 transition-transform duration-300 hover:-translate-y-2 hover:rotate-1`}
            >
              <div className="halftone-dots pointer-events-none absolute -right-8 -top-8 h-36 w-36 opacity-20" />
              <div className="flex items-start justify-between">
                <span className="font-serif text-6xl italic opacity-40">{p.num}</span>
                <span className="rotate-3 border border-current px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] opacity-70">daftar dept.</span>
              </div>
              <div>
                <h3 className="font-sans text-4xl font-black uppercase tracking-tight">{p.title}</h3>
                <ul className="mt-5 space-y-1.5">
                  {p.items.map((it) => (
                    <li key={it} className="font-sans text-sm font-medium opacity-80">
                      {it.toLowerCase().includes(p.hover) ? (
                        <span className="group relative cursor-help underline decoration-dotted underline-offset-4" data-testid={`service-hover-word-${p.id}`}>
                          {it}
                          <span className="pointer-events-none absolute -top-9 left-0 z-10 w-max -rotate-2 border border-ink bg-cream px-2 py-1 font-serif text-xs italic text-ink opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                            {p.hoverSwap}
                          </span>
                        </span>
                      ) : (
                        it
                      )}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  data-testid={`service-cta-${p.id}`}
                  className="mt-6 hidden border-t border-current pt-4 font-serif text-sm italic opacity-0 transition-opacity duration-300 group-hover:block group-hover:opacity-100"
                >
                  {p.cta} → Let&apos;s talk
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
