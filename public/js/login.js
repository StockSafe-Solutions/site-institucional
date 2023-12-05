

function entrar() {

    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;

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
    swal({
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
                sessionStorage.funcionario = JSON.stringify(json)
                carregarConfigs()
            });
        } else if(resposta.status == 406){
            resposta.text().then(texto => {
                swal({
                    icon: 'error',
                    title: 'Login inválido',
                    text: 'As credenciais informadas não correspondem à nenhum registro no nosso sistema.'
                })
            }) 
        }
        else {
            resposta.text().then(texto => {
                swal({
                    icon: 'error',
                    title: 'Erro ao realizar o login',
                    text: texto
                })
            })   
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}


function voltarParaIndex() {
    window.location.href = "index.html";
}

function carregarConfigs() {
    fetch("/configuracao/listar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                sessionStorage.banda_larga = json['banda_larga']
                sessionStorage.taxa_transferência = json['taxa_de_transferência'].replace(".",",")
                sessionStorage.intervalo_atualizacao = json['intervalo_atualizacao']
                window.location = "../dashboard/index.html"
            });
        }
        else{
            resposta.text().then(texto => {
                console.warn(texto)
        })}
    }).catch(function (erro) {
        console.log(erro);
    })
}
