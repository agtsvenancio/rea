# 06. Design system

Extraído do CSS do tema (`/wp-content/themes/tema/`, cópia em [referencia/](referencia/)) e dos **estilos computados no navegador** (Chromium, 1440px e 390px). Valores literais.

Base: Bootstrap 5.3.0 + template HTML de logística (classes com prefixo `lt-`, ex.: `lt-primary-btn`, `service-section-4`, `testi-item-4`), adaptado no tema "BLOG SEO" de Taciara Furtado. Tokens prontos para uso em [tokens.css](tokens.css).

## Cores

| Token | Hex | Uso |
|---|---|---|
| `--lt-color-theme-primary` | `#CC1111` | vermelho da marca: botões, eyebrows (H4), ícones circulares, links do rodapé, item ativo do menu, "voltar ao topo" |
| `--lt-color-heading-primary` | `#0F1B24` | títulos, links do menu, **fundo escuro** (top bar, seções "Somos a escolha certa"/"Infraestrutura"), hover dos botões |
| `--lt-color-text-body` | `#757575` | texto corrido |
| `--lt-color-grey-1` | `#F9F9F9` | fundo de sidebar e seções claras |
| `--lt-color-common-white` | `#FFFFFF` | fundo padrão, texto sobre escuro |
| `--lt-color-border-1` | `#DDDDDD` | bordas (ícones sociais do rodapé) |
| `--lt-color-border-2` | `rgba(15,27,36,.1)` | divisores, sombras |
| `--lt-color-theme-secondary` | `#FFC226` | definido, **quase não usado** |
| Bordas de input (Bootstrap) | `#DEE2E6` | formulários |
| Texto do FAQ (Bootstrap) | `#212529` | perguntas do acordeão |

Inconsistências (corrigir na migração): botão flutuante "Solicitar Cotação" em **azul `#1D72B8`** (hover `#155A96`), fora da paleta; detalhe do blockquote em **laranja `#FE5624`**, sobra do template original.

## Tipografia

| Papel | Fonte | Peso | Desktop | Mobile (390px) |
|---|---|---|---|---|
| Títulos (H1–H6, botões, eyebrow, números) | **DM Sans** (Google Fonts) | 600–700 | | |
| Corpo / parágrafo | **Poppins** (Google Fonts) | 400 | 16px / 25px | 16px |
| Menu principal | **Roboto** | 500, capitalize | 16px | |
| H1 do cabeçalho de página | DM Sans | 600 | 80px / 96px, branco | menor (breakpoints do tema) |
| H2 de seção | DM Sans | 700 | 38px / 41.8px (home), 36px (soluções), 48px no CTA | 32px / 35.2px |
| H3 (cards) | DM Sans | 600 | 20px / 24px | 20px |
| H4 eyebrow (`.sub-heading`) | DM Sans | 600, capitalize, cor primária | 18px | 16px |
| Pergunta do FAQ | DM Sans | 600 | 18px | |
| Número do contador | DM Sans | 700 | 48px, branco | |
| Título de widget do rodapé | DM Sans | 700 | 22px | |
| Banner da home | arte em imagem (PNG), não é texto | | | |

Import usado pelo tema: `https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap`

Obs.: o tema também carrega Roboto variável e Space Grotesk locais (`assets/fonts/`), mas Space Grotesk não é usada. Ícones: Font Awesome 6.4.2 (UI) + PNGs/SVGs próprios.

## Layout e espaçamento

- Container: **1170px** (Bootstrap `.container` customizado).
- Breakpoints do tema: 1399, 1170, 991/992, 767px (mais usados: 991 e 767).
- Espaçamento vertical de seção: `pt-120 pb-120` = **120px** desktop, **70px** ≤991px, **50px** ≤767px. Variações: 70px e 80px (contadores).
- Cabeçalho de página: imagem de fundo + overlay, padding 120px, altura ~497px.
- Top bar: 42px, fundo `#0F1B24`. Header: 85px, branco, links com padding 30px 0.
- Sidebar de soluções: fundo `#F9F9F9`, padding 30px, itens com 20px entre si.

## Componentes visuais

| Elemento | Estilo |
|---|---|
| Botão primário `.lt-primary-btn` | fundo `#CC1111`, texto branco, DM Sans 16px/600, padding `12px 30px`, **raio 0**; hover: preenchimento `#0F1B24` sobe de baixo (`:before`, 0.4s `cubic-bezier(.785,.135,.15,.86)`); seta FA 12px opcional |
| Botão `.primary-2` | variante para fundo escuro: hover branco com texto `#0F1B24` |
| Botão flutuante cotação | pílula (raio 50px), `16px 28px`, 18px/600, sombra `0 4px 12px rgba(0,0,0,.15)`; fixo embaixo no centro (desktop) e barra 100% (mobile) |
| Input (CF7) | altura 38px, padding `6px 12px`, raio 6px, borda 1px `#DEE2E6` |
| Card FAQ (acordeão Bootstrap) | branco, raio 6px, sombra `0 3px 15px rgba(15,27,36,.1)`, pergunta com padding `20px 16px` |
| Blockquote | branco, padding 50px, sombra `0 16px 40px rgba(15,27,36,.1)` + barra lateral 4px (hoje laranja; usar `#CC1111`) |
| Ícone de solução (home) | círculo vermelho com ícone branco, 150×150 |
| Voltar ao topo | 45px, fundo `#CC1111`, raio 5px |
| Ícones sociais do rodapé | 45px, borda 1px `#DDD`, ícone `#CC1111` |
| Cards de blog / depoimentos | sem raio, sem sombra (depoimento em fundo branco) |
| Seções escuras | fundo `#0F1B24` com texto branco e imagem lateral |

## Comportamento e bibliotecas

jQuery 3.7.1, Bootstrap 5.3.0 (JS), Swiper 6.8 (sliders/carrosséis), WOW.js + waypoints (animação "fade-in-bottom" ao rolar), Isotope + imagesLoaded, MeanMenu (menu mobile), VenoBox e Lightbox2 (galerias), Font Awesome 6.4.2. Também **VLibras** (widget de Libras do governo).

Elementos flutuantes globais: WhatsApp (direita), voltar ao topo (direita), botão "Solicitar Cotação" (centro, embaixo).

## Prints de referência

Em [prints/](prints/): desktop (1440px) de todas as 25 páginas e mobile (390px) de Home, Quem Somos, Contato, uma Solução e uma Sub-solução.
