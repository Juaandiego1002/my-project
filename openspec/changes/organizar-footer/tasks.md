# Tasks

## 1. Esquema del Global Footer y tipos

- [x] 1.1 En `src/globals/Footer.ts`, añadir el grupo `contact` (`email` tipo email; `whatsapp` tipo text con validación de al menos 8 dígitos si se completa), el array `socialLinks` (`platform` select: instagram|tiktok|facebook|youtube|x|other; `url` texto con validación de esquema http/https; `label` texto opcional) y `brandName` texto con `defaultValue: "NATURALVER'S"`; conservar `navItems` intacto. Verificación: el archivo compila (`pnpm exec tsc --noEmit`) y declara los nuevos campos.
- [x] 1.2 Ejecutar `pnpm generate:types` y confirmar que `src/payload-types.ts` incluye los nuevos campos del Global `Footer` (`contact.email`, `contact.whatsapp`, `socialLinks`, `brandName`). Verificación: `pnpm exec tsc --noEmit` sale en 0 y el diff de `src/payload-types.ts` muestra los campos.

## 2. Componentes del pie de sitio

- [x] 2.1 Crear `src/components/Footer/social-links.tsx` (Server Component) con un mapa `platform → SVG inline` (Instagram, TikTok, WhatsApp, Facebook, YouTube, X y un ícono genérico para `other`) que renderice `socialLinks` con `aria-label` por plataforma, `target="_blank"` y `rel="noopener noreferrer"`; no renderizar el bloque si la lista está vacía. Verificación: con `socialLinks` poblado, el DOM muestra un enlace por red con su `aria-label` y los atributos de apertura segura; con la lista vacía no aparece el bloque.
- [x] 2.2 Crear `src/components/Footer/contact.tsx` (Server Component) que muestre el email como enlace `mailto:` y, si hay `whatsapp`, un enlace `https://wa.me/<solo dígitos>` con el número legible como texto; omitir cada canal vacío. Verificación: en el DOM, con WhatsApp presente aparece el enlace `wa.me` con solo dígitos y con el canal vacío no se renderiza.
- [x] 2.3 Reorganizar `src/components/Footer/index.tsx`: grid `1 col → md:grid-cols-4` (marca + tagline, Enlaces, Contacto, Redes), encabezados `h3` "Enlaces" / "Contacto" / "Redes", conservar `ThemeSelector`, y calcular el copyright como `© <año actual> <brandName || "NATURALVER'S">`, dejando de preferir `COMPANY_NAME`/`SITE_NAME`. Verificación: el HTML del pie muestra los cuatro bloques con sus encabezados y no contiene el texto "Payload Inc.".
- [x] 2.4 Verificar accesibilidad y respuesta del pie: foco de teclado visible en todos los enlaces y sin desborde horizontal en mobile. Verificación: al navegar con Tab cada enlace enfocado muestra indicador de foco; a 360px de ancho no hay scroll horizontal.

## 3. Seed del footer

- [x] 3.1 Actualizar el bloque `footer` en `src/endpoints/seed/index.ts` con `brandName: "NATURALVER'S"`, `contact` (email `info@naturalvers.com`, whatsapp `+57 310 6198912`) y `socialLinks` (Instagram `https://instagram.com/naturalvers_21`, TikTok `https://tiktok.com/@naturalvers`). Verificación: el seed compila (`pnpm exec tsc --noEmit`) sin errores de tipo en el bloque `footer`.
- [x] 3.2 Cargar los datos y verificarlos: tras aplicar el seed (o cargar contacto/redes en el admin), `curl.exe -g -s "http://localhost:3000/api/globals/footer?depth=0"` devuelve el `contact` y las dos `socialLinks`. Verificación: la respuesta incluye el whatsapp y las 2 redes, y el pie en `http://localhost:3000/` renderiza los enlaces.

## 4. Verificación de integración

- [ ] 4.1 Ejecutar `pnpm exec tsc --noEmit`, `pnpm lint` y `pnpm exec prettier --check` sobre los archivos tocados. Verificación: `tsc` en 0, `lint` sin errores nuevos, `prettier` sin diferencias.
- [ ] 4.2 Verificación end-to-end de los escenarios del spec `site-footer` con Playwright sobre `http://localhost:3000/`: contacto con `mailto:` y `wa.me` (solo dígitos), redes con `aria-label` y `rel="noopener noreferrer"`, y copyright con la marca configurada (sin "Payload Inc."). Verificación: todos los escenarios pasan sin errores de página.
- [ ] 4.3 Confirmar que no se añadieron migraciones de base de datos. Verificación: `git status` no lista archivos nuevos bajo `src/migrations/`.
