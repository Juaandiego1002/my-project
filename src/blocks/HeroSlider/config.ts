import type { Block } from 'payload'

export const HeroSlider: Block = {
  slug: 'heroSlider',
  fields: [
    {
      name: 'slides',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'select',
              admin: {
                width: '50%',
              },
              defaultValue: 'custom',
              options: [
                { label: 'Custom', value: 'custom' },
                { label: 'Oferta', value: 'offer' },
                { label: 'Envíos', value: 'shipping' },
                { label: 'Contraentrega', value: 'payment' },
              ],
            },
            {
              name: 'active',
              type: 'checkbox',
              admin: {
                width: '50%',
              },
              defaultValue: true,
              label: 'Activa',
            },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'desktopImage',
          type: 'upload',
          label: 'Imagen escritorio',
          relationTo: 'media',
        },
        {
          name: 'mobileImage',
          type: 'upload',
          label: 'Imagen móvil',
          relationTo: 'media',
        },
        {
          name: 'imageUrl',
          type: 'text',
          admin: {
            description:
              'Ruta/URL directa (ej. /banner1.png) si no subes imagen. Si se deja vacío se usa /bannerN.png.',
          },
          label: 'Imagen (ruta/URL)',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'buttonLabel',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'buttonLink',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'note',
          type: 'text',
        },
        {
          name: 'showSocialLinks',
          type: 'checkbox',
          label: 'Mostrar redes sociales',
        },
      ],
      label: 'Diapositivas',
      minRows: 1,
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'tiktok', type: 'text' },
      ],
      label: 'Redes sociales',
    },
  ],
  interfaceName: 'HeroSliderBlock',
  labels: {
    plural: 'Hero Sliders',
    singular: 'Hero Slider',
  },
}
