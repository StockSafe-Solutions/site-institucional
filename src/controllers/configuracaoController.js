var configuracaoModel = require("../models/configuracaoModel");

function listar(req, res) {
    configuracaoModel.listar().then(
        function (resultadoAutenticar) {
            console.log(`\n Resultados encontrados: ${resultadoAutenticar.length}`);
            console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

            if (resultadoAutenticar.length == 1) {
                console.log(resultadoAutenticar[0]);
                res.json(resultadoAutenticar[0]);
            } else {
                res.status(404).send()
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("\n Houve um erro ao carregar funcionários! Erro: ", erro.sqlMessage);
                res.status(500), json(erro.sqlMessage);
            }
        )
}

function alterar(req, res) {
    var id = req.params.id;
    var bandaLarga = req.body.bandaServer;
    var taxaTransf = req.body.taxaServer;
    var intervalo = req.body.intervaloServer;

    configuracaoModel.alterar(id, bandaLarga, taxaTransf, intervalo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\n Houve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage)
            }
        );
}

module.exports = {
    listar,
    alterar
}