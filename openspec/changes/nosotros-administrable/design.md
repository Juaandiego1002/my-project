# Design

## Context

`/nosotros` es hoy una ruta estática de Next.js con copy embebido y dos componentes con data hardcodeada (`AboutStats`, `ValuesExplorer` — este último cliente con `useState`). El storefront ya resuelve todo el contenido vía `[slug]/page.tsx`, que renderiza `RenderHero` + `RenderBlocks` desde la colección `Pages` (bloques, SEO plugin, drafts, `revalidatePage`). Ver proposal.md - Why.

Detalle relevante: `[slug]` tiene prioridad sobre las rutas estáticas de Next, pero una ruta estática `/nosotros/page.tsx` gana sobre `[slug]` — por eso hay que eliminar el archivo para que el slug dinámico atienda la URL.

## Goals / Non-Goals

**Goals:**
- Paridad visual funcional con la página actual: mismas secciones, mismo orden, mismo estilo.
- Todo el copy, imagen y lista (stats/valores) editable desde el admin sin tocar código.
- URL pública `/nosotros` y metadatos por defecto sin cambios observables.

**Non-Goals:**
- Rehacer el diseño visual de la página (solo conversión a contenido administrable).
- Añadir enlaces de navegación al global `header`/`footer` (la nav ya es administrable y hoy no enlaza a `/nosotros`).
- Migrar otras rutas estáticas (`/shop`, `/find-order`, etc.) a páginas CMS.
- Cambiar el bloque `cta` existente ni la infraestructura de bloques.

## Decisions

**1. Eliminar la ruta estática y servir `/nosotros` vía `[slug]`.**
- Alternativa A (elegida): borrar `src/app/(app)/nosotros/page.tsx`; el documento `pages` slug `nosotros` lo atiende la ruta dinámica ya existente, con drafts, SEO y revalidación heredados sin código extra.
- Alternativa B: mantener la ruta estática y que haga fetch del documento → dos rutas que compiten por la misma URL y lógica duplicada; rechazada.
- `generateStaticParams` de `[slug]` ya pagina todos los docs `pages` (excepto `home`), así que `/nosotros` queda pre-renderizada automáticamente en builds.

**2. Cuatro bloques nuevos en lugar de un megabloque "about".**
- `aboutIntro` — badge, título, párrafos, 2 botones (reutilizar `linkGroup`/`link` de `src/fields`), imagen con card flotante (valor + label + sublabel).
- `aboutStats` — array de `{ icon (select), value, label, description }`; patrón de select de iconos ya usado por `WhyUs` (mapear string → componente lucide en el Component).
- `aboutStory` — dos columnas: historia (título + richText) y tarjeta de misión/visión (título + richText × 2).
- `aboutValues` — título, intro y array de `{ icon, title, description, color }` con interacción de selección.
- CTA final → bloque `cta` existente (richText + linkGroup cubren el caso; se ajusta la variante visual en el Component/estilos del bloque o se acepta el estilo del bloque existente con contenido equivalente).
- Alternativa descartada: un solo bloque `aboutPage` con todo dentro → poca reutilización, edición tosca, no aprovecha la composición de `layout`.

**3. Los bloques interactivos siguen el patrón de cliente del repo.**
- `aboutValues` necesita `useState`: el `Component.tsx` (server) importa un `Component.client.tsx` con la lógica, igual que `Carousel` y `HeroSlider`. Recibe los valores como props en lugar de tener el array hardcodeado.
- `aboutIntro`, `aboutStats`, `aboutStory` son server components puros (props → markup), como `WhyUs`/`Content`.

**4. Registro y tipado.**
- Añadir los 4 bloques al array `blocks` de `Pages` (`src/collections/Pages/index.ts`) y al mapa `blockComponents` de `RenderBlocks.tsx` (más `aboutValues` en `fullBleedBlocks` si aplica al patrón full-bleed actual — revisar al implementar: hoy los full-bleed son secciones a ancho completo; las nuevas secciones van dentro del `Container`, así que probablemente NO entra en ese set).
- Ejecutar `pnpm generate:types` tras registrarlos (los bloques nuevos aparecen en `Page['layout']`).

**5. Seed con slug `nosotros`.**
- Nuevo `src/endpoints/seed/nosotros-page.ts` siguiendo el patrón de `contact-page.ts`: `slug: 'nosotros'`, `_status: 'published'`, `hero.type: 'none'`, `layout` con los bloques que reproducen el contenido actual, `meta.title/description` con los valores actuales.
- El seed ya limpia la colección antes de crear (flujo del template), así que no se generan duplicados; `slugField()` con `unique` protege además la unicidad en runtime.

**6. Componentes legacy.**
- `src/components/about/AboutStats.tsx` y `ValuesExplorer.tsx` se reemplazan por los componentes de bloque (mismo markup, ahora parametrizado). Si algún otro sitio los usara, mantenerlos — verificado: solo los usa `/nosotros`.

## Risks / Trade-offs

- [La página "desaparece" si el doc no existe o queda en draft] → El seed crea el doc publicado; los specs cubren 404 para draft/inexistente (comportamiento estándar de `[slug]`). Mitigación operativa: crear/publicar el doc en prod antes de desplegar el borrado de la ruta (ver Migration Plan).
- [Pérdida de detalles visuales al trasladar markup a bloques (espaciados, responsive)] → Copiar el markup existente casi literalmente; checklist visual de paridad desktop/mobile antes de terminar.
- [`generateStaticParams` + borrado de la ruta: build si el doc no existe] → `generateStaticParams` no falla por docs faltantes, solo genera params; en runtime dev resuelve on-demand. El seed lo garantiza en entornos nuevos.
- [Iconos como select limitan a la lista predefinida] → Mismo trade-off que `WhyUs` ya acepta; ampliar options es trivial.
- [Tipos desincronizados tras añadir bloques] → Tarea explícita `pnpm generate:types` + commit de `src/payload-types.ts`.
- [Paridad del CTA final: el bloque `cta` existente tiene su propio estilo] → Evaluar al implementar: si el estilo no da paridad razonable, añadir una variante `appearance` al bloque `cta` (cambio backward-compatible con default actual) en vez de crear otro bloque.

## Migration Plan

1. Crear bloques + registro + tipos (la ruta estática sigue intacta: sin impacto en runtime).
2. Crear el doc `pages/nosotros` vía seed local y verificar paridad visual en dev (`/nosotros` — seguirá sirviendo la ruta estática hasta el paso 3, verificar con preview/draft o comparando directamente tras borrar).
3. Borrar `src/app/(app)/nosotros/page.tsx` y verificar `/nosotros` vía `[slug]`.
4. Deploy: en producción, primero asegurar que el doc `pages` slug `nosotros` existe publicado (ejecutar seed o crearlo en admin), **después** desplegar el build sin la ruta estática. Rollback: revert del commit (la ruta estática vuelve a atender la URL; el doc en `pages` no rompe nada, solo queda sin usar).

## Open Questions

- Ninguno con impacto en specs, enfoque o desglose de tareas.
