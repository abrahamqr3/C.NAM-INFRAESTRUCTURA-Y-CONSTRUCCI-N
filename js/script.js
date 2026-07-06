

document.addEventListener('DOMContentLoaded', function () {

  const btnMenu = document.getElementById('btnMenu');
  const menu = document.getElementById('menu');

  if (btnMenu && menu) {
    btnMenu.addEventListener('click', function () {
      menu.classList.toggle('abierto');
      btnMenu.classList.toggle('abierto');

      const abierto = menu.classList.contains('abierto');
      btnMenu.setAttribute('aria-expanded', abierto);
    });
  }

  const anio = document.getElementById('anio');
  if (anio) {
    anio.textContent = new Date().getFullYear();
  }

  const elementosRevelar = document.querySelectorAll('.revelar');

  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');

        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  elementosRevelar.forEach(function (el) {
    observador.observe(el);
  });

  const contadores = document.querySelectorAll('[data-contar]');

  const observadorContadores = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;

      const elemento = entrada.target;
      const valorFinal = parseInt(elemento.getAttribute('data-contar'), 10);
      const duracion = 1500;
      const inicio = performance.now();

      function actualizar(ahora) {
        const progreso = Math.min((ahora - inicio) / duracion, 1);
        elemento.textContent = Math.floor(progreso * valorFinal);
        if (progreso < 1) {
          requestAnimationFrame(actualizar);
        }
      }

      requestAnimationFrame(actualizar);
      observadorContadores.unobserve(elemento);
    });
  }, { threshold: 0.5 });

  contadores.forEach(function (el) {
    observadorContadores.observe(el);
  });

  const botonesFiltro = document.querySelectorAll('.filtro');
  const proyectos = document.querySelectorAll('.proyecto');

  botonesFiltro.forEach(function (boton) {
    boton.addEventListener('click', function () {

      botonesFiltro.forEach(function (b) { b.classList.remove('activo'); });
      boton.classList.add('activo');

      const filtro = boton.getAttribute('data-filtro');

      proyectos.forEach(function (proyecto) {
        const categoria = proyecto.getAttribute('data-categoria');
        if (filtro === 'todos' || categoria === filtro) {
          proyecto.classList.remove('oculto');
        } else {
          proyecto.classList.add('oculto');
        }
      });
    });
  });

  const formulario = document.getElementById('formularioContacto');

  if (formulario) {
    const campoNombre = document.getElementById('nombre');
    const campoCorreo = document.getElementById('correo');
    const campoMensaje = document.getElementById('mensaje');

    const errorNombre = document.getElementById('errorNombre');
    const errorCorreo = document.getElementById('errorCorreo');
    const errorMensaje = document.getElementById('errorMensaje');

    const mensajeExito = document.getElementById('mensajeExito');

    formulario.addEventListener('submit', function (evento) {

      evento.preventDefault();

      let esValido = true;

      [errorNombre, errorCorreo, errorMensaje].forEach(function (e) { e.textContent = ''; });
      [campoNombre, campoCorreo, campoMensaje].forEach(function (c) { c.classList.remove('invalido'); });
      mensajeExito.hidden = true;

      if (campoNombre.value.trim().length < 2) {
        errorNombre.textContent = 'Por favor escribe tu nombre.';
        campoNombre.classList.add('invalido');
        esValido = false;
      }

      const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formatoCorreo.test(campoCorreo.value.trim())) {
        errorCorreo.textContent = 'Escribe un correo válido, por ejemplo: nombre@correo.com';
        campoCorreo.classList.add('invalido');
        esValido = false;
      }

      if (campoMensaje.value.trim().length < 10) {
        errorMensaje.textContent = 'El mensaje debe tener al menos 10 caracteres.';
        campoMensaje.classList.add('invalido');
        esValido = false;
      }

      if (esValido) {
        mensajeExito.hidden = false;
        formulario.reset();

      }
    });
  }

  // Lógica del Lightbox para Galería de Proyectos
  const listaProyectos = document.getElementById('listaProyectos');
  const modalLightbox = document.getElementById('modalLightbox');
  
  if (listaProyectos && modalLightbox) {
    const imgModal = document.getElementById('lightboxImagen');
    const captionModal = document.getElementById('lightboxCaption');
    const btnCerrar = modalLightbox.querySelector('.lightbox__cerrar');
    const itemsProyecto = listaProyectos.querySelectorAll('.proyecto');
    
    itemsProyecto.forEach(item => {
      const img = item.querySelector('.proyecto__imagen img');
      const titulo = item.querySelector('.proyecto__info h3');
      
      if (img) {
        img.addEventListener('click', () => {
          imgModal.src = img.src;
          imgModal.alt = img.alt;
          captionModal.textContent = titulo ? titulo.textContent : '';
          modalLightbox.classList.add('activo');
          modalLightbox.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden'; // Bloquear scroll del fondo
        });
      }
    });
    
    const cerrarLightbox = () => {
      modalLightbox.classList.remove('activo');
      modalLightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        imgModal.src = '';
        imgModal.alt = '';
        captionModal.textContent = '';
      }, 300);
    };
    
    btnCerrar.addEventListener('click', cerrarLightbox);
    modalLightbox.addEventListener('click', (e) => {
      if (e.target === modalLightbox) {
        cerrarLightbox();
      }
    });
    
    // Cerrar presionando la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalLightbox.classList.contains('activo')) {
        cerrarLightbox();
      }
    });
  }

});