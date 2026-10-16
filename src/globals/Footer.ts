import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { link } from '@/fields/link'
import { revalidateGlobal } from './hooks/revalidateGlobal'

const validateUrl = (value: unknown) => {
  if (typeof value !== 'string' || value.trim().length === 0) return true

  const isValid = (() => {
    try {
      const url = new URL(value)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return false
    }
  })()

  return isValid ? true : 'La URL debe ser un enlace válido que empiece por http:// o https://'
}

const validateWhatsapp = (value: unknown) => {
  if (typeof value !== 'string' || value.trim().length === 0) return true

  return value.replace(/\D/g, '').length >= 8
    ? true
    : 'Ingresa un número con al menos 8 dígitos, incluyendo el código de país'
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: adminOnly,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contacto',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Correo electrónico',
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp',
          admin: {
            description:
              'Número internacional, por ejemplo +57 310 6198912. Solo se usan los dígitos para el enlace de WhatsApp.',
          },
          validate: validateWhatsapp,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Redes sociales',
      labels: {
        singular: 'Red social',
        plural: 'Redes sociales',
      },
      maxRows: 6,
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Plataforma',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'X', value: 'x' },
            { label: 'Otra', value: 'other' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
          admin: {
            description: 'Debe empezar por http:// o https://',
          },
          validate: validateUrl,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Etiqueta',
          admin: {
            description: 'Nombre accesible para la red (obligatorio si eliges "Otra").',
          },
        },
      ],
    },
    {
      name: 'brandName',
      type: 'text',
      label: 'Nombre de marca',
      defaultValue: "NATURALVER'S",
    },
  ],
}
