var editando = false

function mudarModo(){
    if(!editando){
        editando = true
        modoEditar()
    } else{
        editando = false
        editarPerfil()
    }
}

function carregarPerfil(){
    btnInfos.innerText = "Editar informações"

    iptNome.disabled = true
    iptFuncao.disabled = true
    iptDataNasc.disabled = true
    iptEmail.disabled = true
    btnSenha.disabled = true
    btnSenha.className = "btnDesabilitado"

    idUsuarioLogado = JSON.parse(sessionStorage["funcionario"]).id_funcionario

    fetch("/funcionario/selecionar/"+idUsuarioLogado, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.warn(resposta);
            resposta.json().then(json => {
                iptNome.value = json.nome
                iptFuncao.value = json.funcao
                iptEmail.value = json.email
                
                dataRaw = json.dtNasc
                dataFormat = dataRaw.slice(6,10)+"-"+dataRaw.slice(3,5)+"-"+dataRaw.slice(0,2)
                iptDataNasc.value = dataFormat
            });
        } 
        else {
            resposta.text().then(texto => {
                console.log(texto);
            })   
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

function modoEditar(){
    btnInfos.innerText = "Salvar"

    iptNome.disabled = false
    iptFuncao.disabled = false
    iptDataNasc.disabled = false
    iptEmail.disabled = false
    btnSenha.className = ""
}

function editarPerfil(){
    nomeVar = iptNome.value
    funcaoVar = iptFuncao.value
    dataVar = iptDataNasc.value
    emailVar = iptEmail.value

    var validacoes = true

    if(nomeVar.length > 125){
        validacoes = false;
        textoErro += "O nome deve ter no máximo 125 caracteres.\n";
    }
    if(funcaoVar.length > 75){
        validacoes = false;
        textoErro += "A função deve ter no máximo 75 caracteres.\n";
    }
    if(emailVar.length > 125){
        validacoes = false;
        textoErro += "O email deve ter no máximo 125 caracteres.\n";
    }
    if((emailVar.indexOf("@") == -1)||(emailVar.indexOf(".") == -1)){
        validacoes = false;
        textoErro += "Email inválido.";
    }
    if((nomeVar.length == 0)||(funcaoVar.length == 0)||(dataVar.length == 0)||(emailVar.length == 0)){
        validacoes = false;
        textoErro = "Preencha todos os campos.\n";
    }

    if(!validacoes){
        Swal.fire({
          title: "Campos inválidos!",
          text: textoErro,
          icon: "error"
       })
    } else{
        idUsuarioLogado = JSON.parse(sessionStorage["funcionario"]).id_funcionario
        fetch("/funcionario/alterar/"+idUsuarioLogado, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                funcaoServer: funcaoVar,
                dataServer: dataVar,
                emailServer: emailVar
            }),
        }).then(function (resposta) {
            console.log(resposta);
            if (resposta.ok) {
                Swal.fire({
                icon: 'success',
                title: 'Perfil alterado com sucesso!',
                text: 'Recarregando a página em 5 segundos...'
                })
            } 
            else {
                Swal.fire({
                title: 'Erro interno!',
                text: 'Erro no servidor do aplicativo. Contate seu administrador de TI.',
                icon: 'error'
                })
            }
            setTimeout(()=>{location.reload()},5000)
        }).catch(function (resposta) {
            console.log(resposta);
        })
    }
}

function trocarImagem(){
    alert("COLOCAR METODO AQUI")
}