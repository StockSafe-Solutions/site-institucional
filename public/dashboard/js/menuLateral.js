
function carregarMenu() {
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
        <li class="nav-item active">
            <a class="nav-link" href="index.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Visão geral</span></a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

            <!-- Serviodres -->
            <li class="nav-item">
                <a class="nav-link" href="cadastroMaquinas.html">
                    <img src="../assets/img/dashboard/addMaquinasMenu.png" alt="Cadastrar máquinas">
                        <span>Servidores</span></a>
            </li>

            <!-- Funcionários -->
            <li class="nav-item">
                <a class="nav-link" href="cadastroFuncionarios.html">
                    <img src="../assets/img/dashboard/addPerfilMenu.png" alt="Cadastrar funcionários">
                        <span>Funcionários</span></a>
            </li>

            <!-- Seu perfil -->
            <li class="nav-item">
                <a class="nav-link" href="cadastroFuncionarios.html">
                    <img src="../assets/img/dashboard/addPerfilMenu.png" alt="Cadastrar funcionários">
                        <span>Seu perfil</span></a>
            </li>

            <!-- Configurações -->
            <li class="nav-item">
                <a class="nav-link" href="cadastroFuncionarios.html">
                    <img src="../assets/img/dashboard/addPerfilMenu.png" alt="Cadastrar funcionários">
                        <span>Configurações</span></a>
            </li>

            <!-- Divisor -->
            <hr class="sidebar-divider d-none d-md-block">

                <!-- Configurações -->
                <li class="nav-item nav-profile">
                    <p class="nav-link">
                        <img src="../assets/img/fotosPadrao/undraw_profile.svg" alt="Cadastrar funcionários">
                            <span>Fernando Brandão</span>
                            <a onclick="sair()">Sair</a>
                    </p>
                </li>
                Adicionar notificações

                <!-- Sidebar Toggler (Sidebar) -->
                <div class="text-center d-none d-md-inline">
                    <button class="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
    `
    accordionSidebar.className = "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    accordionSidebar.innerHTML = conteudo;
}