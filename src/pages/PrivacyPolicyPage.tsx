import { Link } from 'react-router-dom'
import { routes } from '../app/routes'
import { PageSEO } from '../components/seo/PageSEO'
import { Container } from '../components/ui/Container'
import { PageHeader } from '../components/ui/PageHeader'
import { business } from '../data/business'
import styles from './LegalPage.module.css'

const LAST_UPDATED = '23 October 2026'

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageSEO route={routes.privacy} />
      <PageHeader
        eyebrow="Privacy Policy"
        title={
          <>
            Your <em>privacy</em>
          </>
        }
        description="This page explains what happens to the information you enter on this website."
      />

      <section className={styles.section}>
        <Container size="narrow" className={styles.content}>
          <p className={styles.updated}>Last updated: {LAST_UPDATED}</p>

          <div className={styles.block}>
            <h2>Who we are</h2>
            <p>
              This website belongs to {business.name}, a saree preparation service in {business.location.full}.
            </p>
          </div>

          <div className={styles.block}>
            <h2>The booking enquiry form</h2>
            <p>
              The <Link to={routes.contact.path}>booking enquiry form</Link> asks for your name, contact number, service,
              number of sarees, preferred date, fabric type and any additional requirements.
            </p>
            <ul>
              <li>
                <strong>Nothing is stored or sent by this website.</strong> The form runs entirely in your browser. Your
                details are not saved to any database or sent to our servers.
              </li>
              <li>
                When you press “Continue to WhatsApp”, your details are placed into a WhatsApp message on your device. The
                message is only sent if <strong>you</strong> press Send in WhatsApp.
              </li>
              <li>
                Once sent, the message is delivered to our business WhatsApp and handled under{' '}
                <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                  WhatsApp’s privacy policy
                </a>
                . We use it only to reply to your enquiry and manage your booking.
              </li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>Cookies and tracking</h2>
            <p>This website does not use cookies, analytics or advertising trackers.</p>
          </div>

          <div className={styles.block}>
            <h2>Third-party services</h2>
            <ul>
              <li>
                <strong>Google Fonts:</strong> fonts are loaded from Google’s servers, which receive your IP address and
                browser information when the page loads. See{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  Google’s privacy policy
                </a>
                .
              </li>
              <li>
                <strong>WhatsApp and Instagram:</strong> links to these services open their own apps or websites, which
                have their own privacy policies.
              </li>
              <li>
                <strong>Website hosting:</strong> the hosting provider serving this website may keep standard technical
                logs (such as IP address and browser type) for security and reliability.
              </li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>Your choices</h2>
            <p>
              You can contact us without using the form, for example on Instagram{' '}
              <a href={business.contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                @{business.contact.instagramHandle}
              </a>
              . To ask about or delete messages you have sent us, contact us on the same channel.
            </p>
          </div>

          <div className={styles.block}>
            <h2>Changes</h2>
            <p>If we change how this website handles information, we will update this page and the date above.</p>
          </div>
        </Container>
      </section>
    </>
  )
}
