// Treatment menu (prices in PKR), taken from the original Lunara website.
// To change a price, edit the `price` text below.

export const CATEGORIES = [
  { id: 'facials', name: 'Facials & Skin Treatments', short: 'Facials', image: '/images/facials.jpg', blurb: 'Deep-cleansing, hydrating and glow-restoring facials for every skin type.' },
  { id: 'prp', name: 'PRP & Hair', short: 'PRP & Hair', image: '/images/prp.jpg', blurb: 'Regenerative treatments that support skin renewal and healthier-looking hair.' },
  { id: 'laser', name: 'Laser Hair Removal', short: 'Laser Hair', image: '/images/laser-hair.jpg', blurb: 'Long-lasting smoothness, from a quick upper lip to full body.' },
  { id: 'cosmetic', name: 'Other Laser & Cosmetic', short: 'Cosmetic', image: '/images/cosmetic.jpg', blurb: 'Tattoo removal, BB Glow and soft lip tint.' },
  { id: 'boosters', name: 'Skin Boosters & Rejuvenation', short: 'Skin Boosters', image: '/images/skin-boosters.jpg', blurb: 'Deep hydration and radiance from within.' },
  { id: 'injectables', name: 'Injectables & Contouring', short: 'Injectables', image: '/images/injectables.jpg', blurb: 'Subtle, natural-looking refinement, planned at consultation.' },
  { id: 'body', name: 'Body & Slimming', short: 'Body', image: '/images/body.jpg', blurb: 'Body contouring support and slimming options.' },
  { id: 'iv', name: 'IV Therapy & Vitamin Injections', short: 'IV Therapy', image: '/images/iv-therapy.jpg', blurb: 'Glow, energy and wellness drips.' },
  { id: 'bundles', name: 'Signature Combinations', short: 'Bundles', image: '/images/bundles.jpg', blurb: 'Our curated pairings, more care for better value.' },
]

const T = (category, name, price, desc, extra = {}) => ({ category, name, price, desc, ...extra })

