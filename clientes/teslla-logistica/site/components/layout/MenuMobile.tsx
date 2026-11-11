'use client';
import Link from 'next/link';
import { useState } from 'react';
import Icone from '@/components/ui/Icone';
import type { Link as TLink } from '@/lib/types';

export default function MenuMobile({ menu, whatsapp, rotuloWhatsapp, telefones }:
  { menu: (TLink & { filhos?: TLink[] })[]; whatsapp: string; rotuloWhatsapp: string; telefones: { numero: string; href: string }[] }) {
  const [aberto, setAberto] = useState(false);
  const fechar = () => setAberto(false);
  return (
    <div className="lg:hidden">
      <button onClick={() => setAberto(true)} aria-label="Abrir menu" className="p-2 text-dark"><Icone nome="menu" className="h-7 w-7" /></button>
      <div className={`fixed inset-0 z-50 bg-dark/60 transition-opacity ${aberto ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={fechar} />
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[300px] max-w-[85vw] flex-col bg-white transition-transform ${aberto ? 'translate-x-0' : '-translate-x-full'}`} aria-hidden={!aberto}>
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="font-heading text-lg font-bold text-dark">Menu</span>
          <button onClick={fechar} aria-label="Fechar menu"><Icone nome="fechar" className="h-6 w-6" /></button>
        </div>
        <ul className="flex-1 overflow-y-auto px-5 py-3">
          {menu.map((item) => (
            <li key={item.href} className="border-b border-line/60">
              <Link href={item.href} onClick={fechar} className="block py-3 font-nav font-medium text-dark">{item.texto}</Link>
              {item.filhos && (
                <ul className="pb-2 pl-4">
                  {item.filhos.map((f) => <li key={f.href}><Link href={f.href} onClick={fechar} className="block py-1.5 text-sm text-body">{f.texto}</Link></li>)}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="space-y-2 border-t border-line p-5 text-sm">
          {telefones.map((t) => <a key={t.href} href={t.href} className="flex items-center gap-2 text-dark"><Icone nome="telefone" className="h-4 w-4 text-primary" />{t.numero}</a>)}
          <a href={whatsapp} target="_blank" rel="noopener" className="flex items-center gap-2 text-dark"><Icone nome="whatsapp" className="h-4 w-4 text-primary" />{rotuloWhatsapp}</a>
        </div>
      </aside>
    </div>
  );
}
