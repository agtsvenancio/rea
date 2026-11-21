# Fast Ar Condicionado: engenharia reversa e recuperação do site

Site analisado: https://fastarcondicionado.seuprojeto.online/ (levantamento em 21/11/2026).
Motivo: o cliente perdeu o backup do site. O objetivo foi recuperar uma cópia fiel e funcional, pronta para subir na Hostinger, e documentar a estrutura para criar páginas novas no mesmo padrão.

| Arquivo | Conteúdo |
|---|---|
| [01-sitemap.md](01-sitemap.md) | As 9 páginas + 404, hierarquia, menu e template de cada uma |
| [02-stack-e-integracoes.md](02-stack-e-integracoes.md) | WordPress, Elementor Pro, plugins, hospedagem, WhatsApp, formulário, mapa |
| [03-templates.md](03-templates.md) | Os templates de página e a ordem das seções |
| [04-componentes.md](04-componentes.md) | Inventário de componentes (widgets Elementor) e onde aparecem |
| [05-conteudo-por-pagina.md](05-conteudo-por-pagina.md) | Resumo de seções, CTAs e imagens de cada página |
| [06-design-system.md](06-design-system.md) | Cores, tipografia, botões, breakpoints |
| [tokens.css](tokens.css) | Variáveis CSS do kit global do Elementor, prontas para páginas novas |
| [07-seo-e-problemas.md](07-seo-e-problemas.md) | Problemas encontrados (certificado SSL inválido, sem SEO etc.) e o que corrigir |
| [08-hostinger.md](08-hostinger.md) | **Como publicar a cópia recuperada na Hostinger** e como recriar o WordPress se preferirem |
| [sitemap.json](sitemap.json) | Sitemap estruturado (título, H1, nº de seções, widgets, imagens) |
| [conteudo/](conteudo/) | **Texto literal** de cada página, seção por seção (FAQs abertos) |
| [prints/](prints/) | Prints de página inteira da cópia recuperada (desktop 1440px e celular 390px) |
| [referencia/](referencia/) | CSS do kit global, cabeçalho, rodapé e páginas; JSON das páginas e da biblioteca de mídia (130 itens) do WordPress |
| [hostinger/](hostinger/) | Arquivos adicionados à cópia estática: `.htaccess`, `enviar.php` (formulário) e `assets/form-contato.js` |
| [ferramentas/](ferramentas/) | Scripts usados para baixar, montar, testar e documentar o espelho (reaproveitáveis em outros clientes WordPress/Elementor) |

O site recuperado completo (HTML, CSS, JS, fontes e as 130 imagens da biblioteca de mídia, ~57 MB) está em `fast-ar-condicionado/fast-ar-condicionado-espelho.zip` nos arquivos do projeto. A pasta `public_html/` do zip é o que vai para a Hostinger. As imagens não foram versionadas aqui para não pesar o repositório.

## Resumo

- **Stack atual:** **WordPress 7.1.5** + tema **Hello Elementor 3.4.7** + **Elementor 4.0.1 / Elementor Pro 3.35.1** (Theme Builder: cabeçalho, rodapé e 404), **The Plus Addons for Elementor** (títulos, acordeão do FAQ, estilo do formulário) e **Contact Form 7 6.1.5**. Servidor **OpenLiteSpeed via CyberPanel** (VPS própria, não Hostinger), com LiteSpeed Cache.
- **Pequeno e institucional:** Home, Sobre Nós, Serviços (+3 páginas de serviço filhas), Galeria, FAQ, Contato e 404. Sem blog (só o "Hello world!" padrão) e sem SEO configurado.
- **Visual:** azul-marinho `#25293D` + azul `#0B66FF` + rodapé `#000060`; títulos em **Sora** 700, texto em **Manrope**; container de 1280px.
- **Conversão:** todos os CTAs vão para o WhatsApp **(11) 91541-5353** com mensagem pronta. Há formulário de contato (CF7) na página Contato e mapa do Google. Sem GTM, GA, Pixel ou qualquer rastreamento.
- **A cópia recuperada é fiel:** comparação pixel a pixel com o site no ar, nas 9 páginas, em desktop e celular, deu diferença abaixo de 0,1% (o resto é a posição dos carrosséis no momento do print). Menu, submenu, carrosséis, contadores, acordeões, galeria com lightbox e animações funcionam sem nenhuma requisição ao servidor antigo.
- **O formulário continua funcionando** sem WordPress: o envio do CF7 foi trocado por `enviar.php` (e-mail pela Hostinger), com as mesmas mensagens e validação. Testado localmente.

## Atenção

1. **O certificado SSL do site atual é inválido** (emitido pela Let's Encrypt *Staging*, que é só para testes). Todo visitante vê o aviso "Sua conexão não é particular". Ao subir na Hostinger, ativar o SSL gratuito resolve. Ver [07-seo-e-problemas.md](07-seo-e-problemas.md).
2. **O que não foi possível recuperar:** o banco do WordPress e o JSON de edição do Elementor (não são públicos). Ou seja, a cópia é o site *publicado*, não o painel. Para voltar a editar no Elementor é preciso remontar as páginas (ver [08-hostinger.md](08-hostinger.md)). Se o servidor CyberPanel ainda estiver acessível pelo cliente, vale tentar baixar o backup direto de lá antes.
3. **Dependências externas que continuam:** as 3 animações Lottie dos banners (hospedadas em `lottie.host`), o mapa do Google e o WhatsApp. Se `lottie.host` remover os arquivos, os banners ficam sem a animação decorativa, o resto da página não é afetado.

## Como o levantamento foi feito

Sitemap do WordPress (`/wp-sitemap.xml`) e API REST pública (`/wp-json/wp/v2/pages`, `/media`, `/types`) para listar páginas e mídia; download de todas as páginas com `wget` (página + requisitos); depois o site foi servido localmente e aberto em Chromium headless em desktop e celular para achar os arquivos que o Elementor carrega sob demanda (chunks de JS, CSS condicional, lightbox), que foram baixados até não sobrar nenhum 404. Os prints do site no ar e da cópia foram comparados pixel a pixel. O texto de cada página foi extraído do DOM renderizado (com as animações de entrada forçadas a aparecer e os acordeões abertos).
