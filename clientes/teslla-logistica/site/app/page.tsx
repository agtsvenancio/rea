import PaginaBlocos from '@/components/paginas/PaginaBlocos';
import { getPagina } from '@/lib/conteudo';
import { metadados } from '@/lib/seo';

export const metadata = metadados(getPagina('home').seo, '/');

export default function Home() {
  const pagina = getPagina('home');
  return (
    <>
      <h1 className="sr-only">{pagina.seo.title}</h1>
      <PaginaBlocos pagina={pagina} />
    </>
  );
}
