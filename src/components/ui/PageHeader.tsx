import type { ReactNode } from 'react'
import { Container } from './Container'
import { Ornament } from './Ornament'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}

/** Banner used at the top of inner pages; holds the page's single <h1>. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className={styles.header}>
      <Container size="narrow" className={styles.inner}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <Ornament className={styles.ornament} />
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </Container>
    </section>
  )
}
