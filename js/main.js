/* =========================================
   main.js — Portfolio JavaScript
   Funções: tema, menu burger, nav ativa, validação de formulário
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {
  applyThemePreference();
  setActiveNavLink();
  initBurgerMenu();
  initThemeToggle();
  initContactForm();
});

/* =========================================
   Tema Claro / Escuro
   ========================================= */

/**
 * Lê o tema salvo no localStorage e aplica ao <body>.
 * Padrão: tema escuro (sem classe). Tema claro adiciona a classe "light".
 */
function applyThemePreference() {
  var saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    updateThemeIcon(true);
  }
}

/**
 * Alterna entre tema claro e escuro e salva a preferência no localStorage.
 */
function toggleTheme() {
  var isLight = document.body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateThemeIcon(isLight);
}

/**
 * Atualiza o ícone do botão de tema (lua = escuro, sol = claro).
 * @param {boolean} isLight - true se o tema atual for claro
 */
function updateThemeIcon(isLight) {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
  var icon = btn.querySelector('svg');
  if (!icon) return;
  if (isLight) {
    /* Ícone de lua (tema claro ativo → botão para voltar ao escuro) */
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
  } else {
    /* Ícone de sol (tema escuro ativo → botão para ir ao claro) */
    icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  }
}

/**
 * Registra o evento de clique no botão de tema.
 */
function initThemeToggle() {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', toggleTheme);
}

/* =========================================
   Menu Burger (Mobile)
   ========================================= */

/**
 * Alterna a visibilidade do menu de navegação no mobile.
 */
function toggleMenu() {
  var nav = document.getElementById('main-nav');
  if (!nav) return;
  nav.classList.toggle('open');
  var burger = document.getElementById('burger-btn');
  if (burger) {
    burger.setAttribute('aria-expanded', String(nav.classList.contains('open')));
  }
}

/**
 * Fecha o menu mobile ao clicar em um link de navegação.
 */
function closeMenuOnLinkClick() {
  var nav = document.getElementById('main-nav');
  if (!nav) return;
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  });
}

/**
 * Inicializa o burger menu.
 */
function initBurgerMenu() {
  var burger = document.getElementById('burger-btn');
  if (!burger) return;
  burger.addEventListener('click', toggleMenu);
  closeMenuOnLinkClick();
}

/* =========================================
   Link Ativo na Navbar
   ========================================= */

/**
 * Adiciona a classe "active" ao link da navbar que corresponde à página atual.
 */
function setActiveNavLink() {
  var path = window.location.pathname;
  var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(function (link) {
    if (link.getAttribute('href') === file) {
      link.classList.add('active');
    }
  });
}

/* =========================================
   Validação do Formulário de Contato
   ========================================= */

/**
 * Valida o formato do email usando regex.
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Exibe uma mensagem de erro inline abaixo de um campo.
 * @param {string} fieldId - ID do campo (sem o sufixo "-error")
 * @param {string} message - Texto do erro
 */
function showFieldError(fieldId, message) {
  var el = document.getElementById(fieldId + '-error');
  if (!el) return;
  el.textContent = message;
  el.classList.add('visible');
}

/**
 * Remove a mensagem de erro de um campo.
 * @param {string} fieldId
 */
function clearFieldError(fieldId) {
  var el = document.getElementById(fieldId + '-error');
  if (!el) return;
  el.textContent = '';
  el.classList.remove('visible');
}

/**
 * Valida todos os campos do formulário de contato no envio.
 * Previne o envio padrão, exibe erros inline ou aciona o estado de sucesso.
 * @param {Event} e
 */
function validateForm(e) {
  e.preventDefault();
  var valid = true;

  var name    = document.getElementById('name');
  var email   = document.getElementById('email');
  var message = document.getElementById('message');

  /* Limpa erros anteriores */
  clearFieldError('name');
  clearFieldError('email');
  clearFieldError('message');

  /* Valida nome */
  if (!name || name.value.trim() === '') {
    showFieldError('name', 'Nome é obrigatório.');
    valid = false;
  }

  /* Valida email */
  if (!email || email.value.trim() === '') {
    showFieldError('email', 'Email é obrigatório.');
    valid = false;
  } else if (!validateEmail(email.value.trim())) {
    showFieldError('email', 'Formato de email inválido.');
    valid = false;
  }

  /* Valida mensagem */
  if (!message || message.value.trim() === '') {
    showFieldError('message', 'Mensagem é obrigatória.');
    valid = false;
  }

  /* Sucesso */
  if (valid) {
    clearForm();
    showSuccessMessage();
  }
}

/**
 * Limpa todos os campos do formulário de contato.
 */
function clearForm() {
  var form = document.getElementById('contact-form');
  if (form) form.reset();
}

/**
 * Esconde o formulário e exibe a mensagem de sucesso.
 */
function showSuccessMessage() {
  var form    = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (form)    form.style.display = 'none';
  if (success) success.classList.add('visible');
}

/**
 * Inicializa o formulário de contato (apenas na página contato.html).
 */
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', validateForm);
}
