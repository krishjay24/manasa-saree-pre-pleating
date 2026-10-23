import fs from 'node:fs'

const p = String.raw`c:\Users\User\Downloads\manasa_x5f_saree_x5f_pre_x5f_pleating (1).html`
const raw = fs.readFileSync(p, 'utf8')
console.log('size', raw.length)
const title = raw.match(/<title>([\s\S]*?)<\/title>/i)?.[1]
console.log('TITLE:', title)

const keys = [
  'saree',
  'pleat',
  'kovur',
  'price',
  'whatsapp',
  'manasa',
  'booking',
  'bridal',
  'ironing',
  'nellore',
  'instagram',
  'pickup',
  'advance',
  'gpay',
  '₹',
  'tagline',
]
const re = /"((?:[^"\\]|\\.){12,800})"/g
const seen = new Set()
const out = []
let m
while ((m = re.exec(raw))) {
  let t = m[1]
  try {
    t = JSON.parse(`"${t}"`)
  } catch {
    t = t.replaceAll('\\n', '\n').replaceAll('\\"', '"')
  }
  const low = t.toLowerCase()
  if (keys.some((k) => low.includes(k.toLowerCase()))) {
    if (!seen.has(t)) {
      seen.add(t)
      out.push(t)
    }
  }
}

fs.mkdirSync('tmp-review', { recursive: true })
fs.writeFileSync('tmp-review/client-doc-strings.txt', out.join('\n\n====\n\n'), 'utf8')
console.log('matching strings', out.length)

const body = raw.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
const text = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
fs.writeFileSync('tmp-review/client-doc-body.txt', text.slice(0, 80000), 'utf8')
console.log('body length', text.length)
console.log(text.slice(0, 3000))
