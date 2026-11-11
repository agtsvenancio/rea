# 04. Inventário de componentes

Padrão de título de seção usado no site inteiro (`SectionTitle`): **eyebrow** em H4 (frase curta, normalmente com ícone/forma decorativa) + **título** em H2. Ex.: "Confira" / "Nossas Soluções Especializadas".

Botão padrão (`Button`): rótulo "Fale com um Especialista", destino WhatsApp comercial. Variantes de rótulo: "Conheça nossas soluções", "Solicitar Cotação", "Iniciar a conversa", "Ler Mais", "Transporte de Medicamentos".

| Componente | Onde aparece | Conteúdo / props | Assets |
|---|---|---|---|
| `TopBar` | global | 2 telefones, link "Atendimento Emergencial 24h", Instagram, LinkedIn | |
| `Header` | global | logo, menu com dropdown Soluções, botão "Solicitar Cotação" | logo.png |
| `OffcanvasMenu` | global mobile | título "Menu", mesmo menu | |
| `WhatsAppLeadModal` | global | form A (ver 02) | |
| `QuoteModal` | global | form B, fechar "×" | |
| `Footer` | global | logo, tagline "Sua logística com eficiência em todos os cantos do Brasil.", sociais, 2 colunas de links, copyright, links legais | logo-300x80.png |
| `PageHero` | internas | imagem, H1, breadcrumb | thumb-*.png / banners |
| `Breadcrumb` | internas | Início » … (Yoast) | |
| `HeroSlider` | home | slides {imagem, link, título} | Banner-Home-1..3.png, slider-shape-1.png |
| `ServiceGrid` | home, hub, certificações, medicamentos | eyebrow, título, cards {título, link, descrição?, ícone?} | feature-icon-2.png, service-shape-1.png |
| `AboutSplit` | home, quem somos, sub-soluções | eyebrow, título, texto, CTA, 2 a 4 fotos | WhatsApp-Image-*.jpeg, image14/15.jpg |
| `CounterRow` | home | {valor, sufixo (K, +, M), rótulo} x4 | counter-1..4.png |
| `ProcessSteps` | home, quem somos | eyebrow, título, passos {nº, título, texto} x4, vídeo opcional | process-icon-1..4.png |
| `FaqAccordion` | quase todas | eyebrow "FAQ", título "Perguntas Frequentes", itens {pergunta, resposta}, imagem/CTA lateral | Perguntas-frequentes-1-scaled.png, faq-shape.png |
| `WhyUs` | home, certificações, medicamentos, sub-soluções | eyebrow "Frota dedicada", título "Somos a escolha certa…", itens {título, texto} x2, CTA, imagem | content-1.png, Somos-a-Escolha-certa.png |
| `Testimonials` | home, hub | carrossel {texto, nome, cidade/UF} | quote.png |
| `BlogTeaser` | home | 3 últimos posts {data, imagem, título, link} | |
| `InfraBlock` | home, certificações, medicamentos | eyebrow, título "galpão de 700m²", 2 parágrafos, CTA, 2 fotos | |
| `LogoMarquee` | home, medicamentos, sub-soluções | logos em loop | policia-civil-scaled.png, anvisa.png, policia-federal.png, ibama.jpg |
| `IconFeature` | várias | ícone + título curto (+ texto) | service-details-icon-1/3.png, about-icon-4/5.png, *.svg |
| `NumberedFeatures` | hub | {nº, título, texto} x3 | outsport-icon-1.png |
| `StatsList` | quem somos, sub-soluções | título "Estrutura Operacional", 5 itens | counter-4.png |
| `CheckList` | quem somos | título, itens com ícone check | service-details-icon-3.png |
| `SidebarNav` | soluções | H3 "Nossas Soluções", links, item atual | |
| `ServiceDetail` | soluções | H2, parágrafos, blockquote, 2 bullets, CTA | content-shape.png |
| `Gallery` | várias | fotos com lightbox | WhatsApp-Image-2025-09-*.jpeg |
| `CertificateGallery` | certificações | 5 certificados com lightbox | Cerificado-01..06-1024x1024-1.jpg |
| `CtaInline` | certificações, medicamentos | eyebrow, H3, botão | |
| `CtaBanner` | final das internas | H2 "Precisa de um transporte confiável?", botão | cta-shape.png |
| `VideoBlock` | home, quem somos | mp4 | solicite-um-atendimento.mp4, video-home.mp4 |
| `ContactCards` | contato | 3 cartões de canal | |
| `MapEmbed` | contato | Google Maps | |
| `BlogCard`, `BlogSidebar`, `ShareButtons`, `PostNav` | blog | ver 03 / T6 | |

## Conteúdo reutilizável (copiar igual nas novas páginas)

- **Estrutura Operacional (5 itens):** 700 m² de área climatizada · Câmara fria 2º a 8º para medicamentos termossensíveis · Gestão de estoque e torre de controle · Operação personalizada, planejada sob medida para cada demanda · Cobertura completa em todas as regiões de São Paulo, com hubs expandidos em todo o Brasil.
- **Diferenciais Competitivos (6):** rastreamento em tempo real de todas as cargas; experiência consolidada em farma; apoio operacional a startups e empresas de delivery; contratos flexíveis (recorrentes ou emergenciais); frota diversificada; suporte à expansão de clientes e parceiros. *(resumo)*
- **Conformidade:** RDC 430/2020 e RDC 653/2022, com Responsável Técnico farmacêutico.
- **Órgãos/logos:** Polícia Civil, ANVISA, Polícia Federal, IBAMA.
- **Depoimentos (nome, cidade):** Ana Paula Costa (Curitiba/PR), Fernando Oliveira (Salvador/BA), Carlos Eduardo Silva (São Paulo/SP), Marina Santos (Rio de Janeiro/RJ), Roberto Fernandes (Belo Horizonte/MG).
- **4 Passos:** Envie ficha técnica com detalhes · Validação e plano técnico · Coleta com frota dedicada · Monitoramento e relatório por remessa.
- **Nossos Pilares:** Atendimento de qualidade · Redução de custos · Capilaridade e flexibilidade · Logística tecnológica.
