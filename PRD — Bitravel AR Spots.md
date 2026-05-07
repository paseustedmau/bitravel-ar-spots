# PRD — Bitravel AR Spots

**Producto:** Bitravel AR Spots
**Versión:** v1.0
**Tipo:** WebAR / Realidad Aumentada activada por QR
**Proyecto padre:** Bitravel
**Canal principal:** Tótems turísticos, guía digital, red WiFi pública y activaciones físicas
**Estado:** Documento base para diseño, desarrollo y validación comercial
**Prioridad:** Alta
**Objetivo inicial:** Demo funcional y vendible para destinos turísticos, comenzando con Puerto Vallarta.

---

# 1. Resumen ejecutivo

**Bitravel AR Spots** es una capa de experiencias turísticas inmersivas activadas desde puntos físicos de la ciudad mediante códigos QR. El usuario escanea un QR colocado en un tótem, anuncio, señalética, módulo turístico o punto patrocinado, abre una página web desde su navegador móvil y visualiza contenido 3D en realidad aumentada.

La primera experiencia recomendada es una **ballena jorobada en realidad aumentada**, por su conexión directa con Puerto Vallarta, su alto impacto visual y su potencial turístico, educativo y comercial.

El producto no debe iniciar como una app nativa ni como una plataforma de realidad aumentada compleja. Debe comenzar como un **visor WebAR simple, ligero, medible y reutilizable**, conectado al ecosistema Bitravel.

La lógica estratégica es clara: Bitravel ya contempla tótems informativos que dirigen a usuarios hacia una guía digital interactiva en zonas como Malecón, Olas Altas y Marina . Además, la plataforma ya incluye guía interactiva, marketplace de experiencias, rutas, eventos, contenido geolocalizado y canales de conectividad pública . AR Spots debe funcionar como una capa de atracción, diferenciación y conversión dentro de ese ecosistema.

---

# 2. Contexto del producto

## 2.1 Problema

Los destinos turísticos compiten por atención, diferenciación y experiencias memorables. Sin embargo, la mayoría de los puntos físicos de información turística siguen funcionando de forma estática:

* Tótems con información limitada.
* Mapas impresos poco interactivos.
* Códigos QR que solo abren páginas informativas.
* Poca conexión entre el mundo físico y el digital.
* Baja medición del interés real de los visitantes.
* Pocas experiencias memorables patrocinables.
* Escasa innovación visible para ayuntamientos y marcas turísticas.

Para Bitravel, esto representa una oportunidad: transformar cada tótem o punto turístico en un **punto de experiencia digital medible**.

---

## 2.2 Oportunidad

Bitravel puede convertir infraestructura física existente —tótems, señalética, módulos, WiFi público, puntos de afluencia— en una red de experiencias inmersivas.

La oportunidad tiene cuatro capas:

| Capa                  | Oportunidad                                                      |
| --------------------- | ---------------------------------------------------------------- |
| Experiencia turística | Crear momentos memorables y compartibles.                        |
| Gobierno / destino    | Mostrar innovación, modernización y promoción turística.         |
| Comercio local        | Conectar RA con tours, reservas, restaurantes y promociones.     |
| Datos                 | Medir escaneos, interés por zona, horarios, idioma y conversión. |

Bitravel ya proyecta usuarios derivados de WiFi y guía digital con crecimiento sostenido, por lo que AR Spots puede operar como un componente de engagement dentro de ese tráfico proyectado .

---

# 3. Visión del producto

## 3.1 Visión

Convertir puntos físicos de la ciudad en experiencias digitales inmersivas que conecten al turista con la historia, naturaleza, cultura, comercio y servicios del destino.

## 3.2 Declaración de producto

**Bitravel AR Spots permite que cualquier turista escanee un QR en un punto físico de la ciudad y viva una experiencia de realidad aumentada desde su navegador, sin descargar una app.**

## 3.3 Posicionamiento

No debe comunicarse como:

> Plataforma avanzada de realidad aumentada.

Debe comunicarse como:

> Experiencias turísticas inmersivas activadas por QR desde puntos físicos de la ciudad.

O, de forma comercial:

> Una nueva capa digital para hacer que los tótems turísticos cobren vida.

---

# 4. Objetivos

## 4.1 Objetivo general

Crear un producto WebAR simple, escalable y medible que permita desplegar experiencias de realidad aumentada desde QR físicos, integradas al ecosistema Bitravel.

## 4.2 Objetivos específicos

1. Permitir que un usuario acceda a una experiencia AR sin descargar una app.
2. Reutilizar el mismo visor para múltiples contenidos 3D.
3. Medir escaneos, aperturas, activaciones AR y clics posteriores.
4. Conectar cada experiencia AR con la guía Bitravel, marketplace, rutas o patrocinadores.
5. Crear un demo vendible para ayuntamientos, fideicomisos turísticos y patrocinadores.
6. Habilitar un catálogo futuro de experiencias AR por zona, tema o campaña.
7. Reducir el costo y tiempo de implementación frente a soluciones AR nativas.

---

# 5. No objetivos iniciales

En la primera versión **no** se debe construir:

* App nativa iOS/Android.
* Login obligatorio.
* Editor 3D avanzado.
* CMS complejo.
* RA persistente por geolocalización exacta.
* Multiplayer AR.
* Reconocimiento avanzado de espacios.
* Avatares.
* Compras dentro de la experiencia AR.
* Animaciones complejas por interacción.
* Gamificación completa.
* Sistema de misiones.
* Motor propio de renderizado 3D.
* Integración profunda con mapas en tiempo real.

