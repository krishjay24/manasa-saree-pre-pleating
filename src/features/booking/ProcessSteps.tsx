import { CalendarCheck, PackageCheck, Scissors, Truck } from 'lucide-react'
import { processSteps } from '../../data/business'
import styles from './ProcessSteps.module.css'

const icons = [CalendarCheck, Truck, Scissors, PackageCheck]

export function ProcessSteps() {
  return (
    <ol className={styles.steps}>
      {processSteps.map((step, index) => {
        const Icon = icons[index]
        return (
          <li key={step.step} className={styles.step}>
            <div className={styles.marker}>
              <span className={styles.icon}>
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className={styles.number} aria-hidden="true">
                {step.step}
              </span>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.local}>{step.localName}</p>
              <p className={styles.description}>{step.description}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
