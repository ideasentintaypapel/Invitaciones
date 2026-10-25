# ✨ Invitaciones 15 Años — Disco Glitter

Plantilla de invitación virtual estática para **GitHub Pages**.  
Optimizada para que la diseñadora gráfica solo toque **`datos.js`** y reemplace imágenes.

---

## 📁 Estructura de archivos

```
15anos-disco-glitter/
│
├── index.html           ← Estructura semántica (no editar)
├── style.css            ← Estilos y animaciones (no editar)
├── datos.js             ← ⭐ EL ÚNICO ARCHIVO A EDITAR ⭐
│
└── assets/
    ├── main.js          ← Lógica JS (no editar)
    └── img/
        ├── hero_bg.png          ← Fondo hero (reemplazar)
        ├── disco_ball.png       ← Bola disco decorativa (reemplazar)
        ├── foto_1.jpg, foto_2.jpg, foto_3.jpg ← Fotos del carrusel (reemplazar o sumar en datos.js)
        └── glitter_divider.png  ← Divisor decorativo (reemplazar)
```

---

## 🎨 Cómo personalizar para cada cliente

### 1. Editar `datos.js`

Abrí el archivo `datos.js` y modificá los valores entre comillas o los `true/false`:

```js
nombre: "Valentina",          // ← Cambiá por el nombre del cliente
fechaEvento: "2026-12-20T21:00:00",  // ← Fecha y hora del evento
lugar: {
  nombre: "Salón El Palacio",
  direccion: "Av. Siempreviva 742, Buenos Aires"
}
```

### 2. Reemplazar imágenes

Copiá las imágenes del cliente en `assets/img/` con los mismos nombres:

| Archivo | Dimensión sugerida | Descripción |
|---|---|---|
| `hero_bg.png` | 1920×1080px | Fondo de pantalla completa |
| `disco_ball.png` | 400×400px (PNG con fondo transparente ideal) | Decoración flotante |
| `foto_1.jpg`, `foto_2.jpg`, `foto_3.jpg` | 480×800px+ vertical | Fotos del carrusel de la festejada (configurar en datos.js) |
| `glitter_divider.png` | 800×40px | Divisor entre secciones |

### 3. Activar/desactivar secciones

En `datos.js`, en el bloque `mostrar:`, cambiá `true` a `false` para ocultar secciones:

```js
mostrar: {
  countdown:   true,    // Cuenta regresiva
  cronograma:  true,    // Programa del evento
  clima:       true,    // Widget clima (auto, solo < 7 días)
  dresscode:   true,    // Dress code
  regalos:     true,    // Datos bancarios
  hospedaje:   false,   // ← Desactivado por defecto
  rsvp:        true,    // Formulario de confirmación
  audio:       false    // ← Requiere archivo mp3 en assets/
}
```

---

## 🔗 Conectar el RSVP a Google Sheets (Guardado automático)

Cada confirmación guardará: **Familia / Apellido**, **asistirá** (Sí / No) y **cantidad personas** en la planilla de cálculo.

### Paso a paso:

1. Abrí tu planilla de Google Sheets (por ejemplo la que compartiste).
2. En el menú superior, hacé clic en **Extensiones > Apps Script**.
3. Borrá lo que haya y pegá este código:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var data = e.parameter || {};
    var sheet;

    // Si se envía sheetId o sheetUrl en datos.js, permite guardar en planillas distintas para cada cliente
    if (data.sheetId && data.sheetId.trim() !== "") {
      sheet = SpreadsheetApp.openById(data.sheetId.trim()).getActiveSheet();
    } else if (data.sheetUrl && data.sheetUrl.trim() !== "") {
      sheet = SpreadsheetApp.openByUrl(data.sheetUrl.trim()).getActiveSheet();
    } else {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    }

    var familia = data.familia || data.nombre || "Anónimo";
    var asistira = data.asistira || data.asistencia || "Sí";
    var cantidad = (asistira.toLowerCase() === "no") ? "0" : (data.cantidad || data.cantidadPersonas || "1");

    // Escribe en las 3 columnas: Familia | asistirá | cantidad personas
    sheet.appendRow([
      familia,
      asistira,
      cantidad
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
```

4. Hacé clic en **Implementar > Nueva implementación** (botón azul arriba a la derecha).
5. Seleccioná el tipo: **Aplicación web**.
   - **Descripción**: RSVP Quinceañera
   - **Ejecutar como**: `Yo` (tu cuenta de Google)
   - **Quién tiene acceso**: `Cualquiera` (Anyone)  ← *¡Muy importante para que las visitas puedan enviar su respuesta!*
6. Hacé clic en **Implementar**, autorizá los permisos y copiá la **URL de la aplicación web** (termina en `/exec`).
7. Pegá esa URL en `datos.js` en el campo `googleScriptUrl`:

```js
rsvp: {
  planillaUrl: "https://docs.google.com/spreadsheets/d/TU_ID_AQUI/edit?usp=sharing",
  sheetId: "TU_ID_AQUI",
  googleScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec"
}
```

> **Para futuros clientes:**  
> Sólo creás una nueva planilla de cálculo y cambiás el `sheetId` o `planillaUrl` en `datos.js`. Con el mismo Apps Script podés guardar respuestas en la planilla que quieras siempre que tu cuenta tenga acceso a ella.

---

## 🌤 Pronóstico del clima (automático en vivo)

El widget de clima ahora funciona automáticamente en tiempo real utilizando **Open-Meteo** (no requiere registro ni API key).

En `datos.js`:

```js
clima: {
  ciudad: "Ituzaingó",
  provincia: "Buenos Aires",
  lat: -34.6604,              // Coordenadas del salón (opcional, para máxima precisión)
  lon: -58.6662,
  siempreVisible: true        // true para pruebas; false para que solo aparezca a 7 días o menos
}
```

> **Nota:** La precisión de pronósticos meteorológicos reales alcanza hasta 7 días hacia adelante. Si faltan más de 7 días y `siempreVisible` está en `true`, se muestra el clima actual en vivo de la zona con una nota explicativa. También podés conectar OpenWeatherMap si tenés tu propia API key.

---

## 🎵 Agregar música

1. Subí el archivo MP3 a la carpeta `assets/`.
2. En `datos.js`:

```js
archivoAudio: "assets/cancion.mp3",
nombreCancion: "Mi canción favorita",
artistaCancion: "Artista",
mostrar: {
  audio: true   // ← activar
}
```

---

## 🚀 Publicar en GitHub Pages

1. Creá un repositorio en tu cuenta GitHub (ej: `ideasentintaypapel`)
2. Subí la carpeta completa a: `Invitaciones/nombre-cliente/`
3. Activá GitHub Pages en **Settings > Pages > Deploy from branch (main)**
4. La URL será: `https://ideasentintaypapel.github.io/Invitaciones/nombre-cliente/`

---

## 📋 Checklist para cada nuevo cliente

- [ ] Duplicar la carpeta `15anos-disco-glitter/`
- [ ] Renombrar con el nombre del cliente (ej: `sofia-2026/`)
- [ ] Editar `datos.js` con todos los datos del evento
- [ ] Reemplazar todas las imágenes en `assets/img/`
- [ ] Activar/desactivar secciones según necesidad
- [ ] Opcional: conectar Google Sheets (RSVP) y OpenWeatherMap (clima)
- [ ] Subir a GitHub y activar Pages
- [ ] Probar el link en móvil y escritorio

---

*Plantilla desarrollada con HTML5 + CSS3 + Vanilla JS · Sin frameworks · 100% estática*
