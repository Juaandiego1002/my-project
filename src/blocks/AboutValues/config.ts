import type { Block } from 'payload'

export const AboutValues: Block = {
  slug: 'aboutValues',
  interfaceName: 'AboutValuesBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Nuestros valores',
      label: 'Título',
      required: true,
    },
    {
      name: 'intro',
      type: 'text',
      label: 'Introducción',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Valores',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              admin: {
                width: '35%',
              },
              defaultValue: 'leaf',
              label: 'Icono',
              options: [
                { label: 'Hoja', value: 'leaf' },
                { label: 'Destellos', value: 'sparkles' },
                { label: 'Corazón', value: 'heart' },
                { label: 'Escudo', value: 'shield' },
                { label: 'Reciclaje', value: 'recycle' },
                { label: 'Personas', value: 'users' },
              ],
            },
            {
              name: 'color',
              type: 'select',
              admin: {
                width: '30%',
              },
              defaultValue: 'green',
              label: 'Color',
              options: [
                { label: 'Verde', value: 'green' },
                { label: 'Esmeralda', value: 'emerald' },
                { label: 'Rosa', value: 'pink' },
                { label: 'Azul', value: 'blue' },
                { label: 'Turquesa', value: 'teal' },
                { label: 'Morado', value: 'purple' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              admin: {
                width: '35%',
              },
              label: 'Título',
              required: true,
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
          required: true,
        },
      ],
      minRows: 1,
    },
  ],
  labels: {
    plural: 'Valores Nosotros',
    singular: 'Valores Nosotros',
  },
}
