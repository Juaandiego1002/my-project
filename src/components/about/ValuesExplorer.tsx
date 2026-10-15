'use client'

import { useState } from 'react'
import { Leaf, Heart, ShieldCheck, Recycle, Users, Sparkles } from 'lucide-react'
import { cn } from '@/utilities/cn'

const values = [
  {
    id: 'natural',
    title: 'Naturalidad',
    icon: Leaf,
    description:
      'Priorizamos ingredientes naturales y mínimamente procesados. Creemos que lo simple suele ser lo más efectivo.',
    color: 'bg-green-50 text-brand-dark',
  },
  {
    id: 'authenticity',
    title: 'Autenticidad',
    icon: Sparkles,
    description:
      'Solo ofrecemos productos en los que creemos. Si nosotros no los usaríamos, no los ponemos en nuestro catálogo.',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 'care',
    title: 'Cuidado',
    icon: Heart,
    description:
      'Cuidamos cada detalle: desde la selección del producto hasta la atención que recibes con tu pedido.',
    color: 'bg-pink-50 text-pink-700',
  },
  {
    id: 'trust',
    title: 'Confianza',
    icon: ShieldCheck,
    description:
      'Transparencia total en ingredientes, precios justos y honestidad en cada recomendación.',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    id: 'sustainability',
    title: 'Sostenibilidad',
    icon: Recycle,
    description:
      'Buscamos marcas con compromiso ambiental y empaques más responsables siempre que es posible.',
    color: 'bg-teal-50 text-teal-700',
  },
  {
    id: 'community',
    title: 'Comunidad',
    icon: Users,
    description:
      'Creemos en crecer junto a nuestras clientas y clientes, compartiendo conocimiento sobre bienestar natural.',
    color: 'bg-purple-50 text-purple-700',
  },
]

export const ValuesExplorer = () => {
  const [activeValue, setActiveValue] = useState(values[0])

  return (
    <section className="mt-16">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Nuestros valores
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Los principios que guían cada producto que seleccionamos
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon
            const isActive = activeValue.id === value.id
            return (
              <button
                key={value.id}
                onClick={() => setActiveValue(value)}
                className={cn(
                  'group flex flex-col items-center gap-3 rounded-xl border p-4 transition-all hover:shadow-md',
                  isActive
                    ? 'border-brand-dark bg-green-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300',
                )}
              >
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full',
                    value.color,
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-gray-900">{value.title}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'flex h-16 w-16 items-center justify-center rounded-full',
                  activeValue.color,
                )}
              >
                <activeValue.icon className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900">{activeValue.title}</h3>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">{activeValue.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
