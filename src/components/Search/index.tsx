'use client'

import { cn } from '@/utilities/cn'
import { createUrl } from '@/utilities/createUrl'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
  className?: string
}

export const Search: React.FC<Props> = ({ className }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const search = val.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set('q', search.value)
    } else {
      newParams.delete('q')
    }

    router.push(createUrl('/shop', newParams))
  }

  return (
    <form className={cn('relative w-full', className)} onSubmit={onSubmit} role="search">
      <label htmlFor="shop-search" className="sr-only">
        Buscar productos
      </label>
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
      />
      <input
        id="shop-search"
        autoComplete="off"
        className="h-12 w-full rounded-full border border-neutral-200 bg-white pl-11 pr-28 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dark/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
        defaultValue={searchParams?.get('q') || ''}
        key={searchParams?.get('q')}
        name="search"
        placeholder="Buscar productos..."
        type="text"
      />
      <button
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-brand-dark px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy"
        type="submit"
      >
        Buscar
      </button>
    </form>
  )
}
