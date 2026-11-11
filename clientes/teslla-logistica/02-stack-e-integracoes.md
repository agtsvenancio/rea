# 02. Stack, plugins e integrações

## Plataforma

| Item | Valor | Evidência |
|---|---|---|
| CMS | WordPress (block editor ativo) | `/wp-json/`, caminhos `/wp-content/uploads/` |
| Hospedagem | Hostinger | plugins `hostinger-easy-onboarding`, `hostinger-tools-plugin`, `hostinger-amplitude`; domínio de staging `blanchedalmond-stinkbug-185073.hostingersite.com` |
| Tema | Custom (nome não identificado) | template `archive-solucoes.php`, assets em `/assets/img/shapes/...`; estrutura típica de template HTML de logística comprado e convertido |
| Page builder | Nenhum detectado (sem Elementor/Wix) | sem marcadores no HTML renderizado |
| Front page | Página estática "Home" (id 9); posts em "Blog" (id 16) | `show_on_front: page` |
| Fuso | `gmt_offset: 0`, timezone vazio | deveria ser America/Sao_Paulo |

## Plugins (pelos namespaces da API REST)

| Plugin | Namespace | Uso |
|---|---|---|
| Yoast SEO (v28.1) | `yoast/v1` | títulos, OG, canonical, breadcrumb, sitemap |
| Contact Form 7 | `contact-form-7/v1` | os 3 formulários; captcha via Really Simple CAPTCHA (`/wp-content/uploads/wpcf7_captcha/`) |
| LiteSpeed Cache | `litespeed/v1`, `litespeed/v3` | cache/otimização |
| WP Mail SMTP | `wp-mail-smtp/v1` | envio dos e-mails dos formulários |
| All-in-One WP Migration | `ai1wm/v1` | backup/migração (útil para exportar o site) |
| Duplicate Post | `duplicate-post/v1` | clonar páginas |
| Hostinger (3 plugins) | `hostinger-*` | onboarding, ferramentas, analytics |

## Custom post type

- `solucoes`: hierárquico, `has_archive: archive-solucoes`, sem taxonomias, ícone padrão. Usado para as 5 soluções principais e as 10 sub-soluções de medicamentos.

## Rastreamento

- Google Tag Manager: **dois** containers, `GTM-PHQ8NVT9` e `GTM-W4W69TSB` (verificar se um é legado; dois containers podem duplicar eventos).
- Google Search Console: meta `google-site-verification` presente.
- Não visível no HTML: GA4 direto, Meta Pixel (provavelmente dentro do GTM).

## Contatos (usar exatamente estes na migração)

| Canal | Valor | Link |
|---|---|---|
| Telefone 1 | (11) 2389-3028 | `tel:+551123893028` |
| Telefone 2 | (11) 2949-5812 | `tel:+551129495812` |
| Emergencial 24h | (11) 96577-8480 | `https://wa.me/5511965778480` |
| Transporte de Medicamentos / comercial | (11) 93490-9698 | `https://api.whatsapp.com/send?phone=5511934909698&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20algumas%20d%C3%BAvidas!%20(Mensagem%20enviada%20do%20site)` |
| Endereço | R. Osaka, 1143/1145 - Jardim Japão, São Paulo - SP, 02124-041 | Google Maps embed, lugar "TESLLA LOGISTICA" (~ -23.504136, -46.573718) |
| Instagram | @tesllalogistica | https://www.instagram.com/tesllalogistica/ |
| LinkedIn | tesllalogistica | https://www.linkedin.com/company/tesllalogistica |
| E-mail | nenhum publicado | |
| Horário | não publicado | |

O botão padrão **"Fale com um Especialista"** aponta para o WhatsApp comercial (5511934909698) com a mensagem pré-preenchida acima. Em alguns blocos ele aponta para `/contato`.

## Formulários (Contact Form 7)

### A. Lead para WhatsApp (global, em todas as páginas)
Título: "Olá! Preencha os campos abaixo para iniciar a conversa no WhatsApp". Também aparece embutido em /contato/ sob "Fale com um Especialista".

| Campo | Tipo | Obrigatório | Opções |
|---|---|---|---|
| Nome | texto | sim | |
| Email | e-mail | sim | |
| Setor | select | sim | Vendas, Transporte de Medicamentos, Financeiro, Operacional, Outros |
| Telefone | tel com seletor de país (🇧🇷 +55) | sim | |
| Captcha | imagem | sim | |

Botão: "Iniciar a conversa". Comportamento esperado: envia o lead (e-mail) e abre o WhatsApp. **Confirmar no painel** para qual número cada "Setor" redireciona.

### B. Cotação (modal global "Solicitar Cotação" e página /cotacao/)
Página: H2 "Faça sua Cotação com a gente!". Obrigatoriedade dos campos não visível.

| Grupo | Campos |
|---|---|
| Dados Pessoais | Nome, Telefone, CNPJ, E-mail |
| Dados do Trecho | Estado: Origem (select UF), Cidade: Origem, Estado: Destino (select UF), Cidade: Destino |
| Dados da Carga | Valor da Mercadoria, Volumes, Peso (kg), Comprimento (cm), Largura (cm), Altura (cm) |

Select de UF: "Selecione" + AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO. Mais captcha.

### C. "Solicite um Atendimento" (Home)
Só o captcha ficou visível na leitura; campos não identificados. **Conferir no painel do CF7.**

## Para extrair 100% na migração (acesso ao painel)

1. All-in-One WP Migration: exportar o site completo (`.wpress`).
2. Ferramentas → Exportar (XML) para posts, páginas e `solucoes`.
3. Contact Form 7: copiar a configuração de cada formulário (campos, e-mail de destino, redirecionamentos).
4. GTM: exportar os dois containers.
5. Baixar `/wp-content/themes/<tema>/` para ter CSS, fontes e ícones originais.
