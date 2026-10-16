import type { Footer as FooterType } from '@/payload-types'

import { Contact } from '@/components/Footer/contact'
import { FooterMenu } from '@/components/Footer/menu'
import { SocialLinks } from '@/components/Footer/social-links'
import { Logo } from '@/components/Header/Logo'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React, { Suspense } from 'react'

const DEFAULT_BRAND_NAME = "NATURALVER'S"

export async function Footer() {
  const footer: FooterType = await getCachedGlobal('footer', 1)()
  const menu = footer.navItems || []
  const currentYear = new Date().getFullYear()
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'

  const brandName = footer.brandName || DEFAULT_BRAND_NAME

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

          <Contact contact={footer.contact} />

          <div className="flex flex-col gap-6">
            <SocialLinks links={footer.socialLinks} />
            <ThemeSelector />
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} {brandName}. Por un mundo mejor.
          </p>
        </div>
      </div>
    </footer>
  )
}
