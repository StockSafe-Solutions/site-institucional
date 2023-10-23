function listarFuncionarios() {
    fetch("/funcionario/listar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json)
                criarLiFuncionario(json)
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

function criarLiFuncionario(json) {
    let container = document.getElementById("container-funcionarios")
    container.innerHTML = ""
    for (servidor in json) {
        item = json[servidor]

        container.innerHTML += `
        <li class="funcionario">
            <span>
                <img src="../assets/img/fotosPadrao/undraw_profile.svg" alt="">
                <span>
                    <p><b>${item.nome}</b> - ${item.funcao}</p>
                </span>
            </span>
            <span>
                <button title="Editar informações">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#d2dcee}</style><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"/></svg>                                </button>
                </button>
                <a href="mailto:${item.email}">
                    <button title="Mandar email">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#dae2f1}</style><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                    </button>
                </a>
            </span>
        </li>`
    }
}

function reloadFuncionarios(){
    textoReload.innerText = "Atualizando"
    iconReload.style = "animation-name: girar; animation-duration: 2250ms; pointer-events: none"
    let i = 0
    let animacaoTexto = setInterval(()=>{
        if(i == 2){
            clearInterval(animacaoTexto)
        }
        textoReload.innerText += "."
        i++
    },1000)

    setTimeout(()=>{
        let now = new Date()
        textoReload.innerText = "Atualizado pela ultima vez às "+now.getHours()+":"+now.getMinutes()
        iconReload.style = ""
    },4500)

    if(iptPesquisa.value == ""){
        listarFuncionarios()
    } else{
        listarFuncionarios()
    }
}
setInterval(reloadFuncionarios,sessionStorage.intervalo_atualizacao)