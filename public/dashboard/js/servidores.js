function listarServidores() {
    fetch("/servidor/listar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
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

function pesquisarServidores(){
    query = iptPesquisa.value

    fetch(("/servidor/selecionar/"+query), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
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

function criarLiServidor(json) {
    let container = document.getElementById("container-servidores")
    container.innerHTML = ""
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
        <li class="servidor">
            <img src="../assets/img/dashboard/servidor.png" alt="">
            <span>
                <h3>${item.codigo}</h3>
                <p>${textoAtualizacao}</p>
            </span>
        </li>`
    }
}