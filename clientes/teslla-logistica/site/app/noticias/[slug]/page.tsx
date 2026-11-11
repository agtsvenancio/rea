import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import Icone from '@/components/ui/Icone';
import { formatarData, getPost, getSite, listarPosts } from '@/lib/conteudo';
import { jsonLd, metadados } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return listarPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const p = getPost((await params).slug)!;
  return metadados({ title: `${p.titulo} | Teslla Logística`, description: p.resumo, ogImage: p.imagem }, `/noticias/${p.slug}/`);
}

export default async function Post({ params }: Props) {
  const p = getPost((await params).slug)!;
  const site = getSite();
  const todos = listarPosts();
  const i = todos.findIndex((x) => x.slug === p.slug);
  const [proximo, anterior] = [todos[i - 1], todos[i + 1]];
  const url = encodeURIComponent(`${site.url}/noticias/${p.slug}/`);
  const artigo = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.titulo, datePublished: p.data, image: site.url + p.imagem, publisher: { '@type': 'Organization', name: site.nome } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(artigo)} />
      <PageHero titulo={p.titulo} fundo={p.imagem} trilha={[{ texto: 'Início', href: '/' }, { texto: 'Blog', href: '/blog/' }, { texto: p.titulo }]} />
      <section className="secao">
        <div className="container grid max-w-container gap-12 lg:grid-cols-[2fr_1fr]">
          <article>
            <p className="mb-6 text-sm">{p.categoria} · {formatarData(p.data, true)}</p>
            <img src={p.imagem} alt="" className="mb-8 w-full" />
            <div className="prose-teslla" dangerouslySetInnerHTML={{ __html: p.html }} />
            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6">
              <span className="font-heading font-semibold text-dark">Compartilhe:</span>
              <a className="hover:text-primary" target="_blank" rel="noopener" href={`https://api.whatsapp.com/send?text=${url}`}>WhatsApp</a>
              <a className="hover:text-primary" target="_blank" rel="noopener" href={`https://www.linkedin.com/shareArticle?url=${url}`}>LinkedIn</a>
              <a className="hover:text-primary" target="_blank" rel="noopener" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>Facebook</a>
            </div>
            <nav className="mt-8 grid gap-4 sm:grid-cols-2">
              {anterior && <Link href={`/noticias/${anterior.slug}/`} className="bg-grey p-5 hover:text-primary"><span className="block text-sm">Anterior</span>{anterior.titulo}</Link>}
              {proximo && <Link href={`/noticias/${proximo.slug}/`} className="bg-grey p-5 text-right hover:text-primary sm:col-start-2"><span className="block text-sm">Próximo</span>{proximo.titulo}</Link>}
            </nav>
          </article>
          <aside className="space-y-8">
            <div className="bg-grey p-[30px]">
              <h3 className="mb-5 text-xl font-bold">Últimos Posts</h3>
              <ul className="space-y-4">
                {todos.slice(0, 3).map((x) => (
                  <li key={x.slug}><Link href={`/noticias/${x.slug}/`} className="flex gap-3 hover:text-primary"><img src={x.imagem} alt="" className="h-16 w-20 shrink-0 object-cover" loading="lazy" /><span className="text-sm font-medium text-dark">{x.titulo}<span className="mt-1 block font-normal text-body">{formatarData(x.data, true)}</span></span></Link></li>
                ))}
              </ul>
            </div>
            <div className="bg-dark p-[30px] text-white">
              <h3 className="mb-3 text-xl font-bold !text-white">Precisa de uma cotação?</h3>
              <Link href="/cotacao/" className="btn-teslla btn-teslla--claro">Solicitar Cotação <Icone nome="seta" /></Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
