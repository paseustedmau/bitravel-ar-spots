# Bug: Botón AR oculto en Chrome para iOS

**Estado:** ✅ Resuelto  
**Fecha:** 2026-05-07  
**Afecta:** `<model-viewer>` en Chrome / CriOS / cualquier browser iOS que no sea Safari  
**Archivo clave:** `src/components/ARViewer.tsx`, `src/lib/device.ts`

---

## Síntoma

En un **iPhone 15 con Chrome**, el modelo 3D de la ballena cargaba correctamente pero no había ningún botón visible para activar la cámara AR. El usuario no podía iniciar la experiencia de realidad aumentada.

En Safari (mismo dispositivo) el botón sí aparecía y AR funcionaba.

---

## Causa raíz

`<model-viewer>` gestiona su botón AR a través de un **slot nativo** (`slot="ar-button"`) dentro de su shadow DOM. Internamente, el componente evalúa qué modos AR están disponibles en el browser actual:

```
ar-modes="scene-viewer webxr quick-look"
```

| Modo | Requiere | iOS Safari | iOS Chrome |
|---|---|---|---|
| `quick-look` | iOS + Safari | ✅ | ❌ |
| `webxr` | WebXR API | ❌ | ❌ |
| `scene-viewer` | Android + Google AR | ❌ | ❌ |

**Chrome en iOS no implementa WebXR** y no tiene acceso a AR Quick Look a través de la API de `<model-viewer>`. Al no detectar ningún modo compatible, `<model-viewer>` **oculta automáticamente** todo elemento en el slot `ar-button`, sin importar el CSS aplicado.

---

## Por qué iOS Quick Look SÍ funciona en Chrome

Apple Quick Look puede abrirse desde **cualquier browser iOS** (no solo Safari) usando una etiqueta anchor HTML nativa:

```html
<a href="modelo.usdz" rel="ar">Abrir en AR</a>
```

Esta es una característica del sistema operativo iOS, no del browser. Cuando iOS detecta el atributo `rel="ar"` en un enlace a un archivo USDZ, abre Quick Look directamente.

`<model-viewer>` solo usa este mecanismo cuando detecta Safari. En otros browsers iOS, no lo activa.

---

## Solución implementada

### 1. Detección de browser en `src/lib/device.ts`

Se añadió detección de Safari vs. otros browsers iOS:

```ts
// Safari: tiene "Safari" en el UA pero NO Chrome/CriOS/FxiOS/OPiOS
const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|OPiOS/.test(ua);

// Quick Look funciona en TODOS los browsers iOS vía anchor rel="ar"
const supportsQuickLook = isIOS;
```

### 2. Botón manual en `src/components/ARViewer.tsx`

Se renderiza un `<a href="*.usdz" rel="ar">` **fuera del shadow DOM** de `<model-viewer>` cuando se detecta iOS + browser no-Safari:

```tsx
// Chrome en iOS: model-viewer oculta su botón → renderizamos anchor manual
const needsManualQuickLook = device.supportsQuickLook && !device.isSafari && !!usdzUrl;

{needsManualQuickLook && (
  <a
    href={usdzUrl}
    rel="ar"
    id="ar-quicklook-manual"
    onClick={onARButtonClick}
    style={arBtnStyle}
  >
    <CubeIcon />
    {arButtonLabel}
  </a>
)}
```

Este anchor activa Quick Look nativo de iOS independientemente del browser.

---

## Matriz de compatibilidad final

| Dispositivo | Browser | AR funciona | Mecanismo |
|---|---|---|---|
| iPhone / iPad | Safari | ✅ | `<model-viewer>` slot `ar-button` → Quick Look USDZ |
| iPhone / iPad | Chrome | ✅ | Anchor manual `<a rel="ar">` fuera del shadow DOM |
| iPhone / iPad | Firefox / Edge / Brave | ✅ | Mismo anchor manual |
| Android | Chrome | ✅ | `<model-viewer>` → Scene Viewer / WebXR |
| Desktop | Cualquier browser | ⚠️ | Fallback: solo visualización 3D (sin AR) |

---

## Notas para el futuro

- **El archivo USDZ es obligatorio** para AR en iOS. Sin `ios-src` no hay Quick Look.
- Si se añaden nuevos browsers iOS (Opera Mini, etc.) la detección `isSafari` los cubre correctamente: cualquier browser que no sea Safari usará el anchor manual.
- `<model-viewer>` v3+ podría mejorar el soporte de Chrome iOS en el futuro. Revisar el [changelog](https://github.com/google/model-viewer/releases) en actualizaciones.
- El evento `ar-status` de `<model-viewer>` **no se dispara** cuando el AR se abre vía el anchor manual. Si se necesita tracking de AR en Chrome iOS, usar el evento `onClick` del anchor (`onARButtonClick`).
