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

function visualizarAlerta(req, res) {
    var id = req.params.id;
    console.log(`ID do alerta: ${id}`);
    
    console.log("Antes de chamar o model.visualizarAlerta");
    alertaModel.visualizarAlerta(id).then(
        function (linhasAfetadas) {
            console.log(`\n Linhas afetadas: ${linhasAfetadas}`);
            if (linhasAfetadas > 0) {  
                console.log("Visualização alterada!");
                res.status(204).send();  
            } else {
                console.log("Alerta não encontrado.");
                res.status(404).send();  
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("\n Houve um erro ao atualizar alerta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    console.log("Depois de chamar o model.visualizarAlerta");
}


module.exports = {
    listarAlertas,
    visualizarAlerta
}