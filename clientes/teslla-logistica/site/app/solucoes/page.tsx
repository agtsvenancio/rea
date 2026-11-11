import PaginaBlocos from '@/components/paginas/PaginaBlocos';
import { getPagina } from '@/lib/conteudo';
import { metadados } from '@/lib/seo';

export const metadata = metadados(getPagina('solucoes').seo, '/solucoes/');

export default function Solucoes() {
  return <PaginaBlocos pagina={getPagina('solucoes')} />;
}
