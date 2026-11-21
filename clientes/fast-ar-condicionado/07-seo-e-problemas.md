# 07. SEO e problemas encontrados

## Crítico

1. **Certificado SSL inválido.** O site usa um certificado da *Let's Encrypt Staging* (ambiente de teste, cadeia "(STAGING) Baloney Bulgur YE2"), que nenhum navegador aceita. Todo visitante vê "Sua conexão não é particular" e o Google trata o site como inseguro. Na Hostinger, ativar o SSL gratuito no domínio resolve.
2. **Sem domínio próprio.** O site está em `fastarcondicionado.seuprojeto.online`. O e-mail usado é `@fastarcondicionado.com`; vale confirmar com o cliente se esse domínio é dele e publicar lá.
3. **Sem backup e sem acesso ao painel.** A cópia recuperada é o site publicado. O conteúdo editável do Elementor e o banco não são públicos e não puderam ser recuperados.

## SEO

- Nenhum plugin de SEO. **Nenhuma página tem meta description**, Open Graph ou dados estruturados.
- Título da Home é só "Fast Ar"; as internas são "<Página> – Fast Ar". Nenhum título tem cidade ou serviço + região.
- Sem schema `LocalBusiness`/`HVACBusiness` (endereço, telefone, horário), importante para busca local em Mauá/ABC.
- O sitemap nativo publica lixo: `/sample-page/`, `/hello-world/`, `/category/uncategorized/` e `/author/taciara-furtado/` (expõe o usuário administrador).
- Textos alternativos: na Home 15 imagens não têm `alt`; várias outras usam o nome do arquivo como alt ("icon-8.png").
- Imagens pesadas em PNG: `Entre-em-Contato.png` 2,5 MB, várias de 0,8 a 1,2 MB. Na biblioteca há PNGs de 3 a 5 MB (versões "scaled") não usadas nas páginas. Converter para WebP reduziria o site em mais de 70%.
- Sem Google Analytics, GTM, Pixel ou evento nos cliques de WhatsApp: hoje não há como medir conversão.

## Conteúdo e UX

- **Texto de exemplo esquecido** em `/servicos/instalacao-de-ar-condicionado/`, seção "Como funciona": "Tristique magna sit amet purus gravida quis blandit turpis." (lorem ipsum). Mantido na cópia para ser fiel; corrigir.
- **Galeria órfã:** `/galeria/` não está no menu nem no rodapé, e tem só 4 fotos de banco de imagem.
- O telefone no cabeçalho e na página Contato é texto, não link `tel:`; no celular não dá para tocar e ligar.
- Dois links diferentes de Google Maps para o mesmo endereço (`maps.app.goo.gl/dj3skr4fbrgb1Ja98` e `…/DqaNU7FLoEKReriy6`).
- No rodapé o serviço aparece como "Limpeza E Higienização", na página como "Limpeza de Ar-Condicionado".
- Item "Serviços" do menu aponta para `#` em vez de `/servicos/`.
- Os depoimentos usam avatares genéricos (`avatar-1`, `avatar-2`), repetidos.

## Segurança (site atual)

- API REST e `xmlrpc.php` abertos; lista de usuários exposta pelo sitemap de autores.
- O cache do LiteSpeed chegou a servir a página Contato com o `action` do formulário apontando para `/wp-json/wp/v2/pages?per_page=100` (cache gerado a partir de uma URL errada). Na cópia estática isso foi corrigido.

## O que já foi corrigido na cópia recuperada

- Links absolutos para o domínio antigo → relativos (funciona em qualquer domínio).
- Fontes Google servidas localmente (sem chamada a `fonts.googleapis.com`).
- Formulário funcionando via `enviar.php`, com honeypot e proteção contra injeção de cabeçalho.
- `.htaccess`: força HTTPS, 404 própria, redireciona as páginas-lixo do WordPress para a Home, cache e compressão.

Os demais itens (SEO, lorem ipsum, alt, imagens) ficaram como estão para a cópia ser fiel ao original. São a próxima rodada.
