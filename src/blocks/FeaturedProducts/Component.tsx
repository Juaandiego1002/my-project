import type { FeaturedProductsBlock as FeaturedProductsBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'

import { Container } from '@/components/Container'
import { ProductCard } from '@/components/ProductCard'
import { Section } from '@/components/Section'

export const FeaturedProductsBlock: React.FC<
  FeaturedProductsBlockProps & {
    id?: string | number
  }
> = async ({
  heading = 'Productos Destacados',
  limit = 8,
  linkLabel = 'Ver todo el catálogo',
  linkUrl = '/shop',
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: products } = await payload.find({
    collection: 'products',
    depth: 1,
    limit: limit || 8,
    overrideAccess: false,
    sort: '-createdAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return (
    <Section background="gray">
      <Container>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-heading text-3xl font-bold text-gray-900">{heading}</h2>
          {linkUrl && linkLabel ? (
            <Link
              className="group inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 sm:self-auto"
              href={linkUrl}
            >
              {linkLabel}
              <svg
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </Link>
          ) : null}
        </div>

        {products.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-gray-600">Próximamente más productos</p>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-dark hover:underline"
              href={linkUrl || '/shop'}
            >
              Ver catálogo completo
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
