var processoModel = require("../models/processoModel");

function listarProcessos(req, res) {
    var codServidor = req.params.codServidor;
    var orderByString = req.body.orderServer;

    processoModel.listarProcessos(codServidor, orderByString).then(
        function (resultado) {
            console.log(`\n Resultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            if (resultado) {
                ;
                res.json(resultado);
            } else {
                res.status(404).send()
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("\n Houve um erro ao carregar os processos de máquina! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function atualizarKpis(req, res) {
    var codServidor = req.params.codServidor;

    processoModel.atualizarKpis(codServidor)
    .then(
        function (resultado) {
            
            console.log(`\n Resultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            if (resultado) {
                ;
                res.json(resultado);
            } else {
                res.status(404).send()
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("\n Houve um erro ao atualizar as Kpis dos processos! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function atualizarGraficoProc(req, res){
    var codServidor = req.params.codServidor;

    processoModel.atualizarGraficoProc(codServidor)
    .then(
        function (resultado) {
            
            console.log(`\n Resultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            if (resultado) {
                ;
                res.json(resultado);
            } else {
                res.status(404).send()
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("\n Houve um erro ao atualizar o gráfico dos processos! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

module.exports = {
    listarProcessos,
    atualizarKpis,
    atualizarGraficoProc
}