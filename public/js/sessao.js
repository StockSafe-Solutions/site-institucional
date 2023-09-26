// sessão
function validarSessao() {
var email = sessionStorage.EMAIL_USUARIO;
var nome = sessionStorage.NOME_USUARIO;
var cnpj = sessionStorage.CNPJ

var bUsuario = document.getElementById("bUsuario");

if (email != null && nome != null) {
    bUsuario.innerHTML = nome;
} else {
    window.location = "../dashboard/index.html";
}
}

// function limparSessao() {
//     sessionStorage.clear();
//     window.location = "../login.html";
// }

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

