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

	


	fetch(`/dash/kpiRam/${params}`, {
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
					console.log(`sdfsdfsd2663`, json);
				
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
	dados = [liv, usu];
	gerenciarGraficosRosquinha("qtdRAM", dados, legendas, label);
}

function chamarGraficoHora(json) {
	label = "Tempo de resposta";
	dia = [];
	hora = [];
	for (i in json) {
		dia.push(json[i].Dia);
		hora.push(json[i].Minutos);
	}
	gerenciarGraficoHora("graficoRAMinutos", label, dia, hora);
}

function definirKPIs(json) {}
