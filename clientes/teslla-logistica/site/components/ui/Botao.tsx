import Link from 'next/link';
import { resolverHref } from '@/lib/conteudo';
import type { Botao as TBotao } from '@/lib/types';

// Botão padrão da Teslla: vermelho, cantos retos, hover preenche de baixo para cima com o escuro.
export default function Botao({ botao, variante = 'primario', className = '' }: { botao: TBotao; variante?: 'primario' | 'claro'; className?: string }) {
  const href = resolverHref(botao.href);
  const externo = /^https?:/.test(href);
  const cls = `btn-teslla ${variante === 'claro' ? 'btn-teslla--claro' : ''} ${className}`;
  return externo ? (
    <a href={href} target="_blank" rel="noopener" className={cls}>{botao.texto}</a>
  ) : (
    <Link href={href} className={cls}>{botao.texto}</Link>
  );
}
