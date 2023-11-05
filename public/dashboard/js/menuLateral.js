function carregarMenu(pagina) {
    jsonFunc = JSON.parse(sessionStorage.funcionario)
    nomeUsuario = jsonFunc.nome;
    fotoUsuario = jsonFunc.foto;
    if(fotoUsuario == null){
        fotoUsuario = "../assets/img/fotosPadrao/undraw_profile.svg"
    }

    destGeral = ""
    destServs = ""
    destFuncs = ""
    destPerf = ""
    destConfig = ""

    switch (pagina) {
        case "geral":
            destGeral = " active"
            break;
        case "servs":
            destServs = " active"
            break;
        case "funcs":
            destFuncs = " active"
            break;
        case "perf":
            destPerf = " active"
            break;
        case "config":
            destConfig = " active"
            break;
    }

    var conteudo = `
    <!-- Marca -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <!-- Carinha feliz -->
        <!-- <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
        </div> -->
        <div class="sidebar-brand-text mx-3">StockSafe</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item${destGeral}">
            <a class="nav-link" href="index.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Visão geral</span></a>
        </li>

            <!-- Servidores -->
            <li class="nav-item${destServs}">
                <a class="nav-link" href="servidores.html">
                    <i class="fa-solid fa-server"></i>
                    <span>Servidores</span></a>
            </li>

            <!-- Funcionários -->
            <li class="nav-item${destFuncs}">
                <a class="nav-link" href="funcionarios.html">
                    <i class="fa-solid fa-users"></i>
                    <span>Funcionários</span></a>
            </li>

            <!-- Seu perfil -->
            <li class="nav-item${destPerf}">
                <a class="nav-link" href="perfil.html">
                    <i class="fa-solid fa-user-gear"></i>
                    <span>Seu perfil</span></a>
            </li>

            <!-- Configurações -->
            <li class="nav-item${destConfig}">
                <a class="nav-link" href="configuracoes.html">
                    <i class="fa-solid fa-gears"></i>
                    <span>Configurações</span></a>
            </li>

            <!-- Divisor -->
            <hr class="sidebar-divider d-none d-md-block">

            <!-- Usuário logado -->
            <li class="nav-item nav-profile">
            <p class="nav-link">
                <img src="${fotoUsuario}">
                <span>${nomeUsuario}</span>
                <a onclick="sair()">Sair</a>
            </p>
            </li>`
    accordionSidebar.className = "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    accordionSidebar.innerHTML = conteudo;

    criarContainerAlertas()
    setInterval(()=>{
        atualizarAlertas()
    },sessionStorage.intervalo_atualizacao)
}

function criarContainerAlertas() {
    containerAlertas.innerHTML = `
    <p id="contadorAlerta" onclick="quadroAlertas()"></p>
    <i class="fa-solid fa-bell" onclick="quadroAlertas()" id="iconQuadroAlertas"></i>
    <ul id="quadroDeAlertas"></ul>`;
    atualizarAlertas();
}

function carregarAlertas(alertas) {
    quadroDeAlertas.innerHTML = "";
    contadorAlerta.innerText = alertas.length;

    alertas.forEach((alerta, i) => {
        let tituloAlerta = "";
        let corAlerta = "";
        switch (alerta.nivel_alerta) {
            case 0:
                tituloAlerta = "Normal";
                corAlerta = "#319e41"; // Verde
                break;
            case 1:
                tituloAlerta = "Atenção";
                corAlerta = "#ccc34d"; // Amarelo
                break;
            case 2:
                tituloAlerta = "Cuidado";
                corAlerta = "#f7ae04"; // Laranja
                break;
            case 3:
                tituloAlerta = "Perigo";
                corAlerta = "#f73504"; // Vermelho
        }

        quadroDeAlertas.innerHTML += `
        <li id="alerta${alerta.id_alerta}" style="background-color: ${corAlerta}">
            <u>
                <h5 
                style="cursor: pointer"  
                onclick="marcarVisualizado(${alerta.id_alerta})">
                    ${tituloAlerta}
                </h5>
            </u>
            <span>
                <p>${alerta.descricao}</p>
                <i onclick="expandirAlerta(${alerta.id_alerta})" 
                    id="iconAlerta${alerta.id_alerta}" 
                    class="fa-solid fa-plus">
                </i>
            </span>
            <p>Servidor: ${alerta.codigo}</p>
            <p>Horário: ${formatarDataHora(alerta.data_hora)}</p>
        </li>`;

    });

    if (alertas.length === 0) {
        quadroDeAlertas.innerHTML += `
        <p><br>Nenhum alerta encontrado</p>`;
    }
}

function atualizarAlertas() {
    if (iconQuadroAlertas.className.indexOf("iconQuadroAberto") === -1) {
        iconQuadroAlertas.className = "fa-solid fa-arrows-rotate";
        iconQuadroAlertas.style = "animation-name: girar; pointer-events: none";
        contadorAlerta.style = "display: none";

        setTimeout(() => {
            const alertas = [
                fetch("/alerta/listarAlertas", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function (resposta) {
                    if (resposta.ok) {
                        console.log(resposta);
                        resposta.json().then(json => {
                            console.log(json)
                            carregarAlertas(json)
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
            carregarAlertas(alertas);

            setTimeout(() => {
                iconQuadroAlertas.className = "fa-solid fa-bell";
                iconQuadroAlertas.style = "";
                contadorAlerta.style = "";
            }, 1000);
        }, 500);
    }
}

var quadroAberto = false
function quadroAlertas(){
    if(!quadroAberto){
        quadroDeAlertas.style = "display: flex";
        iconQuadroAlertas.className += " iconQuadroAberto"
        quadroAberto = true
    } else{
        quadroDeAlertas.style = "";
        iconQuadroAlertas.className = "fa-solid fa-bell"
        quadroAberto = false
        atualizarAlertas()
    }
}

function expandirAlerta(id){
    alertaAlvo = document.getElementById("alerta"+id)
    icon = document.getElementById("iconAlerta"+id)

    if(icon.className.indexOf("aberto") == -1){
        icon.style = "animation-name: rodar";
        alertaAlvo.className = "alertaAberto";
        setTimeout(()=>{
            icon.className = "fa-solid fa-minus aberto"
            icon.style = ""
        },500)
    } else{
        icon.style = "animation-name: rodar; animation-direction: reverse";
        alertaAlvo.className = "";
        setTimeout(()=>{
            icon.className = "fa-solid fa-plus"
            icon.style = ""
        },500)
    }
}

function marcarVisualizado(id) {

    console.log("Opa, notificação clicada!")

    var idAlerta = id;

    fetch(`alerta/visualizarAlerta/${idAlerta}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log("Visualização alterada!")
        }
        else {
            console.log("Houve um erro ao alterar visualização")
        }
    }).catch(function (erro) {
        console.log(erro);
    })

    var alertaElement = document.getElementById(`alerta${idAlerta}`);
    if (alertaElement) {
        alertaElement.style.display = 'none';
    }
}

function formatarDataHora(dataHoraString) {
    const dataHora = new Date(dataHoraString);
    const formatarNumero = (numero) => (numero < 10 ? `0${numero}` : numero);

    const dia = formatarNumero(dataHora.getDate());
    const mes = formatarNumero(dataHora.getMonth() + 1);
    const ano = dataHora.getFullYear().toString().slice(-2);
    const hora = formatarNumero(dataHora.getHours());
    const minutos = formatarNumero(dataHora.getMinutes());
    const segundos = formatarNumero(dataHora.getSeconds());

    return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
}
