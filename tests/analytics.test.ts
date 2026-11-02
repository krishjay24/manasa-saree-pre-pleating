import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const origin = 'https://manasa-saree-prepleating.netlify.app'
let values: Map<string, string>
let scripts: { id: string; src: string; remove: () => void }[]
let cookies: string[]
beforeEach(() => {
  vi.resetModules()
  vi.stubEnv('PROD', true)
  vi.stubEnv('VITE_ANALYTICS_ENABLED', 'true')
  values = new Map()
  scripts = []
  cookies = []
  vi.stubGlobal('localStorage', { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) })
  vi.stubGlobal('navigator', { doNotTrack: '0', webdriver: false, globalPrivacyControl: false })
  vi.stubGlobal('window', { location: { origin, hostname: new URL(origin).hostname, pathname: '/services', search: '?phone=secret', hash: '#private' }, dispatchEvent: vi.fn() })
  vi.stubGlobal('document', {
    get cookie() { return '_ga=test; _ga_KH6FQZFPDZ=test' },
    set cookie(value: string) { cookies.push(value) },
    getElementById: (id: string) => scripts.find(s => s.id === id),
    createElement: () => { const script = { id: '', src: '', remove: () => { scripts = scripts.filter(s => s !== script) } }; return script },
    head: { appendChild: (script: typeof scripts[number]) => scripts.push(script) },
  })
})
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs() })

describe('consent-gated GA4', () => {
  it('stays script-free before consent and after rejection, then deduplicates clean page views', async () => {
    const ga = await import('../src/lib/analytics')
    ga.trackPageView('/services')
    ga.trackEvent('whatsapp_click')
    expect(scripts).toHaveLength(0)
    ga.setAnalyticsConsent('denied')
    expect(scripts).toHaveLength(0)
    ga.setAnalyticsConsent('granted')
    ga.setAnalyticsConsent('granted')
    expect(scripts).toHaveLength(1)
    expect(scripts[0].src).toBe(`https://www.googletagmanager.com/gtag/js?id=${ga.GA4_ID}`)
    ga.trackPageView('/services?phone=secret#private')
    ga.trackPageView('/services')
    ga.trackPageView('/contact')
    ga.trackPageView('/services')
    const calls = window.dataLayer as unknown[][]
    expect(calls.filter(c => c[1] === 'page_view')).toHaveLength(3)
    expect(calls.find(c => c[0] === 'config')?.[2]).toMatchObject({ send_page_view: false, allow_google_signals: false, page_referrer: '' })
    for (const name of ['whatsapp_click', 'phone_click', 'booking_click', 'price_estimator_use', 'price_estimate_completed'] as const) ga.trackEvent(name)
    ga.trackEvent('generate_lead' as never)
    expect(calls.filter(c => c[1] === 'generate_lead')).toHaveLength(0)
    expect(JSON.stringify(calls.map(c => Array.from(c)))).not.toMatch(/secret|private|phone=/)
    expect(ga.pageContext('/unknown/customer-name?secret')).toMatchObject({ page_path: '/404' })
    ga.setAnalyticsConsent('denied')
    expect(Reflect.get(window, `ga-disable-${ga.GA4_ID}`)).toBe(true)
    expect(scripts).toHaveLength(0)
    expect(cookies.some(c => c.startsWith('_ga=; Max-Age=0'))).toBe(true)
    ga.trackEvent('phone_click')
    expect(window.dataLayer).toHaveLength(0)
    ga.setAnalyticsConsent('granted')
    ga.trackPageView('/services')
    expect(window.dataLayer?.length).toBeGreaterThan(0)
  })
  it.each(['dnt', 'gpc', 'webdriver', 'localhost', 'preview', 'development', 'disabled'])('blocks %s even with stored permission', async reason => {
    values.set('manasa:ga4-consent', 'granted')
    if (reason === 'dnt') vi.stubGlobal('navigator', { doNotTrack: '1' })
    if (reason === 'gpc') vi.stubGlobal('navigator', { globalPrivacyControl: true })
    if (reason === 'webdriver') vi.stubGlobal('navigator', { webdriver: true })
    if (reason === 'localhost' || reason === 'preview') vi.stubGlobal('window', { location: { origin: reason === 'localhost' ? 'http://localhost:5173' : 'https://preview--manasa-saree-prepleating.netlify.app' } })
    if (reason === 'development') vi.stubEnv('PROD', false)
    if (reason === 'disabled') vi.stubEnv('VITE_ANALYTICS_ENABLED', 'false')
    const ga = await import('../src/lib/analytics')
    ga.trackPageView('/')
    expect(scripts).toHaveLength(0)
    expect(window.dataLayer).toBeUndefined()
  })
  it('handles cross-tab revocation and unavailable storage', async () => {
    const ga = await import('../src/lib/analytics')
    values.set(ga.CONSENT_KEY, 'granted')
    ga.trackPageView('/')
    values.set(ga.CONSENT_KEY, 'denied')
    ga.trackPageView('/services')
    expect(scripts).toHaveLength(0)
    vi.stubGlobal('localStorage', { getItem: () => { throw Error('blocked') }, setItem: () => { throw Error('blocked') } })
    ga.setAnalyticsConsent('granted')
    expect(ga.getAnalyticsConsent()).toBe('granted')
    ga.setAnalyticsConsent('denied')
    expect(ga.getAnalyticsConsent()).toBe('denied')
  })
})
