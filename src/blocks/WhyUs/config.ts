import type { Block } from 'payload'

export const WhyUs: Block = {
  slug: 'whyUs',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: '¿Por qué elegirnos?',
      label: 'Título',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              admin: {
                width: '40%',
              },
              defaultValue: 'leaf',
              options: [
                { label: 'Hoja', value: 'leaf' },
                { label: 'Mundo', value: 'globe' },
                { label: 'Corazón', value: 'heart' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              admin: {
                width: '60%',
              },
              required: true,
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
      label: 'Motivos',
      minRows: 1,
    },
  ],
  interfaceName: 'WhyUsBlock',
  labels: {
    plural: 'Why Us',
    singular: 'Why Us',
  },
}
