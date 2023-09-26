// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
obterDadosGrafico(2000)
var media = 0
function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}


function obterDadosGrafico(idMaquina) {

  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }

  fetch(`/medidas/buscar/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
              resposta.reverse();

              plotarGrafico(resposta, idMaquina);

          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}



  function plotarGrafico(resposta, idMaquina) {

        console.log('iniciando plotagem do gráfico...');

        // Criando estrutura para plotar gráfico - labels
        let labels = [];

        // Criando estrutura para plotar gráfico - dados
        let dados = {
          labels: labels, 
           datasets: [{
             label: "Porcentagem",
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
             data: [
               // 0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 100, 30000, 25000, 40000
             ],
           }],
            // {
            //     label: 'Temperatura',
            //     data: [],
            //     fill: false,
            //     borderColor: 'rgb(199, 52, 52)',
            //     tension: 0.1
            // }
        };

        console.log('----------------------------------------------')
        console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
        console.log(resposta)
var total = 0
        // Inserindo valores recebidos em estrutura para plotar o gráfico
        for (i = 0; i < resposta.length; i++) {
            var registro = resposta[i];
            labels.push(registro.momento_grafico);
            dados.datasets[0].data.push(registro.valor);
            total +=Number (registro.valor)
            // dados.datasets[1].data.push(registro.temperatura);
            chamarPercentCPU(registro.valor)
        }
media = total/Number(resposta.length);
        console.log('----------------------------------------------')
        console.log('O gráfico será plotado com os respectivos valores:')
        console.log('Labels:')
        console.log(labels)
        console.log('Dados:')
        console.log(dados.datasets)
        console.log('----------------------------------------------')

        // Criando estrutura para plotar gráfico - config
        const config = {
            data: dados,
        };

        // Adicionando gráfico criado em div na tela
        let myChart = new Chart(document.getElementById(`myChartCanvas${idMaquina}`), 
        {
          type: 'line',
          data: dados,
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
                  maxTicksLimit: 7
                }
              }],
              yAxes: [{
                ticks: {
                  maxTicksLimit: 5,
                  padding: 10,
                  // Include a dollar sign in the ticks
                  // callback: function(value, index, values) {
                  //   return number_format(value) + '%' ;
                  // }
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
              display: true
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
                    return datasetLabel + ': ' + number_format(tooltipItem.yLabel) + '%';
                  }
              }
            }
          }
        });

        setTimeout(() => atualizarGrafico(idMaquina, dados, myChart), 2000);
    }

    function atualizarGrafico(idMaquina, dados, myChart) {



      fetch(`/medidas/tempo-real/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
          if (response.ok) {
              response.json().then(function (novoRegistro) {

                  // obterdados(idMaquina);
                  // alertar(novoRegistro, idMaquina);
                  console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                  console.log(`Dados atuais do gráfico:`);
                  console.log(dados);

                  let avisoCaptura = document.getElementById(`avisoCaptura${idMaquina}`)
                  //  


                  if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                      console.log("---------------------------------------------------------------")
                      console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                      // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                      console.log("Horário do novo dado capturado:")
                      console.log(novoRegistro[0].momento_grafico)
                      console.log("Horário do último dado capturado:")
                      console.log(dados.labels[dados.labels.length - 1])
                      console.log("---------------------------------------------------------------")
                  } else {
                      // tirando e colocando valores no gráfico
                      dados.labels.shift(); // apagar o primeiro
                      dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento
                      

                      dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                      dados.datasets[0].data.push(novoRegistro[0].valor); // incluir uma nova medida de umidade
                      chamarPercentCPU(novoRegistro[0].valor);
                      // dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                      // dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                      myChart.update();
                  }

                  // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                  proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaquina, dados, myChart), 3000);
              });
          } else {
              console.error('Nenhum dado encontrado ou erro na API');
              // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
              proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaquina, dados, myChart), 2000);
          }
      })
          .catch(function (error) {
              console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
          });

  }
// Area Chart Example
// var ctx = document.getElementById("myAreaChart");

function chamarPercentCPU(porcentagem){
  porcentagemCPUbar.innerHTML= Number(porcentagem).toFixed(1) + "%";
  CPUbar.style.width = `${porcentagem}%`
  if (Number(porcentagem) < 50) {
    CPUbar.style.backgroundColor = 'blue'
  }
  if (Number(porcentagem) > 50) {
    CPUbar.style.backgroundColor = 'yellow'
  }
  if (Number(porcentagem) > 80) {
    CPUbar.style.backgroundColor = 'red'
  }
  mediaCPU.innerHTML = `${media.toFixed(2)}%`
}