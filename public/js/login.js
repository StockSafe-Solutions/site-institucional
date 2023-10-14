function entrar() {
    var emailVar = emailInput.value;
    var senhaVar = senhaInput.value;

    var validacoes = true;
    var textoErro = "";

    if((emailVar.indexOf("@") == -1)||(emailVar.indexOf(".") == -1)||(emailVar.length > 125)){
        validacoes = false;
        textoErro += "Email inválido.";
    }
    if(senhaVar.length > 20){
        validacoes = false;
        textoErro += "Senha inválida.";
      }
    if((emailVar.length == 0)||(senhaVar.length == 0)){
        validacoes = false;
        textoErro = "Preencha todos os campos.";
    }

    if(!validacoes){
    Swal.fire({
        title: "Campos inválidos!",
        text: textoErro,
        icon: "error"
    })
    }

    fetch("/funcionario/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.warn(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_FUNCIONARIO = json.id;
                sessionStorage.ID_USUARIO = json.idUsuario
                sessionStorage.FOTO_USUARIO = json.foto;
                sessionStorage.DATANSC = json.dataNascimento;
                sessionStorage.FUNCAO = json.funcao;
                sessionStorage.SENHA = json.senha;
                sessionStorage.TIPO = json.tipo;
                if(json.tipo == '1'){
                    window.location = "../dashboard/dashboardFuncionarioM.html"
                }else{
                    window.location = "../dashboard/index.html";
                }
                setTimeout(function (){}, 1000);
            });
        } 
        else {
            resposta.text().then(texto => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao realizar o login',
                    text: texto
                })
            })
            
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false; 
}

function voltarParaIndex() {
    window.location.href = "index.html";
}