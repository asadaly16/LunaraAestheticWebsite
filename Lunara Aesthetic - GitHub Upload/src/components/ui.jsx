import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import { Instagram, Facebook, Youtube } from 'lucide-react'
import { SITE } from '../config'

export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}

/** 3D tilt card that follows the cursor, with a moving gold glare. */
export function TiltCard({ children, className = '', intensity = 12 }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 180, damping: 18 })
  const sy = useSpring(my, { stiffness: 180, damping: 18 })
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity])
  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity])
  const glareX = useTransform(sx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(sy, [0, 1], ['0%', '100%'])
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,240,215,.45), transparent 55%)`
  )

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { mx.set(0.5); my.set(0.5) }

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={(e) => e.pointerType === 'mouse' && onMove(e)}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative h-full ${className}`}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  )
}

export function CountUp({ to, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration, ease: 'easeOut', onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to, duration])
  return <span ref={ref}>{val}{suffix}</span>
}

export function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
      <path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.4a2.9 2.9 0 1 1-2-2.7V9.2a6.3 6.3 0 1 0 5.4 6.2V8.6a8.2 8.2 0 0 0 4.8 1.5V6.7h-1z" />
    </svg>
  )
}

const SOCIAL_ICONS = {
  instagram: { Icon: Instagram, label: 'Instagram' },
  facebook: { Icon: Facebook, label: 'Facebook' },
  tiktok: { Icon: TikTokIcon, label: 'TikTok' },
  youtube: { Icon: Youtube, label: 'YouTube' },
}

export function Socials({ className = '', size = 18, tone = 'light' }) {
  const base =
    tone === 'dark'
      ? 'border-white/20 text-ivory hover:bg-gold hover:border-gold'
      : 'border-gold/30 text-gold-deep hover:bg-gold hover:text-white hover:border-gold'
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {Object.entries(SITE.socials)
        .filter(([, url]) => url)
        .map(([key, url]) => {
          const { Icon, label } = SOCIAL_ICONS[key]
          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Lunara Aesthetic on ${label}`}
              className={`grid size-10 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-1 ${base}`}
            >
              <Icon size={size} style={{ fontSize: size }} />
            </a>
          )
        })}
    </div>
  )
}

export function SectionHeading({ eyebrow, title, copy, center = false, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
      <Reveal delay={0.08}><h2 className="title-lg mt-4">{title}</h2></Reveal>
      {copy && <Reveal delay={0.16}><p className="copy mt-4">{copy}</p></Reveal>}
    </div>
  )
}

/** Soft floating 3D-ish orbs used as section backgrounds. */
export function Orbs({ className = '' }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -left-24 top-10 size-72 rounded-full bg-gold-light/30 blur-3xl animate-float" />
      <div className="absolute -right-20 bottom-0 size-96 rounded-full bg-sand/60 blur-3xl animate-float [animation-delay:2s]" />
    </div>
  )
}
