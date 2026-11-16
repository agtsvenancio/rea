# 06. Design system

Tema escuro único (não há modo claro). Tudo vem de um `@theme` do Tailwind v4; os valores abaixo saíram do CSS compilado ([referencia/site.css](referencia/site.css)). Versão pronta para uso: [tokens.css](tokens.css).

## Cores

| Token | Hex | Uso |
|---|---|---|
| `carbon` | `#080A0B` | fundo da página (`html`, `body`), cards de preço, `theme-color` |
| `graphite` | `#111417` | seções alternadas, rodapé, cards, FAQ |
| `steel` | `#22282D` | card de preço destacado, botões de rede social |
| `off` | `#F3F5F2` | cor do texto (quase branco). Opacidades usadas: 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90 |
| `white` | `#FFFFFF` | títulos `display` |
| `brand` | `#A3C940` | verde-limão da marca: botões, eyebrows, ícones, bordas |
| `brand-bright` | `#C0EF4A` | hover de botões, preços, números, destaque de texto |
| WhatsApp | `#25D366` | só no botão flutuante |

Bordas são sempre branco ou verde com transparência: `border-white/5` (divisórias), `border-white/8` e `/10` (cards), `border-brand/25`–`/60` (destaques).
Sombra-assinatura: `.glow-brand { box-shadow: 0 0 40px -8px #a3c94073 }`.

## Tipografia

| Papel | Fonte | Regras |
|---|---|---|
| Títulos (`.display`) | **Anton** 400 (fallback "Arial Narrow") | sempre caixa alta, `letter-spacing: .01em`, `line-height: .95` |
| Corpo e UI | **Inter Variable** 100–900 (fallback Inter, system-ui) | `-webkit-font-smoothing: antialiased`; pesos usados 500, 600, 700 |

Escala (Tailwind padrão): H1 hero home `clamp(2.75rem,14.5vw,3.75rem)` → `sm:text-7xl` → `md:text-8xl` (6rem); H1 interno `text-4xl sm:text-5xl md:text-6xl`; H2 de seção `text-4xl md:text-5xl`; H3 de card `text-2xl` ou `text-xl`; corpo `text-base`/`text-lg`; legendas `text-sm`/`text-xs`; eyebrows `text-xs`/`text-sm` `tracking-widest uppercase font-semibold`.

## Layout e espaçamento

- Container: `mx-auto max-w-7xl px-4 md:px-6` (1280px). Textos longos `max-w-3xl`; blocos centrados `max-w-4xl`.
- Ritmo vertical de seção: `py-20 md:py-28` (home), `pb-24` no corpo das internas, `py-16` em blocos menores.
- Grades: `gap-5`/`gap-6`; `sm:grid-cols-2 lg:grid-cols-3` para cards; planos `md:grid-cols-3`; modalidade `md:grid-cols-[1.6fr_1fr]`.
- Cabeçalho fixo: o primeiro bloco usa `-mt-16 pt-16` (internas) ou `-mt-24 md:-mt-28` (home) para a foto ficar atrás do header.

## Formas

- Raio: `rounded-3xl` (1.5rem) para cards grandes, `rounded-2xl` (1rem) para itens e FAQ, `rounded-xl` para caixas de logo, `rounded-full` em todos os botões, pílulas e selos.
- Fotos sempre com véu de gradiente `from-carbon` para garantir leitura do texto branco.

## Imagens

- Formato **WebP** em três tamanhos: `/assets/img/` (1800px, original), `/assets/md/*-md.webp` (900px, usado em `srcset`) e `/assets/thumbs/*-thumb.webp` (miniaturas da grade/quiz).
- Nome padrão: `fabrica-academia-itu-{ambiente}-{modalidade}-{nº}.webp` (ex.: `fabrica-academia-itu-sala-de-bike-spinning-026.webp`). Ambientes: `musculacao`, `cross`, `sala-de-bike`, `sala-de-ginastica`, `sala-zen`, `tatame`, `externo`, `parceiro`.
- OG padrão 1200×630: `fabrica-academia-itu-og-home.webp`.

## Movimento

- Entrada de seção: `.reveal` (fade + 24px, 0,7s) disparada por scroll.
- Hero da home: linhas do H1 sobem com `cubic-bezier(.22,1,.36,1)`, brilho que passa no texto verde a cada 5s, professores flutuando 14px em 6s.
- Hover: imagens `scale-105` em 700ms; botões trocam `brand` → `brand-bright`; ícone do FAQ gira 45°.
- `prefers-reduced-motion` desliga o `.reveal`.

## Tom de voz

Direto, próximo e com verbo no imperativo: "Agendar aula grátis", "Bora colocar em prática?", "Vem coisa grande por aí". Títulos curtos e fortes em caixa alta; reforço constante de Itu, estacionamento grátis, 780 aulas e 24 modalidades (SEO local).
