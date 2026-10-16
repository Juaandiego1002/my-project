# Proposal

## Why

La página `/nosotros` está hardcodeada en `src/app/(app)/nosotros/page.tsx`: todo su contenido (textos, stats, valores, CTAs) vive en código, así que cualquier edición de copy requiere un despliegue y no pasa por el admin de Payload. El proyecto ya tiene una colección `Pages` con bloques, SEO, drafts y revalidación — la página debería aprovechar esa infraestructura como el resto del sitio.

## What Changes

- Se elimina la ruta hardcodeada `src/app/(app)/nosotros/page.tsx` y `/nosotros` pasa a resolverse dinámicamente vía `src/app/(app)/[slug]/page.tsx` con un documento `pages` de slug `nosotros`.
- Se crea el documento de página en la colección `Pages` (hero, layout de bloques, SEO) reproduciendo el contenido y el diseño actuales.
- Se añaden bloques nuevos a la colección `Pages` para las secciones que hoy no tienen equivalente administrable:
  - Bloque de intro "sobre nosotros" (badge, título, párrafos, botones, imagen con card flotante).
  - Bloque de stats (`AboutStats` → datos 100% editables).
  - Bloque de valores (`ValuesExplorer` → título, intro, lista de valores con icono/color/descripción).
  - Bloque de historia + misión/visión (dos columnas de texto administrables).
- Las secciones con equivalente existente (CTA final) reutilizan bloques ya registrados (`cta`).
- Se registra la página en el seed (`nosotrosPageData`) para que entornos nuevos la tengan creada.
- Se mantiene la paridad visual con la página actual y el SEO (título/descripción) administrable desde la pestaña SEO de la página.

## Capabilities

### New Capabilities

- `about-page`: comportamiento de la página `/nosotros`: servida desde la colección `Pages` con todo su contenido administrable (intro, stats, historia/misión/visión, valores, CTA), resuelta por slug dinámico, con SEO y estado publicado controlados desde el admin.

### Modified Capabilities

<!-- Ninguna: el proyecto aún no tiene specs existentes. -->

## Impact

- **Código eliminado**: `src/app/(app)/nosotros/page.tsx` (ruta estática — al borrarla, `[slug]` atiende `/nosotros`).
- **Código nuevo**: 3-4 bloques en `src/blocks/<Nombre>/{config.ts,Component.tsx}` + registro en `src/collections/Pages/index.ts` y `src/blocks/RenderBlocks.tsx`; componente cliente adaptado para los valores (ya existe `ValuesExplorer` como `'use client'`).
- **Componentes existentes**: `src/components/about/AboutStats.tsx` y `src/components/about/ValuesExplorer.tsx` se re convierten en componentes de bloque (reciben props en vez de data estática) o se reemplazan.
- **Seed**: `src/endpoints/seed/index.ts` + nuevo `src/endpoints/seed/nosotros-page.ts`.
- **Tipos**: regenerar `src/payload-types.ts` (`pnpm generate:types`) por los nuevos bloques.
- **Sin cambios de URL**: `/nosotros` sigue siendo la ruta pública; no hay links internos hardcodeados a esa ruta (la nav se configura desde el global `header`).
