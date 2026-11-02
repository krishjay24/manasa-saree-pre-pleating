import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { analyticsAllowed, consentEvents, getAnalyticsConsent, setAnalyticsConsent, trackEvent, trackPageView } from '../../lib/analytics'
import styles from './AnalyticsConsent.module.css'

export function AnalyticsConsent() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const sync = () => {
      trackPageView(pathname)
      setOpen(analyticsAllowed() && getAnalyticsConsent() === null)
    }
    const frame = requestAnimationFrame(sync)
    const show = () => setOpen(true)
    const storage = (event: StorageEvent) => { if (event.key === 'manasa:ga4-consent' || event.key === null) sync() }
    window.addEventListener(consentEvents.open, show)
    window.addEventListener(consentEvents.choice, sync)
    window.addEventListener('storage', storage)
    window.addEventListener('focus', sync)
    const click = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest('a') : null
      if (!anchor) return
      const url = new URL(anchor.href, window.location.origin)
      if (url.hostname === 'wa.me') trackEvent('whatsapp_click')
      else if (url.protocol === 'tel:') trackEvent('phone_click')
      else if (url.origin === window.location.origin && url.pathname === '/contact' && pathname !== '/contact') trackEvent('booking_click')
    }
    document.addEventListener('click', click, true)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener(consentEvents.open, show)
      window.removeEventListener(consentEvents.choice, sync)
      window.removeEventListener('storage', storage)
      window.removeEventListener('focus', sync)
      document.removeEventListener('click', click, true)
    }
  }, [pathname])
  if (!open) return null
  const choose = (choice: 'granted' | 'denied') => { setAnalyticsConsent(choice); setOpen(false) }
  return (
    <aside aria-label="Analytics preferences" className={styles.card}>
      <h2>Your privacy, your choice.</h2>
      <p>Allow Google Analytics to measure page views and selected interactions. No form details are sent. Analytics stays off until you choose.</p>
      {!analyticsAllowed() && <p>Analytics is disabled in this environment or by your browser privacy signal.</p>}
      <div className={styles.actions}>
        <button type="button" onClick={() => choose('granted')}>Allow analytics</button>
        <button type="button" onClick={() => choose('denied')}>Decline</button>
      </div>
      <Link to="/privacy-policy">Read our privacy policy</Link>
    </aside>
  )
}
