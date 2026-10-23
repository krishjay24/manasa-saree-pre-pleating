import { whatsAppLink } from '../../features/booking/contactLinks'
import { buildGeneralEnquiryMessage } from '../../utils/whatsapp'
import { WhatsAppIcon } from './BrandIcons'
import styles from './FloatingWhatsApp.module.css'

export function FloatingWhatsApp() {
  const href = whatsAppLink(buildGeneralEnquiryMessage())
  if (!href) return null

  return (
    <a
      className={styles.button}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-floating-whatsapp
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
