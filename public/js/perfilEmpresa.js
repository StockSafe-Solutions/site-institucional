// var nomeUser = document.getElementById("nomeUsuario");
// var nome = sessionStorage.NOME_USUARIO;
// nomeUser.innerHTML = nome;

// var nomeUsuario = document.getElementById("nomeDoUsuario");
// var nomeDoUsuario = sessionStorage.NOME_USUARIO;
// nomeUsuario.innerHTML = nomeUsuario;

ipt_cnpjEmpresa.value = sessionStorage.CNPJ;
ipt_emailEmpresa.value = sessionStorage.EMAIL_USUARIO;
ipt_senhaEmpresa.value = sessionStorage.SENHA;

var senha = $('#ipt_senhaEmpresa');
var olho= $("#olho");

olho.mousedown(function() {
  senha.attr("type", "text");
});

olho.mouseup(function() {
  senha.attr("type", "password");
});

$( "#olho" ).mouseout(function() { 
  $("#senha").attr("type", "password");
});


function pegarDadosEmpresa() {
    var idUsuario = sessionStorage.ID_USUARIO
    nomeUsuario.innerHTML = sessionStorage.NOME_USUARIO;
    // cnpj = ipt_cnpjEmpresa.value;
    // email = ipt_emailEmpresa.value;
    // senha = ipt_senhaEmpresa.value;


    fetch(`/perfilEmpresa/pegarDadosEmpresa/${idUsuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(
            function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    alert("Dados puxados com sucesso")
                    setTimeout(() => {
                        // console.log(resposta)
                        var dados = resposta[0]
                        console.log(dados)
                        alert(dados.cnpj)
                        // nomeUsuario.innerHTML = dados.cnpj
                    }, "2000");
                } else {
                    alert("Houve um erro ao tentar puxar os dados!")
                }
            }
        ).catch(
            function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            }
        )
    return false;
}

function alterarDados() {
    senha = ipt_senhaEmpresa.value;
    idUsuario = sessionStorage.ID_USUARIO

    fetch(`/perfilEmpresa/alterarDados/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            senhaServer: senha,
            idUsuarioServer: idUsuario
        })
    })
    .then(
        function(resposta) {
        console.log("resposta: ", resposta);

        if(resposta.ok){
            alert("Dados atualizados")
            setTimeout(() => {
                console.log(resposta)
            }, "2000");
        }else {
            alert("Houve um erro ao tentar realizar o update!")
        }
    }
    ).catch(
        function (resposta){
            console.log(`#ERRO: ${resposta}`);
        }
    )
    return false;
}



