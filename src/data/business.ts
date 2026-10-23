import type { AddOn, FaqItem, Policy, ProcessStep, Service } from '../types/business'

/**
 * Single source of truth for Manasa business information.
 * Source: client business profile (docs/manasa-business-profile.html).
 * Items marked PENDING require client confirmation before launch.
 */

export const business = {
  name: 'Manasa Saree Pre-Pleating',
  shortName: 'Manasa',
  monogram: 'MnS',
  logo: '/images/logo/Manasa_Saree_Pre-Pleating_Logo.png',
  tagline: 'Perfect Pleats, Ready in Minutes',
  values: ['Professional', 'Hygienic', 'On-Time'],
  /** Stated in the client business profile. */
  clientsServed: '500+',
  description:
    'Saree pre-pleating, box folding, bridal saree preparation and ready-to-wear saree stitching in Kovur, Nellore District.',
  location: {
    locality: 'Kovur',
    district: 'Nellore District',
    region: 'Andhra Pradesh',
    regionCode: 'AP',
    country: 'India',
    countryCode: 'IN',
    short: 'Kovur, Nellore',
    full: 'Kovur, Nellore District, Andhra Pradesh',
    /** PENDING: verified Google Maps link / street address not supplied */
    mapsUrl: null as string | null,
  },
  contact: {
    /**
     * Temporary testing WhatsApp number (international, digits only).
     * Replace this one value with the client's number to update every chat link.
     */
    whatsappNumber: '917993930802',
    instagramHandle: 'manasa_saree_pre_pleating',
    instagramUrl: 'https://instagram.com/manasa_saree_pre_pleating',
  },
  hours: {
    summary: 'Mon–Sat: 10 AM – 7 PM · Sunday: Booking only',
    rows: [
      { days: 'Monday – Saturday', time: '10:00 AM – 7:00 PM' },
      { days: 'Sunday', time: 'Bookings only' },
    ],
    schema: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '19:00' }],
  },
  paymentMethods: ['GPay', 'PhonePe'],
} as const

/** Prices taken from the client business profile. */
export const pricesConfirmed = true

/** Combo / bulk wording taken from the client business profile. Not auto-applied in the estimator. */
export const offersConfirmed = true

export const services: Service[] = [
  {
    id: 'regular',
    name: 'Regular Pre-Pleating',
    localName: 'Roju vadetivi',
    summary: 'Daily wear, office, college – 5 perfect pleats stitched',
    description:
      'Your everyday saree, pleated evenly and held in place so you can drape it in a couple of minutes. Ideal for cotton, georgette and daily-wear sarees.',
    price: 250,
    fabrics: 'Cotton, Georgette, Daily wear',
    occasions: ['Office', 'College', 'Festivals', 'Daily wear'],
    turnaround: '24–48 hours',
    imageId: 'service-regular',
  },
  {
    id: 'box-folding',
    name: 'Box Folding',
    localName: 'Box Madi',
    summary: 'Travel-friendly fold, saree shape intact for days',
    description:
      'Pleats and pallu are folded into a neat box shape, so the saree stays crisp in your suitcase or wardrobe until the occasion.',
    price: 150,
    fabrics: 'Travel friendly fold',
    occasions: ['Travel', 'Destination functions', 'Storage before events'],
    turnaround: '24–48 hours',
    imageId: 'service-box',
  },
  {
    id: 'bridal',
    name: 'Bridal Special',
    localName: 'Pelli Special',
    summary: 'Extra care, kanjeevaram & heavy work sarees',
    description:
      'Careful pleating for wedding and heavy silk sarees, with attention to zari borders and embellishments so the drape falls beautifully.',
    price: 400,
    fabrics: 'Pattu, Kanjeevaram, Heavy work',
    occasions: ['Weddings', 'Engagements', 'Receptions', 'Muhurtham'],
    turnaround: '2–3 days',
    imageId: 'service-bridal',
  },
  {
    id: 'ready-to-wear',
    name: 'Ready-to-Wear Saree',
    localName: 'Ready Saree',
    summary: 'Attached to a petticoat with a zip — ready to wear',
    description:
      'The pleated saree is stitched onto a petticoat with a zip closure, so it can be worn quickly without draping skills.',
    price: 500,
    fabrics: 'With petticoat stitching',
    occasions: ['First-time saree wearers', 'Quick changes', 'Functions'],
    imageId: 'service-ready',
  },
  {
    id: 'ironing',
    name: 'Ironing & Packing',
    localName: 'Istri & Packing',
    summary: 'Steam iron + premium cover + tassel care',
    description:
      'Steam ironing to refresh the saree, finished with a protective cover and careful handling of tassels.',
    price: 100,
    fabrics: 'Steam + cover',
    occasions: ['Before any occasion', 'After storage', 'Gifting'],
    imageId: 'service-ironing',
  },
]

