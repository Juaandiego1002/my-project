import type { AboutValuesBlock as AboutValuesBlockProps } from '@/payload-types'
import React from 'react'

import { AboutValuesClient } from './Component.client'

export const AboutValuesBlock: React.FC<
  AboutValuesBlockProps & {
    id?: string | number
  }
> = (props) => {
  return <AboutValuesClient {...props} />
}
