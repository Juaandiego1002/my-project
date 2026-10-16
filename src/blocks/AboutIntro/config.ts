import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const AboutIntro: Block = {
  slug: 'aboutIntro',
  interfaceName: 'AboutIntroBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Etiqueta',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Párrafos',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
          required: true,
        },
      ],
      minRows: 1,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'media',
          type: 'upload',
          label: 'Imagen',
          relationTo: 'media',
          admin: {
            width: '60%',
          },
        },
        {
          name: 'mediaAlt',
          type: 'text',
          label: 'Texto alternativo',
          admin: {
            width: '40%',
          },
        },
      ],
    },
    {
      name: 'stat',
      type: 'group',
      label: 'Tarjeta flotante',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Valor',
              admin: {
                width: '40%',
              },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Etiqueta',
              admin: {
                width: '60%',
              },
            },
          ],
        },
        {
          name: 'description',
          type: 'text',
          label: 'Descripción',
        },
      ],
    },
  ],
  labels: {
    plural: 'Intro Nosotros',
    singular: 'Intro Nosotros',
  },
}
