function carregarDadosRam() {
	indiceParm = location.href.indexOf("?");
	params = location.href.slice(indiceParm + 1, indiceParm + 7);
	// PEGANDO O PARAMETRO GET

	nomePagina.innerText = "Dashboard Memória - Servidor " + params;
	urlKPIs = "";
	urlGraficos = "";
	urlDados = "";

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
							console.log(87979797979797979797979797979,json)
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

	
}

var liv;
var usu;
function chamarGraficosRAM(tipo, json) {
	legendas = ["Em uso", "Livre"];
	label = ["Porcentagem de uso"];
	const jsonArray = Array.from(json);
	if (tipo == "livre") {
		const ramLivre = Number(jsonArray[0]["ram_livre"]);
		liv = ramLivre;
	} else if (tipo == "usado") {
		const ramUso = Number(jsonArray[0]["ram_uso"]);
		usu = ramUso;
	}
	dados = [liv, usu]
	gerenciarGraficosRosquinha("qtdRAM", dados,  legendas, label);
}


function chamarGraficoHora(json) {
	const newJson = json.map((item) => {
		const data = new Date(item.Dia);
		item.Dia = data.toLocaleDateString();
		return item;
	});

	label = "Tempo de resposta";
	jsonD = newJson[1];
	dia = [];
	let minutos = [];

	for (let i in jsonD) {
		dia.push(jsonD[i].Dia);
		minutos.push(jsonD[i].Minutos);
	}



	console.log(dia, 111)

	gerenciarGraficoHora("graficoRAMinutos", label, dia, minutos);
}
