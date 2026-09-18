import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal, ChapterTag } from "../lib/motion";

const STEPS = [
  { w: "Batao.", e: "Tell us what's going on.", d: "The idea, the mess, the half-formed plan. Sab batao." },
  { w: "Samjho.", e: "We understand the business, audience and problem.", d: "Questions. Lots of them. Some annoying. All useful." },
  { w: "Socho.", e: "We figure out the interesting angle.", d: "The bit worth saying. The reason someone should care." },
  { w: "Banao.", e: "Strategy becomes creative.", d: "Identity, campaigns, content — built around the angle, not a template." },
  { w: "Chalao.", e: "We launch, distribute and optimise.", d: "Out in the world. Watched closely. Tweaked constantly." },
  { w: "Phir dekho.", e: "Measure. Learn. Improve.", d: "Numbers padho. Double down on what works. Kill what doesn't." },
];

export default function ProcessDesiSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section ref={ref} className="flex flex-col items-center justify-center relative bg-cream px-5 py-24 text-ink md:px-10 md:py-36" data-testid="process-section">
      <ChapterTag num="10" label="How it actually happens" dark />
      <Reveal className="mt-10">
        <h2 className="font-sans text-3xl text-center font-black uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
          No 87-slide decks.<br />
          <span className="font-serif font-light tracking-tight normal-case italic tracking-normal text-hot">Bas yeh 6 steps.</span>
        </h2>
      </Reveal>

      <div className="relative mt-16 max-w-4xl">
        <motion.div className="absolute bottom-0 left-[7px] top-0 w-[2px] origin-top bg-hot md:left-[9px]" style={{ scaleY: line }} />
        <div className="space-y-14">
          {STEPS.map((s, i) => (
            <Reveal key={s.w} delay={0.05} className="relative pl-12 md:pl-16">
              <span className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-hot bg-cream md:h-5 md:w-5">
                <span className="h-1.5 w-1.5 rounded-full bg-hot" />
              </span>
              <div className="flex flex-wrap items-baseline gap-x-5">
                <span className="font-serif text-lg italic text-ink/40">0{i + 1}</span>
                <h3 className="font-sans text-4xl font-black uppercase tracking-tight md:text-6xl" data-testid={`process-step-${i + 1}`}>{s.w}</h3>
              </div>
              <p className="mt-2 font-serif text-xl italic text-ink/80 md:text-2xl">{s.e}</p>
              <p className="mt-1 max-w-md text-sm text-ink/55">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">
          Brief mila. Dimaag lagaya. Kaam kiya. Simple.
        </p>
      </Reveal>
    </section>
  );
}
