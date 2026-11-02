// Optional browser regression: requires Playwright (or PLAYWRIGHT_MODULE pointing to its entry).
// Build with VITE_ANALYTICS_ENABLED=true first. All traffic is intercepted; Google never receives data.
import assert from 'node:assert/strict'
import { readFile, mkdir } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { pathToFileURL } from 'node:url'

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright')
const browser = await chromium.launch({ ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}) })
const origin = 'https://manasa-saree-prepleating.netlify.app'
const root = resolve('dist')
const output = resolve('analytics-review.local')
await mkdir(output, { recursive: true })
const mime = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' }
async function setup(viewport, simulateHuman = true, signal) {
  const context = await browser.newContext({ viewport, serviceWorkers: 'block' })
  if (simulateHuman) await context.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }))
  if (signal) await context.addInitScript(key => Object.defineProperty(navigator, key, { get: () => key === 'doNotTrack' ? '1' : true }), signal)
  const google = []
  await context.route('**/*', async route => {
    const url = new URL(route.request().url())
    if (/google-analytics.com|googletagmanager.com/.test(url.hostname)) {
      google.push(url.href)
      return route.fulfill({ contentType: 'text/javascript', body: '// Google intercepted: no real collection' })
    }
    if (url.origin !== origin) return route.abort()
    let file = resolve(root, `.${decodeURIComponent(url.pathname)}`)
    if (!file.startsWith(root + sep) && file !== root) return route.abort()
    if (!extname(file)) file = resolve(file, 'index.html')
    try { return await route.fulfill({ contentType: mime[extname(file)] ?? 'application/octet-stream', body: await readFile(file) }) }
    catch { return route.fulfill({ contentType: 'text/html', body: await readFile(resolve(root, '404.html')) }) }
  })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', e => errors.push(e.message))
  return { context, page, google, errors }
}
const eventNames = page => page.evaluate(() => (window.dataLayer ?? []).filter(c => c[0] === 'event').map(c => c[1]))
try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
    const { context, page, google, errors } = await setup(viewport)
    await page.goto(`${origin}/services?customer=secret#private`)
    const card = page.getByRole('complementary', { name: 'Analytics preferences' })
    await card.waitFor()
    await page.locator('h1').waitFor()
    assert.equal(google.length, 0, 'No Google requests before consent')
    const box = await card.boundingBox()
    const header = await page.locator('header').first().boundingBox()
    assert.equal(box.x, 0)
    assert.equal(Math.round(box.width), viewport.width)
    assert.equal(Math.round(box.y), Math.round(header.y + header.height))
    assert.equal(await card.evaluate(node => getComputedStyle(node).position), 'static')
    const heading = await page.locator('h1').boundingBox()
    assert.ok(heading.y >= box.y + box.height, 'Notice occupies its own space above page content')
    assert.equal(await page.evaluate(() => document.body.style.overflow), '')
    await page.screenshot({ path: resolve(output, `consent-${viewport.width}.png`) })
    await card.getByRole('button', { name: 'Decline' }).click()
    await page.reload()
    await page.getByRole('button', { name: 'Analytics preferences', exact: true }).waitFor()
    assert.equal(await card.count(), 0)
    assert.equal(google.length, 0)
    await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click()
    await card.waitFor({ state: 'visible' })
    await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Analytics preferences')
    assert.ok((await card.boundingBox()).y < viewport.height, 'Footer control brings the inline notice into view')
    await card.getByRole('button', { name: 'Allow analytics' }).click()
    await page.waitForFunction(() => (window.dataLayer ?? []).some(c => c[1] === 'page_view'))
    assert.equal(google.length, 1)
    assert.deepEqual(await eventNames(page), ['page_view'])
    await page.getByRole('button', { name: 'Increase quantity' }).click()
    assert.deepEqual((await eventNames(page)).slice(-2), ['price_estimator_use', 'price_estimate_completed'])
    await page.locator('footer a[href="/about"]').click()
    await page.waitForFunction(() => (window.dataLayer ?? []).filter(c => c[1] === 'page_view').length === 2)
    await page.goBack()
    await page.waitForFunction(() => (window.dataLayer ?? []).filter(c => c[1] === 'page_view').length === 3)
    await page.evaluate(() => { history.pushState({}, '', '?private=secret#changed'); dispatchEvent(new PopStateEvent('popstate')) })
    await page.waitForTimeout(100)
    assert.equal((await eventNames(page)).filter(n => n === 'page_view').length, 3)
    // Cancel navigation after the analytics capture listener; keep the external apps closed.
    for (const [selector, name] of [['a[href^="https://wa.me/"]', 'whatsapp_click'], ['a[href^="tel:"]', 'phone_click']]) {
      await page.locator(selector).first().evaluate(anchor => {
        anchor.addEventListener('click', e => e.preventDefault(), { once: true })
        anchor.click()
      })
      assert.equal((await eventNames(page)).filter(n => n === name).length, 1)
    }
    await page.locator('footer a[href="/contact"]').click()
    await page.waitForFunction(() => (window.dataLayer ?? []).some(c => c[1] === 'booking_click'))
    assert.equal((await eventNames(page)).filter(n => n === 'booking_click').length, 1)
    assert.equal((await eventNames(page)).includes('generate_lead'), false)
    const payload = await page.evaluate(() => JSON.stringify((window.dataLayer ?? []).map(c => Array.from(c))))
    assert.doesNotMatch(payload, /secret|customer=|private=|#private/)
    await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click()
    await card.getByRole('button', { name: 'Decline' }).click()
    await page.locator('footer a[href="/services"]').first().click()
    assert.deepEqual(await eventNames(page), [])
    assert.equal(google.length, 1)
    await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click()
    await card.getByRole('button', { name: 'Allow analytics' }).click()
    await page.waitForFunction(() => (window.dataLayer ?? []).filter(c => c[1] === 'page_view').length === 1)
    const other = await context.newPage()
    await other.goto(`${origin}/about`)
    await other.getByRole('button', { name: 'Analytics preferences', exact: true }).click()
    await other.getByRole('button', { name: 'Decline', exact: true }).click()
    await page.waitForFunction(() => window['ga-disable-G-KH6FQZFPDZ'] === true)
    assert.deepEqual(await eventNames(page), [])
    assert.deepEqual(errors, [])
    await context.close()
    console.log(`PASS inline top notice, footer focus, consent, withdrawal, estimator and routing at ${viewport.width}px`)
  }
  for (const signal of ['webdriver', 'doNotTrack', 'globalPrivacyControl']) {
    const { context, page, google } = await setup({ width: 1200, height: 900 }, signal !== 'webdriver', signal === 'webdriver' ? undefined : signal)
    await context.addInitScript(() => localStorage.setItem('manasa:ga4-consent', 'granted'))
    await page.goto(origin)
    await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click()
    await page.getByText('Analytics is disabled in this environment or by your browser privacy signal.').waitFor()
    assert.equal(google.length, 0)
    await context.close()
    console.log(`PASS automated/privacy signal blocking: ${signal}`)
  }
} finally { await browser.close() }
