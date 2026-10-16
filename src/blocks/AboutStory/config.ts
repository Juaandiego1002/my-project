import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const AboutStory: Block = {
  slug: 'aboutStory',
  interfaceName: 'AboutStoryBlock',
  fields: [
    {
      name: 'historyHeading',
      type: 'text',
      defaultValue: 'Nuestra historia',
      label: 'Título de la historia',
      required: true,
    },
    {
      name: 'history',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Historia',
    },
    {
      name: 'missionHeading',
      type: 'text',
      defaultValue: 'Nuestra misión',
      label: 'Título de la misión',
      required: true,
    },
    {
      name: 'missionBody',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Misión',
    },
    {
      name: 'visionHeading',
      type: 'text',
      defaultValue: 'Nuestra visión',
      label: 'Título de la visión',
      required: true,
    },
    {
      name: 'visionBody',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Visión',
    },
  ],
  labels: {
    plural: 'Historia Nosotros',
    singular: 'Historia Nosotros',
  },
}
