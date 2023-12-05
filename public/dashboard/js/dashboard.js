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
                    console.log(json)
                } else{
                    definirKPIs("espec",json)
                }
            }).catch(erro =>{
                console.log(erro)
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
        console.log(resposta)
        if (resposta.ok) {
           resposta.json().then((json) => {
                    console.log(json)
					chamarGraficos(json);
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
                definirKPIs("tag",json[0])
            });
        }
        else{
            resposta.text().then(texto => { console.warn(texto) })}}).catch(function (erro) {
        console.log(erro);
    })

	now = new Date();
	dataAtual =
		now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

        console.log(corpoGraficos)
        fetch(urlGraficos, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tagServer: corpoGraficos
            })
        }).then(function (resposta) {
            console.log(resposta)
            if (resposta.ok) {
               resposta.json().then((json) => {
                        console.log(json);

                        uso_cpu = []
                        uso_ram = []
                        data_cpu = []
                        data_ram = []

                        for(let i = 0; i < json.length; i++){
                            uso_cpu.push(json[i].uso_da_cpu)
                            data_cpu.push(json[i].data_hora)
                            uso_ram.push(json[i].uso_da_ram)
                            data_ram.push(json[i].uso_da_cpu)
                        }

                        gerenciarGraficos("graficoCPU", uso_cpu, data_cpu);
	                    gerenciarGraficos("graficoRAM", uso_ram, data_ram);
                    });
            }
            else{
                resposta.text().then(texto => { console.warn(texto) })}}).catch(function (erro) {
            console.log(erro);
        })
}

function chamarRegistros() { 
    if(pesquisaData.value == ""){
        swal({
            icon: 'warning',
            title: 'Nenhuma data selecionada',
            text: `Favor uma data da qual serão os dados à serem salvos.`
        })
    } else{
        carregarDados();
        indiceParm = location.href.indexOf("?");
        params = location.href.slice(indiceParm + 1, indiceParm + 7);
        var data = pesquisaData.value;


        if (indiceParm == -1) {
            urlDados = `/dash/listarRegistrosData/${data}`;
            nomePagina.innerText = "Dashboard - Visão Geral";
            carregarMenu("geral", true);
        } else {
            urlDados = `/dash/listarRegistrosDataEspeficico/${params}/${data}`;
            nomePagina.innerText = "Dashboard - Servidor " + params;
            reload_e_alertas.style = "left: -45px";

            iconKPI2.className = "fa-solid fa-arrow-right-arrow-left";
            nomeKPI2.innerText = "Taxa de transferência";

            carregarMenu("especifica", false, params);
        }
        fetch(urlDados, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(function (resposta) {
                    if (resposta.ok) {
                        console.log("OK");
                        resposta.json().then((json) => {
                            console.log(json);
                            csv(json);
                        });
                    } else {
                        console.log(`#ERRO: ${resposta}`);
                    }
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
    }
}

function csv(json) {
    try{
        const colunas = Object.keys(json[0]);
        var csv = colunas.join(",");

        for (const item of json) {
            const linha = Object.values(item).join(",");
            csv += "\n" + linha;
        }

        const blob = new Blob([csv], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "dados.csv";
        link.click();
    } catch{
        swal({
            icon: 'warning',
            title: 'Nenhum dado para a data selecionada.',
            text: `Não foi encontrado nenhum dado gravado na data escolhida. Favor selecionar um dia em que os servidores estiveram ativos.`
        })
    }
}

function definirKPIs(tipo, json) {
	KPI1.className = "kpiBoa";
	KPI2.className = "kpiBoa";
	KPI4.className = "kpiBoa";

    let kpi_uptime = Math.round(Math.random()*10+90)
    valorKPI1.innerText = kpi_uptime+"%"
    if(kpi_uptime > 100){
        kpi_uptime = 100
    }
    if(kpi_uptime < 98){
        KPI1.className = "kpiRuim"
        if(kpi_uptime < 95){
            KPI1.className = "kpiMuitoRuim"
        }
    }

    if(tipo == "geral"){
        var teste = Number(sessionStorage.getItem("banda_larga"))
        valorKPI2.innerText = teste+"Mb/s"

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

function chamarGraficos(json) {
	json_cpu = json[0];
	uso_cpu = [];
	data_cpu = [];
	for (i in json_cpu) {
		uso_cpu.push(json_cpu[i].uso_da_cpu);
		data_cpu.push(json_cpu[i].dataDados);
	}

	json_ram = json[1];
	uso_ram = [];
	data_ram = [];
	for (i in json_ram) {
		uso_ram.push(json_ram[i].uso_da_ram);
		data_ram.push(json_ram[i].dataDados);
	}

	gerenciarGraficos("graficoCPU", uso_cpu, data_cpu);
	gerenciarGraficos("graficoRAM", uso_ram, data_ram);
}

function reloadDashboard() {
	textoReload.innerText = "Atualizando";
	iconReload.style =
		"animation-name: girar; animation-duration: 2250ms; pointer-events: none";
	let i = 0;
	let animacaoTexto = setInterval(() => {
		if (i == 2) {
			clearInterval(animacaoTexto);
		}
		textoReload.innerText += ".";
		i++;
	}, 1000);

	setTimeout(() => {
		let now = new Date();
		textoReload.innerText =
			"Atualizado pela ultima vez às " +
			now.getHours() +
			":" +
			(String(now.getMinutes()).length == 1
				? "0" + now.getMinutes()
				: now.getMinutes());
		iconReload.style = "";
	}, 4500);

	carregarDados();
}
reloadContinuo = setInterval(reloadDashboard,sessionStorage.intervalo_atualizacao)
