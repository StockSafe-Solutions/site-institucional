
var contadorDeCharts = 0
function gerenciarGraficos(id, vetorDados, vetorData) {
	const existeCPU = Chart.getChart("graficoCPU");
	const existeRAM = Chart.getChart("graficoRam");
	if (existeCPU && existeRAM) {
		existeCPU.destroy();
		existeRAM.destroy();
	} 
	if (id == "graficoCPU") {
		chartCPU = criarGrafico(id, vetorDados, vetorData);
	} else {
		chartRAM = criarGrafico(id, vetorDados, vetorData);
	}
}

function gerenciarGraficosRosquinha(id, vetorLivre, vetorUso, legendas, label) {
	const existingChart = Chart.getChart("qtdRAM");
	if (existingChart) {
		existingChart.destroy();
	}

	newChart = criaGraficoRosquinha(id, vetorLivre, vetorUso, legendas, label);
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

function criaGraficoRosquinha(id, vetorLivre, vetorUso, legendas, label) {
	const ctxs = document.getElementById(id);
	
	console.log(ctxs);
	return new Chart(ctxs, {
		type: "doughnut",
		data: {
			labels: legendas,
			datasets: [
				{
					label: `${label}`,
					data: [vetorLivre, vetorUso],
					backgroundColor: ["#001A46", "#005EFF"],
					hoverOffset: 4,
				},
			],
		},
	});
}