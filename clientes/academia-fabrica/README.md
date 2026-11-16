# Fábrica Academia: engenharia reversa do site

Site analisado: https://academiafabrica.com.br/ (levantamento em 16/11/2026).
Objetivo: documentar o site atual para criar novas páginas no mesmo padrão e preparar a migração/hospedagem na Hostinger.

| Arquivo | Conteúdo |
|---|---|
| [01-sitemap.md](01-sitemap.md) | As 38 URLs, hierarquia e template de cada uma |
| [02-stack-e-integracoes.md](02-stack-e-integracoes.md) | Framework, hospedagem, rastreamento, WhatsApp, matrícula online, planilha de horários |
| [03-templates.md](03-templates.md) | Os 5 templates de página e a ordem das seções |
| [04-componentes.md](04-componentes.md) | Inventário de componentes reutilizáveis, com as classes Tailwind |
| [05-conteudo-por-pagina.md](05-conteudo-por-pagina.md) | Seções, headings, CTAs e imagens de cada página |
| [06-design-system.md](06-design-system.md) | Cores, tipografia, raios, botões, animações |
| [tokens.css](tokens.css) | Tema Tailwind v4 (`@theme`) pronto para páginas novas |
| [07-seo-e-problemas.md](07-seo-e-problemas.md) | Metas, schema, problemas encontrados e o que corrigir |
| [dados/modalidades.json](dados/modalidades.json) | **Base das 24 modalidades** (nome, grupo, textos, benefícios, fotos), extraída do bundle do site |
| [dados/horarios.csv](dados/horarios.csv) | Grade com as 192 aulas, no mesmo formato de colunas da planilha que alimenta `/horarios` |
| [sitemap.json](sitemap.json) | Sitemap estruturado (título, description, H1, template) para script de migração |
| [conteudo/](conteudo/) | **Texto literal** de cada uma das 38 páginas (FAQs abertos) |
| [prints/](prints/) | Prints de página inteira (desktop de todas, mobile das principais) |
| [referencia/](referencia/) | CSS compilado do site, script do quiz, script da grade de horários e estilos animados da home |

Os arquivos originais (HTML, CSS, fontes e as 105 imagens + 24 miniaturas) estão no espelho completo `academia-fabrica/academia-fabrica-espelho.zip` nos arquivos do projeto. Não foram versionados aqui para não pesar o repositório (~19 MB).

## Resumo

- **Stack atual:** site estático gerado com **Astro** + **Tailwind CSS v4.3**, publicado atrás da **Cloudflare** (comportamento típico de Cloudflare Pages/Workers: redirect 308 para barra final, beacon do Web Analytics). Não é WordPress: não há CMS, API ou banco. Conteúdo vive no código.
- **Já está no formato que a Hostinger aceita:** o build gera só HTML/CSS/JS e imagens. Basta subir a pasta `dist/` para `public_html`. A única dependência externa em tempo de execução é a planilha Google publicada que atualiza a grade de horários.
- **Visual:** tema escuro (`#080A0B` / `#111417`) com verde-limão `#A3C940` de destaque; títulos em **Anton** caixa alta, texto em **Inter Variable**; botões em pílula; container de 1280px.
- **Tamanho:** 10 páginas institucionais, 24 páginas de modalidade (geradas de um único array de dados) e 4 posts de blog.
- **Conversão:** todo CTA principal leva ao WhatsApp `(11) 96181-9425` com mensagem pronta; "Quero este plano" leva à matrícula online da EVO (W12). Há quiz de 3 perguntas que recomenda uma trilha de modalidades e manda para o WhatsApp. Nenhum formulário coleta dados no site.
- **Rastreamento:** GTM `GTM-MWH6WZK` + evento `cta_click` no `dataLayer` para todo elemento com `data-event` (mais de 130 nomes de evento mapeados).

## Como o levantamento foi feito

Sitemap oficial (`/sitemap-index.xml`), download de todas as páginas e assets, leitura das páginas renderizadas em Chromium headless (texto, seções, links, prints com as animações de entrada forçadas a aparecer) e leitura do CSS e dos scripts compilados. `dados/modalidades.json` foi convertido do array que o próprio site embute no JS da grade, sem executar o script.

A planilha Google dos horários é acessada pelo navegador do visitante; dela registramos o formato de colunas. O conteúdo de `dados/horarios.csv` é a grade que já vem impressa no HTML (fallback do build).
