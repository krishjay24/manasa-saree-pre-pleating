import type { Service } from '../../types/business'
import {
  buildBookingEnquiryMessage,
  buildGeneralEnquiryMessage,
  buildServiceEnquiryMessage,
  formatEnquiryDate,
  formatEnquiryTime,
} from '../../utils/whatsapp'
import type { BookingFormValues } from './bookingValidation'

export { buildGeneralEnquiryMessage, buildServiceEnquiryMessage }

export function buildBookingMessage(values: BookingFormValues, service: Service | undefined): string {
  const time = values.time.trim()
  return buildBookingEnquiryMessage({
    customerName: values.name,
    contactNumber: values.phone,
    event: values.event,
    service: service ? service.name : values.serviceId,
    quantity: Number(values.quantity),
    date: formatEnquiryDate(values.date),
    time: time ? formatEnquiryTime(time) : undefined,
    location: values.location,
    fabricType: values.fabric,
    additionalRequirements: values.notes,
  })
}
