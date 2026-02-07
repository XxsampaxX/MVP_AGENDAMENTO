/* =========================
   CONTROLE DE LOGIN
========================= */
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
if (!usuario) {
  window.location.href = "login.html";
}

/* =========================
   DADOS MOCK (MVP)
========================= */
const clientes = [
  {
    nome: "João Silva",
    telefone: "11999999999",
    totalGasto: 350
  },
  {
    nome: "Maria Souza",
    telefone: "11988888888",
    totalGasto: 120
  }
];

const agendamentos = [
  {
    cliente: "João Silva",
    telefone: "11999999999",
    servico: "Corte Masculino",
    valor: 50,
    data: "2026-02-01",
    hora: "14:00",
    status: "Confirmado"
  },
  {
    cliente: "Maria Souza",
    telefone: "11988888888",
    servico: "Limpeza de Pele",
    valor: 120,
    data: "2026-02-02",
    hora: "15:00",
    status: "Confirmado"
  }
];

/* =========================
   LOGOUT
========================= */
function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}

/* =========================
   NAVEGAÇÃO
========================= */
function show(sectionId) {
  document.querySelectorAll("section").forEach(s =>
    s.classList.add("hidden")
  );
  document.getElementById(sectionId).classList.remove("hidden");

  if (sectionId === "dashboard") loadDashboard();
  if (sectionId === "agenda") loadAgenda();
  if (sectionId === "clientes") loadClientes();
  if (sectionId === "servicos") loadServicos();
}

/* =========================
   DASHBOARD
========================= */
function loadDashboard() {
  const faturamentoTotal = agendamentos.reduce(
    (total, a) => total + a.valor,
    0
  );

  document.getElementById("dashboard").innerHTML = `
    <div class="dashboard-grid">
      <div class="card dashboard-card">
        <h3>Faturamento</h3>
        <p>R$ ${faturamentoTotal}</p>
      </div>
      <div class="card dashboard-card">
        <h3>Atendimentos</h3>
        <p>${agendamentos.length}</p>
      </div>
      <div class="card dashboard-card">
        <h3>Clientes</h3>
        <p>${clientes.length}</p>
      </div>
    </div>

    <div class="card">
      <canvas id="graficoFaturamento"></canvas>
    </div>
  `;

  gerarGraficoFaturamento();
}

function gerarGraficoFaturamento() {
  const faturamentoPorDia = {};

  agendamentos.forEach(a => {
    faturamentoPorDia[a.data] =
      (faturamentoPorDia[a.data] || 0) + a.valor;
  });

  new Chart(document.getElementById("graficoFaturamento"), {
    type: "bar",
    data: {
      labels: Object.keys(faturamentoPorDia),
      datasets: [
        {
          label: "Faturamento (R$)",
          data: Object.values(faturamentoPorDia)
        }
      ]
    },
    options: {
      plugins: {
        legend: { display: false }
      }
    }
  });
}

/* =========================
   AGENDA
========================= */
function loadAgenda() {
  document.getElementById("agenda").innerHTML = agendamentos
    .map(
      a => `
    <div class="card agenda-item">
      <div class="agenda-info">
        <strong>${a.hora} - ${a.cliente}</strong>
        <span>${a.servico} | ${a.data}</span>
        <span>Status: ${a.status}</span>
      </div>
      <button onclick="confirmarWhatsApp(
        '${a.cliente}',
        '${a.telefone}',
        '${a.data}',
        '${a.hora}',
        '${a.servico}'
      )">
        WhatsApp
      </button>
    </div>
  `
    )
    .join("");
}

/* =========================
   CLIENTES (CRM)
========================= */
function loadClientes() {
  document.getElementById("clientes").innerHTML = clientes
    .map(
      c => `
    <div class="card">
      <strong>${c.nome}</strong><br>
      Telefone: ${c.telefone}<br>
      Total gasto: R$ ${c.totalGasto}
      ${
        c.totalGasto >= 300
          ? '<span class="vip"> ⭐ Cliente VIP</span>'
          : ""
      }
    </div>
  `
    )
    .join("");
}

/* =========================
   SERVIÇOS (BÁSICO)
========================= */
function loadServicos() {
  document.getElementById("servicos").innerHTML = `
    <div class="card">
      <strong>Corte Masculino</strong><br>
      Duração: 30 min<br>
      Valor: R$ 50
    </div>
    <div class="card">
      <strong>Limpeza de Pele</strong><br>
      Duração: 60 min<br>
      Valor: R$ 120
    </div>
  `;
}

/* =========================
   WHATSAPP
========================= */
function confirmarWhatsApp(cliente, telefone, data, hora, servico) {
  const mensagem = `
Olá ${cliente} 👋
Seu agendamento foi confirmado ✅

📅 Data: ${data}
⏰ Horário: ${hora}
💼 Serviço: ${servico}

Qualquer dúvida é só responder essa mensagem 😊
  `;

  const texto = encodeURIComponent(mensagem);
  const numero = telefone.replace(/\D/g, "");

  window.open(`https://wa.me/55${numero}?text=${texto}`, "_blank");
}

/* =========================
   INIT
========================= */
show("dashboard");
