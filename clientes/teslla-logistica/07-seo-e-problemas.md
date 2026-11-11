# 07. SEO e problemas encontrados

## SEO atual (Yoast)

- `<title>`: "<Página> - Teslla" (sem palavra-chave, sem "Logística").
- **Nenhuma página tem meta description.** Só algumas soluções têm og:description.
- Canonical, robots `index, follow, max-image-preview:large`, OG e `twitter:card summary_large_image` presentes.
- og:image ausente na Home.
- Search Console verificado. Sitemap provavelmente em `/sitemap_index.xml` (Yoast), não confirmado (rate limit).

## Problemas para corrigir na migração

| # | Problema | Onde | Impacto |
|---|---|---|---|
| 1 | O H1 do modal de WhatsApp ("Olá! Preencha os campos…") vem antes do H1 da página | todas | SEO/acessibilidade: 2 H1 por página |
| 2 | FAQs e colunas de rodapé usam H2 para cada pergunta/título | todas | hierarquia de headings ruim |
| 3 | Sem meta description | todas | CTR no Google |
| 4 | Links para o domínio de staging `blanchedalmond-stinkbug-185073.hostingersite.com` | posts Aéreo Expresso e Motofrete | links quebrados/vazamento de staging |
| 5 | Breadcrumb "Soluções" aponta para `/archive-solucoes/` | soluções | URL duplicada |
| 6 | Contadores da Home mostram 0 | home | credibilidade |
| 7 | "Atendimento Emegencial 24h" (erro de digitação) | topo, global | |
| 8 | "reefrigeradas" | Terrestre | |
| 9 | H2 do Aduaneiro é cópia do Terrestre | Aduaneiro | conteúdo duplicado |
| 10 | Sub-soluções reutilizam a og:description de Medicamentos | 10 páginas | duplicidade |
| 11 | Política de Privacidade e Páginas Geolocalizadas com href `#` | rodapé | LGPD: formulários coletam dados sem política |
| 12 | Imagens sem `alt` | quase todas | acessibilidade/SEO de imagem |
| 13 | Logos e galerias duplicados no HTML (efeito marquee/slider) | várias | peso da página |
| 14 | Itens numerados do hub com href `#0` | /solucoes/ | links mortos |
| 15 | Dois containers GTM | todas | possível duplicação de eventos |
| 16 | `/sample-page/` publicada | | conteúdo lixo indexável |
| 17 | Fuso horário do WP em UTC | admin | datas dos posts |
| 18 | Blog sem H1; datas sem ano nos cards | /blog/ | |
| 19 | Depoimentos sem foto/empresa e com nomes genéricos | home, hub | verificar se são reais |

## Oportunidades

- Schema.org: `LocalBusiness`/`MovingCompany` com endereço e telefones, `FAQPage` nas FAQs, `Service` nas soluções, `BreadcrumbList`.
- "Páginas Geolocalizadas" sugere plano de SEO local (ex.: "Transporte de medicamentos em <cidade>"). O template T5 serve de base.
- Títulos com palavra-chave: "Transporte de Medicamentos Refrigerado | Teslla Logística".