Estos puntos pueden evaluarse en fases posteriores.

---

# 6. Usuarios objetivo

## 6.1 Usuario turista

### Perfil

Visitante nacional o extranjero que recorre una zona turística y escanea un QR desde un tótem, señalética, museo, malecón, playa, plaza o punto de interés.

### Necesidades

* Entender qué hay cerca.
* Vivir algo interesante rápidamente.
* No instalar aplicaciones.
* Acceder en su idioma.
* Compartir algo visual.
* Descubrir tours, rutas o experiencias relacionadas.

### Fricciones

* Mala conectividad.
* Desconfianza al escanear QR.
* Poco tiempo.
* Baja tolerancia a cargas lentas.
* Dispositivos variados.
* Falta de claridad sobre cómo usar AR.

---

## 6.2 Usuario residente

### Perfil

Persona local que usa el tótem, WiFi público o guía digital y puede interactuar con experiencias culturales, educativas o urbanas.

### Necesidades

* Acceso simple.
* Información local útil.
* Experiencias familiares o educativas.
* Eventos y contenido de ciudad.

---

## 6.3 Ayuntamiento / destino turístico

### Perfil

Entidad pública o turística interesada en modernizar la experiencia urbana y turística.

### Necesidades

* Mostrar innovación.
* Promover cultura y naturaleza.
* Medir uso de infraestructura turística.
* Generar valor visible en tótems.
* Justificar inversión.
* Integrar campañas institucionales.

Bitravel ya se plantea como una solución tecnológica para mejorar la experiencia urbana y turística mediante plataformas accesibles e intuitivas, conectando ciudadano, turista y gobierno .

---

## 6.4 Patrocinador / comercio local

### Perfil

Marca, hotel, restaurante, tour operador, agencia, atracción o comercio que busca visibilidad frente a turistas.

### Necesidades

* Presencia innovadora.
* Métricas claras.
* Conversión a reserva, cupón o visita.
* Asociación con experiencias memorables.

El modelo de Bitravel ya contempla ingresos por publicidad, comisiones, patrocinios y alianzas con empresas locales .

---

# 7. Casos de uso principales

## 7.1 Escanear QR y ver experiencia AR

**Actor:** Turista
**Objetivo:** Abrir una experiencia AR desde un tótem.

### Flujo

1. Usuario ve tótem con mensaje: “Escanea y mira una ballena en realidad aumentada”.
2. Escanea QR.
3. Se abre una URL WebAR.
4. La página muestra título, instrucciones y botón.
5. Usuario toca “Ver en realidad aumentada”.
6. El dispositivo abre la experiencia AR.
7. Usuario coloca el modelo en el espacio.
8. Usuario puede volver a la página y tocar CTA secundario.

### Resultado esperado

El usuario vive la experiencia sin instalar una app.

---

## 7.2 Ver contenido educativo

**Actor:** Turista, familia, estudiante, residente
**Objetivo:** Aprender sobre una especie, monumento, zona o evento.

### Ejemplo

Después de ver la ballena, el usuario lee:

* Temporada de avistamiento.
* Datos de conservación.
* Reglas de observación responsable.
* Tours recomendados.
* Enlace a guía Bitravel.

---

## 7.3 Conectar experiencia AR con marketplace

**Actor:** Turista
**Objetivo:** Reservar una experiencia relacionada.

### Ejemplo

Después de ver la ballena en RA:

```txt
¿Quieres vivirlo en el mar?
Explora tours de avistamiento de ballenas.
[Ver experiencias]
```

### Resultado esperado

AR funciona como entrada emocional hacia conversión comercial.

---

## 7.4 Activación patrocinada

**Actor:** Marca o comercio local
**Objetivo:** Patrocinar una experiencia AR.

### Ejemplo

Una marca patrocina “Ballena AR Spot” en Malecón.

Incluye:

* Logo discreto.
* CTA a promoción.
* Métricas mensuales.
* Reporte de escaneos.

---

## 7.5 Panel interno de métricas

**Actor:** Equipo Bitravel
**Objetivo:** Medir uso y desempeño.

### Métricas

* Escaneos por QR.
* Sesiones por experiencia.
* Activaciones AR.
* CTR hacia guía.
* CTR hacia marketplace.
* Dispositivo.
* Idioma.
* Zona.
* Tótem.
* Horario.
* Conversión comercial.

---

# 8. Alcance del MVP

## 8.1 MVP funcional

El MVP debe incluir:

| Módulo                   | Incluido en MVP              |
| ------------------------ | ---------------------------- |
| Página WebAR             | Sí                           |
| Modelo 3D ballena        | Sí                           |
| Soporte iOS/Android      | Sí, vía navegador compatible |
| QR por experiencia       | Sí                           |
| Metadata por experiencia | Sí                           |
| Analytics básico         | Sí                           |
| CTA hacia guía           | Sí                           |
| Multi-idioma básico      | Deseable                     |
| CMS                      | No obligatorio               |
| Login                    | No                           |
| App nativa               | No                           |

---

## 8.2 Experiencia inicial

### Nombre

**Ballena Jorobada AR**

### URL sugerida

```txt
https://bitravel.app/ar/ballena
```

### Contenido

