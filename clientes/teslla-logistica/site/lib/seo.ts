import type { Metadata } from 'next';
import { getSite } from './conteudo';
import type { Seo } from './types';

export function metadados(seo: Seo, caminho: string): Metadata {
  const site = getSite();
  const url = site.url + caminho;
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url },
    openGraph: { title: seo.title, description: seo.description, url, siteName: site.nome, locale: 'pt_BR', type: 'website', images: seo.ogImage ? [{ url: site.url + seo.ogImage }] : undefined },
    twitter: { card: 'summary_large_image' },
  };
}

export function jsonLd(dados: object) {
  return { __html: JSON.stringify(dados) };
}
