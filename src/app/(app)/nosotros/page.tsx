import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { AboutStats } from '@/components/about/AboutStats'
import { ValuesExplorer } from '@/components/about/ValuesExplorer'

export const metadata: Metadata = {
  title: "Nosotros | NATURALVER'S",
  description:
    "Conoce NATURALVER'S. Productos naturales seleccionados con calidad, transparencia y atención humana.",
}

const NosotrosPage = () => {
  return (
    <article className="pb-24">
      <Section className="bg-white pt-10 md:pt-14">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-brand-dark">
                Sobre NATURALVER'S
              </span>
              <h1 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
                Bienestar natural al alcance de todos
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                NATURALVER'S nació de una convicción sencilla: los productos naturales son el futuro
                del bienestar y deberían estar al alcance de cada familia.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Seleccionamos suplementos, cosmética, alimentos y bebidas con ingredientes honestos,
                probados por nosotros antes de llegar a tus manos.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-md bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark/90"
                >
                  Ver catálogo
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-md border border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-green-50"
                >
                  Contactanos
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src="/placeholder-product.jpg"
                  alt="Productos naturales NATURALVER'S"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-6 shadow-xl lg:block">
                <div className="font-heading text-3xl font-bold text-brand-dark">100%</div>
                <div className="text-sm font-medium text-gray-900">Productos naturales</div>
                <div className="text-xs text-gray-500">Seleccionados con criterio</div>
              </div>
            </div>
          </div>

          <AboutStats />

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Nuestra historia
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Comenzamos buscando para nosotros lo que luego quisimos ofrecer a otros: productos
                naturales de verdad, con listas de ingredientes que se entienden y orígenes que se
                pueden rastrear. Así nació NATURALVER'S, una tienda hecha por gente que usa lo que
                vende.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Cada producto pasa por una revisión cuidadosa: composición, proveedor,
                sostenibilidad y, sobre todo, si nosotros lo llevaríamos a nuestra propia casa.
              </p>
            </div>
            <div>
              <div className="rounded-2xl border border-gray-100 bg-green-50 p-8">
                <h3 className="font-heading text-2xl font-bold text-brand-dark">Nuestra misión</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Ofrecer productos naturales seleccionados, con calidad, transparencia y precios
                  justos, para que cada hogar pueda cuidarse sin complicaciones.
                </p>
                <h3 className="mt-8 font-heading text-2xl font-bold text-brand-dark">
                  Nuestra visión
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Ser la tienda de productos naturales en la que las familias confían: un lugar al
                  que se vuelve no por costumbre, sino porque cada producto cumple lo que promete.
                </p>
              </div>
            </div>
          </div>

          <ValuesExplorer />

          <div className="mt-16 rounded-2xl bg-brand-dark px-8 py-12 text-center md:px-12">
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              ¿Listo para empezar tu camino hacia el bienestar?
            </h2>
            <p className="mt-4 text-lg text-green-100">
              Descubre nuestro catálogo de productos naturales seleccionados especialmente para ti
            </p>
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-green-50"
              >
                Explorar productos
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  )
}

export default NosotrosPage
