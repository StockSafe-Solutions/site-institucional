function carregarDadosRam(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)
    // PEGANDO O PARAMETRO GET

    nomePagina.innerText = "Dashboard Memória - Servidor "+params
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
					console.log("Livre deu OK");
					resposta.json().then((json) => {
						chamarGraficosRAM("livre", json);
						console.log("sdfsdfdsfdfds LIVRE" , json)
					});
				} else {
					console.log("UUUUUUUUUUUUUUUUU");
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
						console.log("Usada deu  OK");
						resposta.json().then((json) => {
                            console.log("Usada  está indo", json);
							chamarGraficosRAM("usado", json)
						});
					} else {
						console.log("UUUUUUUUUUUUUUUUU");
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

function chamarGraficosRAM(tipo, json){
	legendas = ["Em uso", "Livre"];
	label = ["Porcentagem de uso"];
	console.log(label)
	const jsonArray = Array.from(json);
  if(tipo == "livre"){
		const ramLivre = Number(jsonArray[0]["ram_livre"]);
		liv = ramLivre;
		}
    else if(tipo == "usado"){
			const ramUso = Number(jsonArray[0]["ram_uso"]);
			usu = ramUso;
		}
    gerenciarGraficosRosquinha("qtdRAM", liv, usu, legendas, label);
}

