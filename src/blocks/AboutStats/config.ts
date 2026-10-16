import type { Block } from 'payload'

export const AboutStats: Block = {
  slug: 'aboutStats',
  interfaceName: 'AboutStatsBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Estadísticas',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              admin: {
                width: '30%',
              },
              defaultValue: 'leaf',
              label: 'Icono',
              options: [
                { label: 'Hoja', value: 'leaf' },
                { label: 'Escudo', value: 'shield' },
                { label: 'Personas', value: 'users' },
                { label: 'Destellos', value: 'sparkles' },
              ],
            },
            {
              name: 'value',
              type: 'text',
              admin: {
                width: '30%',
              },
              label: 'Valor',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              admin: {
                width: '40%',
              },
              label: 'Etiqueta',
              required: true,
            },
          ],
        },
        {
          name: 'description',
          type: 'text',
          label: 'Descripción',
        },
      ],
      minRows: 1,
    },
  ],
  labels: {
    plural: 'Estadísticas Nosotros',
    singular: 'Estadísticas Nosotros',
  },
}
