import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Sparkles, MessageCircle, HeartHandshake, ShieldCheck, Gem, Star,
  ClipboardList, Wand2, Flower2, Plus, Minus, Droplets, Zap, Sun, Crown,
} from 'lucide-react'
import { Reveal, TiltCard, CountUp, SectionHeading, Orbs, Socials } from '../components/ui'
import BookingForm from '../components/BookingForm'
import InstagramSection from '../components/InstagramSection'
import HeroVisual from '../components/HeroVisual'
import { CATEGORIES, TREATMENTS } from '../data/treatments'
import { TEAM, waLink } from '../config'



/* ───────────────────────────── HERO ───────────────────────────── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const words = ['Your', 'skin,', 'in', 'a', 'softer', 'light.']

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-[6.5rem]">
      {/* backdrop */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#F6E6CC_0%,#FBF7F1_45%,#FBF7F1_100%)]" />
      <div aria-hidden className="absolute right-[-10%] top-[10%] size-[42rem] rounded-full bg-gold-light/20 blur-[120px]" />
      <span aria-hidden className="pointer-events-none absolute -left-10 bottom-0 select-none font-display text-[38vw] leading-none text-gold/[0.06] lg:text-[26vw]">L</span>

      <div className="container-x relative grid min-h-[calc(100svh-6.5rem)] items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
        <motion.div style={{ y, opacity }} className="relative z-10 py-10 lg:py-0">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="chip">
            <Sparkles size={12} /> Aesthetic Clinic · Lahore
          </motion.p>

          <h1 className="title-xl mt-6">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
                <motion.span
                  className={`mr-[0.22em] inline-block ${w === 'softer' || w === 'light.' ? 'gold-text italic' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <Reveal delay={0.7}>
            <p className="copy mt-6 max-w-lg text-base">
              Personalised facials, laser, skin boosters and injectables, all planned around <em>you</em>.
              Every visit at Lunara starts with listening, so you can make the next step with confidence.
            </p>
          </Reveal>

          <Reveal delay={0.85} className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/book" className="btn-gold">
              Book Free Consultation <ArrowRight size={18} />
            </Link>
            <Link to="/treatments" className="btn-ghost">Explore Treatments</Link>
          </Reveal>

        </motion.div>

        {/* interactive treatment visual */}
        <div className="relative h-[460px] pb-10 sm:h-[560px] lg:h-[680px]">
          <HeroVisual />
        </div>
      </div>

      <motion.div style={{ opacity }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-mist lg:flex">
        Scroll
        <span className="h-10 w-px overflow-hidden bg-sand"><motion.span className="block h-4 w-px bg-gold" animate={{ y: [-16, 40] }} transition={{ repeat: Infinity, duration: 1.6 }} /></span>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────── MARQUEE ─────────────────────────── */
function Marquee() {
  const items = ['Hydra Facial', 'Glass Skin', 'Laser Hair Removal', 'Profhilo', 'Botox', 'Fillers', 'Glow Drip', 'BB Glow', 'Exosomes', 'Skin Boosters', 'PRP', 'Threads']
  return (
    <div className="relative overflow-hidden border-y border-gold/20 bg-espresso py-5 text-ivory">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl italic sm:text-3xl">
            {t} <Sparkles size={16} className="text-gold-light" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────── STATS ──────────────────────────── */
function Stats() {
  const stats = [
    { n: 42, s: '+', l: 'Treatments on our menu' },
    { n: 9, s: '', l: 'Specialist categories' },
    { n: 8, s: '', l: 'Signature bundles' },
    { n: 100, s: '%', l: 'Consultation-first care' },
  ]
  return (
    <section className="container-x py-16">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.08}>
            <div className="card-luxe group h-full p-6 text-center transition hover:-translate-y-1">
              <p className="gold-text font-display text-5xl sm:text-6xl"><CountUp to={s.n} suffix={s.s} /></p>
              <p className="mt-2 text-xs uppercase tracking-wider text-mist">{s.l}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ────────────────────────── CATEGORIES ────────────────────────── */
function Categories() {
  const shown = CATEGORIES
  return (
    <section className="relative py-20">
      <Orbs />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Find your starting point" title={<>A little more <em className="gold-text">you.</em></>} copy="Explore our treatment families. Not sure what suits you? Our team will guide you at your consultation." />
          <Reveal><Link to="/treatments" className="btn-ghost">View full menu <ArrowRight size={16} /></Link></Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c, i) => {
            const count = TREATMENTS.filter((t) => t.category === c.id).length
            return (
              <Reveal key={c.id} delay={(i % 3) * 0.08}>
                <Link to={`/treatments?c=${c.id}`} className="group block h-full">
                  <TiltCard className="overflow-hidden rounded-[1.75rem] shadow-luxe">
                    <div className="relative h-72 overflow-hidden rounded-[1.75rem]">
                      <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-ivory" style={{ transform: 'translateZ(40px)' }}>
                        <span className="chip !border-white/30 !bg-white/15 !text-ivory backdrop-blur">{count} treatments</span>
                        <h3 className="mt-3 font-display text-3xl leading-tight">{c.name}</h3>
                        <p className="mt-1 max-h-0 overflow-hidden text-sm text-ivory/80 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">{c.blurb}</p>
                      </div>
                      <span className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/90 text-gold-deep transition duration-500 group-hover:rotate-[-45deg] group-hover:bg-gold group-hover:text-white">
                        <ArrowRight size={18} />
                      </span>
                    </div>
                  </TiltCard>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── TREATMENT FINDER ─────────────────────── */
const GOALS = [
  { id: 'glow', label: 'Glowing skin', Icon: Sun, picks: ['Glass Skin Facial', 'Hydra Facial', 'Glow Drip', 'Signature Glow'] },
  { id: 'smooth', label: 'Hair-free & smooth', Icon: Zap, picks: ['Full Body Laser', 'Underarms Laser', 'Full Face Laser', 'Total Smooth'] },
  { id: 'youth', label: 'Fewer fine lines', Icon: Crown, picks: ['Botox', 'Profhilo (PS2)', 'Complete Rejuvenation', 'Threads'] },
  { id: 'hydrate', label: 'Deep hydration', Icon: Droplets, picks: ['Skin Booster Injection', 'Skin Booster + Microneedling', 'Meso Facial', 'Korean Facial'] },
  { id: 'renew', label: 'Skin & hair renewal', Icon: Flower2, picks: ['Face PRP', 'PRP + Mesotherapy', 'Exosomes', 'Carbon Facial'] },
]

function Finder() {
  const [goal, setGoal] = useState(GOALS[0])
  const picks = goal.picks.map((n) => TREATMENTS.find((t) => t.name === n)).filter(Boolean)

  return (
    <section className="relative overflow-hidden bg-cream/70 py-20">
      <div className="container-x">
        <SectionHeading center eyebrow="Treatment finder" title={<>What would you love to <em className="gold-text">change?</em></>} copy="Tap your goal and we’ll show you where most clients begin." />

        <div className="no-scrollbar -mx-4 mt-10 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {GOALS.map((g) => (
            <button
              key={g.id}
              onClick={() => setGoal(g)}
              className={`relative flex shrink-0 items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition ${goal.id === g.id ? 'border-transparent text-white' : 'border-gold/30 bg-white/70 text-cocoa hover:border-gold'}`}
            >
              {goal.id === g.id && <motion.span layoutId="goal-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-gold-deep shadow-glow" />}
              <g.Icon size={16} className="relative" />
              <span className="relative">{g.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {picks.map((t, i) => (
              <motion.div
                key={goal.id + t.id}
                layout
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <TiltCard className="group card-luxe overflow-hidden">
                  <img src={t.image} alt={t.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <div className="p-5">
                    <h3 className="font-display text-2xl leading-tight">{t.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-gold-deep">{t.price}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-mist">{t.desc}</p>
                    <Link to={`/book?t=${encodeURIComponent(t.name)}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-deep">
                      Book this <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── JOURNEY ─────────────────────────── */
function Journey() {
  const steps = [
    { Icon: MessageCircle, t: 'Reach out', d: 'Send a quick request through our form or WhatsApp. It takes 30 seconds.' },
    { Icon: ClipboardList, t: 'Consultation', d: 'We listen to your goals, assess your skin and answer every question.' },
    { Icon: Wand2, t: 'Your treatment', d: 'A personalised plan, carried out with care in a calm, private room.' },
    { Icon: HeartHandshake, t: 'Aftercare', d: 'Guidance and follow-up so you feel supported long after you leave.' },
  ]
  return (
    <section className="container-x py-24">
      <SectionHeading center eyebrow="Your Lunara journey" title={<>The conversation <em className="gold-text">comes first.</em></>} />
      <div className="relative mt-16 grid gap-6 md:grid-cols-4">
        <div aria-hidden className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent md:block" />
        {steps.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.12} className="relative text-center">
            <motion.div whileHover={{ rotateY: 180 }} transition={{ duration: 0.7 }} style={{ transformStyle: 'preserve-3d' }} className="relative mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep text-white shadow-glow">
              <s.Icon size={28} />
              <span className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-espresso font-display text-sm text-ivory">{i + 1}</span>
            </motion.div>
            <h3 className="mt-6 font-display text-3xl">{s.t}</h3>
            <p className="copy mx-auto mt-2 max-w-[16rem] text-sm">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────── BUNDLES ─────────────────────────── */
function Bundles() {
  const bundles = TREATMENTS.filter((t) => t.bundle)
  return (
    <section className="relative overflow-hidden bg-espresso py-24 text-ivory">
      <div aria-hidden className="absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-[140px]" />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal><p className="eyebrow !text-gold-light">Signature combinations</p></Reveal>
            <Reveal delay={0.08}><h2 className="title-lg mt-4">More care, <em className="gold-text">better value.</em></h2></Reveal>
            <Reveal delay={0.16}><p className="mt-4 text-sm leading-7 text-ivory/70">Curated pairings our clients love, designed to work beautifully together.</p></Reveal>
          </div>
          <Reveal><Link to="/treatments?c=bundles" className="btn border border-gold-light/40 text-ivory hover:bg-white/10">All bundles <ArrowRight size={16} /></Link></Reveal>
        </div>

        <div className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
          {bundles.map((b, i) => (
            <Reveal key={b.id} delay={Math.min(i, 4) * 0.06} className="w-[82%] shrink-0 snap-start sm:w-[44%] lg:w-[30%]">
              <TiltCard className="group h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] backdrop-blur">
                <div className="relative h-48 overflow-hidden">
                  <img src={b.image} alt={b.name} loading="lazy" className="size-full object-cover opacity-80 transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso to-transparent" />
                  {b.popular && <span className="chip absolute left-4 top-4 !border-gold-light/50 !bg-gold !text-white"><Star size={11} fill="currentColor" /> Most loved</span>}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-3xl">{b.name}</h3>
                  <p className="mt-2 min-h-[2.5rem] text-sm text-ivory/70">{b.desc}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="gold-text font-display text-2xl">{b.price}</span>
                    <Link to={`/book?t=${encodeURIComponent(b.name)}`} className="grid size-11 place-items-center rounded-full bg-gold text-white transition group-hover:rotate-[-45deg]" aria-label={`Book ${b.name}`}>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────── WHY ──────────────────────────── */
function Why() {
  const items = [
    { Icon: ShieldCheck, t: 'Expert-led care', d: 'Treatments guided by our trained aesthetician with safety and suitability first.' },
    { Icon: HeartHandshake, t: 'Honest advice', d: 'We’ll tell you what suits you, and what doesn’t. No pressure, ever.' },
    { Icon: Gem, t: 'Transparent pricing', d: 'Clear prices in PKR, published openly on our menu.' },
    { Icon: Flower2, t: 'Calm, private space', d: 'A light-filled clinic designed to help you relax.' },
  ]
  return (
    <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
      <Reveal className="relative">
        <TiltCard intensity={6} className="overflow-hidden rounded-[2rem] shadow-luxe">
          <img src="/images/lunara-clinic-hero.jpg" alt="A calm, light-filled Lunara Aesthetic treatment room" loading="lazy" className="aspect-[4/4.2] w-full object-cover" />
        </TiltCard>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="glass absolute -bottom-6 -right-2 rounded-2xl p-5 shadow-luxe sm:-right-8">
          <p className="font-display text-4xl gold-text">Lahore</p>
          <p className="text-[0.65rem] uppercase tracking-widest text-mist">Pakistan</p>
        </motion.div>
      </Reveal>
      <div>
        <SectionHeading eyebrow="Why Lunara" title={<>Beauty, with a <em className="gold-text">gentle touch.</em></>} copy="No two people are the same, so no two treatment plans are either. Here is what you can expect every time you visit." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08}>
              <div className="card-luxe group h-full p-5 transition hover:-translate-y-1 hover:shadow-glow">
                <span className="grid size-11 place-items-center rounded-xl bg-gold/10 text-gold-deep transition group-hover:bg-gold group-hover:text-white"><it.Icon size={20} /></span>
                <h3 className="mt-4 font-display text-2xl">{it.t}</h3>
                <p className="mt-1 text-sm leading-6 text-mist">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────── TEAM ──────────────────────────── */
function TeamTeaser() {
  const people = TEAM.owners
  return (
    <section className="relative bg-cream/70 py-24">
      <div className="container-x">
        <SectionHeading center eyebrow="The faces of Lunara" title={<>Meet the <em className="gold-text">team.</em></>} />
        <div className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-2">
          {people.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <TiltCard className="group card-luxe p-8 text-center">
                <div className="relative mx-auto size-32" style={{ transform: 'translateZ(50px)' }}>
                  <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,#8C6430,#F6E3BF,#B8894A,#F6E3BF,#8C6430)]" />
                  <div className="absolute inset-[3px] grid place-items-center rounded-full bg-ivory font-display text-4xl text-gold-deep">{p.initials}</div>
                </div>
                <h3 className="mt-6 font-display text-3xl">{p.name}</h3>
                <p className="eyebrow mt-2">{p.role}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center"><Link to="/about" className="btn-ghost">Our story <ArrowRight size={16} /></Link></Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────── FAQ ──────────────────────────── */
const FAQS = [
  { q: 'Is the first consultation free?', a: 'Yes. Request a free consultation through our booking form or WhatsApp. We’ll talk through your goals and the options that may suit you, with no obligation.' },
  { q: 'How do I book an appointment?', a: 'Fill in the booking form with your name, number and the treatment you’re interested in. It opens WhatsApp with your request ready to send, and our team will reply to confirm a time.' },
  { q: 'Are your prices fixed?', a: 'Our menu shows current prices in PKR. Some treatments, such as fillers, Sculptra and threads, are priced after consultation because they depend on your individual needs.' },
  { q: 'Who performs the treatments?', a: 'Treatments are carried out by our trained aesthetician, who will assess your suitability and create a personalised plan before anything begins.' },
  { q: 'How many sessions will I need?', a: 'It depends on the treatment and your skin. Laser hair removal, for example, usually needs a course of sessions. We’ll give you an honest estimate at your consultation.' },
  { q: 'Where are you located?', a: 'We’re at Plaza No. 19, 3rd Floor, Block A, Sector BWB, DHA Phase 8, Lahore Cantt, Pakistan. Message us on WhatsApp to check current availability before visiting.' },
]

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="container-x grid gap-12 py-24 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <SectionHeading eyebrow="Questions" title={<>Good to <em className="gold-text">know.</em></>} copy="Can’t find your answer? Message us. We usually reply quickly." />
        <Reveal delay={0.2} className="mt-8">
          <a href={waLink('Hello Lunara! I have a question:')} target="_blank" rel="noreferrer" className="btn-gold"><MessageCircle size={18} /> Ask on WhatsApp</a>
        </Reveal>
      </div>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <div className={`card-luxe overflow-hidden transition ${open === i ? 'shadow-glow' : ''}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left" aria-expanded={open === i}>
                <span className="font-display text-xl sm:text-2xl">{f.q}</span>
                <span className={`grid size-9 shrink-0 place-items-center rounded-full transition ${open === i ? 'bg-gold text-white' : 'bg-gold/10 text-gold-deep'}`}>
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
                    <p className="px-5 pb-5 text-sm leading-7 text-cocoa">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────── BOOKING ─────────────────────────── */
function BookingSection() {
  return (
    <section id="book" className="relative overflow-hidden py-24">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,#F3E1C3_0%,#FBF7F1_60%)]" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="Begin whenever you’re ready" title={<>Let’s talk about what feels <em className="gold-text">right for you.</em></>} copy="Choose a treatment, leave a note, and your request goes straight to our WhatsApp. We’ll reply to confirm your visit." />
          <Reveal delay={0.2} className="mt-8">
            <p className="text-xs uppercase tracking-widest text-mist">Follow our journey</p>
            <Socials className="mt-3" />
          </Reveal>
        </div>
        <Reveal delay={0.1}><BookingForm /></Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Categories />
      <Finder />
      <Journey />
      <Bundles />
      <Why />
      <TeamTeaser />
      <InstagramSection />
      <FAQ />
      <BookingSection />
    </>
  )
}
