'use client'

import type { AboutValuesBlock as AboutValuesBlockProps } from '@/payload-types'
import { Heart, Leaf, Recycle, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { useState } from 'react'

import { Container } from '@/components/Container'
import { cn } from '@/utilities/cn'

const ICONS = {
  leaf: Leaf,
  sparkles: Sparkles,
  heart: Heart,
  shield: ShieldCheck,
  recycle: Recycle,
  users: Users,
}

const COLORS: Record<string, string> = {
  green: 'bg-green-50 text-brand-dark',
  emerald: 'bg-emerald-50 text-emerald-700',
  pink: 'bg-pink-50 text-pink-700',
  blue: 'bg-blue-50 text-blue-700',
  teal: 'bg-teal-50 text-teal-700',
  purple: 'bg-purple-50 text-purple-700',
}

type Value = NonNullable<AboutValuesBlockProps['items']>[number]

export const AboutValuesClient: React.FC<
  AboutValuesBlockProps & {
    id?: string | number
  }
> = ({ heading, intro, items }) => {
  const values = items ?? []
  const [activeValue, setActiveValue] = useState<Value | undefined>(values[0])

  if (!values.length) return null

  const active = activeValue ?? values[0]
  const ActiveIcon = ICONS[active.icon as keyof typeof ICONS] ?? Leaf
  const activeColor = COLORS[active.color ?? 'green'] ?? COLORS.green

  return (
    <Container>
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">{heading}</h2>
        {intro ? <p className="mt-4 text-lg text-gray-600">{intro}</p> : null}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {values.map((value, index) => {
            const Icon = ICONS[value.icon as keyof typeof ICONS] ?? Leaf
            const isActive = active.id === value.id || active.title === value.title
            return (
              <button
                key={value.id ?? index}
                onClick={() => setActiveValue(value)}
                type="button"
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
                    COLORS[value.color ?? 'green'] ?? COLORS.green,
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
                  activeColor,
                )}
              >
                <ActiveIcon className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900">{active.title}</h3>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">{active.description}</p>
          </div>
        </div>
      </div>
    </Container>
  )
}
