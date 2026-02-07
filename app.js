/* ======================
   STORAGE
====================== */
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ======================
   CLIENTES
====================== */
function cadastrarCliente(nome, telefone) {
  if (!nome || !telefone) return alert("Preencha todos os campos");

  const clientes = getData("clientes");
  clientes.push({ id: Date.now(), nome, telefone });
  setData("clientes", clientes);

  listarClientes();
}

function listarClientes() {
  const lista = document.getElementById("listaClientes");
  if (!lista) return;

  const clientes = getData("clientes");
  lista.innerHTML = "";

  clientes.forEach(c => {
    lista.innerHTML += `
      <div class="list-item">
        <span>${c.nome}</span>
        <span>${c.telefone}</span>
      </div>
    `;
  });
}

/* ======================
   SERVIÇOS
====================== */
function cadastrarServico(nome, preco, duracao) {
  if (!nome || !preco || !duracao) return alert("Preencha todos os campos");

  const servicos = getData("servicos");
  servicos.push({ id: Date.now(), nome, preco, duracao });
  setData("servicos", servicos);

  listarServicos();
}

function listarServicos() {
  const lista = document.getElementById("listaServicos");
  if (!lista) return;

  const servicos = getData("servicos");
  lista.innerHTML = "";

  servicos.forEach(s => {
    lista.innerHTML += `
      <div class="list-item">
        <span>${s.nome}</span>
        <span>R$ ${s.preco}</span>
        <span>${s.duracao} min</span>
      </div>
    `;
  });
}

/* ======================
   AGENDAMENTOS
====================== */
function agendarServico(clienteId, servicoId, data, hora) {
  if (!clienteId || !servicoId || !data || !hora) {
    return alert("Preencha todos os campos");
  }

  const agendamentos = getData("agendamentos");
  agendamentos.push({
    id: Date.now(),
    clienteId,
    servicoId,
    data,
    hora
  });

  setData("agendamentos", agendamentos);
  listarAgendamentos();
}

function listarAgendamentos() {
  const lista = document.getElementById("listaAgendamentos");
  if (!lista) return;

  const clientes = getData("clientes");
  const servicos = getData("servicos");
  const agendamentos = getData("agendamentos");

  lista.innerHTML = "";

  agendamentos.forEach(a => {
    const cliente = clientes.find(c => c.id == a.clienteId);
    const servico = servicos.find(s => s.id == a.servicoId);

    lista.innerHTML += `
      <div class="list-item agenda-item">
        <span>${cliente?.nome || "-"}</span>
        <span>${servico?.nome || "-"}</span>
        <span>${a.data} ${a.hora}</span>
      </div>
    `;
  });
}

/* ======================
   DASHBOARD
====================== */
function atualizarDashboard() {
  if (document.getElementById("totalClientes")) {
    totalClientes.innerText = getData("clientes").length;
    totalServicos.innerText = getData("servicos").length;
    totalAgendamentos.innerText = getData("agendamentos").length;
  }
}

/* ======================
   INIT
====================== */
document.addEventListener("DOMContentLoaded", () => {
  listarClientes();
  listarServicos();
  listarAgendamentos();
  atualizarDashboard();

  carregarSelects();
});

/* ======================
   SELECTS (AGENDA)
====================== */
function carregarSelects() {
  const clienteSelect = document.getElementById("clienteSelect");
  const servicoSelect = document.getElementById("servicoSelect");

  if (!clienteSelect || !servicoSelect) return;

  const clientes = getData("clientes");
  const servicos = getData("servicos");

  clienteSelect.innerHTML = clientes.map(c =>
    `<option value="${c.id}">${c.nome}</option>`
  ).join("");

  servicoSelect.innerHTML = servicos.map(s =>
    `<option value="${s.id}">${s.nome}</option>`
  ).join("");
}
