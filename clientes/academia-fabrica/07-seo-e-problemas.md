# 07. SEO e problemas encontrados

## O que já está bem feito

- Title e meta description únicos em todas as 38 páginas, com "Itu" em quase todas (SEO local).
- Um único H1 por página.
- Canonical absoluto com barra final, `og:*` e `twitter:card` completos; og:image própria por modalidade.
- Schema `HealthClub` + `ExerciseGym` com endereço, geo, telefone, horários e faixa de preço (em todas as páginas).
- Sitemap automático e `robots.txt` liberado.
- Imagens WebP com `srcset` 900w/1800w, `loading="lazy"` fora da dobra e `fetchpriority="high"` no hero.
- Página 404 própria ("Página não encontrada"); URLs inexistentes respondem 404.
- Fontes self-hosted com `font-display: swap`; CSS único de 53 KB; quase nenhum JS.

## Problemas e o que corrigir na migração

| # | Problema | Impacto | Correção |
|---|---|---|---|
| 1 | **Links internos sem barra final** (`/planos`, `/modalidades/gap` …, em todas as páginas). Cada clique passa por um redirect **308** até `/planos/`. | Um salto extra em cada navegação; sinal misto para o Google (o canonical tem barra). | Gerar todos os `href` com `/` no fim (`trailingSlash: 'always'` no Astro). Na Hostinger, regra no `.htaccess` para o mesmo comportamento. |
| 2 | **Posts do blog sem schema `BlogPosting`** e sem `BreadcrumbList` em nenhuma página. | Perde rich results e contexto para o Google. | Adicionar `BlogPosting` (headline, datePublished, image, author) nos posts e `BreadcrumbList` nas internas. |
| 3 | **FAQ de `/planos/` sem `FAQPage`**. | Perde possível rich result. | Gerar JSON-LD a partir das 6 perguntas. |
| 4 | **Títulos de post longos** (64–76 caracteres). | Cortados na SERP. | Encurtar ou tirar o sufixo "\| Fábrica Academia" nos posts. |
| 5 | **Descriptions longas** na home (173), estrutura (180) e horários (163). | Cortadas na SERP. | Limitar a ~155 caracteres. |
| 6 | **85 imagens com `alt=""`** (cards de post, cards de modalidade na grade, fotos decorativas). | Acessibilidade ok quando o card tem texto, mas perde SEO de imagem. | Dar `alt` descritivo pelo menos às fotos dos posts e da estrutura. |
| 7 | **og:image em WebP**. | Algumas redes (versões antigas do WhatsApp/LinkedIn) não mostram prévia de WebP. | Exportar as og:image também em JPG 1200×630. |
| 8 | **Grade de horários depende de uma planilha Google pública**; o HTML vem com a grade do dia do build e `data-dia-inicial="sexta"` fixo (dia em que foi gerado). | Visitante vê a sexta aberta em qualquer dia até o JS rodar; se a planilha cair, mostra a grade antiga. | Calcular o dia atual no navegador; manter a planilha mas fazer rebuild periódico ou cache. |
| 9 | **Nomes de evento do GTM com acento** (`site_estrutura_musculação`, `site_estrutura_sala_de_ginástica`). | Fácil errar ao criar gatilhos/relatórios. | Usar o slug sem acento, como no resto. |
| 10 | **Mesmo link da EVO para os 3 planos**. | Não dá para saber no sistema de matrícula qual plano o visitante escolheu (só pelo evento do GTM). | Confirmar com a academia se a EVO aceita link direto por plano. |
| 11 | **Cabeçalhos de segurança e redirects vivem na Cloudflare**. | Somem se o site for para a Hostinger sem a Cloudflare na frente. | Recriar no `.htaccess` ou manter a Cloudflare como proxy. |
| 12 | **Sem código-fonte no repositório**: só existe o HTML compilado. | Para editar ou criar páginas é preciso o projeto Astro. | Pedir o repositório original ao responsável atual; se não houver, recriar a partir desta pasta (dados e componentes já mapeados). |

## Meta por página

Title, description, H1 e og:image de cada URL em [sitemap.json](sitemap.json).
