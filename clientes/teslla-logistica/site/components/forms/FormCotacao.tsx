'use client';
import { useState } from 'react';
import { enviarFormulario, lerForm } from './enviar';

const UFS = 'AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'.split(' ');
const ROTULOS = {
  nome: 'Nome', telefone: 'Telefone', cnpj: 'CNPJ', email: 'E-mail',
  ufOrigem: 'Estado de origem', cidadeOrigem: 'Cidade de origem', ufDestino: 'Estado de destino', cidadeDestino: 'Cidade de destino',
  valor: 'Valor da mercadoria', volumes: 'Volumes', peso: 'Peso (kg)', comprimento: 'Comprimento (cm)', largura: 'Largura (cm)', altura: 'Altura (cm)',
};

function Campo({ nome, rotulo, tipo = 'text', obrigatorio = false }: { nome: string; rotulo: string; tipo?: string; obrigatorio?: boolean }) {
  return (
    <div>
      <label htmlFor={`ct-${nome}`} className="rotulo">{rotulo}{obrigatorio && ' *'}</label>
      <input id={`ct-${nome}`} name={nome} type={tipo} required={obrigatorio} className="campo" inputMode={tipo === 'number' ? 'decimal' : undefined} />
    </div>
  );
}
function Uf({ nome, rotulo }: { nome: string; rotulo: string }) {
  return (
    <div>
      <label htmlFor={`ct-${nome}`} className="rotulo">{rotulo} *</label>
      <select id={`ct-${nome}`} name={nome} required defaultValue="" className="campo">
        <option value="" disabled>Selecione</option>
        {UFS.map((u) => <option key={u}>{u}</option>)}
      </select>
    </div>
  );
}

export default function FormCotacao({ onEnviado }: { onEnviado?: () => void }) {
  const [enviado, setEnviado] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await enviarFormulario('Pedido de cotação', lerForm(e.currentTarget), ROTULOS);
    setEnviado(true);
    onEnviado?.();
  }
  const grupo = 'mb-3 mt-6 font-heading text-lg font-bold text-dark first:mt-0';
  return (
    <form onSubmit={onSubmit}>
      <input name="_site" className="hidden" tabIndex={-1} autoComplete="off" />
      <h3 className={grupo}>Dados Pessoais</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Campo nome="nome" rotulo="Nome" obrigatorio /><Campo nome="telefone" rotulo="Telefone" tipo="tel" obrigatorio />
        <Campo nome="cnpj" rotulo="CNPJ" /><Campo nome="email" rotulo="E-mail" tipo="email" obrigatorio />
      </div>
      <h3 className={grupo}>Dados do Trecho</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Uf nome="ufOrigem" rotulo="Estado: Origem" /><Campo nome="cidadeOrigem" rotulo="Cidade: Origem" obrigatorio />
        <Uf nome="ufDestino" rotulo="Estado: Destino" /><Campo nome="cidadeDestino" rotulo="Cidade: Destino" obrigatorio />
      </div>
      <h3 className={grupo}>Dados da Carga</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <Campo nome="valor" rotulo="Valor da Mercadoria" /><Campo nome="volumes" rotulo="Volumes" tipo="number" /><Campo nome="peso" rotulo="Peso (kg)" tipo="number" />
        <Campo nome="comprimento" rotulo="Comprimento (cm)" tipo="number" /><Campo nome="largura" rotulo="Largura (cm)" tipo="number" /><Campo nome="altura" rotulo="Altura (cm)" tipo="number" />
      </div>
      <button type="submit" className="btn-teslla mt-6 w-full justify-center">Solicitar Cotação</button>
      {enviado && <p className="mt-3 text-sm text-dark" role="status">Cotação enviada. Nossa equipe vai continuar o atendimento pelo WhatsApp.</p>}
    </form>
  );
}
