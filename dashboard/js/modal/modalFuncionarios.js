function abrirModal(modal, codigo) {
    switch (modal) {
        case "cad":
            gerarCodigo()
            modalCadastro.style = "display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(()=>{
                modalCadastro.style = "display: flex"
            },1000)
            break
        case "dash":
            frameDashboard.src="index.html?"+codigo
            modalDashboard.style = "display: flex; animation-name: aparecer; animation-duration: 500ms;"
            setTimeout(()=>{
                modalDashboard.style = "display: flex"
            },1000)
            break
    }
    setTimeout(()=>{
        containerModal.style = "display: flex"
    },500)
}