* Modelo 3D de ballena.
* Título.
* Breve descripción.
* Botón para abrir AR.
* Instrucciones rápidas.
* CTA hacia guía / tours / contenido educativo.

---

# 9. Funcionalidades

# 9.1 Página de experiencia AR

## Descripción

Página web individual para cada experiencia.

## Requerimientos funcionales

| ID     | Requerimiento                                                      | Prioridad |
| ------ | ------------------------------------------------------------------ | --------- |
| AR-001 | La página debe cargar desde una URL única por experiencia.         | Alta      |
| AR-002 | Debe mostrar título, descripción, imagen poster y botón principal. | Alta      |
| AR-003 | Debe cargar un modelo `.glb` para visualización 3D.                | Alta      |
| AR-004 | Debe incluir soporte `.usdz` para iOS.                             | Alta      |
| AR-005 | Debe permitir activar AR desde el navegador móvil.                 | Alta      |
| AR-006 | Debe mostrar instrucciones de uso.                                 | Alta      |
| AR-007 | Debe mostrar fallback si el dispositivo no soporta AR.             | Alta      |
| AR-008 | Debe incluir CTA posterior hacia guía o marketplace.               | Alta      |
| AR-009 | Debe registrar eventos analíticos básicos.                         | Alta      |

---

# 9.2 Visor 3D

## Descripción

Componente que permite visualizar, rotar y activar el modelo en AR.

## Requerimientos

| ID     | Requerimiento                                                  | Prioridad |
| ------ | -------------------------------------------------------------- | --------- |
| AR-010 | El usuario debe poder ver el modelo en 3D antes de activar AR. | Alta      |
| AR-011 | El modelo debe poder rotar automáticamente.                    | Media     |
| AR-012 | El usuario debe poder manipular cámara/orbita del modelo.      | Media     |
| AR-013 | Debe mostrar sombras o iluminación básica.                     | Media     |
| AR-014 | Debe cargarse de manera optimizada.                            | Alta      |
| AR-015 | Debe soportar imagen poster mientras carga.                    | Alta      |

---

# 9.3 Activación AR

## Descripción

Función principal para abrir el modelo en realidad aumentada.

## Requerimientos

| ID     | Requerimiento                                                   | Prioridad |
| ------ | --------------------------------------------------------------- | --------- |
| AR-016 | Debe mostrar botón “Ver en realidad aumentada”.                 | Alta      |
| AR-017 | En Android debe intentar abrir Scene Viewer o WebXR compatible. | Alta      |
| AR-018 | En iOS debe abrir AR Quick Look mediante `.usdz`.               | Alta      |
| AR-019 | Si AR no está disponible, debe mantener vista 3D en navegador.  | Alta      |
| AR-020 | Debe registrar evento `ar_started`.                             | Alta      |

---

# 9.4 QR dinámico

## Descripción

Cada tótem o punto físico debe tener un QR único que permita medir origen.

## Estructura sugerida

```txt
https://bitravel.app/ar/ballena?spot=malecon-01
```

## Requerimientos

| ID     | Requerimiento                                              | Prioridad |
| ------ | ---------------------------------------------------------- | --------- |
| AR-021 | Cada QR debe apuntar a una experiencia específica.         | Alta      |
| AR-022 | Cada QR debe incluir identificador de tótem o zona.        | Alta      |
| AR-023 | El sistema debe registrar el parámetro `spot`.             | Alta      |
| AR-024 | Debe poder generarse QR imprimible.                        | Media     |
| AR-025 | Debe evitar URLs largas en impresión mediante short links. | Media     |

---

# 9.5 Catálogo de experiencias

## Descripción

Listado interno de experiencias AR disponibles.

## MVP

Puede iniciar como archivo JSON.

## Ejemplo

```json
{
  "ballena": {
    "title": "Ballena Jorobada",
    "subtitle": "Una experiencia inmersiva de Puerto Vallarta",
    "description": "Observa una ballena jorobada en realidad aumentada.",
    "modelGlb": "/models/whale.glb",
    "modelUsdz": "/models/whale.usdz",
    "poster": "/images/whale-poster.webp",
    "ctaLabel": "Explorar tours de avistamiento",
    "ctaUrl": "/experiencias/avistamiento-ballenas"
  }
}
```

## Requerimientos

| ID     | Requerimiento                                                     | Prioridad |
| ------ | ----------------------------------------------------------------- | --------- |
| AR-026 | El visor debe leer metadata por slug.                             | Alta      |
| AR-027 | Cada experiencia debe tener título, descripción, modelo y poster. | Alta      |
| AR-028 | Cada experiencia debe tener CTA configurable.                     | Alta      |
| AR-029 | Debe permitir agregar nuevas experiencias sin cambiar el visor.   | Alta      |
| AR-030 | En fase posterior debe migrar a CMS.                              | Media     |

---

# 9.6 Multi-idioma

## Descripción

La experiencia debe poder mostrarse en español e inglés.

Puerto Vallarta y Riviera Nayarit tienen una composición turística relevante de visitantes nacionales e internacionales, y Bitravel ya contempla guía multilingüe dentro de sus funcionalidades base .

## MVP

* Español por defecto.
* Inglés si el navegador está en inglés o si el QR incluye `lang=en`.

## Ejemplo

```txt
/ar/ballena?lang=en
```

## Requerimientos

