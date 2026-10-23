import { business } from '../../data/business'
import {
  buildWhatsAppUrl,
  formatIndianPhone,
  getConfiguredWhatsAppNumber,
} from '../../utils/whatsapp'

export const configuredWhatsAppNumber = getConfiguredWhatsAppNumber()

export const isWhatsAppConfigured = configuredWhatsAppNumber !== null

export function whatsAppLink(message?: string): string | null {
  return buildWhatsAppUrl(configuredWhatsAppNumber, message)
}

export const telLink = configuredWhatsAppNumber ? `tel:+${configuredWhatsAppNumber}` : null

export const displayPhone = formatIndianPhone(configuredWhatsAppNumber)

export const instagramDmUrl = `https://ig.me/m/${business.contact.instagramHandle}`

const mapsQuery = encodeURIComponent(business.location.full)

export const mapsDirectionsUrl =
  business.location.mapsUrl ?? `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&z=14&output=embed`
