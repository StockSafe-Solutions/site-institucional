function carregarPaginaProcessos(){
    indiceParm = location.href.indexOf('?')
    params = location.href.slice(indiceParm+1,indiceParm+7)
    nomePagina.innerText = "Processos - Servidor "+params

    carregarMenu("Processos",false,params)
 
    atualizarProcessos()
}

function carregarProcessos(processos) {
    var tbody = document.getElementById("cell_processos");
    tbody.innerHTML = ""

    processos.forEach((processo, i) => {
        var tr = document.createElement('tr');
        tbody.appendChild(tr)

        var tdPid = document.createElement('td');
        var tdNome = document.createElement('td');
        var tdCpu = document.createElement('td');
        var tdRam = document.createElement('td');

        tdPid.textContent = processo.pid_proc;
        tdNome.textContent = processo.nome_proc;
        tdCpu.textContent = processo.uso_cpu + "%";
        tdRam.textContent = processo.uso_ram + "%";

        tr.appendChild(tdPid);
        tr.appendChild(tdNome);
        tr.appendChild(tdCpu);
        tr.appendChild(tdRam);
    });
}

function atualizarProcessos() {

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
    }).finally(function () {
            setTimeout(atualizarProcessos, sessionStorage.intervalo_atualizacao);
    })
}