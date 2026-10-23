import { routes } from './routes'

export const pageLoaders = {
  home: () => import('../pages/HomePage'),
  services: () => import('../pages/ServicesPage'),
  gallery: () => import('../pages/GalleryPage'),
  about: () => import('../pages/AboutPage'),
  contact: () => import('../pages/ContactPage'),
  privacy: () => import('../pages/PrivacyPolicyPage'),
  terms: () => import('../pages/TermsPage'),
  notFound: () => import('../pages/NotFoundPage'),
} as const

/** Loads the page chunk for a URL before hydration so prerendered HTML is not replaced by a fallback. */
export function preloadPage(pathname: string): Promise<unknown> {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const entry = (Object.keys(pageLoaders) as (keyof typeof pageLoaders)[]).find(
    (key) => routes[key].path === normalized,
  )
  return pageLoaders[entry ?? 'notFound']()
}
