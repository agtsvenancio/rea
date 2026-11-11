import { notFound } from 'next/navigation';
import PaginaBlocos from '@/components/paginas/PaginaBlocos';
import { getPagina, listarPaginas } from '@/lib/conteudo';
import { metadados } from '@/lib/seo';

// Toda página em content/paginas/<slug>.json vira /<slug>/ (exceto home e solucoes, que têm rota própria).
const RESERVADAS = ['home', 'solucoes'];

export const dynamicParams = false;
export function generateStaticParams() {
  return listarPaginas().filter((s) => !RESERVADAS.includes(s)).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return metadados(getPagina(slug).seo, `/${slug}/`);
}

export default async function Pagina({ params }: Props) {
  const { slug } = await params;
  if (RESERVADAS.includes(slug)) notFound();
  return <PaginaBlocos pagina={getPagina(slug)} />;
}
