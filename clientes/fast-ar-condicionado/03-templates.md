# 03. Templates de página

Todas as páginas são montadas no Elementor com o template **Elementor Header & Footer** (`elementor_header_footer`): cabeçalho global (ID 139) + conteúdo da página + rodapé global (ID 119). Há 4 tipos de página na prática.

## Cabeçalho global (todas as páginas)

1. **Barra superior** (`#25293D`): pin + "Rua Nevada, 486 – Mauá, SP" (link Maps) · envelope + e-mail · à direita ícones Instagram e Maps.
2. **Barra principal** (branca, **fixa no topo só no desktop**): logo `Azul.png` à esquerda · menu (Elementor Pro Nav Menu, com submenu em Serviços; hambúrguer no celular) · à direita "Entre em contato / (11) 91541-5353" (link WhatsApp).

## Rodapé global (todas as páginas)

Fundo `#000060`, 3 colunas: logo `Branco.png` + frase "Soluções completas em climatização para residências, empresas, comércios, clínicas e escritórios" + ícones Instagram/Maps · "Páginas de utilidade" · "Serviços". Linha final: "2026 – Fast Ar Condicionados – Todos os Direitos Reservados".

## T1. Home (`/`)

1. Hero com foto escura de fundo, H1 em título animado (Elementor Pro *Animated Headline*), subtítulo e botão WhatsApp.
2. Sobre (fundo `#F7F7F7`): rótulo azul sublinhado "Sobre Nós" + H2 + 2 parágrafos + 4 itens com check, e composição de 2 fotos à direita.
3. Nossos serviços: rótulo + H2 + 3 cards (ícone, H3, texto, link "Ver mais →").
4. "Por que escolher" (fundo azul escuro com foto do técnico e flocos de neve): 3 caixas com borda azul + link "Solicite um orçamento".
5. Depoimentos: carrossel (Nested Carousel) com 4 depoimentos sobre foto.
6. "Marcas que trabalhamos": carrossel com 8 logos (Electrolux, Daikin, Elgin, Samsung, Philco, Midea, LG, Fujitsu).
7. CTA final: rótulo "Entre em contato" + H2 + texto + 3 garantias com check + botão WhatsApp + foto.

## T2. Página interna simples (Sobre Nós, Serviços, Galeria, FAQ, Contato, 404)

1. **Banner de título**: fundo `#25293D` com foto em sobreposição + animação Lottie decorativa + H1 (The Plus *Heading Title*) centralizado.
2. Seções específicas (ver [05-conteudo-por-pagina.md](05-conteudo-por-pagina.md)).
3. Quase sempre termina com um bloco "Entre em contato" + botão.

## T3. Página de serviço (as 3 filhas de `/servicos/`)

Mesma estrutura nas três, só muda texto e imagens. É o molde para criar páginas de serviço novas.

1. Banner de título (igual T2) com H1 = nome do serviço.
2. Intro (fundo `#F7F7F7`): rótulo + H2 (subtítulo do serviço) + parágrafo + 2 itens com check + botão WhatsApp "Entre em contato" + foto.
3. "Como funciona": rótulo + H2 + parágrafo + 3 etapas (título + texto) + link "Solicite um orçamento".
4. "Compromisso com a qualidade": rótulo + H2 + texto + 4 cards (ícone PNG, H3, texto).
5. CTA final (fundo `#F7F7F7`): rótulo "Entre em contato" + H2 ("Precisa … seu ar-condicionado?") + texto + 3 garantias + botão "Solicitar orçamento agora" + imagem 570×500.

## T4. Página 404 (Theme Builder, ID 81)

Banner de título "Página não encontrada" + "404" + frase + botão "Ir para Home". Na cópia estática é `404.html`, ligado pelo `.htaccess`.
