import { Clock, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routes } from '../../app/routes'
import { business, services } from '../../data/business'
import { legalNav, mainNav } from '../../data/navigation'
import { displayPhone, telLink, whatsAppLink } from '../../features/booking/contactLinks'
import { buildGeneralEnquiryMessage } from '../../features/booking/whatsappMessage'
import { InstagramIcon, WhatsAppIcon } from '../ui/BrandIcons'
import { Container } from '../ui/Container'
import { Ornament } from '../ui/Ornament'
import styles from './Footer.module.css'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()
  const whatsApp = whatsAppLink(buildGeneralEnquiryMessage())

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo tone="light" />
            <p className={styles.tagline}>“{business.tagline}”</p>
            <p className={styles.about}>{business.description}</p>
            <div className={styles.socials}>
              {whatsApp && (
                <a
                  className={styles.social}
                  href={whatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with us on WhatsApp (opens in a new tab)"
                >
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp</span>
                </a>
              )}
              <a
                className={styles.social}
                href={business.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow @${business.contact.instagramHandle} on Instagram (opens in a new tab)`}
              >
                <InstagramIcon size={18} />
                <span>@{business.contact.instagramHandle}</span>
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className={styles.heading}>Explore</h2>
            <ul className={styles.links}>
              {mainNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.heading}>Services</h2>
            <ul className={styles.links}>
              {services.map((service) => (
                <li key={service.id}>
                  <Link to={routes.services.path}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.heading}>Visit & Contact</h2>
            <ul className={styles.contact}>
              <li>
                <MapPin size={16} aria-hidden="true" />
                <span>{business.location.full}</span>
              </li>
              <li>
                <Clock size={16} aria-hidden="true" />
                <span>
                  {business.hours.rows.map((row) => (
                    <span key={row.days} className={styles.hoursRow}>
                      {row.days}: {row.time}
                    </span>
                  ))}
                </span>
              </li>
              {telLink && displayPhone && (
                <li>
                  <Phone size={16} aria-hidden="true" />
                  <a href={telLink}>{displayPhone}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <Ornament className={styles.ornament} width={160} />

        <div className={styles.bottom}>
          <p>
            © {year} K J Tech Solutions. All Rights Reserved.
          </p>
          <ul className={styles.legal}>
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
