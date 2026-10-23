import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { media } from '../../data/media'
import type { GalleryItem } from './galleryData'
import styles from './Lightbox.module.css'

interface LightboxProps {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = index !== null && items[index] !== undefined

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const item = open ? items[index] : null
  const count = items.length
  const go = (delta: number) => index !== null && onNavigate((index + delta + count) % count)

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={item ? `Image viewer: ${item.title}` : 'Image viewer'}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(1)
        if (event.key === 'ArrowLeft') go(-1)
      }}
      onClick={(event) => event.target === dialogRef.current && onClose()}
    >
      {item && (
        <div className={styles.content}>
          <button type="button" className={`${styles.control} ${styles.close}`} onClick={onClose} aria-label="Close image viewer">
            <X size={24} aria-hidden="true" />
          </button>

          <figure className={styles.figure}>
            <div className={styles.imageWrap}>
              <ResponsiveImage
                key={item.imageId}
                image={media[item.imageId]}
                sizes="(min-width: 900px) 560px, 92vw"
                priority
                className={styles.image}
              />
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.counter} aria-live="polite">
                {index! + 1} / {count}
              </span>
            </figcaption>
          </figure>

          {count > 1 && (
            <>
              <button type="button" className={`${styles.control} ${styles.prev}`} onClick={() => go(-1)} aria-label="Previous image">
                <ChevronLeft size={28} aria-hidden="true" />
              </button>
              <button type="button" className={`${styles.control} ${styles.next}`} onClick={() => go(1)} aria-label="Next image">
                <ChevronRight size={28} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  )
}
