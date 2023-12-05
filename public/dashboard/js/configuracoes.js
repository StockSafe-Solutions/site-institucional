
// OLHAR ../JS/LOGIN.JS PARA VER ATRIBUIÇÕES DOS SESSION STORAGE AQUI CONSUMIDOS

function carregarCamposConfigs(){
    iptBanda.value = sessionStorage.banda_larga
    iptTaxa.value = sessionStorage['taxa_transferencia']
    
    slctIntervalo.innerHTML = ""
    textos = ["10 segundos","30 segundos","1 minuto","5 minutos","10 minutos","15 minutos",
    "30 minutos","1 hora"]
    intervalos = [10000,30000,60000,300000,600000,900000,1800000,3600000]

    for(i in intervalos){
        var selected = ""
        if(intervalos[i] == sessionStorage.intervalo_atualizacao){
            selected = "selected"
        }
        slctIntervalo.innerHTML += `<option value="${intervalos[i]}" ${selected}>${textos[i]}</option>`
    }
}

function alterarConfigs(){
    bandaVar = iptBanda.value
    taxaVar = iptTaxa.value
    intervaloVar = slctIntervalo.value

    fetch("/configuracao/alterar/"+1, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bandaServer: bandaVar,
            taxaServer: taxaVar,
            intervaloServer: intervaloVar
        }),
    }).then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            swal({
                icon: 'success',
                title: 'Configurações alteradas com sucesso!',
                text: 'As métricas utilizadas nas dashboards serão atualizadas automaticamente de acordo com os valores definidos.'
            })
            carregarConfigs()
        }
        else {
            swal({
                title: 'Erro interno!',
                text: 'Erro no servidor do aplicativo. Contate seu administrador de TI.',
                icon: 'error'
            })
        }}).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        }
    );
}