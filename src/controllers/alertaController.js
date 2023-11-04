var alertaModel = require("../models/alertaModel");

function listarAlertas(req, res) {
    alertaModel.listarAlertas().then(
        function (resultado) {
            console.log(`\n Resultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            if (resultado) {
                console.log(resultado);
                res.json(resultado);
            } else {
                res.status(404).send()
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("\n Houve um erro ao carregar os alertas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

module.exports = {
    listarAlertas
}