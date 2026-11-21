# 02. Stack e integrações

## Site atual

| Camada | O que é | Evidência |
|---|---|---|
| CMS | WordPress 7.1.5 | `<meta name="generator">`, `/wp-json/` aberto |
| Tema | Hello Elementor 3.4.7 | `wp-content/themes/hello-elementor` |
| Construtor | Elementor 4.0.1 + **Elementor Pro 3.35.1** | Theme Builder: cabeçalho (ID 139), rodapé (ID 119), 404 (ID 81); kit global ID 44 |
| Addons | **The Plus Addons for Elementor** (versão gratuita) | widgets `tp-heading-title`, `tp-accordion`, `tp-contact-form-7` |
| Formulário | Contact Form 7 6.1.5 (formulário ID 492) | página Contato |
| Servidor | OpenLiteSpeed + **CyberPanel** 2.5.7 em VPS | cabeçalhos `server: LiteSpeed`, `x-powered-by: CyberPanel-OLS` |
| Cache | LiteSpeed Cache | cabeçalho `x-litespeed-cache: hit` |
| Domínio | subdomínio de `seuprojeto.online` (provável ambiente de agência/homologação) | |
| SSL | **Let's Encrypt Staging (inválido)** | cadeia "(STAGING) Baloney Bulgur YE2" |
| SEO | nenhum plugin (sem Yoast/Rank Math); sitemap nativo do WP | |
| Rastreamento | **nenhum** (sem GTM, GA4, Pixel, Clarity) | |
| Fontes | Google Fonts: Sora e Manrope (agora servidas localmente na cópia) | |

Recursos do Elementor ativos: `e_font_icon_svg` (ícones como SVG inline), breakpoints adicionais (mobile 767, mobile extra 880, tablet 1024, tablet extra 1200, laptop 1366, widescreen 2400), CSS externo por página (`uploads/elementor/css/post-<ID>.css`).

## Integrações

| Integração | Onde | Detalhe |
|---|---|---|
| WhatsApp | todos os botões "Entre em contato" / "Solicitar orçamento" | `https://api.whatsapp.com/send/?phone=11915415353&text=Olá tudo bem? Vim do site e gostaria de mais informações por favor!` |
| Telefone | cabeçalho, Sobre, Contato | (11) 91541-5353 (no cabeçalho é texto, não link `tel:`) |
| E-mail | barra superior, Contato | contato@fastarcondicionado.com (`mailto:`) |
| Instagram | barra superior e rodapé | `@fast_arcondicionados` |
| Google Maps | barra superior (link), ícone de pin, iframe na página Contato | Rua Nevada, 486 – Mauá, SP. Dois links curtos diferentes: `maps.app.goo.gl/dj3skr4fbrgb1Ja98` e `maps.app.goo.gl/DqaNU7FLoEKReriy6` |
| Lottie | banner de topo das páginas internas + "Como funciona" (Sobre) | 3 arquivos JSON em `lottie.host` (externos, não foi possível baixá-los) |
| Formulário | Contato | campos Nome, E-mail, Assunto, Telefone, Mensagem (todos obrigatórios) |

## Na cópia recuperada

- Sem WordPress, PHP só para o formulário (`enviar.php`, usa `mail()` da Hostinger, destino `contato@fastarcondicionado.com`).
- O JS do Contact Form 7 (que dependia da API REST) foi removido e trocado por `assets/form-contato.js`, que mantém as classes e mensagens do CF7, então o visual de erro/sucesso é o mesmo. Tem honeypot anti-spam.
- Todos os links absolutos para `fastarcondicionado.seuprojeto.online` viraram relativos à raiz (inclusive os escondidos em JSON e base64 do lightbox), então o site funciona em qualquer domínio.
- Os `?ver=` dos arquivos foram removidos do nome (a Hostinger serve `.js`/`.css` com o tipo certo).
