function carregarPagina(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)
    // PEGANDO O PARAMETRO GET

    nomePagina.innerText = "Dashboard Rede - Servidor "+params

    carregarMenu("rede", false, params)
    //CARREGANDO O MENU, false PARA PAG. ESPECÍFICA

    carregarKPIs(params, "kpiBandaLarga", "bandaLarga")
    carregarKPIs(params, "kpiPacotesEnviados", "pacotesEnviados")
    carregarKPIs(params, "kpiPacotesRecebidos", "pacotesRecebidos")
    carregarKPIs(params, "kpiTaxaTransferencia", "taxaTransferencia")

    plotarHistoricoBandaLarga(params)
    plotarHistoricoTaxaTransferencia(params)
}

function carregarKPIs(params, url, id){

    fetch(`../../rede/${url}/${params}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json)
                document.getElementById(id).innerHTML = Math.round((json[0].media * 100) / 100).toFixed(0);
            });
        }
        else {
            resposta.text().then(texto => {
                console.warn(texto)
            })
        }
    }).catch(function (erro) {
              console.log(erro)
    })
}

function plotarHistoricoBandaLarga(params) {

    var grafico = {
            labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
            datasets: [{
            label: 'Histórico de uso de banda larga',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }

    var config = new Chart(document.getElementById(`graficoBandaLarga`), {
        type: 'line',
        data: grafico,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    })

    fetch(`../../rede/graficoBandaLarga/${params}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json)

                for (let i = 0; i < json.length; i++) {
                    grafico.datasets[0].data.push(json[i].valor);
                }

                config.update();
                setInterval( () => {config.update()}, 2000 )
            })
        }
        else {
            resposta.text().then(texto => {
                console.warn(texto)
            })
        }
    }).catch(function (erro) {
        console.log(erro)
    })
}

function plotarHistoricoTaxaTransferencia(params) {

    var grafico = {
            labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
            datasets: [{
            label: 'Histórico de taxa de transferência',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }

    var config = new Chart(document.getElementById(`graficoTaxaTransferencia`), {
        type: 'line',
        data: grafico,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    })

    fetch(`../../rede/graficoTaxaTransferencia/${params}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json)

                for (let i = 0; i < json.length; i++) {
                    grafico.datasets[0].data.push(json[i].valor);
                }

                config.update();
                setInterval( () => {config.update()}, 2000 )
            })
        }
        else {
            resposta.text().then(texto => {
                console.warn(texto)
            })
        }
    }).catch(function (erro) {
        console.log(erro)
    })
}
