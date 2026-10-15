'use client'

import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

import type { Header } from 'src/payload-types'

import { HeaderSearch } from './HeaderSearch'
import { Logo } from './Logo'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 z-40 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-[57px] w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="-ml-1 flex h-8 w-8 items-center justify-center text-brand-dark md:hidden"
        >
          {menuOpen ? (
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        <Link href="/" className="flex shrink-0 items-center" aria-label="NATURALVER'S - Inicio">
          <Logo priority />
        </Link>

        {menu.length ? (
          <nav
            className="ml-auto hidden items-center gap-6 md:flex"
            aria-label="Navegación principal"
          >
            {menu.map((item) => {
              const active =
                item.link?.url && item.link.url !== '/' ? pathname.includes(item.link.url) : false

              return (
                <CMSLink
                  key={item.id}
                  {...item.link}
                  appearance="inline"
                  className={cn(
                    'text-[12px] font-normal leading-[16px] text-[#6B7A6E] transition-colors hover:text-brand-dark',
                    { 'text-brand-dark': active },
                  )}
                />
              )
            })}
          </nav>
        ) : null}

        <HeaderSearch className="ml-auto hidden w-56 md:block lg:w-64" />

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Buscar"
            className="flex items-center justify-center text-brand-dark md:hidden"
          >
            <svg
              className="h-[14.5px] w-[14.5px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </button>

          <Suspense fallback={<OpenCartButton />}>
            <Cart />
          </Suspense>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
        />
      )}

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navegación móvil"
          className="absolute left-0 right-0 top-full border-b border-gray-100 bg-white shadow-lg md:hidden"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-1 py-3">
              <HeaderSearch className="mb-1" onSearch={() => setMenuOpen(false)} />
              {menu.map((item) => (
                <CMSLink
                  key={item.id}
                  {...item.link}
                  appearance="inline"
                  className="rounded px-2 py-2 text-[13px] leading-[18px] text-[#6B7A6E] transition-colors hover:bg-gray-50 hover:text-brand-dark"
                />
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
