/**
 * Image registry. Every image is served as AVIF + WebP at the listed widths, 4:5 aspect ratio.
 * Files: /public/images/{folder}/{id}-{width}.{avif|webp}
 *
 * TEMPORARY: All current images are free-licence Unsplash photos used for design preview only.
 * They do not show Manasa's work. Replace with client photographs before launch and set `temporary: false`.
 */

export interface MediaCredit {
  name: string
  url: string
}

export interface MediaImage {
  id: string
  folder: 'hero' | 'about' | 'services' | 'gallery'
  alt: string
  widths: readonly number[]
  temporary: boolean
  credit?: MediaCredit
}

const STANDARD_WIDTHS = [480, 800, 1200] as const
export const MEDIA_ASPECT = { width: 4, height: 5 } as const

const unsplash = (name: string, photoId: string): MediaCredit => ({
  name,
  url: `https://unsplash.com/photos/${photoId}`,
})

const images = [
  {
    id: 'hero-cream-silk',
    folder: 'hero',
    alt: 'Woman in a cream silk saree with a red and gold border, the pleats falling neatly',
    widths: [480, 800, 1200, 1600],
    temporary: true,
    credit: unsplash('Sabesh Photography LTD', 'j7Ljsqhnwag'),
  },
  {
    id: 'about-red-silk',
    folder: 'about',
    alt: 'Woman in a red and gold silk saree with temple jewellery, standing by the sea',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('shades by 43', 'Rm9DL9DmGi4'),
  },
  {
    id: 'service-regular',
    folder: 'services',
    alt: 'Mint green saree draped with even pleats for everyday wear',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Bulbul Ahmed', 'A7H3qmJTNJc'),
  },
  {
    id: 'service-box',
    folder: 'services',
    alt: 'Red silk sarees with gold zari borders folded neatly in layers',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Souravi Sinha', 'nSBC88WAklo'),
  },
  {
    id: 'service-bridal',
    folder: 'services',
    alt: 'Bride-to-be in a sea green silk saree with traditional gold jewellery',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Sabesh Photography LTD', 'njVir8eVq1M'),
  },
  {
    id: 'service-ready',
    folder: 'services',
    alt: 'Purple saree with a gold border worn ready, pleats held neatly in place',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Bulbul Ahmed', 'xTrp1WOq2Do'),
  },
  {
    id: 'service-ironing',
    folder: 'services',
    alt: 'Freshly pressed lime and magenta sarees with tassels, folded for packing',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Jainica Dhingra', 'udCX1mvNFos'),
  },
  {
    id: 'gallery-blue-handloom',
    folder: 'gallery',
    alt: 'Navy handloom saree with a soft drape, worn outdoors in tall grass',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Sabesh Photography LTD', 'gLxAUUHZjAw'),
  },
  {
    id: 'gallery-organza-print',
    folder: 'gallery',
    alt: 'Printed organza saree in blue and orange with a light, flowing drape',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Horitoki Ltd', 'dCuCMZ9XnHg'),
  },
  {
    id: 'gallery-pastel-chiffon',
    folder: 'gallery',
    alt: 'Pastel pink and yellow chiffon saree draped for a daytime function',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Dhruv vishwakarma', 'wgEWSRQuoEE'),
  },
  {
    id: 'gallery-royal-blue-silk',
    folder: 'gallery',
    alt: 'Royal blue silk saree with a gold zari border spread in a wide pallu',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Bulbul Ahmed', 'tjRs987fPfg'),
  },
  {
    id: 'gallery-purple-kanjeevaram',
    folder: 'gallery',
    alt: 'Purple Kanjeevaram silk saree with gold motifs and layered jewellery',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Bella Pon Fruitsia', 'wcgCFUi_Zws'),
  },
  {
    id: 'gallery-festive-pattu',
    folder: 'gallery',
    alt: 'Pink and green pattu saree with a gold border worn for a festive occasion',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Bella Pon Fruitsia', 'y9HsMX3-mUY'),
  },
  {
    id: 'gallery-group-silks',
    folder: 'gallery',
    alt: 'Three women in coordinated purple silk sarees for a family function',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Bulbul Ahmed', 'oXm1bSl87WY'),
  },
  {
    id: 'gallery-ikat-border',
    folder: 'gallery',
    alt: 'Close-up of a red and green ikat saree border, pressed flat',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('soumya parthasarathy', 'eLOLLINm5ZA'),
  },
  {
    id: 'gallery-teal-satin',
    folder: 'gallery',
    alt: 'Close-up of soft teal satin saree fabric folds',
    widths: STANDARD_WIDTHS,
    temporary: true,
    credit: unsplash('Jatin Gajjar', 'dQO-3ud96rQ'),
  },
] as const satisfies readonly MediaImage[]

export type MediaId = (typeof images)[number]['id']

export const media = Object.fromEntries(images.map((image) => [image.id, image])) as unknown as Record<MediaId, MediaImage>

export const allMedia: readonly MediaImage[] = images

export const hasTemporaryMedia = allMedia.some((image) => image.temporary)

export function mediaSrc(image: MediaImage, width: number, format: 'avif' | 'webp'): string {
  return `/images/${image.folder}/${image.id}-${width}.${format}`
}

export function mediaSrcSet(image: MediaImage, format: 'avif' | 'webp'): string {
  return image.widths.map((w) => `${mediaSrc(image, w, format)} ${w}w`).join(', ')
}
