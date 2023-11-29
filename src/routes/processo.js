var express = require("express");
var router = express.Router();

var processoController = require("../controllers/processoController");

router.get("/listarProcessos", function(req,res){
    processoController.listarProcessos(req, res);
})

router.get("/atualizarKpis", function(req,res) {
    console.log("To no route");
    processoController.atualizarKpis(req, res);
})

module.exports = router;