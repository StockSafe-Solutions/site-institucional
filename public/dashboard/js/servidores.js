function semServidores(pesquisa){
    if(!pesquisa){
        document.getElementById("iptPesquisa").disabled = true
        document.getElementById("iconPesquisa").style = "cursor: default; fill: grey"
    }

    container = document.getElementById("container-servidores")
    container.className = "container-vazio"
    container.innerHTML = `
    <p>
        Nenhum servidor encontrado<br>
        Utilize o botão "Adicionar novo" acima para adicionar novos servidores
    </p>`
}

function listarServidores() {
    fetch("/servidor/listar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if(resposta.status == 204){ semServidores(false) } 
        else if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json)
                criarLiServidor(json)
            });
        }
        else {
            resposta.text().then(texto => {
                console.warn(texto)
            })
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

function pesquisarServidores() {
    query = (iptPesquisa.value).toUpperCase()

    var caracteresPermitidos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,"A","B","C","D","E","F","G","H","I","J",
    "K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

    valido = true
    for(i in query){
        caractereInvalido = true
        for(c in caracteresPermitidos){
            if(query[i].indexOf(caracteresPermitidos[c]) != -1){
                caractereInvalido = false
                break
            }
        }
        if(caractereInvalido){
            valido = false
            break
        }
    }

    if(query == ""){
        listarServidores()
    }
    else if(!valido){
        Swal.fire({
            title: 'Pesquisa inválida',
            text: 'Você utilizou caracteres inválidos na sua pesquisa de servidores.',
            icon: 'error'
        })
        iptPesquisa.value = ""
    } else{
        fetch(("/servidor/selecionar/" + query), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
            if(resposta.status == 204){ semServidores(true) } 
            else if (resposta.ok) {
                console.log(resposta);
                resposta.json().then(json => {
                    console.log("a")
                    console.log(json)
                    criarLiServidor(json)
                });
            }
            else {
                resposta.text().then(texto => {
                    console.warn(texto)
                })
            }
        }).catch(function (erro) {
            console.log(erro);
        })
    }
}

function criarLiServidor(json) {
    let container = document.getElementById("container-servidores")
    container.innerHTML = ""
    container.className = ""
    
    for (servidor in json) {
        item = json[servidor]

        dataAtual = new Date()
        hoje = dataAtual.getDate() + "/" +
            (dataAtual.getMonth() + 1) + "/" +
            dataAtual.getFullYear()

        textoAtualizacao = ""
        if (item.ultimaData == null) {
            textoAtualizacao = "Servidor não autenticado"
        } else if (item.ultimaData == hoje) {
            textoAtualizacao = `Atualizado pela última vez às ${json[servidor].ultimoHorario} 
                        de hoje`
        } else {
            textoAtualizacao = `Atualizado pela última vez às ${json[servidor].ultimoHorario} 
                        de ${json[servidor].ultimaData}`
        }

        container.innerHTML += `
        <li class="servidor" onclick="abrirModal('dash','${item.codigo}')">
            <img src="../assets/img/dashboard/servidor.png" alt="">
            <span>
                <h3>${item.codigo}</h3>
                <p>${textoAtualizacao}</p>
            </span>
        </li>`
    }
}

function abrirModal(modal,codigo){
    switch(modal){
        case "cad":
            modalCadServidor()
            break
        case "dash":
            modalDashServidor(codigo)
            break
    }
    containerModal.style = "display: flex"
}
function fecharModal(){
    modalCadastro.style = "display: none"
    modalDashboard.style = "display: none"
    containerModal.style = "display: none"
}

function modalCadServidor(){
    modalCadastro.style = "display: flex"
}
function modalDashServidor(codigo){
    modalDashboard.style = "display: flex"
    codigoServ.innerText = codigo
}