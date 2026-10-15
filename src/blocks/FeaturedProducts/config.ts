import type { Block } from 'payload'

export const FeaturedProducts: Block = {
  slug: 'featuredProducts',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Productos Destacados',
      label: 'Título',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        step: 1,
      },
      defaultValue: 8,
      label: 'Número de productos',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'linkLabel',
          type: 'text',
          admin: {
            width: '50%',
          },
          defaultValue: 'Ver todo el catálogo',
          label: 'Texto del enlace',
        },
        {
          name: 'linkUrl',
          type: 'text',
          admin: {
            width: '50%',
          },
          defaultValue: '/shop',
          label: 'URL del enlace',
        },
      ],
    },
  ],
  interfaceName: 'FeaturedProductsBlock',
  labels: {
    plural: 'Featured Products',
    singular: 'Featured Products',
  },
}
