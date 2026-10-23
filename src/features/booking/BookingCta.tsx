import { CalendarCheck, Clock, MapPin } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Ornament } from '../../components/ui/Ornament'
import { WhatsAppButton } from '../../components/ui/WhatsAppButton'
import { business } from '../../data/business'
import { bookingPath } from '../../data/navigation'
import styles from './BookingCta.module.css'
import { buildGeneralEnquiryMessage } from './whatsappMessage'

interface BookingCtaProps {
  title?: string
  description?: string
  /** Hide the "booking form" link when already on the contact page. */
  showFormLink?: boolean
}

export function BookingCta({
  title = 'Ready for perfect pleats?',
  description = 'Send us a photo of your saree and your function date. We will confirm your slot and share the details.',
  showFormLink = true,
}: BookingCtaProps) {
  return (
    <section className={styles.section} aria-labelledby="booking-cta-title">
      <Container>
        <div className={styles.panel}>
          <Ornament className={styles.ornament} width={140} />
          <h2 id="booking-cta-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}>
            <WhatsAppButton variant="gold" size="lg" message={buildGeneralEnquiryMessage()} />
            {showFormLink && (
              <Button to={bookingPath} variant="light" size="lg" icon={<CalendarCheck size={18} aria-hidden="true" />}>
                Booking Enquiry Form
              </Button>
            )}
          </div>
          <ul className={styles.meta}>
            <li>
              <Clock size={16} aria-hidden="true" /> {business.hours.summary}
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" /> {business.location.full}
            </li>
          </ul>
        </div>
      </Container>
    </section>
  )
}
