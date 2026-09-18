import { Link } from "react-router-dom";
import { Reveal, ChapterTag } from "../lib/motion";

const CARDS = [
  { t: "Founder with a half-baked idea.", d: "Perfect. Half-baked is where the fun starts.", accent: "bg-hot", rot: "-rotate-1" },
  { t: "SaaS team with a great product nobody understands.", d: "We'll translate genius into 'ohh, I need this'.", accent: "bg-neon", rot: "rotate-1" },
  { t: "D2C brand ready to stop looking like everyone else.", d: "Canva template se bahar niklo. Please.", accent: "bg-tang", rot: "-rotate-1" },
  { t: "Product that's launching next month.", d: "Panic mat karo. Plan karo.", accent: "bg-neon", rot: "rotate-1" },
  { t: "Established business that's starting to feel... boring.", d: "Time for a personality transplant.", accent: "bg-hot", rot: "rotate-1" },
  { t: "Brand whose Instagram needs therapy.", d: "Hum hain na.", accent: "bg-tang", rot: "-rotate-1" },
];

export default function WhoWeWorkWith() {
  return (
    <section id="who" className="relative bg-cream px-5 py-24 text-ink md:px-10 md:py-36" data-testid="who-section">
      <div className="halftone-dots pointer-events-none absolute -right-10 bottom-10 h-72 w-72 text-hot opacity-25" />
      <ChapterTag num="04" label="Who we work with" dark />
      <Reveal className="mt-10">
        <h2 className="font-sans text-3xl font-black uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
          You might be <span className="font-serif font-light normal-case italic tracking-normal text-hot"> A...</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.t} delay={i * 0.07}>
            <div
              data-testid={`who-card-${i + 1}`}
              className={`group relative flex h-full min-h-[220px] flex-col justify-between border-2 border-ink bg-cream p-7 transition-all duration-300 hover:-translate-y-2 hover:sticker-shadow ${c.rot}`}
            >
              <span className={`inline-block w-fit -rotate-3 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink ${c.accent}`}>
                0{i + 1} / possibly you
              </span>
              <div>
                <p className="mt-6 font-serif text-2xl italic leading-snug md:text-[1.7rem]">{c.t}</p>
                <p className="mt-4 font-sans text-sm font-medium text-ink/60">{c.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <Link to="/contact" data-testid="who-cta" className="group inline-flex items-center gap-3 font-sans text-lg font-extrabold uppercase tracking-wide text-ink md:text-2xl">
          Sounds suspiciously like you?
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 text-hot">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
