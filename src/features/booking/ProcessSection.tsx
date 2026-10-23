import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ProcessSteps } from './ProcessSteps'
import styles from './ProcessSection.module.css'

interface ProcessSectionProps {
  tone?: 'cream' | 'white'
}

export function ProcessSection({ tone = 'cream' }: ProcessSectionProps) {
  return (
    <section className={`${styles.section} ${styles[tone]}`} aria-labelledby="process-title">
      <Container>
        <SectionHeading
          id="process-title"
          eyebrow="How It Works"
          title={
            <>
              Four simple steps to a <em>ready saree</em>
            </>
          }
        />
        <ProcessSteps />
      </Container>
    </section>
  )
}
