# 02. Stack e integrações

## Stack atual

| Item | O que foi encontrado | Evidência |
|---|---|---|
| Framework | **Astro** (site estático, sem ilhas de framework JS) | pasta `/_astro/`, atributos `data-astro-cid-*`, scripts `*.astro_astro_type_script_*` |
| CSS | **Tailwind CSS v4.3.3**, tema via `@theme` | cabeçalho `tailwindcss v4.3.3` no CSS; um único arquivo `/_astro/aula-gratis.CFiHCv2Y.css` (53 KB) |
| Fontes | Fontsource (self-hosted): **Anton** 400 e **Inter Variable** 100–900 | `@font-face` em `/_astro/*.woff2` |
| Sitemap | `@astrojs/sitemap` | `/sitemap-index.xml` → `/sitemap-0.xml` |
| Hospedagem/CDN | **Cloudflare** (provável Cloudflare Pages ou Workers static assets) | `server: cloudflare`, redirect **308** `/planos` → `/planos/`, beacon `static.cloudflareinsights.com` |
| Cabeçalhos de segurança | CSP `base-uri/form-action 'self'; frame-ancestors 'none'`, HSTS, `X-Frame-Options: DENY`, `Permissions-Policy` restritiva | resposta HTTP da home |
| JS | Pouco e sem framework: menu mobile, animação `.reveal` (IntersectionObserver), quiz, filtro da grade de horários | ver [referencia/](referencia/) |
| CMS | **Nenhum.** Conteúdo está no código (array de modalidades, posts provavelmente em Markdown/Content Collections) | não há `/wp-json`, `/admin`, nem API |

**Consequência para a Hostinger:** o site já é 100% estático. Para hospedar na Hostinger basta rodar `npm run build` no projeto Astro e subir `dist/` em `public_html`. Pontos que precisam de atenção na troca de Cloudflare para Hostinger:

1. **Barra final:** o Cloudflare redireciona `/planos` → `/planos/`. Na Hostinger (LiteSpeed/Apache) a pasta `planos/index.html` responde nas duas formas sem redirect. Recomenda-se corrigir os links internos para terminarem em `/` (ver 07) e, se quiser, adicionar a regra no `.htaccess`.
2. **Cabeçalhos de segurança:** hoje vêm da Cloudflare. Recriar no `.htaccess` (`Header set ...`) ou manter a Cloudflare na frente da Hostinger como proxy DNS.
3. **Web Analytics da Cloudflare:** deixa de existir se o DNS sair da Cloudflare. O GTM continua.
4. **Código-fonte:** só temos o HTML compilado. Se a agência não tiver o repositório Astro original, recriar o projeto a partir desta documentação (os componentes e dados estão mapeados em 03, 04 e `dados/`).

## Integrações

| Integração | Uso | Detalhe |
|---|---|---|
| **WhatsApp** `5511961819425` | CTA principal de todo o site | `wa.me` com mensagem pronta. Variações: "Vim pelo site… e quero agendar minha aula grátis", "…quero mais informações", e por modalidade: "Vi a modalidade {Nome} no site… e quero saber horários/agendar uma aula". O quiz gera a mensagem com a trilha recomendada. |
| **Grupo de WhatsApp** | Faixa "A Fábrica faz 30 anos" (home) | `chat.whatsapp.com/DBj5H9p3Wbc0F8IJA6cCEW` |
| **EVO / W12 (matrícula online)** | Botões "Quero este plano" | `https://evo-totem.w12app.com.br/fabrica/1/site/7Nvd[BAR][BAR]Cv8RNTGZ21BQR47g[EQUAL][EQUAL]` (mesmo link para os 3 planos) |
| **Google Sheets publicado (CSV)** | Atualiza a grade de `/horarios` no navegador | `docs.google.com/spreadsheets/d/e/2PACX-1vRULOBd1uhHgH8G7R-n59FdTUdH3_42W8cbEmJiBhLdoxfO-UbZgeRTSbgfQ_KeYCSEZXbXYwkcKbDs/pub?gid=52290074&single=true&output=csv` |
| **Google Tag Manager** | Rastreamento | `GTM-MWH6WZK` (script + noscript) |
| **Cloudflare Web Analytics** | Métricas | beacon automático |
| **Google Maps** | Mapa embutido na home + "Traçar rota" | iframe `google.com/maps?q=...&output=embed` |
| **Instagram / Facebook** | Rodapé e contato | `instagram.com/fabricaacademia`, `facebook.com/FabricaAcademia` |
| **Wellhub** | Só citação de convênio (logo) | "Acesso a partir do plano Silver" |

### Planilha de horários

O script [referencia/horarios-grade.js](referencia/horarios-grade.js) baixa o CSV com `cache: no-store` e, se der certo, substitui a grade impressa no HTML. Colunas lidas (cabeçalho, sem acento, minúsculo):

| Coluna | Obrigatória | Observação |
|---|---|---|
| `dia` | sim | segunda … domingo |
| `inicio` | sim | `HH:MM` |
| `fim` | não | |
| `aula` | sim | nome exibido |
| `modalidade_slug` | não | se existir em `modalidades.json`, o nome vira link para `/modalidades/{slug}/` |
| `sala` | sim | vazio vira "A definir" |
| `professor`, `nivel` | não | |
| `ativo` | não | `nao` esconde a linha |

O HTML traz um `data-assinatura` (hash FNV-1a da grade do build); se a planilha tiver o mesmo conteúdo, o DOM não é refeito. [dados/horarios.csv](dados/horarios.csv) está nesse formato e pode ser colado na planilha.

### Rastreamento de cliques

Todo elemento com `data-event="..."` envia `dataLayer.push({event: 'cta_click', cta: '<nome>'})`. Padrão de nomes: `site_<página>_<elemento>`, por exemplo `site_header_aula_gratis`, `site_mobilebar_aula_gratis`, `site_float_whatsapp`, `site_planos_premium12`, `site_modalidade_<slug>`, `site_modalidade_horarios_<slug>`, `site_quiz_resultado`. Páginas novas devem seguir o mesmo padrão para não quebrar os relatórios do GTM.

## Dados de contato e funcionamento

- **Endereço:** R. dos Andradas, 46, Centro, Itu/SP, 13300-170 (geo -23.2645, -47.2992)
- **WhatsApp:** (11) 96181-9425
- **Funcionamento:** seg a qui 5h–23h · sex 5h–22h · sáb 7h–15h · dom e feriados 8h–14h
- **Planos:** Básico R$ 189,90/mês (sem fidelidade) · Premium 12 meses R$ 149,90/mês (recomendado) · Premium 6 meses R$ 159,90/mês
- **Números de marketing:** 780 aulas por mês, 24 modalidades, +1.200 m² de musculação, +200 máquinas, +40 equipamentos de cardio, 30 anos em abril de 2027
