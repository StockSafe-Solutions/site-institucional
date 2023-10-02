Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function formatarNumero(numeroBruto, decimals, dec_point, thousands_sep) {

  // *     Exemplo:
  // *     formatarNumero(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'

  // Remover espaços e vírgulas para tratar diferentes formatos de entrada
  numeroBruto = String(numeroBruto).replace(',', '').replace(' ', '');

  // Definir valores padrão para casos em que não são fornecidos
  var numeroTratado;
  var qtdCasasDecimais;
  var separadorMilhares;
  var pontoDecimal;
  var textoSaida;

  numeroTratado = !isFinite(+numeroBruto) ? 0 : +numeroBruto
  qtdCasasDecimais = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  separadorMilhares = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep
  pontoDecimal = (typeof dec_point === 'undefined') ? '.' : dec_point
  textoSaida = ''

  //Função para corrigir o problema do parseFloat no IE parseFloat(0.55).toFixed(0) = 0;
  var toFixedFix = function (numeroTratado, qtdCasasDecimais) {

    var  fatorArredondamento = Math.pow(10, qtdCasasDecimais);

    return String(Math.round(numeroTratado *  fatorArredondamento) /  fatorArredondamento);
  };

  textoSaida = (qtdCasasDecimais ? toFixedFix(numeroTratado, qtdCasasDecimais) : String(Math.round(numeroTratado))).split('.');
  // Adicionar separadores de milhares
  if (textoSaida[0].length > 3) {
    textoSaida[0] = textoSaida[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, separadorMilhares);
  }
   // Adicionar zeros às casas decimais, se necessário
  if ((textoSaida[1] || '').length < qtdCasasDecimais) {
    textoSaida[1] = textoSaida[1] || '';
    textoSaida[1] += new Array(qtdCasasDecimais - textoSaida[1].length + 1).join('0');
  }

  return textoSaida.join(pontoDecimal);
}

console.log("Qualquer coisa")

var dados = []
// Area Chart Example
var ctx = document.getElementById("myChartCanvas2000");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data:dados,
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 10
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 8,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return  formatarNumero(value) + '%';
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          var value = tooltipItem.yLabel;
          var unit = '';
    
          if (datasetLabel === "Temperatura") {
            unit = '°C'; // Adicionar a unidade de temperatura
          } else {
            unit = '%'; // Adicionar o símbolo de porcentagem
          }
    
          return datasetLabel + ': ' + value + unit;
        }
      
      }
    }
  }

})
obterDadosGrafico('todos');


function obterDadosGrafico(opcao) {

  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }

  fetch(`/medidas/buscarDemanda`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              resposta.reverse();
              console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
              plotarGrafico(resposta, opcao);
          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGrafico(resposta, opcao){
  let labels = []


  dados = {
    labels: labels, 
     datasets: 
     [{
       label: "Disco",
       lineTension: 0.3,
       backgroundColor: "rgba(78, 115, 223, 0.005)",
       borderColor: "rgba(78, 115, 223, 1)",
       pointRadius: 3,
       pointBackgroundColor: "rgba(78, 115, 223, 1)",
       pointBorderColor: "rgba(78, 115,   223, 1)",
       pointHoverRadius: 3,
       pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
       pointHoverBorderColor: "rgba(78, 115, 223, 1)",
       pointHitRadius: 10,
       pointBorderWidth: 2,
       data: [],
       
     },
     {
      label: 'CPU',
        data: [],
        fill: false,
        borderColor: '#1CC88A',
        tension: 0.1
     },
     {
      label: 'RAM',
      data:[],
      fill:false,
      borderColor: 'rgb(199, 52, 52)',
      tension:0.1
     }
    ]

  };
   

  if(opcao === 'todos'){
      
    for (i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      labels.push(registro.hora);
      dados.datasets[0].data.push(registro.demandaDisco);
      dados.datasets[1].data.push(registro.demandaCPU);
      dados.datasets[2].data.push(registro.demandaMemoriaRAM);

      chamarOcupacaoDatacenter(registro.demandaDisco)
    }
    
  }else if(opcao === 'CPU'){
    dados.datasets = [{
      label: 'CPU',
      data: [],
      fill: false,
      borderColor: '#1CC88A',
      tension: 0.1
    }]
    for (i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      labels.push(registro.hora);
      dados.datasets[0].data.push(registro.demandaCPU);
    }

  } else if(opcao === 'RAM'){
    dados.datasets = [{
      label: 'RAM',
      data:[],
      fill:false,
      borderColor: 'rgb(199, 52, 52)',
      tension:0.1
    }]
    for (i = 0; i < resposta.length; i++){
      var registro = resposta[i];
      labels.push(registro.hora)
      dados.datasets[0].data.push(registro.demandaMemoriaRAM)
    }


  }else if(opcao === 'Disco'){
    dados.datasets = [{
      label: "Disco",
       lineTension: 0.3,
       backgroundColor: "rgba(78, 115, 223, 0.005)",
       borderColor: "rgba(78, 115, 223, 1)",
       pointRadius: 3,
       pointBackgroundColor: "rgba(78, 115, 223, 1)",
       pointBorderColor: "rgba(78, 115,   223, 1)",
       pointHoverRadius: 3,
       pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
       pointHoverBorderColor: "rgba(78, 115, 223, 1)",
       pointHitRadius: 10,
       pointBorderWidth: 2,
       data: [],
    }]
    for (i = 0; i < resposta.length; i++){
      var registro = resposta[i];
      labels.push(registro.hora)
      dados.datasets[0].data.push(registro.demandaDisco)
    }

  }
  myLineChart['data'] = dados;
  myLineChart.update()      


};

function chamarOcupacaoDatacenter(porcentagem){
  porcentagemDemandaDatacenter.innerHTML = Number(porcentagem).toFixed(1) + "%"
  demandaBAR.style.width = `${Number(porcentagem)}%`;
  if (Number(porcentagem) < 50) {
    demandaBAR.style.backgroundColor = 'blue'
  }
  if (Number(porcentagem) > 50) {
    demandaBAR.style.backgroundColor = 'yellow'
  }
  if (Number(porcentagem) > 80) {
    demandaBAR.style.backgroundColor = 'red'
  }
  

}