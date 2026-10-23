import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { RouteMeta } from '../../app/routes'
import { buildHeadTags } from './headTags'

interface PageSEOProps {
  route: RouteMeta
}

/**
 * Keeps <head> in sync during client-side navigation.
 * The initial HTML for each route is generated at build time by scripts/prerender.mjs using the same tags.
 */
export function PageSEO({ route }: PageSEOProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = route.title
    document.head.querySelectorAll('[data-seo]').forEach((node) => node.remove())
    for (const { tag, attrs } of buildHeadTags(route, route.noindex ? pathname : route.path)) {
      const element = document.createElement(tag)
      element.setAttribute('data-seo', '')
      for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value)
      document.head.appendChild(element)
    }
  }, [route, pathname])

  return null
}
