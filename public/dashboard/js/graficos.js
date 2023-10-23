function carregarGrafico(id ,vetorDados){
  const ctx = document.getElementById(id);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      datasets: [{
        data: vetorDados
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          max: 100,
          beginAtZero: true,
          border: {color: 'black'}
        },
        x: {border: {color: 'black'}}
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}