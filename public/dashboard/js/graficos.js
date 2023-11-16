var contadorDeCharts = 0
function gerenciarGraficos(id, vetorDados, vetorData) {
	if (contadorDeCharts == 2) {
		chartCPU.destroy();
		chartRAM.destroy();
		contadorDeCharts = 1;
	} else {
		contadorDeCharts++;
	}

	if (id == "graficoCPU") {
		chartCPU = criarGrafico(id, vetorDados, vetorData);
	} else {
		chartRAM = criarGrafico(id, vetorDados, vetorData);
	}
}

function criarGrafico(id, vetorDados, vetorData) {
	const ctx = document.getElementById(id);
	return new Chart(ctx, {
		type: "line",
		data: {
			labels: vetorData,
			datasets: [
				{
					data: vetorDados,
				},
			],
		},
		options: {
			responsive: true,
			scales: {
				y: {
					max: 100,
					beginAtZero: true,
					border: { color: "black" },
				},
				x: { border: { color: "black" } },
			},
			plugins: { legend: { display: false } },
		},
	});
}