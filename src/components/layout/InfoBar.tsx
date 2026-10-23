import { MapPin } from 'lucide-react'
import { business } from '../../data/business'
import { InstagramIcon } from '../ui/BrandIcons'
import { Container } from '../ui/Container'
import styles from './InfoBar.module.css'

export function InfoBar() {
  return (
    <div className={styles.bar}>
      <Container className={styles.inner}>
        <p className={styles.item}>
          <MapPin size={14} aria-hidden="true" />
          <span>{business.location.full}</span>
        </p>
        <p className={styles.tagline}>{business.values.join(' · ')} saree preparation</p>
        <a
          className={styles.item}
          href={business.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram @${business.contact.instagramHandle} (opens in a new tab)`}
        >
          <InstagramIcon size={14} />
          <span>@{business.contact.instagramHandle}</span>
        </a>
      </Container>
    </div>
  )
}
