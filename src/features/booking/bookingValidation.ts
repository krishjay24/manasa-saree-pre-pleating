import type { ServiceId } from '../../types/business'
import { normalizeIndianMobile } from '../../utils/whatsapp'

export interface BookingFormValues {
  name: string
  phone: string
  event: string
  serviceId: ServiceId | ''
  quantity: string
  date: string
  time: string
  location: string
  fabric: string
  notes: string
}

export type BookingField = keyof BookingFormValues
export type BookingErrors = Partial<Record<BookingField, string>>

export const emptyBookingForm: BookingFormValues = {
  name: '',
  phone: '',
  event: '',
  serviceId: '',
  quantity: '1',
  date: '',
  time: '',
  location: '',
  fabric: '',
  notes: '',
}

export const fabricOptions = [
  'Cotton',
  'Georgette',
  'Chiffon',
  'Silk / Pattu',
  'Kanjeevaram',
  'Organza',
  'Heavy work / Designer',
  'Not sure',
] as const

export const MAX_QUANTITY = 50
export const MAX_NOTES_LENGTH = 500
export const MAX_EVENT_LENGTH = 80
export const MAX_LOCATION_LENGTH = 120

export function toIsoDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function validateBooking(
  values: BookingFormValues,
  validServiceIds: readonly string[],
  today: Date = new Date(),
): BookingErrors {
  const errors: BookingErrors = {}
  const name = values.name.trim()

  if (!name) errors.name = 'Please enter your name.'
  else if (name.length < 2 || name.length > 60) errors.name = 'Name should be between 2 and 60 characters.'
  else if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(name)) errors.name = 'Name can only contain letters, spaces, dots and hyphens.'

  if (!values.phone.trim()) errors.phone = 'Please enter your contact number.'
  else if (!normalizeIndianMobile(values.phone)) errors.phone = 'Enter a valid 10-digit Indian mobile number.'

  if (!values.serviceId) errors.serviceId = 'Please choose a service.'
  else if (!validServiceIds.includes(values.serviceId)) errors.serviceId = 'Please choose a valid service.'

  const quantity = Number(values.quantity)
  if (!values.quantity.trim()) errors.quantity = 'Please enter the number of sarees.'
  else if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY)
    errors.quantity = `Enter a whole number between 1 and ${MAX_QUANTITY}.`

  if (!values.date) errors.date = 'Please choose your preferred date.'
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || Number.isNaN(Date.parse(values.date)))
    errors.date = 'Please choose a valid date.'
  else if (values.date < toIsoDate(today)) errors.date = 'Preferred date cannot be in the past.'

  if (!values.fabric) errors.fabric = 'Please choose a fabric type (or “Not sure”).'

  const event = values.event.trim()
  if (event && event.length > MAX_EVENT_LENGTH)
    errors.event = `Please keep the event name under ${MAX_EVENT_LENGTH} characters.`

  if (values.time && !/^\d{2}:\d{2}$/.test(values.time)) errors.time = 'Please choose a valid time.'

  const location = values.location.trim()
  if (location && location.length > MAX_LOCATION_LENGTH)
    errors.location = `Please keep the location under ${MAX_LOCATION_LENGTH} characters.`

  if (values.notes.length > MAX_NOTES_LENGTH)
    errors.notes = `Please keep additional requirements under ${MAX_NOTES_LENGTH} characters.`

  return errors
}
