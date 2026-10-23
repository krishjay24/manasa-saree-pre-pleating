import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import { App } from './app/App'
import { type RouteMeta, routes } from './app/routes'
import { serializeHeadTags } from './components/seo/headTags'
import { absoluteUrl } from './config/site'
import { buildLocalBusinessSchema, serializeJsonLd } from './utils/structuredData'
import './styles/tokens.css'
import './styles/global.css'
import './styles/typography.css'

export const prerenderRoutes: RouteMeta[] = Object.values(routes).filter((route: RouteMeta) => route.path !== '*')

async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  return new Response(stream).text()
}

/** Renders a route to static HTML. Used by scripts/prerender.mjs at build time. */
export async function render(url: string): Promise<{ html: string; head: string }> {
  const route = (Object.values(routes) as RouteMeta[]).find((r) => r.path === url) ?? routes.notFound
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  const html = await streamToString(prelude)
  const jsonLd = `<script type="application/ld+json">${serializeJsonLd(buildLocalBusinessSchema())}</script>`
  return { html, head: `${serializeHeadTags(route, url)}\n    ${jsonLd}` }
}

export function siteUrl(): string | null {
  return absoluteUrl('/')
}
