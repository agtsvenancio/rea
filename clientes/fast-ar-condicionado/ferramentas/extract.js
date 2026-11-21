const { chromium } = require('playwright');
const fs = require('fs');
const pages = ['/', '/sobre-nos/', '/servicos/', '/galeria/', '/faq/', '/contato/', '/servicos/instalacao-de-ar-condicionado/', '/servicos/limpeza-de-ar-condicionado/', '/servicos/manutencao-preventiva/', '/404.html'];
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const sitemap = [];
  for (const p of pages) {
    await page.goto('http://localhost:8080' + p, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: '.elementor-invisible{visibility:visible!important;opacity:1!important;animation:none!important}' });
    const r = await page.evaluate(() => {
      const lines = []; const imgs = new Set(); const sections = [];
      const root = document.querySelector('[data-elementor-type="wp-page"],[data-elementor-type="error-404"]');
      const txt = el => el.textContent.replace(/\s+/g, ' ').trim();
      const tops = root ? root.querySelectorAll(':scope > .e-con, :scope > .elementor-element') : [];
      tops.forEach((sec, i) => {
        const bg = getComputedStyle(sec).backgroundImage; const bgc = getComputedStyle(sec).backgroundColor;
        lines.push(`\n<!-- seção ${i + 1} · ${sec.dataset.id}${bg && bg !== 'none' ? ' · fundo: ' + bg.replace(/.*\/wp-content/, '/wp-content').replace(/["')]/g, '') : ''} · cor de fundo ${bgc} -->`);
        sections.push(sec.dataset.id);
        const seen = new Set();
        const walk = el => {
          const cs = getComputedStyle(el);
          if ((cs.display === 'none' && !el.closest('.elementor-widget-tp-accordion')) || cs.visibility === 'hidden') return;
          if (el.matches('.elementor-widget-tp-accordion')) { lines.push('_[acordeão de FAQ]_'); el.querySelectorAll('.theplus-accordion-item').forEach(it => { const q = it.querySelector('.plus-accordion-header'); const a = it.querySelector('.plus-accordion-content'); lines.push('**' + txt(q) + '**'); lines.push(a.textContent.replace(/[ \t]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim()); }); return; }
          if (el.matches('.elementor-counter-number')) { lines.push((el.dataset.fromValue || '') && el.dataset.toValue); return; }
          if (el.matches('.swiper-slide-duplicate, script, style, noscript, svg')) return;
          const tag = el.tagName;
          if (/^H[1-6]$/.test(tag)) { const t = txt(el); if (t) lines.push('#'.repeat(+tag[1]) + ' ' + t); return; }
          if (el.matches('a.elementor-button, .elementor-button-wrapper a')) { lines.push(`[Botão: ${txt(el)}](${el.getAttribute('href')})`); return; }
          if (tag === 'IMG') { const s = (el.currentSrc || el.getAttribute('src') || '').replace(/^.*\/wp-content/, '/wp-content'); imgs.add(s); lines.push(`![${el.alt || ''}](${s})`); return; }
          if (tag === 'IFRAME') { lines.push(`_[iframe: ${el.title || ''} ${el.src.slice(0, 120)}]_`); return; }
          if (el.matches('.elementor-widget-lottie')) { lines.push('_[animação Lottie]_'); return; }
          if (el.matches('.e-gallery-item, .elementor-gallery-item')) { const s = el.getAttribute('href') || ''; imgs.add(s.replace(/^.*\/wp-content/, '/wp-content')); lines.push(`![galeria](${s.replace(/^.*\/wp-content/, '/wp-content')})`); return; }
          if (tag === 'LI') { const t = txt(el); const a = el.querySelector('a'); if (t) lines.push(`- ${t}${a && a.getAttribute('href') && !a.getAttribute('href').startsWith('#') ? ' (' + a.getAttribute('href') + ')' : ''}`); return; }
          if (tag === 'FORM') { lines.push('_[formulário: ' + [...el.querySelectorAll('input:not([type=hidden]),textarea')].map(i => i.placeholder || i.value || i.name).filter(Boolean).join(' | ') + ']_'); return; }
          if (tag === 'P' || (el.children.length === 0 && el.textContent.trim())) {
            const t = el.textContent.replace(/[ \t]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim();
            if (t && !seen.has(t)) { seen.add(t); lines.push(t); }
            if (tag === 'P') return;
          }
          if (el.matches('.elementor-widget-n-carousel, .elementor-widget-n-accordion, .elementor-widget-nested-accordion, .elementor-widget-tp-accordion, .elementor-widget-n-tabs')) lines.push('_[' + (el.className.match(/elementor-widget-([a-z0-9-]+)/) || [])[1] + ']_');
          for (const c of el.children) walk(c);
          if (el.childNodes.length && el.children.length) for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim().length > 2) { const t = n.textContent.trim(); if (!seen.has(t)) { seen.add(t); lines.push(t); } }
        };
        walk(sec);
      });
      const md = document.querySelector('meta[name=description]');
      const h1 = document.querySelector('h1');
      return { title: document.title, description: md ? md.content : null, h1: h1 ? txt(h1) : null, h1count: document.querySelectorAll('h1').length, body: lines.join('\n'), imgs: [...imgs], sections, widgets: [...new Set([...document.querySelectorAll('[data-elementor-type="wp-page"] .elementor-widget')].map(w => (w.className.match(/elementor-widget-([a-z0-9-]+)/) || [])[1]))] };
    });
    const slug = p === '/' ? 'home' : p === '/404.html' ? '404' : p.replace(/^\/|\/$/g, '').replace(/\//g, '__');
    fs.writeFileSync(`${OUT}/${slug}.md`, `# ${r.title}\n\nURL: https://fastarcondicionado.seuprojeto.online${p === '/404.html' ? '/(qualquer URL inexistente)' : p}\nMeta description: ${r.description || '(nenhuma)'}\n\n---\n${r.body.trim()}\n`);
    sitemap.push({ url: p, slug, title: r.title, description: r.description, h1: r.h1, h1_count: r.h1count, sections: r.sections.length, widgets: r.widgets, images: r.imgs });
  }
  fs.writeFileSync(`${OUT}/../sitemap.json`, JSON.stringify(sitemap, null, 2));
  await b.close();
})();
