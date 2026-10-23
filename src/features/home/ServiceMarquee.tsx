import styles from './ServiceMarquee.module.css'

const SERVICES = [
  'Saree Pre-Pleating',
  'Bridal Special',
  'Box Folding',
  'Ready-to-Wear Saree',
  'Ironing & Packing',
] as const

/** Repeats the service list so each group is wider than typical viewports. */
const SETS_PER_GROUP = 3

function Diamond() {
  return (
    <svg className={styles.diamond} viewBox="0 0 10 10" aria-hidden="true" focusable="false">
      <path d="M5 0.6 9.4 5 5 9.4 0.6 5Z" fill="currentColor" />
    </svg>
  )
}

function ServiceSet({ setIndex }: { setIndex: number }) {
  return (
    <>
      {SERVICES.map((name) => (
        <span key={`${setIndex}-${name}`} className={styles.item}>
          <span className={styles.label}>{name}</span>
          <Diamond />
        </span>
      ))}
    </>
  )
}

function MarqueeGroup() {
  return (
    <div className={styles.group} data-marquee-group>
      {Array.from({ length: SETS_PER_GROUP }, (_, index) => (
        <ServiceSet key={index} setIndex={index} />
      ))}
    </div>
  )
}

export function ServiceMarquee() {
  return (
    <section className={styles.marquee} aria-label="Our services" data-service-marquee>
      <ul className="visually-hidden">
        {SERVICES.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <div className={styles.viewport} aria-hidden="true" data-marquee-viewport>
        <div className={styles.track} data-marquee-track>
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>
    </section>
  )
}
