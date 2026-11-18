import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { SITE } from '../config'

/**
 * Interactive hero: an aesthetician treating a client.
 * The scene tilts in 3D, the photo shifts in depth, and a soft treatment glow follows the cursor.
 *
 * If SITE.heroVideo is set (a short clinic clip in /public), moving the cursor left/right
 * scrubs the video forward/back, so the treatment moves with you. On touch screens it plays on a loop.
 */
export default function HeroVisual() {
  const wrap = useRef(null)
  const video = useRef(null)

  // pointer position across the whole window, 0..1
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 90, damping: 20 })
  const sy = useSpring(py, { stiffness: 90, damping: 20 })

  const rotY = useTransform(sx, [0, 1], [-10, 10])
  const rotX = useTransform(sy, [0, 1], [8, -8])
  const imgX = useTransform(sx, [0, 1], [18, -18])
  const imgY = useTransform(sy, [0, 1], [14, -14])
  const nearX = useTransform(sx, [0, 1], [-34, 34])
  const nearY = useTransform(sy, [0, 1], [-24, 24])
  const farX = useTransform(sx, [0, 1], [-14, 14])

  // treatment glow position inside the photo
  const gx = useTransform(sx, [0, 1], ['25%', '75%'])
  const gy = useTransform(sy, [0, 1], ['25%', '75%'])
  const glow = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(170,225,255,.55) 0%, rgba(255,232,196,.35) 12%, transparent 32%)`

  useEffect(() => {
    let raf = 0
    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      px.set(e.clientX / window.innerWidth)
      py.set(e.clientY / window.innerHeight)
      const v = video.current
      if (v && v.duration) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => { v.currentTime = (e.clientX / window.innerWidth) * (v.duration - 0.05) })
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [px, py])

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  return (
    <div ref={wrap} className="relative flex h-full items-center justify-center" style={{ perspective: 1400 }}>
      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }} className="relative w-full max-w-[560px]">
        {/* gold halo behind */}
        <motion.div aria-hidden style={{ x: farX, translateZ: -80 }} className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-gold-light/60 via-sand to-gold-deep/40 blur-2xl" />
        <motion.div aria-hidden style={{ x: farX, translateZ: -40 }} className="absolute -right-6 -top-6 size-40 rounded-full border border-gold/40" />

        {/* main photo */}
        <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2.5rem] shadow-[0_50px_90px_-30px_rgba(42,31,23,.55)] ring-1 ring-gold/30 sm:aspect-[4/4.2]">
          {SITE.heroVideo ? (
            <motion.video
              ref={video}
              src={SITE.heroVideo}
              poster="/images/facials.jpg"
              muted
              playsInline
              preload="auto"
              autoPlay={isTouch}
              loop={isTouch}
              style={{ x: imgX, y: imgY }}
              className="absolute -inset-8 size-[calc(100%+4rem)] max-w-none object-cover"
            />
          ) : (
            <motion.img
              src="/images/facials.jpg"
              alt="Lunara aesthetician performing a facial treatment"
              style={{ x: imgX, y: imgY }}
              className="absolute -inset-8 size-[calc(100%+4rem)] max-w-none object-cover object-[60%_50%]"
            />
          )}
          <motion.div aria-hidden style={{ background: glow }} className="pointer-events-none absolute inset-0 mix-blend-screen" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent" />

          <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1.5 text-[0.65rem] font-medium text-ivory backdrop-blur-md">
            <span className="size-1.5 animate-pulse rounded-full bg-[#7CE0A3]" /> In session
          </span>
          <div className="absolute bottom-5 right-6 text-right text-ivory">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-gold-light">Now treating</p>
            <p className="font-display text-2xl leading-tight sm:text-3xl">Hydra Facial</p>
          </div>
        </div>


        <motion.span
          aria-hidden
          style={{ x: nearX, y: nearY, translateZ: 140 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
          className="absolute -top-5 left-1/2 text-gold"
        >
          <Sparkles size={30} />
        </motion.span>
      </motion.div>
    </div>
  )
}
