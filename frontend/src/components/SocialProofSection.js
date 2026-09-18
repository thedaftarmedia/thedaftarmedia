import { Reveal, ChapterTag, Marquee } from "../lib/motion";

const LOGOS = ["PAISAPAY", "GULLY/CO", "METRICLY", "CHATPATA & SONS", "NOOR BEAUTY", "AUTO WALA"];

export default function SocialProofSection() {
  return (
    <section className="relative overflow-hidden bg-maroon py-24 md:py-36" data-testid="social-proof-section">
      <div className="px-5 md:px-10">
        <ChapterTag num="09" label="Receipts" />
        <Reveal className="mt-10">
          <h2 className="font-sans text-3xl font-black uppercase leading-[1.02] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            People said things.<br />
            <span className="font-serif font-light tracking-tight normal-case italic tracking-normal text-neon">Nice things.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-10 px-5 md:grid-cols-3 md:px-10">
        <Reveal delay={0}>
          <div className="relative" data-testid="testimonial-whatsapp">
            <div className="relative rounded-2xl rounded-bl-sm bg-[#E7F5E4] p-5 sticker-shadow">
              <span className="chat-tail absolute -left-2 top-0 h-4 w-4 bg-[#E7F5E4]" />
              <p className="font-sans text-base leading-relaxed text-ink">&ldquo;Bhai, this is exactly what we were trying to say.&rdquo;</p>
              <p className="mt-3 text-right font-mono text-[10px] text-ink/50">10:42 pm ✓✓</p>
            </div>
            <p className="mt-4 pl-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60">Aarav M. — Founder, GULLY/CO</p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="border border-cream/15 bg-ink/60 p-6" data-testid="testimonial-instagram">
            <div className="flex items-center gap-3">
              <div className="halftone-dots flex h-10 w-10 items-center justify-center rounded-full bg-hot font-sans text-sm font-black text-cream">N</div>
              <div>
                <p className="font-sans text-sm font-bold text-cream">noorbeauty.official</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-cream/40">2d</p>
              </div>
            </div>
            <p className="mt-4 font-sans text-base leading-relaxed text-cream/85">
              Followers achhe hain. Customers better hain. Inhone dono dilwaye. 🙌
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-cream/40">Reply · ♥ 48</p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60">Noor B. — CMO, Noor Beauty</p>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="relative rotate-2 bg-neon p-6 sticker-shadow" data-testid="testimonial-note">
            <div className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-1 bg-cream/70" />
            <p className="font-serif text-xl italic leading-snug text-ink">
              &ldquo;Our deck finally sounds like us. Investors noticed. So did we.&rdquo;
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">— Kabir S., Co-founder, Metricly</p>
          </div>
        </Reveal>
      </div>

      <div className="mt-20 border-y border-cream/10 py-6">
        <Marquee>
          {LOGOS.map((l) => (
            <span key={l} className="mx-8 inline-flex items-center gap-8 font-sans text-2xl font-black uppercase tracking-tight text-cream/35 md:text-3xl">
              {l} <span className="text-hot">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
