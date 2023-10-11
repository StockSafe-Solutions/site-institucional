function entrar() {

    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;

    if (emailVar == "" || senhaVar == "") {
        alert("Preencha os campos em branco");
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
        if (resposta.ok) {
            
            console.warn(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_FUNCIONARIO = json.id_funcionario;
                sessionStorage.FOTO_USUARIO = json.foto;
                sessionStorage.DATANSC = json.data_nascimento;
                sessionStorage.FUNCAO = json.funcao;
                sessionStorage.SENHA = json.senha;
            });
            window.location = "../dashboard/dashboardFuncionarioM.html"
            setTimeout(function (){}, 1000);
        } 
        else {
            alert("Algo deu errado! Verifique seu email ou senha!")
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        alert("Algo deu errado! Verifique seu email ou senha!")
        console.log(erro);
    })
    return false;        
}

function voltarParaIndex() {
    window.location.href = "index.html";
}