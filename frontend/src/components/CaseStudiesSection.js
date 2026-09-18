import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChapterTag } from "../lib/motion";

const CASES = [
  {
    id: "metricly",
    tag: "Case 01 — SaaS",
    brand: "Metricly",
    story: ["They had a product.", "Nobody understood it.", "So we made it impossible to ignore."],
    did: "Rebuilt the story around the user's Monday morning, not the feature list. New positioning, launch film, performance engine.",
    metric: "+184%",
    metricLabel: "qualified leads",
    quote: "Finally, marketing that sounds like us.",
    quoteBy: "Co-founder, Metricly",
    img: "https://images.unsplash.com/photo-1594845281364-63dbe90f37f5?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    bg: "bg-wine",
    accent: "text-neon",
  },
  {
    id: "gully",
    tag: "Case 02 — Streetwear",
    brand: "GULLY/CO",
    story: ["They had a brand.", "It looked like everyone else's.", "So we gave it a gully of its own."],
    did: "Chaotic drop culture, desi meme engine, creator collabs that felt like inside jokes — not ads.",
    metric: "3.2X",
    metricLabel: "ROAS",
    quote: "Bhai, this is exactly what we were trying to say.",
    quoteBy: "Founder, GULLY/CO",
    img: "https://images.unsplash.com/photo-1637059490586-9f1197ba4f61?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    bg: "bg-ink",
    accent: "text-hot",
  },
  {
    id: "chatpata",
    tag: "Case 03 — Food & Beverage",
    brand: "Chatpata & Sons",
    story: ["They had great food.", "Nobody cared.", "So we made the internet hungry."],
    did: "A desi pop-art identity, ASMR-adjacent reels, and a launch campaign timed to peak 7pm cravings.",
    metric: "12M",
    metricLabel: "organic views in 60 days",
    quote: "Our DMs have never been this full.",
    quoteBy: "CMO, Chatpata & Sons",
    img: "https://images.unsplash.com/photo-1599682303048-8689078dd687?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    bg: "bg-maroon",
    accent: "text-neon",
  },
];

function CasePanel({ c, i }) {
  return (
    <div className={`relative flex h-screen w-screen shrink-0 flex-col justify-center overflow-hidden px-5 md:px-14 ${c.bg}`} data-testid={`case-panel-${c.id}`}>
      <div className="halftone-dots pointer-events-none absolute -left-10 top-16 h-64 w-64 text-cream opacity-15" />
      <div className="pointer-events-none absolute right-24 top-24 hidden rotate-6 md:block">
        <span className={`font-serif text-2xl italic ${c.accent}`}>bhai, iconic hai</span>
      </div>
      
      <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="font-sans text-[9vw] font-black uppercase leading-[0.95] tracking-[-0.03em] text-cream md:text-[4.6vw]">
            {c.story[0]}<br />
            <span className="font-serif font-light tracking-tight normal-case tracking-normal text-cream/70">{c.story[1]}</span><br />
            {c.story[2].replace("So we ", "So we ")}{" "}
          </h3>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/70 md:text-base">{c.did}</p>
          <div className="mt-8 flex items-end gap-4">
            <span className={`font-sans text-[16vw] font-black leading-none tracking-tighter md:text-[7.5vw] ${c.accent}`} data-testid={`case-metric-${c.id}`}>
              {c.metric}
            </span>
            <span className="mb-2 max-w-[140px] font-mono text-[11px] uppercase leading-snug tracking-[0.15em] text-cream/70">{c.metricLabel}</span>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="sticker-shadow-pink rotate-2 overflow-hidden border-2 border-cream/20">
            <img src={c.img} alt={`${c.brand} campaign visual`} className="h-[380px] w-full object-cover" loading="lazy" />
          </div>
          <div className="absolute -bottom-8 -left-10 max-w-[260px] -rotate-2 rounded-2xl rounded-bl-none bg-cream p-4 sticker-shadow">
            <p className="font-serif text-base italic text-ink">&ldquo;{c.quote}&rdquo;</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">{c.quoteBy}</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-5 flex items-center gap-3 md:left-14">
        <span className="font-mono text-[11px] tracking-[0.3em] text-cream/40">0{i + 1} / 03</span>
        <span className="font-serif text-sm italic text-cream/40 lg:hidden">&ldquo;{c.quote}&rdquo; — {c.quoteBy}</span>
      </div>
    </div>
  );
}

export default function CaseStudiesSection() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.667%"]);

  if (reduce) {
    return (
      <section id="work" className="bg-ink py-24" data-testid="case-studies-section">
        <div className="px-5 md:px-10"><ChapterTag num="06" label="Selected work" /></div>
        {CASES.map((c, i) => <CasePanel key={c.id} c={c} i={i} />)}
      </section>
    );
  }

  return (
    <section id="work" ref={ref} className="relative h-[380vh] bg-ink" data-testid="case-studies-section">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute left-5 top-24 z-10 md:left-10">
          <ChapterTag num="07" label="Selected work" />
        </div>
        <motion.div style={{ x }} className="flex h-full w-[300vw]">
          {CASES.map((c, i) => <CasePanel key={c.id} c={c} i={i} />)}
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-hot"
          style={{ scaleX: scrollYProgress, transformOrigin: "left", width: "100%" }}
        />
      </div>
    </section>
  );
}
