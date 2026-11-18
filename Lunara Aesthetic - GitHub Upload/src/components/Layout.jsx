import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Mail, Phone, MapPin, ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react'
import { SITE, waLink } from '../config'
import { Socials } from './ui'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/treatments', label: 'Treatments' },
  { to: '/about', label: 'About Us' },
  { to: '/book', label: 'Book' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-espresso text-ivory/90">
        <div className="container-x flex h-8 items-center justify-center gap-2 text-[0.68rem] tracking-wide">
          <Sparkles size={12} className="text-gold-light" />
          <span>Lahore, Pakistan · Appointments & enquiries by WhatsApp</span>
        </div>
      </div>
      <div className={`transition-all duration-500 ${scrolled ? 'glass shadow-[0_10px_40px_-20px_rgba(42,31,23,.35)]' : 'bg-transparent'}`}>
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Lunara Aesthetic home">
            <img src="/images/lunara-mark.jpg" alt="" className="size-11 rounded-full object-cover ring-1 ring-gold/40" />
            <span className="leading-none">
              <span className="block font-display text-2xl">Lunara</span>
              <span className="block text-[0.55rem] font-semibold tracking-[0.3em] text-mist">AESTHETIC · LAHORE</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'text-gold-deep' : 'text-cocoa hover:text-espresso'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {n.label}
                    {isActive && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-gold/10 ring-1 ring-gold/25" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/book" className="btn-gold hidden !px-5 !py-2.5 sm:inline-flex">
              Book Consultation <ArrowUpRight size={16} />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full border border-gold/30 bg-white/60 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass mx-4 mt-2 rounded-3xl p-4 shadow-luxe md:hidden"
          >
            {NAV.map((n, i) => (
              <motion.div key={n.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <NavLink
                  to={n.to}
                  end={n.to === '/'}
                  className={({ isActive }) => `block rounded-2xl px-4 py-3 font-display text-2xl ${isActive ? 'bg-gold/10 text-gold-deep' : ''}`}
                >
                  {n.label}
                </NavLink>
              </motion.div>
            ))}
            <Link to="/book" className="btn-gold mt-3 w-full">Book Consultation</Link>
            <Socials className="mt-4 justify-center" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso text-ivory">
      <div aria-hidden className="absolute -right-32 -top-32 size-[28rem] rounded-full bg-gold/20 blur-3xl" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/images/lunara-mark.jpg" alt="" className="size-14 rounded-full object-cover ring-1 ring-gold/50" />
            <span className="font-display text-3xl">Lunara Aesthetic</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-7 text-ivory/70">
            A considered approach to aesthetic care in Lahore, Pakistan. Each journey begins with a conversation.
          </p>
          <Socials className="mt-6" tone="dark" />
        </div>

        <div>
          <p className="eyebrow !text-gold-light">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-ivory/75">
            <li><Link className="hover:text-gold-light" to="/treatments">Treatments & Prices</Link></li>
            <li><Link className="hover:text-gold-light" to="/about">About Us</Link></li>
            <li><Link className="hover:text-gold-light" to="/book">Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-gold-light">Legal</p>
          <ul className="mt-5 space-y-3 text-sm text-ivory/75">
            <li><Link className="hover:text-gold-light" to="/terms">Terms & Conditions</Link></li>
            <li><Link className="hover:text-gold-light" to="/privacy">Privacy Notice</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-gold-light">Get in touch</p>
          <ul className="mt-5 space-y-4 text-sm text-ivory/80">
            <li>
              <a className="flex items-center gap-3 hover:text-gold-light" href={waLink()} target="_blank" rel="noreferrer">
                <Phone size={16} className="text-gold-light" /> {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 break-all hover:text-gold-light" href={`mailto:${SITE.email}`}>
                <Mail size={16} className="shrink-0 text-gold-light" /> {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3"><MapPin size={16} className="mt-1 shrink-0 text-gold-light" /> {SITE.address}</li>
          </ul>
        </div>
      </div>
      <div className="container-x relative">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-ivory/50">
          <p>© {new Date().getFullYear()} Lunara Aesthetic, Lahore, Pakistan. All rights reserved.</p>
          <p className="font-display text-base italic text-ivory/60">Your skin, in a softer light.</p>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppFloat() {
  return (
    <a
      href={waLink('Hello Lunara Aesthetic! I would like to know more about your treatments.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Lunara on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2"
    >
      <span className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-espresso shadow-luxe transition group-hover:translate-x-0 sm:block sm:translate-x-2 sm:opacity-0 sm:group-hover:opacity-100">
        Chat with us
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_15px_35px_-10px_rgba(37,211,102,.8)] transition group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <MessageCircle size={26} className="relative" />
      </span>
    </a>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-gold-deep via-gold-light to-gold-deep" />
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="grain min-h-screen">
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
