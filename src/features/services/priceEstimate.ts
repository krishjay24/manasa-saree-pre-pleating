import type { Service } from '../../types/business'
import { formatPrice } from '../../utils/format'

export const ESTIMATE_MIN_QUANTITY = 1
export const ESTIMATE_MAX_QUANTITY = 30
export const ESTIMATE_DEFAULT_QUANTITY = 1

export interface PriceEstimate {
  serviceName: string
  unitPrice: number
  quantity: number
  subtotal: number
  total: number
}

export function clampEstimateQuantity(value: number): number {
  if (!Number.isFinite(value)) return ESTIMATE_DEFAULT_QUANTITY
  const whole = Math.trunc(value)
  return Math.min(ESTIMATE_MAX_QUANTITY, Math.max(ESTIMATE_MIN_QUANTITY, whole))
}

/** Subtotal = service unit price × quantity. Discounts and extras are not applied. */
export function calculatePriceEstimate(service: Service, quantity: number): PriceEstimate {
  const qty = clampEstimateQuantity(quantity)
  const subtotal = service.price * qty
  return {
    serviceName: service.name,
    unitPrice: service.price,
    quantity: qty,
    subtotal,
    total: subtotal,
  }
}

export function buildPriceEstimateMessage(estimate: PriceEstimate): string {
  return [
    'Hi Manasa 👋',
    '',
    'I found you through your website and would like to get a quotation for your saree pre-pleating services.',
    '',
    '*Price Estimate Details*',
    '',
    `Service: ${estimate.serviceName}`,
    `Price Per Saree: ${formatPrice(estimate.unitPrice)}`,
    `Number of Sarees: ${estimate.quantity}`,
    `Estimated Total: ${formatPrice(estimate.total)}`,
    '',
    'Please confirm the final price, availability and booking details.',
    '',
    'Thank you!',
  ].join('\n')
}
