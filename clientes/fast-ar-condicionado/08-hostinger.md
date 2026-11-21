# 08. Publicar na Hostinger

## Opção A (recomendada agora): subir a cópia estática

É o caminho mais rápido para o site voltar ao ar. Funciona em qualquer plano da Hostinger (precisa de PHP só para o formulário, que todos os planos têm).

1. Baixe `fast-ar-condicionado/fast-ar-condicionado-espelho.zip` dos arquivos do projeto e descompacte.
2. No hPanel, abra **Sites → Gerenciador de arquivos** do domínio e entre em `public_html/`.
3. Envie **todo o conteúdo** da pasta `public_html/` do zip (inclusive o arquivo oculto `.htaccess`). Dá para subir um zip e usar "Extrair" no próprio gerenciador.
4. Em **Segurança → SSL**, ative o certificado gratuito.
5. Em **E-mails**, crie a caixa `site@<domínio>` (remetente) ou ajuste `REMETENTE` e `DESTINO` no topo de `enviar.php`. Sem um remetente do próprio domínio os e-mails tendem a cair no spam.
6. Teste: abra todas as páginas, o menu no celular, e envie o formulário em `/contato/`.

Estrutura do pacote:

```
public_html/
  .htaccess            HTTPS, 404, redirecionamentos, cache
  index.html           Home
  sobre-nos/  servicos/  servicos/<3 serviços>/  galeria/  faq/  contato/
  404.html
  enviar.php           recebe o formulário de contato
  assets/form-contato.js
  assets/google-fonts/ Sora e Manrope
  wp-content/          CSS/JS do Elementor e dos plugins + uploads (todas as 130 imagens da biblioteca)
  wp-includes/         jQuery e utilitários do WordPress usados pelo front
```

Os nomes `wp-content`/`wp-includes` foram mantidos para que o CSS e o JS do Elementor encontrem seus arquivos sem alteração. Não há WordPress rodando.

### Editar textos na cópia estática

Os textos estão no HTML de cada página (`<pasta>/index.html`). Dá para editar no próprio gerenciador de arquivos da Hostinger. Cabeçalho e rodapé se repetem em todos os HTML, então uma mudança neles precisa ser feita em todos (ou com buscar/substituir).

### Criar uma página nova

O jeito mais fiel é duplicar uma página existente do mesmo template (ver [03-templates.md](03-templates.md)), por exemplo `servicos/limpeza-de-ar-condicionado/` → `servicos/conserto-de-ar-condicionado/`, e trocar textos e imagens. O CSS de cada página está em `wp-content/uploads/elementor/css/post-<ID>.css`, referenciado no `<head>`; a página duplicada continua usando o mesmo arquivo, então não precisa de CSS novo.

## Opção B: voltar para WordPress + Elementor na Hostinger

Se o cliente quiser continuar editando no painel:

1. Instalar WordPress pela Hostinger, tema **Hello Elementor**, **Elementor Pro** (licença do cliente/agência), **The Plus Addons for Elementor** e **Contact Form 7**.
2. Recriar o kit global com os valores de [06-design-system.md](06-design-system.md) (cores e tipografia), subir as imagens da pasta `wp-content/uploads/` do zip e remontar cabeçalho, rodapé, 404 e as 9 páginas usando os prints e os textos de [conteudo/](conteudo/).
3. Configurar Yoast ou Rank Math e corrigir os itens de [07-seo-e-problemas.md](07-seo-e-problemas.md) nesse momento.

Antes disso, vale perguntar ao cliente se ainda há acesso ao servidor CyberPanel antigo: se houver, um backup de lá (banco + `wp-content`) devolve o painel do Elementor intacto e economiza a remontagem.

## Ferramentas

[ferramentas/](ferramentas/) tem os scripts usados aqui, reaproveitáveis em outro site WordPress/Elementor:

- `build.py <espelho-wget> <saida>`: monta a versão estática (renomeia `?ver=`, reescreve links absolutos e base64 do lightbox, troca o CF7 por `enviar.php`, copia `hostinger/`).
- `check.js`: abre todas as páginas em desktop e celular servidas em `localhost:8080` e lista 404, requisições externas e erros de JS.
- `fetch-missing.sh`: baixa do site original os arquivos que o `check.js` acusou como 404 (chunks do Elementor).
- `shots.js`: prints de página inteira do original e da cópia, para comparar.
- `extract.js`: gera os arquivos de [conteudo/](conteudo/) e o [sitemap.json](sitemap.json).
