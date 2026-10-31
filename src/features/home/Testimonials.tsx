import { Star } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { testimonials, testimonialsApproved } from '../../data/testimonials'
import styles from './Testimonials.module.css'

function Stars({ count }: { count: number }) {
  return (
    <p className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, index) => (
        <Star key={index} size={16} fill="currentColor" aria-hidden="true" />
      ))}
    </p>
  )
}

export function Testimonials() {
  if (!testimonialsApproved) return null

  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Kind words"
          title="What Our Clients Say"
        />
        {!testimonialsApproved && (
          <p className={styles.notice}>
            These comments are layout examples until Manasa shares approved client reviews.
          </p>
        )}
        <ul className={styles.grid}>
          {testimonials.map((item) => (
            <li key={item.id}>
              <article className={styles.card}>
                <Stars count={item.rating} />
                <blockquote className={styles.quote}>
                  <p>“{item.quote}”</p>
                </blockquote>
                <footer className={styles.meta}>
                  <cite className={styles.name}>{item.name}</cite>
                  <span className={styles.place}>{item.place}</span>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
