import { Minus, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { WhatsAppButton } from '../../components/ui/WhatsAppButton'
import { services } from '../../data/business'
import type { ServiceId } from '../../types/business'
import { formatPrice } from '../../utils/format'
import {
  buildPriceEstimateMessage,
  calculatePriceEstimate,
  clampEstimateQuantity,
  ESTIMATE_DEFAULT_QUANTITY,
  ESTIMATE_MAX_QUANTITY,
  ESTIMATE_MIN_QUANTITY,
} from './priceEstimate'
import styles from './PriceEstimator.module.css'

export function PriceEstimator() {
  const [serviceId, setServiceId] = useState<ServiceId>(services[0].id)
  const [quantity, setQuantity] = useState(ESTIMATE_DEFAULT_QUANTITY)

  const service = services.find((item) => item.id === serviceId) ?? services[0]
  const estimate = useMemo(() => calculatePriceEstimate(service, quantity), [service, quantity])
  const message = useMemo(() => buildPriceEstimateMessage(estimate), [estimate])

  const setClampedQuantity = (value: number) => {
    setQuantity(clampEstimateQuantity(value))
  }

  return (
    <section className={styles.section} aria-labelledby="price-estimator-title">
      <div className={styles.card}>
        <header className={styles.head}>
          <p className="eyebrow">Instant estimate</p>
          <h2 id="price-estimator-title" className={styles.title}>
            Estimate Your Saree Service Cost
          </h2>
          <p className={styles.intro}>Choose your service and the number of sarees to get an instant estimated price.</p>
        </header>

        <div className={styles.body}>
          <div className={styles.controls}>
            <div className={styles.field}>
              <label htmlFor="estimate-service" className={styles.label}>
                Service
              </label>
              <select
                id="estimate-service"
                className={styles.select}
                value={service.id}
                onChange={(event) => setServiceId(event.target.value as ServiceId)}
              >
                {services.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} — {formatPrice(item.price)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <span className={styles.label} id="estimate-quantity-label">
                Number of sarees
              </span>
              <div className={styles.stepper} role="group" aria-labelledby="estimate-quantity-label">
                <button
                  type="button"
                  className={styles.step}
                  onClick={() => setClampedQuantity(quantity - 1)}
                  disabled={quantity <= ESTIMATE_MIN_QUANTITY}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} aria-hidden="true" />
                </button>
                <input
                  className={styles.quantity}
                  type="number"
                  inputMode="numeric"
                  min={ESTIMATE_MIN_QUANTITY}
                  max={ESTIMATE_MAX_QUANTITY}
                  step={1}
                  value={quantity}
                  aria-label="Saree quantity"
                  onChange={(event) => {
                    const next = Number(event.target.value)
                    if (event.target.value === '') return
                    setClampedQuantity(next)
                  }}
                  onBlur={(event) => {
                    if (event.target.value === '') setClampedQuantity(ESTIMATE_DEFAULT_QUANTITY)
                  }}
                />
                <button
                  type="button"
                  className={styles.step}
                  onClick={() => setClampedQuantity(quantity + 1)}
                  disabled={quantity >= ESTIMATE_MAX_QUANTITY}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} aria-hidden="true" />
                </button>
              </div>
              <p className={styles.hint}>
                {ESTIMATE_MIN_QUANTITY}–{ESTIMATE_MAX_QUANTITY} sarees
              </p>
            </div>
          </div>

          <div className={styles.summary} aria-live="polite">
            <dl className={styles.breakdown}>
              <div>
                <dt>Selected Service</dt>
                <dd>{estimate.serviceName}</dd>
              </div>
              <div>
                <dt>Unit Price</dt>
                <dd>{formatPrice(estimate.unitPrice)}</dd>
              </div>
              <div>
                <dt>Quantity</dt>
                <dd>{estimate.quantity}</dd>
              </div>
              <div>
                <dt>Subtotal</dt>
                <dd>{formatPrice(estimate.subtotal)}</dd>
              </div>
            </dl>
            <p className={styles.total}>
              <span>Estimated Total</span>
              <strong>{formatPrice(estimate.total)}</strong>
            </p>
            <WhatsAppButton label="Get Quote on WhatsApp" message={message} size="lg" fullWidth />
            <p className={styles.disclaimer}>
              Estimated price only. Final pricing, discounts and additional charges will be confirmed by Manasa.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
