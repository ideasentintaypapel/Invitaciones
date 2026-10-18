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
        ├── foto_quinceañera.png ← Foto de la festejada (reemplazar)
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
| `foto_quinceañera.png` | 400×500px | Foto vertical de la festejada |
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

## 🔗 Conectar el RSVP a Google Sheets

1. Creá una hoja de cálculo en Google Sheets.
2. En **Extensiones > Apps Script**, pegá el siguiente código:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = e.parameter;
  sheet.appendRow([
    data.timestamp,
    data.nombre,
    data.asistencia,
    data.cantidadPersonas,
    data.mensaje
  ]);
  return ContentService.createTextOutput("OK");
}
```

3. Publicá el script como **"Aplicación web"** (ejecutar como yo, acceso para todos).
4. Copiá la URL y pegala en `datos.js`:

```js
rsvp: {
  googleScriptUrl: "https://script.google.com/macros/s/TU_ID_AQUI/exec"
}
```

---

## 🌤 Conectar el clima a OpenWeatherMap

1. Creá una cuenta gratis en [openweathermap.org](https://openweathermap.org/api)
2. Obtené tu API key gratuita.
3. En `datos.js`:

```js
clima: {
  apiKey: "tu_api_key_aqui",
  ciudad: "Buenos Aires",
  codigoPais: "AR"
}
```

> **Nota:** El widget de clima solo aparece si faltan **7 días o menos** para el evento. Sin API key funciona en modo demo.

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
