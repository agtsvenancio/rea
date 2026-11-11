import Link from 'next/link';

export default function NaoEncontrada() {
  return (
    <section className="secao text-center">
      <div className="container max-w-container">
        <p className="eyebrow">Erro 404</p>
        <h1 className="titulo-secao mb-4">Página não encontrada</h1>
        <p className="mb-8">O endereço pode ter mudado. Veja nossas soluções ou fale com a gente.</p>
        <Link href="/solucoes/" className="btn-teslla">Ver soluções</Link>
      </div>
    </section>
  );
}
