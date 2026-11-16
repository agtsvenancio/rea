# 01. Sitemap

Base: `https://academiafabrica.com.br`. Fonte: `robots.txt` → `/sitemap-index.xml` → `/sitemap-0.xml` (gerado pelo `@astrojs/sitemap`). **38 URLs**, todas com barra final. O sitemap não traz `lastmod`.

## Árvore

```
/                              Home (template home, cabeçalho alternativo "header2")
├── /estrutura/                Estrutura (interna)
├── /modalidades/              Modalidades, 24 cards agrupados em 6 grupos (interna)
│   ├── /musculacao/  /bodypump/  /gluteos/  /gap/  /abdominal/                  grupo "forca"
│   ├── /cross-training/  /hiit/  /spinning/  /bike-indoor/  /corrida-de-rua/    grupo "cardio"
│   ├── /powerjump/  /step/  /fit-dance/  /zumba/  /ritbox/  /fitball/           grupo "coletivas"
│   ├── /boxe/  /kickboxing/  /jiu-jitsu/                                         grupo "lutas"
│   ├── /hatha-yoga/  /pilates-solo/  /alongamento/                               grupo "corpo-mente"
│   └── /judo-kids/  /cross-kids/                                                 grupo "kids"
├── /horarios/                 Grade de aulas com filtro por dia e sala (interna + JS)
├── /planos/                   Planos, parcerias e FAQ (interna)
├── /blog/                     Lista de posts (interna)
│   ├── /melhor-academia-em-itu/
│   ├── /musculacao-em-itu-como-comecar/
│   ├── /spinning-beneficios/
│   └── /cross-training-treino-completo/
├── /contato/                  Endereço, horários de atendimento, redes (interna)
├── /aula-gratis/              Landing de aula experimental (tela cheia)
├── /quiz/                     Quiz "Descubra sua modalidade" (tela cheia + JS)
└── /privacidade/              Política de privacidade / LGPD (interna, texto longo)
```

Âncoras usadas no menu e na home: `/modalidades#forca`, `#cardio`, `#coletivas`, `#lutas`, `#corpo-mente`, `#kids`; `/#planos` (seção de planos na home).

## Páginas

| URL | Title | Template |
|---|---|---|
| / | Fábrica Academia \| Academia completa em Itu/SP | home |
| /estrutura/ | Estrutura da Fábrica Academia em Itu | interna |
| /modalidades/ | Modalidades \| Fábrica Academia Itu | interna |
| /modalidades/{slug}/ (24) | {Nome} em Itu \| Fábrica Academia | modalidade |
| /horarios/ | Horários das aulas \| Fábrica Academia Itu | interna |
| /planos/ | Planos e preços \| Fábrica Academia Itu | interna |
| /blog/ | Blog \| Fábrica Academia Itu | interna |
| /blog/{slug}/ (4) | {Título do post} \| Fábrica Academia | post |
| /contato/ | Contato e localização \| Fábrica Academia Itu | interna |
| /aula-gratis/ | Aula grátis \| Fábrica Academia Itu | tela cheia |
| /quiz/ | Descubra sua modalidade \| Fábrica Academia Itu | tela cheia |
| /privacidade/ | Política de privacidade \| Fábrica Academia | interna |

Lista completa com description, H1 e og:image por URL: [sitemap.json](sitemap.json).

## Posts do blog

| Data | Categoria (rótulo) | URL |
|---|---|---|
| 10/07/2026 | Treino para iniciantes | /blog/melhor-academia-em-itu/ |
| 05/07/2026 | Musculação | /blog/musculacao-em-itu-como-comecar/ |
| 28/06/2026 | Cardio e performance | /blog/spinning-beneficios/ |
| 20/06/2026 | Treino funcional | /blog/cross-training-treino-completo/ |

## Navegação

- **Menu (todas as páginas):** Início, Estrutura, Modalidades, Horários, Planos, Blog, Contato + botão "Agendar aula grátis" (WhatsApp).
- **Home:** cabeçalho "header2", logo centralizado e menu dividido (Início/Estrutura/Modalidades/Horários à esquerda, Planos/Blog/Contato à direita).
- **Rodapé:** Navegue (Modalidades, Planos, Estrutura, Descubra sua modalidade = /quiz, Blog, Política de privacidade), Horários de funcionamento, Contato.
- **Mobile:** barra fixa inferior com "Agendar aula grátis" + "Ver planos" e botão flutuante do WhatsApp.
