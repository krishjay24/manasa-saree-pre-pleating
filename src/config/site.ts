const rawSiteUrl = (import.meta.env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')

export const siteConfig = {
  /** Production origin, e.g. https://manasasareeprepleating.in — set VITE_SITE_URL once the domain is confirmed. */
  url: rawSiteUrl || null,
  lang: 'en-IN',
  locale: 'en_IN',
  themeColor: '#631B28',
  ogImage: '/images/hero/hero-cream-silk-1200.webp',
} as const

export function absoluteUrl(path: string): string | null {
  return siteConfig.url ? `${siteConfig.url}${path === '/' ? '/' : path}` : null
}
