import { Button } from '@/components/ui/button'
import React from 'react'

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string
  quantity?: number
}) {
  return (
    <Button
      variant="nav"
      size="clear"
      aria-label={quantity ? `Carrito, ${quantity} productos` : 'Carrito'}
      className={`relative flex items-center justify-center text-brand-dark hover:cursor-pointer ${className ?? ''}`}
      {...rest}
    >
      <svg
        className="h-[14.5px] w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.29 2.29c-.63.63-.17 1.7.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {quantity ? (
        <span
          aria-hidden="true"
          className="absolute -right-2.5 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-brand-dark px-1 text-[10px] font-bold leading-none text-white"
        >
          {quantity}
        </span>
      ) : null}
    </Button>
  )
}
