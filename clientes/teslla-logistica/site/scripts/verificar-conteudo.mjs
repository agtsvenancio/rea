// Confere o conteúdo antes do build: JSON válido, imagens existentes, blocos compartilhados e pais de soluções.
import fs from 'node:fs';
import path from 'node:path';
let erros = 0;
const erro = (m) => { erros++; console.error('✗ ' + m); };
const arquivos = ['content/site.json', ...['paginas', 'solucoes', 'blocos'].flatMap((d) => fs.readdirSync(`content/${d}`).map((f) => `content/${d}/${f}`))];
const solucoes = new Set(fs.readdirSync('content/solucoes').map((f) => f.replace('.json', '')));
const blocos = new Set(fs.readdirSync('content/blocos').map((f) => f.replace('.json', '')));
for (const f of [...arquivos, ...fs.readdirSync('content/blog').map((x) => `content/blog/${x}`)]) {
  const txt = fs.readFileSync(f, 'utf8');
  if (f.endsWith('.json')) {
    let d; try { d = JSON.parse(txt); } catch (e) { erro(`${f}: JSON inválido (${e.message})`); continue; }
    if (f.includes('/solucoes/') && d.pai && !solucoes.has(d.pai)) erro(`${f}: pai "${d.pai}" não existe`);
    if (f.includes('/solucoes/') && d.slug + '.json' !== path.basename(f)) erro(`${f}: o slug precisa ser igual ao nome do arquivo`);
    for (const m of txt.matchAll(/"id":\s*"([^"]+)"/g)) if (!blocos.has(m[1])) erro(`${f}: bloco compartilhado "${m[1]}" não existe`);
  }
  for (const m of txt.matchAll(/["(](\/(?:images|videos)\/[^")]+)/g)) if (!fs.existsSync('public' + m[1])) erro(`${f}: arquivo ${m[1]} não existe em public/`);
}
console.log(erros ? `\n${erros} problema(s) encontrado(s).` : '✓ Conteúdo ok');
process.exit(erros ? 1 : 0);
