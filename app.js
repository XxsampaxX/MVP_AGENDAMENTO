function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* CLIENTES */
function cadastrarCliente(nome, telefone) {
  const clientes = getData("clientes");
  clientes.push({ id: Date.now(), nome, telefone });
  setData("clientes", clientes);
  carregarSelects();
  atualizarDashboard();
}

/* SERVIÇOS */
function cadastrarServico(nome, preco, duracao) {
  const servicos = getData("servicos");
  servicos.push({ id: Date.now(), nome, preco, duracao });
  setData("servicos", servicos);
  carregarSelects();
  atualizarDashboard();
}

/* AGENDAMENTO */
function agendarServico(clienteId, servicoId, data, hora) {
  const agendamentos = getData("agendamentos");
  agendamentos.push({ clienteId, servicoId, data, hora });
  setData("agendamentos", agendamentos);
  atualizarDashboard();
}

/* SELECTS */
function carregarSelects() {
  const clientes = getData("clientes");
  const servicos = getData("servicos");

  clienteSelect.innerHTML = clientes.map(c =>
    `<option value="${c.id}">${c.nome}</option>`
  ).join("");

  servicoSelect.innerHTML = servicos.map(s =>
    `<option value="${s.id}">${s.nome}</option>`
  ).join("");
}

/* DASHBOARD */
function atualizarDashboard() {
  totalClientes.innerText = getData("clientes").length;
  totalServicos.innerText = getData("servicos").length;
  totalAgendamentos.innerText = getData("agendamentos").length;
  gerarGrafico();
}

function gerarGrafico() {
  const agendamentos = getData("agendamentos");
  const servicos = getData("servicos");
  let total = 0;

  agendamentos.forEach(a => {
    const s = servicos.find(x => x.id == a.servicoId);
    if (s) total += Number(s.preco);
  });

  const ctx = document.getElementById("grafico");
  if (window.chart) window.chart.destroy();

  window.chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Faturamento"],
      datasets: [{ data: [total] }]
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarSelects();
  atualizarDashboard();
});
