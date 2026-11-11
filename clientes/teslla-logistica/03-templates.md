# 03. Templates de página

Todo o site usa 6 templates. Os nomes dos blocos (em `código`) estão definidos em [04-componentes.md](04-componentes.md).

## Elementos globais (todas as páginas)

Ordem no HTML: `WhatsAppLeadModal` → `QuoteModal` → `TopBar` → `Header` (logo + menu + botão "Solicitar Cotação") → `OffcanvasMenu` → conteúdo → `Footer`.

Páginas internas começam com `PageHero` (imagem + H1 + `Breadcrumb` "Início » …").

## T1. Home (`/`)

1. `HeroSlider`: 3 banners (Banner-Home-1/2/3.png), todos linkam para Transporte de Medicamentos
2. `ServiceGrid`: eyebrow "Confira" / H2 "Nossas Soluções Especializadas" / 10 cards das sub-soluções de medicamentos
3. `AboutSplit` + `CounterRow`: H2 "Transporte de Medicamentos" / eyebrow "Referência no mercado de transporte" / H2 "Impulsione a eficiência da sua cadeia farmacêutica" / texto / CTA WhatsApp / 4 fotos / 4 contadores
4. `ProcessSteps`: eyebrow "Rápido, auditável e sem surpresas" / H2 "4 Passos para transporte farmacêutico seguro" + vídeo
5. `ContactFormSection`: eyebrow "Atendimento" / H2 "Solicite um Atendimento" / form C
6. `FaqAccordion` (4 perguntas) com coluna lateral: eyebrow "FAQ" / H2 "Perguntas Frequentes" / CTA
7. `WhyUs`: eyebrow "Frota dedicada" / H2 "Somos a escolha certa…" / "Proteção garantida" + "Monitoramento contínuo" / CTA / imagem
8. `Testimonials`: eyebrow "Depoimentos" / H2 "O que nossos clientes dizem" (carrossel, 5 depoimentos)
9. `BlogTeaser`: eyebrow "Blog" / H2 "Últimas Notícias e Artigos" / 3 posts
10. `InfraBlock`: eyebrow "Infraestrutura de ponta…" / H2 "A Teslla investiu em um galpão moderno de mais de 700m²" / CTA "Conheça nossas soluções" / fotos
11. `LogoMarquee`: Polícia Civil, ANVISA, Polícia Federal, IBAMA

## T2. Institucional (Quem Somos, Certificações)

Montada livremente com blocos. Quem Somos:

1. `PageHero` (logistica-inteligente-scaled.png)
2. `AboutIntro`: eyebrow "Sobre Nós" / H2 "Logística Inteligente" + 3 `IconFeature` (Conformidade Regulatória (RDCs), Especialização Farma, Cobertura Nacional & Frota Dedicada) + CTA "Conheça nossas soluções"
3. `StatsList` "Estrutura Operacional" (5 itens) + `Gallery` (8 fotos)
4. `CheckList` "Diferenciais Competitivos" (6 itens)
5. `AboutSplit`: H2 "Liderança na Cadeia Logística de Medicamentos" + CTA + 4 fotos
6. `FaqAccordion` (3)
7. `ProcessSteps` variante "Nossos Pilares" (4: Atendimento de qualidade, Redução de custos, Capilaridade e flexibilidade, Logística tecnológica)
8. `VideoBlock` (video-home.mp4)
9. `TextBlock`: H2 "Transformando o Transporte com Tecnologia e Transparência" + CTA
10. `CtaBanner`

Certificações: `PageHero` → `TextBlock` (eyebrow "Compromisso com a Excelência e a Qualidade" / H2 "Certificações e Qualificações") + `CertificateGallery` (5 certificados, lightbox) → `WhyUs` → `ServiceGrid` (5 sub-soluções) → `CtaInline` ("Entregamos soluções prontas…") → `InfraBlock` → `AboutSplit`.

## T3. Hub de soluções (`/solucoes/`, archive-solucoes.php)

