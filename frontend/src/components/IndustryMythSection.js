import { Reveal, ChapterTag } from "../lib/motion";

export default function IndustryMythSection() {
  return (
    <section className="relative overflow-hidden bg-cream px-5 py-24 text-ink md:px-10 md:py-40" data-testid="industry-myth-section">
      <div className="halftone-dots pointer-events-none absolute -right-16 -top-10 h-80 w-80 text-hot opacity-25" />
      <ChapterTag num="07" label="The industry question" dark />

      <div className="mt-14 max-w-6xl">
        <Reveal>
          <p className="font-serif text-3xl italic leading-tight text-ink/60 md:text-5xl">
            &ldquo;Have you worked in my industry?&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 font-sans text-[12vw] font-black uppercase leading-[0.92] tracking-[-0.03em] md:text-[7vw]" data-testid="industry-answer">
            Probably.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-4 font-serif text-[8vw] italic leading-[0.95] text-hot md:text-[4.5vw]">
            But that&apos;s not the point.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 max-w-2xl space-y-2 text-lg leading-relaxed text-ink/75 md:text-xl">
            <p>We don&apos;t copy what worked there before.</p>
            <p className="font-sans font-bold text-ink">We figure out what should work <span className="font-serif italic text-hot">now.</span></p>
            <p className="pt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">
              Aapka competitor bhi Instagram chala raha hai. So what?
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