export const expressDelivery: AddOn = {
  id: 'express',
  name: 'Express Delivery',
  localName: 'Fast Delivery',
  description: '6-hour delivery in Kovur.',
  price: 100,
  priceLabel: '₹100 extra',
  availability: 'Kovur & Nellore only',
}

export const offers = [
  'Combo offer: 10% off on 3 or more sarees',
  'Bridal bulk bookings: special price — message us for details',
]

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Booking',
    localName: 'Booking',
    description: 'Send a photo of your saree and your function date on WhatsApp or Instagram.',
  },
  {
    step: '02',
    title: 'Pickup / Drop',
    localName: 'Saree Ivvandi',
    description: 'We pick up in Kovur, or you can drop the saree off with us.',
  },
  {
    step: '03',
    title: 'Pre-Pleating',
    localName: 'Pleating Chestam',
    description: 'Perfect pleats to your measurements, finished with a steam iron.',
  },
  {
    step: '04',
    title: 'Delivery',
    localName: 'Ready!',
    description: 'Neatly packed and delivered — or handed back ready to wear.',
  },
]

export const highlights = [
  { title: 'Neat, even pleats', description: 'Neat and equal pleats — photo-ready.' },
  { title: 'Careful handling', description: 'Sarees handled without damage, from pickup to packing.' },
  { title: 'On-time delivery', description: 'On-time delivery — same day possible in Kovur.' },
  { title: 'Affordable & friendly', description: 'Affordable and friendly service.' },
]

export const careInstructions = [
  'Do not pull the pleats or wash the saree — this will disturb the pre-pleating.',
  'Hang ready-to-wear sarees on a hanger; avoid folding them.',
  'After your function, keep the saree in its cover and bring it back — we will refresh the pleats.',
  'Do not spray perfume directly on the saree.',
  'Unsure how to drape? We can guide you over a video call.',
]

export const turnaround = {
  regular: '24–48 hours',
  bridal: '2–3 days',
  express: '6 hours (Kovur / Nellore)',
}

export const pickup = {
  freeRadiusKm: 5,
  ratePerKm: 30,
  summary: 'Free pickup within 5 km; ₹30 per km beyond that.',
}

export const policies: Policy[] = [
  {
    title: 'Advance payment',
    description: 'A 50% advance (GPay / PhonePe) is required to confirm your booking.',
  },
  {
    title: 'No cancellation once work begins',
    description: 'Bookings cannot be cancelled after work on the saree has started.',
  },
  {
    title: 'Saree handling',
    description:
      'Every saree is handled with great care. Old or delicate sarees carry a small risk, and we will inform you before starting.',
  },
  {
    title: 'Turnaround',
    description: `Regular: ${turnaround.regular}. Bridal: ${turnaround.bridal}. Express: ${turnaround.express}.`,
  },
  {
    title: 'Pickup',
    description: pickup.summary,
  },
]

export const faqs: FaqItem[] = [
  {
    question: 'How do I book?',
    answer:
      'Send us a photo of your saree with your function date on WhatsApp or Instagram. A booking is confirmed once the 50% advance is received.',
  },
  {
    question: 'How long does pre-pleating take?',
    answer: `Regular sarees take ${turnaround.regular} and bridal sarees ${turnaround.bridal}. Express delivery in about 6 hours is available in Kovur and Nellore.`,
  },
  {
    question: 'Do you offer pickup?',
    answer: `Yes. ${pickup.summary} You can also drop the saree off with us in Kovur.`,
  },
  {
    question: 'Is it safe for silk and heavy bridal sarees?',
    answer:
      'Yes — Pattu, Kanjeevaram and heavy-work sarees are handled under our Bridal Special service with extra care. For old or delicate sarees we will let you know of any risk before we begin.',
  },
  {
    question: 'Can I cancel a booking?',
    answer: 'Bookings cannot be cancelled once work on the saree has started.',
  },
  {
    question: 'How should I store my pre-pleated saree?',
    answer:
      'Avoid pulling the pleats or washing the saree. Hang ready-to-wear sarees instead of folding them, and keep the saree in its cover after use.',
  },
]
