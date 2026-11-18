import { Link } from 'react-router-dom'
import { ArrowRight, HeartHandshake, Moon, ShieldCheck, Sparkles } from 'lucide-react'
import { PageHero } from './Treatments'
import { Reveal, TiltCard, SectionHeading, Socials } from '../components/ui'
import { TEAM } from '../config'

function Avatar({ initials, size = 'size-40' }) {
  return (
    <div className={`relative ${size}`}>
      <div className="absolute inset-0 animate-[spin_14s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,#8C6430,#F6E3BF,#B8894A,#FFF4E2,#8C6430)] shadow-glow" />
      <div className="absolute inset-[4px] grid place-items-center rounded-full bg-gradient-to-br from-ivory to-cream">
        <span className="gold-text font-display text-5xl">{initials}</span>
      </div>
    </div>
  )
}

export default function About() {
  const values = [
    { Icon: HeartHandshake, t: 'Listening first', d: 'Every journey begins with a conversation about you: your goals, your concerns, your comfort.' },
    { Icon: ShieldCheck, t: 'Safety & honesty', d: 'We recommend only what suits you, and we’ll always explain risks, aftercare and realistic expectations.' },
    { Icon: Sparkles, t: 'Natural results', d: 'Our aim is to help you look like yourself, refreshed and confident, never overdone.' },
  ]

  return (
    <>
      <PageHero
        eyebrow="About Lunara"
        title={<>Care, guided <em className="gold-text">by you.</em></>}
        copy="Lunara (from the Latin luna, moon) was created to be a calm, softly lit space in Lahore where aesthetic care feels personal, honest and unhurried."
      />

      {/* Story */}
      <section className="container-x grid items-center gap-14 py-16 lg:grid-cols-2">
        <Reveal>
          <TiltCard intensity={6} className="overflow-hidden rounded-[2rem] shadow-luxe">
            <img src="/images/lunara-clinic-hero.jpg" alt="Inside the Lunara Aesthetic clinic" className="aspect-[5/4] w-full object-cover" />
          </TiltCard>
        </Reveal>
        <div>
          <SectionHeading eyebrow="Our story" title={<>Your skin, in a <em className="gold-text">softer light.</em></>} />
          <Reveal delay={0.15}>
            <p className="copy mt-6">
              Founded by <strong className="text-espresso">Sara Husnain</strong> and <strong className="text-espresso">Ujala Hammad</strong>, Lunara Aesthetic began with a shared belief: that beautiful skin starts with feeling truly heard. Too often, aesthetic care feels rushed or one-size-fits-all. We wanted to change that.
            </p>
            <p className="copy mt-4">
              With our aesthetician <strong className="text-espresso">Ghadia</strong>, every treatment plan is built around you, from glow facials and laser hair removal to skin boosters and injectables. Thoughtful choices, individual attention, and a space where you can simply relax.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" className="btn-gold">Book a consultation <ArrowRight size={16} /></Link>
            <Link to="/treatments" className="btn-ghost">See treatments</Link>
          </Reveal>
        </div>
      </section>


      {/* Owners */}
      <section className="container-x py-24">
        <SectionHeading center eyebrow="The founders" title={<>Meet the <em className="gold-text">owners.</em></>} copy="The vision and the warmth behind every Lunara experience." />
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          {TEAM.owners.map((o, i) => (
            <Reveal key={o.name} delay={i * 0.12}>
              <TiltCard className="group card-luxe h-full p-10 text-center">
                <div className="mx-auto w-fit" style={{ transform: 'translateZ(60px)' }}>
                  <Avatar initials={o.initials} />
                </div>
                <h3 className="mt-8 font-display text-4xl">{o.name}</h3>
                <p className="eyebrow mt-2">{o.role}</p>
                <p className="copy mx-auto mt-5 max-w-sm text-sm">{o.bio}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream/70 py-24">
        <div className="container-x">
          <SectionHeading center eyebrow="What we believe" title={<>The Lunara <em className="gold-text">promise.</em></>} />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.1}>
                <TiltCard className="group card-luxe h-full p-8">
                  <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-gold-deep text-white shadow-glow" style={{ transform: 'translateZ(40px)' }}><v.Icon size={24} /></span>
                  <h3 className="mt-6 font-display text-3xl">{v.t}</h3>
                  <p className="copy mt-2 text-sm">{v.d}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold via-gold-deep to-espresso p-10 text-ivory shadow-luxe sm:p-16">
            <Moon aria-hidden className="absolute -right-10 -top-10 text-white/10" size={260} strokeWidth={0.6} />
            <p className="eyebrow !text-ivory/80">Begin whenever you’re ready</p>
            <h2 className="title-lg mt-4 max-w-2xl">Let’s talk about what feels right for you.</h2>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/book" className="btn bg-ivory text-espresso hover:-translate-y-0.5">Book your visit <ArrowRight size={16} /></Link>
              <Socials tone="dark" />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
