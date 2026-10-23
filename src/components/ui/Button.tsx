import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './Button.module.css'

type Variant = 'primary' | 'gold' | 'outline' | 'light' | 'link'
type Size = 'md' | 'lg' | 'sm'

interface BaseProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconEnd?: ReactNode
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

type LinkButtonProps = BaseProps & { to: string; href?: never } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
type AnchorButtonProps = BaseProps & { href: string; to?: never; external?: boolean } & AnchorHTMLAttributes<HTMLAnchorElement>
type NativeButtonProps = BaseProps & { to?: never; href?: never } & ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = LinkButtonProps | AnchorButtonProps | NativeButtonProps

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, iconEnd, fullWidth, className, children, ...rest } = props
  const classes = [styles.button, styles[variant], styles[size], fullWidth && styles.full, className]
    .filter(Boolean)
    .join(' ')
  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
      {iconEnd && <span className={styles.icon}>{iconEnd}</span>}
    </>
  )

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...anchorProps } = rest
    return (
      <Link to={to} className={classes} {...anchorProps}>
        {content}
      </Link>
    )
  }

  if ('href' in rest && rest.href !== undefined) {
    const { external = true, ...anchorProps } = rest as AnchorButtonProps
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a className={classes} {...externalProps} {...anchorProps}>
        {content}
      </a>
    )
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  )
}
