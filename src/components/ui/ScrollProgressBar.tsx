import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './ScrollProgressBar.module.css'

function readProgress(): number {
  const scrolling = document.scrollingElement ?? document.documentElement
  const max = scrolling.scrollHeight - window.innerHeight
  if (max <= 0) return 0
  return Math.min(1, Math.max(0, scrolling.scrollTop / max))
}

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let frame = 0

    const paint = () => {
      frame = 0
      bar.style.transform = `scaleX(${readProgress()})`
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(document.documentElement)
    if (document.body) observer.observe(document.body)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [pathname])

  return (
    <div className={styles.track} aria-hidden="true" data-scroll-progress>
      <div ref={barRef} className={styles.bar} />
    </div>
  )
}
