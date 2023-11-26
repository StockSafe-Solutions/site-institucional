var tagModel = require("../models/tagModel");

function listarTags(req, res) {
    tagModel.listarTags().then(
        function (resultado) {
            console.log(`\n Resultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            if (resultado.length > 0) {
                console.log(resultado);
                res.json(resultado);
            } else if (resultado.length == 0){
                res.status(204).send()
            } else{
                res.status(404).send()
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function kpisTags(req, res){
    tagModel.kpisTags().then(
        function (resultado){
            if (resultado.length > 0) {
                console.log(resultado);
                res.json(resultado);
            } else if (resultado.length == 0){
                res.status(204).send()
            } else{
                res.status(404).send()
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function tagsPorNome(req, res) {
    var nomeTag = req.params.nomeTags;    
    if(nomeTag == null){
        nomeTag = ""
    }
    tagModel.tagsPorNome(nomeTag).then(
        function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado);
                res.json(resultado);
            } else if (resultado.length == 0){
                res.status(204).send()
            } else{
                res.status(404).send()
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function graficosPorTags(req, res){
    var tags = req.body.tagServer;
    if(tags == undefined){
        res.status(400).send()
    }
    tagModel.graficosPorTags(tags).then(
        function(resultado) {
            if(resultado.length > 0){
                res.json(resultado);
            } else if (resultado.length == 0){
                res.status(204).send()
            } else{
                res.status(404).send()
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function kpisPorTags(req, res){
    var tags = req.body.tagServer;
    if(tags == undefined){
        res.status(400).send()
    }
    tagModel.kpisPorTags(tags).then(
        function(resultado) {
            if(resultado.length > 0){
                res.json(resultado);
            } else if (resultado.length == 0){
                res.status(204).send()
            } else{
                res.status(404).send()
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarTags,
    kpisTags,
    tagsPorNome,
    graficosPorTags,
    kpisPorTags
}