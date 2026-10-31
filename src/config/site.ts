export const siteConfig = {
  /** Approved production origin shared by canonical URLs, sitemap and JSON-LD. */
  url: 'https://manasa-saree-prepleating.netlify.app',
  lang: 'en-IN',
  locale: 'en_IN',
  themeColor: '#631B28',
  ogImage: '/images/hero/hero-cream-silk-1200.webp',
} as const

export function absoluteUrl(path: string): string | null {
  return siteConfig.url ? `${siteConfig.url}${path === '/' ? '/' : path}` : null
}
