var perfilEmpresaModel = require("../models/perfilEmpresaModel");

function pegarDadosEmpresa(req, res) {
    var idUsuario = req.params.idUsuario

        perfilEmpresaModel.pegarDadosEmpresa(idUsuario)
            .then(
                function (resultadoPegarDadosEmpresa) {
                    console.log(`\nResultados encontrados: ${resultadoPegarDadosEmpresa.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoPegarDadosEmpresa[0] )}`); // transforma JSON em String
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

    function alterarDados(req, res) {
        var senha = req.body.senhaServer;
        var idUsuario = req.body.idUsuarioServer;
    
        perfilEmpresaModel.alterarDados(senha,idUsuario)
    
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\n Houve um erro ao atualizar os dados! Erro: ", erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            );
    }




module.exports = {
    pegarDadosEmpresa, 
    alterarDados
}