| ID     | Requerimiento                                   | Prioridad |
| ------ | ----------------------------------------------- | --------- |
| AR-031 | La página debe soportar español.                | Alta      |
| AR-032 | La página debe soportar inglés.                 | Media     |
| AR-033 | El idioma debe poder definirse por query param. | Media     |
| AR-034 | El idioma debe poder inferirse del navegador.   | Baja      |

---

# 9.7 Analytics

## Descripción

Módulo de medición para validar uso, conversión y valor comercial.

## Eventos mínimos

| Evento              | Descripción                         |
| ------------------- | ----------------------------------- |
| `page_view`         | Usuario abre experiencia.           |
| `qr_scan_detected`  | Sesión entra con parámetro de spot. |
| `model_loaded`      | Modelo 3D cargó correctamente.      |
| `ar_button_clicked` | Usuario toca botón de AR.           |
| `ar_started`        | Se intenta abrir experiencia AR.    |
| `cta_clicked`       | Usuario toca CTA posterior.         |
| `fallback_viewed`   | Dispositivo no soporta AR.          |
| `error_model_load`  | Error al cargar modelo.             |

## Propiedades

| Propiedad         | Ejemplo      |
| ----------------- | ------------ |
| `experience_slug` | `ballena`    |
| `spot_id`         | `malecon-01` |
| `zone`            | `malecon`    |
| `device_type`     | `mobile`     |
| `os`              | `ios`        |
| `language`        | `es`         |
| `source`          | `totem`      |
| `campaign`        | `pv-launch`  |

## Requerimientos

| ID     | Requerimiento                           | Prioridad |
| ------ | --------------------------------------- | --------- |
| AR-035 | Registrar page views por experiencia.   | Alta      |
| AR-036 | Registrar clic en botón de AR.          | Alta      |
| AR-037 | Registrar clic en CTA.                  | Alta      |
| AR-038 | Registrar origen por tótem.             | Alta      |
| AR-039 | Crear dashboard básico interno.         | Media     |
| AR-040 | Exportar datos mensuales para reportes. | Media     |

---

# 9.8 Fallback para dispositivos no compatibles

## Descripción

No todos los dispositivos soportarán AR correctamente. La experiencia debe seguir siendo útil.

## Fallback

Si no hay AR:

* Mostrar modelo 3D navegable.
* Mostrar mensaje claro.
* Ofrecer CTA a guía.
* No bloquear la experiencia.

## Texto sugerido

```txt
Tu dispositivo no permite abrir realidad aumentada en este momento, pero puedes explorar el modelo en 3D y continuar descubriendo la guía Bitravel.
```

## Requerimientos

| ID     | Requerimiento                 | Prioridad |
| ------ | ----------------------------- | --------- |
| AR-041 | Detectar falta de soporte AR. | Media     |
| AR-042 | Mostrar mensaje de fallback.  | Alta      |
| AR-043 | Mantener vista 3D.            | Alta      |
| AR-044 | Mantener CTA hacia guía.      | Alta      |

---

# 9.9 Panel administrativo futuro

No entra en MVP inicial, pero debe considerarse en arquitectura.

## Funcionalidades futuras

* Crear experiencia AR.
* Subir modelo `.glb`.
* Subir modelo `.usdz`.
* Subir poster.
* Configurar título y descripción.
* Configurar idioma.
* Configurar CTA.
* Asociar experiencia a tótem.
* Ver métricas por experiencia.
* Ver métricas por zona.
* Activar/desactivar experiencia.
* Agregar patrocinador.

---

# 10. Experiencia de usuario

# 10.1 Principios UX

1. **Sin descarga:** El usuario debe entrar desde navegador.
2. **Una acción principal:** “Ver en realidad aumentada”.
3. **Carga visual inmediata:** Usar poster antes del modelo.
4. **Instrucciones mínimas:** Explicar en una línea.
5. **Fallback útil:** Si no hay AR, mantener valor.
6. **CTA claro:** Después de la emoción, dirigir a guía o reserva.
7. **Branding presente pero no invasivo.**
8. **Diseño mobile-first.**

---

# 10.2 Wireframe conceptual

```txt
┌─────────────────────────────────┐
│ Bitravel                         │
│ Experiencia AR                   │
├─────────────────────────────────┤
│                                 │
│       [ Modelo / Poster ]        │
│                                 │
│   Ballena Jorobada               │
│   Vive una experiencia de        │
│   realidad aumentada desde       │
│   Puerto Vallarta.               │
│                                 │
│   [ Ver en realidad aumentada ]  │
│                                 │
│   Apunta tu cámara al piso y     │
│   mueve el teléfono lentamente.  │
│                                 │
│   [ Ver tours relacionados ]     │
│                                 │
└─────────────────────────────────┘
```

---

# 10.3 Estados de la interfaz

## Estado 1: Cargando

```txt
Preparando experiencia...
```

Debe mostrar:

* Logo Bitravel.
* Skeleton o poster.
* Indicador de carga.

## Estado 2: Modelo cargado

Debe mostrar:

* Modelo 3D.
* Título.
* Descripción.
* Botón principal.

## Estado 3: AR disponible

Debe mostrar:

```txt
Ver en realidad aumentada
```

## Estado 4: AR no disponible

Debe mostrar:

```txt
Tu dispositivo no permite abrir RA, pero puedes explorar el modelo en 3D.
```

## Estado 5: Error

Debe mostrar:

```txt
No pudimos cargar esta experiencia. Intenta de nuevo o explora la guía Bitravel.
```

