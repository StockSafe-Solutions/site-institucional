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
						chamarGraficos("livre", json);
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
                            console.log("Usada  está indo");
							chamarGraficos("usado", json)
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

function chamarGraficos(tipo, json){
  if(tipo == "livre"){
			json_livre = json[0];
			livre = [];
			for (i in json_livre) {
				livre.push(i);
			}
			console.log(livre);
			liv = livre;
		}
    else if(tipo == "usado"){
			json_usado = json[0];
			usado = [];
			for (i in json_usado) {
				usado.push(i);
			}
			usu = usado;
		}
    gerenciarGraficosRosquinha("graficoQuantidadeRAM", liv, usu);
}

