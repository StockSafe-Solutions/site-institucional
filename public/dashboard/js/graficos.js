var contadorDeCharts = 0
function gerenciarGraficos(id, vetorDados) {

  if(contadorDeCharts == 2){
    chartCPU.destroy()
    chartRAM.destroy()
    contadorDeCharts = 1
  } else{
    contadorDeCharts++
  }

  if(id == "graficoCPU"){
    chartCPU = criarGrafico(id,vetorDados)
  } else{
    chartRAM = criarGrafico(id,vetorDados)
  }
}

function criarGrafico(id, vetorDados){
  const ctx = document.getElementById(id);
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
      datasets: [{
        data: vetorDados,
        borderColor: "#FFFFFF"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          max: 100,
          beginAtZero: true,
          border: { color: 'black' },
          ticks: {
            color: 'white',
          },
        }, x: { 
          border: { color: 'black' },
          ticks: {
            color: 'white',
          },
        }
      },
      plugins: { legend: { 
        display: false,
        fontColor: 'white'
      } }
    }});
}