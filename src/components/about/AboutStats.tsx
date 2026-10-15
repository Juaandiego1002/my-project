import { Leaf, ShieldCheck, Users, Sparkles } from 'lucide-react'

const stats = [
  {
    icon: Leaf,
    value: '100%',
    label: 'Productos naturales',
    description: 'Seleccionados con ingredientes honestos',
  },
  {
    icon: ShieldCheck,
    value: '100%',
    label: 'Calidad garantizada',
    description: 'Revisados antes de llegar a tus manos',
  },
  {
    icon: Users,
    value: '100%',
    label: 'Atención humana',
    description: 'Te ayudamos en cada paso',
  },
  {
    icon: Sparkles,
    value: '100%',
    label: 'Bienestar real',
    description: 'Productos que realmente usamos',
  },
]

export const AboutStats = () => {
  return (
    <section className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-brand-dark">
              <Icon className="h-6 w-6" />
            </div>
            <div className="font-heading text-3xl font-bold text-brand-dark">{stat.value}</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{stat.label}</div>
            <div className="mt-1 text-xs text-gray-500">{stat.description}</div>
          </div>
        )
      })}
    </section>
  )
}
