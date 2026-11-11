import type { MetadataRoute } from 'next';
import { getSite, listarPaginas, listarPosts, listarSolucoes, urlSolucao } from '@/lib/conteudo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSite().url;
  const paginas = listarPaginas().map((s) => (s === 'home' ? '/' : `/${s}/`));
  return [
    ...paginas.map((p) => ({ url: base + p, priority: p === '/' ? 1 : 0.8 })),
    ...listarSolucoes().map((s) => ({ url: base + urlSolucao(s), priority: 0.9 })),
    { url: `${base}/blog/`, priority: 0.6 },
    ...listarPosts().map((p) => ({ url: `${base}/noticias/${p.slug}/`, lastModified: p.data, priority: 0.5 })),
  ];
}
