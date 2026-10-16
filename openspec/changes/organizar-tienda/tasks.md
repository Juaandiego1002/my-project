# Tasks

## 1. Confirmar causa raíz y baseline

- [x] 1.1 Reproducir el bug de búsqueda: `curl.exe -g -s -o NUL -w "%{http_code}`n" "http://localhost:3000/shop?q=crema"` (espera 200 sin grilla de productos) y confirmar por REST que `where[description][like]=crema` responde `Something went wrong.`. Verificación: ambos reproducen el fallo (búsqueda sin resultados y error del filtro en `description`).
- [x] 1.2 Verificar que la consulta mínima sin `description` funciona: `curl.exe -g -s "http://localhost:3000/api/products?limit=0&where[and][0][_status][equals]=published&where[and][1][title][like]=crema"`. Verificación: responde sin `errors` y con `totalDocs` = 10.

## 2. Arreglar la búsqueda

- [x] 2.1 En `src/app/(app)/shop/page.tsx`, quitar el filtro `description like` y dejar solo `{ title: { like: searchValue } }` dentro del `and`; sanear `searchValue` a string (evitar `%`/`_` como comodines). Verificación: `curl.exe -g -s "http://localhost:3000/shop?q=crema"` renderiza productos cuyo título contiene "crema" y la página ya no falla.
- [x] 2.2 Verificar búsqueda sin coincidencias: `http://localhost:3000/shop?q=zzzzzz`. Verificación: responde 200 y no cae en error (el estado vacío se completa en el grupo 5).

## 3. Opción "Todos los productos" y filtro de categorías

- [x] 3.1 Añadir en `Categories` (grupo "Categorías") un ítem "Todos los productos" que quita `q` y `category` preservando `sort`, y se muestra activo cuando no hay filtros. Verificación: desde `/shop?category=2&q=crema`, al activarlo la URL vuelve a `/shop` (o con `sort`) y la grilla muestra los 21 productos.
- [x] 3.2 Unificar la navegación de filtros con `createUrl` en `Categories.client.tsx` para no dejar un `?` colgante. Verificación: sin filtros, la URL es `/shop` (sin `?`) y "Todos los productos" aparece activo.

## 4. Coherencia entre orden, categoría y búsqueda

- [x] 4.1 Corregir `SortFilterItem` en `src/components/layout/search/filter/FilterItem.tsx` para preservar `category` (además de `q`). Verificación: con `?category=<id>` activo, cambiar el orden mantiene `category` en la URL y el mismo subconjunto de productos.
- [x] 4.2 Confirmar que el buscador (`Search`) preserva `category` y `sort` al enviar `q`. Verificación: con categoría activa, buscar un término mantiene `?category=` en la URL.

## 5. Reorganización visual y copys en español

- [x] 5.1 Reestilizar el resumen de resultados en `page.tsx` (contexto + conteo) en español. Verificación: `?q=crema` muestra "N resultados para «crema»"; con categoría se indica el filtro aplicado.
- [x] 5.2 Implementar el estado vacío con mensaje y acción "Ver todos los productos". Verificación: `?q=zzzzzz` muestra el mensaje y el botón; al usarlo, vuelve al catálogo completo (21).
- [x] 5.3 Reorganizar `src/app/(app)/shop/layout.tsx`: barra lateral ordenada y `md:sticky`, encabezados "Categorías" y "Ordenar por", grilla responsive con gaps consistentes. Verificación: en desktop la barra lateral queda fija y la grilla usa varias columnas; en mobile los filtros se apilan sobre la grilla sin desbordes.
- [x] 5.4 Traducir copys restantes: placeholder del buscador en `Search/index.tsx` y etiquetas de `sorting` en `src/lib/constants.ts`. Verificación: no quedan textos en inglés en la UI de `/shop`.

## 6. Verificación de integración

- [x] 6.1 Ejecutar `pnpm exec tsc --noEmit` y `pnpm lint`. Verificación: `tsc` en 0; `lint` sin errores nuevos (los 3 de `nosotros` son preexistentes).
- [x] 6.2 Ejecutar `pnpm exec prettier --write .` sobre los archivos tocados. Verificación: sin diferencias pendientes en esos archivos.
- [x] 6.3 Confirmar que no hubo cambios de esquema: `git status` no debe listar `src/payload-types.ts` ni colecciones. Verificación: solo aparecen archivos de `/shop` y de los componentes de búsqueda/filtros.
- [x] 6.4 Verificación manual end-to-end de los escenarios del spec `shop-page`: sin filtros (21), búsqueda con coincidencias, búsqueda sin coincidencias, filtro por categoría, quitar categoría, "Todos los productos", y orden con categoría activa. Verificación: todos los escenarios se cumplen.
