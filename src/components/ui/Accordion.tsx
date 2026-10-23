import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import styles from './Accordion.module.css'

export interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  /** Items sharing a name open exclusively (native <details name>). */
  name?: string
}

export function Accordion({ items, name }: AccordionProps) {
  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <details key={item.id} className={styles.item} name={name}>
          <summary className={styles.summary}>
            <span>{item.title}</span>
            <ChevronDown className={styles.chevron} size={20} aria-hidden="true" />
          </summary>
          <div className={styles.content}>{item.content}</div>
        </details>
      ))}
    </div>
  )
}
