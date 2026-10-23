import type { MouseEventHandler } from 'react'
import { instagramDmUrl, whatsAppLink } from '../../features/booking/contactLinks'
import { InstagramIcon, WhatsAppIcon } from './BrandIcons'
import { Button, type ButtonProps } from './Button'

interface WhatsAppButtonProps {
  message?: string
  label?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  fullWidth?: boolean
  className?: string
  showIcon?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

/**
 * Opens WhatsApp with a pre-filled message. When the business number is not configured,
 * falls back to an Instagram DM — the client profile lists both as booking channels.
 */
export function WhatsAppButton({
  message,
  label = 'Book via WhatsApp',
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  showIcon = true,
  onClick,
}: WhatsAppButtonProps) {
  const href = whatsAppLink(message)
  const common = { variant, size, fullWidth, className, onClick }

  if (href) {
    return (
      <Button
        href={href}
        icon={showIcon ? <WhatsAppIcon size={18} /> : undefined}
        aria-label={`${label} (opens WhatsApp)`}
        {...common}
      >
        {label}
      </Button>
    )
  }

  const fallbackLabel = label.replace(/WhatsApp/i, 'Instagram')
  return (
    <Button
      href={instagramDmUrl}
      icon={showIcon ? <InstagramIcon size={18} /> : undefined}
      aria-label={`${fallbackLabel === label ? `${label} on Instagram` : fallbackLabel} (opens Instagram)`}
      {...common}
    >
      {fallbackLabel}
    </Button>
  )
}
