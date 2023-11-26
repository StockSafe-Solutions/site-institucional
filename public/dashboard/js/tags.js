function carregarDashboardTags(){
    frameTags.src = "index.html?tags=true"
}

function reloadTags(){
    carregarKPIs()
    if(iptNomeTag.value == ""){
        tagsPorNome()
    }

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

                kpi1.appendChild(gerarTag(
                    dadosKpis.cor_mais_servidores,
                    "<u>"+dadosKpis.qtd_mais_servidores+"</u>",
                    dadosKpis.tag_mais_servidores, false
                ))
                kpi2.appendChild(gerarTag(
                    dadosKpis.cor_menos_servidores,
                    "<u>"+dadosKpis.qtd_menos_servidores+"</u>",
                    dadosKpis.tag_menos_servidores, false
                ))
                kpi3.appendChild(gerarTag(
                    dadosKpis.cor_maior_consumo,
                    "<u>"+dadosKpis.qtd_maior_consumo+"</u>",
                    dadosKpis.tag_maior_consumo, false
                ))
                kpi4.appendChild(gerarTag(
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
        Swal.fire({
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