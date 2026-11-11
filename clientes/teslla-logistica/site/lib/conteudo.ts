import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Bloco, Pagina, Post, Site, Solucao } from './types';

const DIR = path.join(process.cwd(), 'content');
const lerJson = <T,>(...p: string[]): T => JSON.parse(fs.readFileSync(path.join(DIR, ...p), 'utf8')) as T;
const listar = (sub: string, ext: string) =>
  fs.existsSync(path.join(DIR, sub))
    ? fs.readdirSync(path.join(DIR, sub)).filter((f) => f.endsWith(ext)).map((f) => f.slice(0, -ext.length))
    : [];

export const getSite = () => lerJson<Site>('site.json');

export const listarPaginas = () => listar('paginas', '.json');
export const getPagina = (slug: string) => lerJson<Pagina>('paginas', `${slug}.json`);

export const getBlocoCompartilhado = (id: string) => lerJson<Bloco>('blocos', `${id}.json`);

export function listarSolucoes(): Solucao[] {
  return listar('solucoes', '.json')
    .map((s) => lerJson<Solucao>('solucoes', `${s}.json`))
    .sort((a, b) => (a.ordem ?? 99) - (b.ordem ?? 99) || a.titulo.localeCompare(b.titulo, 'pt-BR'));
}
export const getSolucao = (slug: string) => listarSolucoes().find((s) => s.slug === slug);
export const solucoesRaiz = () => listarSolucoes().filter((s) => !s.pai);
export const filhasDe = (pai: string) => listarSolucoes().filter((s) => s.pai === pai);
export const urlSolucao = (s: Pick<Solucao, 'slug' | 'pai'>) => (s.pai ? `/solucoes/${s.pai}/${s.slug}/` : `/solucoes/${s.slug}/`);

export function listarPosts(): Post[] {
  return listar('blog', '.md')
    .map((slug) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, 'blog', `${slug}.md`), 'utf8'));
      return { slug, html: content, ...(data as Omit<Post, 'slug' | 'html'>) };
    })
    .sort((a, b) => b.data.localeCompare(a.data));
}
export const getPost = (slug: string) => listarPosts().find((p) => p.slug === slug);

export const linkWhatsApp = (numero: string, mensagem?: string) =>
  `https://api.whatsapp.com/send?phone=${numero}${mensagem ? `&text=${encodeURIComponent(mensagem)}` : ''}`;

export function resolverHref(href: string) {
  const site = getSite();
  return href === 'whatsapp' ? linkWhatsApp(site.whatsapp.comercial, site.whatsapp.mensagem) : href;
}

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
export function formatarData(iso: string, longo = false) {
  const [a, m, d] = iso.split('-').map(Number);
  return longo ? `${d} de ${MESES[m - 1]} de ${a}` : `${String(d).padStart(2, '0')} ${MESES[m - 1]}`;
}
