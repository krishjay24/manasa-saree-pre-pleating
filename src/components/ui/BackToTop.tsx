import { ArrowUpToLine } from 'lucide-react'
import { useScrolled } from '../../hooks/useScrolled'
import styles from './BackToTop.module.css'

const SHOW_AFTER_PX = 380

export function BackToTop() {
  const visible = useScrolled(SHOW_AFTER_PX)

  const handleClick = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      onClick={handleClick}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      data-back-to-top
    >
      <ArrowUpToLine size={18} strokeWidth={2.25} aria-hidden="true" />
    </button>
  )
}
