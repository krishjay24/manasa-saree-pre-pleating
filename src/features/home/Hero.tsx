import { ArrowRight, MapPin, Truck } from 'lucide-react'
import { routes } from '../../app/routes'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { WhatsAppButton } from '../../components/ui/WhatsAppButton'
import { business } from '../../data/business'
import { media } from '../../data/media'
import { buildGeneralEnquiryMessage } from '../booking/whatsappMessage'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className="eyebrow">{business.tagline}</p>
          <h1 id="hero-title" className={styles.title}>
            Perfect Pleats. <em>Effortless</em> Elegance.
          </h1>
          <p className={styles.lead}>
            Saree pre-pleating, box folding and bridal saree preparation in {business.location.short}. Your saree arrives
            neatly pleated and pressed — ready to drape in minutes, for the office, a festival or your wedding day.
          </p>
          <div className={styles.actions}>
            <WhatsAppButton size="lg" message={buildGeneralEnquiryMessage()} />
            <Button to={routes.services.path} variant="outline" size="lg" iconEnd={<ArrowRight size={18} aria-hidden="true" />}>
              Explore Services
            </Button>
          </div>
          <ul className={styles.facts}>
            <li>
              <strong>5</strong>
              <span>Saree services</span>
            </li>
            <li>
              <strong>24–48 hrs</strong>
              <span>Usual ready time</span>
            </li>
            <li>
              <strong>6 hrs</strong>
              <span>Express in Kovur</span>
            </li>
          </ul>
        </div>

        <div className={styles.visual}>
          <div className={styles.frame}>
            <ResponsiveImage
              image={media['hero-cream-silk']}
              sizes="(min-width: 1200px) 480px, (min-width: 900px) 40vw, (min-width: 600px) 60vw, 88vw"
              priority
              className={styles.image}
            />
          </div>
          <div className={`${styles.badge} ${styles.badgeTop}`}>
            <MapPin size={16} aria-hidden="true" />
            <span>{business.location.short}</span>
          </div>
          <div className={`${styles.badge} ${styles.badgeBottom}`}>
            <Truck size={16} aria-hidden="true" />
            <span>Pickup &amp; drop available</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