1. `PageHero` "Soluções"
2. `ServiceGrid` variante ícone: eyebrow "Transporte refrigerado, armazenagem controlada e rastreabilidade por lote." / H2 "Soluções em logística" / 5 cards com descrição curta / CTA → /contato
3. `AboutSplit`: eyebrow "Segurança do início ao fim" / H2 "Especialistas em Logística Farmacêutica." + 2 `IconFeature` (Frota e Telemetria, Garantia técnica)
4. `NumberedFeatures`: eyebrow "Excelência em logística farmacêutica" / H2 "Proteção Total para Produtos Sensíveis" / 3 itens numerados (Cadeia de Frio Garantida, Rastreabilidade e Compliance, Veículos preparados)
5. `Testimonials`
6. `CtaBanner`

## T4. Solução (single `solucoes`, nível 1)

**Este é o template mais importante para criar páginas novas.** Terrestre, Aduaneiro, Aéreo e Carga Fracionada seguem exatamente:

1. `PageHero` (thumb-<slug>.png) + H1 + `Breadcrumb` Início » Soluções » <Solução>
2. Layout 2 colunas: `SidebarNav` H3 "Nossas Soluções" (lista das 5 soluções, atual destacada) | conteúdo
3. `ServiceDetail`: H2 (headline longa) + parágrafo + `Blockquote` + 1 a 3 parágrafos + 2 `IconFeature` (frases curtas) + CTA WhatsApp
4. `FaqAccordion`: eyebrow "FAQ" / H2 "Perguntas Frequentes" / 3 perguntas + imagem Perguntas-frequentes-1-scaled.png
5. `CtaBanner` "Precisa de um transporte confiável?"

Campos por página (para CMS): título, slug, thumb, imagem OG, og:description (1 frase), headline H2, intro, citação, corpo, 2 bullets, 3 FAQs.

Transporte de Medicamentos (264) usa a mesma base com blocos extras: `InfraBlock`, `Gallery`, `LogoMarquee`, `ServiceGrid` (10 sub-soluções), `CtaInline`, `WhyUs`, `AboutSplit`. A sidebar lista as 10 sub-soluções.

## T5. Sub-solução (single `solucoes`, filho de Medicamentos)

Exemplo lido: Transporte de Saneantes.

1. `PageHero` (<Nome>-1.png) + H1 + `Breadcrumb` Início » Soluções » Transporte de Medicamentos » <Nome>
2. `SidebarNav` "Nossas Soluções" (10 sub-soluções)
3. `ServiceDetail`: H2 + 4 parágrafos + `Blockquote` + 2 `IconFeature` + CTA
4. `WhyUs`
5. `LogoMarquee`
6. `FaqAccordion` (3)
7. `StatsList` "Estrutura Operacional" (5 itens) + CTA → /contato
8. `Gallery` (9 fotos)
9. `AboutSplit` ("Impulsione a eficiência…")
10. `CtaBanner`

## T6. Blog

**Listagem (`/blog/`, home.php):** H2 "Notícias" + link "Ver todas" (/category/noticias/), busca, select de categoria, grid de cards (data "dd mmm", imagem, título, "Ler Mais"). Sem paginação visível (só 4 posts). Falta H1.

**Post (`/noticias/<slug>/`):**
1. `PageHero` + H1 (título) + Breadcrumb Início » Blog » <título>
2. Meta: "Por" + categoria + data ("10 de set de 2025") + "1 min de leitura"
3. Imagem destacada (1660×900, .webp)
4. Corpo: lead, H2s, listas, CTAs em texto com emoji
5. "Compartilhe:" Facebook, WhatsApp, X, LinkedIn
6. Navegação Anterior / Próximo
7. Sidebar: "Navegue Aqui" (busca), "Categorias" (com contagem), "Últimos Posts" (3, com miniatura)

## T7. Contato e Cotação

**Contato:** `PageHero` → 3 cartões de canal (H3 "Canais de Atendimento", "Atendimento emergencial 24h" + endereço, "Transporte de Medicamentos") → form A sob H2 "Fale com um Especialista" → mapa Google.

**Cotação:** `PageHero` → H2 "Faça sua Cotação com a gente!" → form B → captcha.
