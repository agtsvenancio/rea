// Padrão de título de seção do site: eyebrow (vermelho) + título (H2).
export default function Titulo({ eyebrow, titulo, claro = false, centro = false, as: Tag = 'h2', className = '' }:
  { eyebrow?: string; titulo?: string; claro?: boolean; centro?: boolean; as?: 'h2' | 'h3'; className?: string }) {
  if (!eyebrow && !titulo) return null;
  return (
    <div className={`mb-8 ${centro ? 'text-center' : ''} ${className}`}>
      {eyebrow && <p className={`eyebrow ${claro ? '!text-white' : ''}`}>{eyebrow}</p>}
      {titulo && <Tag className={`titulo-secao ${claro ? '!text-white' : ''}`}>{titulo}</Tag>}
    </div>
  );
}
