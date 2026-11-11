import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Flutuantes from '@/components/layout/Flutuantes';
import { getSite, linkWhatsApp } from '@/lib/conteudo';
import { jsonLd } from '@/lib/seo';
import './globals.css';

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.nome, template: `%s` },
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const negocio = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness', name: site.nome, url: site.url, image: site.url + site.logo,
    telephone: site.telefones[0].numero, address: { '@type': 'PostalAddress', streetAddress: 'R. Osaka, 1143/1145 - Jardim Japão', addressLocality: 'São Paulo', addressRegion: 'SP', postalCode: '02124-041', addressCountry: 'BR' },
    sameAs: site.redes.map((r) => r.href),
  };
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@500&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(negocio)} />
      </head>
      <body className="pb-14 md:pb-0">
        {site.gtm.map((id) => (
          <Script key={id} id={`gtm-${id}`} strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
          </Script>
        ))}
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Pular para o conteúdo</a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <Flutuantes whatsapp={linkWhatsApp(site.whatsapp.comercial, site.whatsapp.mensagem)} />
      </body>
    </html>
  );
}
