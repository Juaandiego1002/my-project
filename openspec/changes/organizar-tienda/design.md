# Design

## Context

Ver `proposal.md` para la motivación. Estado actual relevante:

- `src/app/(app)/shop/page.tsx` construye el `where` de `payload.find` solo cuando hay `q` o `category`. Con `q`, genera `and: [ {_status equals published}, { or: [ {title like}, {description like} ] } ]`. El filtro `description like` es la causa del bug: `description` es un campo `richText` y ese operador **hace fallar la consulta** (verificado: el equivalente REST responde `{"errors":[{"message":"Something went wrong."}]}` con `totalDocs: 0`). Filtros por separado sí funcionan: `_status equals published` → 21; `title like crema` → 10.
- El `select` de la página **no** incluye `description` (irrelevante para el error, que ocurre en el filtro).
- `src/app/(app)/shop/layout.tsx`: `container` + `Search` + fila `flex-col md:flex-row` con barra lateral (`basis-1/5`) que contiene `Categories` y `FilterList list={sorting} title="Sort by"`, y el contenido (`children`, `min-h-screen`).
- `Categories.tsx` (server) carga `categories` y renderiza `CategoryItem` (client). `CategoryItem` alterna `?category=<id>` con `router.push`; **no hay opción para quitar la categoría ni para "ver todo"**, y no resalta estado activo más allá de un subrayado.
- `FilterItem.tsx` → `SortFilterItem` arma el enlace de orden conservando solo `q` + `sort`: **pierde `category`**.
- `Search/index.tsx`: input de búsqueda; setea `?q=`; placeholder en inglés; siempre navega a `/shop` (pierde `category`).
- Catálogo real: 21 productos publicados (Aceites 2, Cremas 10, Suplementos 9). No hay paginación (se usa `limit: 0`).
- Restricciones: sin cambios de esquema de Payload (no tocar colecciones/campos, no `generate:types`); mantener URLs `/shop?q=&category=&sort=`; `ProductCard` (client, con quick-add) ya se usa en la grilla.

## Goals / Non-Goals

**Goals:**
- Búsqueda funcional por texto (sin fallar) con conteo y estado vacío.
- Opción explícita "Todos los productos" que limpia filtros.
- Ordenamiento y filtrado coherentes entre sí (ninguno descarta al otro).
- Reorganización visual de `/shop` (encabezado, barra lateral ordenada/sticky, grilla responsive, estado vacío) y copys en español.

**Non-Goals:**
- Búsqueda sobre `description`/richText o full-text search (queda como mejora futura).
- Paginación o infinite scroll (el catálogo es pequeño; se mantiene `limit: 0`).
- Cambios de esquema, colecciones, campos o migraciones.
- Rediseño de la página de detalle de producto, carrito o checkout.
- Limpieza del código muerto `CategoryTabs` / ruta `/shop/[slug]` (fuera de alcance; se puede anotar aparte).

## Decisions

### D1. Búsqueda solo sobre `title` (quitar `description like`)

Cambiar el `where` para filtrar únicamente por `title` con `like`, eliminando el `or` con `description`. Alternativas: (a) nuevo campo de texto plano (`searchText`) poblado con título+descripción vía hook (mayor esfuerzo y cambio de esquema); (b) usar el plugin de búsqueda de Payload (más infraestructura); (c) full-text de Postgres con SQL crudo (sobre-ingeniería). Se elige (a-no): filtrar `title` es el cambio mínimo que arregla el bug sin esquema nuevo y sin dependencias. Se simplifica el `or` de un solo campo a `{ title: { like: searchValue } }` dentro del `and`, conservando `_status equals published` y (si aplica) `categories contains`. Limitación aceptada: no coincide con texto de la descripción.

Nota: verificar que `like` en Postgres es case-insensitive (ILIKE) y confirmar la consulta mínima `and[_status]` + `title like` por REST antes de dar por bueno.

### D2. Opción "Todos los productos" en la lista de categorías

Agregar como **primer ítem** de `Categories` una opción que, al activarse, quita `q` y `category` (preservando `sort`) y navega a `/shop`. Se implementa con un botón client análogo a `CategoryItem` (o extrayendo un `AllProductsItem`), resaltado como activo cuando no hay `category` ni `q`. Alternativa descartada: enlace directo a `/shop` (perdería `sort`).

Mejora asociada (mismo componente): construir la URL con `createUrl` para evitar el `'?'` colgante cuando no quedan parámetros.

### D3. Ordenamiento que preserva filtros

Corregir `SortFilterItem` en `FilterItem.tsx` para conservar también `category` (hoy solo `q` y `sort`). Con esto, cambiar el orden no pierde la categoría activa.

### D4. Reorganización visual

- **Encabezado + conteo**: mantener el resumen de resultados en `page.tsx` (server, tiene los números) pero reestilizarlo y pasarlo a español. Mostrar título/contexto y conteo; con filtros, indicar el filtro aplicado.
- **Barra lateral**: `Categories` + ordenamiento apilados y ordenados; `md:sticky md:top-*` en desktop; títulos "Categorías" y "Ordenar por". El layout ya apila la barra sobre el contenido en mobile (`flex-col`) — se conserva y se afina el espaciado.
- **Grilla**: mantener `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` con gaps consistentes y `ProductCard` existente.
- **Estado vacío**: mensaje de "sin resultados" + acción "Ver todos los productos" (reutiliza la navegación de D2 con `q`/`category` limpios).
- **Copys**: traducir textos de la UI de tienda (buscador, encabezados de filtros, resumen, estado vacío) y las etiquetas de `sorting` en `src/lib/constants.ts`.

### D5. Sin cambios de datos

No se tocan colecciones, campos ni `src/payload-types.ts`. `BusinessCategories`/productos ya existen.

## Risks / Trade-offs

- [La búsqueda no matchea descripciones] → Mitigación: aceptado en alcance; se documenta como mejora futura (campo de búsqueda de texto plano o full-text).
- [Comodines en `q` (`%`, `_`) alterarían el `like`] → Mitigación: escapar/sanear `searchValue` (o confiar en el saneo de Payload) y verificar con un término con `%`.
- [`CategoryItem`/`SortFilterItem` usan `router.push` y `searchParams` del cliente] → Mitigación: unificar la construcción de URLs con `createUrl` para evitar `?` colgante y pérdida de parámetros.
- [Recarga en caliente de Turbopack inestable en Docker/Windows] → Mitigación: `docker restart my-project-app-1` si los cambios no se reflejan (como pasó con el fix de `limit`).
- [Cambios en `shop/layout.tsx` afectan solo a `/shop`] → Riesgo bajo: el layout es exclusivo de esa ruta.

## Migration Plan

- **Datos**: ninguna migración (sin cambios de esquema).
- **Despliegue**: solo código de frontend; rollback = revertir el cambio.
- **Verificación**: manual en `/shop`, `/shop?q=crema`, `/shop?q=zzzz` (estado vacío), `/shop?category=<id>`, orden con categoría activa; `pnpm exec tsc --noEmit`, `pnpm lint`, Prettier; y `pnpm test:e2e` si aplica al storefront.

## Open Questions

- ¿Agregar en el futuro búsqueda sobre la descripción mediante un campo de texto plano o full-text de Postgres? (Diferible; no cambia specs ni tareas actuales.)
