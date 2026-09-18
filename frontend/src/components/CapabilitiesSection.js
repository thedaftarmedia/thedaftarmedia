import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, ChapterTag, EASE } from "../lib/motion";

const SITUATIONS = [
  {
    id: "brand",
    q: "I have a brand.",
    a: "Then let's make sure people remember it.",
    caps: ["Brand identity", "Positioning", "Strategy", "Social media", "Content", "Campaigns", "Creative direction"],
  },
  {
    id: "product",
    q: "I built a product.",
    a: "Good. Now let's give it a story worth buying.",
    caps: ["Product storytelling", "Launch campaigns", "Performance marketing", "Creative", "Social", "Growth"],
  },
  {
    id: "saas",
    q: "I built a SaaS.",
    a: "Say less. We're your software's marketing partner.",
    caps: ["Product communication", "Brand identity", "Acquisition", "Content", "Performance", "Campaigns", "Launches"],
  },
  {
    id: "launch",
    q: "I'm launching something new.",
    a: "Your launch partner. We make 'soon' feel like an event.",
    caps: ["Launch strategy", "Campaign concept", "Social launch", "Influencer ecosystem", "Performance", "Content"],
  },
];

export default function CapabilitiesSection() {
  const [active, setActive] = useState(0);
  const s = SITUATIONS[active];

  return (
    <section id="what" className="relative bg-cream px-5 py-24 text-ink md:px-10 md:py-36" data-testid="capabilities-section">
      <ChapterTag num="03" label="So... what exactly do you guys do?" dark />

      <Reveal className="mt-10">
        <h2 className="max-w-4xl font-sans text-3xl font-black uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
          Depends.{" "}
          <span className="font-serif font-light tracking-tight normal-case italic tracking-normal text-hot">What's your situation?</span>
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-wrap gap-3" role="tablist" aria-label="Business situations">
        {SITUATIONS.map((sit, i) => (
          <button
            key={sit.id}
            role="tab"
            aria-selected={i === active}
            data-testid={`situation-tab-${sit.id}`}
            onClick={() => setActive(i)}
            className={`rounded-full border-2 border-ink px-5 py-3 font-sans text-sm font-bold uppercase tracking-wide transition-all duration-300 md:text-base ${
              i === active ? "sticker-shadow -rotate-1 bg-ink text-cream" : "bg-transparent text-ink hover:bg-ink/5"
            }`}
          >
            {sit.q}
          </button>
        ))}
      </div>

      <div className="mt-12 min-h-[280px] md:min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: EASE }}
            data-testid="situation-panel"
          >
            <p className="max-w-2xl font-serif text-3xl leading-tight text-ink md:text-5xl">{s.a}</p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {s.caps.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: EASE }}
                  className="sticker-shadow -rotate-1 border-2 border-ink bg-neon px-4 py-2 font-sans text-xs font-extrabold uppercase tracking-wider text-ink odd:rotate-1 md:text-sm"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
