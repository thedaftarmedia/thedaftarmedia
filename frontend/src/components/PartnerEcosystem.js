import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChapterTag } from "../lib/motion";

const NODES = [
  { label: "Launch", x: 50, y: 6 },
  { label: "Growth", x: 84, y: 22 },
  { label: "Creative", x: 92, y: 58 },
  { label: "Performance", x: 70, y: 88 },
  { label: "Brand", x: 30, y: 88 },
  { label: "Digital", x: 8, y: 58 },
  { label: "Storytelling", x: 16, y: 22 },
];

export default function PartnerEcosystem() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.7, 1]);
  const ringOpacity = useTransform(scrollYProgress, [0.05, 0.4], [0, 1]);
  const headOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const headY = useTransform(scrollYProgress, [0.55, 0.8], [50, 0]);

  return (
    <section ref={ref} className="relative h-[260vh] bg-maroon" data-testid="partner-ecosystem">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        <div className="halftone-dots pointer-events-none absolute left-0 top-0 h-72 w-72 text-hot opacity-25" />
        <div className="absolute left-5 top-24 md:left-10"><ChapterTag num="04" label="The ecosystem" /></div>

        <motion.div
          style={reduce ? {} : { scale, opacity: ringOpacity }}
          className="relative h-[78vw] w-[78vw] max-h-[560px] max-w-[560px] md:h-[560px] md:w-[560px]"
          data-testid="ecosystem-orbit"
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-cream/20" />
          <div className="absolute inset-[18%] rounded-full border border-cream/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="sticker-shadow flex h-32 w-32 items-center justify-center rounded-full border-2 border-ink bg-hot md:h-44 md:w-44">
              <span className="font-sans text-xl font-black uppercase tracking-tighter text-cream md:text-3xl">Daftar</span>
            </div>
          </div>
          <div className={`absolute inset-0 ${reduce ? "" : "animate-spin-slow"}`} style={{ animationDuration: "60s" }}>
            {NODES.map((n, i) => (
              <div
                key={n.label}
                className="absolute"
                style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div className={reduce ? "" : "animate-spin-slow"} style={{ animationDuration: "60s", animationDirection: "reverse" }}>
                  <div className={`sticker-shadow flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink text-center md:h-24 md:w-24 ${i % 2 === 0 ? "bg-neon" : "bg-cream"}`}>
                    <span className="px-1 font-sans text-[9px] font-extrabold uppercase leading-tight tracking-wide text-ink md:text-[11px]">
                      {n.label}<br />Partner
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.h2
          style={reduce ? {} : { opacity: headOpacity, y: headY }}
          className="mt-10 max-w-3xl text-center font-sans text-2xl font-black uppercase leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl"
          data-testid="ecosystem-headline"
        >
          Whatever stage you&apos;re at, there&apos;s probably a way we can make it{" "}
          <span className="font-serif normal-case italic tracking-normal text-neon">louder.</span>
        </motion.h2>
      </div>
    </section>
  );
}
