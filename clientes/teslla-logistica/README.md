# Teslla Logística: engenharia reversa do site

Site analisado: https://tesllalogistica.com.br/ (levantamento em 11/11/2026).
Objetivo: documentar o site atual para construir novas páginas no mesmo padrão e preparar a migração.

| Arquivo | Conteúdo |
|---|---|
| [01-sitemap.md](01-sitemap.md) | Todas as URLs, IDs do WordPress, hierarquia e datas |
| [02-stack-e-integracoes.md](02-stack-e-integracoes.md) | CMS, plugins, tags, formulários, WhatsApp, contatos |
| [03-templates.md](03-templates.md) | Os 6 templates de página e a ordem das seções de cada um |
| [04-componentes.md](04-componentes.md) | Inventário de componentes reutilizáveis (blocos de seção) |
| [05-conteudo-por-pagina.md](05-conteudo-por-pagina.md) | Títulos, headings, CTAs, FAQs e imagens de cada página |
| [06-design-system.md](06-design-system.md) | Cores, tipografia, espaçamentos e componentes visuais |
| [tokens.css](tokens.css) | Tokens e estilos base prontos para as páginas novas |
| [conteudo/](conteudo/) | **Texto literal** de cada uma das 25 páginas (headings, parágrafos, FAQs, botões) |
| [prints/](prints/) | Prints de página inteira (desktop de todas, mobile das principais) |
| [referencia/](referencia/) | CSS original do tema e CSS customizado do WordPress |
| [07-seo-e-problemas.md](07-seo-e-problemas.md) | Metas, problemas encontrados e o que corrigir na migração |
| [sitemap.json](sitemap.json) | Sitemap em formato estruturado para script de migração |
| [site/](site/) | **Novo site em Next.js + Tailwind**, exportado como estático para a Hostinger (ver [site/README.md](site/README.md)) |

## Resumo

- **Stack atual:** WordPress na Hostinger, tema próprio sobre Bootstrap 5.3 (template HTML de logística convertido), Yoast SEO, Contact Form 7, LiteSpeed Cache. Sem Elementor.
- **Visual:** vermelho `#CC1111` + azul-petróleo escuro `#0F1B24`, títulos em DM Sans, texto em Poppins, botões retos, container de 1170px.
- **Tamanho:** 7 páginas institucionais, 1 tipo de post customizado `solucoes` (hierárquico, ~15 itens) e 4 posts de blog.
- **Conversão:** quase todos os CTAs levam ao WhatsApp. Há 3 formulários (lead para WhatsApp, cotação, solicite um atendimento).
- **Padrão de página:** cabeçalho com barra de contato, breadcrumb, seções com "eyebrow" (H4) + título (H2), blocos repetidos (FAQ, "Somos a escolha certa", "Infraestrutura 700 m²", faixa de logos de órgãos reguladores, CTA final "Precisa de um transporte confiável?").

## Como o levantamento foi feito

Leitura das páginas renderizadas em navegador headless (Chromium), da API REST pública do WordPress (`/wp-json/`) e do CSS do tema. Textos em `conteudo/` são literais; os arquivos 03 a 05 trazem a estrutura e resumos para consulta rápida.

Nos prints, algumas seções animadas (WOW.js) podem aparecer em branco; isso é efeito da captura, não do site.
