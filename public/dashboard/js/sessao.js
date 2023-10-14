/*
    Códigos relativos à sessão do usuário logado
*/

//Verifica se a session storage do funcionario existe
if(sessionStorage.funcionario == undefined){
    window.location = "../index.html"
}

function sair(){
    sessionStorage.clear()
    window.location = "../index.html"
}