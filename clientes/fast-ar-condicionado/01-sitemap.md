# 01. Sitemap

Fonte: `/wp-sitemap.xml` + API REST (`/wp-json/wp/v2/pages`). 9 páginas publicadas de fato + 404. Todas usam o template **Elementor Canvas com cabeçalho e rodapé** (`elementor_header_footer`).

| URL | Título (aba) | H1 | ID WP | Pai | Criada / última edição |
|---|---|---|---|---|---|
| `/` | Fast Ar | Especialistas em instalação e manutenção de ar-condicionado | 123 | | 26/03/2026 · 29/04/2026 |
| `/sobre-nos/` | Sobre Nós – Fast Ar | Sobre Nós | 153 | | 26/03 · 10/04 |
| `/servicos/` | Serviços – Fast Ar | Serviços | 159 | | 26/03 · 07/04 |
| `/servicos/instalacao-de-ar-condicionado/` | Instalação de Ar-Condicionado – Fast Ar | idem | 280 | 159 | 27/03 · 13/04 |
| `/servicos/limpeza-de-ar-condicionado/` | Limpeza de Ar-Condicionado – Fast Ar | idem | 285 | 159 | 27/03 · 10/04 |
| `/servicos/manutencao-preventiva/` | Manutenção Preventiva de Ar-condicionado – Fast Ar | idem | 290 | 159 | 27/03 · 14/04 |
| `/galeria/` | Galeria – Fast Ar | Galeria | 168 | | 26/03 · 26/03 |
| `/faq/` | FAQ – Fast Ar | FAQ | 174 | | 26/03 · 10/04 |
| `/contato/` | Contato – Fast Ar | Contato | 180 | | 26/03 · 10/04 |
| qualquer URL inexistente | Página não encontrada – Fast Ar | Página não encontrada | 81 (template 404) | | |

Lixo padrão do WordPress ainda publicado (não foi recuperado; o `.htaccess` novo redireciona para a Home): `/sample-page/`, `/hello-world/`, `/category/uncategorized/`, `/feed/`.

## Menu principal (cabeçalho)

Home · Sobre Nós · Serviços ▾ (Instalação de Ar-Condicionado, Limpeza de Ar-Condicionado, Manutenção Preventiva de Ar-condicionado) · FAQ · Contato

O item "Serviços" do menu aponta para `#` (só abre o submenu); a página `/servicos/` só é alcançada pelos links internos. **A página Galeria não está no menu nem no rodapé** (página órfã).

## Rodapé

- Páginas de utilidade: Home, Sobre Nós, FAQ, Contato
- Serviços: Instalação De Ar-Condicionado, Limpeza E Higienização, Manutenção Preventiva
