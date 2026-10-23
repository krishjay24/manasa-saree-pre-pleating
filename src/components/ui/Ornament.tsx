interface OrnamentProps {
  className?: string
  width?: number
}

/** Decorative gold divider inspired by a saree border motif. */
export function Ornament({ className, width = 120 }: OrnamentProps) {
  return (
    <svg
      className={className}
      width={width}
      height={14}
      viewBox="0 0 120 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 7h38M82 7h38" stroke="currentColor" strokeWidth="1" />
      <path d="M42 7h8M70 7h8" stroke="currentColor" strokeWidth="1" />
      <path d="M60 1 66 7 60 13 54 7 60 1Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M60 3.4 63.4 7 60 10.6 56.6 7 60 3.4Z" fill="currentColor" />
      <circle cx="46" cy="7" r="1.15" fill="currentColor" />
      <circle cx="74" cy="7" r="1.15" fill="currentColor" />
    </svg>
  )
}
