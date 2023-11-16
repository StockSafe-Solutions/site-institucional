import csv from "csv";

function carregarDados(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)
    urlKPIs = ""
    urlGraficos = ""

    if(indiceParm == -1){
        urlKPIs = "../dash/kpiGeral"
        urlGraficos = "../dash/graficosGerais"

        nomePagina.innerText = "Dashboard - Visão Geral"
        carregarMenu("geral",true)
    } else{
        urlKPIs = "../dash/kpiEspecifica/"+params
        urlGraficos = "../dash/graficosEspecificos/"+params

        nomePagina.innerText = "Dashboard - Servidor "+params
        reload_e_alertas.style = "left: -45px"

        iconKPI2.className = "fa-solid fa-arrow-right-arrow-left"
        nomeKPI2.innerText = "Taxa de transferência"
        
        carregarMenu("especifica",false,params)
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
function getHorasMinutos(data) {
	const dataSplit = data.split(" ");
	const horaMinuto = dataSplit[1];
	return horaMinuto;
}

function chamarGraficos(json){
    json_cpu = json[0]
    uso_cpu = []
    data_cpu = [];
    for(i in json_cpu){
        uso_cpu.push(json_cpu[i].uso_da_cpu)
        data_cpu.push(getHorasMinutos(json_cpu[i].dataDados));
    }

    json_ram = json[1]
    uso_ram = []
    data_ram = [];
    for(i in json_ram){
        uso_ram.push(json_ram[i].uso_da_ram)
        data_ram.push(getHorasMinutos(json_ram[i].dataDados));
    }
    gerenciarGraficos('graficoCPU',uso_cpu, data_cpu);
    gerenciarGraficos('graficoRAM',uso_ram, data_ram);
}

function chamarRegistros(json){
   // url = `../dash/listarRegistrosData/${}`

    json_dados = json[0];
    json_registros = [];
    
    for(i in json_dados){
        json_registros.push(json_dados[i]);
    }

    csv.write("dados.csv", json_registros, {
        headers: true,
    });

    // Baixar o CSV
    const url = "dados.csv";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
    const arrayBuffer = xhr.response;
    const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "dados.csv";
    link.click();
    };
    xhr.send();
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