import PageHero from '@/components/layout/PageHero';
import { CardPost } from '@/components/blocos/Simples';
import { listarPosts } from '@/lib/conteudo';
import { metadados } from '@/lib/seo';

export const metadata = metadados({ title: 'Blog | Teslla Logística', description: 'Notícias e artigos da Teslla Logística sobre transporte de medicamentos, cargas expressas e distribuição nacional.' }, '/blog/');

export default function Blog() {
  const posts = listarPosts();
  return (
    <>
      <PageHero titulo="Blog" fundo="/images/blog-default.webp" trilha={[{ texto: 'Início', href: '/' }, { texto: 'Blog' }]} />
      <section className="secao">
        <div className="container grid max-w-container gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <CardPost key={p.slug} {...p} />)}
        </div>
      </section>
    </>
  );
}
