## 1. IDENTIDAD DEL PROYECTO Y OBJETIVOS

* **Rol del Agente:** `LiteSpeed_Architect`
* **Misión:** Construir una Landing Page "Single Page" de alto rendimiento.
* **KPIs:** Lighthouse Performance score > 98, SEO score 100, Accesibilidad 100.
* **Stack Tecnológico:**
* **Core:** HTML5 Semántico, CSS3 (Moderno), JavaScript (Vanilla ES6+).
* **Build Tool:** Vite (vía pnpm).
* **Dependencias:** CERO dependencias de runtime (ni jQuery, ni Bootstrap, ni React/Vue). Solo devDependencies para build/optimización.

---

## 2. ESTRUCTURA DE DIRECTORIOS (ESTRICTA)

El proyecto debe seguir esta arquitectura modular para facilitar el *code-splitting* y el mantenimiento.

```text
/
├── public/                     # Archivos estáticos que no pasan por compilación
│   ├── robots.txt              # Directivas para crawlers
│   ├── sitemap.xml             # Mapa del sitio
│   └── favicon.ico             
├── src/
│   ├── assets/                 # Recursos que serán procesados/optimizados
│   │   ├── images/             # Imágenes crudas (jpg, png)
│   │   └── icons/              # SVG icons
│   ├── css/
│   │   ├── base/               # Reset, tipografía, variables globales
│   │   │   ├── _reset.css
│   │   │   └── _variables.css
│   │   ├── components/         # Estilos reutilizables (botones, cards)
│   │   └── main.css            # Punto de entrada CSS (imports)
│   ├── logic/                  # Lógica JavaScript Modular
│   │   ├── core/
│   │   │   └── lazy-loader.js  # Orquestador del IntersectionObserver
│   │   └── sections/           # JS específico para cada sección (carga bajo demanda)
│   │       ├── contact-form.js
│   │       └── interactive-map.js
│   ├── main.js                 # Punto de entrada JS (Vite entry)
│   └── index.html              # Archivo HTML único
├── package.json
├── vite.config.js              # Configuración de optimización y plugins
└── AGENTS.md                   # Este archivo de contexto

```

---

## 3. REGLAS DE DESARROLLO (NON-NEGOTIABLES)

### A. Rendimiento (Performance First)

1. **Lazy Loading de Imágenes:**
* Todas las imágenes `<img>` deben tener `loading="lazy"` y `decoding="async"`, **EXCEPTO** la imagen del Hero (la primera visible), que debe tener `fetchpriority="high"`.
* Uso obligatorio de etiqueta `<picture>` con fuentes AVIF (primero) y WebP (fallback).
* **Dimensiones:** Siempre especificar atributos `width` y `height` para evitar CLS (Cumulative Layout Shift).


2. **Lazy Loading de Secciones (Arquitectura):**
* No cargar JS complejo al inicio.
* Usar `IntersectionObserver` en `src/logic/core/lazy-loader.js` para detectar cuando una sección entra al viewport.
* Usar `import()` dinámico para cargar el JS de esa sección (ej: el validador del formulario de contacto solo se descarga al ver el formulario).
* Aplicar `content-visibility: auto` en el CSS de las secciones que están "below the fold" (fuera de la pantalla inicial).


3. **CSS:**
* Prohibido usar `@import` en CSS (bloquea el renderizado). Usar el sistema de módulos de Vite.
* Arquitectura Mobile-First (media queries `min-width`).
* Usar Variables CSS (`--primary-color`) para todo el theming.



### B. SEO Técnico (Search Engine Optimization)

1. **Metaetiquetas Críticas:**
* `title`: Único, descriptivo, < 60 caracteres.
* `description`: Persuasiva, incluye keywords, < 160 caracteres.
* `canonical`: Apuntando a la URL principal.
* **Open Graph (OG):** Configurar `og:title`, `og:description`, `og:image` para redes sociales.


2. **Semántica HTML:**
* Solo un `<h1>` por página (en el Hero).
* Uso correcto de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` y `<aside>`.
* Los enlaces deben tener texto descriptivo (evitar "haz clic aquí").


3. **Datos Estructurados (JSON-LD):**
* Incluir un script `application/ld+json` en el `<head>` describiendo la "Organization", "WebSite" o "Product" según corresponda.


4. **Accesibilidad (A11y):**
* Todas las imágenes deben tener atributo `alt`.
* Colores con contraste mínimo AA.
* Elementos interactivos deben ser focusables via teclado.



---

## 4. INSTRUCCIONES ESPECÍFICAS DE IMPLEMENTACIÓN

### Configuración del Lazy Loader (Vanilla JS)

El agente debe implementar el siguiente patrón en `src/logic/core/lazy-loader.js`:

```javascript
// Patrón de Hidratación Progresiva
export function initLazyLoader() {
  const targets = document.querySelectorAll('[data-module]');
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const moduleName = entry.target.dataset.module;
        // Importación dinámica basada en el data-attribute
        import(`../sections/${moduleName}.js`)
          .then(module => module.default(entry.target))
          .catch(err => console.error(`Error loading ${moduleName}`, err));
          
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: "200px" }); // Cargar 200px antes de llegar

  targets.forEach(t => observer.observe(t));
}

```

### Configuración de Vite (`vite.config.js`)

El agente debe configurar Vite para minimizar agresivamente:

```javascript
import { defineConfig } from 'vite';
// Se asume uso de plugin de imágenes si se desea automatizar
export default defineConfig({
  build: {
    target: 'esnext', // Código moderno y ligero
    polyfillModulePreload: false, // Ahorrar bytes
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: undefined, // Dejar que Vite decida o configurar chunks específicos
      }
    }
  }
});

```

---

## 5. FLUJO DE TRABAJO SUGERIDO

1. **Scaffolding:** Crear estructura de carpetas y archivos base HTML/CSS.
2. **Hero Section:** Implementar la primera sección con CSS inline crítico o carga prioritaria.
3. **Core CSS:** Definir variables y tipografía.
4. **Skeleton HTML:** Maquetar el resto de secciones semánticamente.
5. **Lazy Logic:** Implementar el `lazy-loader.js`.
6. **Assets:** Convertir imágenes a WebP/AVIF y colocarlas en `public` o `src/assets`.
7. **Audit:** Correr `pnpm build && pnpm preview` y auditar con Lighthouse antes de dar por finalizado.