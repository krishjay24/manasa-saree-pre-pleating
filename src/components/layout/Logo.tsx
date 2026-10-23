import { Link } from 'react-router-dom'
import { business } from '../../data/business'
import styles from './Logo.module.css'

interface LogoProps {
  tone?: 'dark' | 'light'
  onClick?: () => void
}

export function Logo({ tone = 'dark', onClick }: LogoProps) {
  return (
    <Link to="/" className={`${styles.logo} ${styles[tone]}`} aria-label={`${business.name} — Home`} onClick={onClick}>
      <img
        className={styles.mark}
        src={business.logo}
        alt=""
        width={2172}
        height={724}
        decoding="async"
      />
    </Link>
  )
}
