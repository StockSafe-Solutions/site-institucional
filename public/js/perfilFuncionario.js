function cadastrarFuncionario(){
    alert("Ta entrando")
    var nome = ipt_nome.value;
    var dataNascimento = ipt_dataNasc.value;
    var funcao = ipt_funcao.value;
    var email = ipt_emailFuncionario.value;
    var senha = ipt_senhaFuncionario.value;
    
    fetch("/funcionario/cadastrarFuncionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            dataNascimentoServer: dataNascimento,
            funcaoServer: funcao,
            emailServer: email,
            senhaServer: senha
        })
    })
    .then(
        function(resposta) {
        console.log("resposta: ", resposta);

        if(resposta.ok){
            alert("Cadastro realizado com sucesso")
            setTimeout(() => {
                console.log(resposta)
            }, "2000");
        }else {
            alert("Houve um erro ao tentar realizar cadastro!")
        }
    }
    ).catch(
        function (resposta){
            console.log(`#ERRO: ${resposta}`);
        }
    )
    return false;
}

function enviarFoto() {
    alert("Ta entrando")
    const formData = new FormData();
    console.log(ipt_foto.files[0], formData)
    formData.append('foto', ipt_foto.files[0])
    alert("Ta entrando")
    // idUsuario = sessionStorage.ID_USUARIO
    var idFuncionario = sessionStorage.ID_FUNCIONARIO
    fetch(`/funcionario/enviarFoto/${idFuncionario}`, {
      method: "POST",
      body: formData
    })
      .then(res => {
        console.warn("Ta entrando2")
        //window.location = "./perfil.html"
      })
      .catch(err => {
        console.log(err);
      })
  }

