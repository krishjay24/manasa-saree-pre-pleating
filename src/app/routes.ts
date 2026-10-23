export interface RouteMeta {
  path: string
  label: string
  title: string
  description: string
  /** Excluded from sitemap / indexing */
  noindex?: boolean
}

export const routes = {
  home: {
    path: '/',
    label: 'Home',
    title: 'Saree Pre-Pleating in Kovur, Nellore | Manasa Saree Pre-Pleating',
    description:
      'Manasa Saree Pre-Pleating in Kovur, Nellore offers neat saree pre-pleating, bridal saree preparation, ready-to-wear sarees and ironing. Book on WhatsApp.',
  },
  services: {
    path: '/services',
    label: 'Services',
    title: 'Services & Pricing | Manasa Saree Pre-Pleating, Kovur',
    description:
      'Saree pre-pleating, bridal special, ready-to-wear saree stitching, ironing & packing and express delivery in Kovur and Nellore.',
  },
  gallery: {
    path: '/gallery',
    label: 'Gallery',
    title: 'Our Work | Saree Pre-Pleating Gallery – Manasa, Kovur',
    description:
      'See pre-pleated and bridal sarees prepared by Manasa Saree Pre-Pleating in Kovur, Nellore District.',
  },
  about: {
    path: '/about',
    label: 'About',
    title: 'About & Saree Care | Manasa Saree Pre-Pleating',
    description:
      'Learn how Manasa prepares every saree with care in Kovur, Nellore — our process, why pre-pleating helps and how to care for your pre-pleated saree.',
  },
  contact: {
    path: '/contact',
    label: 'Contact',
    title: 'Contact & Booking | Manasa Saree Pre-Pleating, Kovur',
    description:
      'Book saree pre-pleating in Kovur, Nellore. Send your booking enquiry on WhatsApp, view working hours and pickup details.',
  },
  privacy: {
    path: '/privacy-policy',
    label: 'Privacy Policy',
    title: 'Privacy Policy | Manasa Saree Pre-Pleating',
    description: 'How the Manasa Saree Pre-Pleating website handles the information you enter in the booking enquiry form.',
  },
  terms: {
    path: '/terms',
    label: 'Booking Terms',
    title: 'Terms & Booking Policy | Manasa Saree Pre-Pleating',
    description:
      'Booking advance, cancellation, turnaround, pickup and saree handling policies for Manasa Saree Pre-Pleating.',
  },
  notFound: {
    path: '*',
    label: 'Not Found',
    title: 'Page Not Found | Manasa Saree Pre-Pleating',
    description: 'The page you are looking for could not be found.',
    noindex: true,
  },
} as const satisfies Record<string, RouteMeta>

export type RouteKey = keyof typeof routes

export const indexableRoutes: RouteMeta[] = Object.values(routes).filter(
  (route: RouteMeta) => !route.noindex,
)
