# Clone do site de distribuidora (base: cjkalimentos.com.br)

Site estático que reproduz o visual e o funcionamento de https://cjkalimentos.com.br/:
catálogo com busca e filtros por categoria, páginas de categoria, lista de cotação
salva no navegador e envio da lista pelo WhatsApp.

Não precisa instalar nada: são só arquivos HTML, CSS e JavaScript.

## Como abrir

- Mais simples: dê dois cliques em `index.html` para abrir no navegador.
- Como servidor local (opcional): `python3 -m http.server 8000` nesta pasta e abra http://localhost:8000.
- Para publicar: envie a pasta inteira para qualquer hospedagem de site estático
  (Netlify, Vercel, GitHub Pages, Cloudflare Pages ou a hospedagem atual).

## O que trocar antes de publicar

Tudo fica em dois arquivos:

| Arquivo             | O que tem                                                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config.js`         | Nome da empresa, número do WhatsApp, saudação das mensagens, telefones, e-mail, endereço, Instagram, logo, marcas, segmentos, notícias e as 9 categorias |
| `dados/produtos.js` | Os 83 produtos do catálogo (nome, código, categoria e foto opcional)                                                                                     |

Os dados de marca da CJK (nome, logo, telefones, fotos dos produtos, logos dos
fornecedores e textos institucionais) **não foram copiados**, porque pertencem à CJK.
No lugar ficam valores de exemplo, como "Sua Distribuidora" e o número `5500000000000`.

Fotos: coloque as imagens em `assets/produtos/` e preencha o campo `foto` do produto,
por exemplo `foto: "assets/produtos/acem.webp"`. Sem foto, o cartão mostra o ícone da categoria.

## Páginas

| Arquivo                   | Página original                                                           |
| ------------------------- | ------------------------------------------------------------------------- |
| `index.html`              | `/` (início)                                                              |
| `catalogo.html`           | `/catalogo/` (busca + filtros)                                            |
| `categoria.html?c=bovino` | `/bovino/`, `/frango/`, `/suinos/` etc. (uma página para as 9 categorias) |
| `quem-somos.html`         | `/quem-somos/`                                                            |
| `fornecedores.html`       | `/fornecedores/`                                                          |
| `trabalhe-conosco.html`   | `/trabalhe-conosco/`                                                      |
| `blog.html`               | `/blog/`                                                                  |

## Como funciona por dentro

- `assets/app.js` monta o topo, o rodapé e o conteúdo de cada página a partir de
  `config.js` e `dados/produtos.js`, e liga os comportamentos:
  - **Lista de cotação**: mesma lógica do script original. Guarda `[{slug, nome}]`
    no `localStorage` (chave `lista-cotacao`), atualiza o contador do topo e os botões
    "Adicionar à lista / Na lista", e monta o link `https://wa.me/<número>?text=...`.
    A gaveta fecha com Esc ou clicando fora e prende o foco do teclado enquanto está aberta.
  - **Busca e filtros**: mesma lógica do original (categoria + texto), com uma melhoria:
    a busca ignora acentos, então "file" encontra "Filé".
  - **Abas "Estrutura"** na página inicial, com navegação por setas do teclado.
  - **Menu do celular** e menu suspenso "Produtos".
- `assets/estilo.css` usa as mesmas cores (azul `#006aae`, vermelho `#d31210`),
  fontes (Outfit e Instrument Sans, do Google Fonts) e medidas do original.
- `assets/icones.js` traz os ícones Phosphor (licença MIT) usados no original.

## Mensagens do WhatsApp (iguais às do original)

| Onde                                         | Texto                                                                                                      |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Botão "Fale Conosco"                         | `<saudação>`                                                                                               |
| "Solicitar cotação" em um produto            | `<saudação sem ponto> e gostaria de saber mais sobre cotação de <Produto>.`                                |
| "Solicitar cotação" no topo de uma categoria | `... sobre cotação de <categoria em minúsculas>.`                                                          |
| "Solicitar cotação" no catálogo              | `... sobre uma cotação do catálogo completo.`                                                              |
| Lista de cotação                             | `<saudação>` + linha em branco + `Gostaria de uma cotação dos seguintes produtos:` + `- Produto` por linha |
| Trabalhe Conosco                             | `... e gostaria de me candidatar a uma vaga.`                                                              |
