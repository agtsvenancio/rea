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
| [06-design-system.md](06-design-system.md) | Cores, tipografia e tokens (parcial, ver pendências) |
| [07-seo-e-problemas.md](07-seo-e-problemas.md) | Metas, problemas encontrados e o que corrigir na migração |
| [sitemap.json](sitemap.json) | Sitemap em formato estruturado para script de migração |

## Resumo

- **Stack atual:** WordPress em hospedagem Hostinger, tema próprio (custom, provavelmente um template HTML de logística convertido para WP), Yoast SEO, Contact Form 7, LiteSpeed Cache. Sem Elementor.
- **Tamanho:** 7 páginas institucionais, 1 tipo de post customizado `solucoes` (hierárquico, ~15 itens) e 4 posts de blog.
- **Conversão:** quase todos os CTAs levam ao WhatsApp. Há 3 formulários (lead para WhatsApp, cotação, solicite um atendimento).
- **Padrão de página:** cabeçalho com barra de contato, breadcrumb, seções com "eyebrow" (H4) + título (H2), blocos repetidos (FAQ, "Somos a escolha certa", "Infraestrutura 700 m²", faixa de logos de órgãos reguladores, CTA final "Precisa de um transporte confiável?").

## Como o levantamento foi feito e limites

O acesso direto ao domínio (curl/navegador) estava bloqueado pela rede do ambiente, então o conteúdo veio de leituras das páginas renderizadas e da API REST pública do WordPress (`/wp-json/`).

- Headings, rótulos de botão, URLs e nomes de arquivo estão **literais**. Textos de parágrafo estão **resumidos**, não copiados palavra por palavra. Para o texto final, copie do site ou exporte do WordPress.
- O **design system está incompleto**: não foi possível ler o CSS do tema (cores hex, fontes, espaçamentos). Ver [06-design-system.md](06-design-system.md) para o que falta e como obter.
- 5 sub-páginas de "Transporte de Medicamentos" não foram lidas uma a uma (seguem o mesmo template da de Saneantes, lida por completo).
