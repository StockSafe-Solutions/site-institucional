function carregarDados(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1)

    if(indiceParm == -1){
        carregarViaGET("../dash/kpiGeral", "../dash/graficosGerais")
        nomePagina.innerText = "Dashboard - Visão Geral"
        carregarMenu("geral",true)
    } else if(params.slice(0,2) == "id"){
        params = params.slice(3)
        carregarViaGET("../dash/kpiEspecifica/"+params, "../dash/graficosEspecificos/"+params)
        
        nomePagina.innerText = "Dashboard - Servidor "+params
        reload_e_alertas.style = "left: -45px"

        iconKPI2.className = "fa-solid fa-arrow-right-arrow-left"
        nomeKPI2.innerText = "Taxa de transferência"
        
        carregarMenu("especifica",false,params)

        now = new Date()
        dataAtual = 
        now.getFullYear()+
        "-"+(now.getMonth()+1)+
        "-"+now.getDate()
        pesquisaData.value=dataAtual
    } else{
        document.body.className += " contentTags"
        accordionSidebar.style = "display: none"

        tags = params.slice(5).split("+")
        carregarViaPOST("../tag/kpisPorTags",tags,"../tag/graficosPorTags",tags)

        now = new Date()
        dataAtual = 
        now.getFullYear()+
        "-"+(now.getMonth()+1)+
        "-"+now.getDate()
        pesquisaData.value=dataAtual
    } if(params == "tags="){
        reloadContinuo = ""

        document.body.style = `
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh !important;`
        document.body.innerHTML = `
            <div>
                Selecione tags para visualizar gráficos e KPIs de acordo com elas.
            </div>`
    }
}

function carregarViaGET(urlKPIs, urlGraficos){
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
            });
        }
        else{
            resposta.text().then(texto => { console.warn(texto) })}}).catch(function (erro) {
        console.log(erro);
    })
}

function carregarViaPOST(urlKPIs, corpoKPIs, urlGraficos, corpoGraficos){
    fetch(urlKPIs, {
        method: "POST",
        body: JSON.stringify({
            tagServer: corpoKPIs
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
                definirKPIs("tag",json[0])
            });
        }
        else{
            resposta.text().then(texto => { console.warn(texto) })}}).catch(function (erro) {
        console.log(erro);
    })

    fetch(urlGraficos, {
        method: "POST",
        body: JSON.stringify({
            tagServer: corpoGraficos
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                uso_cpu = []
                uso_ram = []
                for(i in json){
                    uso_cpu.push(json[i].uso_da_cpu)
                    uso_ram.push(json[i].uso_da_ram)
                }

                gerenciarGraficos('graficoCPU',uso_cpu)
                gerenciarGraficos('graficoRAM',uso_ram)
            });
        }
        else{
            resposta.text().then(texto => { console.warn(texto) })}}).catch(function (erro) {
        console.log(erro);
    })
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
        baseKPI2.innerText = "de "+sessionStorage.taxa_transferencia+"Mb/s"
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
    if(tipo == "tag"){
        KPI1.style = "display: none"
        nomeKPI2.innerText = "Uso da banda"
    }
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
reloadContinuo = setInterval(reloadDashboard,sessionStorage.intervalo_atualizacao)