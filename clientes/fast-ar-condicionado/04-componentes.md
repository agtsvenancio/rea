# 04. Componentes

Widgets usados no conteúdo das páginas (levantados do DOM renderizado). Classes e estilos estão no CSS de cada página em `wp-content/uploads/elementor/css/post-<ID>.css` (cópias em [referencia/](referencia/)).

| Componente | Widget | Onde | Observações |
|---|---|---|---|
| Título animado | `animated-headline` (Pro) | Hero da Home | H1 com efeito de destaque |
| Título de banner | `tp-heading-title` (The Plus) | H1 das páginas internas | branco, centralizado |
| Rótulo + título + texto | `icon-box` sem ícone | quase todas as seções | rótulo em Manrope 800 azul `#0B66FF` sublinhado (tipografia "secondary" do kit) + H2 Sora 700 |
| Lista com check | `icon-list` | Sobre, serviços, CTAs | ícone check azul |
| Botão | `button` | CTAs | fundo `#0B66FF`, texto branco Sora 600 14px, hover `#25293D`, cantos retos |
| Card de serviço | container + `image` + `icon-box` + `button` | Home, Serviços | fundo `#F7F7F7`, ícone PNG azul, link "Ver mais →" |
| Card com borda | `icon-box` | "Por que escolher" | borda azul sobre fundo escuro |
| Carrossel de depoimentos | `n-carousel` (Pro, Nested Carousel) | Home | 4 slides, setas e bolinhas |
| Carrossel de logos | `n-carousel` | Home | 8 logos, 3 por vez no desktop |
| Contador | `counter` | Sobre Nós | "+150 Atendimentos realizados", "+300 Clientes atendidos" |
| Animação | `lottie` (Pro) | banners e "Como funciona" | JSON externo em `lottie.host` |
| Acordeão | `tp-accordion` (The Plus) | FAQ | 3 grupos (Instalação, Limpeza, Manutenção), primeiro item aberto |
| Galeria | `gallery` (Pro) | Galeria | grade 2 colunas, proporção 3:2, lightbox |
| Formulário | `tp-contact-form-7` + Contact Form 7 | Contato | 5 campos + Enviar (botão largura total) |
| Mapa | `html` com iframe Google Maps | Contato | |
| Menu | `nav-menu` (Pro) | cabeçalho | submenu em hover, hambúrguer no celular |
| Ícones sociais | `social-icons` | cabeçalho, rodapé | Instagram e Maps, quadrados azuis |

Animação de entrada: a maioria dos blocos usa `fadeInUp` do Elementor (classe `elementor-invisible` até entrar na tela).
