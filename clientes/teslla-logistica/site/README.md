# Site Teslla Logística (Next.js + Tailwind)

Reconstrução do site https://tesllalogistica.com.br/ com o mesmo visual, gerado como **site estático**: o build cria uma pasta `out/` com HTML, CSS e imagens que funciona em qualquer hospedagem da Hostinger (plano compartilhado, sem Node.js).

- 31 páginas: Home, Quem Somos, Soluções (hub + 5 soluções + 10 sub-soluções), Certificações, Cotação, Contato, Blog e 4 posts.
- Mesmas URLs do site atual, então o SEO não se perde. URLs antigas do WordPress têm redirecionamento no `.htaccess`.
- Todo o texto fica em arquivos JSON/Markdown em `content/`. Para criar ou editar página não precisa mexer em código.

## Rodar no computador

Precisa do Node.js 20 ou mais novo.

```bash
npm install
npm run dev        # abre em http://localhost:3000 e atualiza ao salvar
npm run build      # confere o conteúdo e gera a pasta out/
npm run preview    # serve a pasta out/ para conferir antes de publicar
```

## Publicar na Hostinger

**Manual (5 minutos):**
1. `npm run build`
2. Compacte o **conteúdo** da pasta `out/` em um .zip (os arquivos de dentro, não a pasta).
3. hPanel → Sites → Gerenciador de Arquivos → `public_html/`. Apague os arquivos antigos (faça backup do WordPress antes), envie o .zip e clique em **Extrair**.
4. Confira se o arquivo `.htaccess` foi junto (ele fica oculto em alguns sistemas).

**Automático:** copie [deploy/github-actions-hostinger.yml](deploy/github-actions-hostinger.yml) para `.github/workflows/` e cadastre os dados de FTP como secrets no GitHub. A cada push na `main`, o site é gerado e enviado por FTP.

**Formulários:** os formulários abrem o WhatsApp comercial com os dados preenchidos e também enviam um e-mail pelo `public/api/enviar.php` (PHP já vem ativo na Hostinger). Antes de publicar, edite nesse arquivo o `$DESTINO` (quem recebe) e o `$REMETENTE` (um e-mail do domínio criado no hPanel).

## Criar uma página nova

### Nova solução ou sub-solução (template "Solução")

```bash
npm run nova -- solucao "Transporte de Hemoderivados" transporte-de-medicamentos
```

Isso cria `content/solucoes/transporte-de-hemoderivados.json` a partir do modelo. O último argumento é o pai: sem ele, vira uma solução principal (`/solucoes/<slug>/`). Com ele, vira uma sub-solução (`/solucoes/<pai>/<slug>/`) e entra sozinha na sidebar, no grid da Home e no sitemap.

Campos do arquivo:

| Campo | O que é |
|---|---|
| `titulo`, `slug` | H1 e URL (o slug precisa ser igual ao nome do arquivo) |
| `pai` | slug da solução mãe, ou `null` |
| `ordem` | posição nas listas |
| `icone` | imagem do card (círculo vermelho na Home) |
| `seo.title`, `seo.description`, `seo.ogImage` | título e descrição no Google e imagem no WhatsApp/redes |
| `resumo` | frase curta do card no hub de soluções |
| `hero.fundo`, `hero.imagem` | fundo do cabeçalho e foto da direita |
| `headline`, `paragrafos`, `citacao`, `paragrafosApos` | corpo do texto |
| `destaques` | os 2 benefícios com ícone |
| `faq`, `faqImagem` | perguntas frequentes (também geram o schema FAQPage) |
| `secoesExtras`, `secoesDepoisFaq` | blocos extras antes e depois do FAQ (lista de blocos abaixo) |

### Página livre (montada com blocos)

```bash
npm run nova -- pagina "Transporte de Medicamentos em Campinas"
```

Cria `content/paginas/<slug>.json`, publicado em `/<slug>/`. Monte a página na lista `secoes` usando os blocos:

| `tipo` | Bloco |
|---|---|
| `hero-slider` | banners rotativos |
| `grid-solucoes` | grade de soluções (`variante`: `circulo` ou `card`; `filhosDe` ou `itens`) |
| `sobre` | texto + mosaico de fotos |
| `icones` | texto + itens com ícone + imagem |
| `texto` | texto simples com imagem opcional |
| `contadores` | números em fundo escuro |
| `passos` | passos numerados |
| `numerados` | benefícios numerados |
| `estrutura` | lista de estrutura + galeria |
| `lista-check` | lista com checks |
| `faq` | perguntas frequentes |
| `por-que-nos` | bloco escuro com imagem lateral |
| `infraestrutura` | bloco escuro com fotos |
| `depoimentos` | carrossel de depoimentos |
| `blog` | últimos posts |
| `logos` | faixa de logos (ANVISA etc.) |
| `galeria`, `certificados`, `video` | mídia |
| `cta-inline`, `cta-final` | chamadas para ação |
| `form-atendimento`, `form-cotacao`, `canais-contato`, `mapa` | contato |
| `compartilhado` | reaproveita um bloco de `content/blocos/` pelo `id` |

Os blocos que se repetem em várias páginas ficam em `content/blocos/` (por-que-nos, logos, infraestrutura, impulsione, estrutura-operacional, depoimentos, cta-final, cta-medicamentos). Ao editar um deles, todas as páginas que o usam mudam juntas.

Em qualquer botão, `"href": "whatsapp"` aponta para o WhatsApp comercial com a mensagem padrão.

### Novo post no blog

Crie `content/blog/<slug>.md`:

```markdown
---
titulo: "Título do post"
data: "2026-11-11"
categoria: "Notícias"
imagem: "/images/nome-da-imagem.webp"
resumo: "Uma frase para o Google e para o card."
---

<p>Texto do post em HTML.</p>
<h2>Subtítulo</h2>
```

O post fica em `/noticias/<slug>/`.

### Imagens

Coloque em `public/images/` (de preferência .webp com até 1920px de largura) e use `/images/arquivo.webp` no conteúdo. `npm run check` avisa se algum caminho estiver errado.

## Configurações gerais

`content/site.json` guarda os telefones, os WhatsApps, o endereço, o mapa, as redes sociais, o menu, o rodapé, os setores do formulário e os containers do GTM.

## Estrutura

```
app/                 rotas (home, [slug], solucoes, blog, noticias, sitemap, robots)
components/blocos/   os blocos de seção
components/layout/   header, footer, cabeçalho das páginas, botões flutuantes
components/forms/    formulários (WhatsApp + e-mail via PHP)
content/             TODO o conteúdo do site
lib/                 leitura do conteúdo, tipos e SEO
public/              imagens, vídeos, .htaccess e api/enviar.php
tailwind.config.ts   cores, fontes e espaçamentos da marca
```

## O que mudou em relação ao site antigo

Mesmo visual, com estas correções: um H1 por página, meta description em todas as páginas, schema (LocalBusiness, Service, FAQPage, BlogPosting), sitemap e robots, links do domínio de staging corrigidos, captcha trocado por honeypot, imagens em WebP (de 199 MB para 4 MB) e vídeos comprimidos.

## Pendências do cliente

- E-mail que recebe os formulários (`public/api/enviar.php`).
- Texto da Política de Privacidade (LGPD), já que os formulários coletam dados.
- Confirmar se os dois containers do GTM continuam em uso.
- Confirmar os números dos contadores (25 K remessas, 300+ clientes etc.) e os depoimentos.
