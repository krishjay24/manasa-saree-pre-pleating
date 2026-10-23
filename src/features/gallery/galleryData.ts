import type { MediaId } from '../../data/media'

export type GalleryCategoryId = 'everyday' | 'bridal' | 'ready-to-wear' | 'folding'

export interface GalleryCategory {
  id: GalleryCategoryId
  label: string
}

export interface GalleryItem {
  imageId: MediaId
  title: string
  category: GalleryCategoryId
  /** Photo of Manasa's own work (not a placeholder). */
  clientOriginal?: boolean
  /** Original full-resolution file shown in the lightbox. */
  fullSize?: { src: string; width: number; height: number }
}

export const galleryCategories: GalleryCategory[] = [
  { id: 'everyday', label: 'Everyday Pleating' },
  { id: 'bridal', label: 'Bridal & Silk' },
  { id: 'ready-to-wear', label: 'Ready-to-Wear' },
  { id: 'folding', label: 'Folding & Finishing' },
]

/** Each image appears once. Replace with client work photos as they become available. */
export const galleryItems: GalleryItem[] = [
  { imageId: 'service-regular', title: 'Mint daily-wear drape', category: 'everyday' },
  { imageId: 'service-bridal', title: 'Sea green bridal silk', category: 'bridal' },
  { imageId: 'gallery-organza-print', title: 'Printed organza', category: 'everyday' },
  {
    imageId: 'gallery-ivory-brocade-silk',
    title: 'Ivory Silk Saree with Magenta Brocade Border',
    category: 'folding',
    clientOriginal: true,
    fullSize: {
      src: `/images/gallery/${encodeURIComponent('Ivory Silk Saree with Magenta Brocade Border.png')}`,
      width: 1449,
      height: 1086,
    },
  },
  { imageId: 'gallery-purple-kanjeevaram', title: 'Purple Kanjeevaram', category: 'bridal' },
  { imageId: 'service-ready', title: 'Ready-to-wear purple saree', category: 'ready-to-wear' },
  { imageId: 'gallery-blue-handloom', title: 'Navy handloom', category: 'everyday' },
  { imageId: 'gallery-royal-blue-silk', title: 'Royal blue silk', category: 'bridal' },
  { imageId: 'service-ironing', title: 'Pressed & packed with tassel care', category: 'folding' },
  { imageId: 'gallery-pastel-chiffon', title: 'Pastel chiffon', category: 'everyday' },
  { imageId: 'gallery-group-silks', title: 'Family function silks', category: 'ready-to-wear' },
  { imageId: 'gallery-festive-pattu', title: 'Festive pattu', category: 'bridal' },
  { imageId: 'gallery-ikat-border', title: 'Ikat border, pressed flat', category: 'folding' },
  { imageId: 'gallery-teal-satin', title: 'Soft satin folds', category: 'folding' },
]
