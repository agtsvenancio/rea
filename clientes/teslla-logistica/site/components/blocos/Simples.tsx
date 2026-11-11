import Link from 'next/link';
import Botao from '@/components/ui/Botao';
import Titulo from '@/components/ui/Titulo';
import Icone from '@/components/ui/Icone';
import FormAtendimento from '@/components/forms/FormAtendimento';
import FormCotacao from '@/components/forms/FormCotacao';
import { filhasDe, formatarData, getSite, listarPosts, listarSolucoes, solucoesRaiz, urlSolucao } from '@/lib/conteudo';
import type { Bloco, Destaque } from '@/lib/types';

type B<T extends Bloco['tipo']> = Extract<Bloco, { tipo: T }>;

const Ct = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container max-w-container ${className}`}>{children}</div>
);

// ---------- Grade de soluções (círculos vermelhos da home ou cards do hub)
export function GridSolucoes(b: B<'grid-solucoes'>) {
  const todas = listarSolucoes();
  const itens = b.itens ? b.itens.map((s) => todas.find((x) => x.slug === s)!).filter(Boolean) : b.filhosDe ? filhasDe(b.filhosDe) : solucoesRaiz();
  const lateral = b.layout === 'titulo-lateral';
  const grade = b.variante === 'card' ? (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {itens.map((s) => (
        <Link key={s.slug} href={urlSolucao(s)} className="group bg-white p-8 shadow-card transition hover:-translate-y-1">
          <img src={s.icone ?? '/images/feature-icon-2.webp'} alt="" className="mb-5 h-14 w-14 object-contain" loading="lazy" />
          <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">{s.titulo}</h3>
          <p>{s.resumo}</p>
        </Link>
      ))}
    </div>
  ) : (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 ${lateral ? 'lg:grid-cols-3' : 'lg:grid-cols-5'}`}>
      {itens.map((s) => (
        <Link key={s.slug} href={urlSolucao(s)} className="group text-center">
          <img src={s.icone} alt="" className="mx-auto mb-3 h-[110px] w-[110px] object-contain transition group-hover:scale-105 md:h-[150px] md:w-[150px]" loading="lazy" />
          <h3 className="text-base font-semibold leading-tight group-hover:text-primary md:text-xl">{s.titulo}</h3>
        </Link>
      ))}
    </div>
  );
  return (
    <section className="secao overflow-hidden">
      <Ct className={lateral ? 'grid gap-10 lg:grid-cols-[260px_1fr]' : ''}>
        <Titulo eyebrow={b.eyebrow} titulo={b.titulo} centro={!lateral} />
        {grade}
        {b.botao && <div className="mt-10 text-center"><Botao botao={b.botao} /></div>}
      </Ct>
    </section>
  );
}

// ---------- Texto + fotos (ex.: "Impulsione a eficiência")
export function Sobre(b: B<'sobre'>) {
  return (
    <section className="secao">
      <Ct className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          {b.antetitulo && <p className="mb-2 font-heading text-sm font-bold uppercase tracking-widest text-dark/30">{b.antetitulo}</p>}
          <Titulo eyebrow={b.eyebrow} titulo={b.titulo} className="!mb-5" />
          {b.paragrafos.map((p, i) => <p key={i} className="mb-4">{p}</p>)}
          {b.destaques && <Destaques itens={b.destaques} />}
          {b.botao && <Botao botao={b.botao} className="mt-4" />}
        </div>
        <Mosaico imagens={b.imagens} />
      </Ct>
    </section>
  );
}

