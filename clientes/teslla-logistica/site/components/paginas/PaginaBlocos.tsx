import PageHero from '@/components/layout/PageHero';
import RenderBlocos from '@/components/blocos/Render';
import type { Pagina } from '@/lib/types';

export default function PaginaBlocos({ pagina }: { pagina: Pagina }) {
  return (
    <>
      {pagina.hero !== null && (
        <PageHero titulo={pagina.titulo} fundo={pagina.hero?.fundo} imagem={pagina.hero?.imagem} trilha={[{ texto: 'Início', href: '/' }, { texto: pagina.titulo }]} />
      )}
      <RenderBlocos blocos={pagina.secoes} />
    </>
  );
}
