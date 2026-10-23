/**
 * Build-time prerendering: renders every public route to static HTML (with per-page <head> tags and JSON-LD),
 * writes dist/<route>/index.html, dist/404.html, robots.txt and (when VITE_SITE_URL is set) sitemap.xml.
 * Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const pageFiles = {
  '/': 'src/pages/HomePage.tsx',
  '/services': 'src/pages/ServicesPage.tsx',
  '/gallery': 'src/pages/GalleryPage.tsx',
  '/about': 'src/pages/AboutPage.tsx',
  '/contact': 'src/pages/ContactPage.tsx',
  '/privacy-policy': 'src/pages/PrivacyPolicyPage.tsx',
  '/terms': 'src/pages/TermsPage.tsx',
  404: 'src/pages/NotFoundPage.tsx',
}

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
const manifest = JSON.parse(await fs.readFile(path.join(dist, '.vite', 'manifest.json'), 'utf8'))
const { render, prerenderRoutes, siteUrl } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

function modulePreloads(pageFile) {
  const files = new Set()
  const visit = (key) => {
    const chunk = manifest[key]
    if (!chunk || files.has(chunk.file)) return
    files.add(chunk.file)
    chunk.imports?.forEach(visit)
  }
  visit(pageFile)
  return [...files].map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`).join('\n    ')
}

async function writePage(url, outFile, pageFile) {
  const { html, head } = await render(url)
  if (!html.includes('<main')) throw new Error(`Prerender of ${url} produced no <main> content`)
  const page = template
    .replace('<!--app-head-->', `${head}\n    ${modulePreloads(pageFile)}`)
    .replace('<!--app-html-->', html)
  await fs.mkdir(path.dirname(outFile), { recursive: true })
  await fs.writeFile(outFile, page)
  console.log(`  prerendered ${url} -> ${path.relative(root, outFile)}`)
}

for (const route of prerenderRoutes) {
  const outFile = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, route.path.slice(1), 'index.html')
  await writePage(route.path, outFile, pageFiles[route.path])
}
await writePage('/404', path.join(dist, '404.html'), pageFiles[404])

const origin = siteUrl()
await fs.writeFile(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${origin}sitemap.xml\n` : ''}`,
)

if (origin) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = prerenderRoutes
    .filter((route) => !route.noindex)
    .map((route) => `  <url><loc>${origin}${route.path === '/' ? '' : route.path.slice(1)}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')
  await fs.writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
  console.log('  wrote sitemap.xml')
} else {
  console.warn('  VITE_SITE_URL not set: skipped sitemap.xml, canonical URLs and absolute Open Graph image URLs.')
}

await fs.rm(ssrDir, { recursive: true, force: true })
