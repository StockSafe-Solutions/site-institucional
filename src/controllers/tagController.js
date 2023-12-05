var tagModel = require("../models/tagModel");

function listarTags(req, res) {
    tagModel.listarTags().then(
        function (resultado) {
            if (resultado.length > 0) {
                ;
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
                ;
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
    var nomeTag = req.body.nomeTagServer;    
    if(nomeTag == null){
        nomeTag = ""
    }

    tipoOrdenacao = req.body.ordTipoServer
    sentidoOrdenacao = req.body.ordSentServer

    ordenacao = ""
    if(tipoOrdenacao != undefined && sentidoOrdenacao != undefined){
        ordenacao = `ORDER BY ${tipoOrdenacao} ${sentidoOrdenacao}`
    }

    tagModel.tagsPorNome(nomeTag, ordenacao).then(
        function (resultado) {
            if (resultado.length > 0) {
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
    // var tags = req.body.tagServer;
    var tags = [1,2,3,5]
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

function excluirTag(req, res){
    idTag = req.body.idTagServer
    if(idTag == undefined){
        res.status(400).send()
    }

    tagModel.desassociarTagsDeServidores(idTag).then(
        tagModel.excluirTag(idTag).then(
            function(resultado){
                res.json(resultado)
            }).catch(
                function (erro){
                    console.log(erro)
                    res.status(500).json(erro.sqlMessage)
                }
            )
        ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\n Houve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage)
        });
}

function historicoAlerta(req, res) {
    tagModel.historicoAlerta().then(
        function (resultado) {
            if (resultado.length > 0) {
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

module.exports = {
    listarTags,
    kpisTags,
    tagsPorNome,
    graficosPorTags,
    kpisPorTags,
    inserirTag,
    colocarTagEmServidor,
    excluirTag,
    historicoAlerta
}