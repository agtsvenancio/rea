// =====================================================================
// CONFIGURAÇÃO DO SITE
// Troque aqui os dados da SUA empresa. Tudo no site lê deste arquivo.
// =====================================================================
window.SITE = {
  // Nome que aparece no topo, no rodapé e nas mensagens do WhatsApp.
  nome: "Sua Distribuidora",

  // Número do WhatsApp com DDI + DDD, só números. Ex.: 5514999999999
  whatsapp: "5500000000000",

  // Primeira frase de toda mensagem enviada pelo WhatsApp.
  saudacao: "Olá! Vim pelo site da Sua Distribuidora.",

  // Contatos mostrados no rodapé e na página Trabalhe Conosco.
  telefoneWhatsappTexto: "(00) 00000-0000",
  telefoneFixo: "+550000000000",
  telefoneFixoTexto: "(00) 0000-0000",
  email: "contato@suadistribuidora.com.br",
  endereco: "Rua Exemplo, 123, Centro, Sua Cidade/UF",
  cidade: "Sua Cidade/UF",
  desde: 2010,
  instagram: "https://www.instagram.com/",
  instagramArroba: "@suadistribuidora",

  // Logo opcional (ex.: "assets/logo.png"). Vazio = mostra o nome em texto.
  logo: "",

  // Chave usada para guardar a lista de cotação no navegador do visitante.
  chaveLista: "lista-cotacao",

  // Marcas que você distribui (página Fornecedores e página inicial).
  fornecedores: [
    "Marca 1",
    "Marca 2",
    "Marca 3",
    "Marca 4",
    "Marca 5",
    "Marca 6",
    "Marca 7",
    "Marca 8",
    "Marca 9",
    "Marca 10",
    "Marca 11",
    "Marca 12",
  ],

  // Segmentos atendidos (página inicial).
  segmentos: [
    { nome: "Supermercados", icone: "shopping-cart" },
    { nome: "Padarias", icone: "bread" },
    { nome: "Hotéis", icone: "bed" },
    { nome: "Pizzarias", icone: "pizza" },
    { nome: "Restaurantes", icone: "fork-knife" },
    { nome: "Churrascarias", icone: "flame" },
  ],

  // Notícias do blog. Deixe a lista vazia para esconder a seção.
  noticias: [
    {
      data: "2026-09-04",
      titulo: "Treinamento da equipe de entregas",
      resumo: "Escreva aqui um resumo curto da notícia.",
    },
    {
      data: "2026-06-10",
      titulo: "Palestra sobre segurança no trabalho",
      resumo: "Escreva aqui um resumo curto da notícia.",
    },
    {
      data: "2026-03-02",
      titulo: "Novos produtos no catálogo",
      resumo: "Escreva aqui um resumo curto da notícia.",
    },
  ],
};

// Categorias do catálogo. "slug" é o código usado nos produtos.
window.CATEGORIAS = [
  {
    slug: "bovino",
    nome: "Bovinos",
    icone: "cow",
    descricao:
      "Cortes bovinos congelados e resfriados para açougues, supermercados e restaurantes.",
  },
  {
    slug: "frango",
    nome: "Frango",
    icone: "bird",
    descricao:
      "Frango inteiro e em cortes, congelado e resfriado, para todo tipo de cozinha.",
  },
  {
    slug: "suinos",
    nome: "Suínos",
    icone: "piggy-bank",
    descricao: "Cortes suínos selecionados, congelados e resfriados.",
  },
  {
    slug: "pescado",
    nome: "Pescado",
    icone: "fish",
    descricao: "Peixes congelados com qualidade e procedência.",
  },
  {
    slug: "empanados",
    nome: "Empanados",
    icone: "hamburger",
    descricao:
      "Empanados prontos para fritar ou assar, práticos para o dia a dia.",
  },
  {
    slug: "industrializado",
    nome: "Industrializados",
    icone: "factory",
    descricao: "Linguiças, bacon, frios e outros industrializados.",
  },
  {
    slug: "laticinios",
    nome: "Laticínios",
    icone: "cheese",
    descricao: "Queijos, requeijão e outros laticínios para o seu negócio.",
  },
  {
    slug: "produtos-temperados",
    nome: "Produtos Temperados",
    icone: "cooking-pot",
    descricao: "Carnes temperadas, prontas para ir ao forno ou à grelha.",
  },
  {
    slug: "vegetais",
    nome: "Vegetais",
    icone: "carrot",
    descricao: "Batatas e vegetais congelados, práticos e sem desperdício.",
  },
];
