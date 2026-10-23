import { Info } from 'lucide-react'
import { routes } from '../app/routes'
import { PageSEO } from '../components/seo/PageSEO'
import { InstagramIcon } from '../components/ui/BrandIcons'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { PageHeader } from '../components/ui/PageHeader'
import { business } from '../data/business'
import { hasTemporaryMedia } from '../data/media'
import { Gallery } from '../features/gallery/Gallery'
import styles from './GalleryPage.module.css'

export default function GalleryPage() {
  return (
    <>
      <PageSEO route={routes.gallery} />
      <PageHeader
        eyebrow="Our Work"
        title={
          <>
            A gallery of <em>graceful drapes</em>
          </>
        }
        description="Everyday pleating, bridal silks, ready-to-wear sarees and neat finishing — tap any photo to view it larger."
      >
        <Button href={business.contact.instagramUrl} variant="outline" size="sm" icon={<InstagramIcon size={16} />}>
          More on Instagram
        </Button>
      </PageHeader>

      <section className={styles.section} aria-label="Gallery">
        <Container>
          {hasTemporaryMedia && (
            <p className={styles.notice}>
              <Info size={16} aria-hidden="true" />
              Preview images: these photos are temporary placeholders and will be replaced with Manasa’s own work.
            </p>
          )}
          <Gallery />
        </Container>
      </section>
    </>
  )
}
