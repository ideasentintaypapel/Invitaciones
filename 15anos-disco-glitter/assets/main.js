/**
 * ============================================================
 *  MAIN.JS — Lógica principal de la invitación
 * ============================================================
 *  Este archivo lee DATOS de datos.js y construye el DOM,
 *  gestiona el countdown, clima, RSVP y todas las animaciones.
 *  NO es necesario que la diseñadora modifique este archivo.
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", () => {

  // ── Verificar que datos.js fue cargado ──────────────────────
  if (typeof DATOS === "undefined") {
    console.error("❌ No se encontró datos.js. Asegúrate de incluirlo antes de main.js.");
    return;
  }

  // ════════════════════════════════════════════════════════════
  //  A. INYECCIÓN DE TEXTOS ESTÁTICOS
  // ════════════════════════════════════════════════════════════

  setTextContent("hero-nombre", DATOS.nombre);
  setTextContent("hero-fecha-texto", DATOS.fechaTexto);
  setTextContent("hero-hora-texto", DATOS.horaTexto);

  // Hero: línea superior
  const lineaArriba = DATOS.heroLineaArriba || "";
  const lineaAbajoEl = document.getElementById("hero-linea-abajo");
  const lineaArribaEl = document.getElementById("hero-linea-arriba");
  if (lineaArribaEl) {
    if (lineaArriba.trim() !== "") {
      lineaArribaEl.textContent = lineaArriba;
      lineaArribaEl.style.display = "";
    } else {
      lineaArribaEl.style.display = "none";
    }
  }
  // Hero: línea inferior
  const lineaAbajo = DATOS.heroLineaAbajo || "";
  if (lineaAbajoEl) {
    if (lineaAbajo.trim() !== "") {
      lineaAbajoEl.innerHTML = lineaAbajo.replace(/\n/g, "<br>");
      lineaAbajoEl.style.display = "";
    } else {
      lineaAbajoEl.style.display = "none";
    }
  }

  setTextContent("lugar-nombre", DATOS.lugar.nombre);
  setTextContent("lugar-direccion", DATOS.lugar.direccion);
  setTextContent("hero-nombre-footer", DATOS.nombre);

  // Imágenes
  setAttr("hero-bg-img", "src", DATOS.imagenes.heroBg);
  initCarruselFotos();

  // Divisores
  document.querySelectorAll(".glitter-divider img").forEach(img => {
    img.src = DATOS.imagenes.divisor;
  });

  // ── Mapa ────────────────────────────────────────────────────
  const iframeMapa = document.getElementById("mapa-embed");
  if (iframeMapa) iframeMapa.src = DATOS.lugar.urlMapaEmbed;

  const btnLlegar = document.getElementById("btn-como-llegar");
  if (btnLlegar) btnLlegar.href = DATOS.lugar.urlMapaExterno;

  // ── DressCode ───────────────────────────────────────────────
  setTextContent("dresscode-titulo", DATOS.dresscode.titulo);
  setTextContent("dresscode-descripcion", DATOS.dresscode.descripcion);
  setTextContent("dresscode-detalle", DATOS.dresscode.detalle);

  const paletaContainer = document.getElementById("paleta-colores");
  if (paletaContainer) {
    const mostrarColores = DATOS.dresscode.mostrarColores ?? (Array.isArray(DATOS.dresscode.colores) && DATOS.dresscode.colores.length > 0);
    if (mostrarColores && Array.isArray(DATOS.dresscode.colores) && DATOS.dresscode.colores.length > 0) {
      paletaContainer.innerHTML = DATOS.dresscode.colores.map(c => {
        const hex = typeof c === "string" ? c : (c.hex || c.color || "#FFD700");
        const nombre = typeof c === "string" ? c : (c.nombre || "");
        const isWhite = hex.toLowerCase() === "#ffffff" || hex.toLowerCase() === "#fff";
        const borderStyle = isWhite ? "border: 2px solid #aaa;" : "";
        return `<div class="color-chip" style="background:${hex}; color: ${hex}; ${borderStyle}" title="${nombre}" aria-label="${nombre}"></div>`;
      }).join("");
      paletaContainer.style.display = "";
    } else {
      paletaContainer.style.display = "none";
    }
  }

  // ── Regalos ─────────────────────────────────────────────────
  setTextContent("regalos-texto", DATOS.regalos.texto);
  setTextContent("regalos-alias", DATOS.regalos.alias);
  setTextContent("regalos-banco", DATOS.regalos.banco);
  if (DATOS.regalos.cbu && DATOS.regalos.cbu.trim() !== "") {
    setTextContent("regalos-cbu", DATOS.regalos.cbu);
    showEl("regalos-cbu-row");
  } else {
    hideEl("regalos-cbu-row");
  }

  // ── Contacto ────────────────────────────────────────────────
  const waLink = document.getElementById("whatsapp-link");
  if (waLink) {
    waLink.href = `https://wa.me/${DATOS.contacto.whatsapp}`;
    setTextContent("whatsapp-texto", DATOS.contacto.whatsappTexto);
  }
  if (DATOS.contacto.instagram && DATOS.contacto.instagram.trim() !== "") {
    setTextContent("instagram-link-text", DATOS.contacto.instagram);
    const igLink = document.getElementById("instagram-link");
    if (igLink) igLink.href = `https://instagram.com/${DATOS.contacto.instagram.replace("@", "")}`;
    showEl("instagram-wrap");
  } else {
    hideEl("instagram-wrap");
  }

  // ── RSVP ────────────────────────────────────────────────────
  setTextContent("rsvp-fecha-limite", DATOS.rsvp.fechaLimiteTexto);

  // ── Hospedaje ───────────────────────────────────────────────
  setTextContent("hosp-nombre", DATOS.hospedaje.nombre);
  setTextContent("hosp-direccion", DATOS.hospedaje.direccion);
  setTextContent("hosp-telefono", DATOS.hospedaje.telefono);
  setTextContent("hosp-precio", DATOS.hospedaje.precioReferencia);
  setTextContent("hosp-nota", DATOS.hospedaje.nota);
  const hospReserva = document.getElementById("hosp-reserva-link");
  if (hospReserva) hospReserva.href = DATOS.hospedaje.urlReserva;

  // ════════════════════════════════════════════════════════════
  //  B. INTERRUPTORES — mostrar / ocultar secciones
  // ════════════════════════════════════════════════════════════
  const secciones = {
    countdown:  "seccion-countdown",
    cronograma: "seccion-cronograma",
    dresscode:  "seccion-dresscode",
    regalos:    "seccion-regalos",
    hospedaje:  "seccion-hospedaje",
    rsvp:       "seccion-rsvp",
    audio:      "audio-player-wrap"
  };

  Object.entries(secciones).forEach(([key, elId]) => {
    if (!DATOS.mostrar[key]) hideEl(elId);
  });

// Ocultar divisores glitter cuando la sección anterior o posterior está oculta
  document.querySelectorAll(".glitter-divider[data-divider-before]").forEach(divider => {
    const afterId  = divider.dataset.dividerAfter;
    const beforeId = divider.dataset.dividerBefore;
    const afterEl  = afterId  ? document.getElementById(afterId)  : null;
    const beforeEl = beforeId ? document.getElementById(beforeId) : null;
    
    const afterHidden  = !afterEl  || afterEl.style.display  === "none";
    const beforeHidden = !beforeEl || beforeEl.style.display === "none";
    
    if (afterHidden || beforeHidden) {
      divider.style.display = "none";
    } else {
      divider.style.display = "";
    }
  });

  // ── Color de acento ──────────────────────────────────
  const PALETTES = {
    dorado:   { main: "#FFD700", light: "#FFF3A3", dark: "#b8860b",
                gradient: "linear-gradient(135deg, #b8860b, #FFD700, #fffbe6, #FFD700, #b8860b)",
                cardBorder: "rgba(255,215,0,0.18)", rgb: "255,215,0" },
    plateado: { main: "#C8C8C8", light: "#F0F0F0", dark: "#888888",
                gradient: "linear-gradient(135deg, #7a7a7a, #C0C0C0, #F5F5F5, #C0C0C0, #7a7a7a)",
                cardBorder: "rgba(200,200,200,0.22)", rgb: "192,192,192" },
    rosa:     { main: "#FF69B4", light: "#FFD6E8", dark: "#C2185B",
                gradient: "linear-gradient(135deg, #C2185B, #FF69B4, #FFD6E8, #FF69B4, #C2185B)",
                cardBorder: "rgba(255,105,180,0.22)", rgb: "255,105,180" },
    celeste:  { main: "#7ED6F7", light: "#D6F2FD", dark: "#1A8FB5",
                gradient: "linear-gradient(135deg, #1A8FB5, #7ED6F7, #D6F2FD, #7ED6F7, #1A8FB5)",
                cardBorder: "rgba(126,214,247,0.22)", rgb: "126,214,247" },
    violeta:  { main: "#D580FF", light: "#EDD6FF", dark: "#9B27AF",
                gradient: "linear-gradient(135deg, #9B27AF, #D580FF, #EDD6FF, #D580FF, #9B27AF)",
                cardBorder: "rgba(213,128,255,0.22)", rgb: "213,128,255" },
    azul:     { main: "#5B8DEF", light: "#C2D5FB", dark: "#1A3A8A",
                gradient: "linear-gradient(135deg, #1A3A8A, #5B8DEF, #C2D5FB, #5B8DEF, #1A3A8A)",
                cardBorder: "rgba(91,141,239,0.22)", rgb: "91,141,239" },
    rojo:     { main: "#FF4D6D", light: "#FFB3C1", dark: "#C1121F",
                gradient: "linear-gradient(135deg, #C1121F, #FF4D6D, #FFB3C1, #FF4D6D, #C1121F)",
                cardBorder: "rgba(255,77,109,0.22)", rgb: "255,77,109" }
  };

  const palette = PALETTES[DATOS.colorAcento] || PALETTES.dorado;
  const root = document.documentElement;
  root.style.setProperty("--color-oro",          palette.main);
  root.style.setProperty("--color-oro-claro",    palette.light);
  root.style.setProperty("--color-card-border",  palette.cardBorder);
  root.style.setProperty("--gradiente-dorado",   palette.gradient);
  root.style.setProperty("--sombra-dorada",      `0 0 24px rgba(${palette.rgb},0.35), 0 0 60px rgba(255,105,180,0.15)`);


  // ════════════════════════════════════════════════════════════
  //  C. GENERADOR DINÁMICO DEL CRONOGRAMA
  // ════════════════════════════════════════════════════════════
  const timelineContainer = document.getElementById("timeline-container");
  if (timelineContainer && DATOS.hitos && DATOS.hitos.length > 0) {
    timelineContainer.innerHTML = "";
    DATOS.hitos.forEach((hito, index) => {
      const side = index % 2 === 0 ? "left" : "right";
      const item = document.createElement("div");
      item.className = `timeline-item ${side}`;
      item.innerHTML = `
        <div class="timeline-content" data-animate="fadeIn">
          <div class="timeline-icon">${hito.icono}</div>
          <div class="timeline-time">${hito.hora}</div>
          <div class="timeline-title">${hito.titulo}</div>
        </div>
      `;
      timelineContainer.appendChild(item);
    });
  }

  // ════════════════════════════════════════════════════════════
  //  D. CUENTA REGRESIVA
  // ════════════════════════════════════════════════════════════
  if (DATOS.mostrar.countdown) {
    const fechaObjetivo = new Date(DATOS.fechaEvento).getTime();

    function actualizarCountdown() {
      const ahora = Date.now();
      const diferencia = fechaObjetivo - ahora;

      if (diferencia <= 0) {
        document.getElementById("countdown-wrap")?.remove();
        setTextContent("countdown-mensaje", "¡La fiesta ha comenzado! 🎉");
        return;
      }

      const dias    = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas   = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      setTextContent("cd-dias", String(dias).padStart(2, "0"));
      setTextContent("cd-horas", String(horas).padStart(2, "0"));
      setTextContent("cd-minutos", String(minutos).padStart(2, "0"));
      setTextContent("cd-segundos", String(segundos).padStart(2, "0"));
    }

    actualizarCountdown();
    setInterval(actualizarCountdown, 1000);
  }

  // ════════════════════════════════════════════════════════════
  //  E. WIDGET DE CLIMA (Pronóstico real automático sin API key)
  // ════════════════════════════════════════════════════════════
  const climaSection = document.getElementById("seccion-clima");

  if (DATOS.mostrar.clima && climaSection) {
    const fechaEvento = new Date(DATOS.fechaEvento);
    const ahora = new Date();
    const diffMs = fechaEvento - ahora;
    const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const siempreVisible = DATOS.clima && DATOS.clima.siempreVisible === true;

    // Si faltan más de 7 días y no está configurado siempreVisible, ocultar sección
    if (diasRestantes > 7 && !siempreVisible) {
      hideEl("seccion-clima");
    } else if (DATOS.clima.apiKey && DATOS.clima.apiKey.trim() !== "") {
      // ── Opción A: OpenWeatherMap (si el usuario ingresó su propia key) ──
      const ciudad = DATOS.clima.ciudad || "Ituzaingó";
      const pais = DATOS.clima.codigoPais || "AR";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(ciudad)},${pais}&appid=${DATOS.clima.apiKey}&units=metric&lang=es`;
      fetch(url)
        .then(r => r.json())
        .then(data => {
          if (data.cod !== "200") throw new Error("Error API clima");
          const pronostico = data.list.find(item => {
            const fechaItem = new Date(item.dt_txt);
            return Math.abs(fechaItem - fechaEvento) < 1000 * 60 * 60 * 3;
          }) || data.list[0];

          const icono = pronostico.weather[0].icon;
          const descripcion = pronostico.weather[0].description;
          const temp = Math.round(pronostico.main.temp);
          const sensacion = Math.round(pronostico.main.feels_like);

          document.getElementById("clima-icono").innerHTML = `<img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="${descripcion}">`;
          setTextContent("clima-descripcion", capitalize(descripcion));
          setTextContent("clima-temp", `${temp}°C`);
          setTextContent("clima-sensacion", `Sensación: ${sensacion}°C`);
          setTextContent("clima-ciudad", ciudad + (DATOS.clima.provincia ? `, ${DATOS.clima.provincia}` : ""));
          showEl("seccion-clima");
        })
        .catch(() => hideEl("seccion-clima"));
    } else {
      // ── Opción B: Open-Meteo (Pronóstico real en vivo, 100% gratuito sin API key) ──
      const WMO_CODES = {
        0:  { desc: "Cielo despejado", iconNoche: "✨", iconDia: "☀️" },
        1:  { desc: "Mayormente despejado", iconNoche: "🌙", iconDia: "🌤️" },
        2:  { desc: "Parcialmente nublado", iconNoche: "⛅", iconDia: "⛅" },
        3:  { desc: "Cielo nublado", iconNoche: "☁️", iconDia: "☁️" },
        45: { desc: "Niebla", iconNoche: "🌫️", iconDia: "🌫️" },
        48: { desc: "Neblina", iconNoche: "🌫️", iconDia: "🌫️" },
        51: { desc: "Llovizna ligera", iconNoche: "🌦️", iconDia: "🌦️" },
        53: { desc: "Llovizna moderada", iconNoche: "🌧️", iconDia: "🌧️" },
        55: { desc: "Llovizna densa", iconNoche: "🌧️", iconDia: "🌧️" },
        61: { desc: "Lluvia ligera", iconNoche: "🌧️", iconDia: "🌧️" },
        63: { desc: "Lluvia moderada", iconNoche: "🌧️", iconDia: "🌧️" },
        65: { desc: "Lluvia intensa", iconNoche: "🌧️", iconDia: "🌧️" },
        71: { desc: "Nevada ligera", iconNoche: "🌨️", iconDia: "🌨️" },
        73: { desc: "Nevada", iconNoche: "❄️", iconDia: "❄️" },
        75: { desc: "Nevada fuerte", iconNoche: "❄️", iconDia: "❄️" },
        80: { desc: "Chubascos ligeros", iconNoche: "🌦️", iconDia: "🌦️" },
        81: { desc: "Chubascos moderados", iconNoche: "🌧️", iconDia: "🌧️" },
        82: { desc: "Chubascos intensos", iconNoche: "⛈️", iconDia: "⛈️" },
        95: { desc: "Tormenta eléctrica", iconNoche: "⛈️", iconDia: "⛈️" },
        96: { desc: "Tormenta con granizo", iconNoche: "⛈️", iconDia: "⛈️" },
        99: { desc: "Tormenta severa", iconNoche: "⛈️", iconDia: "⛈️" }
      };

      async function consultarClimaReal() {
        try {
          let lat = DATOS.clima.lat;
          let lon = DATOS.clima.lon;
          let ciudadNombre = DATOS.clima.ciudad || "Ituzaingó";

          // Si faltan coordenadas pero hay ciudad, geocodificar con Open-Meteo
          if (lat === undefined || lon === undefined) {
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudadNombre)}&count=1&language=es`);
            const geoData = await geoRes.json();
            if (geoData.results && geoData.results.length > 0) {
              lat = geoData.results[0].latitude;
              lon = geoData.results[0].longitude;
              ciudadNombre = geoData.results[0].name;
            } else {
              lat = -34.6604;
              lon = -58.6662;
            }
          }

          const forecastRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,is_day&hourly=temperature_2m,apparent_temperature,weather_code&timezone=auto`
          );
          if (!forecastRes.ok) throw new Error("Error al consultar Open-Meteo");
          const data = await forecastRes.json();

          let targetTemp, targetSensacion, targetCode, esDia, subtituloTexto;

          // Buscar en el pronóstico horario el momento exacto del evento (hasta 7 días adelante)
          if (data.hourly && data.hourly.time && data.hourly.time.length > 0) {
            const targetTime = fechaEvento.getTime();
            let closestIdx = -1;
            let minDiff = Infinity;

            data.hourly.time.forEach((tStr, idx) => {
              const itemTime = new Date(tStr).getTime();
              const diff = Math.abs(itemTime - targetTime);
              if (diff < minDiff) {
                minDiff = diff;
                closestIdx = idx;
              }
            });

            // Si el horario del evento coincide dentro del rango pronosticado (margen de 36 hs)
            if (closestIdx !== -1 && minDiff < 36 * 3600 * 1000) {
              targetTemp = Math.round(data.hourly.temperature_2m[closestIdx]);
              targetSensacion = Math.round(data.hourly.apparent_temperature ? data.hourly.apparent_temperature[closestIdx] : targetTemp);
              targetCode = data.hourly.weather_code[closestIdx];
              const hora = fechaEvento.getHours();
              esDia = hora >= 6 && hora < 20;
              subtituloTexto = `Pronóstico para el evento (${fechaEvento.toLocaleDateString("es-AR", { day: "numeric", month: "short" })}, ${String(hora).padStart(2, "0")}:00 hs)`;
            }
          }

          // Si el evento está a más de 7 días pero siempreVisible está en true, mostrar clima actual en tiempo real
          if (targetTemp === undefined && data.current) {
            targetTemp = Math.round(data.current.temperature_2m);
            targetSensacion = Math.round(data.current.apparent_temperature ?? targetTemp);
            targetCode = data.current.weather_code;
            esDia = data.current.is_day === 1;
            subtituloTexto = `Clima actual en ${ciudadNombre} · (Pronóstico del evento disponible 7 días antes)`;
          }

          if (targetTemp !== undefined) {
            const infoClima = WMO_CODES[targetCode] || { desc: "Tiempo agradable", iconNoche: "✨", iconDia: "☀️" };
            const icono = esDia ? infoClima.iconDia : infoClima.iconNoche;

            setTextContent("clima-icono", icono);
            setTextContent("clima-descripcion", capitalize(infoClima.desc));
            setTextContent("clima-temp", `${targetTemp}°C`);
            setTextContent("clima-sensacion", `Sensación: ${targetSensacion}°C`);
            setTextContent("clima-ciudad", ciudadNombre + (DATOS.clima.provincia ? `, ${DATOS.clima.provincia}` : ""));

            const subEl = document.getElementById("clima-subtitulo");
            if (subEl && subtituloTexto) subEl.textContent = subtituloTexto;

            showEl("seccion-clima");
          } else {
            hideEl("seccion-clima");
          }
        } catch (err) {
          console.warn("No se pudo obtener el pronóstico del tiempo:", err);
          hideEl("seccion-clima");
        }
      }

      consultarClimaReal();
    }
  } else if (climaSection) {
    hideEl("seccion-clima");
  }

  // ════════════════════════════════════════════════════════════
  //  F. REPRODUCTOR DE AUDIO
  // ════════════════════════════════════════════════════════════
  let audioEl = null; // Exponemos para uso en splash

  if (DATOS.mostrar.audio && DATOS.archivoAudio.trim() !== "") {
    audioEl = document.getElementById("audio-element");
    const btnPlay   = document.getElementById("btn-play-pause");
    const btnMute   = document.getElementById("btn-mute");
    const progressBar = document.getElementById("audio-progress");
    const tiempoActual = document.getElementById("audio-tiempo-actual");
    const tiempoTotal  = document.getElementById("audio-tiempo-total");

    setTextContent("audio-cancion-nombre", DATOS.nombreCancion);
    setTextContent("audio-artista", DATOS.artistaCancion);

    if (audioEl) {
      audioEl.src = DATOS.archivoAudio;

      audioEl.addEventListener("loadedmetadata", () => {
        tiempoTotal && setTextContent("audio-tiempo-total", formatTiempo(audioEl.duration));
      });

      audioEl.addEventListener("timeupdate", () => {
        if (!audioEl.duration) return;
        const pct = (audioEl.currentTime / audioEl.duration) * 100;
        if (progressBar) progressBar.style.width = `${pct}%`;
        if (tiempoActual) tiempoActual.textContent = formatTiempo(audioEl.currentTime);
      });

      // Botón play/pausa
      btnPlay?.addEventListener("click", () => {
        if (audioEl.paused) {
          audioEl.play();
          btnPlay.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
          btnPlay.setAttribute("aria-label", "Pausar música");
        } else {
          audioEl.pause();
          btnPlay.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>`;
          btnPlay.setAttribute("aria-label", "Reproducir música");
        }
      });

      // Botón silenciar / activar sonido
      const SVG_CON_SONIDO = `<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>`;
      const SVG_SILENCIADO = `<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>`;

      btnMute?.addEventListener("click", () => {
        audioEl.muted = !audioEl.muted;
        const icoVolumen = document.getElementById("icono-volumen");
        if (audioEl.muted) {
          btnMute.classList.add("silenciado");
          btnMute.setAttribute("aria-label", "Activar sonido");
          btnMute.setAttribute("title", "Activar sonido");
          if (icoVolumen) icoVolumen.innerHTML = SVG_SILENCIADO;
        } else {
          btnMute.classList.remove("silenciado");
          btnMute.setAttribute("aria-label", "Silenciar música");
          btnMute.setAttribute("title", "Silenciar");
          if (icoVolumen) icoVolumen.innerHTML = SVG_CON_SONIDO;
        }
      });
    }
  } else if (!DATOS.mostrar.audio) {
    hideEl("audio-player-wrap");
  }

  // ── Función para iniciar audio desde el splash ─────────────
  // (Se llama desde la lógica del splash al abrir el sobre)
  function iniciarAudio() {
    if (!audioEl) return;
    audioEl.play().then(() => {
      // Audio iniciado: actualizar ícono del btn-play-pause
      const btnPlay = document.getElementById("btn-play-pause");
      if (btnPlay) {
        btnPlay.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
        btnPlay.setAttribute("aria-label", "Pausar música");
      }
    }).catch(() => {
      // El navegador puede bloquear el autoplay — está ok, el usuario puede presionar play manual
    });
  }

// ════════════════════════════════════════════════════════════
  //  G. FORMULARIO RSVP
  // ════════════════════════════════════════════════════════════
  const rsvpForm = document.getElementById("rsvp-form");
  const rsvpSuccess = document.getElementById("rsvp-success");
  const rsvpError = document.getElementById("rsvp-error");

  rsvpForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const familiaInput = document.getElementById("rsvp-nombre");
    const familia = familiaInput ? familiaInput.value.trim() : "";
    const radioChecked = document.querySelector('input[name="rsvp-asistencia"]:checked');
    const asistencia = radioChecked ? radioChecked.value : "";
    const isAsistiendo = asistencia.toLowerCase() === "sí" || asistencia.toLowerCase() === "si";
    const cantidad = isAsistiendo ? (document.getElementById("rsvp-cantidad")?.value || "1") : "0";
    const mensaje = document.getElementById("rsvp-mensaje")?.value.trim() || "";

    if (!familia) {
      if (familiaInput) familiaInput.focus();
      return;
    }

    if (!asistencia) {
      alert("Por favor indicá si confirmás tu asistencia.");
      return;
    }

    const btn = document.getElementById("rsvp-submit-btn");
    btn.disabled = true;
    btn.textContent = "Guardando respuesta...";

    const datos = {
      familia: familia,
      nombre: familia,
      asistira: isAsistiendo ? "Sí" : "No",
      asistencia: isAsistiendo ? "Sí" : "No",
      cantidad: cantidad,
      cantidadPersonas: cantidad,
      mensaje: mensaje,
      sheetId: DATOS.rsvp.sheetId || "",
      sheetUrl: DATOS.rsvp.planillaUrl || "",
      timestamp: new Date().toLocaleString("es-AR", { hour12: false })
    };

    if (DATOS.rsvp.googleScriptUrl && DATOS.rsvp.googleScriptUrl.trim() !== "") {
      // ── Envío real a Google Sheets via Apps Script ──────────
      try {
        const formData = new FormData();
        Object.entries(datos).forEach(([k, v]) => formData.append(k, v));

        await fetch(DATOS.rsvp.googleScriptUrl, {
          method: "POST",
          mode: "no-cors",
          body: formData
        });

        // 🟢 PUNTO A: Guardar en localStorage
        localStorage.setItem("rsvp_confirmado", JSON.stringify({
          familia: familia,
          isAsistiendo: isAsistiendo,
          cantidad: cantidad
        }));

        const rsvpSuccessTexto = document.getElementById("rsvp-success-texto");
        if (rsvpSuccessTexto) {
          if (isAsistiendo) {
            rsvpSuccessTexto.textContent = `¡Respuesta de ${familia} (${cantidad} ${cantidad === "1" ? "persona" : "personas"}) registrada con éxito! Te esperamos para festejar. 🎉`;
          } else {
            rsvpSuccessTexto.textContent = `Muchas gracias por avisar, ${familia}. ¡Lamentamos que no puedan estar pero agradecemos tu confirmación! 💌`;
          }
        }

        rsvpForm.style.display = "none";
        showEl("rsvp-success");
      } catch (err) {
        console.error("Error al enviar RSVP:", err);
        showEl("rsvp-error");
        btn.disabled = false;
        btn.textContent = "Confirmar respuesta";
      }
    } else {
      // ── Modo demo (sin backend configurado todavía) ─────────
      console.log("📋 RSVP guardado (modo demo - configurar googleScriptUrl en datos.js):", datos);
      setTimeout(() => {

        // 🟢 PUNTO A: Guardar en localStorage (modo demo)
        localStorage.setItem("rsvp_confirmado", JSON.stringify({
          familia: familia,
          isAsistiendo: isAsistiendo,
          cantidad: cantidad
        }));

        const rsvpSuccessTexto = document.getElementById("rsvp-success-texto");
        if (rsvpSuccessTexto) {
          if (isAsistiendo) {
            rsvpSuccessTexto.textContent = `¡Respuesta de ${familia} (${cantidad} ${cantidad === "1" ? "persona" : "personas"}) registrada con éxito! Te esperamos para festejar. 🎉`;
          } else {
            rsvpSuccessTexto.textContent = `Muchas gracias por avisar, ${familia}. ¡Lamentamos que no puedan estar pero agradecemos tu confirmación! 💌`;
          }
        }
        rsvpForm.style.display = "none";
        showEl("rsvp-success");
      }, 700);
    }
  });


  // 🟢 AQUÍ PEGAS EL PUNTO B:
  // ── Verificar si el usuario ya respondió anteriormente ─────────────
// ── Verificar si el usuario ya respondió anteriormente ─────────────
  function comprobarRsvpPrevio() {
    const rsvpPrevio = localStorage.getItem("rsvp_confirmado");
    if (rsvpPrevio) {
      try {
        const datosPrevios = JSON.parse(rsvpPrevio);
        const rsvpFormEl = document.getElementById("rsvp-form");
        const rsvpHeading = document.getElementById("rsvp-heading");
        const rsvpSuccessTexto = document.getElementById("rsvp-success-texto");
        const rsvpIntro = document.querySelector(".rsvp-intro");
        const rsvpSubtitulo = document.querySelector("#seccion-rsvp .subtitulo");

        // Cambiar título principal del bloque
        if (rsvpHeading) {
          rsvpHeading.textContent = "¡Gracias por confirmar! 💌";
        }

        // Ocultar el subtítulo "Confirmá tu asistencia" y la fecha límite de confirmación
        if (rsvpSubtitulo) rsvpSubtitulo.style.display = "none";
        if (rsvpIntro) rsvpIntro.style.display = "none";

        // Personalizar mensaje según si asiste o no
        if (rsvpSuccessTexto) {
          if (datosPrevios.isAsistiendo) {
            rsvpSuccessTexto.textContent = `¡Ya registramos tu asistencia (${datosPrevios.familia} - ${datosPrevios.cantidad} ${datosPrevios.cantidad === "1" ? "persona" : "personas"})! Te esperamos para festejar. 🎉`;
          } else {
            rsvpSuccessTexto.textContent = `Ya registramos tu respuesta (${datosPrevios.familia}). ¡Lamentamos que no puedan estar pero agradecemos tu confirmación! 💌`;
          }
        }

        // Configurar el botón de WhatsApp para modificar la respuesta
        const btnModificar = document.getElementById("btn-modificar-rsvp");
        if (btnModificar && DATOS.contacto && DATOS.contacto.whatsapp) {
          const mensajeWa = encodeURIComponent(`Hola! Quisiera modificar mi confirmación de asistencia para los XV de ${DATOS.nombre} (${datosPrevios.familia}).`);
          btnModificar.href = `https://wa.me/${DATOS.contacto.whatsapp}?text=${mensajeWa}`;
        }

        // Ocultar formulario y mostrar cartel de éxito
        if (rsvpFormEl) rsvpFormEl.style.display = "none";
        showEl("rsvp-success");
      } catch (err) {
        console.warn("Error al leer respuesta previa de RSVP:", err);
      }
    }
  }

  // Ejecutar la comprobación inmediatamente al cargar la página
  comprobarRsvpPrevio();


  // ── Lógica radio buttons RSVP ─────────────────────────────
  const radios = document.querySelectorAll('input[name="rsvp-asistencia"]');
  const cantidadWrap = document.getElementById("rsvp-cantidad-wrap");
  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      const val = radio.value.toLowerCase();
      if ((val === "si" || val === "sí") && cantidadWrap) {
        cantidadWrap.style.display = "block";
      } else if (cantidadWrap) {
        cantidadWrap.style.display = "none";
      }
    });
  });


  // ── Copiar al portapapeles ────────────────────────────────
  document.querySelectorAll(".btn-copiar").forEach(btn => {
    btn.addEventListener("click", () => {
      const texto = btn.dataset.copiar;
      navigator.clipboard.writeText(texto).then(() => {
        const original = btn.textContent;
        btn.textContent = "✓ Copiado";
        btn.classList.add("copiado");
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove("copiado");
        }, 2000);
      });
    });
  });

  // ── Copiar alias y CBU dinámicamente ─────────────────────
  const btnCopiarAlias = document.getElementById("btn-copiar-alias");
  if (btnCopiarAlias) {
    btnCopiarAlias.dataset.copiar = DATOS.regalos.alias;
  }
  const btnCopiarCbu = document.getElementById("btn-copiar-cbu");
  if (btnCopiarCbu) {
    btnCopiarCbu.dataset.copiar = DATOS.regalos.cbu;
  }

  // ════════════════════════════════════════════════════════════
  //  H. ANIMACIONES DE SCROLL (Intersection Observer)
  // ════════════════════════════════════════════════════════════
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-animate]").forEach(el => {
    observer.observe(el);
  });

  // ════════════════════════════════════════════════════════════
  //  I. PARTÍCULAS / EFECTO GLITTER DE FONDO
  // ════════════════════════════════════════════════════════════
  crearParticulasGlitter();

  // ════════════════════════════════════════════════════════════
  //  I2. SPLASH — SOBRE LACRADO DE APERTURA
  // ════════════════════════════════════════════════════════════
  (function iniciarSplash() {
    const splashOverlay = document.getElementById("splash-overlay");
    const sobreWrap     = document.getElementById("sobre-wrap");
    const sobreEl       = document.getElementById("sobre");
    const selloLetra    = document.getElementById("sello-letra");

    // ── Poner la inicial desde datos.js ─────────────────────
    if (selloLetra && DATOS.inicial) {
      selloLetra.textContent = DATOS.inicial;
    }

    if (!splashOverlay || !sobreWrap || !sobreEl) return;

    // ── Partículas del splash (canvas interno) ───────────────
    const splashCanvas = document.getElementById("splash-canvas");
    if (splashCanvas) {
      const ctx = splashCanvas.getContext("2d");
      const COLS = ["#FFD700", "#FF69B4", "#C0C0C0", "#DA70D6", "#FFF8DC", "#ff2a6d"];
      let pts = [];

      function resizeSplash() {
        splashCanvas.width  = window.innerWidth;
        splashCanvas.height = window.innerHeight;
      }
      resizeSplash();
      window.addEventListener("resize", resizeSplash);

      function mkPt() {
        return {
          x: Math.random() * splashCanvas.width,
          y: Math.random() * splashCanvas.height,
          s: Math.random() * 2.5 + 0.5,
          c: COLS[Math.floor(Math.random() * COLS.length)],
          a: Math.random(),
          da: (Math.random() * 0.015 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
          vx: Math.random() * 0.4 - 0.2,
          vy: Math.random() * 0.4 - 0.2
        };
      }
      for (let i = 0; i < 90; i++) pts.push(mkPt());

      let splashAnimId;
      function animSplash() {
        ctx.clearRect(0, 0, splashCanvas.width, splashCanvas.height);
        pts.forEach(p => {
          p.a += p.da;
          if (p.a <= 0 || p.a >= 1) p.da *= -1;
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > splashCanvas.width)  p.x = Math.random() * splashCanvas.width;
          if (p.y < 0 || p.y > splashCanvas.height) p.y = Math.random() * splashCanvas.height;
          ctx.save();
          ctx.globalAlpha = Math.abs(p.a);
          ctx.fillStyle   = p.c;
          ctx.shadowColor = p.c;
          ctx.shadowBlur  = 8;
          // Estrellita de 4 puntas
          const r = p.s, ri = r * 0.4;
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const a1 = (i * Math.PI / 2) - Math.PI / 4;
            const a2 = a1 + Math.PI / 4;
            ctx.lineTo(p.x + Math.cos(a1) * r, p.y + Math.sin(a1) * r);
            ctx.lineTo(p.x + Math.cos(a2) * ri, p.y + Math.sin(a2) * ri);
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
        splashAnimId = requestAnimationFrame(animSplash);
      }
      animSplash();

      // Detener animación splash cuando se cierra
      splashOverlay.addEventListener("transitionend", () => {
        if (splashOverlay.classList.contains("oculto")) {
          cancelAnimationFrame(splashAnimId);
        }
      }, { once: false });
    }

    // ── Abrir sobre al hacer clic o Enter ────────────────────
    let abierto = false;
    function abrirSobre() {
      if (abierto) return;
      abierto = true;

      // 1. Animar apertura del sobre
      sobreEl.classList.add("abierto");

      // 2. Iniciar la música (gesto de usuario => desbloquea autoplay)
      setTimeout(() => iniciarAudio(), 200);

      // 3. Ocultar splash con transición suave después de la animación
      setTimeout(() => {
        splashOverlay.classList.add("oculto");
        // Permitir scroll en el body
        document.body.style.overflow = "";
      }, 1100);
    }

    // Bloquear scroll mientras splash está activo
    document.body.style.overflow = "hidden";

    sobreWrap.addEventListener("click", abrirSobre);
    sobreWrap.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        abrirSobre();
      }
    });
  })();

  // ════════════════════════════════════════════════════════════
  //  J. BOTÓN "VOLVER ARRIBA"
  // ════════════════════════════════════════════════════════════
  const btnTop = document.getElementById("btn-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btnTop?.classList.add("visible");
    } else {
      btnTop?.classList.remove("visible");
    }
  });
  btnTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ════════════════════════════════════════════════════════════
  //  K. NAVEGACIÓN SUAVE (smooth scroll para links internos)
  // ════════════════════════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ════════════════════════════════════════════════════════════
  //  L. CARRUSEL DE FOTOS HORIZONTAL ✨
  // ════════════════════════════════════════════════════════════
  function initCarruselFotos() {
    const track = document.getElementById("carrusel-track");
    const dotsWrap = document.getElementById("carrusel-dots");
    const numActual = document.getElementById("carrusel-num-actual");
    const numTotal = document.getElementById("carrusel-num-total");
    const btnPrev = document.getElementById("carrusel-btn-prev");
    const btnNext = document.getElementById("carrusel-btn-next");
    const hint = document.getElementById("carrusel-hint");

    if (!track) return;

    // Obtener array de fotos
    let listaFotos = [];
    if (Array.isArray(DATOS.imagenes.fotos) && DATOS.imagenes.fotos.length > 0) {
      listaFotos = DATOS.imagenes.fotos;
    } else if (DATOS.imagenes.fotoPrincipal) {
      listaFotos = [DATOS.imagenes.fotoPrincipal];
    }

    if (listaFotos.length === 0) return;

    // Si solo hay una foto, ocultar controles innecesarios
    if (listaFotos.length === 1) {
      if (btnPrev) btnPrev.style.display = "none";
      if (btnNext) btnNext.style.display = "none";
      if (dotsWrap) dotsWrap.style.display = "none";
      const nav = document.getElementById("carrusel-nav");
      if (nav) nav.style.display = "none";
      if (hint) hint.style.display = "none";
    }

    // Renderizar slides en el track para garantizar sincronía total con datos.js
    track.innerHTML = listaFotos.map((src, i) => `
      <div class="carrusel-slide ${i === 0 ? "active" : ""}" data-index="${i}" role="group" aria-roledescription="slide" aria-label="Foto ${i + 1} de ${listaFotos.length}">
        <div class="carrusel-card">
          <img ${i === 0 ? 'id="foto-principal"' : ''} src="${src}" alt="Foto ${i + 1} de ${DATOS.nombre}" loading="${i === 0 ? 'eager' : 'lazy'}">
          <div class="carrusel-sheen" aria-hidden="true"></div>
        </div>
      </div>
    `).join("");

    // Renderizar dots interactivos
    if (dotsWrap && listaFotos.length > 1) {
      dotsWrap.innerHTML = listaFotos.map((_, i) => `
        <button class="carrusel-dot ${i === 0 ? "active" : ""}" type="button" role="tab" aria-selected="${i === 0 ? "true" : "false"}" aria-label="Ir a foto ${i + 1}" data-index="${i}"></button>
      `).join("");
    }

    if (numTotal) numTotal.textContent = String(listaFotos.length);
    if (numActual) numActual.textContent = "1";

    let currentIndex = 0;
    let autoPlayTimer = null;
    let hasInteracted = false;

    function marcarInteraccion() {
      if (!hasInteracted) {
        hasInteracted = true;
        if (hint) hint.style.opacity = "0.75";
      }
    }

    function irASlide(index, smooth = true) {
      const slides = track.querySelectorAll(".carrusel-slide");
      if (!slides.length) return;

      // Wrap around cíclico
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      currentIndex = index;
      const targetSlide = slides[currentIndex];
      if (targetSlide) {
        const scrollTo = targetSlide.offsetLeft - (track.clientWidth - targetSlide.offsetWidth) / 2;
        track.scrollTo({
          left: Math.max(0, scrollTo),
          behavior: smooth ? "smooth" : "auto"
        });
      }
      actualizarUI(currentIndex);
    }

    function actualizarUI(index) {
      const slides = track.querySelectorAll(".carrusel-slide");
      slides.forEach((s, i) => {
        s.classList.toggle("active", i === index);
      });

      const dots = dotsWrap ? dotsWrap.querySelectorAll(".carrusel-dot") : [];
      dots.forEach((d, i) => {
        const isAct = i === index;
        d.classList.toggle("active", isAct);
        d.setAttribute("aria-selected", isAct ? "true" : "false");
      });

      if (numActual) numActual.textContent = String(index + 1);
    }

    // Detección automática al deslizar en pantallas táctiles (Touch swipe)
    let scrollTimeout;
    track.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const slides = track.querySelectorAll(".carrusel-slide");
        if (!slides.length) return;
        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let closestIndex = 0;
        let minDiff = Infinity;
        slides.forEach((s, i) => {
          const slideCenter = s.offsetLeft + s.offsetWidth / 2;
          const diff = Math.abs(trackCenter - slideCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
          }
        });
        if (closestIndex !== currentIndex) {
          currentIndex = closestIndex;
          actualizarUI(currentIndex);
        }
      }, 50);
    }, { passive: true });

    // Botones de navegación
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        marcarInteraccion();
        detenerAutoPlay();
        irASlide(currentIndex - 1);
      });
    }

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        marcarInteraccion();
        detenerAutoPlay();
        irASlide(currentIndex + 1);
      });
    }

    // Clicks en dots
    if (dotsWrap) {
      dotsWrap.addEventListener("click", (e) => {
        const dot = e.target.closest(".carrusel-dot");
        if (!dot) return;
        const idx = parseInt(dot.dataset.index, 10);
        if (!isNaN(idx)) {
          marcarInteraccion();
          detenerAutoPlay();
          irASlide(idx);
        }
      });
    }

    // Arrastre con mouse en computadoras (Desktop Drag)
    let isMouseDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    track.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      hasDragged = false;
      startX = e.pageX - track.offsetLeft;
      scrollStart = track.scrollLeft;
      track.classList.add("dragging");
      marcarInteraccion();
      detenerAutoPlay();
    });

    window.addEventListener("mouseup", () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      track.classList.remove("dragging");
      if (hasDragged) {
        irASlide(currentIndex);
      }
    });

    track.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.35;
      if (Math.abs(walk) > 6) hasDragged = true;
      track.scrollLeft = scrollStart - walk;
    });

    // Accesibilidad teclado
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        marcarInteraccion();
        detenerAutoPlay();
        irASlide(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        marcarInteraccion();
        detenerAutoPlay();
        irASlide(currentIndex + 1);
      }
    });

    // Touch pausa autoplay
    track.addEventListener("touchstart", () => {
      marcarInteraccion();
      detenerAutoPlay();
    }, { passive: true });

    // Autoplay suave cada 5.5s
    function iniciarAutoPlay() {
      if (listaFotos.length <= 1) return;
      detenerAutoPlay();
      autoPlayTimer = setInterval(() => {
        irASlide(currentIndex + 1);
      }, 5500);
    }

    function detenerAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    track.addEventListener("mouseenter", detenerAutoPlay);
    track.addEventListener("mouseleave", () => {
      if (!isMouseDown) iniciarAutoPlay();
    });

    window.addEventListener("resize", () => {
      irASlide(currentIndex, false);
    });

    iniciarAutoPlay();
  }

  // ════════════════════════════════════════════════════════════
  //  HELPERS (funciones utilitarias)
  // ════════════════════════════════════════════════════════════
  function setTextContent(id, text, isHtml = false) {
    const el = document.getElementById(id);
    if (!el) return;
    if (isHtml) el.innerHTML = text;
    else el.textContent = text;
  }

  function setAttr(id, attr, value) {
    const el = document.getElementById(id);
    if (el) el[attr] = value;
  }

  function showEl(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "";
  }

  function hideEl(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  }

  function formatTiempo(seg) {
    const m = Math.floor(seg / 60);
    const s = Math.floor(seg % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function crearParticulasGlitter() {
    const canvas = document.getElementById("glitter-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particulas = [];
    const COLORES = ["#FFD700", "#FF69B4", "#C0C0C0", "#DA70D6", "#FFF8DC", "#FF1493"];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function crearParticula() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        color: COLORES[Math.floor(Math.random() * COLORES.length)],
        alpha: Math.random(),
        velocidadAlpha: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        velocidadY: Math.random() * 0.3 - 0.15,
        velocidadX: Math.random() * 0.3 - 0.15
      };
    }

    for (let i = 0; i < 120; i++) particulas.push(crearParticula());

    function animar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particulas.forEach(p => {
        p.alpha += p.velocidadAlpha;
        if (p.alpha <= 0 || p.alpha >= 1) p.velocidadAlpha *= -1;
        p.y += p.velocidadY;
        p.x += p.velocidadX;
        if (p.y < 0 || p.y > canvas.height) p.y = Math.random() * canvas.height;
        if (p.x < 0 || p.x > canvas.width) p.x = Math.random() * canvas.width;

        ctx.save();
        ctx.globalAlpha = Math.abs(p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        // Dibujar estrellita de 4 puntas
        drawStar(ctx, p.x, p.y, 4, p.size, p.size * 0.4);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(animar);
    }

    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    }

    animar();
  }

});
