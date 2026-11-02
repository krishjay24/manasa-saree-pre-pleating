import { routes } from '../app/routes'
import { siteConfig } from '../config/site'

export const GA4_ID = 'G-KH6FQZFPDZ'
export const CONSENT_KEY = 'manasa:ga4-consent'
export const consentEvents = { choice: 'manasa:ga4-choice', open: 'manasa:ga4-open' }
type Choice = 'granted' | 'denied' | null
export type AnalyticsEvent = 'whatsapp_click' | 'phone_click' | 'booking_click' | 'price_estimator_use' | 'price_estimate_completed'
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
let configured = false
let loaded = false
let lastPage = ''
let memoryChoice: Choice = null

export function analyticsAllowed() {
  return typeof window !== 'undefined' && import.meta.env.PROD
    && import.meta.env.VITE_ANALYTICS_ENABLED === 'true'
    && window.location.origin === siteConfig.url
    && !navigator.webdriver && navigator.doNotTrack !== '1' && navigator.doNotTrack !== 'yes'
    && !(navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl
}
export function getAnalyticsConsent(): Choice {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch { return memoryChoice }
}
export function pageContext(rawPath: string) {
  const path = rawPath.split(/[?#]/)[0].replace(/\/$/, '') || '/'
  const page = Object.values(routes).find(route => route.path === path) ?? routes.notFound
  const safePath = page === routes.notFound ? '/404' : page.path
  return { page_path: safePath, page_location: `${siteConfig.url}${safePath}`, page_title: page.title, page_referrer: '' }
}
function clearCookies() {
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0]
    if (name !== '_ga' && !name.startsWith('_ga_')) continue
    const domains = ['', window.location.hostname, `.${window.location.hostname}`, '.netlify.app']
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''} SameSite=Lax`
  }
}
export function syncAnalytics() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  const enabled = analyticsAllowed() && getAnalyticsConsent() === 'granted'
  Reflect.set(window, `ga-disable-${GA4_ID}`, !enabled)
  if (!enabled) {
    lastPage = ''
    clearCookies()
    // Disable first, discard pending commands, then remove the loader. No denied-consent pings.
    if (window.dataLayer) window.dataLayer.length = 0
    document.getElementById('manasa-ga4')?.remove()
    if (!loaded) configured = false
    return false
  }
  if (!configured) {
    window.dataLayer = window.dataLayer ?? []
    // gtag consumes Arguments objects, not arrays.
    // eslint-disable-next-line prefer-rest-params -- Google's loader expects the native Arguments object.
    window.gtag = function () { window.dataLayer!.push(arguments) }
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
    window.gtag('js', new Date())
    window.gtag('config', GA4_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, ignore_referrer: true, cookie_expires: 34128000, ...pageContext(window.location.pathname) })
    configured = true
  }
  if (!document.getElementById('manasa-ga4')) {
    const script = document.createElement('script')
    script.id = 'manasa-ga4'
    script.async = true
    script.onload = () => { loaded = true }
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    document.head.appendChild(script)
  }
  return true
}
export function setAnalyticsConsent(choice: Exclude<Choice, null>) {
  memoryChoice = choice
  try { localStorage.setItem(CONSENT_KEY, choice) } catch { /* Keep the choice for this page session. */ }
  syncAnalytics()
  window.dispatchEvent(new Event(consentEvents.choice))
}
export function openAnalyticsPreferences() { window.dispatchEvent(new Event(consentEvents.open)) }
export function trackPageView(path: string) {
  if (!syncAnalytics()) return
  const context = pageContext(path)
  if (context.page_path === lastPage) return
  lastPage = context.page_path
  window.gtag?.('set', context)
  window.gtag?.('event', 'page_view', context)
}
const eventNames: readonly string[] = ['whatsapp_click', 'phone_click', 'booking_click', 'price_estimator_use', 'price_estimate_completed']
export function trackEvent(name: AnalyticsEvent) {
  if (!eventNames.includes(name) || !syncAnalytics()) return
  // Fixed event names and static route metadata only; never accept arbitrary parameters.
  window.gtag?.('event', name, pageContext(window.location.pathname))
}
