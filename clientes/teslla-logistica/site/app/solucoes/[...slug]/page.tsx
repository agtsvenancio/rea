import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import RenderBlocos, { RenderBloco } from '@/components/blocos/Render';
import Botao from '@/components/ui/Botao';
import Icone from '@/components/ui/Icone';
import { filhasDe, getSite, getSolucao, listarSolucoes, solucoesRaiz, urlSolucao } from '@/lib/conteudo';
import { jsonLd, metadados } from '@/lib/seo';

// Template de solução. Para criar uma página nova, copie um JSON em content/solucoes/ e edite.
export const dynamicParams = false;
export function generateStaticParams() {
  return listarSolucoes().map((s) => ({ slug: s.pai ? [s.pai, s.slug] : [s.slug] }));
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props) {
  const s = getSolucao((await params).slug.at(-1)!)!;
  return metadados(s.seo, urlSolucao(s));
}

export default async function PaginaSolucao({ params }: Props) {
  const s = getSolucao((await params).slug.at(-1)!)!;
  const pai = s.pai ? getSolucao(s.pai) : undefined;
  const irmas = s.pai ? filhasDe(s.pai) : s.slug === 'transporte-de-medicamentos' ? filhasDe(s.slug) : solucoesRaiz();
  const site = getSite();
  const trilha = [{ texto: 'Início', href: '/' }, { texto: 'Soluções', href: '/solucoes/' }, ...(pai ? [{ texto: pai.titulo, href: urlSolucao(pai) }] : []), { texto: s.titulo }];
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.pergunta, acceptedAnswer: { '@type': 'Answer', text: f.resposta } })) };
  const servicoLd = { '@context': 'https://schema.org', '@type': 'Service', name: s.titulo, description: s.resumo, provider: { '@type': 'LocalBusiness', name: site.nome, url: site.url }, areaServed: 'BR' };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(servicoLd)} />
      {s.faq.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />}
      <PageHero titulo={s.titulo} fundo={s.hero.fundo} imagem={s.hero.imagem} trilha={trilha} />

      <section className="secao">
        <div className="container grid max-w-container gap-10 lg:grid-cols-[1fr_2fr]">
          <aside className="order-2 lg:order-1">
            <nav className="bg-grey p-[30px] lg:sticky lg:top-32" aria-label="Nossas Soluções">
              <h3 className="mb-5 text-2xl font-bold">Nossas Soluções</h3>
              <ul className="space-y-4">
                {irmas.map((x) => (
                  <li key={x.slug}>
                    <Link href={urlSolucao(x)} className={`flex items-start gap-2 transition hover:text-primary ${x.slug === s.slug ? 'font-semibold text-primary' : ''}`} aria-current={x.slug === s.slug ? 'page' : undefined}>
                      <Icone nome="check" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{x.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <article className="order-1 lg:order-2">
            <h2 className="mb-5 font-heading text-[28px] font-bold leading-tight lg:text-4xl">{s.headline}</h2>
            {s.paragrafos.map((p, i) => <p key={i} className="mb-4">{p}</p>)}
            {s.citacao && <blockquote className="my-8 bg-white p-8 font-heading text-lg text-dark shadow-[0_16px_40px_rgba(15,27,36,0.1),inset_4px_0_0_#CC1111] md:p-[50px]">{s.citacao}</blockquote>}
            {s.paragrafosApos?.map((p, i) => <p key={i} className="mb-4">{p}</p>)}
            <ul className="my-8 grid gap-4 sm:grid-cols-2">
              {s.destaques.map((d, i) => (
                <li key={i} className="flex items-center gap-4 bg-grey p-5">
                  {d.icone && <img src={d.icone} alt="" className="h-12 w-12 shrink-0 object-contain" loading="lazy" />}
                  <span className="font-medium text-dark">{d.texto}</span>
                </li>
              ))}
            </ul>
            <Botao botao={{ texto: 'Fale com um Especialista', href: 'whatsapp' }} />
          </article>
        </div>
      </section>

      <RenderBlocos blocos={s.secoesExtras} />
      {s.faq.length > 0 && <RenderBloco bloco={{ tipo: 'faq', eyebrow: 'FAQ', titulo: 'Perguntas Frequentes', itens: s.faq, imagem: s.faqImagem ?? undefined }} />}
      <RenderBlocos blocos={s.secoesDepoisFaq} />
      <RenderBloco bloco={{ tipo: 'compartilhado', id: 'cta-final' }} />
    </>
  );
}
