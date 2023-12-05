function reloadHistorico(){
    carregarHistorico()
}

function carregarHistorico(){
    fetch("../tag/historicoAlerta",{
        method: "GET",
    }).then(function (resposta) {
        if(resposta.status == 200){
            resposta.json().then( json => {
                carregarLocalizacao(json)
            })
        } else if(resposta.status == 204){
            swal({
                title: 'Nenhum alerta encontrado',
                text: 'Seus servidores não apresentaram nenhum alerta nos últimos 30 dias.',
                icon: 'warning'
            }).then(()=>{
                fecharModal("hist")
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
    let cores = ['rgb(255, 46, 46)','rgb(213, 187, 30)','rgb(213, 187, 30)','rgb(255, 46, 46)']

    let tags = []
    let descr = []
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
        descr.push({
            info: dados[i].descricao.slice(0,3),
            valor: dados[i].descricao.slice(7,10)
        })
    }

    console.log(descr)

    for(let i = 0; i < dados.length; i++){
        let horarioAlerta = new Date(dados[i].data_hora)
        let horarioFimAlerta = new Date(horarioAlerta)
        horarioFimAlerta.setDate(horarioAlerta.getDate()+1)

        dadosFormatados.push({
            x: (dados[i].nome_tag).split(" "),
            y: [
                horarioAlerta.getTime(),
                horarioFimAlerta.getTime()
            ],
            fillColor: cores[dados[i].nivel_alerta]
        })
    }
    gerarGrafico(localizacao, dadosFormatados, descr)
}

function gerarGrafico(localizacao, dados, descricoes){
    graficoTagHistorico.innerHTML = ""

    let trintaDiasAtras = new Date()
    trintaDiasAtras = trintaDiasAtras.setMonth(new Date().getMonth() - 1)

    var iDescricao = -1

    let opcoes = {
        chart: {
            height: 400,
            width: 1200,
            type: 'rangeBar',
            fontFamily: 'Nunito',
            locales: [localizacao],
            defaultLocale: 'br',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false,      
            }
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
            show: true,
            row: {
              colors: ['#f3f4f5', '#fff'],
              opacity: 1
            },
            padding: {
                left: -10,
                top: -30
            },
            borderColor: '#111',
            strokeDashArray: 0,
            position: 'back',
            xaxis: {
                lines: {
                    show: true
                }
            },   
            yaxis: {
                lines: {
                    show: true
                }
            },  
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '14px'
                },
                offsetX: 10,
            }
        },
        xaxis: {
            type: 'datetime',
            min: trintaDiasAtras,
            max: new Date().getTime()
        },
        dataLabels: {
            enabled: true,
            formatter: function() {
                iDescricao++
                return [descricoes[iDescricao].info, descricoes[iDescricao].valor]
            }
        },
        series: [{
            data: dados
        }],
        tooltip: {  
            enabled: true
        }
      }
      
      let chartHistorico = new ApexCharts(
        document.querySelector("#graficoTagHistorico"),
        opcoes);

      graficoTagHistorico.className = ""
      chartHistorico.render();
}