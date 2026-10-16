# Spec Delta

## Purpose

Define cómo se sirve y se administra la página `/nosotros` del storefront: contenido editable desde la colección `Pages` de Payload, resolución por slug dinámico, SEO controlado por el admin y publicación con drafts.

## ADDED Requirements

### Requirement: La página /nosotros se sirve desde la colección Pages
El sistema SHALL resolver `/nosotros` mediante la ruta dinámica de páginas (`[slug]`), cargando el documento de la colección `Pages` con slug `nosotros`, y SHALL eliminar la ruta estática hardcodeada. No SHALL existir dos fuentes de verdad para esa URL.

#### Scenario: Acceso público con página publicada
- **WHEN** un visitante navega a `/nosotros` y el documento `pages` con slug `nosotros` tiene estado `published`
- **THEN** se renderiza la página construida a partir de su hero y layout de bloques, con HTTP 200

#### Scenario: Página inexistente o borrador devuelve 404
- **WHEN** un visitante navega a `/nosotros` y no existe el documento, o existe pero su estado es `draft`
- **THEN** el sistema responde 404 (not found)

#### Scenario: La ruta estática ya no existe
- **WHEN** se despliega este cambio
- **THEN** el archivo de ruta estática `src/app/(app)/nosotros/page.tsx` fue eliminado y `/nosotros` sigue respondiendo vía `[slug]`

### Requirement: Todo el contenido de la página es administrable
El documento `pages` de slug `nosotros` SHALL exponer en el admin, vía bloques del `layout`, el contenido de todas las secciones actuales: intro (badge, título, párrafos, botones, imagen y card flotante), stats, historia, misión/visión, valores y CTA final. Editar cualquier texto o imagen de estas secciones NO SHALL requerir cambios de código ni despliegue.

#### Scenario: Edición de copy sin deploy
- **WHEN** un editor cambia el título de la intro o un valor en el admin y publica
- **THEN** el storefront muestra el nuevo texto tras la revalidación, sin intervención de código

#### Scenario: Secciones con estructura de datos
- **WHEN** un editor añade, edita o elimina ítems de stats o de valores desde el admin
- **THEN** la página refleja la lista resultante (nuevos ítems aparecen, eliminados desaparecen)

#### Scenario: Layout vacío
- **WHEN** el documento no tiene bloques en `layout` ni contenido richText
- **THEN** la página renderiza únicamente el hero (o nada si el hero es `none`), sin romper

### Requirement: SEO administrable y metadatos correctos
El sistema SHALL generar los metadatos de `/nosotros` (title, description, imagen) desde la pestaña SEO del documento `pages`, con valores por defecto equivalentes a los actuales cuando no se rellenan.

#### Scenario: Metadatos por defecto
- **WHEN** se publica la página sin rellenar los campos SEO
- **THEN** el `<title>` y la meta description coinciden con los actuales ("Nosotros | NATURALVER'S" y su descripción)

#### Scenario: Metadatos personalizados
- **WHEN** un editor define título y descripción personalizados en la pestaña SEO
- **THEN** `generateMetadata` los refleja en el HTML de `/nosotros`

### Requirement: Publicación con drafts y previsualización
La página SHALL soportar el flujo de drafts de la colección `Pages`: los borradores NO SHALL ser visibles para visitantes anónimos, y los editores SHALL poder previsualizar cambios antes de publicar.

#### Scenario: Borrador invisible para visitantes
- **WHEN** un editor guarda cambios como borrador
- **THEN** los visitantes anónimos siguen viendo la última versión publicada

#### Scenario: Revalidación tras publicar
- **WHEN** un editor publica un cambio en la página
- **THEN** se dispara la revalidación de la ruta `/nosotros` (mismo hook `revalidatePage` que el resto de páginas)

### Requirement: La página se crea en entornos nuevos mediante seed
El seed del proyecto SHALL crear el documento `pages` de slug `nosotros` con todo su contenido actual publicado, de modo que un entorno recién sembrado tenga `/nosotros` operativa.

#### Scenario: Seed completo
- **WHEN** se ejecuta el seed en una base vacía
- **THEN** existe un documento `pages` publicado con slug `nosotros` y su layout reproduce el contenido actual

#### Scenario: Seed idempotente respecto a URLs
- **WHEN** el seed corre sobre una base donde ya existe la página
- **THEN** no se crea un segundo documento con la misma URL (`/nosotros` sigue siendo única)
