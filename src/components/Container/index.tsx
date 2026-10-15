import { cn } from '@/utilities/cn'
import React from 'react'

export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => (
  <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
)
