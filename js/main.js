/* =========================================
   main.js — Portfolio JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {
  applyThemePreference();
  setActiveNavLink();
  initBurgerMenu();
  initThemeToggle();
  initContactForm();
});

/* =========================================
   Theme (Dark / Light)
   ========================================= */

/**
 * Reads saved theme from localStorage and applies it to <body>.
 * Dark is default (no class); light mode adds class "light".
 */
function applyThemePreference() {
  var saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    updateThemeIcon(true);
  }
}

/**
 * Toggles light/dark mode and saves preference to localStorage.
 */
function toggleTheme() {
  var isLight = document.body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateThemeIcon(isLight);
}

/**
 * Updates the theme toggle button SVG (moon when dark, sun when light).
 * @param {boolean} isLight - true if currently in light mode
 */
function updateThemeIcon(isLight) {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
  var icon = btn.querySelector('svg');
  if (!icon) return;
  if (isLight) {
    /* Moon */
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
  } else {
    /* Sun */
    icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  }
}

function initThemeToggle() {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', toggleTheme);
}

/* =========================================
   Mobile Burger Menu
   ========================================= */

/**
 * Toggles the mobile nav menu open/closed.
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
 * Closes the mobile menu when a nav link is clicked.
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

function initBurgerMenu() {
  var burger = document.getElementById('burger-btn');
  if (!burger) return;
  burger.addEventListener('click', toggleMenu);
  closeMenuOnLinkClick();
}

/* =========================================
   Active Nav Link
   ========================================= */

/**
 * Adds "active" class to the nav link that matches the current page filename.
 */
function setActiveNavLink() {
  var path  = window.location.pathname;
  var file  = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(function (link) {
    if (link.getAttribute('href') === file) {
      link.classList.add('active');
    }
  });
}

/* =========================================
   Contact Form Validation
   ========================================= */

/**
 * Validates email format.
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Shows inline error beneath a form field.
 * @param {string} fieldId
 * @param {string} message
 */
function showFieldError(fieldId, message) {
  var el = document.getElementById(fieldId + '-error');
  if (!el) return;
  el.textContent = message;
  el.classList.add('visible');
}

/**
 * Clears inline error for a form field.
 * @param {string} fieldId
 */
function clearFieldError(fieldId) {
  var el = document.getElementById(fieldId + '-error');
  if (!el) return;
  el.textContent = '';
  el.classList.remove('visible');
}

/**
 * Validates all contact form fields on submit.
 * Prevents default, shows inline errors or triggers success state.
 * @param {Event} e
 */
function validateForm(e) {
  e.preventDefault();
  var valid = true;

  var name    = document.getElementById('name');
  var email   = document.getElementById('email');
  var message = document.getElementById('message');

  clearFieldError('name');
  clearFieldError('email');
  clearFieldError('message');

  if (!name || name.value.trim() === '') {
    showFieldError('name', 'Nome é obrigatório.');
    valid = false;
  }

  if (!email || email.value.trim() === '') {
    showFieldError('email', 'Email é obrigatório.');
    valid = false;
  } else if (!validateEmail(email.value.trim())) {
    showFieldError('email', 'Formato de email inválido.');
    valid = false;
  }

  if (!message || message.value.trim() === '') {
    showFieldError('message', 'Mensagem é obrigatória.');
    valid = false;
  }

  if (valid) {
    clearForm();
    showSuccessMessage();
  }
}

/**
 * Resets all contact form fields.
 */
function clearForm() {
  var form = document.getElementById('contact-form');
  if (form) form.reset();
}

/**
 * Hides the form and displays the success message.
 */
function showSuccessMessage() {
  var form    = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (form)    form.style.display = 'none';
  if (success) success.classList.add('visible');
}

function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', validateForm);
}
