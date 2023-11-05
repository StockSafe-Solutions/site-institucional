function carregarDados(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)
    urlKPIs = ""
    urlGraficos = ""

    if(indiceParm == -1){
        urlKPIs = "../dash/kpiGeral"
        urlGraficos = "../dash/graficosGerais"

        nomePagina.innerText = "Dashboard - Visão Geral"
    } else{
        urlKPIs = "../dash/kpiEspecifica/"+params
        urlGraficos = "../dash/graficosEspecificos/"+params

        accordionSidebar.style = "display: none"
        nomePagina.innerText = "Dashboard - Servidor "+params
        reload_e_alertas.style = "left: -45px"

        iconKPI2.className = "fa-solid fa-arrow-right-arrow-left"
        nomeKPI2.innerText = "Taxa de transferência"
    }

    fetch(urlKPIs, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                if(urlKPIs == "../dash/kpiGeral"){
                    definirKPIs("geral",json)
                } else{
                    definirKPIs("espec",json)
                }
            });
        }
        else{
            resposta.text().then(texto => { console.warn(texto) })}}).catch(function (erro) {
        console.log(erro);
    })

    fetch(urlGraficos, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                chamarGraficos(json)
            });
        }
        else{
            resposta.text().then(texto => { console.warn(texto) })}}).catch(function (erro) {
        console.log(erro);
    })

    now = new Date()
    dataAtual = 
    now.getFullYear()+
    "-"+(now.getMonth()+1)+
    "-"+now.getDate()

    pesquisaData.value=dataAtual
}

function definirKPIs(tipo, json){
    if(tipo == "geral"){
        valorKPI2.innerText = Math.round(Number(json.kpi_banda_larga))+"Mb/s"
        // baseKPI2.innerText = "de "+Math.round(Number(json.base_taxa))+"Mb/s"

        valorKPI4.innerText = Math.round(Number(json.kpi_armazenamento)/1000,1)+"TB"
        baseKPI4.innerText = "de "+Math.round(Number(json.base_armazenamento)/1000,1)+"TB"
    } else{
        valorKPI2.innerText = Math.round(Number(json.kpi_taxa))+"Mb/s"
        // baseKPI2.innerText = "de "+Math.round(Number(json.base_taxa))+"Mb/s"

        valorKPI4.innerText = Math.round(Number(json.kpi_armazenamento))+"GB"
        baseKPI4.innerText = "de "+Math.round(Number(json.base_armazenamento))+"GB"
    }
    valorKPI1.innerText = Math.round(Number(json.kpi_uptime))+"%"
    valorKPI2.style = "font-size: 28px"
    valorKPI3.innerText = Math.round(Number(json.kpi_pacotes_enviados))
}

function chamarGraficos(json){
    json_cpu = json[0]
    uso_cpu = []
    for(i in json_cpu){
        uso_cpu.push(json_cpu[i].uso_cpu)
    }

    json_ram = json[1]
    uso_ram = []
    for(i in json_ram){
        uso_ram.push(json_ram[i].uso_ram)
    }

    gerenciarGraficos('graficoCPU',uso_cpu)
    gerenciarGraficos('graficoRAM',uso_ram)
}

function reloadDashboard(){
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
        textoReload.innerText = "Atualizado pela ultima vez às "+now.getHours()+":"+
            (String(now.getMinutes()).length == 1 ? "0"+now.getMinutes() : now.getMinutes())
        iconReload.style = ""
    },4500)

    carregarDados()
}
setInterval(reloadDashboard,sessionStorage.intervalo_atualizacao)