/*************************
 * STORAGE HELPERS
 *************************/
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/*************************
 * AUTH (LOGIN)
 *************************/
function login(e) {
  e.preventDefault();

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user && pass) {
    localStorage.setItem("auth", "true");
    window.location.href = "index.html";
  }
}

function checkAuth() {
  if (!localStorage.getItem("auth")) {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("auth");
  window.location.href = "login.html";
}

/*************************
 * DASHBOARD
 *************************/
function loadDashboard() {
  if (!document.getElementById("totalClientes")) return;

  document.getElementById("totalClientes").innerText =
    getData("clientes").length;

  document.getElementById("totalServicos").innerText =
    getData("servicos").length;

  document.getElementById("totalAgendamentos").innerText =
    getData("agendamentos").length;
}

/*************************
 * CLIENTES
 *************************/
function cadastrarCliente() {
  const nome = document.getElementById("clienteNome").value;
  const telefone = document.getElementById("clienteTelefone").value;

  if (!nome || !telefone) return alert("Preencha todos os campos");

  const clientes = getData("clientes");
  clientes.push({ id: Date.now(), nome, telefone });

  setData("clientes", clientes);
  listarClientes();
}

function listarClientes() {
  const lista = document.getElementById("listaClientes");
  if (!lista) return;

  lista.innerHTML = "";

  getData("clientes").forEach(c => {
    lista.innerHTML += `
      <tr>
        <td>${c.nome}</td>
        <td>${c.telefone}</td>
        <td>
          <button onclick="excluirCliente(${c.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function excluirCliente(id) {
  const clientes = getData("clientes").filter(c => c.id !== id);
  setData("clientes", clientes);
  listarClientes();
}

/*************************
 * SERVIÇOS
 *************************/
function cadastrarServico() {
  const nome = document.getElementById("servicoNome").value;
  const preco = document.getElementById("servicoPreco").value;
  const duracao = document.getElementById("servicoDuracao").value;

  if (!nome || !preco || !duracao)
    return alert("Preencha todos os campos");

  const servicos = getData("servicos");
  servicos.push({ id: Date.now(), nome, preco, duracao });

  setData("servicos", servicos);
  listarServicos();
}

function listarServicos() {
  const lista = document.getElementById("listaServicos");
  if (!lista) return;

  lista.innerHTML = "";

  getData("servicos").forEach(s => {
    lista.innerHTML += `
      <tr>
        <td>${s.nome}</td>
        <td>R$ ${s.preco}</td>
        <td>${s.duracao} min</td>
        <td>
          <button onclick="excluirServico(${s.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function excluirServico(id) {
  const servicos = getData("servicos").filter(s => s.id !== id);
  setData("servicos", servicos);
  listarServicos();
}

/*************************
 * AGENDA
 *************************/
function carregarSelectsAgenda() {
  const clienteSelect = document.getElementById("agendaCliente");
  const servicoSelect = document.getElementById("agendaServico");

  if (!clienteSelect || !servicoSelect) return;

  clienteSelect.innerHTML = "";
  servicoSelect.innerHTML = "";

  getData("clientes").forEach(c => {
    clienteSelect.innerHTML += `<option value="${c.nome}">${c.nome}</option>`;
  });

  getData("servicos").forEach(s => {
    servicoSelect.innerHTML += `<option value="${s.nome}">${s.nome}</option>`;
  });
}

function agendar() {
  const cliente = document.getElementById("agendaCliente").value;
  const servico = document.getElementById("agendaServico").value;
  const data = document.getElementById("agendaData").value;
  const hora = document.getElementById("agendaHora").value;

  if (!cliente || !servico || !data || !hora)
    return alert("Preencha todos os campos");

  const agendamentos = getData("agendamentos");
  agendamentos.push({ id: Date.now(), cliente, servico, data, hora });

  setData("agendamentos", agendamentos);
  alert("Agendamento realizado!");
}

/*************************
 * INIT
 *************************/
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  loadDashboard();
  listarClientes();
  listarServicos();
  carregarSelectsAgenda();
});
