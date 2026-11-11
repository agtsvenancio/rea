import Link from 'next/link';
import { getSite, linkWhatsApp } from '@/lib/conteudo';
import Icone from '@/components/ui/Icone';
import MenuMobile from './MenuMobile';
import MenuLink from './MenuLink';

export default function Header() {
  const site = getSite();
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_2px_10px_rgba(15,27,36,0.06)]">
      {/* Barra superior */}
      <div className="hidden h-[42px] bg-dark text-sm text-white md:block">
        <div className="container flex h-full max-w-container items-center justify-between">
          <ul className="flex items-center gap-6">
            {site.telefones.map((t) => (
              <li key={t.href}>
                <a href={t.href} className="flex items-center gap-2 hover:text-primary"><Icone nome="telefone" className="h-3.5 w-3.5 text-primary" />{t.numero}</a>
              </li>
            ))}
            <li>
              <a href={`https://wa.me/${site.whatsapp.emergencial}`} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-primary">
                <Icone nome="whatsapp" className="h-3.5 w-3.5 text-primary" />{site.whatsapp.rotuloEmergencial}
              </a>
            </li>
          </ul>
          <ul className="flex items-center gap-3">
            {site.redes.map((r) => (
              <li key={r.href}><a href={r.href} target="_blank" rel="noopener" title={r.nome} className="text-primary hover:text-white"><Icone nome={r.icone} /></a></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navegação */}
      <nav className="container flex h-[85px] max-w-container items-center justify-between" aria-label="Principal">
        <Link href="/" title={site.nome}><img src={site.logo} alt={site.nome} width={180} height={48} className="h-12 w-auto" /></Link>
        <ul className="hidden items-center gap-8 lg:flex">
          {site.menu.map((item) => (
            <li key={item.href} className="group relative">
              <MenuLink href={item.href}>{item.texto}</MenuLink>
              {item.filhos && (
                <ul className="invisible absolute left-0 top-full min-w-[260px] translate-y-2 bg-white py-2 opacity-0 shadow-card transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.filhos.map((f) => (
                    <li key={f.href}><Link href={f.href} className="block px-5 py-2 font-nav text-[15px] text-dark hover:bg-grey hover:text-primary">{f.texto}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <MenuMobile menu={site.menu} whatsapp={linkWhatsApp(site.whatsapp.emergencial)} rotuloWhatsapp={site.whatsapp.rotuloEmergencial} telefones={site.telefones} />
      </nav>
    </header>
  );
}
