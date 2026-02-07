function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if ((user === "admin" || user === "joao") && pass === "123") {
    localStorage.setItem("logado", true);
    window.location.href = "index.html";
  } else {
    alert("Usuário ou senha inválidos");
  }
}

function logout() {
  localStorage.removeItem("logado");
  window.location.href = "login.html";
}
