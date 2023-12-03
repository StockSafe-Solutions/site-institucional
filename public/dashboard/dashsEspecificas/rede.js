function carregarExemplo(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)
    // PEGANDO O PARAMETRO GET

    nomePagina.innerText = "Dashboard Rede - Servidor "+params

    carregarMenu("rede", false, params)
    //CARREGANDO O MENU, false PARA PAG. ESPECÍFICA
}
