var express = require("express");
var router = express.Router();

var perfilEmpresaController = require("../controllers/perfilEmpresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de perfilEmpresaController.js
router.get("/pegarDadosEmpresa/:idUsuario", function (req, res) {
    perfilEmpresaController.pegarDadosEmpresa(req, res);
})

router.post('/alterarDados/:idUsuario', function (req, res) {
    perfilEmpresaController.alterarDados(req, res);
})



module.exports = router;