import fs from 'node:fs'

const p = String.raw`c:\Users\User\Downloads\manasa_x5f_saree_x5f_pre_x5f_pleating (1).html`
const raw = fs.readFileSync(p, 'utf8')

const needles = [
  '250',
  '150',
  '400',
  '500',
  '100',
  'Regular',
  'Box',
  'Roju',
  'Pelli',
  'Ready',
  'Istri',
  'EDITABLE',
  'PENDING',
  '9XXXX',
  'phone',
  'price:',
  '₹',
  'MnS',
  'Professional',
  'Hygienic',
  'On-Time',
  'college girls',
  'video',
  'function date',
  'petticoat',
  'zip',
  'tassel',
  'cover',
  'express',
  'Express',
  'Fast Delivery',
  'Namaste',
  'FAQ',
  'cancel',
]
for (const n of needles) {
  const idx = []
  let from = 0
  while (idx.length < 4) {
    const i = raw.indexOf(n, from)
    if (i < 0) break
    idx.push(i)
    from = i + n.length
  }
  console.log('\n####', JSON.stringify(n), 'hits', (raw.split(n).length - 1))
  for (const i of idx) {
    console.log(raw.slice(Math.max(0, i - 80), i + 120).replaceAll('\n', ' '))
  }
}
