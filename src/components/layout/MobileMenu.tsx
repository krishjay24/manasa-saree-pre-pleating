import { Clock, MapPin, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { business } from '../../data/business'
import { mainNav } from '../../data/navigation'
import { buildGeneralEnquiryMessage } from '../../features/booking/whatsappMessage'
import { InstagramIcon } from '../ui/BrandIcons'
import { WhatsAppButton } from '../ui/WhatsAppButton'
import { Logo } from './Logo'
import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

/** Full-screen modal navigation built on <dialog> for native focus trapping, Escape and inert background. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 960px)')
    const handle = () => mql.matches && onClose()
    mql.addEventListener('change', handle)
    return () => mql.removeEventListener('change', handle)
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Site menu"
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && onClose()}
    >
      <div className={styles.panel}>
        <div className={styles.top}>
          <Logo onClick={onClose} />
          <button type="button" className={styles.close} aria-label="Close menu" onClick={onClose}>
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile">
          <ul className={styles.list}>
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <WhatsAppButton
          size="lg"
          fullWidth
          label="Book Now"
          showIcon={false}
          message={buildGeneralEnquiryMessage()}
          onClick={onClose}
        />

        <ul className={styles.meta}>
          <li>
            <MapPin size={16} aria-hidden="true" /> {business.location.full}
          </li>
          <li>
            <Clock size={16} aria-hidden="true" /> {business.hours.summary}
          </li>
          <li>
            <a href={business.contact.instagramUrl} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={16} /> @{business.contact.instagramHandle}
            </a>
          </li>
        </ul>
      </div>
    </dialog>
  )
}
