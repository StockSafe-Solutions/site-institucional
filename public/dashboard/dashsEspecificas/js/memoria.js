
function carregarDadosRam() {
	indiceParm = location.href.indexOf("?");
	params = location.href.slice(indiceParm + 1, indiceParm + 7);
	// PEGANDO O PARAMETRO GET

	nomePagina.innerText = "Dashboard Memória - Servidor " + params;

	//urlGraficos = "../dash/graficosEspecificos/" + params;
	carregarMenu("memoria", false, params);
	//CARREGANDO O MENU, false PARA PAG. ESPECÍFICA

	fetch(`/dash/ramLivreEspeficico/${params}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (resposta) {
			if (resposta.ok) {
				resposta.json().then((json) => {
					chamarGraficosRAM("livre", json);
				});
			} else {
				console.log(`#ERRO: ${resposta}`);
				resposta.text().then((texto) => {
					console.warn(texto);
				});
			}
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
		});

	fetch(`/dash/ramUsadoEspeficico/${params}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (resposta) {
			if (resposta.ok) {
				resposta.json().then((json) => {
					chamarGraficosRAM("usado", json);
				});
			} else {
				resposta.text().then((texto) => {
					console.warn(texto);
				});
			}
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
		});

			fetch(`/dash/horaRam/${params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(function (resposta) {
					if (resposta.ok) {
						resposta.json().then((json) => {
							chamarGraficoHora(json);
						});
					} else {	
						console.log(`#ERRO: ${resposta}`);
						resposta.text().then((texto) => {
							console.warn(texto);
						});
					}
				})
				.catch(function (resposta) {
					console.log(`#ERRO: ${resposta}`);
				});

				fetch(`/dash/kpiRam/${params}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}).then(function(resposta){
					if(resposta.ok){
						resposta.json().then((json) => {
							definirKPIs(json);
						});
					}else{
						resposta.text().then((texto) => {
							console.warn(texto);
						});
					}
				}).catch(function (erro){
					console.log(erro);
				});
	
}

var liv;
var usu;
function chamarGraficosRAM(tipo, json) {
	legendas = ["Livre", "Em uso"];
	label = ["Porcentagem de uso"];
	const jsonArray = Array.from(json);
	if (tipo == "livre") {
		const ramLivre = Number(jsonArray[0]["ram_livre"]);
		liv = ramLivre;
	} else if (tipo == "usado") {
		const ramUso = Number(jsonArray[0]["uso_da_ram"]);
		usu = ramUso;
	}
	dados = [liv, usu]
	gerenciarGraficosRosquinha("qtdRAM", dados,  legendas, label);
}


function chamarGraficoHora(json) {
	label = "Tempo de resposta";
		dia = [];
		hora = [];
		for (i in json) {
			dia.push(json[i].Dia);
			hora.push(json[i].Minutos)
		}
	gerenciarGraficoHora("graficoRAMinutos", label, dia, hora);
}

function definirKPIs(json){
	const jsonArray = Array.from(json);
	console.log(json);	
	KPI1.className = "kpiBoa";
	KPI2.className = "kpiBoa";
	KPI4.className = "kpiBoa";

	valorKPI2.style = "font-size: 28px";
	valorKPI2.innerText = `Status: BOM`;
	valorKPI1.innerText = Number(jsonArray[0]["avgUsoRam"]) + "%";
	valorKPI4.innerText = Number(jsonArray[0]["avgTotalRam"]) + "GB";

	//..Metricas
	if (Number(jsonArray[0]["avgUsoRam"]) > 75) {
		KPI1.className = "kpiRuim";
		if (Number(jsonArray[0]["avgUsoRam"]) > 90) {
			KPI1.className = "kpiMuitoRuim";
		}
	}
	
	if (Number(jsonArray[0]["avgUsoRam"]) > 75) {
		valorKPI2.innerText = `Status: Risco`;
		KPI2.className = "kpiRuim";
		if (Number(jsonArray[0]["avgUsoRam"]) > 80) {
			valorKPI2.innerText = `Status: Ruim`;
			KPI2.className = "kpiMuitoRuim";
		}
	}

	if (Number(jsonArray[0]["avgTotalRam"]) < 15) {
		KPI4.className = "kpiRuim";
		if (Number(jsonArray[0]["avgTotalRam"]) < 10) {
			KPI4.className = "kpiMuitoRuim";
		}
	}
}

function chamarRegistrosRam() {
	carregarDadosRam();
	indiceParm = location.href.indexOf("?");
	params = location.href.slice(indiceParm + 1, indiceParm + 7);
	var data = pesquisaData.value;

		urlDados = `/dash/csvRam/${params}/${data}`;
	
	fetch(urlDados, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (resposta) {
			console.log("Resposta: ", resposta);
			if (resposta.ok) {
				console.log("OK");
				resposta.json().then((json) => {
					console.log(json);
					csv(json);
				});
			} else {
				console.log("não ok");
				console.log(`#ERRO: ${resposta}`);
			}
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
		});
}

function csv(json) {
	const colunas = Object.keys(json[0]);
	var csv = colunas.join(",");

	for (const item of json) {
		const linha = Object.values(item).join(",");
		csv += "\n" + linha;
	}

	console.log(csv);

	const blob = new Blob([csv], { type: "text/csv" });
	const link = document.createElement("a");
	link.href = window.URL.createObjectURL(blob);
	link.download = "dados.csv";
	link.click();
}
