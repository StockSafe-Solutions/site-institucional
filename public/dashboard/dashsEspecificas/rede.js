function carregarPagina(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)
    // PEGANDO O PARAMETRO GET

    nomePagina.innerText = "Dashboard Rede - Servidor "+params

    carregarMenu("rede", false, params)
    //CARREGANDO O MENU, false PARA PAG. ESPECÍFICA

    carregarKPIs(params)
}

function carregarKPIs(params){

    fetch(`../../rede/kpiBandaLarga/${params}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            console.log(resposta.json())
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
