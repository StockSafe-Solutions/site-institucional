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

function inserirTag(req, res){
    var nome = req.body.nomeTagServer;
    var cor = req.body.corTagServer;

    if(nome == undefined || cor == undefined){
        res.status(400).send()
    }
    tagModel.inserirTag(nome, cor).then(
        function (resultado) {
            res.json(resultado);
        }).catch(
        function (erro) {
            if(erro.sqlState == 23000){
                res.status(409).json(erro.sqlMessage)
            }
            res.status(500).json(erro.sqlMessage)
        });
}

function colocarTagEmServidor(req, res){
    var idsServidores = req.body.idsServidoresServer;
    var nomeTag = req.body.nomeTagServer;

    if(idsServidores == undefined || nomeTag == undefined){
        res.status(400).send()
    }

    for(let i = 0; i < idsServidores.length; i++){
        tagModel.colocarTagEmServidor(idsServidores[i], nomeTag).then(
            function (resultado) {
                res.json(resultado);
            }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\n Houve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage)
            });
    }
}


module.exports = {
    listarTags,
    kpisTags,
    tagsPorNome,
    graficosPorTags,
    kpisPorTags,
    inserirTag,
    colocarTagEmServidor
}