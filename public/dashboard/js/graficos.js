
function gerenciarGraficos(id, vetorDados, vetorData) {
	if (id == "graficoCPU") {
		try{
			chartCPU = criarGrafico(id, vetorDados, vetorData);
		} catch{
			chartCPU.destroy()
			chartCPU = criarGrafico(id, vetorDados, vetorData);
		}
	} else {
		try{
			chartRAM = criarGrafico(id, vetorDados, vetorData);
		} catch{
			chartRAM.destroy()
			chartRAM = criarGrafico(id, vetorDados, vetorData);
		}
	}
}

function gerenciarGraficoHora(id, label, legendas, dados){
	const existeRamMin = Chart.getChart(id);
	if(existeRamMin){
		existeRamMin.destroy();
	}
	if (id == "graficoRAMinutos") {
		chartMin = criarGraficoHora(id, label, legendas, dados);
	}
}
function gerenciarGraficosBarra(id, dados, legendas, label) {
	const existingChart = Chart.getChart(id);
	if (existingChart) {
		existingChart.destroy();
	}

	newChart = criaGraficoBarra(id, label, legendas, dados);
}

function gerenciarGraficosRosquinha(id, dados, legendas, label) {
	const existingChart = Chart.getChart(id);
	if (existingChart) {
		existingChart.destroy();
	}

	newChart = criaGraficoRosquinha(id, dados, legendas, label);
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

function criaGraficoRosquinha(id, dados, legendas, label) {
	const ctxs = document.getElementById(id);
	return new Chart(ctxs, {
		type: "doughnut",
		data: {
			labels: legendas,
			datasets: [
				{
					label: `${label}`,
					data: dados,
					backgroundColor: [ "#005EFF","#001A46"],
					hoverOffset: 4,
				},
			],
		},
	});
}

function criarGraficoHora(id,label,legendas, dados){
		const ctx = document.getElementById(id);
		return new Chart(ctx, {
			type: "line",
			data: {
				labels: legendas,
				datasets: [
					{
						label: `${label}`,
						data: dados,
						fill: false,
						borderColor: "#005EFF",
						tension: 0.1,
					},
				],
			},
		});
}

function criaGraficoBarra(id, label, legendas, dados) {
	const ctxs = document.getElementById(id);
	return new Chart(ctxs, {
		type: "bar",
		data: {
			labels: legendas,
			datasets: [
				{
					label: `${label}`,
					data: dados,
					backgroundColor: ["#005EFF", "#001A46"],
					hoverOffset: 4,
				},
			],
		},
	});
}