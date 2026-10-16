# Proposal

## Why

La página `/shop` tiene tres problemas que la vuelven poco usable: el buscador no devuelve resultados, no hay una opción explícita para ver todo el catálogo, y la disposición visual (barra lateral + grilla) no está organizada ni jerarquizada. El buscador es un bug real: `src/app/(app)/shop/page.tsx` construye el `where` filtrando el campo `description` —que es `richText`— con el operador `like`; ese filtro no está soportado y hace que la consulta devuelva 0 productos (vía REST el mismo filtro responde `Something went wrong.`), así que cualquier búsqueda deja la tienda vacía.

## What Changes

- **Buscador funcional**: la búsqueda SHALL coincidir sobre campos de texto soportados (como mínimo `title`) y NO SHALL filtrar `description` (richText) con `like`. Buscar un término válido devuelve los productos coincidentes; un término sin coincidencias muestra el estado vacío (no un error ni una lista vacía silenciosa).
- **Opción "ver todos los productos"**: se añade una entrada explícita (**Todos los productos** / "Todos") en el filtro de categorías que limpia el filtro de categoría y el término de búsqueda (`q`), mostrando el catálogo completo. Se mantiene el comportamiento actual de alternar una categoría por clic.
- **Reorganización visual de la tienda**:
  - Encabezado de la página con título y **contador de resultados**.
  - Barra lateral de filtros ordenada (Categorías + Orden) y **sticky** en desktop; colapsable/ordenada en mobile.
  - Grilla de productos **responsive** y consistente en todos los breakpoints.
  - **Estado vacío** claro con mensaje y acción para limpiar filtros.
- **Filtros coherentes**: cambiar el orden SHALL preservar el filtro de categoría activo (hoy el enlace de orden descarta `category`), y fijar la categoría SHALL preservar el término de búsqueda.
- **Copys en español** en la UI de la tienda (buscador, "Category"/"Sort by", estado vacío), consistente con el resto del storefront.

## Capabilities

### New Capabilities

- `shop-page`: comportamiento de la página de listado de tienda `/shop`: búsqueda de productos por texto, filtrado por categoría, ordenamiento, opción de ver todo el catálogo y estados de resultado (con conteo, sin coincidencias), con una disposición visual organizada y responsive.

### Modified Capabilities

<!-- Ninguna: el proyecto no tiene specs existentes todavía. -->

## Impact

- **Ruta de tienda**: `src/app/(app)/shop/page.tsx` (consulta `payload.find` y estructura del listado), `src/app/(app)/shop/layout.tsx` (barra lateral de filtros), `src/app/(app)/shop/loading.tsx` (skeleton acorde a la grilla).
- **Componentes de búsqueda/filtros**: `src/components/Search/index.tsx`; `src/components/layout/search/Categories.tsx` y `Categories.client.tsx` (entrada "Todos los productos"); `src/components/layout/search/filter/FilterItem.tsx` (preservar `category` al ordenar).
- **Posibles componentes nuevos**: encabezado/contador de resultados y estado vacío de la tienda (si no se resuelven inline en `page.tsx`).
- **Sin cambios de esquema**: no se crean/modifican colecciones ni campos de Payload, por lo que **no** requiere `pnpm generate:types`.
- **Sin cambios de URL**: `/shop` y `/shop?q=…&category=…&sort=…` siguen siendo las URLs; los parámetros se mantienen compatibles.
- **Datos**: asume el catálogo existente (21 productos publicados con categorías Aceites/Cremas/Suplementos).
