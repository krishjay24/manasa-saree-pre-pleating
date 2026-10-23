import { Check } from 'lucide-react'
import { routes } from '../app/routes'
import { PageSEO } from '../components/seo/PageSEO'
import { Container } from '../components/ui/Container'
import { PageHeader } from '../components/ui/PageHeader'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import { SectionHeading } from '../components/ui/SectionHeading'
import { business, careInstructions } from '../data/business'
import { media } from '../data/media'
import { BookingCta } from '../features/booking/BookingCta'
import { WhyChoose } from '../features/home/WhyChoose'
import styles from './AboutPage.module.css'

export default function AboutPage() {
  return (
    <>
      <PageSEO route={routes.about} />
      <PageHeader
        eyebrow="About & Care"
        title={
          <>
            Made with love in <em>{business.location.locality}</em>
          </>
        }
        description={`${business.name} prepares sarees for everyday wear, festivals and weddings across ${business.location.district}.`}
      />

      <section className={styles.intro} aria-labelledby="who-title">
        <Container className={styles.introInner}>
          <div className={styles.introMedia}>
            <ResponsiveImage
              image={media['about-red-silk']}
              sizes="(min-width: 900px) 420px, 88vw"
              priority
              className={styles.image}
            />
          </div>
          <div className={styles.introCopy}>
            <SectionHeading
              id="who-title"
              align="left"
              // eyebrow="Mana Gurinchi"
              title={
                <>
                  Who <em>we are</em>
                </>
              }
            />
            <p>
              Namaste. At {business.name} we make wearing a saree easier. Whether you are going to the office, a wedding
              or a festival, you can be ready in about two minutes with perfect pleats.
            </p>
            <p>
              We are based in {business.location.locality}, {business.location.district} and trusted by{' '}
              {business.clientsServed} clients — from college girls to brides. Each saree is handled with care, steam
              ironed, and packed like a gift.
            </p>
            <ul className={styles.values}>
              {business.values.map((value) => (
                <li key={value}>
                  <Check size={16} aria-hidden="true" /> {value}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className={styles.philosophy} aria-labelledby="philosophy-title">
        <Container size="narrow" className={styles.philosophyInner}>
          <p className="eyebrow">Our Philosophy</p>
          <h2 id="philosophy-title" className={styles.quote}>
            “Each saree is handled with care, steam ironed, and packed <em>like a gift</em>.”
          </h2>
          <p className={styles.quoteNote}>
            Old or delicate sarees carry a small risk — we will tell you before we begin.
          </p>
        </Container>
      </section>

      <WhyChoose />

      <section id="care" className={styles.care} aria-labelledby="care-title">
        <Container size="narrow">
          <SectionHeading
            id="care-title"
            eyebrow="Jagrathalu · Care"
            title={
              <>
                Caring for your <em>pre-pleated saree</em>
              </>
            }
            description="A few simple habits keep your pleats crisp until the next occasion."
          />
          <ol className={styles.careList}>
            {careInstructions.map((instruction, index) => (
              <li key={instruction}>
                <span className={styles.careNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <p>{instruction}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <BookingCta />
    </>
  )
}
