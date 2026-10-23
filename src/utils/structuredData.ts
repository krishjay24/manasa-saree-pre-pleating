import { absoluteUrl, siteConfig } from '../config/site'
import { business, pricesConfirmed, services } from '../data/business'
import { getConfiguredWhatsAppNumber } from './whatsapp'

/** LocalBusiness JSON-LD built only from verified profile details. */
export function buildLocalBusinessSchema(): Record<string, unknown> {
  const url = absoluteUrl('/')
  const image = absoluteUrl(siteConfig.ogImage)
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    slogan: business.tagline,
    description: business.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.location.locality,
      addressRegion: business.location.region,
      addressCountry: business.location.countryCode,
    },
    areaServed: [business.location.locality, 'Nellore'],
    sameAs: [business.contact.instagramUrl],
    openingHoursSpecification: business.hours.schema.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Saree preparation services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.name, description: service.summary },
        ...(pricesConfirmed ? { price: service.price, priceCurrency: 'INR' } : {}),
      })),
    },
  }
  if (url) schema.url = url
  if (image) schema.image = image
  const logo = absoluteUrl(business.logo)
  if (logo) schema.logo = logo
  const telephone = getConfiguredWhatsAppNumber()
  if (telephone) schema.telephone = `+${telephone}`
  return schema
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
