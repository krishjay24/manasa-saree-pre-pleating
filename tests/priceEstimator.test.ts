import { describe, expect, it } from 'vitest'
import { services } from '../src/data/business'
import {
  buildPriceEstimateMessage,
  calculatePriceEstimate,
  clampEstimateQuantity,
  ESTIMATE_DEFAULT_QUANTITY,
  ESTIMATE_MAX_QUANTITY,
  ESTIMATE_MIN_QUANTITY,
} from '../src/features/services/priceEstimate'
import { whatsAppLink } from '../src/features/booking/contactLinks'
import { formatPrice } from '../src/utils/format'

const byName = Object.fromEntries(services.map((service) => [service.name, service]))

describe('service prices used by the estimator', () => {
  it('reads the configured unit prices for all five services', () => {
    expect(byName['Regular Pre-Pleating']?.price).toBe(250)
    expect(byName['Box Folding']?.price).toBe(150)
    expect(byName['Bridal Special']?.price).toBe(400)
    expect(byName['Ready-to-Wear Saree']?.price).toBe(500)
    expect(byName['Ironing & Packing']?.price).toBe(100)
  })
})

describe('clampEstimateQuantity', () => {
  it('defaults to 1 and stays within 1–30', () => {
    expect(ESTIMATE_MIN_QUANTITY).toBe(1)
    expect(ESTIMATE_MAX_QUANTITY).toBe(30)
    expect(ESTIMATE_DEFAULT_QUANTITY).toBe(1)
    expect(clampEstimateQuantity(0)).toBe(1)
    expect(clampEstimateQuantity(-4)).toBe(1)
    expect(clampEstimateQuantity(31)).toBe(30)
    expect(clampEstimateQuantity(2.9)).toBe(2)
    expect(clampEstimateQuantity(Number.NaN)).toBe(1)
  })
})

describe('calculatePriceEstimate', () => {
  it('multiplies the selected service price by quantity', () => {
    const bridal = byName['Bridal Special']
    const estimate = calculatePriceEstimate(bridal, 3)
    expect(estimate.serviceName).toBe('Bridal Special')
    expect(estimate.unitPrice).toBe(400)
    expect(estimate.quantity).toBe(3)
    expect(estimate.subtotal).toBe(1200)
    expect(estimate.total).toBe(estimate.subtotal)
  })

  it('updates the total when the service changes', () => {
    expect(calculatePriceEstimate(byName['Box Folding'], 2).total).toBe(300)
    expect(calculatePriceEstimate(byName['Ready-to-Wear Saree'], 2).total).toBe(1000)
  })

  it('does not apply unconfirmed bulk discounts', () => {
    expect(calculatePriceEstimate(byName['Regular Pre-Pleating'], 3).total).toBe(750)
  })
})

describe('buildPriceEstimateMessage', () => {
  it('includes formatted INR amounts and calculated totals', () => {
    const estimate = calculatePriceEstimate(byName['Ironing & Packing'], 4)
    const message = buildPriceEstimateMessage(estimate)
    expect(message).toBe(
      [
        'Hi Manasa 👋',
        '',
        'I found you through your website and would like to get a quotation for your saree pre-pleating services.',
        '',
        '*Price Estimate Details*',
        '',
        'Service: Ironing & Packing',
        `Price Per Saree: ${formatPrice(100)}`,
        'Number of Sarees: 4',
        `Estimated Total: ${formatPrice(400)}`,
        '',
        'Please confirm the final price, availability and booking details.',
        '',
        'Thank you!',
      ].join('\n'),
    )
  })

  it('builds a wa.me link for the configured testing number', () => {
    const estimate = calculatePriceEstimate(byName['Regular Pre-Pleating'], 1)
    const url = whatsAppLink(buildPriceEstimateMessage(estimate))
    expect(url).toMatch(/^https:\/\/wa\.me\/917993930802\?text=/)
    expect(url).toContain(encodeURIComponent('Estimated Total: ₹250'))
  })
})
