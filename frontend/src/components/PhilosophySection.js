import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChapterTag } from "../lib/motion";

export default function PhilosophySection() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const strike = useTransform(scrollYProgress, [0.12, 0.28], [0, 1]);
  const p1Opacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);
  const p1Y = useTransform(scrollYProgress, [0.3, 0.42], [0, -60]);
  const p2Opacity = useTransform(scrollYProgress, [0.38, 0.5, 0.55, 0.62], [0, 1, 1, 0]);
  const p2Y = useTransform(scrollYProgress, [0.38, 0.5, 0.55, 0.62], [60, 0, 0, -50]);
  const p3Opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const p3Y = useTransform(scrollYProgress, [0.6, 0.7], [60, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);

  if (reduce) {
    return (
      <section id="philosophy" className="bg-cream px-5 py-28 text-ink md:px-10" data-testid="philosophy-section">
        <ChapterTag num="01" label="The Philosophy" dark />
        <h2 className="mt-10 font-sans text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-8xl">
          We think <span className="line-through decoration-hot decoration-8">different</span>.
        </h2>
        <p className="mt-8 font-serif text-3xl italic md:text-5xl">Actually, thinking different isn&apos;t our forte.</p>
        <p className="mt-4 font-sans text-4xl font-black uppercase md:text-7xl">Understanding <span className="font-serif normal-case italic text-hot">you</span> is.</p>
        <p className="mt-10 max-w-xl text-base text-ink/70">Every brand already has something worth saying. We just help people notice.</p>
      </section>
    );
  }

  return (
    <section id="philosophy" ref={ref} className="relative h-[320vh] bg-cream text-ink" data-testid="philosophy-section">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-5 md:px-10">
        <div className="halftone-dots pointer-events-none absolute -left-16 top-10 h-64 w-64 text-hot opacity-30" />
        <ChapterTag num="01" label="The Philosophy" dark />

        <motion.h2
          style={{ opacity: p1Opacity, y: p1Y }}
          className="mt-8 font-sans text-[13vw] font-black uppercase leading-[0.95] tracking-[-0.03em] md:text-[8.5vw]"
          data-testid="philosophy-line-one"
        >
          We think{" "}
          <span className="relative inline-block">
            different
            <motion.span
              style={{ scaleX: strike }}
              className="absolute left-[-2%] top-1/2 h-[0.14em] w-[104%] origin-left -translate-y-1/2 bg-hot"
            />
            <span className="absolute -right-4 -top-4 rotate-12 font-serif text-[0.22em] normal-case italic tracking-normal font-light text-hot md:-right-10">
              haan bhai
            </span>
          </span>
          .
        </motion.h2>

        <motion.p
          style={{ opacity: p2Opacity, y: p2Y }}
          className="absolute mt-8 max-w-[90vw] font-serif text-3xl italic leading-tight text-ink md:text-6xl"
          data-testid="philosophy-line-two"
        >
          Actually, thinking different isn&apos;t our forte.
        </motion.p>

        <motion.h3
          style={{ opacity: p3Opacity, y: p3Y }}
          className="absolute mt-24 font-sans text-[12vw] font-black uppercase leading-[0.95] tracking-[-0.03em] md:text-[7.5vw]"
          data-testid="philosophy-line-three"
        >
          Understanding<br />
          <span className="font-serif normal-case font-light italic tracking-normal text-hot">you</span> is.
        </motion.h3>

        <motion.p
          style={{ opacity: subOpacity }}
          className="absolute bottom-[12vh] max-w-xl text-base leading-relaxed text-ink/70 md:text-lg"
          data-testid="philosophy-subcopy"
        >
          Every brand already has something worth saying.
          <br />We just help people notice.
        </motion.p>
      </div>
    </section>
  );
}
