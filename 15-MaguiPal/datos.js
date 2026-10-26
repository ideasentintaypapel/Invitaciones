/**
 * ============================================================
 *  DATOS.JS — El Cerebro de la Invitación ✨
 * ============================================================
 *  INSTRUCCIONES PARA LA DISEÑADORA:
 *  Este es el ÚNICO archivo que debes editar para personalizar
 *  cada invitación. No necesitas tocar index.html ni style.css.
 *
 *  ► Cambia los textos entre comillas.
 *  ► Cambia true/false para mostrar u ocultar secciones.
 *  ► Reemplaza las imágenes en assets/img/ con las del cliente.
 * ============================================================
 */

const DATOS = {

  // ─────────────────────────────────────────
  //  1. DATOS PERSONALES
  // ─────────────────────────────────────────
  nombre: "Magui",                       // Nombre de la festejada
  inicial: "M",                              // Inicial para el sello del sobre
  nombreCompleto: "Magalí Palermo",         // Nombre completo
  edad: 15,                                  // Edad (se usará en "sus N años")

  // ── Texto del Hero (pantalla principal) ──────────────────
  // lineaArriba: texto pequeño sobre el nombre (dejar "" para ocultar)
  heroLineaArriba: "Te invito a los XV de",
  // El nombre grande del centro viene de la propiedad `nombre` de arriba
  // lineaAbajo: texto cursiva debajo del nombre (dejar "" para ocultar)
  heroLineaAbajo: "",                       // ← vacío = oculto

  // ─────────────────────────────────────────
  //  2. FECHA Y LUGAR DEL EVENTO
  // ─────────────────────────────────────────
  // ⚠ Formato ISO: "YYYY-MM-DDTHH:MM:SS" (año-mes-día hora:minutos:segundos)
  fechaEvento: "2026-12-12T21:00:00",

  // Texto de la fecha tal como quieres mostrarlo
  fechaTexto: "Sábado 12 de Diciembre de 2026",
  horaTexto: "21:00 hs",

lugar: {
    nombre: "Quinta La Soñada",
    direccion: "Turquía 2458, Ituzaingó",
    // URL para el mapa visual incrustado (reemplazamos los espacios por signos +):
    urlMapaEmbed: "https://maps.google.com/maps?q=Quinta+La+Soñada,+Turquía+2458,+Ituzaingó&t=&z=15&ie=UTF8&iwloc=&output=embed",
    // URL para el botón "Cómo llegar" (aquí pegas el link corto que me pasaste):
    urlMapaExterno: "https://maps.app.goo.gl/uxt4KjHKSkExQd9s5"
  },

  // ─────────────────────────────────────────
  //  3. MÚSICA
  // ─────────────────────────────────────────
  // Ruta relativa al archivo de audio (mp3 en assets/)
  // Déjalo en "" para ocultar el reproductor
  archivoAudio: "assets/cancion.mp3",                          // Ej: "assets/cancion.mp3"
  nombreCancion: "Training Season",
  artistaCancion: "Dua Lipa",

  // ─────────────────────────────────────────
  //  4. IMÁGENES
  // ─────────────────────────────────────────
  // Reemplaza los archivos en assets/img/ y actualiza los nombres aquí
  imagenes: {
    heroBg:   "assets/img/hero_bg.png",           // Fondo de la sección principal
    discoBall: "assets/img/disco_ball.png",        // Bola de disco decorativa
    fotoPrincipal: "assets/img/foto_1.jpg",        // Foto principal / de respaldo
    fotos: [                                       // Carrusel horizontal de fotos de la festejada
      "assets/img/foto_1.jpg",
      "assets/img/foto_2.jpg",
      "assets/img/foto_3.jpg"
    ],
    divisor: "assets/img/glitter_divider.png"     // Divisor decorativo
  },

  // ─────────────────────────────────────────
  //  5. CRONOGRAMA / LÍNEA DE TIEMPO
  // ─────────────────────────────────────────
  // Agrega o quita objetos según los momentos del evento
  // icono: usa cualquier emoji o código Unicode
  hitos: [
    { hora: "20:30", titulo: "Recepción de invitados", icono: "🌟" },
    { hora: "21:00", titulo: "Ingreso de la festejada", icono: "👑" },
    { hora: "21:30", titulo: "Vals de honor", icono: "💃" },
    { hora: "22:00", titulo: "Cena", icono: "🍽️" },
    { hora: "23:00", titulo: "Brindis & torta", icono: "🎂" },
    { hora: "23:30", titulo: "¡A bailar toda la noche!", icono: "🪩" }
  ],

  // ─────────────────────────────────────────
  //  6. DISEÑO — COLOR DE ACENTO
  // ─────────────────────────────────────────
  //
  //  Cambiá el color de acento de toda la invitación eligiendo uno de los
  //  palettes predefinidos. El valor de `colorAcento` debe ser una de las
  //  claves de la guía de abajo.
  //
  //  ┌─────────────────────────────────────────────────────────────────────┐
  //  │  GUÍA DE COLORES DISPONIBLES                                        │
  //  │─────────────────────────────────────────────────────────────────────│
  //  │  "plateado"  → Plateado / Plata   (#C0C0C0 – #E8E8E8)              │
  //  │  "dorado"    → Dorado clásico     (#FFD700 – #b8860b)  ← default   │
  //  │  "rosa"      → Rosa glamour       (#FF69B4 – #C2185B)              │
  //  │  "celeste"   → Celeste / Aqua     (#7ED6F7 – #1A8FB5)              │
  //  │  "violeta"   → Violeta / Lila     (#D580FF – #9B27AF)              │
  //  │  "azul"      → Azul marino        (#5B8DEF – #1A3A8A)              │
  //  │  "rojo"      → Rojo vibrante      (#FF4D6D – #C1121F)              │
  //  └─────────────────────────────────────────────────────────────────────┘
  //
  colorAcento: "plateado",

  // ─────────────────────────────────────────
  //  7. DRESSCODE
  // ─────────────────────────────────────────
  dresscode: {
    titulo: "Elegante",
    descripcion: "Ponete tu mejor outfit para brillar con nosotros en esta noche tan especial. ✨",
    detalle: "PD: Te pedimos Porfa que evites el [Azul / Blanco / Dorado] 😉",

    // Bolitas de color de la paleta:
    // Poné `mostrarColores: false` para ocultarlas por completo.
    // O poné `mostrarColores: true` para mostrarlas con los colores que elijas abajo.
    mostrarColores: false,
    colores: [
      { hex: "#003366", nombre: "Azul" },
      { hex: "#FFFFFF", nombre: "Blanco" },
      { hex: "#FFD700", nombre: "Dorado" }
    ]
  },

  // ─────────────────────────────────────────
  //  8. REGALOS / LISTA
  // ─────────────────────────────────────────
  regalos: {
    texto: "Tu presencia es el mejor regalo. Si deseas hacerme un obsequio, te comparto mis datos:",
    alias: "maga27.2",                   // Alias de Mercado Pago / transferencia
    cbu: "",              // CBU (déjalo en "" para ocultar)
    banco: "Magali Palermo - Mercado Pago"
  },

  // ─────────────────────────────────────────
  //  9. FORMULARIO RSVP (CONFIRMACIÓN DE ASISTENCIA)
  // ─────────────────────────────────────────
  rsvp: {
    // 📊 Link de la planilla de Google Sheets que compartirás con tu cliente:
    // (Cambiá este enlace o el ID para cada nueva familia/cliente)
    planillaUrl: "https://docs.google.com/spreadsheets/d/1J0BQUZKF3GUOkhNzZHJ4z_91pownx6k5j_gQawxXPDw/edit?usp=sharing",
    sheetId: "1J0BQUZKF3GUOkhNzZHJ4z_91pownx6k5j_gQawxXPDw",

    // 🔗 URL de la Aplicación Web de Google Apps Script:
    // (Pegá aquí la URL que te da Google al implementar el Apps Script en la planilla)
    // Dejá en "" para probar en modo demo local sin enviar a la planilla
    googleScriptUrl: "https://script.google.com/macros/s/AKfycbwCp5t0RF7joCVFgjbSe1jXSGOldtxnLdoE4uByQsL1TIBm4Rh625CgpLF1lk94RW_zIw/exec",

    fechaLimite: "2026-12-10",                 // Fecha límite para confirmar
    fechaLimiteTexto: "10 de Diciembre de 2026"
  },

  // ─────────────────────────────────────────
  //  10. INTERRUPTORES DE SECCIONES (true = visible / false = oculto)
  // ─────────────────────────────────────────
  mostrar: {
    countdown:   true,    // Cuenta regresiva
    cronograma:  false,    // Línea de tiempo / programa
    clima:       true,    // Widget de clima (solo visible < 7 días del evento)
    dresscode:   true,    // Sección dress code
    regalos:     true,    // Sección de regalos / CBU
    hospedaje:   false,   // Sección de hospedaje (completar datos abajo si es true)
    rsvp:        true,    // Formulario de confirmación de asistencia
    audio:       true     // Reproductor de música
  },

  // ─────────────────────────────────────────
  //  11. HOSPEDAJE (solo si mostrar.hospedaje = true)
  // ─────────────────────────────────────────
  hospedaje: {
    nombre: "Hotel Los Andes",
    direccion: "Calle Falsa 123, Buenos Aires",
    telefono: "+54 11 1234-5678",
    urlReserva: "https://www.booking.com",
    precioReferencia: "Desde $50.000 / noche",
    nota: "Menciona el evento de Valentina para obtener tarifa especial."
  },

  // ─────────────────────────────────────────
  //  12. CONTACTO / PIE DE PÁGINA
  // ─────────────────────────────────────────
  contacto: {
    whatsapp: "+5491131076245",               // Con código de país, sin espacios ni guiones
    whatsappTexto: "¿Consultas? Escribinos",
    instagram: "@valentina.quince"            // Déjalo en "" para ocultar
  },

  // ─────────────────────────────────────────
  //  13. CLIMA (Pronóstico real automático sin necesidad de API key)
  // ─────────────────────────────────────────
  clima: {
    ciudad: "Ituzaingó",                      // Ciudad del evento
    provincia: "Buenos Aires",                // Provincia
    codigoPais: "AR",                         // Código ISO del país
    lat: -34.6604,                            // Latitud de Quinta La Soñada (Ituzaingó)
    lon: -58.6662,                            // Longitud
    // true: muestra el clima en vivo o pronóstico siempre (ideal para pruebas).
    // false: solo se muestra en la semana del evento (a 7 días o menos).
    siempreVisible: false,
    apiKey: ""                                // Opcional: si preferís usar OpenWeatherMap con tu key personal
  }

};

// No borres esta línea — expone los datos al script principal
if (typeof module !== "undefined") module.exports = DATOS;
