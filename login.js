
const usuarios = [
  { usuario: "admin", senha: "123", perfil: "ADMIN" },
  { usuario: "joao", senha: "123", perfil: "PROFISSIONAL" }
];

function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  const encontrado = usuarios.find(
    u => u.usuario === user && u.senha === pass
  );

  if (!encontrado) {
    document.getElementById("erro").innerText = "Usuário ou senha inválidos";
    return;
  }

  localStorage.setItem("usuarioLogado", JSON.stringify(encontrado));
  window.location.href = "index.html";
}
