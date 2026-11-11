import { getBlocoCompartilhado } from '@/lib/conteudo';
import type { Bloco } from '@/lib/types';
import HeroSlider from './HeroSlider';
import * as S from './Simples';

// Renderiza a lista de blocos de uma página. Para um tipo novo, crie o componente e adicione aqui.
export function RenderBloco({ bloco }: { bloco: Bloco }) {
  switch (bloco.tipo) {
    case 'compartilhado': return <RenderBloco bloco={getBlocoCompartilhado(bloco.id)} />;
    case 'hero-slider': return <HeroSlider slides={bloco.slides} />;
    case 'grid-solucoes': return <S.GridSolucoes {...bloco} />;
    case 'sobre': return <S.Sobre {...bloco} />;
    case 'contadores': return <S.Contadores {...bloco} />;
    case 'passos': return <S.Passos {...bloco} />;
    case 'form-atendimento': return <S.FormAtendimentoBloco {...bloco} />;
    case 'faq': return <S.FaqBloco {...bloco} />;
    case 'por-que-nos': return <S.PorQueNos {...bloco} />;
    case 'depoimentos': return <S.Depoimentos {...bloco} />;
    case 'blog': return <S.BlogBloco {...bloco} />;
    case 'infraestrutura': return <S.Infraestrutura {...bloco} />;
    case 'logos': return <S.Logos {...bloco} />;
    case 'icones': return <S.Icones {...bloco} />;
    case 'numerados': return <S.Numerados {...bloco} />;
    case 'estrutura': return <S.Estrutura {...bloco} />;
    case 'lista-check': return <S.ListaCheck {...bloco} />;
    case 'galeria': return <S.GaleriaBloco {...bloco} />;
    case 'certificados': return <S.Certificados {...bloco} />;
    case 'cta-inline': return <S.CtaInline {...bloco} />;
    case 'cta-final': return <S.CtaFinal {...bloco} />;
    case 'video': return <S.Video {...bloco} />;
    case 'texto': return <S.Texto {...bloco} />;
    case 'canais-contato': return <S.CanaisContato />;
    case 'mapa': return <S.Mapa />;
    case 'form-cotacao': return <S.FormCotacaoBloco {...bloco} />;
    default: return null;
  }
}

export default function RenderBlocos({ blocos }: { blocos?: Bloco[] }) {
  return <>{blocos?.map((b, i) => <RenderBloco key={i} bloco={b} />)}</>;
}