---

# 10.4 Copy base

## Español

### Título

```txt
Ballena Jorobada
```

### Subtítulo

```txt
Vive una experiencia de realidad aumentada desde Puerto Vallarta.
```

### Instrucción

```txt
Apunta tu cámara hacia una superficie plana y mueve lentamente tu teléfono.
```

### CTA principal

```txt
Ver en realidad aumentada
```

### CTA secundario

```txt
Explorar tours de avistamiento
```

---

## Inglés

### Title

```txt
Humpback Whale
```

### Subtitle

```txt
Experience augmented reality from Puerto Vallarta.
```

### Instruction

```txt
Point your camera at a flat surface and slowly move your phone.
```

### Primary CTA

```txt
View in augmented reality
```

### Secondary CTA

```txt
Explore whale watching tours
```

---

# 11. Diseño visual

## 11.1 Lineamientos

Debe respetar la identidad visual de Bitravel.

La paleta oficial incluye Azul Bitravel `#3234DA`, Amarillo `#F9C641`, Blanco, Verde sostenible, Coral y neutros como Gris Oscuro y Gris Claro .

## 11.2 Aplicación visual recomendada

| Elemento           | Color               |
| ------------------ | ------------------- |
| Botón principal    | Azul Bitravel       |
| CTA comercial      | Coral Vivo          |
| Badges eco/cultura | Verde Sostenible    |
| Fondo              | Blanco / Gris Claro |
| Texto principal    | Gris Oscuro         |
| Texto secundario   | Gris Medio          |

## 11.3 Estilo

* Minimalista.
* Limpio.
* Mobile-first.
* Visualmente turístico.
* No saturado.
* Con énfasis en el modelo 3D.

---

# 12. Requerimientos técnicos

# 12.1 Stack recomendado

## Frontend

* Next.js o Vite + React.
* TypeScript.
* Tailwind CSS.
* `<model-viewer>`.
* Vercel.

## Assets

* `.glb` para web/Android.
* `.usdz` para iOS.
* `.webp` para poster.
* JSON de configuración.

## Analytics

Opciones:

* Vercel Analytics.
* Plausible.
* PostHog.
* GA4.
* Supabase para eventos custom.

Para Bitravel, si ya estás usando Supabase en otros módulos, tendría sentido registrar eventos propios ahí desde el inicio.

---

# 12.2 Arquitectura funcional

```txt
Usuario
  ↓
Escanea QR
  ↓
URL /ar/[slug]?spot=malecon-01
  ↓
Frontend WebAR
  ↓
Carga metadata de experiencia
  ↓
Carga modelo 3D
  ↓
Usuario activa AR
  ↓
Evento analítico
  ↓
CTA hacia guía / marketplace / patrocinador
```

---

# 12.3 Estructura de rutas

```txt
/ar
/ar/[slug]
/ar/[slug]?spot=malecon-01
/ar/[slug]?spot=malecon-01&lang=en
```

---

# 12.4 Estructura de carpetas sugerida

```txt
/src
  /app
    /ar
      /[slug]
        page.tsx
  /components
    ARViewer.tsx
    ARExperienceHeader.tsx
    ARInstructions.tsx
    ARCTA.tsx
    ARFallback.tsx
  /data
    ar-experiences.json
  /lib
    analytics.ts
    device.ts
    ar.ts
/public
  /models
    whale.glb
    whale.usdz
  /posters
    whale.webp
```

---

# 12.5 Modelo de datos inicial

```ts
export type ARExperience = {
  slug: string;
  status: "active" | "inactive" | "draft";
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  instruction: {
    es: string;
    en: string;
  };
  modelGlbUrl: string;
  modelUsdzUrl?: string;
  posterUrl: string;
  cta: {
    label: {
      es: string;
      en: string;
    };
    url: string;
    type: "guide" | "marketplace" | "sponsor" | "external";
  };
  sponsor?: {
    name: string;
    logoUrl: string;
    url?: string;
  };
  tags: string[];
  zone?: string;
};
```

---

# 13. Integración con ecosistema Bitravel

AR Spots no debe vivir aislado. Debe conectar con:

| Módulo Bitravel       | Integración                                    |
| --------------------- | ---------------------------------------------- |
| Guía interactiva      | CTA hacia contenido turístico.                 |
| Marketplace           | Reservas de tours o experiencias.              |
| Comercios             | Promociones o cupones locales.                 |
| Gobierno              | Contenido cultural, educativo o institucional. |
| Conectividad          | Entrada desde WiFi público y tótems.           |
| Inteligencia de datos | Métricas por zona, horario e interacción.      |

El roadmap inicial de Bitravel contempla guía interactiva, marketplace, generador de itinerarios, chatbot, modo offline, reseñas y panel de gestión de contenidos dentro de Fase 1 . AR Spots puede integrarse como una extensión ligera de esa primera fase, sin bloquear el core del producto.

---

# 14. Contenidos AR posibles

## 14.1 Naturaleza

* Ballena jorobada.
* Tortuga marina.
* Mantarraya.
* Delfín.
* Jaguar.
* Guacamaya.
* Manglar interactivo.

## 14.2 Cultura

* Escultura del Malecón.
* Personaje histórico.
* Danza tradicional.
* Artesanía local.
* Mapa histórico animado.

## 14.3 Turismo comercial

