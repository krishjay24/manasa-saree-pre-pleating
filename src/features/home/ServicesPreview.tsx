import { ArrowRight } from 'lucide-react'
import { routes } from '../../app/routes'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { services } from '../../data/business'
import { ServiceCard } from '../services/ServiceCard'
import styles from './ServicesPreview.module.css'

export function ServicesPreview() {
  return (
    <section className={styles.section} aria-labelledby="services-preview-title">
      <Container>
        <SectionHeading
          id="services-preview-title"
          eyebrow="Our Services"
          title={
            <>
              Care for every saree, <em>every occasion</em>
            </>
          }
          description="From everyday cotton to heirloom Kanjeevaram — choose the preparation your saree needs."
        />
        <ul className={styles.grid}>
          {services.slice(0, 3).map((service, index) => (
            <li key={service.id}>
              <ServiceCard service={service} index={index} priority={index < 3} />
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <Button to={routes.services.path} variant="outline" iconEnd={<ArrowRight size={16} aria-hidden="true" />}>
            View All Services &amp; Prices
          </Button>
        </div>
      </Container>
    </section>
  )
}
