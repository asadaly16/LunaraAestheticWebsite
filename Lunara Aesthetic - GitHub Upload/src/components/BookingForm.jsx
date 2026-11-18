import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, CheckCircle2, MessageCircle, Mail, Loader2 } from 'lucide-react'
import { SITE, waLink } from '../config'
import { CATEGORIES, TREATMENTS } from '../data/treatments'

const CONSULT = 'General consultation (not sure yet)'

/**
 * Booking flow:
 *  1. The enquiry is emailed to SITE.email through FormSubmit (free, no backend needed).
 *     The first time the form is used, FormSubmit emails SITE.email an activation link.
 *     Click it once and every later enquiry arrives in the inbox.
 *  2. WhatsApp opens with the enquiry already written, addressed to the clinic number.
 */
export default function BookingForm({ defaultTreatment = '', compact = false }) {
  const [form, setForm] = useState({ name: '', phone: '', treatment: defaultTreatment, type: 'Consultation', comment: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done
  const [emailOk, setEmailOk] = useState(null)
  const boxRef = useRef(null)

  useEffect(() => {
    if (status !== 'done' || !boxRef.current) return
    const top = boxRef.current.getBoundingClientRect().top + window.scrollY - 130
    window.scrollTo({ top, behavior: 'smooth' })
  }, [status])

  const grouped = useMemo(
    () => CATEGORIES.map((c) => ({ ...c, items: TREATMENTS.filter((t) => t.category === c.id) })),
    []
  )

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (form.name.trim().length < 2) er.name = 'Please enter your name'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 15) er.phone = 'Please enter a valid contact number'
    if (!form.treatment) er.treatment = 'Please choose a treatment'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const message = () =>
    [
      `✨ *New ${form.type} Request, Lunara Aesthetic*`,
      ``,
      `*Name:* ${form.name.trim()}`,
      `*Contact:* ${form.phone.trim()}`,
      `*Treatment:* ${form.treatment}`,
      form.comment.trim() ? `*Comment:* ${form.comment.trim()}` : null,
      ``,
      `Sent from the Lunara website`,
    ]
      .filter((l) => l !== null)
      .join('\n')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')

    // Open WhatsApp first, inside the click, so pop-up blockers allow it.
    window.open(waLink(message()), '_blank', 'noopener')

    // Email the enquiry in the background.
    fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `New ${form.type} request: ${form.treatment} (${form.name.trim()})`,
        _template: 'table',
        _captcha: 'false',
        Name: form.name.trim(),
        'Contact Number': form.phone.trim(),
        'Request Type': form.type,
        Treatment: form.treatment,
        Comment: form.comment.trim() || '-',
      }),
    })
      .then((r) => setEmailOk(r.ok))
      .catch(() => setEmailOk(false))
      .finally(() => setStatus('done'))
  }

  const reset = () => {
    setForm({ name: '', phone: '', treatment: defaultTreatment, type: 'Consultation', comment: '' })
    setStatus('idle')
    setEmailOk(null)
  }

  return (
    <div ref={boxRef} className={`card-luxe relative overflow-hidden ${compact ? 'p-6' : 'p-6 sm:p-10'}`}>
      <div aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full bg-gold-light/25 blur-3xl" />
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold-deep text-white shadow-glow"
            >
              <CheckCircle2 size={40} />
            </motion.div>
            <h3 className="mt-6 font-display text-4xl">Thank you, {form.name.split(' ')[0]}!</h3>
            <p className="copy mx-auto mt-3 max-w-md">
              Your request for <strong className="text-espresso">{form.treatment}</strong> is ready. Please press
              <strong className="text-espresso"> Send</strong> in WhatsApp to send it. Our team will reply to confirm your appointment.
            </p>
            {emailOk && <p className="mt-2 text-xs text-mist">A copy has also been emailed to the clinic.</p>}
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={waLink(message())} target="_blank" rel="noreferrer" className="btn-gold">
                <MessageCircle size={18} /> Open WhatsApp again
              </a>
              <button onClick={reset} className="btn-ghost">New request</button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
            {!compact && (
              <>
                <p className="eyebrow">Appointment request</p>
                <h3 className="mt-3 font-display text-4xl leading-tight">Book your visit</h3>
                <p className="copy mt-2 text-sm">Takes less than 30 seconds. We’ll reply on WhatsApp.</p>
              </>
            )}

            <div className="mt-6 inline-flex rounded-full border border-sand bg-cream/70 p-1" role="radiogroup" aria-label="Request type">
              {['Consultation', 'Appointment'].map((t) => (
                <button
                  type="button"
                  key={t}
                  role="radio"
                  aria-checked={form.type === t}
                  onClick={() => setForm((f) => ({ ...f, type: t }))}
                  className={`relative rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition ${form.type === t ? 'text-white' : 'text-cocoa'}`}
                >
                  {form.type === t && <motion.span layoutId={`type-pill-${compact}`} className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-gold-deep" />}
                  <span className="relative">{t === 'Consultation' ? 'Free Consultation' : 'Book Appointment'}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="bf-name">Your name *</label>
                <input id="bf-name" className="field" placeholder="e.g. Ayesha Khan" value={form.name} onChange={set('name')} autoComplete="name" />
                {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="label" htmlFor="bf-phone">Contact number *</label>
                <input id="bf-phone" className="field" type="tel" inputMode="tel" placeholder="03XX XXXXXXX" value={form.phone} onChange={set('phone')} autoComplete="tel" />
                {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label className="label" htmlFor="bf-treatment">Treatment *</label>
              <select id="bf-treatment" className="field cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23B8894A%22 stroke-width=%222.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10" value={form.treatment} onChange={set('treatment')}>
                <option value="">Select a treatment…</option>
                <option value={CONSULT}>{CONSULT}</option>
                {grouped.map((g) => (
                  <optgroup key={g.id} label={g.name}>
                    {g.items.map((t) => (
                      <option key={t.id} value={t.name}>{t.name} ({t.price})</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errors.treatment && <p className="mt-1.5 text-xs text-red-600">{errors.treatment}</p>}
            </div>

            <div className="mt-5">
              <label className="label" htmlFor="bf-comment">Comment <span className="font-normal normal-case tracking-normal text-mist">(optional)</span></label>
              <textarea id="bf-comment" rows={compact ? 2 : 3} className="field resize-none" placeholder="Preferred day or time, or any question for us…" value={form.comment} onChange={set('comment')} maxLength={500} />
            </div>

            <button type="submit" disabled={status === 'sending'} className="btn-gold mt-7 w-full !py-4 text-base disabled:opacity-70">
              {status === 'sending' ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              {form.type === 'Consultation' ? 'Request Consultation' : 'Book Appointment'}
            </button>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[0.7rem] text-mist">
              <span className="inline-flex items-center gap-1.5"><MessageCircle size={13} className="text-[#25D366]" /> Sent to our WhatsApp</span>
              <span className="inline-flex items-center gap-1.5"><Mail size={13} className="text-gold" /> Copy to our email</span>
            </div>
            <p className="mt-3 text-center text-[0.68rem] leading-5 text-mist/90">
              Please don’t share sensitive medical details here. Your appointment is confirmed once the clinic replies.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
