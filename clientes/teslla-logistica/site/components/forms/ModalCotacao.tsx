'use client';
import { useEffect } from 'react';
import Icone from '@/components/ui/Icone';
import FormCotacao from './FormCotacao';

export default function ModalCotacao({ onFechar }: { onFechar: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onFechar();
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onFechar]);
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 p-4" onClick={onFechar} role="dialog" aria-modal="true" aria-label="Solicitar Cotação">
      <div className="relative mx-auto my-[6vh] max-w-[900px] rounded-2xl bg-white p-6 shadow-[0_0_20px_rgba(0,0,0,0.25)] md:p-10" onClick={(e) => e.stopPropagation()}>
        <button onClick={onFechar} aria-label="Fechar" className="absolute right-4 top-4 text-dark"><Icone nome="fechar" className="h-7 w-7" /></button>
        <p className="titulo-secao mb-6 pr-8">Solicitar Cotação</p>
        <FormCotacao />
      </div>
    </div>
  );
}
