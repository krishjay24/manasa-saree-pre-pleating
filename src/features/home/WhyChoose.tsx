import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { highlights } from '../../data/business'
import styles from './WhyChoose.module.css'

export function WhyChoose() {
  return (
    <section className={styles.section} aria-labelledby="why-title">
      <Container>
        <SectionHeading
          id="why-title"
          tone="light"
          eyebrow="Why Choose Us"
          title={
            <>
              Neat pleats, careful <em>handling</em>
            </>
          }
        />
        <ul className={styles.grid}>
          {highlights.map((item, index) => (
            <li key={item.title} className={styles.item}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
