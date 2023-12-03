var graficoProcesso;
var orderByString = "ORDER BY proc.nome_proc";

function carregarPaginaProcessos(){
    indiceParm = location.href.indexOf('?');
    params = location.href.slice(indiceParm+1,indiceParm+7);
    nomePagina.innerText = "Processos - Servidor "+ params;

    carregarMenu("Processos",false,params);

    atualizarDadosProcessos(params);
}

function carregarProcessos(processos) {
    var tbody = document.getElementById("cell_processos");
    document.getElementById('qtdProcessos').textContent = processos.length;
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

    if (valor[0] == undefined){

        kpi1.innerHTML = "0%";
        kpi2.innerHTML = "0%";
        kpi3.innerHTML = "Nenhum";
        kpi4.innerHTML = "Nenhum";

        baseKpi3.innerHTML = `0% de uso`
        baseKpi4.innerHTML = `0% de uso`
    } else {

        kpi1.innerHTML = parseInt(valor[0].uso_total_cpu) + "%";
        kpi2.innerHTML = parseInt(valor[0].uso_total_ram) + "%";
        kpi3.innerHTML = valor[0].nome_cpu;
        kpi4.innerHTML = valor[0].nome_ram;

        baseKpi3.innerHTML = `com ${parseInt(valor[0].proc_total_cpu)}% de uso`
        baseKpi4.innerHTML = `com ${parseInt(valor[0].proc_total_ram)}% de uso` 
    }
}

function carregarGraficoProcesso(valor) {
    var nomeDosProcessos = [];
    var quantidadeListada = [];

    for (i in valor) {
        nomeDosProcessos.push(valor[i].nome);
        quantidadeListada.push(valor[i].quantidade);
    }

    var graficoProc = document.getElementById('graficoProcessos');

    if (graficoProcesso) {
        graficoProcesso.destroy();
    }

    graficoProcesso = new Chart(graficoProc, {
        type: "bar",
        data: {
            labels: nomeDosProcessos,
            datasets: [
                {
                    label: "Processos",
                    data: quantidadeListada,
                    backgroundColor: ["#00093f", "#000d63", "#011387", "#011abc", "#0020f4"],
                    hoverOffset: 4
                }
            ]
        }
    });

    return graficoProcesso;
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

    fetch(`/processo/listarProcessos/${codServidor}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            orderServer: orderByString
        })
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

    fetch(`/processo/atualizarGraficoProc/${params}`, {
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

    setTimeout(function() {
        atualizarDadosProcessos(codServidor);
    }, sessionStorage.intervalo_atualizacao);    
}

function dropdownLista() {
    var dropdown = document.querySelector('.dropdown')

    if (dropdown.style.display == 'flex') {
        dropdown.style.display = 'none';

    } else {
        dropdown.style.display = 'flex';
    }
}

function organizarLista(modo) {

    indiceParm = location.href.indexOf('?');
    params = location.href.slice(indiceParm+1,indiceParm+7);
    
    var codServidor = params;

    var divAz = document.getElementById('optAz');
    var divZa = document.getElementById('optZa');
    var divCpu = document.getElementById('optCpu');
    var divRam = document.getElementById('optRam');


    switch (modo){
        case 1:
            orderByString = "ORDER BY proc.nome_proc"
            break;
        case 2:
            orderByString = "ORDER BY proc.nome_proc DESC"
            break;
        case 3:
            orderByString = "ORDER BY proc.uso_cpu DESC"
            break;
        case 4:
            orderByString = "ORDER BY proc.uso_ram DESC";
            break;
    }

    fetch(`/processo/listarProcessos/${codServidor}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            orderServer: orderByString
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
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
}

var divFixa = document.querySelector('.dropdown');
var ultimaPosicaoScroll = window.scrollY;

window.onscroll = function() {
  var novaPosicaoScroll = window.scrollY;

  if (novaPosicaoScroll > ultimaPosicaoScroll) {
    divFixa.style.top = '-100%';
  } else {
    divFixa.style.top = '0';
  }

  ultimaPosicaoScroll = novaPosicaoScroll;
};
