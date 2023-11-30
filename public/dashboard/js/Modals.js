

function abrirModal(modal, codigo) {
    containerModal.value = "";
    switch (modal) {
        case "cad":
            gerarCodigo()
            modalCadastro.style = "display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(()=>{
                modalCadastro.style = "display: flex"
            },1000)
            break
        case "dash":
            frameDashboard.src="index.html?id="+codigo
            modalDashboard.style = "display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(()=>{
                modalDashboard.style = "display: flex"
            },1000)
            break
        case "func":
            modalCadFunc.style = "display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(()=>{
                modalCadFunc.style = "display: flex"
            },1000)
            break
        case "solicitacoes":
            modalSolic.style ="display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(()=>{
                modalSolic.style = "display: flex";
            }, 1000);
            break;
        case "editFunc":
            frameFuncionario.src="perfil.html?"+codigo
            modalEditFunc.style ="display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(()=>{
                modalEditFunc.style = "display: flex";
            }, 1000);
            break;
        case "hist":
            graficoTagHistorico.innerHTML = '<img src="../assets/img/dashboard/loading.gif">'
            graficoTagHistorico.className = "graficoCarregando"
            modalTagHistorico.style ="display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(()=>{
                modalTagHistorico.style = "display: flex";
                reloadHistorico()
            }, 1000);
            break;
        case "tagAdd":
            modalTagNova.style ="display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(()=>{
                modalTagNova.style = "display: flex";
            }, 1000);
            break;
        case "tagExcl":
            carregarTagsModalExcl()
            modalTagExcluir.style ="display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(()=>{
                modalTagExcluir.style = "display: flex";
            }, 1000);
            break;
    }
    setTimeout(()=>{
        containerModal.style = "display: flex"
    },500)
}
function fecharModal(modal) {
    let idDaModal = ""
    switch (modal) {
        case "cad":
            idDaModal = "modalCadastro"
            break
        case "dash":
            idDaModal = "modalDashboard"
            break
        case "func":
            idDaModal = "modalCadFunc"
            break
        case "solicitacoes":
            idDaModal = "modalSolic"
            break;    
        case "editFunc":
            idDaModal = "modalEditFunc"
            break;
        case "hist":
            idDaModal = "modalTagHistorico"
            break;
        case "tagAdd":
            idDaModal = "modalTagNova"
            break;
        case "tagExcl":
            idDaModal = "modalTagExcluir"
            break;
        }

    let modalEscolhida = document.getElementById(idDaModal)
    modalEscolhida.style = "display: flex; animation-name: sumir; animation-duration: 300ms;"
            setTimeout(()=>{
                modalEscolhida.style = ""
            },200)

    setTimeout(()=>{
        containerModal.style = "display: none"
    },200)
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
            swal({
                icon: 'success',
                title: 'Servidor cadastrado com sucesso!',
                text: 'Você deve autenticar o Monitor de Recursos com o código desse servidor para visualizar suas informações.'
            })
            reloadServidores()
        }
        else {
            swal({
                title: 'Erro interno!',
                text: 'Erro no servidor do aplicativo. Contate seu administrador de TI.',
                icon: 'error'
            })
        }}).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        }
    );
}