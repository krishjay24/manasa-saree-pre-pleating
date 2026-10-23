import { Link } from 'react-router-dom'
import { routes } from '../app/routes'
import { PageSEO } from '../components/seo/PageSEO'
import { Container } from '../components/ui/Container'
import { PageHeader } from '../components/ui/PageHeader'
import { business, careInstructions, expressDelivery, policies, pricesConfirmed } from '../data/business'
import styles from './LegalPage.module.css'

export default function TermsPage() {
  return (
    <>
      <PageSEO route={routes.terms} />
      <PageHeader
        eyebrow="Terms & Booking Policy"
        title={
          <>
            Booking <em>terms</em>
          </>
        }
        description="Simple, clear policies so you know exactly what to expect when you book with us."
      />

      <section className={styles.section}>
        <Container size="narrow" className={styles.content}>
          <div className={styles.block}>
            <h2>Key policies</h2>
            <ol className={styles.policyGrid}>
              {policies.map((policy, index) => (
                <li key={policy.title} className={styles.policy}>
                  <span className={styles.policyNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3>{policy.title}</h3>
                    <p>{policy.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.block}>
            <h2>How a booking is confirmed</h2>
            <p>
              Sending an enquiry through this website opens WhatsApp with your details filled in. This is an enquiry only —
              it is <strong>not</strong> a confirmed booking. Your booking is confirmed once we reply to agree the slot and
              the 50% advance is received via {business.paymentMethods.join(' or ')}. No payments are taken on this website.
            </p>
          </div>

          <div className={styles.block}>
            <h2>Prices</h2>
            <p>
              Prices are as listed on our <Link to={routes.services.path}>Services page</Link>.{' '}
              {expressDelivery.name} is charged at {expressDelivery.priceLabel} and is available in{' '}
              {expressDelivery.availability.replace(' only', '')} only. Pickup beyond the free radius is charged per km.
            </p>
            {!pricesConfirmed && (
              <p>Prices shown on the website are indicative. The final price is confirmed on WhatsApp before booking.</p>
            )}
          </div>

          <div className={styles.block}>
            <h2>After delivery</h2>
            <p>To keep the pleats intact, please follow our care guidance:</p>
            <ul>
              {careInstructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <h2>Questions</h2>
            <p>
              If anything is unclear, message us before booking — see our <Link to={routes.contact.path}>Contact page</Link>{' '}
              or Instagram{' '}
              <a href={business.contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                @{business.contact.instagramHandle}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
