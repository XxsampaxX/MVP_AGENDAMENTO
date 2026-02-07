
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
if (!usuario) window.location.href = "login.html";

const clientes = [
  { nome: "João Silva", telefone: "11999999999", totalGasto: 350 },
  { nome: "Maria Souza", telefone: "11988888888", totalGasto: 120 }
];

const agendamentos = [
  { cliente: "João Silva", valor: 50, data: "2026-02-01", hora: "14:00", servico: "Corte" },
  { cliente: "Maria Souza", valor: 120, data: "2026-02-02", hora: "15:00", servico: "Estética" }
];

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}

function show(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  if (id === "dashboard") loadDashboard();
  if (id === "clientes") loadClientes();
  if (id === "agenda") loadAgenda();
}

function loadDashboard() {
  document.getElementById("dashboard").innerHTML = `
    <div class="card"><canvas id="graficoFaturamento"></canvas></div>
  `;

  const total = {};
  agendamentos.forEach(a => {
    total[a.data] = (total[a.data] || 0) + a.valor;
  });

  new Chart(document.getElementById("graficoFaturamento"), {
    type: "bar",
    data: {
      labels: Object.keys(total),
      datasets: [{ label: "Faturamento", data: Object.values(total) }]
    }
  });
}

function loadClientes() {
  document.getElementById("clientes").innerHTML = clientes.map(c =>
    `<div class="card">${c.nome} - R$ ${c.totalGasto}</div>`
  ).join("");
}

function loadAgenda() {
  document.getElementById("agenda").innerHTML = agendamentos.map(a =>
    `<div class="card">
      ${a.data} ${a.hora} - ${a.cliente} (${a.servico})
      <button onclick="confirmarWhatsApp('${a.cliente}','${clientes[0].telefone}','${a.data}','${a.hora}','${a.servico}')">
        WhatsApp
      </button>
    </div>`
  ).join("");
}

function confirmarWhatsApp(cliente, telefone, data, hora, servico) {
  const msg = encodeURIComponent(
    `Olá ${cliente}! Seu agendamento foi confirmado. Data: ${data} Hora: ${hora} Serviço: ${servico}`
  );
  window.open(`https://wa.me/55${telefone}?text=${msg}`, "_blank");
}

show("dashboard");
