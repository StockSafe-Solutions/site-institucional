var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/buscar/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/buscarDemanda", function (req,res){
    medidaController.buscarDemanda(req,res)
});

module.exports = router;