import type { Footer } from '@/payload-types'

import { FooterMenu } from '@/components/Footer/menu'
import { Logo } from '@/components/Header/Logo'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React, { Suspense } from 'react'

const { COMPANY_NAME, SITE_NAME } = process.env

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const menu = footer.navItems || []
  const currentYear = new Date().getFullYear()
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'

  const copyrightName = COMPANY_NAME || SITE_NAME || "NATURALVER'S"

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4">
              <Logo size="sm" />
            </div>
            <p className="text-sm text-gray-500">
              Por un mundo mejor. Productos naturales para tu bienestar.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex flex-col gap-2">
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
              </div>
            }
          >
            <FooterMenu menu={menu} />
          </Suspense>

          <div>
            <h3 className="mb-3 text-sm font-heading font-semibold text-gray-900">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-500">
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
                    strokeWidth={2}
                    d="M3 8l8-5 8 5-8 5-8-5z"
                  />
                </svg>
                info@naturalvers.com
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <ThemeSelector />
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} {copyrightName}. Por un mundo mejor.
          </p>
        </div>
      </div>
    </footer>
  )
}
