import { Clock, MapPin, Navigation, Phone, Truck } from 'lucide-react'
import type { ReactNode } from 'react'
import { routes } from '../app/routes'
import { PageSEO } from '../components/seo/PageSEO'
import { InstagramIcon, WhatsAppIcon } from '../components/ui/BrandIcons'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { PageHeader } from '../components/ui/PageHeader'
import { business, pickup, processSteps } from '../data/business'
import { BookingForm } from '../features/booking/BookingForm'
import { displayPhone, mapsDirectionsUrl, mapsEmbedUrl, telLink, whatsAppLink } from '../features/booking/contactLinks'
import { buildGeneralEnquiryMessage } from '../features/booking/whatsappMessage'
import styles from './ContactPage.module.css'

interface ContactItem {
  icon: ReactNode
  label: string
  content: ReactNode
}

export default function ContactPage() {
  const whatsApp = whatsAppLink(buildGeneralEnquiryMessage())
  const items: ContactItem[] = [
    { icon: <MapPin size={20} aria-hidden="true" />, label: 'Location', content: business.location.full },
    {
      icon: <Clock size={20} aria-hidden="true" />,
      label: 'Working hours',
      content: (
        <>
          {business.hours.rows.map((row) => (
            <span key={row.days} className={styles.row}>
              <span>{row.days}</span>
              <span>{row.time}</span>
            </span>
          ))}
        </>
      ),
    },
    {
      icon: <WhatsAppIcon size={20} />,
      label: 'WhatsApp',
      content: whatsApp ? (
        <a href={whatsApp} target="_blank" rel="noopener noreferrer">
          {displayPhone ?? 'Chat on WhatsApp'}
        </a>
      ) : (
        <span className={styles.pending}>Number coming soon</span>
      ),
    },
    {
      icon: <Phone size={20} aria-hidden="true" />,
      label: 'Phone',
      content: telLink ? <a href={telLink}>{displayPhone}</a> : <span className={styles.pending}>Number coming soon</span>,
    },
    {
      icon: <InstagramIcon size={20} />,
      label: 'Instagram',
      content: (
        <a href={business.contact.instagramUrl} target="_blank" rel="noopener noreferrer">
          @{business.contact.instagramHandle}
        </a>
      ),
    },
    { icon: <Truck size={20} aria-hidden="true" />, label: 'Pickup', content: pickup.summary },
  ]

  return (
    <>
      <PageSEO route={routes.contact} />
      <PageHeader
        eyebrow="Contact & Booking"
        title={
          <>
            Let’s get your saree <em>ready</em>
          </>
        }
        description="Send your booking enquiry on WhatsApp, or reach us on Instagram. We will confirm your slot and share the details."
      />

      <section className={styles.section}>
        <Container className={styles.layout}>
          <aside className={styles.info} aria-labelledby="contact-details-title">
            <h2 id="contact-details-title" className={styles.infoTitle}>
              Contact details
            </h2>
            <ul className={styles.items}>
              {items.map((item) => (
                <li key={item.label} className={styles.item}>
                  <span className={styles.icon}>{item.icon}</span>
                  <div>
                    <p className={styles.itemLabel}>{item.label}</p>
                    <div className={styles.itemContent}>{item.content}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.steps}>
              <h2 className={styles.infoTitle}>How booking works</h2>
              <ol>
                {processSteps.map((step) => (
                  <li key={step.step}>
                    <strong>{step.title}:</strong> {step.description}
                  </li>
                ))}
              </ol>
              <p className={styles.note}>A booking is confirmed once the 50% advance (GPay / PhonePe) is received.</p>
            </div>
          </aside>

          <div className={styles.formWrap}>
            <BookingForm />
          </div>
        </Container>
      </section>

      <section className={styles.visit} aria-labelledby="visit-title">
        <Container className={styles.visitInner}>
          <div className={styles.visitCopy}>
            <p className="eyebrow">Find us</p>
            <h2 id="visit-title" className={styles.visitTitle}>
              Visit our studio
            </h2>
            <p className={styles.visitText}>
              Come drop your saree in Kovur, or book a pickup. We are happy to show you how the pleats are prepared.
            </p>
            <p className={styles.visitAddress}>
              <MapPin size={18} aria-hidden="true" />
              <span>{business.location.full}</span>
            </p>
            <Button
              href={mapsDirectionsUrl}
              icon={<Navigation size={16} aria-hidden="true" />}
            >
              Get Directions
            </Button>
          </div>
          <div className={styles.mapFrame}>
            <iframe
              title={`Map of ${business.name} in ${business.location.full}`}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Container>
      </section>
    </>
  )
}
