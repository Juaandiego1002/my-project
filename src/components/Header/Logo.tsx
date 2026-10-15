import Image from 'next/image'

const LOGO_WIDTH = 1063
const LOGO_HEIGHT = 195

const SIZES = {
  sm: { heightClass: 'h-8', renderedWidth: 174 },
  md: { heightClass: 'h-10', renderedWidth: 218 },
} as const

export type LogoSize = keyof typeof SIZES

export function Logo({
  className,
  size = 'md',
  priority = false,
  alt = "NATURALVER'S",
}: {
  className?: string
  size?: LogoSize
  priority?: boolean
  alt?: string
}) {
  const { heightClass, renderedWidth } = SIZES[size]

  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      sizes={`${renderedWidth}px`}
      priority={priority}
      className={`w-auto ${heightClass} ${className ?? ''}`}
    />
  )
}
