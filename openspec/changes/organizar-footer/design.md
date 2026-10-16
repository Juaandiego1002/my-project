# Design

## Context

Ver `proposal.md` para la motivación. Estado actual relevante:

- El pie se renderiza en `src/components/Footer/index.tsx` (Server Component) a partir del Global `footer` (`getCachedGlobal('footer', 1)`), más los enlaces `navItems` en `src/components/Footer/menu.tsx`.
- El Global `Footer` (`src/globals/Footer.ts`) solo tiene `navItems`; el contacto (`info@naturalvers.com`) y el copyright están **hardcodeados** en el componente.
- El copyright usa `COMPANY_NAME || SITE_NAME || "NATURALVER'S"`; `.env` define `COMPANY_NAME="Payload Inc."`, por lo que hoy se muestra "Payload Inc." (`.env` no está versionado).
- `src/globals/hooks/revalidateGlobal.ts` ya revalida el caché del Global al guardar, y `getCachedGlobal` cachea la lectura.
- El proyecto se administra con el schema `spec-driven`; no hay carpeta `src/migrations` (en desarrollo el esquema se auto-aplica con *schema push*).
- No hay dependencias de íconos de marcas: `lucide-react` se usa en el proyecto, pero no cubre TikTok. El repo ya usa SVG inline en el propio footer.
- Convenciones del repo (AGENTS.md): componentes **funcionales**, archivos **kebab-case**, Server Components por defecto; español en UI/copys; sin comentarios salvo necesidad; evitar mayúsculas sostenidas en labels.

## Goals / Non-Goals

**Goals:**

- Modelar en el Global `Footer` los datos de contacto, redes sociales y marca, editables desde el admin.
- Renderizar esos datos en un pie reorganizado, accesible y responsive, con fallbacks cuando falten valores.
- Mantener el patrón del proyecto: Global + `revalidateGlobal` + Server Components.

**Non-Goals:**

- No se construye un flujo de checkout por WhatsApp ni se toca la colección de productos/pedidos.
- No se reescribe el contenido de `navItems`.
- No se crean migraciones de base de datos (se documenta el paso para producción, pero no se implementa aquí).
- No se introducen dependencias nuevas ni una librería de íconos de marcas.

## Decisions

### D1. Modelo de datos del Global Footer

Se añade al Global `footer`:

- `contact` (group):
  - `email` — `type: 'email'`, opcional.
  - `whatsapp` — `type: 'text'`, opcional. Guarda un número **legible en formato internacional** (p. ej. `+57 310 6198912`). El enlace a `wa.me` se deriva eliminando todo carácter no numérico (`573106198912`). Validación mínima: al menos 8 dígitos si se completa.
- `socialLinks` (array, `maxRows: 6`):
  - `platform` — `type: 'select'` con opciones `instagram | tiktok | facebook | youtube | x | other`. Define el ícono.
  - `url` — `type: 'text'` con validación que exige esquema `http`/`https`.
  - `label` — `type: 'text'`, opcional; texto accesible/fallback cuando `platform` es `other`.
- `brandName` — `type: 'text'`, con `defaultValue: "NATURALVER'S"`.
- Se conserva `navItems` sin cambios.

**Por qué un array genérico para redes (en vez de campos fijos `instagramUrl`, `tiktokUrl`, …):** el admin puede añadir/quitar redes sin cambiar el esquema. El `platform` permite elegir el ícono.

**Alternativas consideradas:**

- Reutilizar el factory `link()` (`src/fields/link.ts`): descartado — trae relación a páginas internas y campos que no aplican a enlaces externos de redes, y no aporta el `platform` para el ícono.
- Campos planos por red: descartado — cada red nueva requeriría cambio de esquema y tipos.
- Guardar el WhatsApp como solo-dígitos: descartado — el texto legible es mejor para el usuario; se prefiere un único campo legible y derivar el enlace.

### D2. Íconos por plataforma

Mapa `platform → SVG inline` en el componente (Instagram, TikTok, WhatsApp, Facebook, YouTube, X) y un ícono genérico de enlace para `other`. **Por qué:** control total del trazo/estilo, sin dependencias y con `aria-hidden` en el SVG; el nombre accesible vive en el `aria-label` del enlace. **Alternativa:** `lucide-react` — descartado porque no incluye TikTok (ni todas las marcas de forma consistente).

