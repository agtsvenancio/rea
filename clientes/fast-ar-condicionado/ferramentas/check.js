const { chromium } = require('playwright');
const pages = ['/', '/sobre-nos/', '/servicos/', '/galeria/', '/faq/', '/contato/', '/servicos/instalacao-de-ar-condicionado/', '/servicos/limpeza-de-ar-condicionado/', '/servicos/manutencao-preventiva/'];
(async () => {
  const b = await chromium.launch();
  const missing = new Set(), ext = new Set(), errs = new Set();
  for (const vp of [{width:1440,height:900},{width:390,height:844}]) {
  const ctx = await b.newContext({ viewport: vp });
  for (const p of pages) {
    const page = await ctx.newPage();
    page.on('response', r => { if (r.status() >= 400 && r.url().startsWith('http://localhost')) missing.add(r.status()+' '+r.url()); });
    page.on('request', r => { const u = r.url(); if (!u.startsWith('http://localhost') && !u.startsWith('data:')) ext.add(u.split('?')[0]); });
    page.on('pageerror', e => errs.add(p + ' ' + e.message));
    await page.goto('http://localhost:8080' + p, { waitUntil: 'networkidle' });
    for (let y = 0; y < 15000; y += 600) { await page.mouse.wheel(0, 600); await page.waitForTimeout(80); }
    await page.waitForTimeout(800);
    await page.close();
  }}
  console.log('MISSING', [...missing].join('\n'));
  console.log('EXTERNAL', [...ext].join('\n'));
  console.log('ERRORS', [...errs].join('\n'));
  await b.close();
})();