* Preview de tour.
* Activación de hotel.
* Menú 3D de restaurante.
* Promoción de experiencia.
* Souvenir digital.

## 14.4 Gobierno / educación

* Cuidado de playas.
* Separación de residuos.
* Protección de fauna.
* Seguridad turística.
* Historia de la ciudad.

---

# 15. Primera experiencia recomendada

# Ballena Jorobada AR Spot

## Justificación

* Alta conexión con Puerto Vallarta.
* Impacto visual fuerte.
* Fácil de entender.
* Atractiva para turistas nacionales e internacionales.
* Útil para conectar con tours de avistamiento.
* Puede tener narrativa de conservación.
* Genera contenido compartible.

## Contenido sugerido

### Título

```txt
Ballena Jorobada
```

### Descripción

```txt
Explora una ballena jorobada en realidad aumentada y descubre una de las experiencias naturales más emblemáticas de Puerto Vallarta.
```

### CTA

```txt
Explorar tours de avistamiento
```

### Datos educativos

* Temporada de avistamiento.
* Reglas de observación responsable.
* Importancia ecológica.
* Distancia segura.
* Recomendaciones para turistas.

---

# 16. Métricas de éxito

# 16.1 Métricas de producto

| Métrica                          |           Meta MVP |
| -------------------------------- | -----------------: |
| Tasa de carga exitosa del modelo |              > 90% |
| Tiempo de carga inicial          | < 4 segundos ideal |
| Clic en botón AR                 |  > 35% de sesiones |
| Clic en CTA secundario           |   > 8% de sesiones |
| Error de carga                   |               < 5% |
| Rebote inmediato                 |              < 45% |

---

# 16.2 Métricas comerciales

| Métrica                           |         Meta inicial |
| --------------------------------- | -------------------: |
| Escaneos por tótem por día        |               20–100 |
| Activaciones AR por tótem por día |                10–50 |
| CTR a marketplace                 |                5–12% |
| Leads comerciales generados       | Variable por campaña |
| Patrocinadores interesados        |        3–5 en piloto |

---

# 16.3 Métricas institucionales

| Métrica             | Valor                               |
| ------------------- | ----------------------------------- |
| Uso por zona        | Justifica ubicación de tótems.      |
| Idioma del usuario  | Ayuda a promoción segmentada.       |
| Horarios pico       | Apoya operación turística.          |
| Contenido más visto | Informa estrategia de destino.      |
| Conversión a guía   | Mide valor del ecosistema Bitravel. |

---

# 17. Criterios de aceptación

## 17.1 Experiencia básica

| Criterio                          | Aceptación |
| --------------------------------- | ---------- |
| QR abre la página correcta        | Sí         |
| Página carga en móvil             | Sí         |
| Modelo 3D se visualiza            | Sí         |
| Botón AR aparece                  | Sí         |
| AR abre en dispositivo compatible | Sí         |
| Hay fallback en no compatibles    | Sí         |
| CTA secundario funciona           | Sí         |
| Se registran eventos básicos      | Sí         |

---

## 17.2 Performance

| Criterio                   | Aceptación    |
| -------------------------- | ------------- |
| Peso del modelo optimizado | Ideal < 15 MB |
| Poster optimizado          | Sí            |
| Página usable en 4G        | Sí            |
| No bloquea por login       | Sí            |
| Funciona sin instalar app  | Sí            |

---

## 17.3 Comercial

| Criterio                             | Aceptación   |
| ------------------------------------ | ------------ |
| QR puede imprimirse en tótem         | Sí           |
| Experiencia puede mostrarse en demo  | Sí           |
| Métricas pueden reportarse           | Sí           |
| CTA puede apuntar a guía/marketplace | Sí           |
| Puede agregarse sponsor visual       | Sí, opcional |

---

# 18. Roadmap

# Fase 0 — Preparación

**Duración sugerida:** 2–4 días

## Entregables

* Selección de modelo 3D.
* Validación de licencia.
* Conversión a `.glb` y `.usdz`.
* Definición de copy.
* Definición de URL.
* Diseño de pantalla base.
* Generación de QR de prueba.

---

# Fase 1 — MVP WebAR

**Duración sugerida:** 1 semana

## Entregables

* Página `/ar/ballena`.
* Visor con `<model-viewer>`.
* Modelo 3D cargando correctamente.
* Soporte básico iOS/Android.
* CTA a guía o landing.
* Analytics básico.
* QR funcional.
* Fallback.

## Resultado

Demo funcional para mostrar en celular.

---

# Fase 2 — Multi-experiencia

**Duración sugerida:** 1–2 semanas

## Entregables

* Soporte `/ar/[slug]`.
* Archivo JSON de experiencias.
* 3–5 experiencias AR.
* QR por experiencia.
* Parámetro `spot`.
* Reporte básico por experiencia.

---

# Fase 3 — Piloto en tótem

**Duración sugerida:** 2–4 semanas

## Entregables

* Instalación en 1–3 tótems.
* QR físico.
* Medición por spot.
* Reporte semanal.
* Ajustes de UX.
* Validación con usuarios reales.

---

# Fase 4 — Comercialización

**Duración sugerida:** posterior al piloto

## Entregables

* Paquetes patrocinables.
* Dashboard para reportes.
* Plantilla comercial.
* Casos de uso por zona.
* Kit de venta a gobierno y comercios.
* Tarifario por experiencia / tótem / campaña.

---

