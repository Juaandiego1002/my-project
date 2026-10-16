# Proposal

## Why

El footer actual mezcla contenido fijo del template con datos reales del negocio y no ofrece los canales de contacto ni las redes sociales de la tienda. Hoy muestra un correo genérico (`info@naturalvers.com`), un copyright que renderiza "Payload Inc." (tomado de `COMPANY_NAME`) y enlaces en inglés, sin ningún enlace a WhatsApp, Instagram o TikTok. Se necesita un pie de sitio organizado, con la información de contacto y redes reales, y —coherente con el resto del proyecto— editable desde el admin.

## What Changes

- Añadir al Global Footer (`src/globals/Footer.ts`) campos editables:
  - **Contacto**: `email` (correo) y `whatsapp` (número internacional usado en el enlace `wa.me`, sin signos).
  - **Redes sociales**: `socialLinks`, una lista de enlaces con `platform` (select: Instagram, TikTok, Facebook, YouTube, X, Other), `url` y `label` opcional.
  - **Marca**: `brandName` (texto) para el copyright, de modo que el pie deje de mostrar "Payload Inc.".
- Reorganizar `src/components/Footer/index.tsx` en cuatro bloques claros: marca + tagline, Enlaces (navItems), Contacto (email + WhatsApp) y Redes sociales, más el selector de tema y el copyright.
- Renderizar los enlaces sociales con íconos SVG en línea (sin nuevas dependencias), abriendo en nueva pestaña con `rel="noopener noreferrer"` y `aria-label` accesible.
- Precargar en el seed (`src/endpoints/seed/index.ts`) el contacto y las redes reales.
- Regenerar y commitear `src/payload-types.ts` (`pnpm generate:types`).

Valores concretos confirmados: WhatsApp `wa.me/573106198912` (310 6198912, +57), Instagram `instagram.com/naturalvers_21`, TikTok `tiktok.com/@naturalvers`, email `info@naturalvers.com`.

Sin cambios **BREAKING**.

## Capabilities

### New Capabilities

- `site-footer`: comportamiento del pie de sitio — información de contacto (email, WhatsApp), redes sociales y marca, editables desde el admin y presentados de forma accesible (enlaces externos seguros, responsive y con estado de foco visible).

### Modified Capabilities

<!-- Ninguna: no existe todavía `openspec/specs/` (inventario de specs vacío). -->

## Impact

- **Esquema**: `src/globals/Footer.ts` gana estructura nueva (contacto + redes + marca). Requiere `pnpm generate:types`; se commitea `src/payload-types.ts`. En desarrollo el esquema se auto-aplica (schema push); no se crean migraciones.
- **Componentes**: `src/components/Footer/index.tsx` y `src/components/Footer/menu.tsx`; se puede añadir un subcomponente de redes/contacto. El hook `revalidateGlobal` ya invalida el caché del Global al guardar.
- **Seed**: `src/endpoints/seed/index.ts` (bloque `footer`).
- **Sin impacto** en colecciones de ecommerce, checkout, header, ni en los cambios ya planificados (`organizar-tienda`, `nosotros-administrable`).

### Fuera de alcance (supuestos)

- No se reescribe el contenido de `navItems` (enlaces) del seed; sigue siendo editable desde el admin.
- No se introduce una pasarela ni flujo de WhatsApp para el checkout: el WhatsApp aquí es solo un dato de contacto del footer.
- No se añaden dependencias nuevas (íconos como SVG inline).
