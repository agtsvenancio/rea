/* Envio do formulário de contato para /enviar.php (substitui o JS do Contact Form 7). */
document.querySelectorAll('form.wpcf7-form').forEach(function (form) {
  var out = form.querySelector('.wpcf7-response-output');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.querySelectorAll('.wpcf7-not-valid-tip').forEach(function (n) { n.remove(); });
    form.querySelectorAll('.wpcf7-not-valid').forEach(function (n) { n.classList.remove('wpcf7-not-valid'); });
    form.setAttribute('data-status', 'submitting'); form.classList.add('submitting');
    fetch(form.action, { method: 'POST', body: new FormData(form) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        form.classList.remove('submitting');
        var st = d.ok ? 'sent' : (d.erros ? 'invalid' : 'failed');
        form.setAttribute('data-status', st); form.className = form.className.replace(/\b(init|sent|invalid|failed)\b/g, '') + ' ' + st;
        Object.keys(d.erros || {}).forEach(function (k) {
          var el = form.querySelector('[name="' + k + '"]'); if (!el) return;
          el.classList.add('wpcf7-not-valid'); el.setAttribute('aria-invalid', 'true');
          var tip = document.createElement('span'); tip.className = 'wpcf7-not-valid-tip'; tip.textContent = d.erros[k];
          el.parentNode.appendChild(tip);
        });
        if (out) { out.textContent = d.mensagem || ''; out.setAttribute('aria-hidden', 'false'); }
        if (d.ok) form.reset();
      })
      .catch(function () {
        form.classList.remove('submitting'); form.setAttribute('data-status', 'failed');
        if (out) { out.textContent = 'Ocorreu um erro ao tentar enviar sua mensagem. Tente novamente mais tarde.'; out.setAttribute('aria-hidden', 'false'); }
      });
  });
});
