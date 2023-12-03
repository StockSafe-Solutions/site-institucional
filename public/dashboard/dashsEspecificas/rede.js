function carregarPagina(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)
    // PEGANDO O PARAMETRO GET

    nomePagina.innerText = "Dashboard Rede - Servidor "+params

    carregarMenu("rede", false, params)
    //CARREGANDO O MENU, false PARA PAG. ESPECÍFICA

    carregarKPIs(params, "kpiBandaLarga", "bandaLarga")
    carregarKPIs(params, "kpiPacotesEnviados", "pacotesEnviados")
    carregarKPIs(params, "kpiPacotesRecebidos", "pacotesRecebidos")
    carregarKPIs(params, "kpiTaxaTransferencia", "taxaTransferencia")
}

function carregarKPIs(params, url, id){

    fetch(`../../rede/${url}/${params}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json)
                document.getElementById(id).innerHTML = Math.round((json[0].media * 100) / 100).toFixed(0);
            });
        }
        else {
            resposta.text().then(texto => {
                console.warn(texto)
            })
        }
    }).catch(function (erro) {
              console.log(erro)
    })
}
