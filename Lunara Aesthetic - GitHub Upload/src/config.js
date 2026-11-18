// ─────────────────────────────────────────────────────────────
//  LUNARA AESTHETIC: edit your business details here.
//  Everything on the website reads from this one file.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Lunara Aesthetic',
  city: 'Lahore, Pakistan',
  tagline: 'Your skin, in a softer light.',

  // WhatsApp number in international format, digits only (no +, no spaces)
  whatsapp: '923184897979',
  phoneDisplay: '+92 318 4897979',

  // Booking enquiries are also emailed here
  email: 'ujalahammad379@gmail.com',

  address: 'Plaza No. 19, 3rd Floor, Block A, Sector BWB, DHA Phase 8, Lahore Cantt, Pakistan',
  hours: 'By appointment, contact us for availability',

  // ── Social accounts ─────────────────────────────────────────
  // Paste your profile links below. Leave a link as '' to hide that icon.
  socials: {
    instagram: 'https://www.instagram.com/lunaraaestheticofficial/',
    facebook: '',
    tiktok: '',
    youtube: '',
  },
  instagramHandle: 'lunaraaestheticofficial',

  // Paste a reel link here to show it on the home page, e.g.
  // 'https://www.instagram.com/reel/ABC123xyz/'. Leave '' to show a "Follow us" card instead.
  instagramReel: '',

  // Optional: put a short clinic video in public/videos/ and set e.g. '/videos/treatment.mp4'.
  // Moving the cursor across the home page then plays the treatment forward and back.
  heroVideo: '',
}

export const TEAM = {
  owners: [
    {
      name: 'Sara Husnain',
      role: 'Co-Founder & Owner',
      initials: 'SH',
      bio: 'Sara co-founded Lunara around a simple idea: aesthetic care should feel calm, honest and personal. She shapes the clinic experience from the moment you step in, from the welcome to the aftercare.',
    },
    {
      name: 'Ujala Hammad',
      role: 'Co-Founder & Owner',
      initials: 'UH',
      bio: 'Ujala leads the vision and client relationships at Lunara. She believes every journey should begin with listening, so clients leave feeling understood, informed and cared for.',
    },
  ],
}

export const waLink = (text = '') =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
