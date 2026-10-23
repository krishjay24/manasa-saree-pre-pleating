import fs from 'node:fs'

const p = String.raw`c:\Users\User\Downloads\manasa_x5f_saree_x5f_pre_x5f_pleating (1).html`
const raw = fs.readFileSync(p, 'utf8')

const markers = [
  'Namaste',
  '500+ clients',
  'Why Choose',
  'Mana Services',
  'How It Works',
  'Jagrathalu',
  'Contact & Booking',
  'Quick Booking',
  'Hi Manasa',
  'contentEditable',
  'video call',
  'No cancellation',
  'Booking confirm',
  'Neat',
  'Who we',
  'About',
  'FAQ',
  'Testimonial',
  'Gallery',
  'Philosophy',
  'prema tho',
]
for (const n of markers) {
  const i = raw.indexOf(n)
  console.log('\n====', n, i)
  if (i >= 0) console.log(raw.slice(i, i + 900).replaceAll('\n', ' '))
}
