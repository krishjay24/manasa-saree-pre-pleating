import type { RouteMeta } from '../../app/routes'
import { absoluteUrl, siteConfig } from '../../config/site'
import { business } from '../../data/business'

export interface HeadTag {
  tag: 'meta' | 'link'
  attrs: Record<string, string>
}

/** Builds per-page head tags. Shared by <PageSEO> (client) and the prerender script (server). */
export function buildHeadTags(route: RouteMeta, path: string = route.path): HeadTag[] {
  const canonical = absoluteUrl(path)
  const ogImage = absoluteUrl(siteConfig.ogImage)
  const tags: HeadTag[] = [
    { tag: 'meta', attrs: { name: 'description', content: route.description } },
    { tag: 'meta', attrs: { name: 'robots', content: route.noindex ? 'noindex, follow' : 'index, follow' } },
    { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: business.name } },
    { tag: 'meta', attrs: { property: 'og:locale', content: siteConfig.locale } },
    { tag: 'meta', attrs: { property: 'og:title', content: route.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: route.description } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: route.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: route.description } },
  ]
  if (canonical && !route.noindex) {
    tags.push({ tag: 'link', attrs: { rel: 'canonical', href: canonical } })
    tags.push({ tag: 'meta', attrs: { property: 'og:url', content: canonical } })
  }
  if (ogImage) {
    tags.push({ tag: 'meta', attrs: { property: 'og:image', content: ogImage } })
    tags.push({ tag: 'meta', attrs: { name: 'twitter:image', content: ogImage } })
  }
  return tags
}

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function serializeHeadTags(route: RouteMeta, path?: string): string {
  const tags = buildHeadTags(route, path)
    .map(({ tag, attrs }) => {
      const attributes = Object.entries(attrs)
        .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
        .join(' ')
      return `<${tag} data-seo ${attributes}>`
    })
    .join('\n    ')
  return `<title>${escapeAttr(route.title)}</title>\n    ${tags}`
}
