import { Expand, ImageOff, Star } from 'lucide-react'
import { useState } from 'react'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { media } from '../../data/media'
import { type GalleryCategoryId, galleryCategories, galleryItems } from './galleryData'
import styles from './Gallery.module.css'
import { Lightbox } from './Lightbox'

type Filter = GalleryCategoryId | 'all'

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('all')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const visible = filter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === filter)
  const filters: { id: Filter; label: string }[] = [{ id: 'all', label: 'All Work' }, ...galleryCategories]

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter gallery by category">
        {filters.map(({ id, label }) => {
          const count = id === 'all' ? galleryItems.length : galleryItems.filter((item) => item.category === id).length
          return (
            <button
              key={id}
              type="button"
              className={styles.filter}
              aria-pressed={filter === id}
              onClick={() => {
                setFilter(id)
                setActiveIndex(null)
              }}
            >
              {label} <span className={styles.count}>{count}</span>
            </button>
          )
        })}
      </div>

      <p className="visually-hidden" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? 'image' : 'images'}
      </p>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <ImageOff size={32} aria-hidden="true" />
          <p>New photos for this category are coming soon. Follow us on Instagram for our latest work.</p>
        </div>
      ) : (
        <ul className={styles.grid}>
          {visible.map((item, index) => (
            <li key={item.imageId}>
              <button
                type="button"
                className={styles.tile}
                onClick={() => setActiveIndex(index)}
                aria-label={`View larger: ${item.title}`}
              >
                <ResponsiveImage
                  image={media[item.imageId]}
                  sizes="(min-width: 1100px) 280px, (min-width: 700px) 30vw, 46vw"
                  priority={index < 2}
                  className={styles.image}
                />
                {item.clientOriginal && (
                  <span className={styles.badge} role="img" aria-label="Client's original work">
                    <Star size={20} fill="none" strokeWidth={2} aria-hidden="true" />
                  </span>
                )}
                <span className={styles.overlay} aria-hidden="true">
                  <span className={styles.title}>{item.title}</span>
                  <Expand size={18} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox items={visible} index={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} />
    </>
  )
}
