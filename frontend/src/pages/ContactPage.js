import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { EASE } from "../lib/motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HELP_OPTIONS = ["Branding", "Website", "Social Media", "Content", "Performance Marketing", "Product Marketing", "Launch", "Growth", "Something else"];
const PERSONALITY_OPTIONS = ["Loud", "Minimal", "Premium", "Playful", "Desi", "Experimental", "Serious", "Chaotic", "We'll figure it out"];
const BUDGET_OPTIONS = ["₹50k – ₹1L", "₹1L – ₹3L", "₹3L – ₹10L", "₹10L+", "Let's discuss"];
const TIMELINE_OPTIONS = ["ASAP", "Within a month", "1–3 months", "Just exploring"];

const STEPS = [
  { key: "name", type: "text", q: "What's your name?", hint: "Aapka naam. We'll use it nicely.", placeholder: "e.g. Aarav Sharma", required: true },
  { key: "brand", type: "text", q: "What's your brand called?", hint: "Working title bhi chalega.", placeholder: "e.g. Chatpata & Sons" },
  { key: "help_with", type: "multi", q: "What do you need help with?", hint: "Pick everything that's keeping you up at night.", options: HELP_OPTIONS },
  { key: "about_brand", type: "textarea", q: "Tell us about the brand.", hint: "What do you do, who is it for, why does it exist?", placeholder: "We make / sell / build..." },
  { key: "not_working", type: "textarea", q: "What's currently not working?", hint: "Honest answer. No judgement. Humne sab dekha hai.", placeholder: "Our Instagram is dead / nobody gets our product / ..." },
  { key: "personality", type: "multi", q: "What kind of personality should the brand have?", hint: "Multiple allowed. Chaos allowed.", options: PERSONALITY_OPTIONS },
  { key: "vibe_links", type: "textarea", q: "Show us your vibe.", hint: "Website, Instagram, brand guide, reference brands, competitors, inspiration — paste links.", placeholder: "instagram.com/... , https://..." },
  { key: "budget", type: "single", q: "What's your approximate budget?", hint: "Rough number is fine. No awkwardness.", options: BUDGET_OPTIONS },
  { key: "timeline", type: "single", q: "When are you looking to start?", hint: "Kal bhi chalega.", options: TIMELINE_OPTIONS },
  { key: "contact", type: "contact", q: "Where do we send the genius?", hint: "Contact details. We don't spam. We barely have time to." },
];

const initialData = {
  name: "", brand: "", help_with: [], about_brand: "", not_working: "", personality: [],
  vibe_links: "", budget: "", timeline: "", email: "", phone: "", company: "", designation: "",
};