function Mosaico({ imagens }: { imagens: string[] }) {
  if (imagens.length === 1) return <img src={imagens[0]} alt="" className="w-full object-cover" loading="lazy" />;
  return (
    <div className="grid grid-cols-2 gap-3">
      {imagens.slice(0, 4).map((src, i) => <img key={i} src={src} alt="" loading="lazy" className={`h-full w-full object-cover ${imagens.length === 2 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} />)}
    </div>
  );
}

function Destaques({ itens, claro = false }: { itens: Destaque[]; claro?: boolean }) {
  return (
    <ul className="my-6 space-y-5">
      {itens.map((d, i) => (
        <li key={i} className="flex gap-4">
          {d.icone && <img src={d.icone} alt="" className="h-12 w-12 shrink-0 object-contain" loading="lazy" />}
          <div>
            {d.titulo && <h4 className={`mb-1 text-lg font-semibold ${claro ? 'text-white' : ''}`}>{d.titulo}</h4>}
            <p className={claro ? 'text-white/80' : ''}>{d.texto}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// ---------- Contadores sobre fundo escuro
export function Contadores(b: B<'contadores'>) {
  return (
    <section className="relative isolate bg-dark py-16 lg:py-20">
      <img src={b.fundo ?? '/images/empresa-de-logistica-scaled.webp'} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20" loading="lazy" />
      <Ct className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {b.itens.map((c, i) => (
          <div key={i} className="border-white/20 lg:border-l lg:pl-6 lg:first:border-0 lg:first:pl-0">
            {c.icone && <img src={c.icone} alt="" className="mb-4 h-12 w-12 object-contain" loading="lazy" />}
            <p className="font-heading text-[40px] font-bold leading-tight text-white lg:text-5xl">{c.valor}</p>
            <p className="text-white/80">{c.rotulo}</p>
          </div>
        ))}
      </Ct>
    </section>
  );
}

// ---------- Passos numerados (4 passos / nossos pilares)
export function Passos(b: B<'passos'>) {
  return (
    <section className="secao bg-grey">
      <Ct>
        <Titulo eyebrow={b.eyebrow} titulo={b.titulo} centro />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {b.itens.map((p, i) => (
            <li key={i} className="relative bg-white p-8 text-center shadow-card">
              <span className="absolute right-4 top-3 font-heading text-4xl font-bold text-primary/15">{String(i + 1).padStart(2, '0')}</span>
              {p.icone && <img src={p.icone} alt="" className="mx-auto mb-5 h-16 w-16 object-contain" loading="lazy" />}
              <h3 className="mb-2 text-xl font-semibold">{p.titulo}</h3>
              {p.texto && <p>{p.texto}</p>}
            </li>
          ))}
        </ol>
        {b.video && <video src={b.video} className="mx-auto mt-12 w-full max-w-4xl" controls muted playsInline preload="metadata" />}
      </Ct>
    </section>
  );
}

// ---------- Formulário "Solicite um Atendimento"
export function FormAtendimentoBloco(b: B<'form-atendimento'>) {
  return (
    <section className="relative">
      {b.imagem && <img src={b.imagem} alt="" className="absolute inset-x-0 top-0 h-[300px] w-full object-cover lg:h-[420px]" loading="lazy" />}
      <Ct className={`relative ${b.imagem ? 'pt-[200px] lg:pt-[300px]' : 'pt-16'} pb-16 lg:pb-[120px]`}>
        <div className="mx-auto max-w-3xl bg-white p-6 text-center shadow-quote md:p-10">
          <Titulo eyebrow={b.eyebrow} titulo={b.titulo} centro className="!mb-3" />
          {b.texto && <p className="mb-6">{b.texto}</p>}
          <FormAtendimento comSetor={!b.imagem} />
        </div>
      </Ct>
    </section>
  );
}

// ---------- FAQ (acordeão nativo <details>)
export function FaqBloco(b: B<'faq'>) {
  return (
    <section className={`secao ${b.fundo === 'branco' ? '' : 'bg-grey'}`}>
      <Ct className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <Titulo eyebrow={b.eyebrow} titulo={b.titulo} />
          {b.texto && <p className="mb-6">{b.texto}</p>}
          <div className="space-y-4">
            {b.itens.map((f, i) => (
              <details key={i} className="group rounded-md bg-white shadow-card" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-5 font-heading text-lg font-semibold text-dark [&::-webkit-details-marker]:hidden">
                  {f.pergunta}
                  <span className="text-2xl leading-none text-primary transition group-open:rotate-45">+</span>
                </summary>
                <p className="px-4 pb-5">{f.resposta}</p>
              </details>
            ))}
          </div>
          {b.botao && <Botao botao={b.botao} className="mt-8" />}
        </div>
        {b.imagem && <img src={b.imagem} alt="" className="w-full lg:sticky lg:top-32" loading="lazy" />}
      </Ct>
    </section>
  );
}

// ---------- "Somos a escolha certa" (fundo escuro + imagem lateral)
export function PorQueNos(b: B<'por-que-nos'>) {
  return (
    <section className="grid bg-dark lg:grid-cols-2">
      <div className="px-4 py-16 sm:px-8 lg:py-[120px] lg:pl-[max(15px,calc((100vw-1170px)/2))] lg:pr-16">
        <Titulo eyebrow={b.eyebrow} titulo={b.titulo} claro />
        <Destaques itens={b.itens} claro />
        {b.botao && <Botao botao={b.botao} variante="claro" />}
      </div>
      <img src={b.imagem} alt="" className="h-full min-h-[320px] w-full object-cover" loading="lazy" />
    </section>
  );
}

// ---------- Depoimentos (rolagem horizontal)
export function Depoimentos(b: B<'depoimentos'>) {
  return (
    <section className="secao overflow-hidden">
      <Ct>
        <Titulo eyebrow={b.eyebrow} titulo={b.titulo} centro />
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4">
          {b.itens.map((d, i) => (
            <li key={i} className="flex w-[85%] shrink-0 snap-start flex-col bg-white p-8 shadow-card sm:w-[48%] lg:w-[32%]">
              <Icone nome="aspas" className="mb-4 h-10 w-10 text-primary" />
              <blockquote className="flex-1">“{d.texto}”</blockquote>
              <p className="mt-6 font-heading text-lg font-semibold text-dark">{d.nome}</p>
              <p className="text-sm">{d.local}</p>
            </li>
          ))}
        </ul>
      </Ct>
    </section>
  );
}

// ---------- Últimos posts
export function BlogBloco(b: B<'blog'>) {
  const posts = listarPosts().slice(0, b.quantidade ?? 3);
  return (
    <section className="secao pt-0 lg:pt-0">
      <Ct>
        <Titulo eyebrow={b.eyebrow} titulo={b.titulo} centro />
        <div className="grid gap-8 md:grid-cols-3">{posts.map((p) => <CardPost key={p.slug} {...p} />)}</div>
      </Ct>
    </section>
  );
}
export function CardPost(p: { slug: string; titulo: string; data: string; imagem: string }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/noticias/${p.slug}/`} className="relative block overflow-hidden">
        <img src={p.imagem} alt="" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        <span className="absolute left-4 top-4 bg-primary px-3 py-1 font-heading text-sm font-semibold text-white">{formatarData(p.data)}</span>
      </Link>
      <h3 className="mb-3 mt-5 text-xl font-semibold leading-snug"><Link href={`/noticias/${p.slug}/`} className="hover:text-primary">{p.titulo}</Link></h3>
      <Link href={`/noticias/${p.slug}/`} className="mt-auto inline-flex items-center gap-2 font-heading font-semibold text-dark hover:text-primary">Ler Mais <Icone nome="seta" /></Link>
    </article>
  );
}

// ---------- Infraestrutura (fundo escuro)
export function Infraestrutura(b: B<'infraestrutura'>) {
  return (
    <section className="secao bg-dark">
      <Ct className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Titulo eyebrow={b.eyebrow} titulo={b.titulo} claro />
          {b.paragrafos.map((p, i) => <p key={i} className="mb-4 text-white/80">{p}</p>)}
          {b.botao && <Botao botao={b.botao} variante="claro" className="mt-2" />}
        </div>
        <Mosaico imagens={b.imagens} />
      </Ct>
    </section>
  );
}

// ---------- Faixa de logos (órgãos reguladores)
export function Logos(b: B<'logos'>) {
  const lista = [...b.imagens, ...b.imagens, ...b.imagens, ...b.imagens];
  return (
    <section className="overflow-hidden border-y border-line bg-white py-12" aria-label="Órgãos e certificações">
      <ul className="flex w-max animate-marquee items-center gap-16 hover:[animation-play-state:paused]">
        {lista.map((l, i) => (
          <li key={i} aria-hidden={i >= b.imagens.length}><img src={l.src} alt={l.alt} className="h-16 w-auto object-contain grayscale transition hover:grayscale-0" loading="lazy" /></li>
        ))}
      </ul>
    </section>
  );
}

// ---------- Ícones com texto (Sobre nós / Especialistas)
export function Icones(b: B<'icones'>) {
  return (
    <section className="secao">
      <Ct className={`grid items-center gap-12 ${b.imagem ? 'lg:grid-cols-2' : ''}`}>
        {b.imagem && <img src={b.imagem} alt="" className="w-full" loading="lazy" />}
        <div>
          <Titulo eyebrow={b.eyebrow} titulo={b.titulo} className="!mb-5" />
          {b.texto && <p>{b.texto}</p>}
          <Destaques itens={b.itens} />
          {b.botao && <Botao botao={b.botao} />}
        </div>
      </Ct>
    </section>
  );
}

// ---------- Benefícios numerados
export function Numerados(b: B<'numerados'>) {
  return (
    <section className="secao bg-grey">
      <Ct className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <Titulo eyebrow={b.eyebrow} titulo={b.titulo} className="!mb-5" />
          {b.paragrafos?.map((p, i) => <p key={i} className="mb-4">{p}</p>)}
          {b.botao && <Botao botao={b.botao} className="mt-2" />}
        </div>
        <div>
          {b.imagem && <img src={b.imagem} alt="" className="mb-8 w-full" loading="lazy" />}
          <ol className="space-y-4">
            {b.itens.map((d, i) => (
              <li key={i} className="flex gap-5 bg-white p-6 shadow-card">
                <span className="grid h-12 w-12 shrink-0 place-items-center bg-primary font-heading text-xl font-bold text-white">{i + 1}</span>
                <div><h3 className="mb-1 text-xl font-semibold">{d.titulo}</h3><p>{d.texto}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </Ct>
    </section>
  );
}

// ---------- Estrutura Operacional (lista + galeria)
export function Estrutura(b: B<'estrutura'>) {
  return (
    <section className="secao bg-grey">
      <Ct>
        <Titulo eyebrow={b.eyebrow} titulo={b.titulo} centro />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {b.itens.map((t, i) => (
            <li key={i} className="flex flex-col items-center gap-3 bg-white p-6 text-center shadow-card">
              <Icone nome="check" className="h-8 w-8 text-primary" /><span className="font-medium text-dark">{t}</span>
            </li>
          ))}
        </ul>
        {b.botao && <div className="mt-8 text-center"><Botao botao={b.botao} /></div>}
        {b.imagens && <Galeria imagens={b.imagens} className="mt-10" />}
      </Ct>
    </section>
  );
}

export function Galeria({ imagens, className = '' }: { imagens: string[]; className?: string }) {
  return (
    <ul className={`grid grid-cols-2 gap-3 md:grid-cols-4 ${className}`}>
      {imagens.map((src, i) => (
        <li key={i}><a href={src} target="_blank" rel="noopener"><img src={src} alt="" className="aspect-square w-full object-cover transition hover:opacity-80" loading="lazy" /></a></li>
      ))}
    </ul>
  );
}

export function GaleriaBloco(b: B<'galeria'>) {
  return <section className="secao"><Ct><Titulo eyebrow={b.eyebrow} titulo={b.titulo} centro /><Galeria imagens={b.imagens} /></Ct></section>;
}

export function ListaCheck(b: B<'lista-check'>) {
  return (
    <section className="secao">
      <Ct>
        <Titulo eyebrow={b.eyebrow} titulo={b.titulo} centro />
        <ul className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {b.itens.map((t, i) => <li key={i} className="flex gap-3"><Icone nome="check" className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-dark">{t}</span></li>)}
        </ul>
      </Ct>
    </section>
  );
}

export function Certificados(b: B<'certificados'>) {
  return (
    <section className="secao">
      <Ct>
        <Titulo eyebrow={b.eyebrow} titulo={b.titulo} centro className="!mb-4" />
        {b.texto && <p className="mx-auto mb-10 max-w-3xl text-center">{b.texto}</p>}
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {b.imagens.map((src, i) => <li key={i}><a href={src} target="_blank" rel="noopener"><img src={src} alt={`Certificado ${i + 1}`} className="w-full shadow-card transition hover:-translate-y-1" loading="lazy" /></a></li>)}
        </ul>
      </Ct>
    </section>
  );
}

export function CtaInline(b: B<'cta-inline'>) {
  return (
    <section className="py-12">
      <Ct className="flex flex-col items-start justify-between gap-6 bg-primary p-8 md:flex-row md:items-center md:p-12">
        <div>{b.eyebrow && <p className="mb-1 font-heading font-semibold text-white/80">{b.eyebrow}</p>}<h3 className="max-w-2xl text-2xl font-bold text-white">{b.titulo}</h3></div>
        <Botao botao={b.botao} variante="claro" className="shrink-0 !bg-dark" />
      </Ct>
    </section>
  );
}

export function CtaFinal(b: B<'cta-final'>) {
  return (
    <section className="relative isolate overflow-hidden bg-primary py-16 lg:py-[100px]">
      <img src="/images/cta-shape.webp" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" loading="lazy" />
      <Ct className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <h2 className="max-w-xl font-heading text-[32px] font-semibold leading-tight text-white lg:text-5xl">{b.titulo}</h2>
        {b.botao && <Botao botao={b.botao} variante="claro" className="!bg-dark" />}
      </Ct>
    </section>
  );
}

export function Video(b: B<'video'>) {
  return <section className="secao pt-0 lg:pt-0"><Ct><Titulo eyebrow={b.eyebrow} titulo={b.titulo} centro /><video src={b.src} poster={b.poster} className="w-full" controls muted playsInline preload="metadata" /></Ct></section>;
}

export function Texto(b: B<'texto'>) {
  return (
    <section className="secao">
      <Ct className={`grid items-center gap-12 ${b.imagem ? 'lg:grid-cols-2' : ''}`}>
        <div>
          <Titulo eyebrow={b.eyebrow} titulo={b.titulo} className="!mb-5" />
          {b.paragrafos.map((p, i) => <p key={i} className="mb-4">{p}</p>)}
          {b.botao && <Botao botao={b.botao} className="mt-2" />}
        </div>
        {b.imagem && <img src={b.imagem} alt="" className="w-full" loading="lazy" />}
      </Ct>
    </section>
  );
}

export function CanaisContato() {
  const site = getSite();
  const card = 'flex flex-col items-center gap-2 bg-white p-8 text-center shadow-card';
  return (
    <section className="secao">
      <Ct className="grid gap-6 md:grid-cols-3">
        <div className={card}>
          <Icone nome="telefone" className="mb-2 h-10 w-10 text-primary" />
          <h2 className="text-xl font-semibold">Canais de Atendimento</h2>
          {site.telefones.map((t) => <a key={t.href} href={t.href} className="text-lg text-dark hover:text-primary">{t.numero}</a>)}
        </div>
        <div className={`${card} !bg-dark text-white`}>
          <h2 className="text-xl font-semibold !text-white">Atendimento emergencial 24h</h2>
          <a href={`tel:+${site.whatsapp.emergencial}`} className="text-lg hover:text-primary">(11) 96577-8480</a>
          <a href={`https://wa.me/${site.whatsapp.emergencial}`} target="_blank" rel="noopener" className="btn-teslla btn-teslla--claro my-2">WhatsApp 24h</a>
          <p className="text-white/80">{site.endereco}</p>
        </div>
        <div className={card}>
          <Icone nome="whatsapp" className="mb-2 h-10 w-10 text-primary" />
          <h2 className="text-xl font-semibold">Transporte de Medicamentos</h2>
          <a href={`https://api.whatsapp.com/send?phone=${site.whatsapp.comercial}&text=${encodeURIComponent(site.whatsapp.mensagem)}`} target="_blank" rel="noopener" className="text-lg text-dark hover:text-primary">(11) 93490-9698</a>
        </div>
      </Ct>
    </section>
  );
}

export function Mapa() {
  const site = getSite();
  return <iframe src={site.mapaEmbed} title="Mapa: Teslla Logística" className="block h-[450px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />;
}

export function FormCotacaoBloco(b: B<'form-cotacao'>) {
  return (
    <section className="secao">
      <Ct className="max-w-4xl">
        <Titulo eyebrow={b.eyebrow} titulo={b.titulo} centro />
        <div className="bg-white p-6 shadow-quote md:p-10"><FormCotacao /></div>
      </Ct>
    </section>
  );
}
