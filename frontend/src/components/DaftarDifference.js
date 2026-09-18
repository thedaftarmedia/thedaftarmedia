import { Reveal, ChapterTag } from "../lib/motion";

const DONT = [
  "Copy competitors",
  "Force every brand into the same template",
  "Make strategy decks nobody reads",
  "Use \u201cinnovative synergy\u201d in meetings",
  "Pretend followers = growth",
  "Make pretty things with no purpose",
];

const DO = [
  "Understand the business",
  "Understand the audience",
  "Find the interesting bit",
  "Build the idea around it",
  "Make people notice",
  "Make the work perform",
];

export default function DaftarDifference() {
  return (
    <section className="relative bg-ink px-5 py-24 md:px-10 md:py-36" data-testid="difference-section">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-wine/50 blur-[130px]" />
      <ChapterTag num="08" label="The Daftar difference" />

      <Reveal className="mt-10">
        <h2 className="font-sans text-3xl font-black uppercase leading-[1.02] tracking-tight text-cream sm:text-5xl lg:text-6xl">
          Things we <span className="font-serif font-light tracking-tight normal-case italic text-neon">do.</span>
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DO.map((d, i) => (
          <Reveal key={d} delay={i * 0.05}>
            <div data-testid={`do-card-${i + 1}`} className="sticker-shadow flex items-center gap-4 border-2 border-ink bg-cream p-5 transition-transform duration-300 hover:-translate-y-1 hover:rotate-1">
              <span className="flex h-8 w-8 shrink-0 rotate-6 items-center justify-center bg-neon font-sans text-sm font-black text-ink">✓</span>
              <p className="font-sans text-sm font-bold text-ink md:text-base">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20">
        <h2 className="font-sans text-3xl font-black uppercase leading-[1.02] tracking-tight text-cream sm:text-5xl lg:text-6xl">
          Things we <span className="font-serif font-light tracking-tight normal-case italic text-hot">don&apos;t</span> do.
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DONT.map((d, i) => (
          <Reveal key={d} delay={i * 0.05}>
            <div data-testid={`dont-card-${i + 1}`} className="group flex items-center gap-4 border border-cream/15 bg-ink p-5 transition-colors duration-300 hover:border-hot/50">
              <span className="flex h-8 w-8 shrink-0 -rotate-6 items-center justify-center border-2 border-hot font-sans text-sm font-black text-hot">✕</span>
              <p className="font-sans text-sm font-semibold text-cream/60 line-through decoration-hot/60 decoration-2 md:text-base">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      
    </section>
  );
}
