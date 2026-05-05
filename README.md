# Portfólio — Gabriel Trzimajewski

Portfólio pessoal desenvolvido com HTML5, CSS3 e JavaScript puro para a disciplina Fundamentos da Programação Web (UNINTER).

## Acesso

> Publicado em: https://Sn0wye.github.io/uni-portfolio/

## Estrutura de Arquivos

```
portfolio/
├── index.html        # Página inicial
├── sobre.html        # Sobre mim
├── formacao.html     # Formação, carreira e habilidades
├── projetos.html     # Projetos
├── contato.html      # Contato
├── css/
│   └── style.css     # Todos os estilos (variáveis CSS, Flexbox, Grid, responsivo)
├── js/
│   └── main.js       # JavaScript (tema, burger menu, validação de formulário)
└── assets/
    └── images/       # Imagens (me.jpeg, me2.jpeg)
```

## Como Rodar Localmente

Abra `index.html` diretamente no navegador — não requer servidor ou build tools.

## Tecnologias

- **HTML5** semântico (`header`, `nav`, `main`, `section`, `footer`)
- **CSS3** puro (variáveis CSS, Flexbox, Grid, media queries, transições)
- **JavaScript** vanilla — sem bibliotecas ou frameworks
- **Google Fonts**: Inter (body) + Syne (headings)

## Funcionalidades JavaScript

- Tema escuro/claro com persistência via `localStorage`
- Menu responsivo com burger button em mobile
- Detecção automática da página ativa na navbar
- Formulário de contato com validação:
  - Verificação de campos vazios
  - Validação de email via regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - Mensagens de erro inline por campo
  - Simulação de envio com estado de sucesso

## Páginas

| Página    | Arquivo         | Descrição                                |
| --------- | --------------- | ---------------------------------------- |
| Home      | `index.html`    | Apresentação com CTA                     |
| Sobre Mim | `sobre.html`    | Bio, fotos, destaques de carreira        |
| Formação  | `formacao.html` | Carreira, educação, idiomas, habilidades |
| Projetos  | `projetos.html` | Projetos em destaque + lista completa    |
| Contato   | `contato.html`  | Formulário com validação JS              |
