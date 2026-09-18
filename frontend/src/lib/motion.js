import { useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export function Reveal({ children, delay = 0, y = 48, className = "", once = true, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function MaskedLines({ lines, className = "", delay = 0, animate = true }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className="block will-change-transform"
            initial={reduce || !animate ? false : { y: "115%" }}
            animate={animate ? { y: 0 } : undefined}
            whileInView={!animate ? { y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: delay + i * 0.13, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Marquee({ children, className = "", fast = false }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} data-testid="marquee">
      <div className={`marquee-track ${fast ? "marquee-track-fast" : ""}`}>
        <span className="inline-flex items-center shrink-0">{children}</span>
        <span className="inline-flex items-center shrink-0" aria-hidden="true">{children}</span>
      </div>
    </div>
  );
}

export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });
  if (reduce) return <div className={`inline-block ${className}`}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

export function ChapterTag({ num, label, dark = false }) {
  return (
    <Reveal className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] ${dark ? "text-ink/60" : "text-cream/50"}`} y={20}>
      <span className={`inline-block h-[1px] w-10 ${dark ? "bg-ink/40" : "bg-cream/30"}`} />
      <span data-testid={`chapter-${num}`}>Chapter {num} — {label}</span>
    </Reveal>
  );
}

export const hoverSwap = (defaultText, swapText) => ({ defaultText, swapText });
