function carregarDados(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1)
    params = params.split("&")
    urlKPIs = ""
    urlGraficos = ""

    if(indiceParm == -1){
        urlKPIs = "../dash/kpiGeral"
        urlGraficos = "../dash/graficosGerais"

        nomePagina.innerText = "Dashboard - Visão Geral"
        carregarMenu("geral",true)
    } else if(params[0].slice(0,2) == "id"){
        params = params[0]
        params = params.slice(3)

        urlKPIs = "../dash/kpiEspecifica/"+params
        urlGraficos = "../dash/graficosEspecificos/"+params

        nomePagina.innerText = "Dashboard - Servidor "+params
        reload_e_alertas.style = "left: -45px"

        iconKPI2.className = "fa-solid fa-arrow-right-arrow-left"
        nomeKPI2.innerText = "Taxa de transferência"
        
        carregarMenu("especifica",false,params)
    } else{
        document.body.className += " contentTags"
        accordionSidebar.style = "display: none"
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
    KPI1.className = "kpiBoa";
    KPI2.className = "kpiBoa";
    KPI4.className = "kpiBoa";

    if(tipo == "geral"){
        valorKPI2.innerText = Math.round(Number(json.kpi_banda_larga))+"Mb/s"

        valorKPI4.innerText = Math.round(Number(json.kpi_armazenamento)/1000,1)+"TB"
        baseKPI4.innerText = "de "+Math.round(Number(json.base_armazenamento)/1000,1)+"TB"
    } else{
        valorKPI2.innerText = Math.round(Number(json.kpi_taxa))+"Mb/s"
        baseKPI2.innerText = "De "+sessionStorage.taxa_transferencia+"Mb/s"
        pctTaxaTrasnf = Number(json.kpi_taxa)*100/Number(
            sessionStorage.taxa_transferencia.replace(",",".")
        )
        if(pctTaxaTrasnf < 90){
            KPI2.className = "kpiRuim"
            if(pctTaxaTrasnf < 80){
                KPI2.className = "kpiMuitoRuim"
            }
        }

        valorKPI4.innerText = Math.round(Number(json.kpi_armazenamento))+"GB"
        baseKPI4.innerText = "de "+Math.round(Number(json.base_armazenamento))+"GB"
    }
    if(json.kpi_uptime > 100){
        json.kpi_uptime = 100
    }
    valorKPI1.innerText = Math.round(Number(json.kpi_uptime))+"%"
    if(json.kpi_uptime < 98){
        KPI1.className = "kpiRuim"
        if(json.kpi_uptime < 95){
            KPI1.className = "kpiMuitoRuim"
        }
    }

    valorKPI2.style = "font-size: 28px"
    valorKPI3.innerText = Math.round(Number(json.kpi_pacotes_enviados))

    pctArmazenamento = Math.round(Number(json.kpi_armazenamento)*100/Number(json.base_armazenamento))
        if(pctArmazenamento > 15){
            if(pctArmazenamento > 90){
                KPI4.className = "kpiMuitoRuim"
            } else{
                KPI4.className = "kpiRuim";
            }
        } else{
            KPI4.className = "kpiRuim";
        }
}

function chamarGraficos(json){
    json_cpu = json[0]
    uso_cpu = []
    for(i in json_cpu){
        uso_cpu.push(json_cpu[i].uso_da_cpu)
    }

    json_ram = json[1]
    uso_ram = []
    for(i in json_ram){
        uso_ram.push(json_ram[i].uso_da_ram)
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