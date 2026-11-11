'use client';
import { useEffect, useState } from 'react';
import Icone from '@/components/ui/Icone';
import ModalCotacao from '@/components/forms/ModalCotacao';

// Botões fixos: WhatsApp, voltar ao topo e "Solicitar Cotação" (abre o modal).
export default function Flutuantes({ whatsapp }: { whatsapp: string }) {
  const [topo, setTopo] = useState(false);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const f = () => setTopo(window.scrollY > 400);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <>
      <div className="fixed bottom-24 right-4 z-30 flex flex-col gap-3 md:bottom-6">
        <a href={whatsapp} target="_blank" rel="noopener" aria-label="Conversar no WhatsApp" className="grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-card transition hover:scale-105">
          <Icone nome="whatsapp" className="h-8 w-8" />
        </a>
        <button onClick={() => window.scrollTo({ top: 0 })} aria-label="Voltar ao topo" className={`grid h-[45px] w-[45px] place-items-center self-center rounded-[5px] bg-primary text-white transition ${topo ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          <Icone nome="topo" className="h-5 w-5" />
        </button>
      </div>
      <button onClick={() => setModal(true)} className="fixed inset-x-0 bottom-0 z-30 bg-primary py-4 font-heading text-lg font-bold text-white md:inset-x-auto md:bottom-3 md:left-1/2 md:-translate-x-1/2 md:rounded-full md:px-7 md:shadow-[0_4px_12px_rgba(0,0,0,0.15)] md:transition md:hover:-translate-y-0.5 md:hover:-translate-x-1/2">
        Solicitar Cotação
      </button>
      {modal && <ModalCotacao onFechar={() => setModal(false)} />}
    </>
  );
}
