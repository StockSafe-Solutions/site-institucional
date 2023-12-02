indiceParm = location.href.indexOf('?')
params = location.href.slice(indiceParm+1,indiceParm+7)

function carregarPagina(){

    nomePagina.innerText = " - Servidor "+params

    carregarMenu("dashboard rede" ,false,params)
    carregarDados()
}

function carregarDados(){

    fetch(`dashboardRede/kpiBandaLarga/${params}`, {cache: 'no-store'}).then((resposta) => {

        console.log(resposta);
    }).catch((erro) => {

        console.log(erro);
    })
}
