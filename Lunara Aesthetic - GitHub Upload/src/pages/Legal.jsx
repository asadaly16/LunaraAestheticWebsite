import { Link } from 'react-router-dom'
import { PageHero } from './Treatments'
import { Reveal } from '../components/ui'
import { SITE } from '../config'

const UPDATED = '18 November 2026'

function LegalBody({ sections, note }) {
  return (
    <section className="container-x pb-24">
      <div className="card-luxe mx-auto max-w-3xl p-6 sm:p-12">
        <p className="text-xs uppercase tracking-widest text-mist">Last updated: {UPDATED}</p>
        {sections.map((s, i) => (
          <Reveal key={s.h} delay={Math.min(i, 3) * 0.04}>
            <h2 className="mt-10 font-display text-3xl">{s.h}</h2>
            {s.p.map((p, j) => <p key={j} className="copy mt-3 text-sm">{p}</p>)}
          </Reveal>
        ))}
        {note && <p className="mt-12 rounded-2xl bg-cream p-5 text-xs leading-6 text-mist">{note}</p>}
        <Link to="/" className="btn-ghost mt-10">Back to home</Link>
      </div>
    </section>
  )
}

export function Terms() {
  const sections = [
    { h: '1. Website information', p: ['The website gives general information about treatments and prices currently listed by the clinic. It is not medical advice, a diagnosis, or a substitute for a consultation with an appropriately qualified practitioner. A listed treatment may not be appropriate for every person.'] },
    { h: '2. Appointment enquiries', p: [
      `When you submit the booking form, your enquiry is emailed to the clinic and a prepared WhatsApp message addressed to the clinic is opened for you to send. Submitting the form, sending a message, or requesting a date does not reserve or confirm an appointment. Your appointment is confirmed only when the clinic replies and confirms it with you.`,
      `You can also contact the clinic directly at ${SITE.email}. Do not include sensitive health information, identity documents, or photographs in the website form.`,
    ] },
    { h: '3. Treatments, consultations and results', p: [
      'Before any treatment, discuss your goals, relevant health circumstances, suitability, expected benefits, risks, possible side effects, alternatives and aftercare directly with the practitioner. Do not proceed unless your questions have been answered and you have given any required informed consent. The practitioner may decide that a treatment is unsuitable or suggest a different plan.',
      'Individual experiences, results, recovery, and the number of sessions required can vary. No specific outcome is promised by this website. Website photographs or descriptions do not promise a particular result for you.',
    ] },
    { h: '4. Prices and availability', p: ['Prices displayed in Pakistani rupees (PKR) are a guide to the currently published clinic menu. The clinic may update a price, package, or availability. Some treatments are priced after consultation or according to individual requirements. Please confirm the current price, what is included, availability, and any applicable payment, rescheduling, cancellation, or refund conditions directly with the clinic before agreeing to treatment.'] },
    { h: '5. Your use of the website', p: ['Please use the website lawfully and provide accurate contact information if you send an enquiry. Do not misuse the website, interfere with its operation, or submit another person’s personal information without their permission.'] },
    { h: '6. Website availability and content', p: ['The clinic aims to keep the website useful, but it may be updated, changed, interrupted, or unavailable from time to time. Information may change without notice. To the extent permitted by applicable law, the website content is provided for general informational purposes.'] },
    { h: '7. Applicable law', p: ['These website terms are to be read consistently with applicable laws and regulations in Pakistan. Any matter that cannot be resolved directly with the clinic is subject to the applicable legal requirements and jurisdiction in Pakistan. Nothing in these terms limits a right that cannot legally be excluded.'] },
    { h: '8. Contact and changes', p: [`For questions about these terms, contact Lunara Aesthetic at ${SITE.email} or through WhatsApp on ${SITE.phoneDisplay}. The clinic may update these terms when its website or services change; the “last updated” date above indicates the current version.`] },
  ]
  return (
    <>
      <PageHero eyebrow="Lunara Aesthetic · Lahore" title={<>Terms & <em className="gold-text">conditions.</em></>} copy="These terms apply when you visit this website or send an appointment or treatment enquiry to Lunara Aesthetic in Lahore, Pakistan." />
      <LegalBody sections={sections} note="This general website notice is provided for transparency, not as legal advice. The clinic should have a qualified Pakistani legal adviser review it before relying on it as its final legal policy." />
    </>
  )
}

export function Privacy() {
  const sections = [
    { h: 'Information you enter', p: [
      'If you use the booking form, we collect your name, contact number, chosen treatment, request type and any optional comment you write. This is used only to respond to your enquiry and arrange your appointment.',
      `When you submit, the enquiry is sent by email to ${SITE.email} through FormSubmit, a third-party form-delivery service, and a prepared WhatsApp message addressed to the clinic is opened on your device. WhatsApp handles the message after it opens, and the privacy terms of WhatsApp, FormSubmit and your email or mobile provider may apply.`,
    ] },
    { h: 'Medical and treatment information', p: ['This website does not ask for medical history and is not designed to collect clinical records. Please share relevant health information directly with the clinic through a channel the clinic confirms, and only when needed for a consultation or care.'] },
    { h: 'Website operations', p: ['Like most hosted websites, the website host and technical service providers may process limited technical information needed to deliver, protect, and maintain the pages. Their security and service logs are governed by their own terms and retention practices.'] },
    { h: 'Your choices', p: [`You can leave the page without submitting the form. To ask about, correct, or delete information you have sent to the clinic, contact us at ${SITE.email}.`] },
    { h: 'Pakistan and updates', p: ['Lunara Aesthetic is located in Lahore, Pakistan. This notice explains the website’s enquiry flow and should be read consistently with applicable Pakistani privacy and consumer-protection requirements. Any material change to the website’s enquiry or data-handling practices will be reflected here.'] },
  ]
  return (
    <>
      <PageHero eyebrow="Lunara Aesthetic · Lahore" title={<>Privacy <em className="gold-text">notice.</em></>} copy="What happens to the information you enter on Lunara Aesthetic’s website." />
      <LegalBody sections={sections} note="This notice is not legal advice. The clinic should seek qualified advice on its wider patient-record, retention, and statutory obligations." />
    </>
  )
}
