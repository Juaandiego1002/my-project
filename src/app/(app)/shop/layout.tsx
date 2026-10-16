import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { sorting } from '@/lib/constants'
import { Search } from '@/components/Search'
import React, { Suspense } from 'react'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="container my-12 pb-16 md:my-16">
        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-heading text-3xl text-brand-dark md:text-4xl">Tienda</h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Productos naturales seleccionados para tu bienestar
            </p>
          </div>

          <Search className="w-full md:w-80 md:flex-none" />
        </header>

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
          <aside className="w-full flex-none md:sticky md:top-24 md:w-60">
            <div className="flex flex-col gap-8">
              <Categories />
              <FilterList list={sorting} title="Ordenar por" />
            </div>
          </aside>

          <div className="min-h-[60vh] w-full min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </Suspense>
  )
}
