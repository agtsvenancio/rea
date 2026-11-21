# 06. Design system

Extraído do **kit global do Elementor** (`post-44.css`, cópia em [referencia/elementor-kit-global.css](referencia/elementor-kit-global.css)). Variáveis prontas em [tokens.css](tokens.css).

## Cores

| Token Elementor | Hex | Uso |
|---|---|---|
| primary | `#25293D` | títulos, barra superior, banners das páginas internas, hover dos botões |
| secondary | `#0B66FF` | botões, rótulos, ícones, links em hover, números de telefone |
| text | `#777777` | texto corrido |
| accent | `#FFFFFF` | texto dos botões |
| cinza claro | `#F7F7F7` | fundo de seções alternadas e cards |
| quase preto | `#1E1B1B` | |
| amarelo | `#FFD974` | (definido, pouco usado) |
| cinza borda | `#D2D2D2` | bordas de campo |
| branco 20% | `#FFFFFF33` | bordas sobre fundo escuro |
| sombra | `#131E4A36` | sombras dos cards |
| rodapé | `#000060` | fundo do rodapé (definido direto no template, fora do kit) |

## Tipografia

Fontes: **Sora** (títulos, botões) e **Manrope** (texto, rótulos). Na cópia estão em `/assets/google-fonts/`.

| Elemento | Fonte | Tamanho | Peso | Altura de linha | Caixa |
|---|---|---|---|---|---|
| H1 | Sora | 47,78px | 700 | 1.2 | Capitalize |
| H2 | Sora | 39,81px | 700 | 1.3 | Capitalize |
| H3 | Sora | 33,18px | 700 | 1.4 | Capitalize |
| H4 | Sora | 27,65px | 700 | 1.5 | Capitalize |
| H5 | Sora | 23,04px | 700 | 1.6 | Capitalize |
| H6 | Sora | 19,2px | 700 | 1.7 | Capitalize |
| Texto | Manrope | 16px | 500 | 1.8 | |
| Rótulo (secondary) | Manrope | 16px | 800 | 1.8 | Capitalize, sublinhado |
| Botão (accent) | Sora | 14px | 600 | 1.8 | Capitalize |

Escala tipográfica 1.2 (16 × 1,2ⁿ). Atenção: `text-transform: capitalize` nos títulos faz o site mostrar "Tudo O Que Você Precisa" mesmo com o texto digitado em minúsculas; nos arquivos de [conteudo/](conteudo/) o texto está como foi digitado.

## Layout

- Container: 1280px (boxed), padding lateral 20px, seções com 60–100px de padding vertical.
- Breakpoints: celular ≤767, celular extra ≤880, tablet ≤1024, tablet extra ≤1200, laptop ≤1366, widescreen ≥2400.
- Botões com cantos retos (border-radius 0), campos de formulário com borda 1px e cantos retos.
- Animação de entrada `fadeInUp` em quase todos os blocos.
