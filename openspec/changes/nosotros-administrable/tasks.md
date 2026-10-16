# Tasks

## 1. Bloques administrables

- [x] 1.1 Crear el bloque `aboutIntro` (`src/blocks/AboutIntro/config.ts` + `Component.tsx`) con badge, título, párrafos, hasta 2 botones (reutilizar `src/fields/linkGroup`) e imagen con card flotante (value/label/sublabel); verificar que compila y que el markup replica la sección intro actual de `/nosotros`
- [x] 1.2 Crear el bloque `aboutStats` (`src/blocks/AboutStats/`) con array `{ icon, value, label, description }` e iconos select→lucide (patrón de `WhyUs`); verificar que el Component renderiza los ítems recibidos por props y ya no hay data hardcodeada
- [x] 1.3 Crear el bloque `aboutStory` (`src/blocks/AboutStory/`) con columna de historia (título + richText) y tarjeta de misión/visión (2 títulos + richText); verificar que compila con el markup de la sección actual
- [x] 1.4 Crear el bloque `aboutValues` (`src/blocks/AboutValues/`) con título, intro y array `{ icon, title, description, color }`, usando `Component.client.tsx` + `Component.tsx` para la selección con `useState` (patrón de `Carousel`); verificar en dev que la interacción de selección sigue funcionando con datos de prueba
- [x] 1.5 Verificar la paridad del CTA final con el bloque `cta` existente (`src/blocks/CallToAction/`); si el estilo no da paridad razonable, añadir una variante `appearance` backward-compatible al bloque en vez de crear uno nuevo (diseño, Decisión 2)

## 2. Registro, tipos y seed

- [x] 2.1 Registrar los bloques nuevos en el array `layout` de `src/collections/Pages/index.ts` y en `blockComponents` de `src/blocks/RenderBlocks.tsx`; verificar que `pnpm exec tsc --noEmit` pasa y que los bloques aparecen en el selector de bloques del admin al crear una página
- [x] 2.2 Ejecutar `pnpm generate:types` y verificar que `src/payload-types.ts` contiene los nuevos `interfaceName` de bloques y que `pnpm exec tsc --noEmit` sigue pasando
- [x] 2.3 Crear `src/endpoints/seed/nosotros-page.ts` (slug `nosotros`, `_status: 'published'`, `hero.type: 'none'`, layout con las 5 secciones del contenido actual, `meta.title` = "Nosotros | NATURALVER'S" y su meta description) siguiendo el patrón de `contact-page.ts`; verificar que la función compila y que el layout referencia solo `blockType` registrados
- [x] 2.4 Añadir la llamada al seed en `src/endpoints/seed/index.ts`; verificar ejecutando el seed en local que existe un doc `pages` publicado con slug `nosotros` y sin duplicados

## 3. Corte a ruta dinámica

- [x] 3.1 Borrar `src/app/(app)/nosotros/page.tsx`; verificar con el dev server que `GET /nosotros` responde 200 y renderiza el contenido del doc CMS (y que `/nosotros` inexistente/draft responde 404)
- [x] 3.2 Verificar que los metadatos por defecto de `/nosotros` coinciden con los anteriores (title + description) y que personalizarlos en la pestaña SEO del admin los refleja en el HTML
- [x] 3.3 Verificar el flujo de drafts: guardar un cambio como borrador no cambia lo que ve un visitante anónimo; publicar sí lo cambia tras la revalidación
- [x] 3.4 Verificar que `pnpm exec tsc --noEmit` y `pnpm lint` no presentan errores nuevos (los 3 errores preexistentes de `nosotros/page.tsx` en lint desaparecen al borrar el archivo; `react/no-unescaped-entities` era de esa ruta)

## 4. Verificación de integración

- [x] 4.1 Comparación visual de paridad desktop y mobile de `/nosotros` contra la página anterior (secciones, orden, espaciados, responsive) — capturar antes de borrar la ruta estática si hace falta
- [x] 4.2 Ejecutar `pnpm build` y verificar que el build termina sin errores y que `/nosotros` queda incluida en las rutas generadas
- [x] 4.3 Ejecutar `pnpm test:int` y verificar que pasa (los tests existentes no deben romperse con los bloques nuevos)
