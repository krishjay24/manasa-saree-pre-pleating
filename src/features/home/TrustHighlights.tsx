import { Clock, HandHeart, ShieldCheck, Sparkles } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { pickup } from '../../data/business'
import styles from './TrustHighlights.module.css'

const items = [
  { icon: Sparkles, title: 'Professional', text: 'Even, photo-ready pleats on every saree' },
  { icon: ShieldCheck, title: 'Hygienic', text: 'Steam-ironed and packed in a clean cover' },
  { icon: Clock, title: 'On-Time', text: 'Ready before your function, as promised' },
  { icon: HandHeart, title: 'Doorstep Pickup', text: `Free within ${pickup.freeRadiusKm} km in Kovur` },
]

export function TrustHighlights() {
  return (
    <section className={styles.section} aria-labelledby="trust-title">
      <Container>
        <h2 id="trust-title" className="visually-hidden">
          Our promise
        </h2>
        <ul className={styles.list}>
          {items.map(({ icon: Icon, title, text }) => (
            <li key={title} className={styles.item}>
              <span className={styles.icon}>
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.text}>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
