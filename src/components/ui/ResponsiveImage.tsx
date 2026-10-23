import { MEDIA_ASPECT, type MediaImage, mediaSrc, mediaSrcSet } from '../../data/media'

interface ResponsiveImageProps {
  image: MediaImage
  sizes: string
  /** Above-the-fold images: eager loading with high fetch priority. */
  priority?: boolean
  className?: string
  alt?: string
}

export function ResponsiveImage({ image, sizes, priority = false, className, alt }: ResponsiveImageProps) {
  const largest = image.widths[image.widths.length - 1]
  const fallbackWidth = image.widths.includes(800) ? 800 : largest
  return (
    <picture className="media-picture">
      <source type="image/avif" srcSet={mediaSrcSet(image, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={mediaSrcSet(image, 'webp')} sizes={sizes} />
      <img
        className={className}
        src={mediaSrc(image, fallbackWidth, 'webp')}
        alt={alt ?? image.alt}
        width={largest}
        height={Math.round((largest * MEDIA_ASPECT.height) / MEDIA_ASPECT.width)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}
