function carregarConfigs() {
    fetch("/configuracao/listar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json)
                iptBanda.value = json['banda_larga']
                iptTaxa.value = json['taxa_transferencia'].replace(".",",")
            });
        }
        else{
            resposta.text().then(texto => {
                console.warn(texto)
        })}
    }).catch(function (erro) {
        console.log(erro);
    })
}

function alterarConfigs(){
    bandaVar = iptBanda.value
    taxaVar = iptTaxa.value

    fetch("/configuracao/alterar/"+1, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bandaServer: bandaVar,
            taxaServer: taxaVar
        }),
    }).then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Configurações alteradas com sucesso!',
                text: 'As métricas utilizadas nas dashboards serão atualizadas automaticamente de acordo com os valores definidos.'
            })
            carregarConfigs()
        }
        else {
            Swal.fire({
                title: 'Erro interno!',
                text: 'Erro no servidor do aplicativo. Contate seu administrador de TI.',
                icon: 'error'
            })
        }}).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        }
    );
}