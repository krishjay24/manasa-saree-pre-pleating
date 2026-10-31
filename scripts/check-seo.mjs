import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { preview } from 'vite'

const origin = 'https://manasa-saree-prepleating.netlify.app'
const paths = ['/', '/services', '/gallery', '/about', '/contact', '/privacy-policy', '/terms']
const read = (file) => fs.readFile(new URL(`../dist/${file}`, import.meta.url), 'utf8')
const sitemap = await read('sitemap.xml')
assert.match(sitemap, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/)
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
assert.deepEqual(urls, paths.map((path) => `${origin}${path === '/' ? '/' : path}`))
assert.equal(new Set(urls).size, paths.length)
const robots = await read('robots.txt')
assert.match(robots, /User-agent: \*\nAllow: \/\n/)
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`))
const titles = new Set()
const descriptions = new Set()
for (const path of paths) {
  const html = await read(path === '/' ? 'index.html' : `${path.slice(1)}/index.html`)
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${path}: one heading`)
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1)
  assert.ok(html.includes(`href="${origin}${path}"`), `${path}: canonical`)
  assert.match(html, /name="robots" content="index, follow"/)
  assert.ok(!html.includes('noindex'))
  assert.ok(!html.includes('<!--app-'))
  assert.match(html, /<main\b/)
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  const description = html.match(/name="description" content="([^"]+)"/)?.[1]
  assert.ok(title && description)
  titles.add(title)
  descriptions.add(description)
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
  assert.equal(schema.url, `${origin}/`)
  assert.equal(schema.address.addressLocality, 'Kovur')
  assert.ok(!schema.review && !schema.aggregateRating)
  assert.ok(!html.includes('Anitha') && !html.includes('Srija') && !html.includes('Kavitha'))
  for (const field of ['image', 'logo']) assert.ok(schema[field].startsWith(`${origin}/`))
}
assert.equal(titles.size, paths.length)
assert.equal(descriptions.size, paths.length)
const notFound = await read('404.html')
assert.match(notFound, /name="robots" content="noindex, follow"/)
assert.ok(!notFound.includes('rel="canonical"'))

// HTTP check: confirm the build serves these exact files, rather than an HTML fallback.
const server = await preview({ preview: { host: '127.0.0.1', port: 4178, strictPort: true, open: false } })
try {
  for (const [file, expected] of [['robots.txt', robots], ['sitemap.xml', sitemap]]) {
    const response = await fetch(`http://127.0.0.1:4178/${file}`)
    assert.equal(response.status, 200)
    assert.ok(!response.headers.get('content-type').includes('text/html'))
    assert.equal(await response.text(), expected)
  }
} finally {
  await new Promise((resolve, reject) => server.httpServer.close((error) => error ? reject(error) : resolve()))
}
console.log(`SEO checks passed: ${urls.length} indexable URLs; static robots/sitemap HTTP responses verified.`)
