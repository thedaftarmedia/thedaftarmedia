import { Link } from "react-router-dom";
import { Reveal, Magnetic, Marquee } from "../lib/motion";

const SITEMAP = [
  { label: "Work", hash: "#work" },
  { label: "Services", hash: "#services" },
  { label: "About", hash: "#philosophy" },
  { label: "Careers", hash: "#careers" },
  { label: "Contact", to: "/contact" },
];

export default function FooterSection() {
  const go = (hash) => {
    const el = document.querySelector(hash);
    if (el) window.__lenis ? window.__lenis.scrollTo(el, { duration: 1.4 }) : el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-ink" data-testid="footer">
      <section className="relative border-b border-cream/10 px-5 py-24 md:px-10 md:py-36">
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-wine/60 blur-[120px]" />
        <Reveal>
          <h2 className="max-w-5xl font-sans text-[9vw] font-black uppercase leading-[0.95] tracking-[-0.03em] text-cream md:text-[5.5vw]" data-testid="footer-statement">
            Your brand already has a voice.<br />
            <span className="font-serif font-light tracking-tight normal-case italic tracking-normal text-hot">Let&apos;s make people hear it.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-12">
          <Magnetic>
            <Link
              to="/contact"
              data-testid="footer-cta"
              className="inline-flex items-center gap-2 rounded-full bg-hot px-8 py-5 text-sm font-bold uppercase tracking-wider text-cream transition-colors duration-300 hover:bg-cream hover:text-ink"
            >
              Work with Daftar ↗
            </Link>
          </Magnetic>
        </Reveal>
      </section>

      <section id="careers" className="flex flex-wrap items-center justify-between gap-6 border-b border-cream/10 px-5 py-10 md:px-10" data-testid="careers-strip">
        <p className="font-serif text-2xl italic text-cream md:text-3xl">
          Come work with <span className="text-neon">weirdly talented</span> people.
        </p>
        <Link to="/contact" data-testid="careers-cta" className="group inline-flex items-center gap-2 font-sans text-sm font-extrabold uppercase tracking-wider text-cream">
          Introduce yourself
          <span className="text-hot transition-transform duration-300 group-hover:translate-x-2">→</span>
        </Link>
      </section>

      <div className="grid gap-10 px-5 py-14 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40">Say hello</p>
          <div className="mt-4 flex flex-col gap-2">
            <a href="https://www.instagram.com/io.daftar/" target="_blank" rel="noopener noreferrer" data-testid="footer-instagram" className="w-fit font-sans text-base font-semibold text-cream/80 transition-colors hover:text-hot">Instagram ↗</a>
            <a href="mailto:thedaftar.media@gmail.com" data-testid="footer-email" className="w-fit font-sans text-base font-semibold text-cream/80 transition-colors hover:text-hot">thedaftar.media@gmail.com</a>
            <a href="tel:+917772880830" data-testid="footer-phone" className="w-fit font-sans text-base font-semibold text-cream/80 transition-colors hover:text-hot">+91 7772880830</a>
            <a href="tel:+919109063186" data-testid="footer-phone" className="w-fit font-sans text-base font-semibold text-cream/80 transition-colors hover:text-hot">+91 9109063186</a>
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40">Sitemap</p>
          <div className="mt-4 flex flex-col gap-2">
            {SITEMAP.map((s) =>
              s.to ? (
                <Link key={s.label} to={s.to} data-testid={`footer-link-${s.label.toLowerCase()}`} className="w-fit font-sans text-base font-semibold text-cream/80 transition-colors hover:text-hot">{s.label}</Link>
              ) : (
                <button key={s.label} onClick={() => go(s.hash)} data-testid={`footer-link-${s.label.toLowerCase()}`} className="w-fit text-left font-sans text-base font-semibold text-cream/80 transition-colors hover:text-hot">{s.label}</button>
              )
            )}
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40">Currently</p>
          <p className="mt-4 font-serif text-xl italic leading-snug text-cream/70">
            Taking briefs, making brands,<br />and arguing about fonts.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10 py-4">
        <Marquee fast>
          <span className="mx-6 font-mono text-[11px] uppercase tracking-[0.3em] text-cream/30">
            Daftar Media ✦ Brand banana hai, Canva template nahi ✦ Pretty is good, pretty that performs is better ✦
          </span>
        </Marquee>
      </div>

      <div className="overflow-hidden px-2">
        <p className="text-outline-cream select-none whitespace-nowrap text-center font-sans text-[19vw] font-black uppercase leading-[0.8] tracking-[-0.04em]" aria-hidden="true">
          Daftar
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cream/10 px-5 py-5 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40">© 2026 Daftar Media</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40">Made with dimaag</p>
      </div>
    </footer>
  );
}
