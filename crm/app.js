"use strict";

// ---------- Dados ----------
const CHAVE = "meu-crm-v1";

function etapasPadrao() {
  return [
    { id: id(), nome: "Novo contato", cor: "#2563eb", tipo: "aberta" },
    { id: id(), nome: "Orçamento enviado", cor: "#7c3aed", tipo: "aberta" },
    { id: id(), nome: "Negociando", cor: "#ca8a04", tipo: "aberta" },
    { id: id(), nome: "Pedido fechado", cor: "#16a34a", tipo: "ganho" },
    { id: id(), nome: "Perdido", cor: "#dc2626", tipo: "perdido" },
  ];
}

function modelosPadrao() {
  return [
    {
      id: id(),
      nome: "Primeiro contato",
      texto:
        "Olá {nome}, tudo bem? Aqui é da CJK Alimentos. Posso te mandar nossa tabela de preços desta semana?",
    },
    {
      id: id(),
      nome: "Cobrar orçamento",
      texto:
        "Oi {nome}! Conseguiu ver o orçamento de {negocio}? Se quiser ajusto quantidades ou prazo.",
    },
    {
      id: id(),
      nome: "Recompra",
      texto:
        "Olá {nome}, já está na hora de repor o estoque da {empresa}? Posso separar o pedido de sempre?",
    },
  ];
}

function vazio() {
  return {
    contatos: [],
    negocios: [],
    etapas: etapasPadrao(),
    tarefas: [],
    historico: [],
    modelos: modelosPadrao(),
  };
}

let db = carregar();

function carregar() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (bruto) return Object.assign(vazio(), JSON.parse(bruto));
  } catch (e) {
    console.warn("Não consegui ler os dados salvos", e);
  }
  return vazio();
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(db));
  } catch {
    alert("Não consegui salvar neste navegador. Baixe um backup em Ajustes.");
  }
  desenhar();
}

