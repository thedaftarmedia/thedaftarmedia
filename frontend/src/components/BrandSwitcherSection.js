import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, ChapterTag, EASE } from "../lib/motion";

const BRANDS = [
  {
    id: "fintech",
    label: "A fintech brand",
    name: "PAISAPAY",
    traits: ["serious", "trustworthy", "sharp"],
    tagline: "Paisa. Sorted.",
    card: "bg-cream text-ink",
    accent: "text-ink",
    font: "font-sans font-black uppercase tracking-tight",
    note: "clean lines. zero drama.",
  },
  {
    id: "streetwear",
    label: "A streetwear brand",
    name: "GULLY/CO",
    traits: ["chaotic", "rebellious", "loud"],
    tagline: "Dropping soon. Ruk jao.",
    card: "bg-ink text-neon",
    accent: "text-neon",
    font: "font-sans font-black uppercase tracking-tighter -rotate-2",
    note: "loud on purpose.",
  },
  {
    id: "saas",
    label: "A SaaS company",
    name: "METRICLY",
    traits: ["intelligent", "simple", "useful"],
    tagline: "Dashboards people actually open.",
    card: "bg-[#EDEBE6] text-ink",
    accent: "text-hot",
    font: "font-mono font-bold tracking-tight",
    note: "smart, not smug.",
  },
  {
    id: "food",
    label: "A food brand",
    name: "CHATPATA & SONS",
    traits: ["playful", "indulgent", "desi"],
    tagline: "Teekha. Meetha. Repeat.",
    card: "bg-tang text-cream",
    accent: "text-cream",
    font: "font-serif italic",
    note: "extra masala, always.",
  },
];

export default function BrandSwitcherSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % BRANDS.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  const b = BRANDS[active];

  return (
    <section className="relative overflow-hidden bg-ink px-5 py-24 md:px-10 md:py-36" data-testid="brand-switcher-section">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-wine/40 blur-[140px]" />
      <ChapterTag num="02" label="Your brand, your identity" />

      <Reveal className="mt-10 max-w-4xl">
        <h2 className="font-sans text-3xl font-black uppercase leading-[1.02] tracking-tight text-cream sm:text-5xl lg:text-6xl">
          Every brand has<br />an identity.{" "}
          <span className="font-serif font-light normal-case italic tracking-normal text-hot">We promote theirs,</span>
          <br />not ours.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center gap-1" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {BRANDS.map((brand, i) => (
            <button
              key={brand.id}
              data-testid={`brand-tab-${brand.id}`}
              onClick={() => { setActive(i); setPaused(true); }}
              className={`group flex items-baseline gap-4 border-b border-cream/10 py-5 text-left transition-colors duration-300 ${i === active ? "text-cream" : "text-cream/30 hover:text-cream/60"}`}
            >
              <span className="font-mono text-xs tracking-[0.2em] text-hot">0{i + 1}</span>
              <span className="font-sans text-2xl font-black uppercase tracking-tight sm:text-4xl">{brand.label}</span>
              <span className={`ml-auto font-serif text-lg italic transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}>→</span>
            </button>
          ))}
        </div>

        <div className="relative min-h-[380px] md:min-h-[440px]" data-testid="brand-preview">
          <AnimatePresence mode="wait">
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 40, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -40, rotate: -2 }}
              transition={{ duration: 0.55, ease: EASE }}
              className={`absolute inset-0 flex flex-col justify-between overflow-hidden p-8 sticker-shadow-pink ${b.card} md:p-10`}
            >
              <div className="halftone-dots pointer-events-none absolute -right-10 -top-10 h-48 w-48 opacity-20" />
              <div className="flex items-start justify-between gap-4">
                <p className={`font-sans text-3xl sm:text-5xl ${b.font}`}>{b.name}</p>
                <span className="shrink-0 rotate-6 border-2 border-current px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em]">est. imagination</span>
              </div>
              <div>
                <p className={`font-serif text-2xl italic ${b.accent} sm:text-3xl`}>{b.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {b.traits.map((t) => (
                    <span key={t} className="border border-current px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em]">{t}</span>
                  ))}
                </div>
                <p className="mt-6 font-serif text-base italic opacity-70">— {b.note}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-24 md:mt-32">
        <Reveal>
          <p className="font-sans text-sm tracking-tight text-cream/70 md:text-xl">Why would they all look the same?</p>
        </Reveal>
        <Reveal delay={0.15}>
          <h3 className="mt-6 font-sans text-[11vw] font-black uppercase leading-[0.92] tracking-[-0.03em] text-cream md:text-[7vw]" data-testid="brand-switcher-statement">
            We don&apos;t make<br />Daftar brands.
            <br /><span className="font-serif font-light tracking-tighter normal-case italic tracking-normal text-hot">We make brands.</span>
          </h3>
        </Reveal>
      </div>
    </section>
  );
}
