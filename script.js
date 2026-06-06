
// =============================================
//  EQUILÍBRIO NA COLHER — js/script.js
//  Menu hamburguer responsivo + interações
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  var header = document.querySelector('.header');
  var nav    = document.querySelector('.header__nav');

  // ---------- INJETAR BOTÃO HAMBURGUER ----------
  if (header && nav) {
    var btn = document.createElement('button');
    btn.className = 'btn-menu';
    btn.setAttribute('aria-label', 'Abrir menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';

    // Insere o botão antes da nav
    header.insertBefore(btn, nav);

    // ---------- TOGGLE MENU ----------
    btn.addEventListener('click', function () {
      var aberto = nav.classList.toggle('aberta');
      btn.classList.toggle('aberto', aberto);
      btn.setAttribute('aria-expanded', String(aberto));
    });

    // Fecha ao clicar em link (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          nav.classList.remove('aberta');
          btn.classList.remove('aberto');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Fecha ao redimensionar para desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        nav.classList.remove('aberta');
        btn.classList.remove('aberto');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- DROPDOWN "DICAS NUTRICIONAIS" (MOBILE) ----------
  var dropdowns = document.querySelectorAll('.nav__submenu-titulo');

  dropdowns.forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        item.classList.toggle('open');
      }
    });
  });

  // Fecha dropdown ao clicar fora (desktop)
  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (item) {
      if (!item.contains(e.target)) {
        item.classList.remove('open');
      }
    });
  });

  // ---------- ANIMAÇÃO DE ENTRADA NOS CARDS ----------
  var seletores = [
    '.destaques__card',
    '.receitas__card',
    '.categorias__item',
    '.artigos__card'
  ];
  var cards = document.querySelectorAll(seletores.join(', '));

  if ('IntersectionObserver' in window && cards.length > 0) {
    cards.forEach(function (card) {
      card.style.opacity    = '0';
      card.style.transform  = 'translateY(18px)';
      card.style.transition = 'opacity .45s ease, transform .45s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(function (card) { observer.observe(card); });
  }

  // ---------- HIGHLIGHT DO LINK ATIVO NO MENU ----------
  var paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && (href === paginaAtual || (paginaAtual === '' && href === 'index.html'))) {
      link.style.background   = 'var(--verde-claro)';
      link.style.color        = 'var(--verde-escuro)';
      link.style.borderRadius = '6px';
    }
  });

  // ---------- FEEDBACK VISUAL NO FORMULÁRIO ----------
  var form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      var textarea = form.querySelector('textarea');
      if (textarea && textarea.value.trim() === '') {
        e.preventDefault();
        textarea.style.borderColor = '#e53935';
        textarea.focus();
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Enviando…';
        btn.disabled = true;
      }
    });
  }

});
