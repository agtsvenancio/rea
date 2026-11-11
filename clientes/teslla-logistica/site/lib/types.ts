// Modelo de conteúdo do site. Cada página é um arquivo JSON em /content.

export type Link = { texto: string; href: string };
export type Seo = { title: string; description: string; ogImage?: string | null };
export type Faq = { pergunta: string; resposta: string };
export type Destaque = { icone?: string | null; titulo?: string; texto: string };

// Botão: "whatsapp" usa o número comercial com a mensagem padrão (content/site.json)
export type Botao = { texto: string; href: string | 'whatsapp' };

type Cabecalho = { eyebrow?: string; titulo?: string };

// Blocos de seção. Para criar uma página nova, combine estes blocos em "secoes".
export type Bloco =
  | ({ tipo: 'hero-slider'; slides: { imagem: string; href?: string; alt?: string }[] })
  | (Cabecalho & { tipo: 'grid-solucoes'; variante?: 'circulo' | 'card'; itens?: string[]; filhosDe?: string; botao?: Botao; layout?: 'titulo-lateral' | 'centro' })
  | (Cabecalho & { tipo: 'sobre'; paragrafos: string[]; botao?: Botao; imagens: string[]; destaques?: Destaque[]; antetitulo?: string })
  | ({ tipo: 'contadores'; itens: { valor: string; rotulo: string; icone?: string }[]; fundo?: string })
  | (Cabecalho & { tipo: 'passos'; itens: { titulo: string; texto?: string; icone?: string }[]; video?: string })
  | (Cabecalho & { tipo: 'form-atendimento'; texto?: string; imagem?: string })
  | (Cabecalho & { tipo: 'faq'; texto?: string; itens: Faq[]; imagem?: string; botao?: Botao; fundo?: 'cinza' | 'branco' })
  | (Cabecalho & { tipo: 'por-que-nos'; itens: Destaque[]; botao?: Botao; imagem: string })
  | (Cabecalho & { tipo: 'depoimentos'; itens: { texto: string; nome: string; local: string }[] })
  | (Cabecalho & { tipo: 'blog'; quantidade?: number })
  | (Cabecalho & { tipo: 'infraestrutura'; paragrafos: string[]; botao?: Botao; imagens: string[] })
  | ({ tipo: 'logos'; imagens: { src: string; alt: string }[] })
  | (Cabecalho & { tipo: 'numerados'; paragrafos?: string[]; itens: Destaque[]; botao?: Botao; imagem?: string })
  | (Cabecalho & { tipo: 'estrutura'; itens: string[]; botao?: Botao; imagens?: string[] })
  | (Cabecalho & { tipo: 'lista-check'; itens: string[] })
  | (Cabecalho & { tipo: 'galeria'; imagens: string[] })
  | (Cabecalho & { tipo: 'certificados'; texto?: string; imagens: string[] })
  | (Cabecalho & { tipo: 'cta-inline'; botao: Botao })
  | (Cabecalho & { tipo: 'cta-final'; botao?: Botao })
  | (Cabecalho & { tipo: 'video'; src: string; poster?: string })
  | (Cabecalho & { tipo: 'texto'; paragrafos: string[]; botao?: Botao; imagem?: string })
  | (Cabecalho & { tipo: 'icones'; texto?: string; itens: Destaque[]; botao?: Botao; imagem?: string })
  | ({ tipo: 'canais-contato' })
  | (Cabecalho & { tipo: 'form-cotacao' })
  | ({ tipo: 'mapa' })
  | ({ tipo: 'compartilhado'; id: string });

export type Pagina = {
  titulo: string;
  slug: string;
  seo: Seo;
  hero?: { fundo?: string | null; imagem?: string | null } | null;
  secoes: Bloco[];
};

export type Solucao = {
  titulo: string;
  slug: string;
  pai: string | null;
  ordem?: number;
  seo: Seo;
  resumo: string;
  icone?: string;
  hero: { fundo?: string | null; imagem?: string | null };
  headline: string;
  paragrafos: string[];
  citacao?: string | null;
  paragrafosApos?: string[];
  destaques: Destaque[];
  faq: Faq[];
  faqImagem?: string | null;
  // Blocos exibidos entre o conteúdo e o FAQ, e depois do FAQ (antes do CTA final)
  secoesExtras?: Bloco[];
  secoesDepoisFaq?: Bloco[];
};

export type Post = {
  slug: string;
  titulo: string;
  data: string;
  categoria: string;
  imagem: string;
  resumo: string;
  html: string;
};

export type Site = {
  nome: string;
  url: string;
  tagline: string;
  logo: string;
  logoRodape: string;
  telefones: { numero: string; href: string }[];
  whatsapp: { comercial: string; emergencial: string; mensagem: string; rotuloEmergencial: string };
  endereco: string;
  mapaEmbed: string;
  redes: { nome: string; href: string; icone: 'instagram' | 'linkedin' }[];
  menu: (Link & { filhos?: Link[] })[];
  rodape: { titulo: string; links: Link[] }[];
  copyright: string;
  formularios: { emailEndpoint: string; setores: string[] };
  gtm: string[];
};
