function atualizarDados(){

    var idFuncionario = sessionStorage.ID_FUNCIONARIO
    fetch(`/funcionario/mostrarNome/${idFuncionario}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json()
            .then(function (resposta) {
                var nome = resposta[0].nome
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                usuario_nome.innerHTML = `${nome}`
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        finalizarAguardar();
    });
    fetch(`/funcionario/mostrarFoto/${idFuncionario}`).then(function (resposta) {
        if(resposta.ok){
            resposta.json()
            .then(function (resposta){
                infos = resposta[0]
                var Foto = document.getElementById("usuario_foto");
                var Perfil = document.getElementById("imagemPerfil");
                if(infos.foto == null){
                    Foto.src = `../../assets/imgs/av1.png`
                
                } else{
                    Foto.src = `../../assets/${infos.foto}`;
                    Perfil.src = `../../assets/${infos.foto}`;
                }
                console.log("Dados recebidos: ", JSON.stringify(resposta));
            })
        } else {
            throw("Houve um erro na API");
        }
    }).catch(function (resposta) {
        console.error(resposta);
        finalizarAguardar();
    });
}