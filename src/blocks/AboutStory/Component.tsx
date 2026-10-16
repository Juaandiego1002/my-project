import type { AboutStoryBlock as AboutStoryBlockProps } from '@/payload-types'
import React from 'react'

import { Container } from '@/components/Container'
import { RichText } from '@/components/RichText'

const bodyClassName =
  'max-w-none [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-gray-600 [&_p+p]:mt-4'

export const AboutStoryBlock: React.FC<
  AboutStoryBlockProps & {
    id?: string | number
  }
> = ({ historyHeading, history, missionHeading, missionBody, visionHeading, visionBody }) => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          {historyHeading ? (
            <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              {historyHeading}
            </h2>
          ) : null}
          {history ? (
            <RichText className={`mt-6 ${bodyClassName}`} data={history} enableGutter={false} enableProse={false} />
          ) : null}
        </div>
        <div>
          <div className="rounded-2xl border border-gray-100 bg-green-50 p-8">
            {missionHeading ? (
              <h3 className="font-heading text-2xl font-bold text-brand-dark">{missionHeading}</h3>
            ) : null}
            {missionBody ? (
              <RichText
                className={`mt-4 ${bodyClassName} [&_p]:text-gray-700`}
                data={missionBody}
                enableGutter={false}
                enableProse={false}
              />
            ) : null}
            {visionHeading ? (
              <h3 className="mt-8 font-heading text-2xl font-bold text-brand-dark">
                {visionHeading}
              </h3>
            ) : null}
            {visionBody ? (
              <RichText
                className={`mt-4 ${bodyClassName} [&_p]:text-gray-700`}
                data={visionBody}
                enableGutter={false}
                enableProse={false}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Container>
  )
}
