import type { ElementType, ReactNode } from 'react'
import styles from './Container.module.css'

interface ContainerProps {
  as?: ElementType
  size?: 'default' | 'narrow'
  className?: string
  children: ReactNode
}

export function Container({ as: Tag = 'div', size = 'default', className, children }: ContainerProps) {
  return <Tag className={[styles.container, styles[size], className].filter(Boolean).join(' ')}>{children}</Tag>
}
