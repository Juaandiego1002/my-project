# Spec Delta

## Purpose

Define el comportamiento del pie de sitio de la tienda: qué información de contacto, redes sociales y marca debe mostrar, cómo se mantiene editable desde el admin y qué garantías de acceso y presentación ofrece a los visitantes.

## ADDED Requirements

### Requirement: Contacto visible en el pie de sitio

El pie de sitio SHALL mostrar la información de contacto definida en el Global Footer: un correo electrónico abrible mediante enlace `mailto:` y un número de WhatsApp abrible mediante un enlace `wa.me` con el número en formato internacional (solo dígitos). El pie SHALL omitir cada canal cuyo campo correspondiente esté vacío.

#### Scenario: Correo configurado

- **WHEN** el Global Footer tiene un correo electrónico configurado
- **THEN** el pie muestra un enlace `mailto:` con ese correo visible como texto

#### Scenario: WhatsApp configurado

- **WHEN** el Global Footer tiene un número de WhatsApp configurado
- **THEN** el pie muestra un enlace a `https://wa.me/<número en formato internacional>` con el número como texto legible

#### Scenario: Canal sin configurar

- **WHEN** el campo de correo o el de WhatsApp del Global Footer está vacío
- **THEN** el pie no renderiza el enlace correspondiente a ese canal

### Requirement: Enlaces a redes sociales

El pie SHALL listar las redes sociales definidas en el Global Footer, una entrada por red, mostrando un ícono acorde a la plataforma seleccionada y una etiqueta accesible (`aria-label`) con el nombre de la plataforma. Cada enlace externo SHALL abrirse en una pestaña nueva de forma segura.

#### Scenario: Render de redes configuradas

- **WHEN** el Global Footer define redes sociales (por ejemplo, Instagram y TikTok)
- **THEN** el pie muestra un enlace por red, cada uno con su ícono y su `aria-label` de plataforma

#### Scenario: Apertura segura en pestaña nueva

- **WHEN** un visitante abre un enlace de red social del pie
- **THEN** el enlace se abre en una pestaña nueva con `target="_blank"` y `rel="noopener noreferrer"`

#### Scenario: Sin redes configuradas

- **WHEN** la lista de redes sociales del Global Footer está vacía
- **THEN** el pie no renderiza el bloque de redes sociales

### Requirement: Marca y aviso de copyright

El pie SHALL mostrar un aviso de copyright con el año en curso y el nombre de marca configurado en el Global Footer, y SHALL usar un nombre de marca por defecto del proyecto cuando no se configure ninguno (no el nombre del template).

#### Scenario: Marca configurada

- **WHEN** el Global Footer tiene un nombre de marca configurado
- **THEN** el aviso de copyright muestra «© <año actual> <nombre de marca>»

#### Scenario: Marca sin configurar

- **WHEN** el nombre de marca del Global Footer está vacío
- **THEN** el aviso de copyright usa el nombre de marca por defecto del proyecto

### Requirement: Contenido del pie editable desde el admin

La información del pie (contacto, redes sociales y nombre de marca) SHALL ser editable por usuarios admin desde el Global Footer de Payload, y los cambios guardados SHALL reflejarse en el sitio sin requerir un nuevo despliegue.

#### Scenario: Cambios reflejados tras guardar

- **WHEN** un admin guarda cambios en el Global Footer
- **THEN** el sitio público muestra los valores actualizados sin necesidad de redeploy

#### Scenario: Acceso restringido a administradores

- **WHEN** un visitante o usuario no admin intenta actualizar el Global Footer
- **THEN** la operación es rechazada

### Requirement: Validación de enlaces de redes sociales

El sistema SHALL validar que cada URL de red social sea un enlace válido con esquema `http` o `https` al guardarse desde el admin, y SHALL rechazar valores inválidos.

#### Scenario: URL inválida rechazada

- **WHEN** un admin ingresa como URL de red social un valor sin esquema válido (por ejemplo, `naturalvers` o `ftp://x`)
- **THEN** el campo rechaza el valor y muestra un error de validación

#### Scenario: URL válida aceptada

- **WHEN** un admin ingresa una URL con esquema `https`
- **THEN** el campo acepta el valor y el pie muestra el enlace correspondiente

### Requirement: Organización y accesibilidad del pie de sitio

El pie SHALL organizarse en bloques separados —marca, enlaces, contacto y redes sociales— apilados en una columna en mobile y distribuidos en columnas en desktop, con encabezados de sección en español, foco de teclado visible en cada enlace y sin desbordes horizontales.

#### Scenario: Distribución responsive

- **WHEN** el viewport es de mobile (ancho menor al breakpoint `sm`)
- **THEN** los bloques del pie se apilan en una columna sin generar scroll horizontal

#### Scenario: Distribución en desktop

- **WHEN** el viewport es de desktop (ancho `md` o mayor)
- **THEN** los bloques del pie se distribuyen en múltiples columnas

#### Scenario: Foco de teclado visible

- **WHEN** un visitante navega el pie con la tecla Tab
- **THEN** cada enlace y control enfocado muestra un indicador de foco visible

#### Scenario: Encabezados de sección

- **WHEN** el pie renderiza sus secciones (enlaces, contacto, redes)
- **THEN** cada sección presenta su encabezado con un texto en español
