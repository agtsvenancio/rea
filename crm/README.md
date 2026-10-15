# Meu CRM

CRM simples, próprio e focado em WhatsApp. Usa o Bitrix24 só como referência de
ideias: nenhum código, imagem ou marca do Bitrix foi usado.

## Como abrir

Abra o arquivo `index.html` no navegador (dois cliques). Não precisa instalar nada
nem ter internet. Os dados ficam salvos no próprio navegador; use **Ajustes >
Baixar backup** de vez em quando.

Para ver como funciona, vá em **Ajustes > Carregar exemplo**.

## O que tem nesta primeira versão

- **Hoje**: resumo de vendas e lista de follow-ups atrasados, de hoje e da semana.
- **Funil**: quadro kanban com arrastar e soltar (no celular, botões ◀ ▶), total
  em R$ por etapa e aviso de negócio parado há 7+ dias.
- **Contatos**: busca por nome, telefone, empresa, cidade ou etiqueta; aviso de
  telefone repetido; histórico de tudo que aconteceu com o cliente.
- **WhatsApp em um clique**: abre a conversa com mensagem pronta (modelos com
  `{nome}`, `{empresa}`, `{negocio}`), registra no histórico e já agenda o
  próximo follow-up.
- **Ajustes**: etapas do funil sem limite (nome, cor, ordem, tipo ganho/perdido),
  backup/restauração e importação/exportação de contatos em planilha CSV.

## Onde melhora em relação ao Bitrix24

| Bitrix24 | Meu CRM |
| --- | --- |
| Tela pesada, muitos menus | 5 abas, tudo a 1 clique |
| WhatsApp exige conector/pago | Botão de WhatsApp em todo lugar, grátis |
| Cobra por usuário e limita recursos no plano grátis | Sem plano, sem limite |
| Ruim no celular | Feito para funcionar no celular |

## Próximos passos possíveis

- Servidor com login para várias pessoas usarem os mesmos dados.
- Catálogo de produtos e pedido com itens (integração com o catálogo CJK).
- Envio automático pela API oficial do WhatsApp Business.