# Fase 5 — Plataforma AR Spots

**Duración sugerida:** posterior a validación

## Entregables

* CMS.
* Panel de métricas.
* Gestión de patrocinadores.
* Gestión de assets.
* Roles internos.
* Publicación/despublicación.
* Integración profunda con marketplace.

---

# 19. Riesgos

## 19.1 Riesgos técnicos

| Riesgo                | Impacto            | Mitigación                          |
| --------------------- | ------------------ | ----------------------------------- |
| Modelo muy pesado     | Carga lenta        | Optimizar texturas y polígonos.     |
| iOS no abre bien AR   | Mala experiencia   | Generar `.usdz` correcto.           |
| Android incompatible  | Fallback necesario | Mantener vista 3D.                  |
| Mala conexión en zona | Abandono           | Poster ligero y assets comprimidos. |
| Navegadores antiguos  | Errores            | Mensaje de compatibilidad.          |

---

## 19.2 Riesgos de producto

| Riesgo                              | Impacto        | Mitigación                                 |
| ----------------------------------- | -------------- | ------------------------------------------ |
| Experiencia se percibe como gimmick | Bajo valor     | Conectar con guía, tours y contenido real. |
| Poca claridad en tótem              | Bajo escaneo   | Copy físico directo y visual fuerte.       |
| Falta de CTA posterior              | Sin conversión | Diseñar salida comercial desde MVP.        |
| Usuario no entiende AR              | Fricción       | Instrucciones simples.                     |

---

## 19.3 Riesgos comerciales

| Riesgo                        | Impacto        | Mitigación                                      |
| ----------------------------- | -------------- | ----------------------------------------------- |
| Patrocinador no ve ROI        | Baja venta     | Reportes claros por tótem/campaña.              |
| Gobierno lo ve como accesorio | Baja prioridad | Posicionarlo como innovación turística medible. |
| Costos de modelos 3D suben    | Margen menor   | Crear librería propia reutilizable.             |

---

# 20. Dependencias

## Técnicas

* Hosting web.
* Dominio Bitravel.
* Modelo 3D optimizado.
* Conversión `.usdz`.
* Librería WebAR.
* Analytics.
* QR.

## Producto

* Copy.
* Branding.
* CTA destino.
* Landing o guía disponible.
* Definición del spot físico.

## Comerciales

* Ubicación de tótem.
* Permiso de impresión/colocación.
* Posible patrocinador.
* Reporte de resultados.

---

# 21. Requerimientos legales y de contenido

## 21.1 Licencias 3D

Todo modelo debe tener licencia clara para uso comercial.

Se debe registrar:

* Fuente.
* Autor.
* Tipo de licencia.
* Restricciones.
* Fecha de descarga.
* Modificaciones realizadas.

## 21.2 Privacidad

El MVP no debe recolectar datos personales.

Solo se deben medir eventos agregados:

* Dispositivo.
* Idioma.
* Spot.
* Experiencia.
* Clics.
* Timestamp.

Si más adelante se conecta con reservas, cuentas o promociones personalizadas, debe integrarse aviso de privacidad.

## 21.3 Seguridad QR

Los QR deben usar dominio oficial:

```txt
bitravel.app
```

Evitar dominios raros o acortadores no confiables.

---

# 22. Modelo comercial

## 22.1 Paquetes posibles

| Paquete             | Incluye                                             |
| ------------------- | --------------------------------------------------- |
| AR Spot Básico      | 1 experiencia AR + QR + métricas básicas.           |
| AR Spot Patrocinado | Experiencia + logo + CTA + reporte mensual.         |
| AR Ruta Inmersiva   | 3–5 experiencias conectadas por zona.               |
| AR Gobierno         | Experiencias culturales/educativas institucionales. |
| AR Comercial        | Activaciones para hoteles, tours o restaurantes.    |

---

## 22.2 Formas de monetización

| Modelo                | Descripción                                 |
| --------------------- | ------------------------------------------- |
| Fee de implementación | Creación/configuración inicial.             |
| Fee mensual           | Hosting, soporte, métricas y mantenimiento. |
| Patrocinio            | Marca paga por presencia en experiencia.    |
| Comisión              | Conversión a reservas o marketplace.        |
| Campaña temporal      | Activación por temporada/evento.            |

---

## 22.3 Ejemplo de producto vendible

```txt
Ballena AR Spot — Temporada de Avistamiento

Incluye:
- Experiencia WebAR desde QR.
- Modelo 3D de ballena.
- Branding Bitravel.
- CTA a tours de avistamiento.
- Reporte mensual de escaneos.
- Patrocinio visual opcional.
```

---

# 23. Estrategia de lanzamiento

## 23.1 Piloto recomendado

### Ubicación

* Malecón.
* Olas Altas.
* Marina.
* Zona hotelera.
* Módulo turístico.

Estas zonas ya aparecen en la ruta crítica de Bitravel para despliegue de internet público, guía interactiva y tótems .

## 23.2 Mensaje en tótem

```txt
Mira una ballena en realidad aumentada

Escanea el QR y vive una experiencia inmersiva desde tu celular.
No necesitas descargar ninguna app.
```

## 23.3 CTA físico

```txt
Escanea y descubre Puerto Vallarta en AR
```

## 23.4 Campaña digital

* Reel corto mostrando la experiencia.
* Video de 10 segundos escaneando el tótem.
* Post de “La ciudad cobra vida con Bitravel”.
* Material para Ayuntamiento.
* Material para patrocinadores.

