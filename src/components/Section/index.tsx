import { cn } from '@/utilities/cn'
import React from 'react'

type Props = React.PropsWithChildren<{
  className?: string
  background?: 'white' | 'gray' | 'dark'
}>

export const Section: React.FC<Props> = ({ children, className, background = 'white' }) => {
  const bg =
    background === 'gray'
      ? 'bg-gray-50'
      : background === 'dark'
        ? 'bg-brand-dark text-white'
        : 'bg-white'

  return <section className={cn('py-12 md:py-16', bg, className)}>{children}</section>
}
