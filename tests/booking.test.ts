import { describe, expect, it } from 'vitest'
import { type BookingFormValues, MAX_NOTES_LENGTH, validateBooking } from '../src/features/booking/bookingValidation'
import { buildBookingMessage } from '../src/features/booking/whatsappMessage'
import type { Service } from '../src/types/business'
import { formatEnquiryDate, formatEnquiryTime } from '../src/utils/whatsapp'

const serviceIds = ['regular', 'bridal', 'ready-to-wear', 'ironing']
const today = new Date(2026, 9, 23)

const valid: BookingFormValues = {
  name: 'Lakshmi Devi',
  phone: '98765 43210',
  event: '',
  serviceId: 'bridal',
  quantity: '2',
  date: '2026-11-05',
  time: '',
  location: '',
  fabric: 'Kanjeevaram',
  notes: '',
}

const bridal: Service = {
  id: 'bridal',
  name: 'Bridal Special',
  localName: 'Pelli Special',
  summary: '',
  description: '',
  price: 400,
  fabrics: '',
  occasions: [],
  imageId: 'service-bridal',
}

describe('validateBooking', () => {
  it('accepts a complete, valid enquiry', () => {
    expect(validateBooking(valid, serviceIds, today)).toEqual({})
  })

  it('requires every mandatory field', () => {
    const errors = validateBooking(
      {
        name: '',
        phone: '',
        event: '',
        serviceId: '',
        quantity: '',
        date: '',
        time: '',
        location: '',
        fabric: '',
        notes: '',
      },
      serviceIds,
      today,
    )
    expect(Object.keys(errors).sort()).toEqual(['date', 'fabric', 'name', 'phone', 'quantity', 'serviceId'])
  })

  it('rejects invalid names', () => {
    expect(validateBooking({ ...valid, name: 'A' }, serviceIds, today).name).toBeDefined()
    expect(validateBooking({ ...valid, name: 'Lakshmi123' }, serviceIds, today).name).toBeDefined()
    expect(validateBooking({ ...valid, name: 'Sri. K. Anitha' }, serviceIds, today).name).toBeUndefined()
  })

  it('rejects invalid phone numbers', () => {
    expect(validateBooking({ ...valid, phone: '12345' }, serviceIds, today).phone).toBeDefined()
    expect(validateBooking({ ...valid, phone: '5876543210' }, serviceIds, today).phone).toBeDefined()
    expect(validateBooking({ ...valid, phone: '+91 98765 43210' }, serviceIds, today).phone).toBeUndefined()
  })

  it('rejects unknown services', () => {
    const values = { ...valid, serviceId: 'massage' as BookingFormValues['serviceId'] }
    expect(validateBooking(values, serviceIds, today).serviceId).toBeDefined()
  })

  it.each(['0', '-1', '1.5', 'abc', '51'])('rejects quantity %s', (quantity) => {
    expect(validateBooking({ ...valid, quantity }, serviceIds, today).quantity).toBeDefined()
  })

  it('rejects past dates but allows today', () => {
    expect(validateBooking({ ...valid, date: '2026-10-22' }, serviceIds, today).date).toBeDefined()
    expect(validateBooking({ ...valid, date: '2026-10-23' }, serviceIds, today).date).toBeUndefined()
    expect(validateBooking({ ...valid, date: '23/10/2026' }, serviceIds, today).date).toBeDefined()
  })

  it('limits additional requirements length', () => {
    const notes = 'x'.repeat(MAX_NOTES_LENGTH + 1)
    expect(validateBooking({ ...valid, notes }, serviceIds, today).notes).toBeDefined()
  })
})

describe('buildBookingMessage', () => {
  it('formats all fields into a readable WhatsApp message', () => {
    const message = buildBookingMessage(
      {
        ...valid,
        event: 'Wedding',
        time: '16:30',
        location: 'Kovur',
        notes: '  Need it before Muhurtham  ',
      },
      bridal,
    )
    expect(message).toBe(
      [
        'Hi Manasa 👋',
        '',
        'I found you through your website and would like to enquire about your saree pre-pleating services.',
        '',
        '*Booking Enquiry*',
        '',
        'Name: Lakshmi Devi',
        'Contact Number: 98765 43210',
        'Event: Wedding',
        'Service Required: Bridal Special',
        'Saree Quantity: 2',
        `Preferred Date: ${formatEnquiryDate('2026-11-05')}`,
        `Preferred Time: ${formatEnquiryTime('16:30')}`,
        'Location: Kovur',
        'Fabric Type: Kanjeevaram',
        'Additional Requirements: Need it before Muhurtham',
        '',
        'Please confirm availability, pricing and the booking process.',
        '',
        'Thank you!',
      ].join('\n'),
    )
  })

  it('omits empty optional fields', () => {
    const message = buildBookingMessage(valid, bridal)
    expect(message).not.toContain('Event:')
    expect(message).not.toContain('Preferred Time:')
    expect(message).not.toContain('Location:')
    expect(message).not.toContain('Additional Requirements')
  })
})
