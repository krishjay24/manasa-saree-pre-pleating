import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routes } from '../../app/routes'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { media } from '../../data/media'
import type { Service } from '../../types/business'
import { Price } from './Price'
import styles from './ServiceCard.module.css'

interface ServiceCardProps {
  service: Service
  index: number
  priority?: boolean
}

export function ServiceCard({ service, index, priority = false }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <Link to={routes.services.path} className={styles.link}>
        <div className={styles.media}>
          <ResponsiveImage
            image={media[service.imageId]}
            sizes="(min-width: 1100px) 230px, (min-width: 700px) 30vw, (min-width: 480px) 45vw, 90vw"
            priority={priority}
            className={styles.image}
          />
          <span className={styles.index} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className={styles.body}>
          <p className={styles.local}>{service.localName}</p>
          <h3 className={styles.title}>{service.name}</h3>
          <p className={styles.summary}>{service.summary}</p>
          <div className={styles.footer}>
            <Price amount={service.price} />
            <ArrowRight size={18} aria-hidden="true" className={styles.arrow} />
          </div>
        </div>
      </Link>
    </article>
  )
}