// ---------- Utilidades ----------
function id() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function esc(t) {
  return String(t ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function hoje() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function somarDias(dataISO, n) {
  const [a, m, d] = dataISO.split("-").map(Number);
  const x = new Date(a, m - 1, d + n);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
}
function dataBR(iso) {
  if (!iso) return "";
  const [a, m, d] = iso.slice(0, 10).split("-");
  return `${d}/${m}/${a}`;
}
function dinheiro(v) {
  return (Number(v) || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
function diasDesde(iso) {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}
// Deixa só dígitos e coloca o 55 do Brasil quando faltar.
function telefoneZap(t) {
  let n = String(t || "").replace(/\D/g, "");
  if (n.startsWith("0")) n = n.replace(/^0+/, "");
  if (n.length === 10 || n.length === 11) n = "55" + n;
  return n;
}
function telefoneBonito(t) {
  const n = telefoneZap(t);
  const m = n.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : t || "";
}
const contato = (cid) => db.contatos.find((c) => c.id === cid);
const negocio = (nid) => db.negocios.find((n) => n.id === nid);
const etapa = (eid) => db.etapas.find((e) => e.id === eid);

function registrar(contatoId, texto, negocioId) {
  db.historico.push({
    id: id(),
    contatoId,
    negocioId: negocioId || null,
    texto,
    em: new Date().toISOString(),
  });
}

// ---------- WhatsApp ----------
function preencher(modelo, c, n) {
  return modelo
    .replaceAll("{nome}", (c?.nome || "").split(" ")[0])
    .replaceAll("{empresa}", c?.empresa || "")
    .replaceAll("{negocio}", n?.titulo || "");
}

function abrirWhatsApp(contatoId, negocioId) {
  const c = contato(contatoId);
  if (!c) return;
  const n = negocioId ? negocio(negocioId) : null;
  if (!telefoneZap(c.telefone)) {
    alert(
      "Este contato não tem telefone. Edite o contato e coloque o WhatsApp.",
    );
    return;
  }
  const opcoes = db.modelos
    .map((m) => `<option value="${m.id}">${esc(m.nome)}</option>`)
    .join("");
  janela(
    `<h3>WhatsApp para ${esc(c.nome)}</h3>
     <label>Modelo<select name="modelo"><option value="">(mensagem em branco)</option>${opcoes}</select></label>
     <label>Mensagem<textarea name="texto" rows="5"></textarea></label>
     <label>Agendar próximo follow-up em
       <select name="prox"><option value="">não agendar</option><option value="1">1 dia</option><option value="3" selected>3 dias</option><option value="7">7 dias</option><option value="15">15 dias</option><option value="30">30 dias</option></select>
     </label>
     <div class="rodape"><button value="cancelar" formnovalidate>Cancelar</button><button class="zap" value="ok">Abrir WhatsApp</button></div>`,
    (f) => {
      const texto = f.get("texto");
      const url = `https://wa.me/${telefoneZap(c.telefone)}${texto ? "?text=" + encodeURIComponent(texto) : ""}`;
      window.open(url, "_blank", "noopener");
      registrar(
        c.id,
        `WhatsApp enviado${texto ? ": " + texto : ""}`,
        negocioId,
      );
      c.ultimoContato = new Date().toISOString();
      if (f.get("prox")) {
        db.tarefas.push({
          id: id(),
          contatoId: c.id,
          negocioId: negocioId || null,
          texto: "Retomar conversa no WhatsApp",
          quando: somarDias(hoje(), Number(f.get("prox"))),
          feita: false,
        });
      }
      salvar();
    },
    (form) => {
      const sel = form.elements.modelo;
      sel.addEventListener("change", () => {
        const m = db.modelos.find((x) => x.id === sel.value);
        form.elements.texto.value = m ? preencher(m.texto, c, n) : "";
      });
      if (db.modelos[0]) {
        sel.value = db.modelos[0].id;
        sel.dispatchEvent(new Event("change"));
      }
    },
  );
}

// ---------- Janela (diálogo) ----------
const dlg = document.getElementById("janela");
const dlgForm = document.getElementById("janela-form");
let aoConfirmar = null;

function janela(html, confirmar, depois) {
  dlgForm.innerHTML = html;
  aoConfirmar = confirmar;
  if (depois) depois(dlgForm);
  dlg.showModal();
}
dlgForm.addEventListener("submit", (ev) => {
  const botao = ev.submitter;
  if (botao && botao.value === "ok" && aoConfirmar) {
    const r = aoConfirmar(new FormData(dlgForm), botao);
    if (r === false) ev.preventDefault();
  }
});

// ---------- Contatos ----------
function editarContato(cid) {
  const c = cid
    ? contato(cid)
    : {
        nome: "",
        telefone: "",
        empresa: "",
        cidade: "",
        etiquetas: [],
        origem: "WhatsApp",
        notas: "",
      };
  const tarefas = cid
    ? db.tarefas
        .filter((t) => t.contatoId === cid)
        .sort((a, b) => a.quando.localeCompare(b.quando))
    : [];
  const negocios = cid ? db.negocios.filter((n) => n.contatoId === cid) : [];
  const hist = cid
    ? db.historico
        .filter((h) => h.contatoId === cid)
        .sort((a, b) => b.em.localeCompare(a.em))
        .slice(0, 30)
    : [];
  janela(
    `<h3>${cid ? esc(c.nome) : "Novo contato"}</h3>
     <label>Nome<input name="nome" required value="${esc(c.nome)}"></label>
     <div class="linha2">
       <label>WhatsApp<input name="telefone" inputmode="tel" placeholder="(11) 98765-4321" value="${esc(c.telefone)}"></label>
       <label>Empresa<input name="empresa" value="${esc(c.empresa)}"></label>
     </div>
     <div class="linha2">
       <label>Cidade<input name="cidade" value="${esc(c.cidade)}"></label>
       <label>Origem<input name="origem" list="origens" value="${esc(c.origem)}"></label>
     </div>
     <datalist id="origens"><option>WhatsApp</option><option>Indicação</option><option>Instagram</option><option>Visita</option><option>Site</option></datalist>
     <label>Etiquetas (separe por vírgula)<input name="etiquetas" placeholder="restaurante, atacado" value="${esc((c.etiquetas || []).join(", "))}"></label>
     <label>Anotações<textarea name="notas">${esc(c.notas)}</textarea></label>
     ${
       cid
         ? `<div class="botoes">
              <button type="button" class="zap" data-acao="zap">WhatsApp</button>
              <button type="button" data-acao="tarefa">+ Follow-up</button>
              <button type="button" data-acao="negocio">+ Negócio</button>
              <button type="button" data-acao="nota">+ Registro</button>
            </div>
            <b>Negócios</b>
            <ul class="historico">${negocios.map((n) => `<li>${esc(n.titulo)} · ${dinheiro(n.valor)} · <small>${esc(etapa(n.etapaId)?.nome)}</small></li>`).join("") || '<li class="vazio">nenhum</li>'}</ul>
            <b>Follow-ups</b>
            <ul class="historico">${tarefas.map((t) => `<li>${t.feita ? "✔ " : ""}${dataBR(t.quando)} · ${esc(t.texto)}</li>`).join("") || '<li class="vazio">nenhum</li>'}</ul>
            <b>Histórico</b>
            <ul class="historico">${hist.map((h) => `<li><small>${new Date(h.em).toLocaleString("pt-BR")}</small><br>${esc(h.texto)}</li>`).join("") || '<li class="vazio">vazio</li>'}</ul>`
         : ""
     }
     <div class="rodape">
       ${cid ? '<button type="button" class="perigo" data-acao="excluir">Excluir</button>' : ""}
       <button value="cancelar" formnovalidate>Fechar</button><button class="primario" value="ok">Salvar</button>
     </div>`,
    (f) => {
      const dados = {
        nome: f.get("nome").trim(),
        telefone: f.get("telefone").trim(),
        empresa: f.get("empresa").trim(),
        cidade: f.get("cidade").trim(),
        origem: f.get("origem").trim(),
        etiquetas: f
          .get("etiquetas")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        notas: f.get("notas"),
      };
      const repetido =
        dados.telefone &&
        db.contatos.find(
          (x) =>
            x.id !== cid &&
            telefoneZap(x.telefone) === telefoneZap(dados.telefone),
        );
      if (
        repetido &&
        !confirm(
          `Já existe "${repetido.nome}" com esse telefone. Salvar mesmo assim?`,
        )
      )
        return false;
      if (cid) {
        Object.assign(c, dados);
      } else {
        const novo = { id: id(), criadoEm: new Date().toISOString(), ...dados };
        db.contatos.push(novo);
        registrar(novo.id, "Contato criado");
      }
      salvar();
    },
    (form) => {
      form.querySelectorAll("[data-acao]").forEach((b) =>
        b.addEventListener("click", () => {
          const acao = b.dataset.acao;
          dlg.close();
          if (acao === "zap") abrirWhatsApp(cid);
          if (acao === "tarefa") novaTarefa(cid);
          if (acao === "negocio") editarNegocio(null, cid);
          if (acao === "nota") novoRegistro(cid);
          if (
            acao === "excluir" &&
            confirm(
              `Excluir ${c.nome} e tudo ligado a ele (negócios, follow-ups, histórico)?`,
            )
          ) {
            db.contatos = db.contatos.filter((x) => x.id !== cid);
            db.negocios = db.negocios.filter((x) => x.contatoId !== cid);
            db.tarefas = db.tarefas.filter((x) => x.contatoId !== cid);
            db.historico = db.historico.filter((x) => x.contatoId !== cid);
            salvar();
          }
        }),
      );
    },
  );
}

function novoRegistro(cid) {
  janela(
    `<h3>Registrar conversa com ${esc(contato(cid).nome)}</h3>
     <label>O que aconteceu?<textarea name="texto" required placeholder="Ex.: ligou pedindo preço do frango, vai fechar sexta"></textarea></label>
     <div class="rodape"><button value="cancelar" formnovalidate>Cancelar</button><button class="primario" value="ok">Salvar</button></div>`,
    (f) => {
      registrar(cid, f.get("texto"));
      contato(cid).ultimoContato = new Date().toISOString();
      salvar();
    },
  );
}

function novaTarefa(cid, nid) {
  janela(
    `<h3>Follow-up com ${esc(contato(cid).nome)}</h3>
     <label>O que fazer<input name="texto" required value="Retomar conversa no WhatsApp"></label>
     <label>Quando<input type="date" name="quando" required value="${somarDias(hoje(), 1)}"></label>
     <div class="rodape"><button value="cancelar" formnovalidate>Cancelar</button><button class="primario" value="ok">Agendar</button></div>`,
    (f) => {
      db.tarefas.push({
        id: id(),
        contatoId: cid,
        negocioId: nid || null,
        texto: f.get("texto"),
        quando: f.get("quando"),
        feita: false,
      });
      salvar();
    },
  );
}

// ---------- Negócios ----------
function editarNegocio(nid, contatoPadrao) {
  if (!db.contatos.length) {
    alert("Cadastre um contato primeiro.");
    return editarContato();
  }
  const n = nid
    ? negocio(nid)
    : {
        titulo: "",
        valor: "",
        contatoId: contatoPadrao || "",
        etapaId: db.etapas[0].id,
        notas: "",
      };
  const contatos = [...db.contatos].sort((a, b) =>
    a.nome.localeCompare(b.nome),
  );
  janela(
    `<h3>${nid ? "Editar negócio" : "Novo negócio"}</h3>
     <label>Título<input name="titulo" required placeholder="Ex.: Pedido semanal de carnes" value="${esc(n.titulo)}"></label>
     <label>Cliente<select name="contatoId" required>${contatos.map((c) => `<option value="${c.id}" ${c.id === n.contatoId ? "selected" : ""}>${esc(c.nome)}${c.empresa ? " · " + esc(c.empresa) : ""}</option>`).join("")}</select></label>
     <div class="linha2">
       <label>Valor (R$)<input name="valor" inputmode="decimal" value="${esc(n.valor)}"></label>
       <label>Etapa<select name="etapaId">${db.etapas.map((e) => `<option value="${e.id}" ${e.id === n.etapaId ? "selected" : ""}>${esc(e.nome)}</option>`).join("")}</select></label>
     </div>
     <label>Anotações<textarea name="notas">${esc(n.notas)}</textarea></label>
     <div class="rodape">
       ${nid ? '<button type="button" class="perigo" data-acao="excluir">Excluir</button>' : ""}
       <button value="cancelar" formnovalidate>Fechar</button><button class="primario" value="ok">Salvar</button>
     </div>`,
    (f) => {
      const valor =
        Number(String(f.get("valor")).replace(/\./g, "").replace(",", ".")) ||
        0;
      const dados = {
        titulo: f.get("titulo").trim(),
        contatoId: f.get("contatoId"),
        valor,
        notas: f.get("notas"),
      };
      if (nid) {
        Object.assign(n, dados);
        moverNegocio(n, f.get("etapaId"), false);
      } else {
        const novo = {
          id: id(),
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString(),
          etapaId: f.get("etapaId"),
          ...dados,
        };
        db.negocios.push(novo);
        registrar(
          novo.contatoId,
          `Negócio criado: ${novo.titulo} (${dinheiro(valor)})`,
          novo.id,
        );
      }
      salvar();
    },
    (form) => {
      const b = form.querySelector('[data-acao="excluir"]');
      if (b)
        b.addEventListener("click", () => {
          if (!confirm("Excluir este negócio?")) return;
          db.negocios = db.negocios.filter((x) => x.id !== nid);
          db.tarefas.forEach((t) => {
            if (t.negocioId === nid) t.negocioId = null;
          });
          dlg.close();
          salvar();
        });
    },
  );
}

function moverNegocio(n, etapaId, gravar = true) {
  if (n.etapaId === etapaId) return;
  const e = etapa(etapaId);
  n.etapaId = etapaId;
  n.atualizadoEm = new Date().toISOString();
  n.fechadoEm = e.tipo === "aberta" ? null : n.atualizadoEm;
  registrar(n.contatoId, `"${n.titulo}" foi para ${e.nome}`, n.id);
  if (gravar) salvar();
}

// ---------- Desenho das telas ----------
function desenhar() {
  desenharHoje();
  desenharFunil();
  desenharContatos();
  desenharModelos();
  desenharEtapas();
}

function linhaTarefa(t) {
  const c = contato(t.contatoId);
  const vencida = !t.feita && t.quando < hoje();
  return `<li class="${vencida ? "vencida" : ""} ${t.feita ? "feita" : ""}">
    <div class="cresce"><b>${esc(c?.nome || "?")}</b>${c?.empresa ? " · " + esc(c.empresa) : ""}<br>
      <small>${dataBR(t.quando)}${vencida ? " · atrasado" : ""} · ${esc(t.texto)}</small></div>
    <button class="zap mini" data-zap="${t.contatoId}" data-neg="${t.negocioId || ""}">WhatsApp</button>
    <button class="mini" data-feita="${t.id}">✔ Feito</button>
    <button class="mini" data-adiar="${t.id}">+1 dia</button>
    <button class="mini" data-contato="${t.contatoId}">Abrir</button>
  </li>`;
}

function desenharHoje() {
  const h = hoje();
  const abertas = db.tarefas.filter((t) => !t.feita);
  const agora = abertas
    .filter((t) => t.quando <= h)
    .sort((a, b) => a.quando.localeCompare(b.quando));
  const prox = abertas
    .filter((t) => t.quando > h && t.quando <= somarDias(h, 7))
    .sort((a, b) => a.quando.localeCompare(b.quando));
  document.getElementById("lista-hoje").innerHTML =
    agora.map(linhaTarefa).join("") ||
    '<li class="vazio">Nada pendente. 🎉</li>';
  document.getElementById("lista-proximos").innerHTML =
    prox.map(linhaTarefa).join("") ||
    '<li class="vazio">Nada agendado para a semana.</li>';

  const abertos = db.negocios.filter(
    (n) => etapa(n.etapaId)?.tipo === "aberta",
  );
  const mes = h.slice(0, 7);
  const ganhos = db.negocios.filter(
    (n) =>
      etapa(n.etapaId)?.tipo === "ganho" &&
      (n.fechadoEm || "").slice(0, 7) === mes,
  );
  const parados = abertos.filter((n) => diasDesde(n.atualizadoEm) >= 7);
  const atrasadas = abertas.filter((t) => t.quando < h);
  document.getElementById("resumo").innerHTML = [
    [
      dinheiro(abertos.reduce((s, n) => s + n.valor, 0)),
      `em ${abertos.length} negócios abertos`,
    ],
    [
      dinheiro(ganhos.reduce((s, n) => s + n.valor, 0)),
      `fechado este mês (${ganhos.length})`,
    ],
    [atrasadas.length, "follow-ups atrasados"],
    [parados.length, "negócios parados há 7+ dias"],
    [db.contatos.length, "contatos"],
  ]
    .map(([v, t]) => `<div class="numero"><b>${v}</b><span>${t}</span></div>`)
    .join("");
}

function desenharFunil() {
  const busca = document
    .getElementById("busca-funil")
    .value.trim()
    .toLowerCase();
  const kb = document.getElementById("kanban");
  kb.innerHTML = db.etapas
    .map((e, i) => {
      const lista = db.negocios.filter((n) => {
        if (n.etapaId !== e.id) return false;
        if (!busca) return true;
        const c = contato(n.contatoId);
        return [n.titulo, c?.nome, c?.empresa]
          .join(" ")
          .toLowerCase()
          .includes(busca);
      });
      const total = lista.reduce((s, n) => s + n.valor, 0);
      return `<div class="coluna" data-etapa="${e.id}" style="--cor:${esc(e.cor)}">
        <header><b>${esc(e.nome)}</b><small>${lista.length} · ${dinheiro(total)}</small></header>
        <div class="cartoes">${lista
          .map((n) => {
            const c = contato(n.contatoId);
            const dias = diasDesde(n.atualizadoEm);
            return `<div class="cartao" draggable="true" data-negocio="${n.id}">
              <b>${esc(n.titulo)}</b>
              <small>${esc(c?.nome || "?")}${c?.empresa ? " · " + esc(c.empresa) : ""}</small>
              <small>${dinheiro(n.valor)}</small>
              ${e.tipo === "aberta" && dias >= 7 ? `<small class="parado">parado há ${dias} dias</small>` : ""}
              <div class="acoes">
                <button class="zap mini" data-zap="${n.contatoId}" data-neg="${n.id}">WhatsApp</button>
                ${i > 0 ? `<button class="mini" data-mover="${n.id}" data-para="${db.etapas[i - 1].id}" title="Etapa anterior">◀</button>` : ""}
                ${i < db.etapas.length - 1 ? `<button class="mini" data-mover="${n.id}" data-para="${db.etapas[i + 1].id}" title="Próxima etapa">▶</button>` : ""}
              </div>
            </div>`;
          })
          .join("")}</div>
      </div>`;
    })
    .join("");
}

function desenharContatos() {
  const busca = document
    .getElementById("busca-contatos")
    .value.trim()
    .toLowerCase();
  const lista = db.contatos
    .filter(
      (c) =>
        !busca ||
        [
          c.nome,
          c.telefone,
          telefoneZap(c.telefone),
          c.empresa,
          c.cidade,
          (c.etiquetas || []).join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(busca),
    )
    .sort((a, b) => a.nome.localeCompare(b.nome));
  document.getElementById("tabela-contatos").innerHTML =
    lista
      .map(
        (c) => `<tr>
      <td><a href="#" data-contato="${c.id}">${esc(c.nome)}</a></td>
      <td>${esc(telefoneBonito(c.telefone))}</td>
      <td>${esc(c.empresa)}</td>
      <td>${esc(c.cidade)}</td>
      <td>${(c.etiquetas || []).map((t) => `<span class="etiqueta">${esc(t)}</span>`).join("")}</td>
      <td><button class="zap mini" data-zap="${c.id}">WhatsApp</button> <button class="mini" data-tarefa="${c.id}">+ Follow-up</button></td>
    </tr>`,
      )
      .join("") ||
    `<tr><td colspan="6" class="vazio">${busca ? "Nada encontrado." : "Nenhum contato ainda. Clique em + Contato ou carregue o exemplo em Ajustes."}</td></tr>`;
}

function desenharModelos() {
  document.getElementById("lista-modelos").innerHTML =
    db.modelos
      .map(
        (m) =>
          `<li><div class="cresce"><b>${esc(m.nome)}</b><br><small>${esc(m.texto)}</small></div><button class="mini" data-modelo="${m.id}">Editar</button></li>`,
      )
      .join("") || '<li class="vazio">Nenhum modelo.</li>';
}

function editarModelo(mid) {
  const m = mid
    ? db.modelos.find((x) => x.id === mid)
    : { nome: "", texto: "" };
  janela(
    `<h3>${mid ? "Editar modelo" : "Novo modelo"}</h3>
     <label>Nome<input name="nome" required value="${esc(m.nome)}"></label>
     <label>Mensagem<textarea name="texto" required rows="5">${esc(m.texto)}</textarea></label>
     <div class="rodape">
       ${mid ? '<button type="button" class="perigo" data-acao="excluir">Excluir</button>' : ""}
       <button value="cancelar" formnovalidate>Cancelar</button><button class="primario" value="ok">Salvar</button>
     </div>`,
    (f) => {
      if (mid) Object.assign(m, { nome: f.get("nome"), texto: f.get("texto") });
      else
        db.modelos.push({
          id: id(),
          nome: f.get("nome"),
          texto: f.get("texto"),
        });
      salvar();
    },
    (form) => {
      const b = form.querySelector('[data-acao="excluir"]');
      if (b)
        b.addEventListener("click", () => {
          db.modelos = db.modelos.filter((x) => x.id !== mid);
          dlg.close();
          salvar();
        });
    },
  );
}

function desenharEtapas() {
  document.getElementById("lista-etapas").innerHTML = db.etapas
    .map(
      (e, i) => `<li>
      <input type="color" value="${esc(e.cor)}" data-cor="${e.id}" style="width:44px;padding:2px">
      <div class="cresce"><input value="${esc(e.nome)}" data-nome-etapa="${e.id}"></div>
      <select data-tipo="${e.id}" style="width:auto">
        <option value="aberta" ${e.tipo === "aberta" ? "selected" : ""}>em andamento</option>
        <option value="ganho" ${e.tipo === "ganho" ? "selected" : ""}>ganho</option>
        <option value="perdido" ${e.tipo === "perdido" ? "selected" : ""}>perdido</option>
      </select>
      <button class="mini" data-subir="${i}" ${i === 0 ? "disabled" : ""}>↑</button>
      <button class="mini" data-descer="${i}" ${i === db.etapas.length - 1 ? "disabled" : ""}>↓</button>
      <button class="mini perigo" data-tirar-etapa="${e.id}">✕</button>
    </li>`,
    )
    .join("");
}

// ---------- Eventos ----------
document.getElementById("abas").addEventListener("click", (ev) => {
  const b = ev.target.closest("button[data-aba]");
  if (!b) return;
  document
    .querySelectorAll("#abas button")
    .forEach((x) => x.classList.toggle("ativa", x === b));
  document
    .querySelectorAll(".aba")
    .forEach((s) =>
      s.classList.toggle("ativa", s.id === "aba-" + b.dataset.aba),
    );
  try {
    localStorage.setItem(CHAVE + "-aba", b.dataset.aba);
  } catch {}
});

document.addEventListener("click", (ev) => {
  const t = ev.target.closest(
    "[data-zap],[data-feita],[data-adiar],[data-contato],[data-tarefa],[data-mover],[data-modelo],[data-subir],[data-descer],[data-tirar-etapa],.cartao",
  );
  if (!t || dlg.contains(t)) return;
  const d = t.dataset;
  if (d.zap) return abrirWhatsApp(d.zap, d.neg || null);
  if (d.feita) {
    const x = db.tarefas.find((y) => y.id === d.feita);
    x.feita = true;
    registrar(x.contatoId, `Follow-up feito: ${x.texto}`, x.negocioId);
    return salvar();
  }
  if (d.adiar) {
    const x = db.tarefas.find((y) => y.id === d.adiar);
    x.quando = somarDias(x.quando < hoje() ? hoje() : x.quando, 1);
    return salvar();
  }
  if (d.contato) {
    ev.preventDefault();
    return editarContato(d.contato);
  }
  if (d.tarefa) return novaTarefa(d.tarefa);
  if (d.mover) return moverNegocio(negocio(d.mover), d.para);
  if (d.modelo) return editarModelo(d.modelo);
  if (d.subir || d.descer) {
    const i = Number(d.subir ?? d.descer);
    const j = d.subir ? i - 1 : i + 1;
    [db.etapas[i], db.etapas[j]] = [db.etapas[j], db.etapas[i]];
    return salvar();
  }
  if (d.tirarEtapa) {
    if (db.etapas.length === 1)
      return alert("O funil precisa de pelo menos uma etapa.");
    const qtd = db.negocios.filter((n) => n.etapaId === d.tirarEtapa).length;
    if (qtd)
      return alert(
        `Essa etapa tem ${qtd} negócio(s). Mova-os antes de excluir.`,
      );
    db.etapas = db.etapas.filter((e) => e.id !== d.tirarEtapa);
    return salvar();
  }
  if (t.classList.contains("cartao")) return editarNegocio(d.negocio);
});

document.addEventListener("change", (ev) => {
  const d = ev.target.dataset;
  const e = etapa(d.nomeEtapa || d.cor || d.tipo);
  if (!e) return;
  if (d.nomeEtapa) e.nome = ev.target.value.trim() || e.nome;
  if (d.cor) e.cor = ev.target.value;
  if (d.tipo) e.tipo = ev.target.value;
  salvar();
});

// Arrastar e soltar no funil (computador). No celular use os botões ◀ ▶.
const kanban = document.getElementById("kanban");
kanban.addEventListener("dragstart", (ev) => {
  const c = ev.target.closest(".cartao");
  if (c) ev.dataTransfer.setData("text/plain", c.dataset.negocio);
});
kanban.addEventListener("dragover", (ev) => {
  const col = ev.target.closest(".coluna");
  if (!col) return;
  ev.preventDefault();
  kanban
    .querySelectorAll(".alvo")
    .forEach((x) => x !== col && x.classList.remove("alvo"));
  col.classList.add("alvo");
});
kanban.addEventListener("drop", (ev) => {
  const col = ev.target.closest(".coluna");
  if (!col) return;
  ev.preventDefault();
  const n = negocio(ev.dataTransfer.getData("text/plain"));
  if (n) moverNegocio(n, col.dataset.etapa);
  else desenharFunil();
});
kanban.addEventListener("dragend", () =>
  kanban.querySelectorAll(".alvo").forEach((x) => x.classList.remove("alvo")),
);

document.getElementById("busca-funil").addEventListener("input", desenharFunil);
document
  .getElementById("busca-contatos")
  .addEventListener("input", desenharContatos);
document
  .getElementById("novo-negocio")
  .addEventListener("click", () => editarNegocio());
document
  .getElementById("novo-contato")
  .addEventListener("click", () => editarContato());
document
  .getElementById("novo-modelo")
  .addEventListener("click", () => editarModelo());
document.getElementById("nova-etapa").addEventListener("click", () => {
  db.etapas.splice(
    Math.max(db.etapas.findLastIndex((e) => e.tipo === "aberta") + 1, 0),
    0,
    { id: id(), nome: "Nova etapa", cor: "#64748b", tipo: "aberta" },
  );
  salvar();
});

// ---------- Backup, CSV, exemplo ----------
function baixar(nome, conteudo, tipo) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([conteudo], { type: tipo }));
  a.download = nome;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

document
  .getElementById("exportar")
  .addEventListener("click", () =>
    baixar(
      `crm-backup-${hoje()}.json`,
      JSON.stringify(db, null, 2),
      "application/json",
    ),
  );
document.getElementById("importar").addEventListener("change", async (ev) => {
  const arq = ev.target.files[0];
  ev.target.value = "";
  if (!arq) return;
  try {
    const dados = JSON.parse(await arq.text());
    if (!Array.isArray(dados.contatos) || !Array.isArray(dados.etapas))
      throw new Error("formato");
    if (
      !confirm("Isso troca todos os dados atuais pelos do backup. Continuar?")
    )
      return;
    db = Object.assign(vazio(), dados);
    salvar();
  } catch {
    alert("Esse arquivo não parece um backup deste CRM.");
  }
});

function csvCampo(v) {
  const s = String(v ?? "");
  return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
document.getElementById("exportar-csv").addEventListener("click", () => {
  const linhas = [
    ["nome", "telefone", "empresa", "cidade", "origem", "etiquetas", "notas"],
  ];
  db.contatos.forEach((c) =>
    linhas.push([
      c.nome,
      c.telefone,
      c.empresa,
      c.cidade,
      c.origem,
      (c.etiquetas || []).join(", "),
      c.notas,
    ]),
  );
  // ";" e BOM para o Excel brasileiro abrir certinho
  baixar(
    `contatos-${hoje()}.csv`,
    "﻿" + linhas.map((l) => l.map(csvCampo).join(";")).join("\n"),
    "text/csv",
  );
});

function lerCSV(texto) {
  texto = texto.replace(/^﻿/, "");
  const primeira = texto.split(/\r?\n/)[0];
  const sep =
    (primeira.match(/;/g) || []).length >= (primeira.match(/,/g) || []).length
      ? ";"
      : ",";
  const linhas = [];
  let linha = [],
    campo = "",
    aspas = false;
  for (let i = 0; i < texto.length; i++) {
    const ch = texto[i];
    if (aspas) {
      if (ch === '"' && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (ch === '"') aspas = false;
      else campo += ch;
    } else if (ch === '"') aspas = true;
    else if (ch === sep) {
      linha.push(campo);
      campo = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && texto[i + 1] === "\n") i++;
      linha.push(campo);
      linhas.push(linha);
      linha = [];
      campo = "";
    } else campo += ch;
  }
  if (campo || linha.length) {
    linha.push(campo);
    linhas.push(linha);
  }
  return linhas.filter((l) => l.some((c) => c.trim()));
}

document
  .getElementById("importar-csv")
  .addEventListener("change", async (ev) => {
    const arq = ev.target.files[0];
    ev.target.value = "";
    if (!arq) return;
    const linhas = lerCSV(await arq.text());
    if (linhas.length < 2) return alert("O arquivo está vazio.");
    const cab = linhas[0].map((h) => h.trim().toLowerCase());
    const col = (...nomes) => cab.findIndex((h) => nomes.includes(h));
    const iNome = col("nome", "name", "cliente");
    const iTel = col("telefone", "whatsapp", "celular", "phone", "fone");
    if (iNome < 0)
      return alert('Preciso de uma coluna chamada "nome" na primeira linha.');
    const iEmp = col("empresa", "company"),
      iCid = col("cidade", "city"),
      iOri = col("origem"),
      iEtq = col("etiquetas", "tags"),
      iNot = col("notas", "observações", "obs");
    const pega = (l, i) => (i >= 0 ? (l[i] || "").trim() : "");
    let novos = 0,
      repetidos = 0;
    const vistos = new Set(
      db.contatos.map((c) => telefoneZap(c.telefone)).filter(Boolean),
    );
    for (const l of linhas.slice(1)) {
      const nome = pega(l, iNome);
      if (!nome) continue;
      const tel = pega(l, iTel);
      if (tel && vistos.has(telefoneZap(tel))) {
        repetidos++;
        continue;
      }
      if (tel) vistos.add(telefoneZap(tel));
      const c = {
        id: id(),
        criadoEm: new Date().toISOString(),
        nome,
        telefone: tel,
        empresa: pega(l, iEmp),
        cidade: pega(l, iCid),
        origem: pega(l, iOri) || "Importado",
        etiquetas: pega(l, iEtq)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        notas: pega(l, iNot),
      };
      db.contatos.push(c);
      registrar(c.id, "Contato importado de planilha");
      novos++;
    }
    salvar();
    alert(
      `${novos} contato(s) importado(s).${repetidos ? ` ${repetidos} ignorado(s) por telefone repetido.` : ""}`,
    );
  });

document.getElementById("demo").addEventListener("click", () => {
  if (
    db.contatos.length &&
    !confirm("Isso troca os dados atuais por um exemplo. Continuar?")
  )
    return;
  db = vazio();
  const [novo, orc, neg, ganho] = db.etapas;
  const pessoas = [
    [
      "Marcos Silva",
      "11987654321",
      "Restaurante Sabor Caseiro",
      "São Paulo",
      ["restaurante"],
    ],
    [
      "Ana Souza",
      "11912345678",
      "Mercadinho da Ana",
      "Guarulhos",
      ["mercado", "varejo"],
    ],
    [
      "João Pereira",
      "11955554444",
      "Lanchonete Ponto Certo",
      "Osasco",
      ["lanchonete"],
    ],
    [
      "Carla Mendes",
      "11933332222",
      "Buffet Festa Boa",
      "Santo André",
      ["buffet", "eventos"],
    ],
  ];
  pessoas.forEach(([nome, telefone, empresa, cidade, etiquetas]) => {
    db.contatos.push({
      id: id(),
      criadoEm: new Date().toISOString(),
      nome,
      telefone,
      empresa,
      cidade,
      etiquetas,
      origem: "WhatsApp",
      notas: "",
    });
  });
  const [c1, c2, c3, c4] = db.contatos;
  const velho = new Date(Date.now() - 10 * 86400000).toISOString();
  const agora = new Date().toISOString();
  db.negocios.push(
    {
      id: id(),
      contatoId: c1.id,
      titulo: "Pedido semanal de carnes",
      valor: 2400,
      etapaId: neg.id,
      criadoEm: velho,
      atualizadoEm: velho,
      notas: "",
    },
    {
      id: id(),
      contatoId: c2.id,
      titulo: "Reposição de frios",
      valor: 850,
      etapaId: orc.id,
      criadoEm: agora,
      atualizadoEm: agora,
      notas: "",
    },
    {
      id: id(),
      contatoId: c3.id,
      titulo: "Primeiro pedido",
      valor: 600,
      etapaId: novo.id,
      criadoEm: agora,
      atualizadoEm: agora,
      notas: "",
    },
    {
      id: id(),
      contatoId: c4.id,
      titulo: "Festa de fim de ano",
      valor: 5200,
      etapaId: ganho.id,
      criadoEm: velho,
      atualizadoEm: agora,
      fechadoEm: agora,
      notas: "",
    },
  );
  db.tarefas.push(
    {
      id: id(),
      contatoId: c1.id,
      negocioId: db.negocios[0].id,
      texto: "Cobrar resposta do orçamento",
      quando: somarDias(hoje(), -2),
      feita: false,
    },
    {
      id: id(),
      contatoId: c2.id,
      negocioId: db.negocios[1].id,
      texto: "Confirmar quantidades",
      quando: hoje(),
      feita: false,
    },
    {
      id: id(),
      contatoId: c3.id,
      negocioId: null,
      texto: "Mandar tabela de preços",
      quando: somarDias(hoje(), 3),
      feita: false,
    },
  );
  db.contatos.forEach((c) => registrar(c.id, "Contato criado (exemplo)"));
  salvar();
});

document.getElementById("apagar").addEventListener("click", () => {
  if (
    !confirm(
      "Apagar TODOS os dados deste CRM? Baixe um backup antes se quiser guardar.",
    )
  )
    return;
  if (!confirm("Tem certeza? Não dá para desfazer.")) return;
  db = vazio();
  salvar();
});

// ---------- Início ----------
try {
  const aba = localStorage.getItem(CHAVE + "-aba");
  if (aba) document.querySelector(`#abas button[data-aba="${aba}"]`)?.click();
} catch {}
desenhar();
