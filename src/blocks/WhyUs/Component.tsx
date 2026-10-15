import type { WhyUsBlock as WhyUsBlockProps } from '@/payload-types'
import React from 'react'

import { Container } from '@/components/Container'
import { Section } from '@/components/Section'

const ICONS: Record<string, React.ReactNode> = {
  leaf: (
    <>
      <path d="M5 19C5 9 11 5 19 5c0 8-6 14-14 14z" />
      <path d="M5 19L19 5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.7 3 2.7 15 0 18" />
      <path d="M12 3c-2.7 3-2.7 15 0 18" />
    </>
  ),
  heart: (
    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  ),
}

export const WhyUsBlock: React.FC<
  WhyUsBlockProps & {
    id?: string | number
  }
> = ({ heading = '¿Por qué elegirnos?', items }) => {
  if (!items?.length) return null

  return (
    <Section background="dark">
      <Container>
        <h2 className="text-center font-heading text-3xl font-bold">{heading}</h2>
        <div className="mt-10 grid gap-10 text-center md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/15">
          {items.map((item, index) => (
            <div className="flex flex-col items-center px-4 md:px-8" key={item.id ?? index}>
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
                <svg
                  aria-hidden="true"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  {ICONS[item.icon ?? 'leaf'] ?? ICONS.leaf}
                </svg>
              </span>
              <h3 className="font-heading text-xl font-semibold text-white">{item.title}</h3>
              {item.description ? (
                <p className="mt-2 max-w-xs text-white/80">{item.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
