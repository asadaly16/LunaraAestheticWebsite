import { useSearchParams } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Clock, ShieldCheck } from 'lucide-react'
import { PageHero } from './Treatments'
import BookingForm from '../components/BookingForm'
import { Reveal, Socials } from '../components/ui'
import { SITE, waLink } from '../config'
import { TREATMENTS } from '../data/treatments'

export default function Book() {
  const [params] = useSearchParams()
  const t = params.get('t')
  const preset = t && TREATMENTS.some((x) => x.name === t) ? t : ''

  const contacts = [
    { Icon: MessageCircle, label: 'WhatsApp', value: SITE.phoneDisplay, href: waLink('Hello Lunara Aesthetic!') },
    { Icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { Icon: MapPin, label: 'Find us', value: SITE.address },
    { Icon: Clock, label: 'Hours', value: SITE.hours },
  ]

  return (
    <>
      <PageHero
        eyebrow="Your first conversation"
        title={<>Let’s <em className="gold-text">talk.</em></>}
        copy="Tell us what you’re interested in. Your request goes straight to our WhatsApp, and a copy goes to our email, so we can get back to you quickly."
      />
      <section className="container-x grid gap-10 pb-24 lg:grid-cols-[1.25fr_0.75fr]">
        <Reveal><BookingForm defaultTreatment={preset} /></Reveal>

        <div className="space-y-4">
          {contacts.map((c, i) => {
            const Inner = (
              <div className="card-luxe group flex items-center gap-4 p-5 transition hover:-translate-y-1 hover:shadow-glow">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold/10 text-gold-deep transition group-hover:bg-gold group-hover:text-white"><c.Icon size={20} /></span>
                <span className="min-w-0">
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-widest text-mist">{c.label}</span>
                  <span className="block break-words font-display text-xl">{c.value}</span>
                </span>
              </div>
            )
            return (
              <Reveal key={c.label} delay={i * 0.08}>
                {c.href ? <a href={c.href} target="_blank" rel="noreferrer">{Inner}</a> : Inner}
              </Reveal>
            )
          })}
          <Reveal delay={0.35}>
            <div className="card-luxe p-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-mist">Follow us</p>
              <Socials className="mt-3" />
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex gap-3 rounded-2xl border border-gold/20 bg-gold/5 p-5 text-xs leading-6 text-cocoa">
              <ShieldCheck size={18} className="shrink-0 text-gold-deep" />
              For your privacy, please don’t send sensitive health details, documents or photographs through this website. Share relevant health information directly with the clinic.
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
