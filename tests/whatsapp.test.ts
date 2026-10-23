import { afterEach, describe, expect, it, vi } from 'vitest'
import { business } from '../src/data/business'
import { whatsAppLink } from '../src/features/booking/contactLinks'
import {
  buildGeneralEnquiryMessage,
  buildServiceEnquiryMessage,
  buildWhatsAppUrl,
  formatIndianPhone,
  getConfiguredWhatsAppNumber,
  normalizeIndianMobile,
  openWhatsApp,
} from '../src/utils/whatsapp'

describe('normalizeIndianMobile', () => {
  it.each([
    ['9876543210', '919876543210'],
    ['+91 98765 43210', '919876543210'],
    ['91-98765-43210', '919876543210'],
    ['09876543210', '919876543210'],
    ['6123456789', '916123456789'],
    ['919515109420', '919515109420'],
  ])('normalises %s', (input, expected) => {
    expect(normalizeIndianMobile(input)).toBe(expected)
  })

  it.each(['', '12345', '5876543210', '+91 9XXXX XXXXX', '98765432101', '+1 415 555 0100'])(
    'rejects %s',
    (input) => {
      expect(normalizeIndianMobile(input)).toBeNull()
    },
  )

  it('handles null and undefined', () => {
    expect(normalizeIndianMobile(null)).toBeNull()
    expect(normalizeIndianMobile(undefined)).toBeNull()
  })
})

describe('buildWhatsAppUrl', () => {
  it('returns null when the business number is missing or invalid', () => {
    expect(buildWhatsAppUrl(null, 'Hi')).toBeNull()
    expect(buildWhatsAppUrl('+91 9XXXX XXXXX', 'Hi')).toBeNull()
  })

  it('builds a wa.me link with an encoded message', () => {
    const url = buildWhatsAppUrl('9876543210', 'Hi & hello\nLine 2')
    expect(url).toBe('https://wa.me/919876543210?text=Hi%20%26%20hello%0ALine%202')
  })

  it('omits the text parameter when no message is given', () => {
    expect(buildWhatsAppUrl('9876543210')).toBe('https://wa.me/919876543210')
  })
})

describe('formatIndianPhone', () => {
  it('formats for display', () => {
    expect(formatIndianPhone('919876543210')).toBe('+91 98765 43210')
    expect(formatIndianPhone(null)).toBeNull()
  })
})

describe('configured business WhatsApp', () => {
  it('uses the single configured testing number', () => {
    expect(business.contact.whatsappNumber).toBe('919515109420')
    expect(getConfiguredWhatsAppNumber()).toBe('919515109420')
    expect(whatsAppLink()).toBe('https://wa.me/919515109420')
    expect(whatsAppLink(buildGeneralEnquiryMessage())).toContain('https://wa.me/919515109420?text=')
  })
})

describe('enquiry messages', () => {
  it('builds the general enquiry copy', () => {
    expect(buildGeneralEnquiryMessage()).toBe(
      [
        'Hi Manasa 👋',
        '',
        'I found you through your website and would like to know more about your saree pre-pleating services.',
        '',
        'Could you please share the available services, pricing and booking details?',
        '',
        'Thank you!',
      ].join('\n'),
    )
  })

  it('builds a service-specific enquiry', () => {
    expect(buildServiceEnquiryMessage('Bridal Special')).toContain('Bridal Special')
    expect(buildServiceEnquiryMessage()).toBe(buildGeneralEnquiryMessage())
  })
})

describe('openWhatsApp', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('opens the configured chat from a user action', () => {
    const open = vi.fn()
    vi.stubGlobal('window', { open })
    const url = openWhatsApp(buildGeneralEnquiryMessage())
    expect(url).toBe(whatsAppLink(buildGeneralEnquiryMessage()))
    expect(open).toHaveBeenCalledWith(url, '_blank', 'noopener,noreferrer')
  })

  it('does not open a window when the number is invalid', () => {
    const open = vi.fn()
    vi.stubGlobal('window', { open })
    expect(openWhatsApp('Hi', 'not-a-number')).toBeNull()
    expect(open).not.toHaveBeenCalled()
  })
})
