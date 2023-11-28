

function carregarDashboardTags(){
    frameTags.contentWindow.document.body.innerHTML = `
        <style>
            body {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 90vh !important;
            }
            div {
                font-family: "Nunito","Segoe UI", Roboto, "Helvetica Neue", Arial;
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                color: #858796;
                text-align: left;
            }
        </style>
        <div>
            Selecione tags para visualizar gráficos e KPIs de acordo com elas.
        </div>`
    carregarKPIs()

    setInterval(sessionStorage.intervalo_atualizacao, reloadTags())
}

function reloadTags(){
    if(iptNomeTag.value == ""){
        tagsPorNome()
    }
    
    carregarServidoresModalAdicionarTag()
}

function carregarKPIs(){
    fetch("/tag/kpisTags", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.status == 204) { 
            
        }
        else if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                dadosKpis = json[0]

                kpi1.appendChild(gerarTag("tagKPI1",
                    dadosKpis.cor_mais_servidores,
                    "<u>"+dadosKpis.qtd_mais_servidores+"</u>",
                    dadosKpis.tag_mais_servidores, false
                ))
                kpi2.appendChild(gerarTag("tagKPI2",
                    dadosKpis.cor_menos_servidores,
                    "<u>"+dadosKpis.qtd_menos_servidores+"</u>",
                    dadosKpis.tag_menos_servidores,
                    false
                ))
                kpi3.appendChild(gerarTag("tagKPI3",
                    dadosKpis.cor_maior_consumo,
                    "<u>"+dadosKpis.qtd_maior_consumo+"%</u>",
                    dadosKpis.tag_maior_consumo, false
                ))
                kpi4.appendChild(gerarTag("tagKPI4",
                    dadosKpis.cor_mais_erros,
                    "<u>"+dadosKpis.qtd_mais_erros+"</u>",
                    dadosKpis.tag_mais_erros, false
                ))
            });
        }
        else { resposta.text().then(texto => {
                console.warn(texto)
        })}
    }).catch(function (erro) {
        console.log(erro);
    })
}

var tagsClicaveisChecadas = 0
function gerarTag(id, cor, info, nome, clicavel){
    novaTag = document.createElement("span")
    novaTag.className = "tag"
    novaTag.style = `background-color: #`+
        cor
    
    novaTag.innerHTML = `${info} ${nome}`

    if(clicavel){
        novaTag.className += " tagClicavel"
        novaTag.setAttribute("id",id)        
        novaTag.addEventListener("click", clicarEmTag)
    }
    return novaTag
}

function tagsPorNome(){
    let buscaTags = iptNomeTag.value

    let letras = ["A","B","C","D","E","F","G","H",
    "I","J","K","L","M","N","O","P","Q","R","S","T",
    "U","V","W","X","Y","Z","Ã","Ç","Á","É","Â","Ê"]

    let buscaAprovada = true
    for(i in buscaTags){
        let caracterAprovado = false
        for(c in letras){
            if(buscaTags[i].toUpperCase() == letras[c]){
                caracterAprovado = true
                break
            }
        }
        if(!caracterAprovado){
            buscaAprovada = false
            break
        }
    }

    if(buscaAprovada){
        containerResultadosBuscaTags.innerHTML = ""

        fetch("/tag/tagsPorNome/"+buscaTags, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
            if (resposta.status == 204) { 
                
            }
            else if (resposta.ok) {
                console.log(resposta);
                resposta.json().then(json => {
                    containerResultadosBuscaTags.innerHTML = ""
                    for(i in json){
                        containerResultadosBuscaTags.appendChild(
                            gerarTag(
                                json[i].id_tag,
                                json[i].cor_tag,
                                '<input type="checkbox" name="" id="">',
                                json[i].nome_tag,
                                true
                            )
                        )
                    }
                    contagemTagsBuscaTotal.innerText = `
                    Total: ${json.length}
                    `
                    contagemTagsBuscaSelecionadas.innerText = `
                    Selecionadas: ${tagsClicaveisChecadas}
                    `
                });
            }
            else { resposta.text().then(texto => {
                console.warn(texto)
            })}
        }).catch(function (erro) {
            console.log(erro);
        })
    } else{
        swal({
            title: 'Pesquisa inválida',
            text: 'Utilize apenas letras na sua pesquisa por tags.',
            icon: 'error'
        })
        iptNomeTag.value = ""
    }
}

