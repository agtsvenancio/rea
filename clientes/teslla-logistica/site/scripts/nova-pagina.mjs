// Cria uma página nova a partir dos modelos.
//   npm run nova -- solucao "Transporte de Hemoderivados" transporte-de-medicamentos
//   npm run nova -- pagina "Transporte de Medicamentos em Campinas"
import fs from 'node:fs';
const [tipo, titulo, pai] = process.argv.slice(2);
if (!['solucao', 'pagina'].includes(tipo) || !titulo) {
  console.log('Uso: npm run nova -- solucao "Título" [slug-do-pai]   |   npm run nova -- pagina "Título"');
  process.exit(1);
}
const slug = titulo.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const pasta = tipo === 'solucao' ? 'content/solucoes' : 'content/paginas';
const destino = `${pasta}/${slug}.json`;
if (fs.existsSync(destino)) { console.error(`Já existe: ${destino}`); process.exit(1); }
const d = JSON.parse(fs.readFileSync(`content/_modelos/${tipo}.json`, 'utf8'));
Object.assign(d, { titulo, slug });
d.seo.title = `${titulo} | Teslla Logística`;
if (tipo === 'solucao') d.pai = pai || null;
fs.writeFileSync(destino, JSON.stringify(d, null, 2) + '\n');
const url = tipo === 'solucao' ? (pai ? `/solucoes/${pai}/${slug}/` : `/solucoes/${slug}/`) : `/${slug}/`;
console.log(`Criado ${destino}\nEdite os textos e rode "npm run dev". A página fica em ${url}`);
