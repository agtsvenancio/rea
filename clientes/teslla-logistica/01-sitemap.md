# 01. Sitemap

Base: `https://tesllalogistica.com.br`. Fonte: menus do site + API REST (`/wp-json/wp/v2/pages`, `/posts`, `/solucoes`).

## Árvore

```
/                                   Home (page 9)
├── /quem-somos/                    Quem Somos (page 12)
├── /solucoes/                      Soluções (page 262, template archive-solucoes.php)
│   ├── /transporte-de-medicamentos/            (CPT solucoes 264, pai das 10 abaixo)
│   │   ├── /transporte-de-produtos-para-saude/       (484)
│   │   ├── /transporte-de-saneantes/                  (id não lido)
│   │   ├── /transporte-de-suplementos-alimentares/    (id não lido)
│   │   ├── /transporte-de-vacinas/                    (id não lido)
│   │   ├── /transporte-de-correlatos/                 (511)
│   │   ├── /transporte-de-dermo-cosmeticos/           (508)
│   │   ├── /transporte-de-insumos-farmaceuticos/      (501)
│   │   ├── /transporte-de-medicamentos-comuns/        (499)
│   │   ├── /transporte-de-medicamentos-de-controle-especial/ (489)
│   │   └── /transporte-de-produtos-de-nutricao/       (537)
│   ├── /transporte-terrestre/
│   ├── /transporte-aduaneiro/
│   ├── /transporte-aereo/
│   └── /carga-fracionada/
├── /blog/                          Blog (page 16, template home.php, página de posts)
│   └── posts em /noticias/<slug>/  (categoria "Notícias", id 5)
├── /cotacao/                       Cotação (page 353)
├── /certificacoes/                 Certificações (page 358)
├── /contato/                       Contato (page 18)
└── /sample-page/                   Sample Page (page 2), lixo da instalação, remover
```

URLs auxiliares: `/category/noticias/` (arquivo da categoria), `/archive-solucoes/` (usado no breadcrumb, deveria ser `/solucoes/`).

## Páginas (post type `page`)

| ID | Título | URL | Template | Modificada |
|---|---|---|---|---|
| 9 | Home | / | padrão (front page) | 2025-09-25 |
| 12 | Quem Somos | /quem-somos/ | padrão | 2025-09-25 |
| 262 | Soluções | /solucoes/ | archive-solucoes.php | 2025-09-17 |
| 16 | Blog | /blog/ | home.php | 2025-09-09 |
| 353 | Cotação | /cotacao/ | padrão | 2025-09-10 |
| 358 | Certificações | /certificacoes/ | padrão | 2025-09-25 |
| 18 | Contato | /contato/ | padrão | 2025-09-17 |
| 2 | Sample Page | /sample-page/ | padrão | 2025-09-04 |

## Soluções (CPT `solucoes`, hierárquico, sem taxonomia)

| ID | Título | URL | Pai |
|---|---|---|---|
| 264 | Transporte de Medicamentos | /solucoes/transporte-de-medicamentos/ | raiz |
| ? | Transporte Terrestre | /solucoes/transporte-terrestre/ | raiz |
| ? | Transporte Aduaneiro | /solucoes/transporte-aduaneiro/ | raiz |
| ? | Transporte Aéreo | /solucoes/transporte-aereo/ | raiz |
| ? | Carga Fracionada | /solucoes/carga-fracionada/ | raiz |
| 484 | Transporte de Produtos para Saúde | .../transporte-de-produtos-para-saude/ | 264 |
| 489 | Transporte de Medicamentos de Controle Especial | .../transporte-de-medicamentos-de-controle-especial/ | 264 |
| 499 | Transporte de Medicamentos Comuns | .../transporte-de-medicamentos-comuns/ | 264 |
| 501 | Transporte de Insumos Farmacêuticos | .../transporte-de-insumos-farmaceuticos/ | 264 |
| 508 | Transporte de Dermo Cosméticos | .../transporte-de-dermo-cosmeticos/ | 264 |
| 511 | Transporte de Correlatos | .../transporte-de-correlatos/ | 264 |
| 537 | Transporte de Produtos de Nutrição | .../transporte-de-produtos-de-nutricao/ | 264 |
| ? | Transporte de Saneantes | .../transporte-de-saneantes/ | 264 |
| ? | Transporte de Suplementos Alimentares | .../transporte-de-suplementos-alimentares/ | 264 |
| ? | Transporte de Vacinas | .../transporte-de-vacinas/ | 264 |

Link citado em post mas sem página confirmada: `/solucoes/transporte-aereo/aereo-expresso/` (aponta para o domínio de staging, ver 07).

## Posts (categoria Notícias)

| ID | Data | Título | URL |
|---|---|---|---|
| 349 | 2025-09-10 | Aéreo Expresso: Transporte Rápido para Cargas Urgentes | /noticias/aereo-expresso-transporte-rapido-para-cargas-urgentes/ |
| 344 | 2025-09-09 | Motofrete e Coletas Expressas: Agilidade e Segurança no Atendimento Urbano | /noticias/motofrete-e-coletas-expressas-agilidade-e-seguranca-no-atendimento-urbano/ |
| 341 | 2025-09-09 | Conheça o Novo Site da Teslla: Mais Moderno, Ágil e Feito para Você! | /noticias/conheca-o-novo-site-da-teslla-mais-moderno-agil-e-feito-para-voce/ |
| 338 | 2025-09-09 | Distribuição Nacional: Transporte Rápido e Seguro para Todo o Brasil | /noticias/distribuicao-nacional-transporte-rapido-e-seguro-para-todo-o-brasil/ |

Autor dos posts (meta): `taciara.furtado`.

## Menus

**Principal (header e off-canvas mobile):** Home · Quem Somos · Soluções ▾ (Transporte de Medicamentos, Transporte Terrestre, Transporte Aduaneiro, Transporte Aéreo, Carga Fracionada) · Blog · Cotação · Certificações · Contato

**Rodapé, "Institucional":** Quem Somos, Nossas Soluções, Blog, Certificações, Cotação, Contato
**Rodapé, "Nossas Soluções":** Carga Fracionada, Transporte Aduaneiro, Transporte Aéreo, Transporte de Medicamentos, Transporte Terrestre
**Rodapé, legal:** Política de Privacidade (`#`), Páginas Geolocalizadas (`#`), os dois sem página.

## Redirecionamentos a preservar na migração

Manter os mesmos slugs evita 301. Se a nova estrutura mudar, mapear pelo menos: as 15 URLs de `/solucoes/...`, as 4 de `/noticias/...`, `/category/noticias/`, `/archive-solucoes/` → `/solucoes/`, e remover `/sample-page/` (410 ou 301 para `/`).
