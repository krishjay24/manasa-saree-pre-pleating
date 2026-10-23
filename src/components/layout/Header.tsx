import { Menu } from 'lucide-react'
import { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { mainNav } from '../../data/navigation'
import { buildGeneralEnquiryMessage } from '../../features/booking/whatsappMessage'
import { useScrolled } from '../../hooks/useScrolled'
import { Container } from '../ui/Container'
import { WhatsAppButton } from '../ui/WhatsAppButton'
import styles from './Header.module.css'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Container className={styles.inner}>
        <Logo />

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.list}>
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <WhatsAppButton
            size="sm"
            className={styles.cta}
            label="Book Now"
            showIcon={false}
            message={buildGeneralEnquiryMessage()}
          />
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </Container>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  )
}
