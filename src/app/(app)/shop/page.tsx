import { ProductCard } from '@/components/ProductCard'
import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

export const metadata = {
  description: 'Explora el catálogo de productos de la tienda.',
  title: 'Tienda',
}

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function ShopPage({ searchParams }: Props) {
  const { q, sort, category } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const searchValue = typeof q === 'string' ? q.trim().replace(/[%_]/g, '') : undefined

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    draft: false,
    limit: 0,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      gallery: true,
      categories: true,
      priceInUSD: true,
      compareAtPrice: true,
      rating: true,
      reviewCount: true,
      newArrival: true,
      inventory: true,
      enableVariants: true,
    },
    ...(sort ? { sort } : { sort: 'title' }),
    ...(searchValue || category
      ? {
          where: {
            and: [
              {
                _status: {
                  equals: 'published',
                },
              },
              ...(searchValue
                ? [
                    {
                      title: {
                        like: searchValue,
                      },
                    },
                  ]
                : []),
              ...(category
                ? [
                    {
                      categories: {
                        contains: category,
                      },
                    },
                  ]
                : []),
            ],
          },
        }
      : {}),
  })

  let categoryTitle: string | undefined

  if (typeof category === 'string' && category) {
    const numericId = Number(category)
    const categoryDoc = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 1,
      where: {
        id: {
          equals: Number.isNaN(numericId) ? category : numericId,
        },
      },
    })

    categoryTitle = categoryDoc.docs[0]?.title ?? undefined
  }

  const count = products.docs.length
  const filters: string[] = []

  if (searchValue) {
    filters.push(`para «${searchValue}»`)
  }

  if (categoryTitle) {
    filters.push(`en ${categoryTitle}`)
  }

  const summary = `${count} ${count === 1 ? 'producto' : 'productos'}${
    filters.length ? ' ' + filters.join(' ') : ''
  }`

  return (
    <div>
      {count > 0 ? (
        <>
          <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">{summary}</p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.docs.map((product) => {
              return <ProductCard key={product.id} product={product} />
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/60 px-6 py-16 text-center dark:border-neutral-700 dark:bg-neutral-900/40">
          <h2 className="font-heading text-xl text-neutral-900 dark:text-neutral-100">
            Sin resultados
          </h2>
          <p className="mt-2 max-w-md text-sm text-neutral-600 dark:text-neutral-400">
            {searchValue
              ? `No encontramos productos para «${searchValue}». Intenta con otro término o explora todo el catálogo.`
              : 'No encontramos productos con los filtros seleccionados. Explora todo el catálogo.'}
          </p>
          <Link
            className="mt-6 inline-flex items-center rounded-full bg-brand-dark px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-navy"
            href="/shop"
          >
            Ver todos los productos
          </Link>
        </div>
      )}
    </div>
  )
}
