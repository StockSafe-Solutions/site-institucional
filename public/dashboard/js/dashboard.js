function carregarDashboardGeral(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)

    if(indiceParm == -1){
        nomePagina.innerText = "Dashboard - Visão Geral"
    } else{
        accordionSidebar.style = "display: none"
        nomePagina.innerText = "Dashboard - Servidor "+params
        containerAlertas.style = "left: -45px"

        nomeKPI2.innerText = "Taxa de transferência"

        iconKPI2.className = "fa-solid fa-arrow-right-arrow-left"
        valorKPI2.innerText = "198GB"
        baseKPI2.innerText = "de 200GB"
    }

    now = new Date()
    dataAtual = 
    now.getFullYear()+
    "-"+(now.getMonth()+1)+
    "-"+now.getDate()

    pesquisaData.value=dataAtual
    carregarGrafico('graficoCPU')
    carregarGrafico('graficoRAM')
}