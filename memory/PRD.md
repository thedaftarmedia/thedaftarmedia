# Daftar Media — Website PRD

## Original Problem Statement
Build a premium, highly interactive, conversion-focused website for Daftar Media, a Gen-Z-first branding, creative, marketing and growth company. Core philosophy: "We think different. But thinking different isn't our forte." / "Every brand has an identity. We're here to promote theirs, not ours." Visual language: hot pink, deep maroon, cream, black, clashing neon accents, grain/halftone, collage stickers, desi humour, oversized Inter + Instrument Serif typography. Awwwards-level motion: Lenis smooth scroll, Framer Motion reveals, pinned/horizontal sections, masked line reveals, magnetic buttons. Hinglish microcopy, meme-adjacent tone, sophisticated conversion funnel.

## User Personas
- Startup founder with a half-baked idea
- SaaS team with a great product nobody understands
- D2C brand tired of looking like everyone else
- Product team launching soon
- Established business going stale
- Potential hires (careers-curious creatives)

## Core Requirements (static)
- Homepage as scrollable visual story: hero → philosophy → brand identity → capabilities → partner ecosystem → who we work with → services → work → industry myth → difference → social proof → process → big CTA → footer
- Conversational multi-step contact/lead form (10 steps)
- Mobile-dedicated composition, no horizontal overflow
- prefers-reduced-motion support
- SEO metadata, semantic HTML

## Architecture
- React 19 + Tailwind + Framer Motion 11 + Lenis (frontend, port 3000)
- FastAPI + Motor/MongoDB (backend, port 8001, /api prefix)
- AI-generated sticker assets (Gemini Nano Banana via emergentintegrations) → /app/frontend/public/assets/stickers/ (chroma-keyed PNGs)
- Design system: /app/design_guidelines.json (ink #0D080B, maroon #3B0014, wine #4A001F, hot #FF007A, neon #CCFF00, tang #FF5500, cream #FAF7F2)

## Implemented (2026-09-07)
- Homepage: all 14 sections — kinetic masked-reveal hero with 6 cursor-parallax AI stickers (pigeon, rotary phone, "arre yaar" bubble, starburst badge, pointing hand, cutting chai), editorial marquee, pinned scroll-driven philosophy ("We think different" → strikethrough → "Understanding YOU is."), interactive 4-brand personality switcher, situation-based capabilities, pinned orbiting partner ecosystem (7 nodes), who-we-work-with cards, 5 poster-style service cards with hover microcopy, pinned horizontal case-study scroller (3 fictional cases, oversized metrics), industry myth, don't-do/do lists, chat-bubble testimonials + client marquee, desi 6-step process with progress line, big pink conversion section, editorial footer with outline DAFTAR wordmark
- Navbar: mix-blend-difference adaptive, magnetic "Let's Talk ↗" → "Chalo baat karte hain ↗" hover swap, full-screen animated mobile menu
- Contact funnel: /contact — 10-step conversational form with progress bar, multi-select chips, validation, POST /api/leads → MongoDB, success state ("Cool. It's with us now.")
- Backend: POST /api/leads, GET /api/leads
- SEO: title "Daftar Media | Branding, Creative & Growth Partner", meta description, OG tags
- Verified: full funnel submitted via UI (lead in DB), desktop + mobile screenshots, no horizontal overflow

## User Choices
- Scope: Homepage only, maximum polish (+ contact funnel)
- Leads: database only, no admin view
- Case studies/testimonials: realistic fictional demo brands (swap for real later)
- Imagery: AI-generated desi-collage stickers

## Backlog (prioritized)
- P0: About page, What We Do (services) pages, /for-saas, /for-products, /launch, /growth solution pages, Careers page
- P1: Real client logos/case studies replacing fictional ones; Resend email notification on new lead; admin lead view; OG share image
- P2: Custom cursor, draggable stickers, blog/journal section, per-route page titles via helmet, image AVIF/WebP conversion

## Next Tasks
1. Build About page (non-corporate, quirky team labels)
2. Build What We Do service detail pages
3. Build 4 solution/partnership pages
4. Build Careers page with playful position cards
