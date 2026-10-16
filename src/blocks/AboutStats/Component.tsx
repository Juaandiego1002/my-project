import type { AboutStatsBlock as AboutStatsBlockProps } from '@/payload-types'
import { Leaf, ShieldCheck, Sparkles, Users } from 'lucide-react'
import React from 'react'

import { Container } from '@/components/Container'

const ICONS = {
  leaf: Leaf,
  shield: ShieldCheck,
  sparkles: Sparkles,
  users: Users,
}

export const AboutStatsBlock: React.FC<
  AboutStatsBlockProps & {
    id?: string | number
  }
> = ({ items }) => {
  if (!items?.length) return null

  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((stat, index) => {
        const Icon = ICONS[stat.icon as keyof typeof ICONS] ?? Leaf
        return (
          <div
            key={stat.id ?? index}
            className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-brand-dark">
              <Icon className="h-6 w-6" />
            </div>
            <div className="font-heading text-3xl font-bold text-brand-dark">{stat.value}</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{stat.label}</div>
            {stat.description ? (
              <div className="mt-1 text-xs text-gray-500">{stat.description}</div>
            ) : null}
          </div>
        )
      })}
      </div>
    </Container>
  )
}
