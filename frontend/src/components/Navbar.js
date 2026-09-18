import { useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "../lib/motion";

const LINKS = [
  { label: "Work", hash: "#work" },
  { label: "What We Do", hash: "#services" },
  { label: "Who We Work With", hash: "#who" },
  { label: "About", hash: "#philosophy" },
  { label: "Careers", hash: "#careers" },
];

export function scrollToHash(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

function TalkCTA({ className = "" }) {
  const [hovered, setHovered] = useState(false);
  const [labelWidths, setLabelWidths] = useState({ default: 0, hover: 0 });
  const defaultLabelRef = useRef(null);
  const hoverLabelRef = useRef(null);

  useLayoutEffect(() => {
    const measureLabels = () => {
      setLabelWidths({
        default: defaultLabelRef.current?.offsetWidth || 0,
        hover: hoverLabelRef.current?.offsetWidth || 0,
      });
    };

    measureLabels();
    window.addEventListener("resize", measureLabels);
    return () => window.removeEventListener("resize", measureLabels);
  }, []);

  return (
    <Link
      to="/contact"
      data-testid="nav-lets-talk-cta"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative inline-flex items-center overflow-hidden rounded-full bg-cream px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider text-ink ${className}`}
    >
      <motion.span
        animate={{ width: hovered ? labelWidths.hover : labelWidths.default }}
        className="relative block h-[1.2em] overflow-hidden"
        transition={{ duration: 0.35, ease: EASE }}
      >
        <motion.span
          ref={defaultLabelRef}
          animate={{ y: hovered ? "-100%" : 0 }}
          className="absolute left-0 top-0 block whitespace-nowrap"
          transition={{ duration: 0.35, ease: EASE }}
        >
          Let&apos;s Talk ↗
        </motion.span>
        <motion.span
          ref={hoverLabelRef}
          animate={{ y: hovered ? 0 : "100%" }}
          className="absolute left-0 top-0 block whitespace-nowrap text-hot"
          transition={{ duration: 0.35, ease: EASE }}
        >
          Chalo baat karte hain ↗
        </motion.span>
      </motion.span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const go = (hash) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToHash(hash), 350);
    } else {
      scrollToHash(hash);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference backdrop-blur-md" data-testid="navbar">
        <nav className="flex items-center justify-between px-5 py-5 md:px-10">
          <Link to="/" data-testid="nav-logo" className="font-sans text-xl font-black uppercase tracking-tighter text-cream md:text-2xl" onClick={() => window.scrollTo(0, 0)}>
            Daftar<span className="text-cream">.</span>
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.hash}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => go(l.hash)}
                className="group relative text-[13px] font-semibold uppercase tracking-[0.14em] text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-cream transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block"><TalkCTA /></div>
            <button
              data-testid="nav-menu-toggle"
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
              aria-label="Toggle menu"
            >
              <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="block h-[2px] w-6 bg-cream" />
              <motion.span animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="block h-[2px] w-6 bg-cream" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-hot px-6 pb-10 pt-28"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <div key={l.hash} className="overflow-hidden">
                  <motion.button
                    data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: EASE }}
                    onClick={() => go(l.hash)}
                    className="font-serif text-5xl italic text-ink sm:text-6xl"
                  >
                    {l.label}
                  </motion.button>
                </div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-end justify-between">
              <Link to="/contact" onClick={() => setOpen(false)} data-testid="mobile-nav-cta" className="rounded-full bg-ink px-7 py-4 text-sm font-bold uppercase tracking-wider text-cream">
                Chalo baat karte hain ↗
              </Link>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60">Daftar Media</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
