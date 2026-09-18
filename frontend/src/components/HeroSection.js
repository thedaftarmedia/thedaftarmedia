import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { MaskedLines, Magnetic, EASE } from "../lib/motion";
import { scrollToHash } from "./Navbar";

const STICKERS = [
  { src: "/assets/logo/logo.png", alt: "daftar-logo", cls: "top-[26%] right-[14%] w-[2rem] md:top-[24%] md:right-[0%] md:w-[44rem]", depth: 1.5, rot: 8, dur: 5.2 },
];

function Sticker({ s, mx, my }) {
  const [err, setErr] = useState(false);
  const x = useTransform(mx, (v) => v * 70 * s.depth);
  const y = useTransform(my, (v) => v * 50 * s.depth);
  if (err) return null;
  return (
    <motion.div
      className={`pointer-events-none absolute z-[5] ${s.cls}`}
      style={{ x, y, rotate: s.rot }}
      initial={{ opacity: 0, scale: 0, rotate: s.rot - 30 }}
      animate={{ opacity: 1, scale: 1, rotate: s.rot }}
      transition={{ delay: 1 + s.depth * 0.4, duration: 0.8, ease: EASE }}
    >
      <motion.img
        src={s.src}
        alt={s.alt}
        onError={() => setErr(true)}
        className={`w-full drop-shadow-[6px_8px_0_rgba(0,0,0,0.45)] ${s.spin ? "animate-spin-slow" : "animate-floaty"}`}
        style={{ animationDuration: `${s.dur}s` }}
        draggable="false"
      />
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });

  const tiltX = useTransform(smy, [-0.5, 0.5], [5, -5]);
  const tiltY = useTransform(smx, [-0.5, 0.5], [-5, 5]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      onMouseMove={reduce ? undefined : onMove}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink px-[5rem] pb-10 pt-28 md:px-10 md:pt-32"
    >
      <div className="halftone-dots pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] text-hot opacity-25" />
      <div className="halftone-dots pointer-events-none absolute -bottom-24 -left-24 h-[380px] w-[380px] text-wine opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-maroon/50 blur-[120px]" />

      {!reduce && STICKERS.map((s) => <Sticker key={s.src} s={s} mx={smx} my={smy} />)}

      <motion.p
        data-testid="hero-overline"
        className="relative z-10 font-mono text-[11px] uppercase tracking-[0.35em] text-cream/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        Daftar Media — Branding ✦ Creative ✦ Growth
      </motion.p>

      <h1 className="font-sans text-[3rem] font-black uppercase leading-[0.88] tracking-[-0.035em] text-cream lg:text-[9rem]" data-testid="hero-headline">
        <MaskedLines
          delay={0.35}
          lines={[
            <>
              <span>YOUR </span>
              <span className="font-serif font-light normal-case italic tracking-tight text-hot">Brand.</span>
            </>,
            "Not Our",
            "template.",
          ]}
        />
      </h1>

      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <motion.p
          data-testid="hero-subcopy"
          className="max-w-md text-base leading-relaxed text-cream/70 md:text-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
        >
          We build brands, campaigns and digital experiences around what makes{" "}
          <span className="font-serif italic text-cream">you</span> different.
          <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-hot">(not around our mood board)</span>
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
        >
          <Magnetic>
            <Link
              to="/contact"
              data-testid="hero-primary-cta"
              className="inline-flex text-center items-center gap-2 rounded-full bg-hot px-7 py-4 text-sm font-bold uppercase tracking-wider text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
            >
              Tell us what you&apos;re building ↗
            </Link>
          </Magnetic>
          <button
            onClick={() => scrollToHash("#work")}
            data-testid="hero-secondary-cta"
            className="group inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-4 text-sm font-bold uppercase tracking-wider text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/5"
          >
            See what we&apos;ve built
            <motion.span animate={reduce ? {} : { y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>↓</motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
