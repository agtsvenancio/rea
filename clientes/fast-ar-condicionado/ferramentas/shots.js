const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const DOM = 'fastarcondicionado.seuprojeto.online';
const CA = process.argv[2], OUTDIR = process.argv[3], MODE = process.argv[4]; // MODE: orig|mirror
const pages = ['/', '/sobre-nos/', '/servicos/', '/galeria/', '/faq/', '/contato/', '/servicos/instalacao-de-ar-condicionado/', '/servicos/limpeza-de-ar-condicionado/', '/servicos/manutencao-preventiva/'];
const types = { css: 'text/css', js: 'application/javascript', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', svg: 'image/svg+xml', woff2: 'font/woff2', woff: 'font/woff', json: 'application/json' };
(async () => {
  const b = await chromium.launch();
  for (const [name, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1 });
    if (MODE === 'orig') await ctx.route(u => u.hostname === DOM, async route => {
      const url = route.request().url();
      try {
        const body = execFileSync('curl', ['-sS', '--cacert', CA, '-L', url], { maxBuffer: 64e6 });
        const ext = (url.split('?')[0].split('.').pop() || '').toLowerCase();
        await route.fulfill({ status: 200, body, contentType: types[ext] || 'text/html; charset=utf-8' });
      } catch (e) { await route.abort(); }
    });
    for (const p of pages) {
      const page = await ctx.newPage();
      const base = MODE === 'orig' ? 'https://' + DOM : 'http://localhost:8080';
      await page.goto(base + p, { waitUntil: 'networkidle', timeout: 120000 });
      for (let y = 0; y < 20000; y += 500) { await page.mouse.wheel(0, 500); await page.waitForTimeout(60); }
      await page.addStyleTag({ content: '.elementor-invisible{visibility:visible!important;opacity:1!important;animation:none!important}' });
      await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(1200);
      const slug = p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '__');
      await page.screenshot({ path: `${OUTDIR}/${slug}--${name}.png`, fullPage: true });
      await page.close();
    }
    await ctx.close();
  }
  await b.close();
})();
