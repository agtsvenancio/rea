(function(){const whatsappNumber = "5511961819425";

  const PERGUNTAS = [
    {
      titulo: 'Qual seu objetivo principal?',
      opcoes: [
        ['emagrecer', 'Emagrecer'],
        ['massa', 'Ganhar massa'],
        ['saude', 'Melhorar saúde'],
        ['condicionamento', 'Condicionamento'],
        ['lutas', 'Lutas'],
        ['flex', 'Flexibilidade e bem-estar'],
      ],
    },
    {
      titulo: 'Qual seu nível atual?',
      opcoes: [
        ['zero', 'Nunca treinei'],
        ['voltando', 'Estou voltando'],
        ['treino', 'Já treino'],
        ['avancado', 'Avançado'],
      ],
    },
    {
      titulo: 'Quantos dias por semana pretende treinar?',
      opcoes: [
        ['1-2', '1 a 2 dias'],
        ['3-4', '3 a 4 dias'],
        ['5+', '5 ou mais'],
      ],
    },
  ];

  /**
   * Cada objetivo tem duas versões da trilha: `suave` para quem está começando
   * ou voltando, `intensa` para quem já treina. É a pergunta 2 que decide.
   */
  const TRILHAS = {
    emagrecer: {
      suave: {
        nome: 'Queima progressiva',
        mods: [['musculacao', 'Musculação'], ['bike-indoor', 'Bike Indoor'], ['alongamento', 'Alongamento']],
      },
      intensa: {
        nome: 'Queima máxima',
        mods: [['musculacao', 'Musculação'], ['hiit', 'HIIT'], ['spinning', 'Spinning']],
      },
    },
    massa: {
      suave: {
        nome: 'Base de força',
        mods: [['musculacao', 'Musculação'], ['gluteos', 'Glúteos'], ['gap', 'GAP']],
      },
      intensa: {
        nome: 'Construção de força',
        mods: [['musculacao', 'Musculação'], ['bodypump', 'BodyPump'], ['cross-training', 'Cross Training']],
      },
    },
    saude: {
      suave: {
        nome: 'Saúde em movimento',
        mods: [['musculacao', 'Musculação'], ['bike-indoor', 'Bike Indoor'], ['alongamento', 'Alongamento']],
      },
      intensa: {
        nome: 'Saúde com ritmo',
        mods: [['musculacao', 'Musculação'], ['fit-dance', 'Fit Dance'], ['powerjump', 'PowerJump']],
      },
    },
    condicionamento: {
      suave: {
        nome: 'Fôlego em construção',
        mods: [['bike-indoor', 'Bike Indoor'], ['corrida-de-rua', 'Corrida de Rua'], ['musculacao', 'Musculação']],
      },
      intensa: {
        nome: 'Performance total',
        mods: [['cross-training', 'Cross Training'], ['spinning', 'Spinning'], ['corrida-de-rua', 'Corrida de Rua']],
      },
    },
    lutas: {
      suave: {
        nome: 'Primeiro round',
        mods: [['boxe', 'Boxe'], ['musculacao', 'Musculação'], ['alongamento', 'Alongamento']],
      },
      intensa: {
        nome: 'Modo lutador',
        mods: [['boxe', 'Boxe'], ['kickboxing', 'Kickboxing'], ['jiu-jitsu', 'Jiu-Jítsu']],
      },
    },
    flex: {
      suave: {
        nome: 'Corpo e mente',
        mods: [['hatha-yoga', 'Hatha Yoga'], ['alongamento', 'Alongamento'], ['pilates-solo', 'Pilates Solo']],
      },
      intensa: {
        nome: 'Equilíbrio ativo',
        mods: [['hatha-yoga', 'Hatha Yoga'], ['pilates-solo', 'Pilates Solo'], ['fitball', 'Fitball']],
      },
    },
  };

  const INICIANTE = ['zero', 'voltando'];

  const root = document.getElementById('quiz-root');
  const bar = document.getElementById('quiz-bar');
  const progress = document.getElementById('quiz-progress');
  let respostas = [];
  let etapa = 0;

  const waUrl = (msg) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

  function render() {
    bar.style.width = `${(etapa / PERGUNTAS.length) * 100}%`;
    progress.setAttribute('aria-valuenow', String(etapa));
    if (etapa >= PERGUNTAS.length) return resultado();
    const p = PERGUNTAS[etapa];
    root.innerHTML = `
      <fieldset class="border-0 p-0">
        <legend class="display mx-auto text-center text-2xl text-white md:text-3xl">${p.titulo}</legend>
        <div class="mt-8 grid gap-3 sm:grid-cols-2">
          ${p.opcoes
            .map(
              ([v, label]) => `
            <button data-valor="${v}" class="rounded-2xl border border-white/10 bg-graphite px-5 py-4 text-left font-semibold text-off/90 transition hover:border-brand hover:text-brand-bright focus-visible:border-brand">
              ${label}
            </button>`
            )
            .join('')}
        </div>
        ${etapa > 0 ? '<button id="voltar" class="mt-6 text-sm text-off/50 hover:text-off">← Voltar</button>' : ''}
      </fieldset>`;
    root.querySelectorAll('button[data-valor]').forEach((b) =>
      b.addEventListener('click', () => {
        respostas[etapa] = b.dataset.valor;
        etapa++;
        render();
      })
    );
    root.querySelector('#voltar')?.addEventListener('click', () => {
      etapa--;
      // Descarta a resposta da etapa que está sendo refeita e as seguintes,
      // senão avançar sem reclicar mantinha o valor antigo.
      respostas = respostas.slice(0, etapa);
      render();
    });
  }

  function resultado() {
    const [objetivo, nivel, dias] = respostas;
    const variante = INICIANTE.includes(nivel) ? 'suave' : 'intensa';
    const trilha = TRILHAS[objetivo][variante];
    const mods = trilha.mods;

    const dicaNivel =
      nivel === 'zero'
        ? 'Como você está começando do zero, a equipe monta uma adaptação leve nas primeiras semanas, no seu ritmo e com orientação em cada aparelho.'
        : nivel === 'voltando'
          ? 'Voltando aos treinos? A equipe ajusta a intensidade para uma retomada segura e progressiva.'
          : 'Com sua experiência, dá para explorar as aulas mais intensas desde a primeira semana.';

    const dicaDias =
      dias === '1-2'
        ? 'Com 1 a 2 dias por semana, priorize as modalidades mais completas da sua trilha.'
        : dias === '3-4'
          ? 'Com 3 a 4 dias, você consegue combinar as três modalidades da trilha na semana.'
          : 'Com 5 dias ou mais, dá para alternar toda a trilha e ainda incluir recuperação ativa.';

    const nomes = mods.map(([, nome]) => nome);
    const waResultado = waUrl(
      `Olá! Fiz o quiz no site da Fábrica Academia e caí na trilha ${trilha.nome} (${nomes.join(', ')}). Quero agendar uma aula grátis para começar.`
    );

    bar.style.width = '100%';
    progress.setAttribute('aria-valuenow', String(PERGUNTAS.length));
    root.innerHTML = `
      <div class="rounded-3xl border border-brand/40 bg-graphite p-8 text-center">
        <p class="text-xs font-semibold tracking-widest text-brand uppercase">Sua trilha recomendada</p>
        <h2 class="display mt-2 text-3xl text-brand-bright md:text-4xl">${trilha.nome}</h2>
        <div class="mt-6 flex flex-wrap justify-center gap-2.5">
          ${mods
            .map(
              ([slug, nome]) => `
            <a href="/modalidades/${slug}" class="rounded-full border border-brand/50 bg-brand/10 px-5 py-2.5 text-sm font-bold text-brand-bright transition hover:bg-brand hover:text-carbon">
              ${nome}
            </a>`
            )
            .join('')}
        </div>
        <p class="mx-auto mt-6 max-w-md text-sm leading-relaxed text-off/70">${dicaNivel}</p>
        <p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-off/70">${dicaDias}</p>
        <a href="${waResultado}" target="_blank" rel="noopener" data-event="site_quiz_resultado"
          class="glow-brand mt-8 inline-block rounded-full bg-brand px-8 py-4 font-bold text-carbon transition hover:bg-brand-bright">
          Quero agendar minha aula grátis
        </a>
        <p class="mt-5 text-sm text-off/60">
          Quer ver quando essas aulas acontecem?
          <a href="/horarios" class="font-semibold text-brand hover:text-brand-bright">Confira a grade de horários →</a>
        </p>
        <p class="mt-4 text-xs text-off/45">
          Recomendação inicial. A equipe da Fábrica orienta o melhor caminho presencialmente.
        </p>
        <button id="refazer" class="mt-6 block w-full text-sm text-off/50 hover:text-off">↺ Refazer o quiz</button>
      </div>`;
    root.querySelector('#refazer')?.addEventListener('click', () => {
      respostas = [];
      etapa = 0;
      render();
    });
  }

  render();
})();
