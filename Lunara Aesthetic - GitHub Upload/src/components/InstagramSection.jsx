import { motion } from 'framer-motion'
import { Instagram, Play, Heart, MessageCircle, Send, ArrowUpRight } from 'lucide-react'
import { SITE } from '../config'
import { Reveal, TiltCard } from './ui'

/** Turns any reel/post link into Instagram's embeddable URL. */
function embedUrl(link) {
  const m = link?.match(/instagram\.com\/(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/)
  if (!m) return null
  const kind = m[1] === 'reels' ? 'reel' : m[1]
  return `https://www.instagram.com/${kind}/${m[2]}/embed/`
}

function PhoneFrame({ children }) {
  return (
    <div className="relative mx-auto w-[300px] sm:w-[330px]">
      <div aria-hidden className="absolute -inset-10 rounded-full bg-gradient-to-br from-gold-light/50 via-[#E9A9B8]/30 to-gold-deep/40 blur-3xl" />
      <div className="relative rounded-[3rem] bg-gradient-to-br from-[#3a2c22] via-espresso to-black p-3 shadow-[0_40px_80px_-20px_rgba(42,31,23,.6)] ring-1 ring-gold/40">
        <div className="absolute left-1/2 top-5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative aspect-[9/17.5] overflow-hidden rounded-[2.4rem] bg-ivory">{children}</div>
      </div>
    </div>
  )
}

function Placeholder() {
  const profile = SITE.socials.instagram
  return (
    <a href={profile} target="_blank" rel="noreferrer" className="group absolute inset-0 block">
      <img src="/images/facials.jpg" alt="" className="absolute inset-0 size-full object-cover transition duration-1000 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/30 via-transparent to-espresso/85" />
      <div className="absolute left-4 right-4 top-12 flex items-center gap-2 text-ivory">
        <img src="/images/lunara-mark.jpg" alt="" className="size-8 rounded-full ring-2 ring-[#E1306C]" />
        <span className="text-xs font-semibold">{SITE.instagramHandle}</span>
      </div>
      <motion.span
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/25 text-white backdrop-blur-md ring-1 ring-white/50"
      >
        <Play size={26} fill="currentColor" className="ml-1" />
      </motion.span>
      <div className="absolute right-3 top-1/2 mt-8 flex flex-col items-center gap-4 text-white">
        <Heart size={22} /><MessageCircle size={22} /><Send size={22} />
      </div>
      <div className="absolute inset-x-4 bottom-6 text-ivory">
        <p className="font-display text-2xl leading-tight">Watch our latest glow transformations</p>
        <p className="mt-2 text-[0.7rem] text-ivory/80">Tap to open on Instagram</p>
      </div>
    </a>
  )
}

export default function InstagramSection() {
  const src = embedUrl(SITE.instagramReel)
  const profile = SITE.socials.instagram
  if (!profile) return null

  return (
    <section className="relative overflow-hidden py-24">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,#F3E1C3_0%,#FBF7F1_60%)]" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-2"><Instagram size={14} /> @{SITE.instagramHandle}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="title-lg mt-4">Follow our <em className="gold-text">glow journey.</em></h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="copy mt-5 max-w-lg">
              Behind-the-scenes treatments, real client moments, skincare tips and our latest offers. See what a
              visit to Lunara really feels like before you book.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile}
              target="_blank"
              rel="noreferrer"
              className="btn text-white shadow-[0_15px_35px_-12px_rgba(225,48,108,.6)] transition hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(45deg,#F58529,#DD2A7B 50%,#8134AF)' }}
            >
              <Instagram size={18} /> Follow on Instagram <ArrowUpRight size={16} />
            </a>
          </Reveal>
          <Reveal delay={0.32} className="mt-10 grid max-w-md grid-cols-3 gap-3">
            {['/images/skin-boosters.jpg', '/images/lip-tint.jpg', '/images/iv-therapy.jpg'].map((img) => (
              <a key={img} href={profile} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden rounded-2xl shadow-luxe">
                <img src={img} alt="" loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center bg-espresso/0 text-white opacity-0 transition group-hover:bg-espresso/40 group-hover:opacity-100">
                  <Instagram size={22} />
                </span>
              </a>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <TiltCard intensity={8} className="rounded-[3rem]">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>
              <PhoneFrame>
                {src ? (
                  <iframe
                    src={src}
                    title="Lunara Aesthetic on Instagram"
                    className="absolute inset-0 size-full"
                    loading="lazy"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    scrolling="no"
                  />
                ) : (
                  <Placeholder />
                )}
              </PhoneFrame>
            </motion.div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}
