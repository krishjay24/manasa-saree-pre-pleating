import { ArrowRight } from 'lucide-react'
import { routes } from '../../app/routes'
import { InstagramIcon } from '../../components/ui/BrandIcons'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { business } from '../../data/business'
import { media } from '../../data/media'
import { galleryItems } from '../gallery/galleryData'
import styles from './GalleryPreview.module.css'

const previewItems = galleryItems.slice(0, 5)

export function GalleryPreview() {
  return (
    <section className={styles.section} aria-labelledby="gallery-preview-title">
      <Container>
        <SectionHeading
          id="gallery-preview-title"
          eyebrow="Our Work"
          title={
            <>
              Sarees, <em>beautifully prepared</em>
            </>
          }
          description="A glimpse of pleated, folded and ready-to-wear sarees."
        />
        <ul className={styles.grid}>
          {previewItems.map((item, index) => (
            <li key={item.imageId} className={`${styles.item} ${index === 0 ? styles.featured : ''}`}>
              <ResponsiveImage
                image={media[item.imageId]}
                sizes={index === 0 ? '(min-width: 900px) 40vw, 90vw' : '(min-width: 900px) 20vw, 45vw'}
                priority={index < 3}
                className={styles.image}
              />
              <span className={styles.caption}>{item.title}</span>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Button to={routes.gallery.path} iconEnd={<ArrowRight size={16} aria-hidden="true" />}>
            View Gallery
          </Button>
          <Button href={business.contact.instagramUrl} variant="outline" icon={<InstagramIcon size={16} />}>
            Follow on Instagram
          </Button>
        </div>
      </Container>
    </section>
  )
}