function Chip({ label, selected, onClick, testid }) {
  return (
    <button
      type="button"
      data-testid={testid}
      onClick={onClick}
      className={`rounded-full border-2 px-4 py-2.5 font-sans text-sm font-bold transition-all duration-200 ${
        selected ? "sticker-shadow -rotate-1 border-ink bg-neon text-ink" : "border-cream/25 text-cream/80 hover:border-cream/60 hover:text-cream"
      }`}
    >
      {label}
    </button>
  );
}

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const s = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggle = (k, v) =>
    setData((d) => ({ ...d, [k]: d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v] }));

  const validate = () => {
    if (s.key === "name" && !data.name.trim()) return "Naam toh batao.";
    if (isLast && !/.+@.+\..+/.test(data.email)) return "Valid email chahiye — otherwise genius kidhar bhejein?";
    return "";
  };

  const next = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    if (!isLast) { setDir(1); setStep(step + 1); return; }
    setSending(true);
    try {
      await axios.post(`${API}/leads`, data);
      setDone(true);
    } catch (e) {
      setError("Something broke on our side. Try again — or email hello@daftar.media");
    } finally {
      setSending(false);
    }
  };

  const back = () => { if (step > 0) { setDir(-1); setStep(step - 1); setError(""); } };

  if (done) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-center" data-testid="contact-success">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
          <span className="sticker-shadow inline-block -rotate-3 bg-neon px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink">Received</span>
          <h1 className="mt-8 font-serif text-5xl italic text-cream md:text-7xl">Cool. It&apos;s with us now.</h1>
          <p className="mx-auto mt-6 max-w-md text-base text-cream/60">
            Now go pretend you didn&apos;t spend 20 minutes filling that out.
          </p>
          <Link to="/" data-testid="success-home-link" className="mt-10 inline-flex rounded-full bg-hot px-8 py-4 text-sm font-bold uppercase tracking-wider text-cream transition-colors hover:bg-cream hover:text-ink">
            Back to the chaos ↗
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-ink" data-testid="contact-page">
      <div className="halftone-dots pointer-events-none absolute -right-20 -top-20 h-96 w-96 text-hot opacity-20" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-maroon/60 blur-[100px]" />

      <header className="flex items-center justify-between px-5 py-6 md:px-10">
        <Link to="/" data-testid="contact-logo" className="font-sans text-xl font-black uppercase tracking-tighter text-cream">Daftar.</Link>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50" data-testid="contact-progress-label">
          Step {step + 1} / {STEPS.length}
        </p>
      </header>

      <div className="mx-5 h-[3px] bg-cream/10 md:mx-10">
        <motion.div
          className="h-full bg-hot"
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.5, ease: EASE }}
          data-testid="contact-progress-bar"
        />
      </div>

      {step === 0 && (
        <div className="px-5 pt-14 md:px-10">
          <h1 className="font-sans text-4xl font-black uppercase leading-[0.95] tracking-tight text-cream md:text-6xl" data-testid="contact-title">
            Tell us what&apos;s <span className="font-serif normal-case italic tracking-normal text-hot">happening.</span>
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/50">The more we know, the better we can help.</p>
        </div>
      )}

      <div className="flex flex-1 items-center px-5 py-14 md:px-10">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -80 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="w-full max-w-3xl"
            data-testid={`contact-step-${s.key}`}
          >
            <h2 className="font-serif text-4xl italic leading-tight text-cream md:text-6xl">{s.q}</h2>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/45">{s.hint}</p>

            <div className="mt-10">
              {s.type === "text" && (
                <input
                  autoFocus
                  data-testid={`contact-input-${s.key}`}
                  value={data[s.key]}
                  onChange={(e) => set(s.key, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && next()}
                  placeholder={s.placeholder}
                  className="w-full border-b-2 border-cream/25 bg-transparent pb-4 font-sans text-2xl font-semibold text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-hot md:text-4xl"
                />
              )}

              {s.type === "textarea" && (
                <textarea
                  autoFocus
                  rows={5}
                  data-testid={`contact-textarea-${s.key}`}
                  value={data[s.key]}
                  onChange={(e) => set(s.key, e.target.value)}
                  placeholder={s.placeholder}
                  className="w-full resize-none border-2 border-cream/25 bg-transparent p-5 font-sans text-lg text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-hot"
                />
              )}

              {s.type === "multi" && (
                <div className="flex flex-wrap gap-3">
                  {s.options.map((o) => (
                    <Chip
                      key={o}
                      label={o}
  testid={`chip-${o.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`}
                      selected={data[s.key].includes(o)}
                      onClick={() => toggle(s.key, o)}
                    />
                  ))}
                </div>
              )}

              {s.type === "single" && (
                <div className="flex flex-wrap gap-3">
                  {s.options.map((o) => (
                    <Chip
                      key={o}
                      label={o}
  testid={`chip-${o.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`}
                      selected={data[s.key] === o}
                      onClick={() => set(s.key, o)}
                    />
                  ))}
                </div>
              )}

              {s.type === "contact" && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {[
                    { k: "email", label: "Email *", type: "email", ph: "you@brand.com" },
                    { k: "phone", label: "Phone", type: "tel", ph: "+91 ..." },
                    { k: "company", label: "Company", type: "text", ph: "Company / brand" },
                    { k: "designation", label: "Designation", type: "text", ph: "Founder? CMO? Chief everything officer?" },
                  ].map((f) => (
                    <label key={f.k} className="block">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50">{f.label}</span>
                      <input
                        data-testid={`contact-input-${f.k}`}
                        type={f.type}
                        value={data[f.k]}
                        onChange={(e) => set(f.k, e.target.value)}
                        placeholder={f.ph}
                        className="mt-2 w-full border-b-2 border-cream/25 bg-transparent pb-3 font-sans text-xl font-semibold text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-hot"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            {error && <p className="mt-5 font-serif text-lg italic text-hot" data-testid="contact-error">{error}</p>}

            <div className="mt-12 flex items-center gap-4">
              {step > 0 && (
                <button onClick={back} data-testid="contact-back-btn" className="rounded-full border border-cream/25 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-cream/70 transition-colors hover:border-cream hover:text-cream">
                  ← Back
                </button>
              )}
              <button
                onClick={next}
                disabled={sending}
                data-testid={isLast ? "contact-submit-btn" : "contact-next-btn"}
                className="sticker-shadow rounded-full border-2 border-ink bg-hot px-8 py-4 text-sm font-bold uppercase tracking-wider text-cream transition-all duration-300 hover:bg-neon hover:text-ink disabled:opacity-60"
              >
                {sending ? "Bhej rahe hain..." : isLast ? "Send it. Let's make something happen. ↗" : "Next →"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
