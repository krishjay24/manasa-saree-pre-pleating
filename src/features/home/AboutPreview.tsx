import { ArrowRight } from 'lucide-react'
import { routes } from '../../app/routes'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { business } from '../../data/business'
import { media } from '../../data/media'
import styles from './AboutPreview.module.css'

export function AboutPreview() {
  return (
    <section className={styles.section} aria-labelledby="about-preview-title">
      <Container className={styles.inner}>
        <div className={styles.visual}>
          <div className={styles.frame}>
            <ResponsiveImage
              image={media['about-red-silk']}
              sizes="(min-width: 900px) 420px, (min-width: 600px) 60vw, 88vw"
              className={styles.image}
            />
          </div>
          <p className={styles.quote}>
            “Mee saree ni manam prema tho ready chestham.”
            <span>We prepare your saree with love.</span>
          </p>
        </div>

        <div className={styles.copy}>
          <SectionHeading
            id="about-preview-title"
            align="left"
            eyebrow="About Us"
            title={
              <>
                Saree draping, made <em>effortless</em>
              </>
            }
          />
          <p className={styles.text}>
            Based in {business.location.locality}, {business.location.district} and trusted by {business.clientsServed}{' '}
            clients — from college girls to brides. Each saree is handled with care, steam ironed, and packed like a
            gift, ready to drape in about two minutes.
          </p>
          <Button to={routes.about.path} variant="link" iconEnd={<ArrowRight size={16} aria-hidden="true" />}>
            Our Story &amp; Saree Care
          </Button>
        </div>
      </Container>
    </section>
  )
}
