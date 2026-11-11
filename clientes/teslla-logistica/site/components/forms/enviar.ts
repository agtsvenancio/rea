import site from '@/content/site.json';

export type Campos = Record<string, string>;

// Envia o formulário: (1) manda para o PHP da Hostinger, que dispara o e-mail;
// (2) abre o WhatsApp comercial com os dados já preenchidos.
// Se o PHP não estiver configurado, o WhatsApp abre do mesmo jeito.
export async function enviarFormulario(tipo: string, campos: Campos, rotulos: Record<string, string>) {
  if (campos._site) return; // honeypot anti-spam
  try {
    await fetch(site.formularios.emailEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo, campos, pagina: window.location.href }),
    });
  } catch {
    /* segue para o WhatsApp */
  }
  const linhas = Object.entries(rotulos).filter(([k]) => campos[k]).map(([k, r]) => `*${r}:* ${campos[k]}`);
  const texto = `Olá! ${tipo} (enviado pelo site)\n\n${linhas.join('\n')}`;
  window.open(`https://api.whatsapp.com/send?phone=${site.whatsapp.comercial}&text=${encodeURIComponent(texto)}`, '_blank');
}

export const lerForm = (form: HTMLFormElement): Campos =>
  Object.fromEntries(Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v).trim()]));
