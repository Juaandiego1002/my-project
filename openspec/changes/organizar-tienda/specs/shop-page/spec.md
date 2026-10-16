# Spec Delta

## Purpose

Define el comportamiento de la página de listado de tienda `/shop`: búsqueda por texto, filtrado por categoría, ordenamiento, la opción de ver todo el catálogo y los estados de resultado, presentados con una disposición visual organizada y responsive.

## ADDED Requirements

### Requirement: Búsqueda de productos por texto

La tienda SHALL permitir buscar productos mediante un término de texto en la URL (`?q=`) y SHALL devolver los productos cuyo título coincida con el término. La búsqueda SHALL evaluarse sobre campos de texto soportados y NO SHALL fallar ni vaciar la grilla silenciosamente.

#### Scenario: Búsqueda con coincidencias

- **WHEN** el usuario envía un término que coincide con el título de uno o más productos
- **THEN** la grilla muestra esos productos y el conteo de resultados refleja cuántos son

#### Scenario: La búsqueda coincide por título

- **WHEN** el usuario busca un término presente en el título de un producto pero ausente en su descripción
- **THEN** ese producto aparece en los resultados

#### Scenario: Búsqueda sin coincidencias

- **WHEN** el usuario busca un término que no coincide con ningún producto
- **THEN** la página muestra el estado vacío (no un error y no una grilla vacía sin explicación)

### Requirement: Filtrado por categoría

La tienda SHALL permitir filtrar el catálogo por una categoría mediante el parámetro `?category=` y SHALL mostrar únicamente los productos publicados que pertenecen a esa categoría.

#### Scenario: Activar una categoría

- **WHEN** el usuario selecciona una categoría
- **THEN** la grilla muestra solo los productos de esa categoría y el conteo refleja cuántos son

#### Scenario: Quitar la categoría

- **WHEN** el usuario vuelve a seleccionar la categoría activa
- **THEN** el filtro de categoría se quita y vuelve a mostrarse el catálogo completo

### Requirement: Opción para ver todos los productos

La tienda SHALL ofrecer una opción explícita ("Todos los productos") que, al activarse, quita el filtro de categoría y el término de búsqueda y muestra el catálogo completo.

#### Scenario: Activar "Todos los productos"

- **WHEN** el usuario elige "Todos los productos" teniendo filtros activos (categoría y/o búsqueda)
- **THEN** se limpian esos filtros y la grilla muestra todo el catálogo publicado

#### Scenario: Estado de la opción sin filtros

- **WHEN** no hay categoría ni término de búsqueda activos
- **THEN** "Todos los productos" se muestra como la opción activa

### Requirement: Ordenamiento que preserva filtros

La tienda SHALL permitir ordenar los resultados (por ejemplo: alfabético, más recientes, precio asc/desc) y SHALL preservar el filtro de categoría y el término de búsqueda al cambiar el orden.

#### Scenario: Cambiar el orden con categoría activa

- **WHEN** el usuario cambia el orden teniendo una categoría seleccionada
- **THEN** el orden se aplica sin perder el filtro de categoría

#### Scenario: Cambiar el orden con búsqueda activa

- **WHEN** el usuario cambia el orden teniendo un término de búsqueda activo
- **THEN** el orden se aplica sin perder el término de búsqueda

### Requirement: Conteo de resultados y estado vacío

La tienda SHALL mostrar un resumen legible del resultado (conteo de productos y contexto de filtros aplicados) y SHALL mostrar un estado vacío claro cuando no haya resultados, con una acción para limpiar los filtros.

#### Scenario: Conteo con filtros aplicados

- **WHEN** hay resultados con una categoría y/o búsqueda activas
- **THEN** se muestra el número de productos y una referencia al filtro aplicado

#### Scenario: Estado vacío con acción de limpieza

- **WHEN** no hay resultados para los filtros aplicados
- **THEN** se muestra un mensaje de "sin resultados" y una acción que limpia los filtros y vuelve al catálogo completo

### Requirement: Disposición visual organizada y responsive

La página de tienda SHALL presentar encabezado, filtros y grilla de forma organizada y usable tanto en desktop como en mobile, y los textos visibles de su interfaz SHALL estar en español.

#### Scenario: Vista en desktop

- **WHEN** la página se abre en un viewport de escritorio
- **THEN** los filtros (categorías y orden) se muestran de forma ordenada en una barra lateral y la grilla usa varias columnas

#### Scenario: Vista en mobile

- **WHEN** la página se abre en un viewport móvil
- **THEN** los filtros siguen siendo accesibles y la grilla se adapta sin romper el layout

#### Scenario: Copys en español

- **WHEN** el usuario ve la página de tienda
- **THEN** los textos de su interfaz (buscador, filtros, conteo y estado vacío) están en español
