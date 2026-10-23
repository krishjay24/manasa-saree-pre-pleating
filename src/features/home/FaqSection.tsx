import { Accordion } from '../../components/ui/Accordion'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { faqs } from '../../data/business'
import styles from './FaqSection.module.css'

export function FaqSection() {
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <Container size="narrow">
        <SectionHeading
          id="faq-title"
          eyebrow="Questions"
          title={
            <>
              Frequently <em>asked</em>
            </>
          }
        />
        <Accordion
          name="faq"
          items={faqs.map((faq, index) => ({ id: `faq-${index}`, title: faq.question, content: <p>{faq.answer}</p> }))}
        />
      </Container>
    </section>
  )
}
