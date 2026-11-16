# 04. Componentes

Classes copiadas do HTML publicado (Tailwind v4). As cores `carbon`, `graphite`, `steel`, `off`, `brand`, `brand-bright` vêm do tema em [tokens.css](tokens.css).

## Tipografia utilitária

| Componente | Classes |
|---|---|
| Título `display` (todo H1/H2/H3 de seção) | `.display` = Anton, caixa alta, `letter-spacing:.01em`, `line-height:.95` + `text-4xl md:text-5xl text-white` (H2 de seção) |
| Eyebrow (rótulo acima do título) | `text-sm font-semibold tracking-widest text-brand uppercase` (em cards: `text-xs … tracking-wider`) |
| Selo/pílula de eyebrow (hero da home) | `inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-brand-bright uppercase` |
| Texto de apoio | `text-lg text-off/75` (hero) · `text-sm leading-relaxed text-off/70` (cards) |

## Botões

| Tipo | Classes |
|---|---|
| Primário grande (hero) | `glow-brand rounded-full bg-brand px-8 py-4 text-base md:text-lg font-bold text-carbon transition hover:bg-brand-bright` |
| Primário médio (header) | `rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-carbon transition hover:bg-brand-bright` |
| Secundário sobre foto | `rounded-full border-2 border-white/25 px-8 py-4 font-bold text-white backdrop-blur-sm hover:border-brand hover:text-brand-bright` |
| Contorno verde (planos) | `rounded-full py-3.5 text-center font-bold border-2 border-brand/60 text-brand hover:border-brand hover:text-brand-bright` |
| Link com seta | `text-sm font-semibold text-brand hover:text-brand-bright` + "→" |
| WhatsApp flutuante | `fixed right-4 bottom-20 md:bottom-6 z-40 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg hover:scale-110` |
| Barra inferior mobile | dois botões `m-2.5 flex-1 rounded-full py-3 text-sm font-bold` (um `bg-brand text-carbon`, outro `border border-brand text-brand`) |

## Blocos

| Componente | Onde | Estrutura |
|---|---|---|
| **Header** | todas | `fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-carbon/85 backdrop-blur-md`; logo, menu `gap-7`, botão primário; menu mobile por `#menu2-toggle` |
| **Header2** | home | igual, com logo central `h-24` e `drop-shadow-[0_0_18px_rgba(163,201,64,0.45)]` e menu dividido |
| **Hero interno** | internas | foto `absolute inset-0 object-cover` + `bg-gradient-to-r from-carbon via-carbon/85 to-carbon/40` + `bg-gradient-to-t from-carbon to-transparent`; conteúdo `py-24 md:py-32` |
| **Card de foto** (modalidade/grupo/estrutura) | home, modalidades, "você também pode gostar" | `group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-3xl`; imagem `group-hover:scale-105 duration-700`; véu `bg-gradient-to-t from-carbon via-carbon/35 to-transparent`; conteúdo `p-5` com rótulo, H3 `display text-2xl`, resumo |
| **Card de preço** | home, planos | `relative flex flex-col rounded-3xl border p-8 border-white/8 bg-carbon`; destacado: `glow-brand border-brand bg-steel md:-my-3 md:py-11` + selo `absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-bold text-carbon uppercase`; preço `display text-5xl text-brand-bright` + `/mês`; lista com check verde |
| **Card de parceiro** | home, planos | `rounded-2xl border border-white/10 bg-graphite p-6`; logo em caixa branca `flex h-20 items-center justify-center rounded-xl bg-white px-5` (img `max-h-10 object-contain`); texto `mt-4 text-sm leading-relaxed text-off/70` |
| **Depoimento** | home | card escuro com 5 estrelas verdes, texto `mt-4 text-sm leading-relaxed text-off/85`, nome `font-semibold text-off/80` |
| **Card de post** | home, blog | `group overflow-hidden rounded-3xl border border-white/8 bg-graphite hover:border-brand/40`; imagem `h-52` com etiqueta `rounded-full bg-carbon/80 … text-brand-bright uppercase backdrop-blur-sm`; `p-6` com data, título e resumo |
| **FAQ** | planos | `<details class="group rounded-2xl border border-white/8 bg-graphite">`; `summary` `flex justify-between p-5 font-semibold`; ícone "+" `text-brand group-open:rotate-45`; resposta `px-5 pb-5 text-sm text-off/70` |
| **Pílula de info** | modalidade (hero) | `rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm` |
| **Item de lista com check** | modalidade, planos | `flex items-start gap-3 rounded-2xl border border-white/8 bg-graphite p-4 text-sm text-off/85` + SVG `M5 13l4 4L19 7` `text-brand` |
| **Destaque de estrutura** | modalidade | `rounded-2xl border border-brand/25 bg-brand/[0.06] p-5 text-sm font-semibold text-off/90` |
| **Card lateral CTA** | modalidade | `<aside class="h-fit rounded-3xl border border-brand/30 bg-graphite p-8 md:sticky md:top-24">` |
| **Faixa de números** | home | 5 colunas, item `p-4 md:p-5 text-center`, rótulo `display text-xl md:text-2xl text-brand` + legenda `mt-1.5 text-xs md:text-sm text-off/60` |
| **Faixa de aviso** | home | `border-y border-brand/25 bg-gradient-to-r from-brand/10 via-brand/[0.04] to-transparent` |
| **Ribbons** | home | duas fitas `bg-brand` rotacionadas com texto `display` repetido em marquee (CSS escopado em [referencia/home-estilos-escopados.css](referencia/home-estilos-escopados.css)) |
| **Grade de horários** | horários | filtros `aria-pressed` (`.filtro-dia`, `.filtro-sala`); itens `article.aula` com `data-dia` e `data-sala`; hora `display text-lg text-brand-bright` |
| **Rodapé** | todas | `border-t border-white/5 bg-graphite`; 4 colunas (marca + redes, Navegue, Horários, Contato) com títulos `display text-lg text-brand`; linha de copyright |

## Comportamentos

- `.reveal`: começa `opacity:0; translateY(24px)` e recebe `.revealed` quando 12% entra na tela (IntersectionObserver). Desligado com `prefers-reduced-motion`.
- Hero da home: `.line-mask/.line-inner` (texto sobe linha a linha), `.hero-anim` (fade + blur com atraso `--d`), `.professor` (entrada e flutuação contínua), `.giant` (palavra de fundo).
- `[data-event]`: clique vira `cta_click` no GTM (ver 02).
