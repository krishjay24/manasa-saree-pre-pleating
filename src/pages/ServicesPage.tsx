import { ArrowRight, Gift, Truck } from 'lucide-react'
import { routes } from '../app/routes'
import { PageSEO } from '../components/seo/PageSEO'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { PageHeader } from '../components/ui/PageHeader'
import { SectionHeading } from '../components/ui/SectionHeading'
import { offers, offersConfirmed, pickup, services } from '../data/business'
import { BookingCta } from '../features/booking/BookingCta'
import { PriceEstimator } from '../features/services/PriceEstimator'
import { PriceTable } from '../features/services/PriceTable'
import { ServiceDetail } from '../features/services/ServiceDetail'
import styles from './ServicesPage.module.css'

export default function ServicesPage() {
  return (
    <>
      <PageSEO route={routes.services} />
      <PageHeader
        eyebrow="Services & Pricing"
        title={
          <>
            Saree preparation, <em>done with care</em>
          </>
        }
        description="Five services for everyday, festive and bridal sarees — with pickup in Kovur and express delivery when you need it."
      />

      <section className={styles.listSection} aria-label="Services">
        <Container className={styles.list}>
          {services.map((service, index) => (
            <ServiceDetail key={service.id} service={service} index={index} />
          ))}
        </Container>
      </section>

      <section className={styles.priceSection} aria-labelledby="price-list-title">
        <Container size="narrow">
          <SectionHeading id="price-list-title" eyebrow="At a Glance" title={<>Price <em>list</em></>} />
          <PriceTable />
          <PriceEstimator />

          <div className={styles.infoGrid}>
            <div className={styles.info}>
              <Truck size={22} aria-hidden="true" />
              <div>
                <h3>Pickup &amp; drop</h3>
                <p>{pickup.summary} You can also drop your saree off with us.</p>
              </div>
            </div>
            {offersConfirmed && (
              <div className={styles.info}>
                <Gift size={22} aria-hidden="true" />
                <div>
                  <h3>Offers</h3>
                  <ul>
                    {offers.map((offer) => (
                      <li key={offer}>{offer}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <p className={styles.terms}>
            Bookings are confirmed with a 50% advance.{' '}
            <Button to={routes.terms.path} variant="link" iconEnd={<ArrowRight size={14} aria-hidden="true" />}>
              Read booking terms
            </Button>
          </p>
        </Container>
      </section>

      <BookingCta />
    </>
  )
}
