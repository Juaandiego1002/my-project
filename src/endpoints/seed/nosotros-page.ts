import type { AboutStoryBlock, Media } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type NosotrosArgs = {
  introImage?: Media
}

type RichTextValue = NonNullable<AboutStoryBlock['history']>

const textNode = (text: string) => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

const paragraph = (text: string) => ({
  type: 'paragraph',
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const heading = (tag: 'h1' | 'h2' | 'h3' | 'h4', text: string) => ({
  type: 'heading',
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  version: 1,
})

const richText = (
  nodes: Array<ReturnType<typeof paragraph> | ReturnType<typeof heading>>,
): RichTextValue =>
  ({
    root: {
      type: 'root',
      children: nodes,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }) as unknown as RichTextValue

export const nosotrosPageData: (args: NosotrosArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  introImage,
}) => {
  return {
    slug: 'nosotros',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'aboutIntro',
        badge: "Sobre NATURALVER'S",
        heading: 'Bienestar natural al alcance de todos',
        paragraphs: [
          {
            text: "NATURALVER'S nació de una convicción sencilla: los productos naturales son el futuro del bienestar y deberían estar al alcance de cada familia.",
          },
          {
            text: 'Seleccionamos suplementos, cosmética, alimentos y bebidas con ingredientes honestos, probados por nosotros antes de llegar a tus manos.',
          },
        ],
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Ver catálogo',
              url: '/shop',
            },
          },
          {
            link: {
              type: 'custom',
              appearance: 'outline',
              label: 'Contactanos',
              url: '/contacto',
            },
          },
        ],
        ...(introImage ? { media: introImage } : {}),
        mediaAlt: "Productos naturales NATURALVER'S",
        stat: {
          value: '100%',
          label: 'Productos naturales',
          description: 'Seleccionados con criterio',
        },
      },
      {
        blockType: 'aboutStats',
        items: [
          {
            icon: 'leaf',
            value: '100%',
            label: 'Productos naturales',
            description: 'Seleccionados con ingredientes honestos',
          },
          {
            icon: 'shield',
            value: '100%',
            label: 'Calidad garantizada',
            description: 'Revisados antes de llegar a tus manos',
          },
          {
            icon: 'users',
            value: '100%',
            label: 'Atención humana',
            description: 'Te ayudamos en cada paso',
          },
          {
            icon: 'sparkles',
            value: '100%',
            label: 'Bienestar real',
            description: 'Productos que realmente usamos',
          },
        ],
      },
      {
        blockType: 'aboutStory',
        historyHeading: 'Nuestra historia',
        history: richText([
          paragraph(
            "Comenzamos buscando para nosotros lo que luego quisimos ofrecer a otros: productos naturales de verdad, con listas de ingredientes que se entienden y orígenes que se pueden rastrear. Así nació NATURALVER'S, una tienda hecha por gente que usa lo que vende.",
          ),
          paragraph(
            'Cada producto pasa por una revisión cuidadosa: composición, proveedor, sostenibilidad y, sobre todo, si nosotros lo llevaríamos a nuestra propia casa.',
          ),
        ]),
        missionHeading: 'Nuestra misión',
        missionBody: richText([
          paragraph(
            'Ofrecer productos naturales seleccionados, con calidad, transparencia y precios justos, para que cada hogar pueda cuidarse sin complicaciones.',
          ),
        ]),
        visionHeading: 'Nuestra visión',
        visionBody: richText([
          paragraph(
            'Ser la tienda de productos naturales en la que las familias confían: un lugar al que se vuelve no por costumbre, sino porque cada producto cumple lo que promete.',
          ),
        ]),
      },
      {
        blockType: 'aboutValues',
        heading: 'Nuestros valores',
        intro: 'Los principios que guían cada producto que seleccionamos',
        items: [
          {
            icon: 'leaf',
            color: 'green',
            title: 'Naturalidad',
            description:
              'Priorizamos ingredientes naturales y mínimamente procesados. Creemos que lo simple suele ser lo más efectivo.',
          },
          {
            icon: 'sparkles',
            color: 'emerald',
            title: 'Autenticidad',
            description:
              'Solo ofrecemos productos en los que creemos. Si nosotros no los usaríamos, no los ponemos en nuestro catálogo.',
          },
          {
            icon: 'heart',
            color: 'pink',
            title: 'Cuidado',
            description:
              'Cuidamos cada detalle: desde la selección del producto hasta la atención que recibes con tu pedido.',
          },
          {
            icon: 'shield',
            color: 'blue',
            title: 'Confianza',
            description:
              'Transparencia total en ingredientes, precios justos y honestidad en cada recomendación.',
          },
          {
            icon: 'recycle',
            color: 'teal',
            title: 'Sostenibilidad',
            description:
              'Buscamos marcas con compromiso ambiental y empaques más responsables siempre que es posible.',
          },
          {
            icon: 'users',
            color: 'purple',
            title: 'Comunidad',
            description:
              'Creemos en crecer junto a nuestras clientas y clientes, compartiendo conocimiento sobre bienestar natural.',
          },
        ],
      },
      {
        blockType: 'cta',
        appearance: 'highlight',
        richText: richText([
          heading('h2', '¿Listo para empezar tu camino hacia el bienestar?'),
          paragraph(
            'Descubre nuestro catálogo de productos naturales seleccionados especialmente para ti',
          ),
        ]),
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Explorar productos',
              url: '/shop',
            },
          },
        ],
      },
    ],
    meta: {
      title: "Nosotros | NATURALVER'S",
      description:
        "Conoce NATURALVER'S. Productos naturales seleccionados con calidad, transparencia y atención humana.",
      ...(introImage ? { image: introImage } : {}),
    },
    title: 'Nosotros',
  }
}
