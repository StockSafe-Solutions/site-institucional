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
                <a class="nav-link" href="cadastroFuncionarios.html">
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
}