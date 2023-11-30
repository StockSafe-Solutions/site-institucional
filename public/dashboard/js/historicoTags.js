function reloadHistorico(){
    carregarHistorico()
}

function carregarHistorico(){
    fetch("../tag/historicoAlerta",{
        method: "GET",
    }).then(function (resposta) {
        if(resposta.ok){
            resposta.json().then( json => {
                carregarLocalizacao(json)
            })
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

function carregarLocalizacao(dados){
    let localizacao

    fetch("https://cdn.jsdelivr.net/npm/apexcharts@3.44.0/dist/locales/pt-br.json",{
        method: "GET",
    }).then(function (resposta) {
        resposta.json().then( json => {
            localizacao = json
            localizacao.name = "br"
            formatarDados(localizacao, dados)
        })
    })
}

function formatarDados(localizacao, dados){
    let dadosFormatados = []
    let cores = ['rgb(255, 46, 46)','rgb(255, 225, 31)','rgb(255, 225, 31)','rgb(255, 46, 46)']

    let tags = []
    for(let i = 0; i < dados.length; i++){
        let tagJaExiste = false
        for(let c = 0; c < tags.length; c++){
            if(tags[c] == dados[i].nome_tag){
                tagJaExiste = true
                break
            }
        }
        if(!tagJaExiste){
            tags.push({
                nome_tag: dados[i].nome_tag,
                iniciada: false
            })
        }
    }

    for(let i = 0; i < dados.length; i++){
        let horarioAlerta = new Date(dados[i].data_hora)
        let horarioFimAlerta = new Date(horarioAlerta)
        horarioFimAlerta.setDate(horarioAlerta.getDate()+1)

        for(let c = 0; c < tags.length; c++){
            if(tags[c].nome_tag == dados[i].nome_tag){
                if(!tags[c].iniciada){
                    dadosFormatados.push({
                        x: dados[i].nome_tag,
                        y: [
                            horarioAlerta.getTime(),
                            horarioFimAlerta.getTime()
                        ],
                        fillColor: cores[dados[i].nivel_alerta]
                    })
                    tags[c].iniciada = true
                } else{
                    for(let a = 0; a < dadosFormatados.length; a++){
                        if(dadosFormatados[a].x == dados[i].nome_tag){
                            dadosFormatados[a].y.push(
                                horarioAlerta.getTime(),
                                horarioFimAlerta.getTime())
                        }
                    }
                }
                break
            }
        }
    }
    console.log(dadosFormatados)
    gerarGrafico(localizacao, dadosFormatados)
}

function gerarGrafico(localizacao, dados){
    let trintaDiasAtras = new Date()
    trintaDiasAtras = trintaDiasAtras.setMonth(new Date().getMonth() - 1)

    let opcoes = {
        chart: {
            height: 400,
            width: 1200,
            type: 'rangeBar',
            fontFamily: 'Nunito',
            // locales: [localizacao],
            // defaultLocale: 'br'
        },
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                barHeight: '90%',
                borderRadius: 5
            }
        },
        grid: {
            row: {
              colors: ['#f3f4f5', '#fff'],
              opacity: 1
            },
            padding: {
                left: -8
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '16px'
                },
                offsetX: 5,
            }
        },
        xaxis: {
            type: 'datetime',
            min: trintaDiasAtras,
            max: new Date().getTime()
        },
        // dataLabels: {
        //     enabled: true,
        //     formatter: function() {
        //         iAlertas++
        //         return textoAlertas[iAlertas]
        //     }
        // },
        series: [{
            data: dados
        }]
      }
      
      let chartHistorico = new ApexCharts(
        document.querySelector("#graficoTagHistorico"),
        opcoes);
      
      chartHistorico.render();
}