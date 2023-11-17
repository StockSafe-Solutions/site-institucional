function carregarDadosRam(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)
    // PEGANDO O PARAMETRO GET

    nomePagina.innerText = "Dashboard Memória - Servidor "+params
    urlKPIs = "";
	urlGraficos = "";
	urlDados = "";

    urlGraficos = "../dash/graficosEspecificos/" + params;
    carregarMenu("memoria", false, params);
    //CARREGANDO O MENU, false PARA PAG. ESPECÍFICA

    fetch(urlGraficos, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(function (resposta) {
				if (resposta.ok) {
					resposta.json().then((json) => {
						chamarGraficos(json);
					});
				} else {
                    console.log("UUUUUUUUUUUUUUUUU");
					resposta.text().then((texto) => {
						console.warn(texto);
					});
				}
			})
			.catch(function (erro) {
				console.log(erro);
                console.log("aaaaaa")
			});
}

function chamarGraficos(json){
    json_livre = json[0];
    livre = [];
    for(i in json_livre){
        livre.push(i);
    }

    json_usando = json[1];
    usando = [];
    for(i in json_usando){
        usando.push(i);
    }

    gerenciarGraficosRosquinha("graficoQuantidade", livre, usando);

}