'use client'
import React, { useCallback, useMemo } from 'react'

import { Category } from '@/payload-types'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createUrl } from '@/utilities/createUrl'
import clsx from 'clsx'

const itemClass =
  'w-full text-left text-sm underline-offset-4 hover:underline hover:text-brand-dark dark:hover:text-neutral-100'

type Props = {
  category: Category
}

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = useMemo(() => {
    return searchParams.get('category') === String(category.id)
  }, [category.id, searchParams])

  const setQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (isActive) {
      params.delete('category')
    } else {
      params.set('category', String(category.id))
    }

    router.push(createUrl(pathname, params))
  }, [category.id, isActive, pathname, router, searchParams])

  return (
    <button
      onClick={() => setQuery()}
      className={clsx('hover:cursor-pointer', itemClass, {
        'font-medium underline text-brand-dark dark:text-neutral-100': isActive,
      })}
      type="button"
    >
      {category.title}
    </button>
  )
}

export const AllProductsItem: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = useMemo(() => {
    return !searchParams.get('category') && !searchParams.get('q')
  }, [searchParams])

  const setQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('q')

    router.push(createUrl(pathname, params))
  }, [pathname, router, searchParams])

  return (
    <button
      onClick={() => setQuery()}
      className={clsx('hover:cursor-pointer', itemClass, {
        'font-medium underline text-brand-dark dark:text-neutral-100': isActive,
      })}
      type="button"
    >
      Todos los productos
    </button>
  )
}
