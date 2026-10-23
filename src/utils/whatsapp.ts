import { business } from '../data/business'

export interface BookingEnquiryPayload {
  customerName: string
  contactNumber: string
  event?: string
  service: string
  quantity: string | number
  date: string
  time?: string
  location?: string
  fabricType: string
  additionalRequirements?: string
}

/**
 * Normalises an Indian mobile number to WhatsApp's international format (91XXXXXXXXXX).
 * Returns null when the number is not a valid 10-digit Indian mobile.
 */
export function normalizeIndianMobile(raw: string | null | undefined): string | null {
  if (!raw) return null
  let digits = raw.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return /^[6-9]\d{9}$/.test(digits) ? `91${digits}` : null
}

/** Reads and validates the business WhatsApp number from configuration. */
export function getConfiguredWhatsAppNumber(): string | null {
  return normalizeIndianMobile(business.contact.whatsappNumber)
}

export function buildWhatsAppUrl(phone: string | null | undefined, message?: string): string | null {
  const normalized = normalizeIndianMobile(phone)
  if (!normalized) return null
  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${normalized}${query}`
}

export function formatIndianPhone(phone: string | null | undefined): string | null {
  const normalized = normalizeIndianMobile(phone)
  if (!normalized) return null
  const local = normalized.slice(2)
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`
}

export function formatEnquiryDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  if (!y || !m || !d) return isoDate
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatEnquiryTime(hhmm: string): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim())
  if (!match) return hhmm.trim()
  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (hours > 23 || minutes > 59) return hhmm.trim()
  return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function buildGeneralEnquiryMessage(): string {
  return [
    'Hi Manasa 👋',
    '',
    'I found you through your website and would like to know more about your saree pre-pleating services.',
    '',
    'Could you please share the available services, pricing and booking details?',
    '',
    'Thank you!',
  ].join('\n')
}

export function buildServiceEnquiryMessage(serviceName?: string): string {
  if (!serviceName) return buildGeneralEnquiryMessage()
  return [
    'Hi Manasa 👋',
    '',
    `I found you through your website and would like to know more about ${serviceName}.`,
    '',
    'Could you please share availability, pricing and booking details?',
    '',
    'Thank you!',
  ].join('\n')
}

function optionalLine(label: string, value: string | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? `${label}: ${trimmed}` : null
}

export function buildBookingEnquiryMessage(payload: BookingEnquiryPayload): string {
  const lines = [
    'Hi Manasa 👋',
    '',
    'I found you through your website and would like to enquire about your saree pre-pleating services.',
    '',
    '*Booking Enquiry*',
    '',
    `Name: ${payload.customerName.trim()}`,
    `Contact Number: ${payload.contactNumber.trim()}`,
    optionalLine('Event', payload.event),
    `Service Required: ${payload.service.trim()}`,
    `Saree Quantity: ${payload.quantity}`,
    `Preferred Date: ${payload.date.trim()}`,
    optionalLine('Preferred Time', payload.time),
    optionalLine('Location', payload.location),
    `Fabric Type: ${payload.fabricType.trim()}`,
    optionalLine('Additional Requirements', payload.additionalRequirements),
    '',
    'Please confirm availability, pricing and the booking process.',
    '',
    'Thank you!',
  ]
  return lines.filter((line): line is string => line !== null).join('\n')
}

/** Opens WhatsApp in a new tab. Call only from a user gesture. Returns the URL, or null if the number is invalid. */
export function openWhatsApp(message?: string, phone?: string | null): string | null {
  const url = buildWhatsAppUrl(phone ?? getConfiguredWhatsAppNumber(), message)
  if (!url) return null
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  return url
}