---

# 24. Backlog inicial

## Must have

* Página WebAR.
* Modelo ballena.
* QR funcional.
* CTA.
* Analytics.
* Fallback.
* Diseño mobile.

## Should have

* Multi-idioma.
* Parámetro `spot`.
* Segundo modelo AR.
* Reporte básico.
* Sponsor opcional.

## Could have

* Compartir experiencia.
* Captura social.
* Animación.
* Audio ambiental.
* Mini trivia.
* Cupón asociado.

## Won’t have en MVP

* App nativa.
* Login.
* CMS avanzado.
* Geolocalización precisa.
* Gamificación completa.
* Marketplace embebido dentro de AR.

---

# 25. Historias de usuario

## HU-001 — Escanear QR

Como turista, quiero escanear un QR en un tótem para abrir una experiencia AR sin descargar una app.

### Criterios de aceptación

* El QR abre una URL válida.
* La página carga en móvil.
* El usuario puede iniciar la experiencia.

---

## HU-002 — Ver modelo en 3D

Como usuario, quiero ver el modelo 3D antes de activar AR para entender qué voy a experimentar.

### Criterios de aceptación

* El modelo aparece en pantalla.
* Puede rotarse o visualizarse.
* Tiene poster mientras carga.

---

## HU-003 — Activar AR

Como usuario, quiero tocar un botón para ver el modelo en mi espacio físico.

### Criterios de aceptación

* El botón aparece claramente.
* En dispositivo compatible abre AR.
* En dispositivo no compatible muestra fallback.

---

## HU-004 — Continuar hacia guía

Como turista, quiero acceder a más información después de la experiencia.

### Criterios de aceptación

* Existe CTA secundario.
* El CTA dirige a guía, marketplace o contenido relacionado.
* El clic se registra.

---

## HU-005 — Medir tótem origen

Como equipo Bitravel, quiero saber desde qué tótem llegó cada usuario para medir desempeño por ubicación.

### Criterios de aceptación

* La URL incluye `spot`.
* El evento registra `spot_id`.
* El reporte puede agrupar por spot.

---

## HU-006 — Configurar nuevas experiencias

Como equipo Bitravel, quiero agregar nuevas experiencias sin rehacer el visor.

### Criterios de aceptación

* El visor lee metadata por slug.
* Se puede agregar una nueva entrada en JSON.
* La URL nueva funciona.

---

# 26. Especificación de eventos

```ts
type AREvent =
  | "page_view"
  | "qr_scan_detected"
  | "model_loaded"
  | "model_load_error"
  | "ar_button_clicked"
  | "ar_started"
  | "fallback_viewed"
  | "cta_clicked";
```

## Payload sugerido

```json
{
  "event": "ar_button_clicked",
  "experience_slug": "ballena",
  "spot_id": "malecon-01",
  "zone": "malecon",
  "language": "es",
  "device_os": "ios",
  "device_type": "mobile",
  "timestamp": "2026-05-07T18:00:00Z"
}
```

---

# 27. Especificación de URL

## URL base

```txt
https://bitravel.app/ar/ballena
```

## URL con tótem

```txt
https://bitravel.app/ar/ballena?spot=malecon-01
```

## URL con idioma

```txt
https://bitravel.app/ar/ballena?spot=malecon-01&lang=en
```

## URL con campaña

```txt
https://bitravel.app/ar/ballena?spot=malecon-01&campaign=whale-season-2026
```

---

# 28. Recomendación de implementación

## Decisión técnica principal

Usar `<model-viewer>` para MVP.

## Razón

* Rápido.
* Ligero.
* No requiere app.
* Compatible con flujos WebAR comunes.
* Fácil de montar en Vercel.
* Permite validar antes de invertir más.

## Decisión de arquitectura

Separar:

1. **Visor AR**
2. **Metadata de experiencia**
3. **Assets 3D**
4. **Analytics**
5. **CTA comercial**

Esto permite que el producto escale sin rehacer el código base.

---

# 29. Definición de éxito del MVP

El MVP será exitoso si:

1. Una persona puede escanear un QR físico y abrir la experiencia.
2. La ballena carga en menos de pocos segundos en condiciones normales.
3. El usuario puede verla en 3D y activar AR.
4. El equipo puede medir escaneos y clics.
5. La experiencia puede mostrarse en una presentación comercial.
6. El flujo puede duplicarse para una segunda experiencia sin reprogramar todo.
7. La experiencia conecta con una acción de negocio: guía, tour, comercio o patrocinador.

---

# 30. Recomendación final

La versión correcta de **Bitravel AR Spots v1** debe ser pequeña, elegante y vendible:

```txt
QR físico
→ Página WebAR
→ Modelo 3D
→ Activación AR
→ CTA a guía / tour / patrocinador
→ Métricas
```

No hay que sobreconstruir. La ventaja de Bitravel no será “tener AR”; será **convertir la infraestructura turística física en puntos digitales de experiencia, conversión y datos**.

Para el primer demo, haría solo esto:

1. **Ballena Jorobada AR**
2. **URL `/ar/ballena`**
3. **QR para tótem**
4. **Analytics básico**
5. **CTA a guía o tours**
6. **Reporte simple de uso**

Con eso tienes una pieza muy potente para mostrar a gobierno, hoteles, tours, patrocinadores y aliados turísticos.
