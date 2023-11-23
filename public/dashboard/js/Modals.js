function abrirModal(modal, codigo) {
    containerModal.value = "";
    switch (modal) {
        case "cad":
            gerarCodigo()
            modalCadastro.style = "display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(() => {
                modalCadastro.style = "display: flex"
            }, 1000)
            break
        case "dash":
            frameDashboard.src = "index.html?" + codigo
            modalDashboard.style = "display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(() => {
                modalDashboard.style = "display: flex"
            }, 1000)
            break
        case "func":
            modalCadFunc.style = "display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(() => {
                modalCadFunc.style = "display: flex"
            }, 1000)
            break
        case "solicitacoes":
            modalSolic.style = "display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(() => {
                modalSolic.style = "display: flex";
            }, 1000);
            break;
        case "editFunc":
            frameFuncionario.src = "perfil.html?" + codigo
            modalEditFunc.style = "display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(() => {
                modalEditFunc.style = "display: flex";
            }, 1000);
            break;
        case "grafico":
            modalGraficoFunc.style = "display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(() => {
                modalGraficoFunc.style = "display: flex"
            }, 1000)
            break

    }
    setTimeout(() => {
        containerModal.style = "display: flex"
    }, 500)
}
function fecharModal(modal) {
    switch (modal) {
        case "cad":
            modalCadastro.style = "display: flex; animation-name: sumir; animation-duration: 300ms;"
            setTimeout(() => {
                modalCadastro.style = ""
            }, 200)
            break
        case "dash":
            modalDashboard.style = "display: flex; animation-name: sumir; animation-duration: 300ms;"
            setTimeout(() => {
                modalDashboard.style = ""
            }, 200)
            break
        case "func":
            modalCadFunc.style = "display: flex; animation-name: sumir; animation-duration: 300ms;"
            setTimeout(() => {
                modalCadFunc.style = ""
            }, 200)
            break
        case "solicitacoes":
            modalSolic.style = "display: flex; animation-name: sumir; animation-duration: 300ms;";
            setTimeout(() => {
                modalSolic.style = "";
            }, 200);
            break;
        case "editFunc":
            modalEditFunc.style = "display: flex; animation-name: sumir; animation-duration: 300ms;";
            setTimeout(() => {
                modalEditFunc.style = "";
            }, 200);
            break;
        case "grafico":
        modalGraficoFunc.style = "display: flex; animation-name: sumir; animation-duration: 300ms;";
            setTimeout(() => {
                modalGraficoFunc.style= "";
            }, 200);
            break;

    }
    setTimeout(() => {
        containerModal.style = "display: none"
    }, 200)
}

function gerarCodigo() {
    var caracteresPermitidos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    codigoJaExiste = true
    while (codigoJaExiste) {
        novoCodigo = ""
        for (var i = 0; i < 6; i++) {
            aleatorio = 36
            while (aleatorio >= 36) {
                aleatorio = Math.round(Math.random() * 36)
            }
            novoCodigo += caracteresPermitidos[aleatorio]
        }
        codigoJaExiste = verificarCodigo(novoCodigo)
    }
    iptCodigo.value = novoCodigo
}
function verificarCodigo(novoCodigo) {
    fetch(("/servidor/selecionar/" + novoCodigo), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.status == 204) { return true }
        else { return false }
    }).catch(function (erro) {
        console.log(erro);
    })
}
function cadastrarServidor() {
    codigoVar = iptCodigo.value
    fetch("/servidor/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            codigoServer: codigoVar
        }),
    }).then(function (resposta) {
        console.log("resposta: ", resposta);
        fecharModal("cad")
        if (resposta.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Servidor cadastrado com sucesso!',
                text: 'Você deve autenticar o Monitor de Recursos com o código desse servidor para visualizar suas informações.'
            })
            reloadServidores()
        }
        else {
            Swal.fire({
                title: 'Erro interno!',
                text: 'Erro no servidor do aplicativo. Contate seu administrador de TI.',
                icon: 'error'
            })
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    }
    );
}