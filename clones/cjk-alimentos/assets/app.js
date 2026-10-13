// Monta as páginas do site a partir de config.js e dados/produtos.js
// e liga o comportamento: lista de cotação, busca, filtros, abas e menu.
(function () {
  "use strict";

  const S = window.SITE;
  const CATS = window.CATEGORIAS;
  const PRODUTOS = window.PRODUTOS;
  const ICONES = window.ICONES;

  // ---------------------------------------------------------------
  // Utilitários
  // ---------------------------------------------------------------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }

  function icone(nome, classe) {
    return (
      '<svg class="ic ' +
      (classe || "") +
      '" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">' +
      (ICONES[nome] || "") +
      "</svg>"
    );
  }

  // Texto sem acento e em minúsculas, para a busca encontrar "file" em "Filé".
  function normalizar(s) {
    return String(s)
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();
  }

  function categoria(slug) {
    return CATS.filter(function (c) {
      return c.slug === slug;
    })[0];
  }

  // ---------------------------------------------------------------
  // Mensagens do WhatsApp (mesmos textos do site original)
  // ---------------------------------------------------------------
  const saudacaoBase = S.saudacao.replace(/[.!]\s*$/, "");

  function linkWhats(texto) {
    return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(texto);
  }
  const MSG = {
    geral: function () {
      return S.saudacao;
    },
    produto: function (nome) {
      return (
        saudacaoBase +
        " e gostaria de saber mais sobre cotação de " +
        nome +
        "."
      );
    },
    catalogo: function () {
      return (
        saudacaoBase +
        " e gostaria de saber mais sobre uma cotação do catálogo completo."
      );
    },
    vaga: function () {
      return saudacaoBase + " e gostaria de me candidatar a uma vaga.";
    },
  };

  // ---------------------------------------------------------------
  // Partes comuns: topo, rodapé e gaveta da lista
  // ---------------------------------------------------------------
  const MENU = [
    ["Home", "index.html", "inicio"],
    ["Quem Somos", "quem-somos.html", "quem-somos"],
    ["Fornecedores", "fornecedores.html", "fornecedores"],
    ["Catálogo", "catalogo.html", "catalogo"],
    ["Blog", "blog.html", "blog"],
    ["Trabalhe Conosco", "trabalhe-conosco.html", "trabalhe-conosco"],
  ];

  function logo() {
    if (S.logo)
      return (
        '<img src="' +
        esc(S.logo) +
        '" alt="' +
        esc(S.nome) +
        '" class="logo-img">'
      );
    return '<span class="logo-texto">' + esc(S.nome) + "</span>";
  }

  function linkCategoria(c) {
    return "categoria.html?c=" + encodeURIComponent(c.slug);
  }

  function botaoLista(extra) {
    return (
      '<button type="button" class="btn-icone ' +
      (extra || "") +
      '" data-lista-trigger aria-label="Abrir lista de cotação">' +
      icone("list-checks") +
      '<span class="badge" data-lista-count hidden>0</span></button>'
    );
  }

  function topo(ativa) {
    const links = MENU.map(function (m) {
      return (
        '<a href="' +
        m[1] +
        '"' +
        (m[2] === ativa ? ' aria-current="page"' : "") +
        ">" +
        m[0] +
        "</a>"
      );
    }).join("");
    const cats = CATS.map(function (c) {
      return (
        '<li><a href="' +
        linkCategoria(c) +
        '">' +
        icone(c.icone) +
        esc(c.nome) +
        "</a></li>"
      );
    }).join("");
    const catsMobile = CATS.map(function (c) {
      return '<a href="' + linkCategoria(c) + '">' + esc(c.nome) + "</a>";
    }).join("");
    return (
      '<a class="pular" href="#conteudo">Pular para o conteúdo</a>' +
      '<header class="topo"><div class="container topo-linha">' +
      '<a href="index.html" class="logo" aria-label="' +
      esc(S.nome) +
      ' - início">' +
      logo() +
      "</a>" +
      '<nav class="menu" aria-label="Principal">' +
      links +
      '<details class="dropdown"><summary>Produtos ' +
      icone("caret-down", "pequeno") +
      "</summary><ul>" +
      cats +
      "</ul></details></nav>" +
      '<div class="topo-acoes">' +
      '<a class="btn-icone so-desktop" href="' +
      esc(S.instagram) +
      '" target="_blank" rel="noopener" aria-label="Instagram">' +
      icone("instagram-logo") +
      "</a>" +
      botaoLista() +
      '<a class="btn btn-whats so-desktop" href="' +
      linkWhats(MSG.geral()) +
      '" target="_blank" rel="noopener">' +
      icone("whatsapp-logo") +
      "Fale Conosco</a>" +
      '<button type="button" class="btn-icone so-mobile" data-menu-mobile aria-expanded="false" aria-controls="menu-mobile" aria-label="Abrir menu">' +
      icone("list") +
      "</button>" +
      "</div></div>" +
      '<nav id="menu-mobile" class="menu-mobile" aria-label="Principal" hidden><div class="container">' +
      links +
      '<p class="rotulo">Produtos</p><div class="menu-mobile-cats">' +
      catsMobile +
      "</div>" +
      '<a class="btn btn-whats" href="' +
      linkWhats(MSG.geral()) +
      '" target="_blank" rel="noopener">' +
      icone("whatsapp-logo") +
      "Fale Conosco</a>" +
      "</div></nav></header>"
    );
  }

  function rodape() {
    return (
      '<footer class="rodape"><div class="container rodape-grade">' +
      '<div><a href="index.html" class="logo logo-claro">' +
      logo() +
      "</a>" +
      '<p class="rodape-frase">Distribuindo qualidade para o seu negócio alimentar.</p>' +
      '<a class="btn-icone claro" href="' +
      esc(S.instagram) +
      '" target="_blank" rel="noopener" aria-label="Instagram">' +
      icone("instagram-logo") +
      "</a></div>" +
      '<nav aria-label="Institucional"><p class="rotulo">Institucional</p><ul>' +
      MENU.filter(function (m) {
        return m[2] !== "catalogo";
      })
        .map(function (m) {
          return '<li><a href="' + m[1] + '">' + m[0] + "</a></li>";
        })
        .join("") +
      "</ul></nav>" +
      '<nav aria-label="Produtos"><p class="rotulo">Produtos</p><ul><li><a href="catalogo.html">Catálogo de Produtos</a></li>' +
      CATS.map(function (c) {
        return (
          '<li><a href="' + linkCategoria(c) + '">' + esc(c.nome) + "</a></li>"
        );
      }).join("") +
      "</ul></nav>" +
      '<div><p class="rotulo">Contato</p><ul class="contato">' +
      '<li><a href="' +
      linkWhats(MSG.geral()) +
      '" target="_blank" rel="noopener">' +
      icone("whatsapp-logo") +
      esc(S.telefoneWhatsappTexto) +
      "</a></li>" +
      '<li><a href="tel:' +
      esc(S.telefoneFixo) +
      '">' +
      icone("phone") +
      esc(S.telefoneFixoTexto) +
      "</a></li>" +
      '<li><a href="mailto:' +
      esc(S.email) +
      '">' +
      icone("envelope-simple") +
      esc(S.email) +
      "</a></li>" +
      "<li>" +
      icone("map-pin") +
      "<span>" +
      esc(S.endereco) +
      "</span></li></ul></div>" +
      '</div><div class="container rodape-base"><p>© ' +
      new Date().getFullYear() +
      " " +
      esc(S.nome) +
      ". Todos os direitos reservados.</p></div></footer>" +
      gaveta()
    );
  }

  function gaveta() {
    return (
      '<div data-lista-root data-open="false" class="gaveta hidden" role="dialog" aria-modal="true" aria-labelledby="lista-titulo">' +
      '<div class="gaveta-fundo" data-lista-overlay></div>' +
      '<aside class="gaveta-painel">' +
      '<header class="gaveta-topo"><div><h2 id="lista-titulo">Sua lista de cotação</h2>' +
      '<p class="texto-suave">Monte a lista e envie tudo de uma vez.</p></div>' +
      '<button type="button" class="btn-icone" data-lista-close aria-label="Fechar lista">' +
      icone("x") +
      "</button></header>" +
      '<div class="gaveta-corpo">' +
      '<div data-lista-empty class="gaveta-vazia">' +
      icone("list-plus", "grande") +
      '<p class="forte">Sua lista está vazia</p><p class="texto-suave">Adicione produtos pelo catálogo e peça a cotação de tudo de uma vez pelo WhatsApp.</p>' +
      '<a href="catalogo.html" class="btn btn-contorno">Ver catálogo</a></div>' +
      '<ul data-lista-items class="gaveta-itens" hidden></ul></div>' +
      '<footer data-lista-footer class="gaveta-rodape" hidden>' +
      '<a data-lista-enviar href="#" target="_blank" rel="noopener" class="btn btn-whats largo">' +
      icone("whatsapp-logo") +
      "Fazer cotação pelo WhatsApp</a>" +
      '<button type="button" data-lista-clear class="btn-link">Limpar lista</button></footer>' +
      "</aside></div>"
    );
  }

  // ---------------------------------------------------------------
  // Blocos reutilizados nas páginas
  // ---------------------------------------------------------------
  function cartaoProduto(p) {
    const c = categoria(p.categoria) || { nome: p.categoria, icone: "package" };
    const foto = p.foto
      ? '<img src="' +
        esc(p.foto) +
        '" alt="' +
        esc(p.nome) +
        '" loading="lazy" width="300" height="300">'
      : '<div class="foto-vazia" role="img" aria-label="' +
        esc(p.nome) +
        '">' +
        icone(c.icone) +
        "</div>";
    return (
      '<div data-produto data-categoria="' +
      esc(p.categoria) +
      '" data-nome="' +
      esc(normalizar(p.nome)) +
      '">' +
      '<article class="cartao produto">' +
      '<div class="produto-foto">' +
      foto +
      "</div>" +
      '<div class="produto-corpo"><span class="sobretitulo">' +
      esc(c.nome) +
      "</span>" +
      "<h3>" +
      esc(p.nome) +
      "</h3>" +
      '<div class="produto-acoes">' +
      '<a class="btn btn-whats pequeno" href="' +
      linkWhats(MSG.produto(p.nome)) +
      '" target="_blank" rel="noopener">' +
      icone("whatsapp-logo") +
      "Solicitar cotação</a>" +
      '<button type="button" class="btn btn-contorno pequeno btn-lista" data-lista-toggle data-slug="' +
      esc(p.slug) +
      '" data-nome="' +
      esc(p.nome) +
      '" aria-pressed="false">' +
      icone("bookmark-simple", "fora-lista") +
      icone("check", "na-lista") +
      '<span class="fora-lista">Adicionar à lista</span><span class="na-lista">Na lista</span></button>' +
      "</div></div></article></div>"
    );
  }

  function trilha(itens) {
    return (
      '<nav aria-label="Trilha" class="trilha"><ol>' +
      itens
        .map(function (i, n) {
          return n < itens.length - 1
            ? '<li><a href="' + i[1] + '">' + esc(i[0]) + "</a></li>"
            : '<li aria-current="page">' + esc(i[0]) + "</li>";
        })
        .join("") +
      "</ol></nav>"
    );
  }

  function bannerCatalogo(titulo, texto, iconeNome, msg, crumbs) {
    return (
      '<section class="container"><div class="banner">' +
      trilha(crumbs) +
      '<div class="banner-titulo"><span class="banner-icone">' +
      icone(iconeNome) +
      "</span><h1>" +
      esc(titulo) +
      "</h1></div>" +
      '<p class="banner-texto">' +
      texto +
      "</p>" +
      '<div class="botoes"><a class="btn btn-whats" href="' +
      linkWhats(msg) +
      '" target="_blank" rel="noopener">' +
      icone("whatsapp-logo") +
      "Solicitar cotação</a>" +
      '<a class="btn btn-vidro" href="' +
      linkWhats(MSG.geral()) +
      '" target="_blank" rel="noopener">Falar no WhatsApp</a></div></div></section>'
    );
  }

  function cabecalhoInterno(sobre, titulo, texto) {
    return (
      '<section class="cabecalho-interno"><div class="container">' +
      '<p class="sobretitulo traco claro">' +
      esc(sobre) +
      "</p><h1>" +
      esc(titulo) +
      "</h1>" +
      (texto ? '<p class="cabecalho-texto">' + esc(texto) + "</p>" : "") +
      "</div></section>"
    );
  }

  function gradeCategorias() {
    return (
      '<ul class="grade-categorias">' +
      CATS.map(function (c) {
        return (
          '<li><a class="cartao categoria" href="' +
          linkCategoria(c) +
          '"><span class="icone-caixa">' +
          icone(c.icone) +
          "</span>" +
          esc(c.nome) +
          "</a></li>"
        );
      }).join("") +
      "</ul>"
    );
  }

  function dataBR(iso) {
    const d = new Date(iso + "T12:00:00");
    return isNaN(d)
      ? iso
      : d.toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  }

  function listaNoticias(qtd) {
    const itens = S.noticias.slice(0, qtd || S.noticias.length);
    return (
      '<ul class="grade-noticias">' +
      itens
        .map(function (n) {
          return (
            '<li class="cartao noticia"><p class="noticia-data">' +
            icone("calendar-blank") +
            '<time datetime="' +
            esc(n.data) +
            '">' +
            esc(dataBR(n.data)) +
            "</time></p>" +
            '<p class="etiquetas"><span>Notícias</span><span>Treinamento</span></p><h3>' +
            esc(n.titulo) +
            '</h3><p class="texto-suave">' +
            esc(n.resumo) +
            "</p></li>"
          );
        })
        .join("") +
      "</ul>"
    );
  }

  // ---------------------------------------------------------------
  // Páginas
  // ---------------------------------------------------------------
  const anos = new Date().getFullYear() - S.desde;
  const totalProdutos = PRODUTOS.length;

  const PAGINAS = {
    inicio: function () {
      const pilares = [
        [
          "frota",
          "Frota refrigerada",
          "truck",
          "Caminhões refrigerados levam os produtos até supermercados, restaurantes e cozinhas industriais da região. A entrega eficiente é parte do nosso compromisso com quem depende do abastecimento no tempo certo.",
        ],
        [
          "cd",
          "Centro de distribuição",
          "warehouse",
          "Nossa base concentra recebimento, armazenagem e expedição de todos os itens do catálogo, com organização para atender cada pedido.",
        ],
        [
          "frio",
          "Cadeia do frio",
          "snowflake",
          "Congelados e resfriados exigem cuidado em cada etapa. Mantemos a temperatura adequada do armazém à entrega, para que a qualidade chegue intacta.",
        ],
        [
          "equipe",
          "Equipe",
          "users-three",
          "Colaboradores uniformizados e em constante capacitação garantem organização na expedição e no atendimento.",
        ],
      ];
      return (
        '<section class="hero"><div class="container hero-conteudo">' +
        '<p class="sobretitulo traco claro">Distribuidora de alimentos em ' +
        esc(S.cidade) +
        "</p>" +
        "<h1>Alimentos de qualidade, entregues com <em>eficiência</em></h1>" +
        '<p class="hero-texto">Congelados e resfriados para supermercados, restaurantes e cozinhas industriais de ' +
        esc(S.cidade) +
        " e região desde " +
        S.desde +
        ".</p>" +
        '<div class="botoes"><a class="btn btn-whats grande" href="' +
        linkWhats(MSG.geral()) +
        '" target="_blank" rel="noopener">' +
        icone("whatsapp-logo") +
        "Fale Conosco</a>" +
        '<a class="btn btn-vidro grande" href="#categorias">Ver produtos ' +
        icone("arrow-down") +
        "</a></div>" +
        '<ul class="selos"><li>' +
        icone("seal-check") +
        "Qualidade garantida</li><li>" +
        icone("snowflake") +
        "Cadeia do frio</li><li>" +
        icone("truck") +
        "Entrega eficiente</li></ul>" +
        "</div></section>" +
        '<section class="container"><ul class="numeros cartao">' +
        [
          ["calendar-blank", "Desde " + S.desde, "no mercado"],
          ["package", "+" + totalProdutos, "produtos no catálogo"],
          ["handshake", String(S.fornecedores.length), "marcas parceiras"],
          ["buildings", String(S.segmentos.length), "segmentos atendidos"],
        ]
          .map(function (n) {
            return (
              '<li><span class="icone-caixa">' +
              icone(n[0]) +
              "</span><div><strong>" +
              esc(n[1]) +
              "</strong><span>" +
              esc(n[2]) +
              "</span></div></li>"
            );
          })
          .join("") +
        "</ul></section>" +
        '<section id="categorias" class="secao container"><p class="sobretitulo traco">Catálogo</p><h2>Nossos produtos</h2>' +
        '<p class="secao-texto">Mais de ' +
        totalProdutos +
        " itens congelados e resfriados, organizados em " +
        CATS.length +
        " categorias.</p>" +
        gradeCategorias() +
        "</section>" +
        '<section class="secao fundo-branco"><div class="container sobre">' +
        "<div><h2>Sobre a " +
        esc(S.nome) +
        "</h2><p>A " +
        esc(S.nome) +
        " distribui os melhores sabores para que cheguem com eficácia até a sua mesa. São mais de " +
        totalProdutos +
        " itens entre frangos, suínos, bovinos, pescados, laticínios e embutidos.</p>" +
        "<p>Trabalhamos com marcas confiáveis e uma logística pensada para atender o segmento alimentício da região com qualidade e pontualidade.</p>" +
        '<a class="link-seta" href="quem-somos.html">Conheça a nossa história ' +
        icone("arrow-right") +
        "</a></div>" +
        '<ul class="destaques"><li><strong>' +
        anos +
        "+</strong><span>anos distribuindo alimentos</span></li><li><strong>+" +
        totalProdutos +
        "</strong><span>produtos no catálogo</span></li><li><strong>" +
        S.segmentos.length +
        "</strong><span>segmentos atendidos</span></li></ul>" +
        "</div></section>" +
        '<section class="estrutura"><div class="container" data-estrutura-tabs>' +
        '<p class="sobretitulo traco claro">Operação</p><h2>Estrutura pensada<br>para entregar no prazo</h2>' +
        '<p class="estrutura-texto">Desde ' +
        S.desde +
        ", reunimos frota refrigerada, centro de distribuição e equipe preparada para abastecer o food service da região com segurança e pontualidade.</p>" +
        '<div role="tablist" aria-label="Nossa estrutura" class="abas">' +
        pilares
          .map(function (p, i) {
            return (
              '<button type="button" role="tab" id="tab-' +
              p[0] +
              '" aria-controls="panel-' +
              p[0] +
              '" aria-selected="' +
              (i === 0) +
              '" tabindex="' +
              (i === 0 ? 0 : -1) +
              '" data-pilar="' +
              p[0] +
              '" class="aba' +
              (i === 0 ? " is-active" : "") +
              '">' +
              icone(p[2]) +
              esc(p[1]) +
              "</button>"
            );
          })
          .join("") +
        "</div>" +
        pilares
          .map(function (p, i) {
            return (
              '<div role="tabpanel" id="panel-' +
              p[0] +
              '" aria-labelledby="tab-' +
              p[0] +
              '" class="painel"' +
              (i === 0 ? "" : " hidden") +
              "><p>" +
              esc(p[3]) +
              "</p></div>"
            );
          })
          .join("") +
        '<a class="btn btn-vidro" href="catalogo.html">Ver produtos ' +
        icone("arrow-right") +
        "</a></div></section>" +
        '<section class="secao container"><h2>Atendemos o seu negócio</h2><p class="secao-texto">Do supermercado à churrascaria, entregamos com pontualidade na região.</p>' +
        '<ul class="grade-segmentos">' +
        S.segmentos
          .map(function (s) {
            return (
              '<li class="cartao segmento"><span class="icone-caixa">' +
              icone(s.icone) +
              "</span>" +
              esc(s.nome) +
              "</li>"
            );
          })
          .join("") +
        "</ul></section>" +
        '<section class="secao fundo-branco"><div class="container"><h2>Marcas que distribuímos</h2><p class="secao-texto">' +
        S.fornecedores.length +
        " fornecedores reconhecidos no mercado.</p>" +
        '<ul class="faixa-marcas">' +
        S.fornecedores
          .map(function (f) {
            return "<li>" + esc(f) + "</li>";
          })
          .join("") +
        "</ul>" +
        '<a class="link-seta" href="fornecedores.html">Ver todos os fornecedores ' +
        icone("arrow-right") +
        "</a></div></section>" +
        (S.noticias.length
          ? '<section class="secao container"><p class="sobretitulo traco">Blog</p><h2>Notícias e treinamentos</h2><p class="secao-texto">Palestras, capacitações e ações com nossos colaboradores e parceiros da região.</p>' +
            listaNoticias(3) +
            '<a class="link-seta" href="blog.html">Ver todas as notícias ' +
            icone("arrow-right") +
            "</a></section>"
          : "") +
        '<section class="secao fundo-branco"><div class="container insta"><div><h2>Acompanhe a ' +
        esc(S.nome) +
        ' no Instagram</h2><p class="secao-texto">Bastidores da operação, novidades do catálogo e dicas para o seu negócio.</p></div>' +
        '<a class="btn btn-azul" href="' +
        esc(S.instagram) +
        '" target="_blank" rel="noopener">' +
        icone("instagram-logo") +
        "Seguir " +
        esc(S.instagramArroba) +
        "</a></div></section>"
      );
    },

    catalogo: function () {
      const filtros = [{ slug: "todas", nome: "Todas", icone: "squares-four" }]
        .concat(CATS)
        .map(function (c) {
          return (
            '<li><button type="button" class="filtro" data-categoria-filtro="' +
            c.slug +
            '" aria-pressed="' +
            (c.slug === "todas") +
            '">' +
            icone(c.icone) +
            esc(c.nome) +
            "</button></li>"
          );
        })
        .join("");
      const ordenados = PRODUTOS.slice().sort(function (a, b) {
        return a.nome.localeCompare(b.nome, "pt-BR");
      });
      return (
        bannerCatalogo(
          "Catálogo de Produtos",
          "Soluções completas em alimentos congelados e resfriados para o seu negócio.<br>Mais de " +
            totalProdutos +
            " itens em " +
            CATS.length +
            " categorias, prontos para cotação.",
          "squares-four",
          MSG.catalogo(),
          [
            ["Home", "index.html"],
            ["Catálogo", ""],
          ],
        ) +
        '<section class="container"><div class="cartao barra-busca"><label class="busca">' +
        icone("magnifying-glass") +
        '<span class="sr-only">Buscar produto</span><input type="search" data-busca-input placeholder="Buscar por produto..."></label>' +
        '<button type="button" class="btn btn-contorno" data-limpar-filtros>' +
        icone("arrow-clockwise") +
        "Limpar filtros</button></div></section>" +
        '<section class="container catalogo"><aside aria-label="Filtrar por categoria"><p class="rotulo">Categorias</p><ul class="filtros">' +
        filtros +
        "</ul></aside>" +
        '<div><h2 class="sr-only">Todos os produtos</h2><p class="texto-suave contagem"><span data-produtos-contagem>' +
        totalProdutos +
        "</span> produtos encontrados</p>" +
        '<div data-produtos-grid class="grade-produtos">' +
        ordenados.map(cartaoProduto).join("") +
        "</div>" +
        '<div data-produtos-vazio class="vazio" hidden>' +
        icone("magnifying-glass", "grande") +
        '<p class="forte">Nenhum produto encontrado</p><p class="texto-suave">Tente outro termo ou limpe os filtros.</p></div>' +
        "</div></section>"
      );
    },

    categoria: function () {
      const slug = new URLSearchParams(location.search).get("c");
      const c = categoria(slug) || CATS[0];
      document.title = c.nome + " | " + S.nome;
      const produtos = PRODUTOS.filter(function (p) {
        return p.categoria === c.slug;
      }).sort(function (a, b) {
        return a.nome.localeCompare(b.nome, "pt-BR");
      });
      const abas = CATS.map(function (x) {
        return (
          '<li><a class="pilula" href="' +
          linkCategoria(x) +
          '"' +
          (x.slug === c.slug ? ' aria-current="page"' : "") +
          ">" +
          icone(x.icone) +
          esc(x.nome) +
          "</a></li>"
        );
      }).join("");
      return (
        bannerCatalogo(
          c.nome,
          esc(c.descricao),
          c.icone,
          MSG.produto(c.nome.toLowerCase()),
          [
            ["Home", "index.html"],
            [c.nome, ""],
          ],
        ) +
        '<nav aria-label="Categorias" class="container"><ul class="pilulas">' +
        abas +
        "</ul></nav>" +
        '<section class="container secao-curta"><div class="titulo-lista"><div><h2>Produtos de ' +
        esc(c.nome) +
        '</h2><p class="texto-suave">' +
        produtos.length +
        " produtos disponíveis. Congelados e resfriados.</p></div>" +
        '<p class="dica">' +
        icone("list-plus") +
        "Monte sua lista e peça a cotação pelo WhatsApp.</p></div>" +
        '<div class="grade-produtos">' +
        produtos.map(cartaoProduto).join("") +
        "</div></section>"
      );
    },

    "quem-somos": function () {
      return (
        cabecalhoInterno(
          "Quem Somos",
          "Distribuindo alimentos com eficiência.",
          "",
        ) +
        '<section class="secao container texto-longo"><h2>Nossa história</h2>' +
        "<p>Desde " +
        S.desde +
        " a " +
        esc(S.nome) +
        " se empenha em distribuir alimentos para que os melhores sabores cheguem com eficácia até a mesa dos nossos clientes.</p>" +
        "<p>Investimos na capacitação dos colaboradores para oferecer um atendimento cada vez melhor e distribuímos marcas confiáveis para supermercados, restaurantes, padarias, hotéis e cozinhas industriais.</p>" +
        "<p>Hoje são mais de " +
        totalProdutos +
        " itens no catálogo, entre frangos, suínos, bovinos, pescados, laticínios e embutidos.</p></section>" +
        '<section class="secao fundo-branco"><div class="container duas-colunas">' +
        '<div class="cartao bloco"><h2>Missão</h2><p>Transformar a distribuição de alimentos em praticidade e conforto para o cliente, com qualidade e pontualidade.</p></div>' +
        '<div class="cartao bloco"><h2>Visão</h2><p>Crescer de forma sustentável, com o comprometimento com o cliente sempre em primeiro lugar.</p></div></div></section>' +
        '<section class="secao container"><h2>Nossos valores</h2><ul class="grade-segmentos">' +
        [
          "Honestidade",
          "Gestão participativa",
          "Sustentabilidade",
          "Ética",
          "Comprometimento",
        ]
          .map(function (v) {
            return (
              '<li class="cartao segmento"><span class="icone-caixa">' +
              icone("seal-check") +
              "</span>" +
              v +
              "</li>"
            );
          })
          .join("") +
        "</ul></section>"
      );
    },

    fornecedores: function () {
      return (
        cabecalhoInterno(
          "Fornecedores",
          "Marcas confiáveis, parcerias sólidas",
          "Distribuímos produtos de fornecedores reconhecidos no mercado para garantir qualidade e procedência em cada entrega.",
        ) +
        '<section class="secao container"><ul class="grade-marcas">' +
        S.fornecedores
          .map(function (f) {
            return '<li class="cartao marca">' + esc(f) + "</li>";
          })
          .join("") +
        "</ul></section>"
      );
    },

    "trabalhe-conosco": function () {
      return (
        cabecalhoInterno(
          "Carreiras",
          "Trabalhe conosco",
          "Faça parte de uma equipe que distribui alimentos com eficiência e honestidade desde " +
            S.desde +
            ".",
        ) +
        '<section class="secao container texto-longo"><p>A ' +
        esc(S.nome) +
        " investe no desenvolvimento dos colaboradores e busca profissionais comprometidos com qualidade e pontualidade.</p>" +
        "<p>Se você quer crescer junto com a gente, envie seu currículo. Analisamos todas as candidaturas e entramos em contato quando surgir uma vaga.</p>" +
        '<h2>Áreas de atuação</h2><ul class="lista-check">' +
        [
          "Comercial",
          "Logística e entrega",
          "Estoque e expedição",
          "Administrativo",
        ]
          .map(function (a) {
            return "<li>" + icone("check") + a + "</li>";
          })
          .join("") +
        "</ul>" +
        "<h2>Como se candidatar</h2><p>Envie seu currículo com nome completo, área de interesse e telefone para contato. Escolha o canal que preferir:</p>" +
        '<div class="botoes"><a class="btn btn-whats" href="' +
        linkWhats(MSG.vaga()) +
        '" target="_blank" rel="noopener">' +
        icone("whatsapp-logo") +
        "Enviar currículo pelo WhatsApp</a>" +
        '<a class="btn btn-contorno" href="mailto:' +
        esc(S.email) +
        "?subject=" +
        encodeURIComponent("Candidatura - " + S.nome) +
        '">' +
        icone("envelope-simple") +
        "Enviar currículo por e-mail</a></div>" +
        '<p class="texto-suave">E-mail: ' +
        esc(S.email) +
        " · WhatsApp: " +
        esc(S.telefoneWhatsappTexto) +
        "</p></section>"
      );
    },

    blog: function () {
      return (
        cabecalhoInterno(
          "Blog",
          "Notícias e treinamentos",
          "Acompanhe palestras, capacitações e iniciativas com nossa equipe.",
        ) +
        '<section class="secao container">' +
        listaNoticias() +
        "</section>"
      );
    },
  };

  // ---------------------------------------------------------------
  // Lista de cotação (porta direta do script original do site)
  // Guarda [{slug, nome}] no localStorage e avisa a página com um evento.
  // ---------------------------------------------------------------
  const CHAVE = S.chaveLista;
  const EVENTO = "lista-change";

  function lerLista() {
    try {
      const l = JSON.parse(localStorage.getItem(CHAVE) || "[]");
      return Array.isArray(l)
        ? l.filter(function (i) {
            return i && i.slug && i.nome;
          })
        : [];
    } catch {
      return [];
    }
  }
  function salvarLista(l) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(l));
    } catch {
      /* navegador sem armazenamento */
    }
    document.dispatchEvent(new CustomEvent(EVENTO, { detail: { list: l } }));
  }
  function alternar(slug, nome) {
    const l = lerLista(),
      i = l.findIndex(function (x) {
        return x.slug === slug;
      });
    if (i >= 0) l.splice(i, 1);
    else l.push({ slug: slug, nome: nome });
    salvarLista(l);
  }
  function remover(slug) {
    salvarLista(
      lerLista().filter(function (x) {
        return x.slug !== slug;
      }),
    );
  }
  function limpar() {
    salvarLista([]);
  }

  function linkCotacao() {
    const l = lerLista();
    const texto = l.length
      ? S.saudacao +
        "\n\nGostaria de uma cotação dos seguintes produtos:\n" +
        l
          .map(function (x) {
            return "- " + x.nome;
          })
          .join("\n")
      : S.saudacao;
    return linkWhats(texto);
  }

  function atualizarContador() {
    const n = lerLista().length;
    document.querySelectorAll("[data-lista-count]").forEach(function (el) {
      el.textContent = String(n);
      el.hidden = n === 0;
    });
  }
  function atualizarBotoes() {
    const l = lerLista();
    document.querySelectorAll("[data-lista-toggle]").forEach(function (b) {
      const dentro = l.some(function (x) {
        return x.slug === b.dataset.slug;
      });
      b.setAttribute("aria-pressed", dentro ? "true" : "false");
    });
  }
  function atualizarGaveta() {
    const raiz = document.querySelector("[data-lista-root]");
    if (!raiz) return;
    const ul = raiz.querySelector("[data-lista-items]"),
      vazio = raiz.querySelector("[data-lista-empty]"),
      rod = raiz.querySelector("[data-lista-footer]"),
      enviar = raiz.querySelector("[data-lista-enviar]"),
      l = lerLista();
    ul.replaceChildren();
    l.forEach(function (x) {
      const li = document.createElement("li");
      const nome = document.createElement("span");
      nome.textContent = x.nome;
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.listaRemove = x.slug;
      b.setAttribute("aria-label", "Remover " + x.nome + " da lista");
      b.className = "btn-link pequeno";
      b.textContent = "Remover";
      li.append(nome, b);
      ul.append(li);
    });
    ul.hidden = l.length === 0;
    vazio.hidden = l.length > 0;
    rod.hidden = l.length === 0;
    enviar.href = linkCotacao();
  }

  let focoAnterior = null;
  function raizLista() {
    return document.querySelector("[data-lista-root]");
  }
  function focaveis() {
    const r = raizLista();
    return r
      ? Array.from(
          r.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter(function (e) {
          return e.offsetParent !== null;
        })
      : [];
  }
  function teclado(e) {
    if (e.key === "Escape") {
      fecharLista();
      return;
    }
    if (e.key !== "Tab") return;
    const f = focaveis();
    if (!f.length) return;
    const primeiro = f[0],
      ultimo = f[f.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primeiro.focus();
    }
  }
  function abrirLista() {
    const r = raizLista();
    if (!r) return;
    focoAnterior = document.activeElement;
    r.classList.remove("hidden");
    requestAnimationFrame(function () {
      r.setAttribute("data-open", "true");
    });
    document.body.style.overflow = "hidden";
    const x = r.querySelector("[data-lista-close]");
    if (x) x.focus();
    document.addEventListener("keydown", teclado);
  }
  function fecharLista() {
    const r = raizLista();
    if (!r) return;
    r.setAttribute("data-open", "false");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", teclado);
    setTimeout(function () {
      if (r.getAttribute("data-open") === "false") r.classList.add("hidden");
    }, 260);
    if (focoAnterior && typeof focoAnterior.focus === "function")
      focoAnterior.focus();
  }

  function ligarLista() {
    document.addEventListener("click", function (e) {
      const t = e.target.closest(
        "[data-lista-toggle],[data-lista-trigger],[data-lista-close],[data-lista-overlay],[data-lista-remove],[data-lista-clear]",
      );
      if (!t) return;
      if (t.matches("[data-lista-toggle]"))
        alternar(t.dataset.slug, t.dataset.nome);
      else if (t.matches("[data-lista-trigger]")) abrirLista();
      else if (
        t.matches("[data-lista-close]") ||
        t.matches("[data-lista-overlay]")
      )
        fecharLista();
      else if (t.matches("[data-lista-remove]")) remover(t.dataset.listaRemove);
      else if (t.matches("[data-lista-clear]")) limpar();
    });
    function tudo() {
      atualizarContador();
      atualizarBotoes();
      atualizarGaveta();
    }
    document.addEventListener(EVENTO, tudo);
    // Mantém a lista igual entre abas abertas do site.
    window.addEventListener("storage", function (e) {
      if (e.key === CHAVE) tudo();
    });
    tudo();
  }

  // ---------------------------------------------------------------
  // Busca e filtro do catálogo (porta do script original)
  // ---------------------------------------------------------------
  function ligarFiltro() {
    const grade = document.querySelector("[data-produtos-grid]");
    if (!grade) return;
    let itens = Array.from(grade.querySelectorAll("[data-produto]")),
      busca = document.querySelector("[data-busca-input]"),
      botoes = document.querySelectorAll("[data-categoria-filtro]"),
      contagem = document.querySelector("[data-produtos-contagem]"),
      vazio = document.querySelector("[data-produtos-vazio]"),
      limparBtn = document.querySelector("[data-limpar-filtros]"),
      atual = "todas";

    function aplicar() {
      let termo = normalizar(busca ? busca.value : ""),
        n = 0;
      itens.forEach(function (el) {
        const ok =
          (atual === "todas" || el.dataset.categoria === atual) &&
          (!termo || el.dataset.nome.indexOf(termo) !== -1);
        el.hidden = !ok;
        if (ok) n++;
      });
      if (contagem) contagem.textContent = String(n);
      if (vazio) vazio.hidden = n > 0;
    }
    function marcar(slug) {
      atual = slug;
      botoes.forEach(function (b) {
        b.setAttribute(
          "aria-pressed",
          b.dataset.categoriaFiltro === slug ? "true" : "false",
        );
      });
    }
    botoes.forEach(function (b) {
      b.addEventListener("click", function () {
        marcar(b.dataset.categoriaFiltro);
        aplicar();
      });
    });
    if (busca) busca.addEventListener("input", aplicar);
    if (limparBtn)
      limparBtn.addEventListener("click", function () {
        marcar("todas");
        if (busca) busca.value = "";
        aplicar();
      });
  }

  // ---------------------------------------------------------------
  // Abas "Estrutura" da página inicial (porta do script original)
  // ---------------------------------------------------------------
  function ligarAbas() {
    const raiz = document.querySelector("[data-estrutura-tabs]");
    if (!raiz) return;
    const abas = Array.from(raiz.querySelectorAll('[role="tab"]')),
      paineis = Array.from(raiz.querySelectorAll('[role="tabpanel"]'));
    function mostrar(id) {
      abas.forEach(function (a) {
        const on = a.id === "tab-" + id;
        a.setAttribute("aria-selected", on ? "true" : "false");
        a.tabIndex = on ? 0 : -1;
        a.classList.toggle("is-active", on);
      });
      paineis.forEach(function (p) {
        p.hidden = p.id !== "panel-" + id;
      });
    }
    abas.forEach(function (a) {
      a.addEventListener("click", function () {
        mostrar(a.dataset.pilar);
      });
      a.addEventListener("keydown", function (e) {
        let i = abas.indexOf(a),
          j = i;
        if (e.key === "ArrowRight" || e.key === "ArrowDown")
          j = (i + 1) % abas.length;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
          j = (i - 1 + abas.length) % abas.length;
        else if (e.key === "Home") j = 0;
        else if (e.key === "End") j = abas.length - 1;
        else return;
        e.preventDefault();
        abas[j].focus();
        mostrar(abas[j].dataset.pilar);
      });
    });
  }

  // ---------------------------------------------------------------
  // Menu do celular e menu "Produtos"
  // ---------------------------------------------------------------
  function ligarMenus() {
    const botao = document.querySelector("[data-menu-mobile]"),
      menu = document.getElementById("menu-mobile");
    if (botao && menu) {
      botao.addEventListener("click", function () {
        const abrir = menu.hidden;
        menu.hidden = !abrir;
        botao.setAttribute("aria-expanded", String(abrir));
        botao.innerHTML = icone(abrir ? "x" : "list");
      });
    }
    const dd = document.querySelector(".dropdown");
    if (dd)
      document.addEventListener("click", function (e) {
        if (!dd.contains(e.target)) dd.open = false;
      });
  }

  // ---------------------------------------------------------------
  // Montagem
  // ---------------------------------------------------------------
  const pagina = document.body.dataset.pagina || "inicio";
  const app = document.getElementById("app");
  app.innerHTML =
    topo(pagina === "categoria" ? "" : pagina) +
    '<main id="conteudo">' +
    (PAGINAS[pagina] || PAGINAS.inicio)() +
    "</main>" +
    rodape();
  if (pagina !== "categoria" && pagina !== "inicio") {
    const titulo = (MENU.filter(function (m) {
      return m[2] === pagina;
    })[0] || [""])[0];
    if (titulo) document.title = titulo + " | " + S.nome;
  } else if (pagina === "inicio") {
    document.title = S.nome + " | Distribuidora de alimentos em " + S.cidade;
  }
  ligarLista();
  ligarFiltro();
  ligarAbas();
  ligarMenus();
})();
