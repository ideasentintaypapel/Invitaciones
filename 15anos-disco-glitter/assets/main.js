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
  setTextContent("hero-mensaje", DATOS.mensajePrincipal.replace(/\n/g, "<br>"), true);
  setTextContent("hero-fecha-texto", DATOS.fechaTexto);
  setTextContent("hero-hora-texto", DATOS.horaTexto);
  setTextContent("lugar-nombre", DATOS.lugar.nombre);
  setTextContent("lugar-direccion", DATOS.lugar.direccion);
  setTextContent("nombre-completo-sobre", `${DATOS.nombre}`);
  setTextContent("hero-nombre-footer", DATOS.nombre);

  // Imágenes
  setAttr("hero-bg-img", "src", DATOS.imagenes.heroBg);
  setAttr("foto-principal", "src", DATOS.imagenes.fotoPrincipal);
  setAttr("foto-principal", "alt", `Foto de ${DATOS.nombre}`);

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
  //  E. WIDGET DE CLIMA
  // ════════════════════════════════════════════════════════════
  const climaSection = document.getElementById("seccion-clima");

  if (DATOS.mostrar.clima && climaSection) {
    const fechaEvento = new Date(DATOS.fechaEvento);
    const ahora = new Date();
    const diasRestantes = Math.ceil((fechaEvento - ahora) / (1000 * 60 * 60 * 24));

    if (diasRestantes > 7) {
      // No mostrar si faltan más de 7 días
      hideEl("seccion-clima");
    } else if (DATOS.clima.apiKey && DATOS.clima.apiKey.trim() !== "") {
      // ── Llamada real a OpenWeatherMap ──────────────────────
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(DATOS.clima.ciudad)},${DATOS.clima.codigoPais}&appid=${DATOS.clima.apiKey}&units=metric&lang=es`;
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
          setTextContent("clima-ciudad", DATOS.clima.ciudad);
          showEl("seccion-clima");
        })
        .catch(() => hideEl("seccion-clima"));
    } else {
      // ── Mock de clima (para demo sin API key) ──────────────
      setTextContent("clima-icono", "🌟");
      setTextContent("clima-descripcion", "Noche estrellada");
      setTextContent("clima-temp", "22°C");
      setTextContent("clima-sensacion", "Sensación: 21°C");
      setTextContent("clima-ciudad", DATOS.clima.ciudad);
      // Solo mostrar en demo si faltan 7 días o menos
      showEl("seccion-clima");
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

    const btn = document.getElementById("rsvp-submit-btn");
    btn.disabled = true;
    btn.textContent = "Enviando...";

    const datos = {
      nombre: document.getElementById("rsvp-nombre").value.trim(),
      asistencia: document.querySelector('input[name="rsvp-asistencia"]:checked')?.value || "",
      cantidadPersonas: document.getElementById("rsvp-cantidad").value,
      mensaje: document.getElementById("rsvp-mensaje").value.trim(),
      timestamp: new Date().toLocaleString("es-AR")
    };

    if (DATOS.rsvp.googleScriptUrl && DATOS.rsvp.googleScriptUrl.trim() !== "") {
      // ── Envío real a Google Sheets via Apps Script ──────────
      try {
        const formData = new FormData();
        Object.entries(datos).forEach(([k, v]) => formData.append(k, v));

        await fetch(DATOS.rsvp.googleScriptUrl, {
          method: "POST",
          body: formData
        });

        rsvpForm.style.display = "none";
        showEl("rsvp-success");
      } catch {
        showEl("rsvp-error");
        btn.disabled = false;
        btn.textContent = "Confirmar asistencia";
      }
    } else {
      // ── Modo demo (sin backend real) ────────────────────────
      console.log("📋 RSVP enviado (modo demo):", datos);
      setTimeout(() => {
        rsvpForm.style.display = "none";
        showEl("rsvp-success");
      }, 800);
    }
  });

  // ── Lógica radio buttons RSVP ─────────────────────────────
  const radios = document.querySelectorAll('input[name="rsvp-asistencia"]');
  const cantidadWrap = document.getElementById("rsvp-cantidad-wrap");
  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "si" && cantidadWrap) {
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
