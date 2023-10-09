function entrar() {

    var emailVar = emailInput.value;
    var senhaVar = senhaInput.value;

    if (emailVar == "" || senhaVar == "") {
        // cardErro.style.display = "block"
        mensagemErro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        // finalizarAguardar();
        // return false;
    }
    else {
        // setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

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
        console.log("ESTOU NO THEN DO entrar()!")
        alert("Está caindo no then")
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
                sessionStorage.CNPJ = json.cnpj;
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
            alert("Tá no else")
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        alert("Algo deu errado!")
        console.log(erro);
    })
    return false;        
}

function voltarParaIndex() {
    window.location.href = "index.html";
}