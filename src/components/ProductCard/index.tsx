'use client'

import type { Media, Product } from '@/payload-types'

import { Price } from '@/components/Price'
import { StarRating } from '@/components/StarRating'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { toast } from 'sonner'

type Props = {
  product: Partial<Product>
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addItem, isLoading } = useCart()

  const gallery = product.gallery || []
  const imageResource = gallery[0]?.image
  const image =
    imageResource && typeof imageResource === 'object' ? (imageResource as Media) : undefined
  const imageSrc = image?.url || '/placeholder-product.jpg'
  const alt = image?.alt || product.title || ''

  let price = product.priceInUSD

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (variant && typeof variant === 'object' && typeof variant.priceInUSD === 'number') {
      price = variant.priceInUSD
    }
  }

  const compareAtPrice = product.compareAtPrice

  const discount =
    typeof price === 'number' && typeof compareAtPrice === 'number' && price < compareAtPrice
      ? Math.round((1 - price / compareAtPrice) * 100)
      : 0

  const stock = product.inventory ?? 0
  const canQuickAdd = !product.enableVariants && stock > 0
  const href = `/products/${product.slug}`

  const handleAdd = useCallback(async () => {
    if (!product.id) return

    try {
      await addItem({ product: product.id })
      toast.success('Producto agregado al carrito')
    } catch {
      toast.error('No se pudo agregar al carrito')
    }
  }, [addItem, product.id])

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-xl bg-gray-100">
        <Link
          aria-label={product.title || undefined}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
          href={href}
        >
          <Image
            alt={alt}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            height={400}
            loading="lazy"
            quality={90}
            src={imageSrc}
            width={400}
          />
        </Link>

        {discount > 0 ? (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        ) : null}

        {product.newArrival ? (
          <span className="absolute right-3 top-3 rounded-full bg-brand-dark px-2 py-1 text-xs font-bold text-white">
            Nuevo
          </span>
        ) : null}

        {canQuickAdd ? (
          <div className="absolute bottom-3 right-3 z-10 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 motion-reduce:transition-none">
            <button
              aria-label={`Agregar ${product.title} al carrito`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-dark shadow-lg hover:bg-brand-dark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 disabled:opacity-60"
              disabled={isLoading}
              onClick={handleAdd}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.29 2.29c-.63.63-.17 1.7.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-3">
        <h3 className="font-heading font-semibold text-gray-900 transition-colors group-hover:text-brand-dark">
          <Link className="focus:outline-none focus-visible:underline" href={href}>
            {product.title}
          </Link>
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <StarRating rating={product.rating || 4.5} size="sm" />
          <span className="text-xs text-gray-400">({product.reviewCount || 0})</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          {typeof price === 'number' && (
            <Price amount={price} as="span" className="text-lg font-bold text-brand-dark" />
          )}
          {typeof compareAtPrice === 'number' && (
            <Price
              amount={compareAtPrice}
              as="span"
              className="text-sm text-gray-400 line-through"
            />
          )}
        </div>
      </div>
    </div>
  )
}
