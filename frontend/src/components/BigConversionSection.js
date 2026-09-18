import { Link } from "react-router-dom";
import { Reveal, Magnetic, MaskedLines } from "../lib/motion";

export default function BigConversionSection() {
  return (
    <section className="relative overflow-hidden bg-hot px-5 py-28 text-ink md:px-10 md:py-44" data-testid="big-conversion-section">
      <div className="halftone-dots pointer-events-none absolute -left-16 -top-16 h-96 w-96 text-ink opacity-20" />
      <div className="halftone-dots pointer-events-none absolute -bottom-20 -right-16 h-96 w-96 text-cream opacity-30" />

      <h2 className="relative font-sans text-[13vw] font-bold text-white uppercase leading-[0.92] tracking-[-0.03em] md:text-[8.5vw]" data-testid="big-conversion-headline">
        <MaskedLines
          animate={true}
          lines={[
            <>Got a brand?</>,
            <>Got a <span className="font-serif font-light tracking-tight normal-case italic tracking-normal">problem?</span></>,
            <>Got a wild idea?</>,
          ]}
        />
      </h2>

      <Reveal delay={0.2} className="relative mt-10">
        <p className="font-serif text-[10vw] italic leading-none md:text-[6vw]">Let&apos;s talk.</p>
      </Reveal>

      <Reveal delay={0.35} className="relative mt-12 flex flex-wrap items-center gap-6">
        <Magnetic>
          <Link
            to="/contact"
            data-testid="big-conversion-cta"
            className="sticker-shadow inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-8 py-5 text-sm font-bold uppercase tracking-wider text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
          >
            Start a conversation ↗
          </Link>
        </Magnetic>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60">No corporate jargon. Promise.</p>
      </Reveal>
    </section>
  );
}
