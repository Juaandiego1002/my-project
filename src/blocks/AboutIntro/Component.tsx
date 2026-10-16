import type { AboutIntroBlock as AboutIntroBlockProps } from '@/payload-types'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { Section } from '@/components/Section'

export const AboutIntroBlock: React.FC<
  AboutIntroBlockProps & {
    id?: string | number
  }
> = ({ badge, heading, paragraphs, links, media, mediaAlt, stat }) => {
  return (
    <Section className="bg-white pt-10 md:pt-14">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            {badge ? (
              <span className="mb-4 inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-brand-dark">
                {badge}
              </span>
            ) : null}
            <h1 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              {heading}
            </h1>
            {paragraphs?.map((paragraph, index) => (
              <p
                className={index === 0 ? 'mt-6 text-lg leading-relaxed text-gray-600' : 'mt-4 text-lg leading-relaxed text-gray-600'}
                key={paragraph.id ?? index}
              >
                {paragraph.text}
              </p>
            ))}
            {links && links.length > 0 ? (
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                {links.map(({ link }, index) => (
                  <CMSLink
                    className="inline-flex items-center justify-center"
                    key={index}
                    size="lg"
                    {...link}
                  />
                ))}
              </div>
            ) : null}
          </div>
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
              {media ? (
                <Media
                  alt={mediaAlt || undefined}
                  fill
                  imgClassName="h-full w-full object-cover"
                  resource={media}
                />
              ) : null}
            </div>
            {stat?.value || stat?.label ? (
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-6 shadow-xl lg:block">
                {stat.value ? (
                  <div className="font-heading text-3xl font-bold text-brand-dark">{stat.value}</div>
                ) : null}
                {stat.label ? (
                  <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                ) : null}
                {stat.description ? (
                  <div className="text-xs text-gray-500">{stat.description}</div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  )
}
