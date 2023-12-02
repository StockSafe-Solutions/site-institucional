var express = require("express");
var router = express.Router();

var processoController = require("../controllers/processoController");

router.post("/listarProcessos/:codServidor", function(req,res){
    processoController.listarProcessos(req, res);
})

router.get("/atualizarKpis/:codServidor", function(req,res) {
    processoController.atualizarKpis(req, res);
})

router.get("/atualizarGraficoProc/:codServidor", function(req,res) {
    processoController.atualizarGraficoProc(req, res);
})

module.exports = router;