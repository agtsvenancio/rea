import Link from 'next/link';

// Cabeçalho das páginas internas: imagem de fundo escurecida, H1 e breadcrumb.
export default function PageHero({ titulo, fundo, imagem, trilha }:
  { titulo: string; fundo?: string | null; imagem?: string | null; trilha: { texto: string; href?: string }[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-dark py-20 lg:py-[120px]">
      {fundo && <img src={fundo} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />}
      {imagem && <img src={imagem} alt="" className="absolute inset-y-0 right-0 -z-10 hidden h-full w-[60%] object-cover object-top lg:block" />}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/10" />
      <div className="container max-w-container">
        <h1 className="max-w-2xl font-heading text-[40px] font-semibold leading-[1.15] text-white md:text-[56px] lg:text-[80px] lg:leading-[1.2]">{titulo}</h1>
        <nav aria-label="Você está em" className="mt-4 text-white">
          <ol className="flex flex-wrap items-center gap-1.5">
            {trilha.map((t, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>»</span>}
                {t.href ? <Link href={t.href} className="hover:text-primary">{t.texto}</Link> : <span aria-current="page">{t.texto}</span>}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