### D3. Descomposición de componentes

- `src/components/Footer/index.tsx` (Server): lee el Global, compone los bloques y el copyright.
- `src/components/Footer/menu.tsx`: se mantiene (enlaces).
- `src/components/Footer/contact.tsx` (nuevo, Server): bloque de contacto (email + WhatsApp).
- `src/components/Footer/social-links.tsx` (nuevo, Server): mapa de íconos + lista de redes.

**Por qué:** mantiene `index.tsx` legible y sigue la organización por subcarpetas del repo. Alternativa (todo en `index.tsx`): descartada por tamaño y mezcla de responsabilidades.

### D4. Layout y jerarquía

Grid `1 col` en mobile → `md:grid-cols-4` en desktop: `[marca + tagline] [Enlaces] [Contacto] [Redes sociales]`. El `ThemeSelector` se conserva en la columna de redes (o alineado al final). Cada bloque con encabezado `h3` en español: "Enlaces", "Contacto", "Redes". El bloque inferior mantiene el copyright `© <año> <brandName>`.

**Por qué:** el pie actual ya usa un grid de 4 columnas; se conserva el ritmo y solo se reordena el contenido y se añade el bloque de redes.

### D5. Marca y copyright

El copyright SHALL priorizar `footer.brandName` y, si está vacío, usar el valor por defecto del proyecto (`NATURALVER'S`). Se **deja de preferir** `COMPANY_NAME`/`SITE_NAME` (valores del template, no versionados). Así el pie nunca muestra "Payload Inc." sin configuración.

### D6. Esquema, tipos y seed

- En desarrollo, el *schema push* aplica el nuevo esquema automáticamente; no se crean migraciones.
- `pnpm generate:types` regenera `src/payload-types.ts` (se commitea).
- El seed (`src/endpoints/seed/index.ts`, bloque `footer`) se actualiza con `brandName`, `contact` (email + WhatsApp) y `socialLinks` (Instagram, TikTok). Nota: el seed **borra** los datos existentes.

### D7. Accesibilidad

- `aria-label` en cada enlace de red ("Instagram", "TikTok", …); SVG con `aria-hidden="true"`.
- Enlaces externos con `target="_blank"` + `rel="noopener noreferrer"`.
- Foco visible: ya provisto por `src/app/(app)/globals.css` (`a, input, button:focus-visible`). Contraste AA con los tonos de marca (`brand-dark #036654`).

## Risks / Trade-offs

- **[Número de WhatsApp mal formateado] → enlace `wa.me` roto.** Mitigación: validación de dígitos mínimos y descripción del campo; escenario de spec dedicado.
- **[Plataforma sin ícono (`other`)] → falta de ícono.** Mitigación: ícono genérico de enlace + uso de `label` como nombre accesible.
- **[Cambio de esquema sobre datos existentes] → el footer actual en la DB queda sin los campos nuevos.** Mitigación: el render debe tolerar campos vacíos (omitir bloques) y usar fallbacks; el seed repuebla en desarrollo.
- **[`payload-types.ts` desincronizado] → errores de tipos.** Mitigación: ejecutar `pnpm generate:types` como tarea explícita y commitear.
- **[`.env` con `COMPANY_NAME="Payload Inc."`] → copyright incorrecto.** Mitigación: D5 (dejar de preferir las variables del template; fallback a la marca del proyecto).
- **[Íconos de marca y contraste]** → riesgo menor de legibilidad en tema oscuro. Mitigación: usar `currentColor` y verificar contraste en claro/oscuro.

## Migration Plan

1. Editar `src/globals/Footer.ts` (nuevos campos) y ejecutar `pnpm generate:types`; commitear `src/payload-types.ts`.
2. Implementar los componentes del pie (contacto, redes, layout, copyright).
3. Actualizar el bloque `footer` del seed con los valores reales.
4. En desarrollo, reiniciar/recargar la app para aplicar el *schema push* y (si se desea) re-ejecutar el seed desde el admin — **destructivo**; alternativamente, cargar contacto y redes a mano en el admin.

**Rollback:** revertir `Footer.ts`, `src/payload-types.ts`, los componentes del pie y el seed. En producción, el rollback de datos requeriría revertir la migración correspondiente (fuera del alcance de este cambio).
