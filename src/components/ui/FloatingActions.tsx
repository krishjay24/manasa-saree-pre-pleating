import { BackToTop } from './BackToTop'
import { FloatingWhatsApp } from './FloatingWhatsApp'
import styles from './FloatingActions.module.css'

export function FloatingActions() {
  return (
    <div className={styles.stack} data-floating-actions>
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  )
}
