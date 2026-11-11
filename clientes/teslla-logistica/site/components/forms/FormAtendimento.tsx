'use client';
import { useState } from 'react';
import site from '@/content/site.json';
import { enviarFormulario, lerForm } from './enviar';

// Formulário curto (lead): usado em "Solicite um Atendimento" e no Contato.
export default function FormAtendimento({ comSetor = false, botao = 'Solicitar Atendimento' }: { comSetor?: boolean; botao?: string }) {
  const [enviado, setEnviado] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await enviarFormulario('Solicitação de atendimento', lerForm(e.currentTarget), { nome: 'Nome', email: 'E-mail', telefone: 'Telefone', setor: 'Setor' });
    setEnviado(true);
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-3">
      <input name="_site" className="hidden" tabIndex={-1} autoComplete="off" />
      <label className="sr-only" htmlFor="at-nome">Nome completo</label>
      <input id="at-nome" name="nome" required placeholder="Nome completo" className="campo" />
      <label className="sr-only" htmlFor="at-email">E-mail</label>
      <input id="at-email" name="email" type="email" required placeholder="Seu e-mail" className="campo" />
      <label className="sr-only" htmlFor="at-tel">Telefone</label>
      <input id="at-tel" name="telefone" type="tel" required placeholder="Telefone (DDD)" className="campo" />
      {comSetor && (
        <select name="setor" required defaultValue="" className="campo md:col-span-3" aria-label="Setor">
          <option value="" disabled>Setor</option>
          {site.formularios.setores.map((s) => <option key={s}>{s}</option>)}
        </select>
      )}
      <button type="submit" className="btn-teslla justify-center md:col-span-3">{botao}</button>
      {enviado && <p className="text-sm text-dark md:col-span-3" role="status">Recebemos seus dados. Continue a conversa no WhatsApp que acabou de abrir.</p>}
    </form>
  );
}
