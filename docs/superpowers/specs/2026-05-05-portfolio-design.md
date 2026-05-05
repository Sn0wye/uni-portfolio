# Portfolio Design Spec

**Date:** 2026-05-05  
**Author:** Gabriel Trzimajewski

## Goal

Build a 5-page personal portfolio in pure HTML5/CSS3/vanilla JS that closely mirrors snowye.dev's visual design, satisfying all university assignment requirements (Fundamentos da Programação Web).

## Architecture

Multi-page (5 HTML files), each sharing one CSS file and one JS file. No build tools, no frameworks. Deployed to GitHub Pages.

## Design System

### Colors (dark theme default)
- `--bg: #08070b` — body background
- `--primary: #f2f2f2` — headings, links, strong
- `--secondary: #8f9ba8` — body text
- `--hover: #212024` — hover backgrounds
- `--border: #333333`

Light theme (`body.light`): bg `#f9f9f9`, primary `#1a1a1a`, secondary `#666`, hover `#ebebeb`.

### Per-page h1 gradients
| Page | From | To |
|---|---|---|
| Home | `#9442fe` (violet) | `#3378ff` (blue) |
| Sobre | `#ff80bf` (pink) | `#9580ff` (purple) |
| Formação | `#ffca80` (orange) | `#ffff80` (yellow) |
| Projetos | `#80ffea` (cyan) | `#8aff80` (green) |
| Contato | `#9580ff` (purple) | `#80ffea` (cyan) |

### Typography
- Body: Inter (Google Fonts)
- Headings: Syne (Google Fonts)

### Layout
- Container max-width: 48rem, centered
- Navbar: absolute positioned, 60px desktop / 110px mobile

## Pages

1. **index.html** — Home: full-screen centered hero, gradient h1, tagline, CTA
2. **sobre.html** — Sobre Mim: two-column bio with photos, highlights list
3. **formacao.html** — Formação: career timeline, education, languages, skill tags
4. **projetos.html** — Projetos: featured cards + year-grouped project lists
5. **contato.html** — Contato: contact form with JS validation

## JavaScript Functions

- `applyThemePreference()` / `toggleTheme()` / `updateThemeIcon()` — dark/light with localStorage
- `toggleMenu()` / `closeMenuOnLinkClick()` — mobile burger menu
- `setActiveNavLink()` — highlights current page in navbar
- `validateEmail(email)` — regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- `validateForm(e)` / `clearForm()` / `showSuccessMessage()` / `showFieldError()` / `clearFieldError()` — contact form
