function carregarDashboardGeral(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)
    urlKPIs = ""
    urlGraficos = ""

    if(indiceParm == -1){
        urlKPIs = "../dash/kpiEspecifica/"+"SVJW32"
        urlGraficos = "../dash/graficosGerais"

        nomePagina.innerText = "Dashboard - Visão Geral"
    } else{
        urlKPIs = "../dash/kpiEspecifica/"+params
        urlGraficos = "../dash/graficosEspecificos/"+params

        accordionSidebar.style = "display: none"
        nomePagina.innerText = "Dashboard - Servidor "+params
        containerAlertas.style = "left: -45px"

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
                definirKPIs(json)
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

function definirKPIs(json){
    valorKPI1.innerText = Math.round(Number(json.uptime))+"%"

    valorKPI2.innerText = Math.round(Number(json.kpi_taxa))+"Mb/s"
    baseKPI2.innerText = Math.round(Number(json.base_taxa))+"Mb/s"

    valorKPI3.innerText = Math.round(Number(json.kpi_pacotes_enviados))
                
    valorKPI4.innerText = Math.round(Number(json.kpi_armazenamento))+"GB"
    baseKPI4.innerText = Math.round(Number(json.base_armazenamento))+"GB"
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

    carregarGrafico('graficoCPU',uso_cpu)
    carregarGrafico('graficoRAM',uso_ram)
}