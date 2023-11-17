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

function gerenciarGraficosRosquinha(id, vetorLivre, vetorUso) {
	if (contadorDeCharts == 2) {
		chartCPU.destroy();
		chartRAM.destroy();
		contadorDeCharts = 1;
	} else {
		contadorDeCharts++;
	}

	chartRosca = criaGraficoRosquinha(id, vetorLivre, vetorUso)
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

function criaGraficoRosquinha(id, vetorLivre, vetorUso) {
	const ctx = document.getElementById(id);
	return new Chart(ctx, {
		type: "doughnut",
		data: {
			labels: ["Em uso", "Livre"],
			datasets: [
				{
					label: "Porcentagem de uso: ",
					data: [vetorLivre, vetorUso],
					backgroundColor: ["#005EFF", "#001A46"],
					hoverOffset: 4,
				},
			],
		},
	});
}