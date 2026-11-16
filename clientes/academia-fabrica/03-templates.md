# 03. Templates de página

Todas as páginas compartilham o mesmo layout: cabeçalho fixo translúcido (`bg-carbon/85 backdrop-blur-md`), botão flutuante do WhatsApp, barra fixa inferior no mobile (`body` com `pb-16 md:pb-0`) e rodapé de 4 colunas. Abaixo, a ordem das seções dentro do `<main id="conteudo">`.

## 1. Home (`/`)

Usa o cabeçalho alternativo **header2** (logo grande no centro com brilho verde, menu dividido em dois lados).

1. **Hero tela cheia** (`hero2`, `min-h-[100svh]`): selo "Centro de Itu · Estacionamento grátis", H1 em 3 linhas animadas (a última com brilho verde "brand-shine"), parágrafo, botões "Agendar aula grátis" (WhatsApp) e "Ver planos". À direita, recorte dos professores (`fabrica_academia_001.webp`) flutuando, palavra gigante "FÁBRICA ACADEMIA" ao fundo e dois selos "780 aulas/mês" e "Todos os dias".
2. **Faixas cruzadas** (`ribbons`): duas fitas verdes inclinadas com os nomes das modalidades rolando (marquee).
3. **Faixa de números** (fundo `graphite`): 780 aulas por mês · 24 modalidades · Aberto todos os dias · Academia inteira climatizada · Amplo estacionamento.
4. **Faixa de aviso** (borda e gradiente verde): "Abril de 2027 · A Fábrica faz 30 anos" + botão "Entrar no grupo do WhatsApp".
5. **Chamada do quiz** (centralizada): eyebrow "Por onde começar", H2, texto, botão "Começar o quiz".
6. **Grupos de modalidades** (`graphite`): 6 cards com foto (Musculação, Cardio e performance, Sala de ginástica, Lutas, Corpo e mente, Aulas kids) que levam para `/modalidades#grupo`.
7. **Estrutura**: 4 cards com foto (Arena Cross, Sala de Bike, Sala de Ginástica, Musculação) + link "Conhecer a estrutura →".
8. **Programas e parcerias**: 5 cards de logo (Wellhub, BodyPump, PowerJump, Spinning, RitBox) + aviso de marcas.
9. **Planos** (`#planos`, `graphite`): 3 cards de preço, o do meio destacado "Recomendado".
10. **Depoimentos**: 3 cards com 5 estrelas, texto e nome.
11. **Blog** (`graphite`): 3 últimos posts + "Ver todos os posts →".
12. **Localização**: mapa Google ao fundo/lado, endereço, horários, "Agendar aula grátis" e "Traçar rota".

## 2. Interna (`/estrutura/`, `/modalidades/`, `/horarios/`, `/planos/`, `/blog/`, `/contato/`, `/privacidade/`)

1. **Hero interno** (`relative -mt-16 overflow-hidden pt-16`): foto de fundo com dois gradientes escuros (para a direita e para cima), eyebrow verde, H1 `display` 4xl→6xl, subtítulo `text-lg text-off/75`. Em `/privacidade/` e `/contato/` o hero é igual, com outra foto.
2. **Corpo** (`mx-auto max-w-7xl px-4 pb-24 md:px-6`), que muda por página:
   - **Estrutura:** 6 blocos alternados foto/texto (Arena Cross, Sala de Bike, Sala de Ginástica, Musculação, Tatame, Sala de Yoga), cada um com "Conhecer pessoalmente →"; faixa de 3 diferenciais; CTA final "Venha sentir a estrutura de perto".
   - **Modalidades:** 6 grupos (H2 com `id` = âncora), cada um com grade de cards de modalidade (foto, intensidade, duração, nome, resumo).
   - **Horários:** filtros em pílula por dia (seg…dom) e por sala, lista de aulas (hora em verde, nome com link, sala · professor, nível), aviso e CTA WhatsApp.
   - **Planos:** 3 cards de preço, nota de valores, grade de 5 parceiros, FAQ (6 perguntas em `<details>`), card "Ainda em dúvida?".
   - **Blog:** grade de cards de post (3 colunas).
   - **Contato:** 2 colunas: Endereço + WhatsApp + rota / Horários de atendimento + Redes sociais.
   - **Privacidade:** texto corrido `max-w-3xl` com H2 (Quais dados coletamos, Para que usamos, Compartilhamento, Seus direitos).

## 3. Modalidade (`/modalidades/{slug}/`, 24 páginas)

Gerado a partir de um item de [dados/modalidades.json](dados/modalidades.json).

1. **Hero** (`min-h-[70svh] items-end`): foto da modalidade cobrindo tudo, link-eyebrow para o grupo ("Musculação →"), H1 com o nome, resumo, pílulas "Intensidade: Leve/Moderada/Intensa", "Duração", "Adultos/Kids".
2. **Corpo em 2 colunas** (`md:grid-cols-[1.6fr_1fr]`):
   - Esquerda: "Como é a aula" (descrição), "A estrutura" (grade de destaques, só quando existe `destaques`), "Benefícios" (grade com check verde), observação quando existe.
   - Direita: card fixo (`md:sticky md:top-24`) "Experimente grátis" com "Agendar aula grátis" (WhatsApp com o nome da modalidade), "Ver horários das turmas", "Ver planos" e nota sobre a grade.
3. **Você também pode gostar** (`graphite`): 3 cards de outras modalidades do mesmo grupo.

## 4. Post do blog (`/blog/{slug}/`)

`<article>` com: hero (eyebrow da categoria, H1, data), corpo `max-w-3xl` com H2 e parágrafos, bloco final "Bora colocar em prática?" com "Agendar aula grátis" e "← Voltar para o blog".

## 5. Tela cheia (`/aula-gratis/`, `/quiz/`)

Seção única `min-h-[100svh]` sobre fundo escuro com brilho verde.

- **Aula grátis:** eyebrow "Sem compromisso · Sem cartão", H1 "Sua primeira aula é grátis.", 3 passos numerados (Chame no WhatsApp / Escolha dia e modalidade / Venha treinar), botão grande "Agendar minha aula grátis".
- **Quiz:** eyebrow "Quiz · 3 perguntas · 1 minuto", H1, barra de progresso, pergunta atual com opções em grade 2 colunas. No final mostra a trilha recomendada (3 modalidades com link) e botão para WhatsApp com a mensagem montada. Lógica em [referencia/quiz.js](referencia/quiz.js): 6 objetivos × versão `suave` (nunca treinei/voltando) ou `intensa` (já treino/avançado). A pergunta 3 (dias por semana) só entra no texto.
