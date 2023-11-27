function carregarPaginaProcessos(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)
    // PEGANDO O PARAMETRO GET

    nomePagina.innerText = "Processos - Servidor "+params

    carregarMenu("Processos",false,params)
    //CARREGANDO O MENU, false PARA PAG. ESPECÍFICA

    setTimeout(()=>{
        atualizarProcessos()
    },sessionStorage.intervalo_atualizacao)
}

function carregarProcessos(processos) {
    var listaProcessos = document.getElementById("listaProcessos");
    listaProcessos.innerHTML = ""

    processos.forEach((processo, i) => {
        var linha = document.createElement("li");

        linha.innerHTML = `
        <ol>
        <span>PID: ${processo.pid_proc}</span>
        <span>Nome: ${processo.nome_proc}</span>
        <span>Uso de CPU: ${processo.uso_cpu}</span>
        <span>Uso de RAM: ${processo.uso_ram}</span>
        </ol>
        `

        listaProcessos.appendChild(linha)
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