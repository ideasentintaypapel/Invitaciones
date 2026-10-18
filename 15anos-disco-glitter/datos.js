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
  nombreCompleto: "Magalí Palermo",         // Nombre completo
  edad: 15,                                  // Edad (se usará en "sus N años")
  mensajePrincipal: "Te invita a celebrar\nsus 15 años",  // Mensaje debajo del nombre

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
    fotoPrincipal: "assets/img/foto_quinceañera.png", // Foto de la festejada
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
  //  6. DRESSCODE
  // ─────────────────────────────────────────
  dresscode: {
    titulo: "Dresscode",
    descripcion: "Elegante — Glamour Disco ✨",
    detalle: "Brillos, lentejuelas y colores vibrantes son bienvenidos. ¡Más brillo, mejor!"
  },

  // ─────────────────────────────────────────
  //  7. REGALOS / LISTA
  // ─────────────────────────────────────────
  regalos: {
    texto: "Tu presencia es el mejor regalo. Si deseas hacerme un obsequio, te comparto mis datos:",
    alias: "maga27.2",                   // Alias de Mercado Pago / transferencia
    cbu: "",              // CBU (déjalo en "" para ocultar)
    banco: "Magali Palermo - Mercado Pago"
  },

  // ─────────────────────────────────────────
  //  8. FORMULARIO RSVP
  // ─────────────────────────────────────────
  rsvp: {
    // URL del Google Apps Script para enviar datos a Google Sheets
    // Déjala en "" para mostrar el formulario en modo demo (sin envío real)
    googleScriptUrl: "",
    fechaLimite: "2026-12-10",                 // Fecha límite para confirmar
    fechaLimiteTexto: "10 de Diciembre de 2026"
  },

  // ─────────────────────────────────────────
  //  9. INTERRUPTORES DE SECCIONES (true = visible / false = oculto)
  // ─────────────────────────────────────────
  mostrar: {
    countdown:   true,    // Cuenta regresiva
    cronograma:  true,    // Línea de tiempo / programa
    clima:       true,    // Widget de clima (solo visible < 7 días del evento)
    dresscode:   true,    // Sección dress code
    regalos:     true,    // Sección de regalos / CBU
    hospedaje:   false,   // Sección de hospedaje (completar datos abajo si es true)
    rsvp:        true,    // Formulario de confirmación de asistencia
    audio:       false    // Reproductor de música
  },

  // ─────────────────────────────────────────
  //  10. HOSPEDAJE (solo si mostrar.hospedaje = true)
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
  //  11. CONTACTO / PIE DE PÁGINA
  // ─────────────────────────────────────────
  contacto: {
    whatsapp: "+5491112345678",               // Con código de país, sin espacios ni guiones
    whatsappTexto: "¿Consultas? Escribinos",
    instagram: "@valentina.quince"            // Déjalo en "" para ocultar
  },

  // ─────────────────────────────────────────
  //  12. CLIMA (API de OpenWeatherMap — mock si no hay API key)
  // ─────────────────────────────────────────
  clima: {
    apiKey: "",                               // Tu API key de openweathermap.org (gratis)
    ciudad: "Buenos Aires",
    codigoPais: "AR"                          // Código ISO del país
  }

};

// No borres esta línea — expone los datos al script principal
if (typeof module !== "undefined") module.exports = DATOS;
