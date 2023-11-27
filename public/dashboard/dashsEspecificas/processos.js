function carregarPaginaProcessos(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)
    // PEGANDO O PARAMETRO GET

    nomePagina.innerText = "Processos - Servidor "+params

    carregarMenu("Processos",false,params)
    //CARREGANDO O MENU, false PARA PAG. ESPECÍFICA
}

function carregarProcessos(processos) {

    processos.forEach((processo, i) => {
        console.log(processo.pid_proc)
    });
}

function atualizarProcessos() {

    setTimeout(() => {
        const processos = [
            fetch("/processo/listarProcessos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
                if (resposta.ok) {
                    console.log(resposta);
                    resposta.json().then(json => {
                        console.log(json)
                        carregarProcessos(json)
                    });
                }
                else {
                    resposta.text().then(texto => {
                        console.warn(texto)
                    })
                }
            }).catch(function (erro) {
                console.log(erro);
            })
        ];
        carregarProcessos(processos)
    })

}