import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/cn'

export const CallToActionBlock: React.FC<
  CTABlockProps & {
    id?: string | number
    className?: string
  }
> = ({ appearance = 'default', className, links, richText }) => {
  if (appearance === 'highlight') {
    return (
      <div className={cn('container', className)}>
        <div className="rounded-2xl bg-brand-dark px-8 py-12 text-center md:px-12">
          {richText ? (
            <RichText
              className="mx-auto max-w-3xl [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:md:text-4xl [&_p]:mt-4 [&_p]:text-lg [&_p]:text-green-100"
              data={richText}
              enableGutter={false}
              enableProse={false}
            />
          ) : null}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {(links || []).map(({ link }, i) => {
              return (
                <CMSLink
                  className="inline-flex items-center justify-center bg-white px-8 py-3 font-semibold text-brand-dark hover:bg-green-50"
                  key={i}
                  {...link}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('container', className)}>
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-3xl flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
