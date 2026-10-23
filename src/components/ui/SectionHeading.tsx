import type { ReactNode } from 'react'
import { Ornament } from './Ornament'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  as?: 'h1' | 'h2'
  id?: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'dark',
  as: Heading = 'h2',
  id,
  className,
}: SectionHeadingProps) {
  return (
    <header className={[styles.heading, styles[align], styles[tone], className].filter(Boolean).join(' ')}>
      {eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>}
      <Heading id={id} className={styles.title}>
        {title}
      </Heading>
      {align === 'center' && <Ornament className={styles.ornament} />}
      {description && <p className={styles.description}>{description}</p>}
    </header>
  )
}
