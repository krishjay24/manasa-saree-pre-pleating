import { Info } from 'lucide-react'
import { pricesConfirmed } from '../../data/business'
import { formatPrice } from '../../utils/format'
import styles from './Price.module.css'

interface PriceProps {
  amount: number
  suffix?: string
  className?: string
}

export function Price({ amount, suffix, className }: PriceProps) {
  return (
    <span className={[styles.price, className].filter(Boolean).join(' ')}>
      {formatPrice(amount)}
      {suffix && <span className={styles.suffix}> {suffix}</span>}
    </span>
  )
}

/** Shown while the client has not yet approved the draft price list. */
export function PriceNotice({ className }: { className?: string }) {
  if (pricesConfirmed) return null
  return (
    <p className={[styles.notice, className].filter(Boolean).join(' ')}>
      <Info size={16} aria-hidden="true" />
      <span>Prices are indicative and subject to confirmation. Final price is shared on WhatsApp before booking.</span>
    </p>
  )
}
