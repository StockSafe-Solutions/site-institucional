function carregarMenu(pagina, geral, codServidor) {
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
    destEspecifica = ""
    destExemplo = ""
    destRede = ""

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
        case "especifica":
            destEspecifica = " active"
            break;
        case "exemplo":
            destExemplo = " active" // SE O NOME DA PÁGINA FOR "exemplo", OS LINKS DE EXEMPLO ESTARÃO ATIVOS
            break;
        case "rede":
            destRede = " active"
            break;
    }

    let conteudoGeral = `
    <!-- Marca -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
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
            </li>
            
            <li class="nav-interrogacao">
              
            <button class="modalBtn" onclick="switchModalHelpDesk()">
                <img src="../assets/img/dashboard/interrogacao.png" class="imgInterrog">
            </button>
                  
            <div class="modal">
                <div class="content">
                    <div class="jira">
                        <a href="https://stock-safe-solutions.atlassian.net/servicedesk/customer/portal/1" target="_blank"><img src="../assets/img/dashboard/jira.png" class="imgJira"></a>
                    </div>

                    <div class="slack">
                    <a href="https://stocksafe-solutions.slack.com/" target="_blank"><img src="../assets/img/dashboard/slack.png" class="imgSlack"></a>
                    </div>
                </div>
            </div>

            </li>
            `

        let pasta = ""
        let saida = "../"
        if(pagina == "especifica"){
            pasta = "dashsEspecificas/"
            saida = ""
        }
        //Como as dashs especificas estão em uma página separada da geral, devemos manipular os links
        //da navbar de acordo para não dar bug

        let conteudoEspecifica = `
            <!-- Marca -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-text mx-3 codServidorNavbar">Servidor ${codServidor}</div>
            </a>
        
            <!-- Divider -->
            <hr class="sidebar-divider my-0">
        
            <!-- Dashboard -->
            <li class="nav-item${destEspecifica}">
                <a class="nav-link" href="${saida}index.html?${codServidor}">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Visão geral</span></a>
            </li>
            <!-- COPIAR ESSE <li> PARA CRIAR MAIS LINKS
            PARA MUDAR O ÍCONE, MUDAR A CLASSE DO FONTAWESOME ->
            <!-- COLOCAR O codServidor COMO PARAMETRO GET NAS PAGINAS SE PRECISAR ->

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Rede -->
            <li class="nav-item${destRede}">
                <a class="nav-link" href="${pasta}rede.html?${codServidor}">
                    <i class="fa-solid fa-wifi"></i>
                    <span>Rede</span></a>
            </li>
            <!-- Exemplo -->
            <li class="nav-item${destExemplo}">
                <a class="nav-link" href="${pasta}processos.html?${codServidor}">
                    <i class="fa-solid fa-list"></i>
                    <span>Processos</span></a>
            </li>

            <!-- Divisor -->
            <hr class="sidebar-divider d-none d-md-block">`

    let conteudo = null
    if(geral){
        conteudo = conteudoGeral
    } else{
        conteudo = conteudoEspecifica
        reload_e_alertas.style = "left: -45px" // Adicionando espaço para que o mural de notifics. não fique embaixo do X
    }

    accordionSidebar.className = "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    accordionSidebar.innerHTML = conteudo;
    
    criarContainerAlertas()
    setInterval(()=>{
        atualizarAlertas()
    },sessionStorage.intervalo_atualizacao)

    // BOTÃO DE AJUDA      
      window.onclick = function(event) {
          const modal = document.querySelector('.modal')
        if (event.target == modal) {
            switchModalHelpDesk()
        }
      }
}

function switchModalHelpDesk(){
    const modal = document.querySelector('.modal')
    const actualStyle = modal.style.display
    if(actualStyle == 'block') {
      modal.style.display = 'none'
    }
    else {
      modal.style.display = 'block'
    }
}

// ========================================================== ALERTAS

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
                corAlerta = "#319e41"; Verde
                break;
            case 1:
                tituloAlerta = "Atenção";
                corAlerta = "#ccc34d"; Amarelo
                break;
            case 2:
                tituloAlerta = "Cuidado";
                corAlerta = "#f7ae04"; Laranja
                break;
            case 3:
                tituloAlerta = "Perigo";
                corAlerta = "#f73504"; Vermelho
        }

        quadroDeAlertas.innerHTML += `
        <li id="alerta${alerta.id_alerta}"
        style="background-color: ${corAlerta}; cursor: pointer;"
        onclick="visualizarAlerta(${alerta.id_alerta})"
        onmouseover="expandirAlerta(${alerta.id_alerta})"
        onmouseleave="comprimirAlerta(${alerta.id_alerta})">
            <u>
                <h4>
                    ${tituloAlerta}
                </h4>
            </u>
            <span>
                <p>${alerta.descricao}</p>
                <i id="iconAlerta${alerta.id_alerta}" class="fa-solid fa-plus"></i>
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
    alertaAlvo = document.getElementById(`alerta${id}`)
    icon = document.getElementById(`iconAlerta${id}`)

    icon.style = "animation-name: rodar";
    alertaAlvo.className = "alertaAberto"
    setTimeout(()=>{
        icon.className = "fa-solid fa-minus aberto"
        icon.style = ""
    },100)
}

function comprimirAlerta(id){

    alertaAlvo = document.getElementById(`alerta${id}`)
    icon = document.getElementById(`iconAlerta${id}`)

    icon.style = "animation-name: rodar; animation-direction: reverse";
    alertaAlvo.className = "";
    setTimeout(()=>{
        icon.className = "fa-solid fa-plus"
        icon.style = ""
    },100)
}

function visualizarAlerta(id) {

    alertaAlvo = document.getElementById(`alerta${id}`);

    console.log("Opa, notificação clicada!")

    console.log(id);

    fetch(`/alerta/visualizarAlerta/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_alerta: id
        }),
    })
    .then(function (resposta) {
        if (resposta.ok) {
            console.log("Visualização alterada!");
        } else {
            console.warn(`Erro: ${resposta.status} - ${resposta.statusText}`);
        }
    })
    .catch(function (erro) {
        console.error(erro);
    })
    .finally(function (){
        if (alertaAlvo) {
            alertaAlvo.style.display = 'none';
        }
    });
}

// ========================================================================

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
