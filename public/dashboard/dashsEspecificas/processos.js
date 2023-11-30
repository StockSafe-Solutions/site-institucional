function carregarPaginaProcessos(){
    indiceParm = location.href.indexOf('?');
    params = location.href.slice(indiceParm+1,indiceParm+7);
    nomePagina.innerText = "Processos - Servidor "+ params;

    carregarMenu("Processos",false,params);

    atualizarDadosProcessos(params);
}

function carregarProcessos(processos) {
    var tbody = document.getElementById("cell_processos");
    tbody.innerHTML = ""

    processos.forEach((processo, i) => {
        var tr = document.createElement('tr');
        tbody.appendChild(tr)

        var tdPid = document.createElement('td');
        var tdNome = document.createElement('td');
        var tdCpu = document.createElement('td');
        var tdRam = document.createElement('td');

        tdPid.textContent = processo.pid_proc;
        tdNome.textContent = processo.nome_proc;
        tdCpu.textContent = processo.uso_cpu + "%";
        tdRam.textContent = processo.uso_ram + "%";

        tr.appendChild(tdPid);
        tr.appendChild(tdNome);
        tr.appendChild(tdCpu);
        tr.appendChild(tdRam);
    });
}

function atualizarKpis(valor) {
    const kpi1 = document.getElementById("valorKPI1");
    const kpi2 = document.getElementById("valorKPI2");
    const kpi3 = document.getElementById("valorKPI3");
    const kpi4 = document.getElementById("valorKPI4");

    const baseKpi3 = document.getElementById("baseKPI3");
    const baseKpi4 = document.getElementById("baseKPI4");

    kpi1.innerHTML = parseInt(valor[0].uso_total_cpu) + "%";
    kpi2.innerHTML = parseInt(valor[0].uso_total_ram) + "%";
    kpi3.innerHTML = valor[0].nome_cpu;
    kpi4.innerHTML = valor[0].nome_ram;

    baseKpi3.innerHTML = `com ${parseInt(valor[0].proc_total_cpu)}% de uso`
    baseKpi4.innerHTML = `com ${parseInt(valor[0].proc_total_ram)}% de uso` 
}

function carregarGraficoProcesso(valor) {
    
    var graficoProc = document.getElementById('graficoProcessos');

	return new Chart(graficoProc, {
		type: "bar",
		data: {
			labels: legendas,
			datasets: [
				{
					label: `${valor.nome_proc}`,
					data: valor.quantide,
					backgroundColor: ["#005EFF", "#001A46"],
					hoverOffset: 4
                }
            ]
        }
    });
}

function atualizarDadosProcessos(params) {

    const codServidor = params;

    fetch(`/processo/atualizarKpis/${codServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                atualizarKpis(json)
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

    fetch(`/processo/atualizarGraficoProc/${codServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                carregarGraficoProcesso(json)
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

    fetch(`/processo/listarProcessos/${codServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json)
                carregarProcessos(json)
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

    setTimeout(function() {
        atualizarDadosProcessos(codServidor);
    }, sessionStorage.intervalo_atualizacao);    
}