export const TREATMENTS = [
  // Facials
  T('facials', 'Hydra Facial', 'PKR 6,500', 'Cleanse, exfoliate and hydrate in one soothing session for instantly fresher skin.', { popular: true }),
  T('facials', 'Cocktail Facial', 'PKR 7,500', 'A customised blend of actives chosen for what your skin needs today.'),
  T('facials', 'Meso Facial', 'PKR 9,000', 'Nourishing serums delivered into the skin for a dewy, revived look.'),
  T('facials', 'Korean Facial', 'PKR 12,000', 'A multi-step K-beauty ritual for that soft, luminous finish.'),
  T('facials', 'Glass Skin Facial', 'PKR 12,500', 'Our most-loved glow facial for smooth, reflective, glass-like skin.', { popular: true }),
  T('facials', 'Carbon Facial', 'PKR 7,000', 'A carbon laser peel that refines pores and brightens dull skin.'),
  // PRP
  T('prp', 'Face PRP', 'PKR 8,000', 'Uses your body’s own growth factors to support natural skin renewal.'),
  T('prp', 'PRP + Mesotherapy', 'PKR 12,000', 'A regenerative duo combining PRP with nourishing mesotherapy.'),
  T('prp', 'Exosomes', 'Starting from PKR 40,000', 'Advanced regenerative care for skin quality and texture.'),
  // Laser hair
  T('laser', 'Full Face Laser', 'PKR 5,500', 'Smooth, hair-free skin across the full face.', { image: '/images/face-perfection.jpg' }),
  T('laser', 'Upper Lip Laser', 'PKR 2,000', 'Quick, precise laser for the upper lip.', { image: '/images/lip-laser.jpg' }),
  T('laser', 'Chin Laser', 'PKR 2,000', 'Targeted laser hair reduction for the chin area.', { image: '/images/chin-laser.jpg' }),
  T('laser', 'Half Arms Laser', 'PKR 5,000', 'Silky arms with long-lasting hair reduction.', { image: '/images/arm-laser.jpg' }),
  T('laser', 'Half Legs Laser', 'PKR 6,000', 'Say goodbye to frequent shaving and waxing.'),
  T('laser', 'Under Legs Laser', 'PKR 5,500', 'Smooth confidence for the lower legs.'),
  T('laser', 'Underarms Laser', 'PKR 5,000', 'Fresh, smooth underarms with less irritation.', { image: '/images/underarms-laser.jpg', popular: true }),
  T('laser', 'Full Body Laser', 'PKR 22,000', 'Complete head-to-toe laser hair removal.'),
  // Cosmetic
  T('cosmetic', 'Tattoo Removal', 'PKR 5,500', 'Gradual laser fading of unwanted ink.'),
  T('cosmetic', 'BB Glow', 'PKR 10,500', 'Semi-permanent tinted glow for an even, foundation-like finish.'),
  T('cosmetic', 'Lip Tint', 'PKR 8,500', 'A soft, natural flush of colour that lasts.', { image: '/images/lip-tint.jpg' }),
  // Boosters
  T('boosters', 'Skin Booster Injection', 'PKR 35,000', 'Deep hydration injected into the skin for plump radiance.'),
  T('boosters', 'Profhilo (PS2)', 'PKR 65,000', 'A premium bio-remodelling treatment for firmer, bouncier skin.', { popular: true }),
  T('boosters', 'Skin Booster + Microneedling', 'PKR 25,000', 'Collagen-stimulating microneedling paired with a hydrating booster.'),
  // Injectables
  T('injectables', 'Botox', 'PKR 25,000', 'Softens expression lines for a refreshed, natural look.', { popular: true }),
  T('injectables', 'Fillers', 'On consultation', 'Restore volume and contour, planned around your features.'),
  T('injectables', 'Sculptra', 'On consultation', 'Gradual collagen stimulation for natural volume.'),
  T('injectables', 'PLLA', 'On consultation', 'Poly-L-lactic acid for long-term skin structure support.'),
  T('injectables', 'Threads', 'On consultation', 'A lifting treatment for subtle definition without surgery.'),
  // Body
  T('body', 'Slimming Drip', 'PKR 10,000', 'A wellness drip designed to support your body goals.'),
  T('body', 'Fat Dissolving', 'Per ml PKR 2,000', 'Targeted injections for stubborn pockets of fat.'),
  // IV
  T('iv', 'Whitening Injection', 'PKR 10,000', 'An antioxidant-rich injection for a brighter-looking complexion.'),
  T('iv', 'Glow Drip', 'PKR 7,000', 'Vitamins and hydration for skin that glows from within.', { popular: true }),
  T('iv', 'NAD+', 'PKR 12,000', 'A cellular-energy drip for vitality and wellbeing.'),
  T('iv', 'Immune Booster', 'PKR 6,000', 'A vitamin infusion to support your immune system.'),
  // Bundles
  T('bundles', 'Face Perfection', 'PKR 7,500', 'Full Face Laser + Carbon Laser Facial', { bundle: true, image: '/images/face-perfection.jpg' }),
  T('bundles', 'Silky Confidence', 'PKR 6,500', 'Underarms Laser + Glow Drip', { bundle: true, image: '/images/underarms-laser.jpg' }),
  T('bundles', 'Legs to Love', 'PKR 8,500', 'Half Legs Laser + Carbon Laser Facial', { bundle: true, image: '/images/laser-hair.jpg' }),
  T('bundles', 'Total Smooth', 'PKR 22,000', 'Full Body Laser + Hydra Facial', { bundle: true, image: '/images/laser-hair.jpg' }),
  T('bundles', 'Sculpt & Glow', 'PKR 18,000', '1 ml Dermal Filler + complimentary Hydra Facial', { bundle: true, image: '/images/injectables.jpg' }),
  T('bundles', 'Smooth & Glow', 'PKR 25,000', 'Full-Face Botox + complimentary Carbon Laser', { bundle: true, image: '/images/injectables.jpg' }),
  T('bundles', 'Complete Rejuvenation', 'PKR 43,000', 'Full-Face Botox + 1 ml Dermal Filler + complimentary Pico Laser', { bundle: true, image: '/images/bundles.jpg', popular: true }),
  T('bundles', 'Signature Glow', 'PKR 60,000', 'Profhilo + complimentary Hydra Facial', { bundle: true, image: '/images/skin-boosters.jpg' }),
].map((t, i) => ({
  ...t,
  id: `${t.category}-${t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  image: t.image || CATEGORIES.find((c) => c.id === t.category).image,
  index: i,
}))

export const categoryName = (id) => CATEGORIES.find((c) => c.id === id)?.name ?? ''
