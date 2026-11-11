import Link from 'next/link';
import { getSite } from '@/lib/conteudo';
import Icone from '@/components/ui/Icone';

export default function Footer() {
  const site = getSite();
  return (
    <footer className="border-t border-line bg-white">
      <div className="container grid max-w-container gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <img src={site.logoRodape} alt={site.nome} width={180} height={48} className="mb-5 h-12 w-auto" />
          <p className="max-w-sm">{site.tagline}</p>
          <ul className="mt-6 flex gap-3">
            {site.redes.map((r) => (
              <li key={r.href}>
                <a href={r.href} target="_blank" rel="noopener" title={r.nome} className="grid h-[45px] w-[45px] place-items-center border border-line text-primary transition hover:bg-primary hover:text-white">
                  <Icone nome={r.icone} className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
          <address className="mt-6 space-y-1 not-italic">
            <span className="flex items-start gap-2"><Icone nome="local" className="mt-1 h-4 w-4 shrink-0 text-primary" />{site.endereco}</span>
            {site.telefones.map((t) => <a key={t.href} href={t.href} className="flex items-center gap-2 hover:text-primary"><Icone nome="telefone" className="h-4 w-4 text-primary" />{t.numero}</a>)}
          </address>
        </div>
        {site.rodape.map((col) => (
          <div key={col.titulo}>
            <p className="mb-4 font-heading text-[22px] font-bold text-dark">{col.titulo}</p>
            <ul className="space-y-2">
              {col.links.map((l) => <li key={l.href}><Link href={l.href} className="transition hover:text-primary">{l.texto}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line py-6 text-center text-sm">
        {site.copyright.replace('{ano}', String(new Date().getFullYear()))}
      </div>
    </footer>
  );
}
