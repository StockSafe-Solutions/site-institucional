// Set new default font family and font color to mimic Bootstrap's default styling
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

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{
      label: "Revenue",
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: [4215, 5312, 6251, 7841, 9821, 14984],
    }],
  },
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
          unit: 'month'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 15000,
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + formatarNumero(value);
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
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + formatarNumero(tooltipItem.yLabel);
        }
      }
    },
  }
});
