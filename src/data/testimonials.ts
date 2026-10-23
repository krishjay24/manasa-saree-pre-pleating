export interface Testimonial {
  id: string
  quote: string
  name: string
  place: string
  rating: 5
}

/**
 * Layout samples only. The client profile does not include approved reviews.
 * Do not treat these as verified customer feedback until Manasa confirms them.
 */
export const testimonialsApproved = false

export const testimonials: Testimonial[] = [
  {
    id: 'anitha',
    quote: 'The pleats were even and I draped the saree in minutes. It stayed neat through the function.',
    name: 'Anitha',
    place: 'Kovur',
    rating: 5,
  },
  {
    id: 'srija',
    quote: 'They handled my Kanjeevaram with care. The pallu and borders looked beautiful on the wedding day.',
    name: 'Srija',
    place: 'Nellore',
    rating: 5,
  },
  {
    id: 'kavitha',
    quote: 'The ready-to-wear saree was easy to put on, and the packing kept it crisp until I needed it.',
    name: 'Kavitha',
    place: 'Kovur',
    rating: 5,
  },
]
