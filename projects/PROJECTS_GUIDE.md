# Projects CMS — Guía de uso

## Dónde están los archivos

```
projects/
  projects.json          ← fuente de verdad de todos los proyectos
  PROJECTS_GUIDE.md      ← esta guía
public/projects/
  thumbnails/            ← imágenes 400×300 (tarjeta mediana)
  covers/                ← imágenes 800×600 (tarjeta featured)
src/lib/projects.ts      ← funciones de acceso a datos + tipos
```

## Schema de un proyecto

```json
{
  "id": "mi-proyecto",              // slug único, sin espacios
  "name": "Mi Proyecto",            // nombre para mostrar
  "short_desc": "Descripción...",   // máx ~120 caracteres
  "category": "saas",               // ver categorías abajo
  "status": "produccion",           // "produccion" | "desarrollo" | "demo"
  "order": 10,                      // orden de aparición (menor = primero)
  "tags": ["tag1", "tag2"],         // para búsqueda con Fuse.js
  "url": "https://...",             // link al proyecto
  "code_url": null,                 // link al repo o null
  "thumbnail": null,                // "/projects/thumbnails/mi-proyecto.webp" o null
  "cover": null,                    // "/projects/covers/mi-proyecto.webp" o null
  "stack": ["Next.js", "Supabase"], // tecnologías usadas
  "badge": "En producción",         // texto del badge o null
  "archived": false                 // true = no aparece en el portfolio
}
```

## Categorías disponibles

| key       | Label   |
|-----------|---------|
| `saas`    | SaaS    |
| `demo`    | Demo    |
| `negocio` | Negocio |
| `ia`      | IA      |
| `app`     | App     |
| `juego`   | Juego   |

## Dos secciones en projects.json

### `featured` (máx 3)
Proyectos principales. Se muestran **siempre** en la parte superior con layout especial:
- `featured[0]` → tarjeta grande (2/3 del ancho)
- `featured[1]` → tarjeta lateral (1/3)
- `featured[2]` → tarjeta mediana debajo

No se ven afectados por filtros ni búsqueda.

### `all`
Todos los demás proyectos. Se filtran por categoría, se buscan con Fuse.js y se paginan.

- Hasta 20 resultados → botón "Ver N más" (expand)
- Más de 20 resultados → paginación numérica

## Cómo agregar un proyecto

1. **Agrego la entrada** en `projects.json` (sección `all` en la mayoría de casos)
2. **Elijo el order**: usar múltiplos de 10 para dejar espacio entre proyectos
3. **Subo la imagen** a `public/projects/thumbnails/mi-proyecto.webp` (400×300)
4. **Actualizo el campo** `"thumbnail": "/projects/thumbnails/mi-proyecto.webp"`

## Imágenes recomendadas

| Uso        | Carpeta        | Dimensiones | Formato |
|------------|----------------|-------------|---------|
| Cards      | thumbnails/    | 400 × 300   | .webp   |
| Featured   | covers/        | 800 × 600   | .webp   |

Si `thumbnail` es `null`, la tarjeta muestra un gradiente según la categoría del proyecto.

## Archivar un proyecto

Cambiá `"archived": true` en projects.json. El proyecto desaparece del portfolio pero queda en los datos para uso futuro (ej: página `/archivo`).

## Funciones disponibles en src/lib/projects.ts

```ts
getProjects()          // featured + all mergeados, por order
getFeatured()          // solo featured, máx 3
getAllProjects()        // solo los no-featured
getByCategory(cat)     // filtra all por categoría
searchProjects(query)  // búsqueda Fuse.js (name + tags + short_desc)
getVisible(page, limit)// paginación simple de all
getArchived()          // proyectos archivados
getCategoryCounts()    // { all: N, saas: N, ... }
```