tagsAtivas = []
function clicarEmTag(){
    iptTag = this.getElementsByTagName("input")[0]
    let idAtual = this.id

    if (iptTag.checked){
        iptTag.checked = false
        tagsClicaveisChecadas --
    } else {
        iptTag.checked = true
        tagsClicaveisChecadas ++
    }
    contagemTagsBuscaSelecionadas.innerText = `
        Selecionadas: ${tagsClicaveisChecadas}`
    
    console.log(tagsAtivas)
    carregarIframe()
}

function carregarIframe(){
    frameTags.src = ""
    let tagsArray = []

    containerResultados = document.getElementById("containerResultadosBuscaTags")
    tags = containerResultados.getElementsByClassName("tag")
    
    for(let i = 0; i < tags.length; i++){
        input = tags[i].getElementsByTagName("input")[0]
        if(input.checked){
            tagsArray.push(tags[i].id)
        }
    }

    let tagsParams = ""
    for(let i = 0; i < tagsArray.length; i++){
        tagsParams += tagsArray[i]
        if(i+1 < tagsArray.length){
            tagsParams += "+" 
        }
    }

    frameTags.src = "index.html?tags="+tagsParams
}

function carregarServidoresModalAdicionarTag(){
    fetch("/servidor/listar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.status != 204 && resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
                if(json.length > 0){
                    modalAddTagServidores.innerHTML = ""
                    for(i in json){
                        let plural = ""
                        if(json[i].qtdTags != "1"){
                            plural = "s"
                        }

                        modalAddTagServidores.innerHTML += `
                        <span>
                            <input type="checkbox" id="chkb${json[i].id_servidor}">
                            <h3>${json[i].codigo}</h3>
                            <p>${json[i].qtdTags}
                             outra${plural}
                             tag${plural}
                             associada${plural}</p>
                        </span>
                        
                        `
                    }
                }
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

function selecionarCor(indiceCor){
    let cores = seletorCor.getElementsByTagName("span")

    for(var i = 0; i < cores.length; i++){
        if(cores[i].className.indexOf("bordaSeletor") != -1){
            cores[i].className = "bordaSeletor"
        } else{
            cores[i].className = ""
        }
        cores[i].innerHTML = ""

        if(i == indiceCor){
            cores[i].className += " corSelecionada"
            cores[i].innerHTML = '<i class="fa-solid fa-check"></i>'
        }
    }
}

function criarTag(){
    let letras = ["A","B","C","D","E","F","G","H",
    "I","J","K","L","M","N","O","P","Q","R","S","T",
    "U","V","W","X","Y","Z","Ã","Ç","Á","É","Â","Ê"]
    
    let nomeTag = iptModalAddTagNomeTag.value
    
    let buscaAprovada = true

    for(i in nomeTag){
        let caracterAprovado = false
        for(c in letras){
            if(nomeTag[i].toUpperCase() == letras[c]){
                caracterAprovado = true
                break
            }
        }
        if(!caracterAprovado){
            buscaAprovada = false
            break
        }
    }
    if(nomeTag.length < 2 || nomeTag.length > 75){
        buscaAprovada = false
    }

    let corSelecionada = ""
    let cores = seletorCor.getElementsByTagName("span")
    for(var i = 0; i < cores.length; i++){
        if(cores[i].className.indexOf("corSelecionada") != -1){
            let cssCor = window.getComputedStyle(cores[i])
            corSelecionada = cssCor.getPropertyValue("background-color")
            break;
        }
    }

    if(!buscaAprovada){
        nomeTag.value = ""
        swal({
            title: 'Nome de tag inválido',
            text: 'Utilize de 2 à 75 letras para o nome de tag.',
            icon: 'error'
        })
    } else if(corSelecionada == ""){
        swal({
            title: 'Nenhuma cor selecionada',
            text: 'Por favor, selecione uma cor para sua tag.',
            icon: 'error'
        })
    } else{
        let servidores = modalAddTagServidores.getElementsByTagName("span")
        let servidoresSelecionados = []
        
        for(var i = 0; i < servidoresSelecionados.length; i++){
            let checkboxServidor = servidores[i].getElementsByTagName("input")[0]
            if(checkboxServidor.checked){
                servidoresSelecionados.push(checkboxServidor.id)
            }
        }
        console.log(servidoresSelecionados)

        if(servidoresSelecionados.length == 0){
            swal({
                title: "0 servidores selecionados",
                text: `Você não selecionou nenhum servidor para serem adicionados à tag ${nomeTag}. Tem certeza que deseja continuar?`,
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then((continuar)=>{
                if(!continuar){
                    return null
                } else{
                    //FAZER FETCH PARA INSERT EM TB_TAG E TB_TAG_SERVIDOR
                }
            })
        }
    }
}