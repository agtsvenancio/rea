import os, re, shutil, sys, urllib.parse
SRC, OUT = sys.argv[1], sys.argv[2]
DOM = 'fastarcondicionado.seuprojeto.online'
if os.path.exists(OUT): shutil.rmtree(OUT)
shutil.copytree(os.path.join(SRC, DOM), OUT)
# google fonts -> /assets/google-fonts
gf = os.path.join(OUT, 'assets', 'google-fonts'); os.makedirs(gf, exist_ok=True)
for fn in os.listdir(os.path.join(SRC, 'fonts.googleapis.com')):
    fam = re.search(r'family=([A-Za-z]+)', fn).group(1).lower()
    css = open(os.path.join(SRC, 'fonts.googleapis.com', fn), encoding='utf-8').read()
    css = re.sub(r'url\((?:\.\./)?fonts\.gstatic\.com/', 'url(', css)
    css = re.sub(r'url\(https://fonts\.gstatic\.com/', 'url(', css)
    open(os.path.join(gf, fam + '.css'), 'w', encoding='utf-8').write(css)
if os.path.isdir(os.path.join(SRC, 'fonts.gstatic.com')):
    shutil.copytree(os.path.join(SRC, 'fonts.gstatic.com'), gf, dirs_exist_ok=True)
# strip ?ver from file names
EXT = r'css|js|png|jpe?g|webp|gif|svg|woff2?|ttf|eot|json|ico|mp4'
for root, _, files in os.walk(OUT):
    for f in files:
        if '@' in f:
            base = re.match(r'(.+?\.(?:%s))@' % EXT, f, re.I)
            if not base: print('??', f); continue
            dst = os.path.join(root, base.group(1))
            src = os.path.join(root, f)
            if os.path.exists(dst): os.remove(src)
            else: os.rename(src, dst)
def fix(txt, path):
    rel = os.path.relpath(OUT, os.path.dirname(path)).replace(os.sep, '/')
    # google fonts links produced by wget -k
    txt = re.sub(r'(?:\.\./)+fonts\.googleapis\.com/css@family=([A-Za-z]+)[^"\']*', lambda m: rel + '/assets/google-fonts/' + m.group(1).lower() + '.css', txt)
    txt = re.sub(r'https://fonts\.googleapis\.com/css\?family=([A-Za-z]+)[^"\']*', lambda m: '/assets/google-fonts/' + m.group(1).lower() + '.css', txt)
    # ?ver suffixes on local refs (wget renamed ? -> @)
    txt = re.sub(r'(\.(?:%s))@[^"\'\s)<>]*' % EXT, r'\1', txt, flags=re.I)
    # absolute domain -> root relative
    txt = txt.replace('https://' + DOM + '/', '/').replace('http://' + DOM + '/', '/').replace('http:\\/\\/' + DOM + '\\/', '\\/').replace('https:\\/\\/' + DOM + '\\/', '\\/')
    txt = txt.replace('https://' + DOM, '/').replace('https:\\/\\/' + DOM, '\\/')
    txt = txt.replace('https%3A%2F%2F' + DOM, '')
    if path.endswith('.html'):
        import base64, json as _j
        def _fixhash(m):
            raw = urllib.parse.unquote(m.group(1))
            pre, b64 = raw.split('settings=', 1)
            try: data = base64.b64decode(b64).decode('utf-8')
            except Exception: return m.group(0)
            data = data.replace('https:\\/\\/' + DOM, '').replace('https://' + DOM, '')
            enc = base64.b64encode(data.encode('utf-8')).decode()
            return 'data-e-action-hash="' + urllib.parse.quote(pre + 'settings=' + enc, safe='#') + '"'
        txt = re.sub(r'data-e-action-hash="([^"]*settings%3D[^"]*)"', _fixhash, txt)
        txt = re.sub(r'href="((?:\.\./)*)index\.html', lambda m: 'href="' + (m.group(1) or './'), txt)
        txt = re.sub(r'href="([^"#:]*/)index\.html', r'href="\1', txt)
        # drop WP-only head links
        txt = re.sub(r'<link rel=["\'](?:alternate|EditURI|https://api\.w\.org/|shortlink|profile)["\'][^>]*>\n?', '', txt)
        txt = re.sub(r'<link rel="https://api\.w\.org/"[^>]*>\n?', '', txt)
    return txt
for root, _, files in os.walk(OUT):
    for f in files:
        if f.endswith(('.html', '.css', '.js')):
            p = os.path.join(root, f)
            try: t = open(p, encoding='utf-8').read()
            except UnicodeDecodeError: continue
            n = fix(t, p)
            if n != t: open(p, 'w', encoding='utf-8').write(n)
# contato: CF7 -> enviar.php
for root, _, files in os.walk(OUT):
    for f in files:
        if f.endswith('.png.html') or f.endswith('.jpg.html'): os.remove(os.path.join(root, f))
for root, _, files in os.walk(OUT):
    for f in files:
        if not f.endswith('.html'): continue
        p = os.path.join(root, f); t = open(p, encoding='utf-8').read(); n = t
        if 'wpcf7-form' in t:
            n = re.sub(r'<script[^>]*id="(?:contact-form-7|swv)-js"[^>]*></script>\n?', '', n)
            n = re.sub(r'<script[^>]*id="contact-form-7-js-(?:translations|before)"[^>]*>.*?</script>\n?', '', n, flags=re.S)
            n = re.sub(r'<form action="[^"]*"', '<form action="/enviar.php"', n)
            n = n.replace('<fieldset class="hidden-fields-container">', '<input type="text" name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true"><fieldset class="hidden-fields-container">')
            n = re.sub(r'(<input class="wpcf7-form-control wpcf7-submit has-spinner"[^>]*/>)', r'\1<span class="wpcf7-spinner"></span>', n)
            n = n.replace('</body>', '<script src="/assets/form-contato.js"></script>\n</body>')
        if n != t: open(p, 'w', encoding='utf-8').write(n)
EXTRAS = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'hostinger')
shutil.copytree(EXTRAS, OUT, dirs_exist_ok=True)
# 404
p404 = os.path.join(OUT, '404-teste-inexistente', 'index.html')
if os.path.exists(p404):
    t = open(p404, encoding='utf-8').read().replace('../', '/')
    open(os.path.join(OUT, '404.html'), 'w', encoding='utf-8').write(t)
    shutil.rmtree(os.path.dirname(p404))
print('ok')
