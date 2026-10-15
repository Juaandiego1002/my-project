import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import React from 'react'

interface Props {
  menu: Footer['navItems']
}

export function FooterMenu({ menu }: Props) {
  if (!menu?.length) return null

  return (
    <nav>
      <h3 className="mb-3 text-sm font-heading font-semibold text-gray-900">Enlaces</h3>
      <ul className="space-y-2">
        {menu.map((item) => {
          return (
            <li key={item.id}>
              <CMSLink
                appearance="inline"
                {...item.link}
                className="text-sm text-gray-500 transition-colors hover:text-brand-dark"
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
