/** Exportação estática: `npm run build` gera a pasta `out/`, que vai para o public_html da Hostinger. */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
