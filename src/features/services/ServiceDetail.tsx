import { Clock, Shirt } from 'lucide-react'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { WhatsAppButton } from '../../components/ui/WhatsAppButton'
import { media } from '../../data/media'
import type { Service } from '../../types/business'
import { buildServiceEnquiryMessage } from '../booking/whatsappMessage'
import { Price } from './Price'
import styles from './ServiceDetail.module.css'

interface ServiceDetailProps {
  service: Service
  index: number
}

export function ServiceDetail({ service, index }: ServiceDetailProps) {
  const headingId = `${service.id}-title`
  return (
    <article id={service.id} className={`${styles.service} ${index % 2 ? styles.reverse : ''}`} aria-labelledby={headingId}>
      <div className={styles.media}>
        <ResponsiveImage
          image={media[service.imageId]}
          sizes="(min-width: 900px) 440px, (min-width: 600px) 70vw, 90vw"
          priority={index === 0}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.index} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </p>
        <p className={styles.local}>{service.localName}</p>
        <h2 id={headingId} className={styles.title}>
          {service.name}
        </h2>
        <p className={styles.description}>{service.description}</p>

        <dl className={styles.details}>
          <div>
            <dt>
              <Shirt size={16} aria-hidden="true" /> Best for
            </dt>
            <dd>{service.fabrics}</dd>
          </div>
          {service.turnaround && (
            <div>
              <dt>
                <Clock size={16} aria-hidden="true" /> Turnaround
              </dt>
              <dd>{service.turnaround}</dd>
            </div>
          )}
        </dl>

        <ul className={styles.occasions} aria-label="Suitable occasions">
          {service.occasions.map((occasion) => (
            <li key={occasion}>{occasion}</li>
          ))}
        </ul>

        <div className={styles.footer}>
          <div>
            <span className={styles.priceLabel}>Price</span>
            <Price amount={service.price} />
          </div>
          <WhatsAppButton
            label="Enquire on WhatsApp"
            message={buildServiceEnquiryMessage(service.name)}
            variant="outline"
          />
        </div>
      </div>
    </article>
  )
}
