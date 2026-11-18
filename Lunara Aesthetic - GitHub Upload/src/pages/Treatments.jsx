import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ArrowRight, Star, Sparkles, MessageCircle, X } from 'lucide-react'
import { CATEGORIES, TREATMENTS, categoryName } from '../data/treatments'
import { Reveal, TiltCard } from '../components/ui'
import { waLink } from '../config'

export function PageHero({ eyebrow, title, copy, children }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-40">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,#F3E1C3_0%,#FBF7F1_55%)]" />
      <div aria-hidden className="absolute -right-24 top-24 size-80 rounded-full border border-gold/20" />
      <div aria-hidden className="absolute -right-10 top-40 size-48 rounded-full bg-gradient-to-br from-gold-light/60 to-gold-deep/40 blur-2xl animate-float" />
      <div className="container-x relative">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="chip"><Sparkles size={12} /> {eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="title-xl mt-6 max-w-4xl">{title}</motion.h1>
        {copy && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="copy mt-6 max-w-2xl text-base">{copy}</motion.p>}
        {children}
      </div>
    </section>
  )
}

export default function Treatments() {
  const [params, setParams] = useSearchParams()
  const active = params.get('c') || 'all'
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return TREATMENTS.filter(
      (t) =>
        (active === 'all' || t.category === active) &&
        (!s || `${t.name} ${t.desc} ${categoryName(t.category)}`.toLowerCase().includes(s))
    )
  }, [active, q])

  const setCat = (id) => setParams(id === 'all' ? {} : { c: id }, { replace: true })

  return (
    <>
      <PageHero
        eyebrow="The Lunara menu"
        title={<>Treatments <em className="gold-text">& prices.</em></>}
        copy="Browse everything we currently offer. All prices are in Pakistani rupees (PKR). Final suitability and pricing are confirmed at your consultation."
      />

      <section className="sticky top-[6.5rem] z-30 border-y border-sand/70 bg-ivory/85 backdrop-blur-xl">
        <div className="container-x flex flex-col gap-3 py-4 lg:flex-row lg:items-center">
          <div className="relative lg:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search treatments…" className="field !rounded-full !py-2.5 pl-10 pr-9" aria-label="Search treatments" />
            {q && <button onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-mist" aria-label="Clear search"><X size={16} /></button>}
          </div>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
            {[{ id: 'all', short: 'All' }, ...CATEGORIES].map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${active === c.id ? 'text-white' : 'text-cocoa hover:text-espresso'}`}
              >
                {active === c.id && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-gold-deep" />}
                <span className="relative">{c.short}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        <p className="mb-6 text-sm text-mist">Showing <strong className="text-espresso">{list.length}</strong> treatment{list.length === 1 ? '' : 's'}{active !== 'all' && <> in <strong className="text-espresso">{categoryName(active)}</strong></>}</p>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((t) => (
              <motion.div key={t.id} layout initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}>
                <TiltCard intensity={8} className="group card-luxe flex flex-col overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <img src={t.image} alt={`${t.name} at Lunara Aesthetic`} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent" />
                    <span className="chip absolute left-4 top-4 !bg-white/90">{t.bundle ? 'Signature combination' : categoryName(t.category)}</span>
                    {t.popular && <span className="chip absolute right-4 top-4 !border-transparent !bg-gold !text-white"><Star size={11} fill="currentColor" /> Popular</span>}
                  </div>
                  <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(30px)' }}>
                    <h3 className="font-display text-3xl leading-tight">{t.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-mist">{t.desc}</p>
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-sand/70 pt-5">
                      <span className="font-display text-2xl text-gold-deep">{t.price}</span>
                      <div className="flex gap-2">
                        <a href={waLink(`Hello Lunara! I'd like to ask about ${t.name} (${t.price}).`)} target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-gold/30 text-gold-deep transition hover:bg-[#25D366] hover:text-white hover:border-transparent" aria-label={`Ask about ${t.name} on WhatsApp`}>
                          <MessageCircle size={17} />
                        </a>
                        <Link to={`/book?t=${encodeURIComponent(t.name)}`} className="btn-gold !px-4 !py-2 text-xs">Book <ArrowRight size={14} /></Link>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && (
          <div className="card-luxe p-12 text-center">
            <p className="font-display text-3xl">No treatments found</p>
            <p className="copy mt-2">Try another search, or message us and we’ll help.</p>
            <button onClick={() => { setQ(''); setCat('all') }} className="btn-ghost mt-6">Show all treatments</button>
          </div>
        )}

        <Reveal className="mt-14">
          <div className="card-luxe flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-3xl">Not sure where to start?</p>
              <p className="copy mt-1 text-sm">Book a free consultation and we’ll guide you to the right treatment.</p>
            </div>
            <Link to="/book" className="btn-gold shrink-0">Book Free Consultation <ArrowRight size={16} /></Link>
          </div>
          <p className="mt-6 text-center text-xs leading-6 text-mist">
            Prices are a guide and may be updated by the clinic. A listed treatment is not a recommendation or a promise of a particular result. Please confirm the current price and suitability with Lunara before proceeding.
          </p>
        </Reveal>
      </section>
    </>
  )
}
